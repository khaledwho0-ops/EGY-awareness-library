import { NextRequest } from "next/server";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import { generateObject, generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { executeMetaSearch } from "@/lib/osint/search-tool";
import { extractCleanMarkdown } from "@/lib/osint/dom-parser";

// We use the Groq provider via the OpenAI-compatible endpoint from AI SDK
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const modelName = "llama-3.3-70b-versatile";

const OSINTState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  searchQueries: Annotation<string[]>({
    reducer: (_, y) => y,
  }),
  scrapedData: Annotation<{ url: string; content: string }[]>({
    reducer: (x, y) => x.concat(y),
  }),
  finalReport: Annotation<string>({
    reducer: (_, y) => y,
  }),
});

export const maxDuration = 60; // Allow sufficient time for the scraping operations

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query as string;

    if (!query) {
      return new Response("Missing query", { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendUpdate = (step: string, data: any) => {
          controller.enqueue(encoder.encode(JSON.stringify({ step, data }) + "\n"));
        };

        // --- Node 1: Planner ---
        const planner = async (state: typeof OSINTState.State) => {
          const userThreat = state.messages[0].content as string;
          
          try {
            const result = await generateObject({
              model: groq(modelName),
              schema: z.object({
                queries: z.array(z.string()).max(3).describe("Exact search engine queries to investigate the threat."),
              }),
              prompt: `Analyze this threat and generate up to 3 distinct search queries to investigate it thoroughly.\nThreat: ${userThreat}`,
            });

            sendUpdate("planner", result.object.queries);
            return { searchQueries: result.object.queries };
          } catch (e) {
            console.error("Planner error:", e);
            sendUpdate("planner", [userThreat]);
            return { searchQueries: [userThreat] };
          }
        };

        // --- Node 2: Search & Scrape ---
        const searchAndScrape = async (state: typeof OSINTState.State) => {
          const queries = state.searchQueries;
          
          // 1. Execute all searches concurrently
          const searchResultsRaw = await Promise.allSettled(
            queries.map((q) => executeMetaSearch(q))
          );

          // Flatten and extract the top URLs across all queries
          const allUrls = new Set<string>();
          searchResultsRaw.forEach((res) => {
            if (res.status === "fulfilled") {
              // Take top 2 from each query
              res.value.slice(0, 2).forEach((item) => allUrls.add(item.url));
            }
          });

          const targetUrls = Array.from(allUrls).slice(0, 3); // Cap total scraped URLs to prevent timeout
          sendUpdate("scraping", targetUrls);

          // 2. Fetch and scrape the target URLs
          const scrapedResults = await Promise.allSettled(
            targetUrls.map(async (url) => {
              try {
                const response = await fetch(url, {
                  headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OSINT-Agent/1.0",
                  },
                  signal: AbortSignal.timeout(8000), // Max 8s per fetch
                });
                
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                const html = await response.text();
                const content = extractCleanMarkdown(html);
                return { url, content };
              } catch (e) {
                console.warn(`Failed to scrape ${url}:`, e);
                return { url, content: "" };
              }
            })
          );

          const scrapedData = scrapedResults
            .filter((res): res is PromiseFulfilledResult<{url: string, content: string}> => res.status === "fulfilled")
            .map((res) => res.value)
            .filter((data) => data.content.length > 50); // Drop empty or heavily blocked pages

          sendUpdate("scraped", scrapedData.map(d => d.url));
          return { scrapedData };
        };

        // --- Node 3: Synthesizer ---
        const synthesizer = async (state: typeof OSINTState.State) => {
          const userThreat = state.messages[0].content as string;
          const data = state.scrapedData;

          let contextText = "";
          data.forEach((d, index) => {
            contextText += `\n\n--- Source [${index + 1}]: ${d.url} ---\n${d.content}\n`;
          });

          const systemPrompt = `You are an OSINT investigator. You must synthesize the provided scraped data.
You must cite every claim using [1], [2], corresponding to the source URLs provided.
If the data is not in the context, output 'UNVERIFIED'. Do not hallucinate sources.

Context Data:
${contextText}`;

          try {
            const result = await generateText({
              model: groq(modelName),
              system: systemPrompt,
              prompt: `Investigate this threat based strictly on the provided context:\n${userThreat}`,
            });

            sendUpdate("synthesizer", {
              report: result.text,
              sources: data.map((d, i) => ({ id: i + 1, url: d.url }))
            });

            return { finalReport: result.text };
          } catch (e) {
            console.error("Synthesizer error:", e);
            sendUpdate("error", "Failed to synthesize report.");
            return { finalReport: "UNVERIFIED (System Synthesis Error)" };
          }
        };

        // Build Graph
        const workflow = new StateGraph(OSINTState)
          .addNode("planner", planner)
          .addNode("searchAndScrape", searchAndScrape)
          .addNode("synthesizer", synthesizer)
          .addEdge(START, "planner")
          .addEdge("planner", "searchAndScrape")
          .addEdge("searchAndScrape", "synthesizer")
          .addEdge("synthesizer", END);

        const app = workflow.compile();

        try {
          // Execute Graph
          await app.invoke({
            messages: [new HumanMessage(query)],
            searchQueries: [],
            scrapedData: [],
            finalReport: "",
          });
        } catch (e: any) {
          console.error("OSINT Graph Error:", e);
          sendUpdate("error", e.message);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("OSINT API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
