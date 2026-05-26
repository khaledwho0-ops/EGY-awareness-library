import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadEnvConfig } from "@next/env";
import { EGYPTIAN_CONTEXT_VECTORS, NEGATIVE_SCIENCE_CATEGORIES } from "./src/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "./src/types/god-system";
import { zodToJsonSchema } from "zod-to-json-schema"; // Wait, is this installed? Probably not.

// Let's just use JSON.parse
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic.
Claim: "الفراعنة كائنات فضائية بنوا الأهرامات"
Context Vector: "Historical Revisionism"

Worker Data (Citations & Evaluations):
Title: OpenAlex: Ancient Egypt architecture
Abstract: Match found
Credibility: 90

Generate the synthesis response adhering strictly to the JSON schema. Return ONLY valid JSON.
Schema:
{
  "confidence_score": "number 0-100",
  "egyptian_vector_hit": "string (one of the context vectors)",
  "negative_science_violation": "string (one of the negative science categories)",
  "god_system_7_layer_audit": {
    "emotion_strip": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "provenance_audit": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "incentive_map": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "methodological_destruction": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "fallacy_execution": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "truth_sandwich": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" },
    "forward_defense": { "layer_name": "string", "audit_result": "string", "confidence": "number", "passed": "boolean" }
  },
  "truth_sandwich": {
    "fact_1": "string",
    "myth": "string",
    "fact_2": "string"
  }
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/^\`\`\`json/m, "").replace(/\`\`\`$/m, "").trim();
    const parsed = JSON.parse(jsonStr);
    
    // Validate with Zod
    const validated = SynthesisOutputSchema.parse(parsed);
    console.log("Validation Successful!");
    console.log(JSON.stringify(validated, null, 2));
  } catch (err) {
    console.error("Validation Failed:", err);
  }
}

run();
