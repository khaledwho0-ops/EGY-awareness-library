import { z } from "zod";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { EGYPTIAN_CONTEXT_VECTORS, NEGATIVE_SCIENCE_CATEGORIES } from "./src/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "./src/types/god-system";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const EgyptianContextVectorSchema = z.enum(EGYPTIAN_CONTEXT_VECTORS);
const NegativeScienceCategorySchema = z.enum(NEGATIVE_SCIENCE_CATEGORIES);

const SynthesisOutputSchema = z.object({
  confidence_score: z.number().min(0).max(100),
  egyptian_vector_hit: EgyptianContextVectorSchema,
  negative_science_violation: NegativeScienceCategorySchema,
  god_system_7_layer_audit: GodSystemAuditSchema,
  truth_sandwich: z.object({
    fact_1: z.string(),
    myth: z.string(),
    fact_2: z.string(),
  })
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: SynthesisOutputSchema,
      prompt: `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic.
Claim: "الفراعنة كائنات فضائية بنوا الأهرامات"
Context Vector: "Historical Revisionism"

Worker Data (Citations & Evaluations):
Title: OpenAlex: Ancient Egypt architecture
Abstract: Match found
Credibility: 90

Generate the synthesis response adhering strictly to the schema.`
    });
    console.log(JSON.stringify(object, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
