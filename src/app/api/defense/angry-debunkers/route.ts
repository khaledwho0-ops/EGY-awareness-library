import { NextResponse } from "next/server";
import { runPreflight } from "@/lib/debunking/preflight";
import { executeApiSwarm } from "@/lib/debunking/workers/api-swarm";
import { z } from "zod";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "@/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "@/types/god-system";

export const runtime = 'edge';

const SynthesisOutputSchema = z.object({
  egyptian_vector_hit: EgyptianContextVectorSchema,
  negative_science_violation: NegativeScienceCategorySchema,
  god_system_7_layer_audit: GodSystemAuditSchema,
  truth_sandwich: z.object({
    fact_1: z.string(),
    myth: z.string(),
    fact_2: z.string(),
  }),
  patient_zero_tracing: z.object({
    origin_year: z.string().describe('The approximate year this myth first emerged, e.g. "circa 2014" or "unknown"'),
    origin_platform: z.string().describe('The platform or context where this myth originated, e.g. "WhatsApp forwards in Egypt", "US anti-vax Facebook groups", "medieval Islamic folklore misquote"'),
    transmission_vector: z.string().describe('HOW the lie spread specifically into Egyptian/Arab context, e.g. "Mistranslated from English clickbait in 2019, amplified by Egyptian Facebook pages"'),
    why_trending_now: z.string().describe('Why this specific myth is resurfacing or circulating right now in 2025/2026 Egypt'),
    named_instigator: z.string().optional().describe('If a specific person, organization, or media outlet can be identified as the primary spreader, name them. Otherwise omit.'),
  }),
});

export async function POST(req: Request) {
  try {
    // Accept optional pdfBase64 alongside the required query
    const { query, pdfBase64, pdfMimeType } = await req.json();
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required. Please set it in your .env file.');
    }

    // PHASE 1: Pre-Flight & Routing
    const preflight = await runPreflight(query);

    // Red-Direct Panic Check
    if (preflight.isRedDirectPanic) {
      return NextResponse.json({
        type: "RED_DIRECT",
        message: "تم اكتشاف حالة طوارئ. يرجى الاتصال بالخط الساخن للأزمات فوراً: 16328",
        confidence_score: 100,
      });
    }

    // PHASE 2: API Swarm (Replaces Hive-Mind Strike Teams)
    const workerData = await executeApiSwarm(preflight.normalizedText);

    // PHASE 3: The Synthesis Node (Semantic Synthesis Layer)
    console.log(`[Synthesis Node] Generating Truth Sandwich for vector context: ${preflight.vector}`);

    const citationsText = workerData.map(w => `Title: ${w.title}\nAbstract: ${w.abstract}\nCredibility: ${w.credibilityScore}`).join('\n\n');

    // Build optional URL metadata prefix for the synthesis prompt
    let urlMetadataBlock = "";
    if (preflight.isUrlInput && preflight.sourceUrl) {
      urlMetadataBlock = `Source URL: ${preflight.sourceUrl}\nArticle Title: ${preflight.extractedTitle ?? "Unknown"}\n`;
    }

    const basePrompt = `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic. Note: Use "truth_sandwich_layer" in the 7-Layer God-System Audit to avoid confusion with the top-level "truth_sandwich" output field.
Claim: "${query}"
Context Vector: "${preflight.vector}"

${urlMetadataBlock}Worker Data (Citations & Evaluations):
${citationsText}

CRITICAL ADDITIONAL MISSION - PATIENT ZERO TRACING:
You must conduct a forensic historical trace of this specific claim. Use your training data knowledge base to:
1. Identify the FIRST known appearance of this myth (even if approximate)
2. Identify the ORIGINAL platform (4chan, Facebook, WhatsApp, specific TV show, religious misquote, etc.)
3. Explain the specific TRANSMISSION VECTOR that brought it into Egyptian/Arabic culture
4. Explain WHY it is currently circulating in Egypt right now
5. If you can identify a named instigator (a specific person, YouTube channel, Facebook page, TV personality), name them with their Egyptian cultural context.
If you genuinely cannot determine the origin, say so explicitly rather than hallucinating.

Generate the synthesis response adhering strictly to the schema.`;

    // Build multi-modal messages array when PDF is attached
    const pdfMessages = pdfBase64 ? [
      {
        role: 'user' as const,
        content: [
          { type: 'file' as const, data: pdfBase64, mimeType: (pdfMimeType || 'application/pdf') as string },
          { type: 'text' as const, text: `FULL DOCUMENT ANALYSIS DIRECTIVE: ${basePrompt}` }
        ] as any,
      }
    ] as any[] : undefined;

    const { object: synthesisResult } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: SynthesisOutputSchema,
      ...(pdfMessages ? { messages: pdfMessages as any } : { prompt: basePrompt }),
    });

    const auditLayers = Object.values(synthesisResult.god_system_7_layer_audit);
    const confidence_score = auditLayers.reduce((acc: number, layer: any) => acc + layer.confidence, 0) / auditLayers.length;

    return NextResponse.json({
      type: "SYNTHESIS_COMPLETE",
      hasPdfInput: Boolean(pdfBase64),
      data: {
        confidence_score,
        ...synthesisResult,
        citations: workerData.map(w => ({ title: w.title, url: w.citationUrl })),
        // URL extraction metadata
        isUrlInput: preflight.isUrlInput ?? false,
        extractedTitle: preflight.extractedTitle,
        sourceUrl: preflight.sourceUrl,
      }
    });

  } catch (error: any) {
    console.error("[Angry Debunkers API] Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
