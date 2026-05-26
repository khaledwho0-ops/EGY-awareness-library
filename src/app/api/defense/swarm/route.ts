import { NextResponse } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText, tool } from 'ai';
import { z } from 'zod';
import { search } from 'duck-duck-scrape';

// Initialize Groq provider using the OpenAI compatibility layer
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Step 0: The OSINT Threat Hunter (Llama-3.3-70B via Groq with DuckDuckGo Search)
    // We use Llama 3.3 for this because it has flawless native tool-calling capabilities.
    const { text: osintContext } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are the "OSINT Threat Hunter." Your objective is to brutally fact-check the provided text.
      Use the webSearch tool to autonomously query the live internet for recent news, fact-checks, or context about the threat.
      If it is a known hoax, debunk it with sources. If it is real, provide context. Output a strict, highly technical summary of your findings.`,
      prompt: `Fact-check this threat: \n\n"${prompt}"`,
      tools: {
        webSearch: tool({
          description: 'Search the live internet for recent news, fact-checks, or context.',
          parameters: z.object({
            query: z.string().describe('The search query to look up on the web.'),
          }),
          execute: async ({ query }: { query: string }) => {
            console.log(`[SWARM] Agent executing OSINT search for: "${query}"`);
            try {
              const searchResults = await search(query);
              // Return the top 3 results to give the agent solid context without blowing up the context window
              return searchResults.results.slice(0, 3).map((r) => ({
                title: r.title,
                snippet: r.description,
                url: r.url,
              }));
            } catch (e) {
              return { error: 'Live web search failed. Rely on internal knowledge.' };
            }
          },
        } as any),
      },
    });


    // Step A: The Red Team Psychologist (DeepSeek-R1 via Groq)
    // Synchronously generate a psychological analysis, factoring in the OSINT context.
    const { text: deepseekAnalysis } = await generateText({
      model: groq('deepseek-r1-distill-llama-70b'),
      system: `You are the "Red Team Psychologist." Your objective is to brutally and precisely analyze the provided text.
      Identify the specific psychological manipulation tactics, dark patterns, and cognitive biases weaponized within it.
      Output a strict, highly technical, short bulleted list of these tactics. Do not provide conversational filler.`,
      prompt: `Original Threat: \n"${prompt}"\n\nLive OSINT Context:\n${osintContext}\n\nAnalyze the psychological manipulation based on this verified reality:`,
    });

    // Step B: The Trauma-Informed Theologian (Llama-3.3-70B via Groq)
    // Stream the final counter-narrative directly to the client.
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are the "Trauma-Informed Theologian." Your objective is to read a threat, the OSINT fact-check, and the Red Team Psychologist's analysis.
      Generate a final, grounded counter-narrative to neutralize the threat.
      Deconstruct the psychological manipulation with philosophical and theological clarity. Provide an ontological anchor to stabilize the reader.
      Speak with profound authority, deep empathy, and razor-sharp intellect.`,
      prompt: `Original Threat: \n"${prompt}"\n\nOSINT Fact-Check:\n${osintContext}\n\nRed Team Psychologist's Analysis:\n${deepseekAnalysis}\n\nBased on the fact-check and the Red Team's analysis, provide the final counter-narrative:`,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Swarm API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
