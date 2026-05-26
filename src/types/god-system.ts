import { z } from "zod";

export const GodSystemLayerSchema = z.object({
  layer_name: z.string(),
  audit_result: z.string(),
  confidence: z.number().min(0).max(100),
  passed: z.boolean()
});

export type GodSystemLayer = z.infer<typeof GodSystemLayerSchema>;

export const GodSystemAuditSchema = z.object({
  emotion_strip: GodSystemLayerSchema,
  provenance_audit: GodSystemLayerSchema,
  incentive_map: GodSystemLayerSchema,
  methodological_destruction: GodSystemLayerSchema,
  fallacy_execution: GodSystemLayerSchema,
  truth_sandwich_layer: GodSystemLayerSchema,
  forward_defense: GodSystemLayerSchema
});

export type GodSystemAudit = z.infer<typeof GodSystemAuditSchema>;
