import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { z } from "zod";
import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "./../../src/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "./../../src/types/god-system";
import { EGYPTIAN_CONTEXT_VECTORS, NEGATIVE_SCIENCE_CATEGORIES } from "./../../src/lib/debunking/egy-data";

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

const jsonSchema = {
  type: "OBJECT",
  properties: {
    confidence_score: { type: "NUMBER" },
    egyptian_vector_hit: { type: "STRING", enum: EGYPTIAN_CONTEXT_VECTORS },
    negative_science_violation: { type: "STRING", enum: NEGATIVE_SCIENCE_CATEGORIES },
    god_system_7_layer_audit: {
      type: "OBJECT",
      properties: {
        emotion_strip: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        provenance_audit: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        incentive_map: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        methodological_destruction: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        fallacy_execution: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        truth_sandwich: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
        forward_defense: { type: "OBJECT", properties: { layer_name: { type: "STRING" }, audit_result: { type: "STRING" }, confidence: { type: "NUMBER" }, passed: { type: "BOOLEAN" } } },
      }
    },
    truth_sandwich: {
      type: "OBJECT",
      properties: {
        fact_1: { type: "STRING" },
        myth: { type: "STRING" },
        fact_2: { type: "STRING" }
      }
    }
  }
};

async function run() {
  console.log("Generating with Gemini API directly...");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic.
Claim: "I heard that the local water supply is poisoned and everyone should stop drinking."
Context Vector: "Infrastructure & Public Service Panic"

Worker Data (Citations & Evaluations):
Title: Mock
Abstract: Mock
Credibility: 100

Generate the synthesis response adhering strictly to the schema.`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema
      }
    })
  });

  const data = await res.json();
  if (data.error) {
    console.error("API Error:", JSON.stringify(data.error, null, 2));
    return;
  }
  
  const text = data.candidates[0].content.parts[0].text;
  console.log("Generated Object:");
  console.log(text);
  
  try {
    const parsed = JSON.parse(text);
    SynthesisOutputSchema.parse(parsed);
    console.log("Zod validation PASSED!");
  } catch (err) {
    console.error("Zod validation FAILED:", err);
  }
}

run().catch(console.error);
