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
  })
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
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

    const { object: synthesisResult } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: SynthesisOutputSchema,
      prompt: `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic. Note: Use "truth_sandwich_layer" in the 7-Layer God-System Audit to avoid confusion with the top-level "truth_sandwich" output field.
Claim: "${query}"
Context Vector: "${preflight.vector}"

Worker Data (Citations & Evaluations):
${citationsText}

Generate the synthesis response adhering strictly to the schema.`
    });

    const auditLayers = Object.values(synthesisResult.god_system_7_layer_audit);
    const confidence_score = auditLayers.reduce((acc: number, layer: any) => acc + layer.confidence, 0) / auditLayers.length;

    return NextResponse.json({
      type: "SYNTHESIS_COMPLETE",
      data: {
        confidence_score,
        ...synthesisResult,
        citations: workerData.map(w => ({ title: w.title, url: w.citationUrl }))
      }
    });

  } catch (error: any) {
    console.error("[Angry Debunkers API] Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
