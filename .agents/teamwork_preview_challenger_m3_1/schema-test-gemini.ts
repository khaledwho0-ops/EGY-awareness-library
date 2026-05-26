import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { z } from "zod";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "./../../src/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "./../../src/types/god-system";

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
  console.log("Generating with Gemini 1.5 Flash...");
  const { object } = await generateObject({
    model: google('models/gemini-1.5-flash'),
    schema: SynthesisOutputSchema,
    prompt: `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic.
Claim: "I heard that the local water supply is poisoned and everyone should stop drinking."
Context Vector: "Infrastructure & Public Service Panic"

Worker Data (Citations & Evaluations):
Title: Mock
Abstract: Mock
Credibility: 100

Generate the synthesis response adhering strictly to the schema.`
  });

  console.log("Generated Object:");
  console.log(JSON.stringify(object, null, 2));
}

run().catch(console.error);
