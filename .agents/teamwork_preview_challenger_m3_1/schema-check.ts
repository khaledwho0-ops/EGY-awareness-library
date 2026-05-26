import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
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

console.log(JSON.stringify(zodToJsonSchema(SynthesisOutputSchema), null, 2));
