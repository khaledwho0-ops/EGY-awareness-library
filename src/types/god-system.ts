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

// ═══════════════════════════════════════════════════════════════
// LAYER-AWARE EXTENSION (ADD-ONLY — existing schemas above are untouched)
// ═══════════════════════════════════════════════════════════════

/** Which of the 8 deception layers was detected */
export const DeceptionLayerSchema = z.object({
  detected_layer: z.number().min(1).max(8).describe("Which of the 8 layers of deception this claim falls under (1-8)"),
  layer_name: z.string().describe("English name of the detected layer e.g. 'THE ABSOLUTE FABRICATION'"),
  layer_name_ar: z.string().describe("Arabic name of the detected layer"),
  layer_explanation: z.string().describe("Why this claim belongs to this specific layer — be specific and reference the claim"),
});

export type DeceptionLayer = z.infer<typeof DeceptionLayerSchema>;

/** A counter-weapon deployed against the detected layer */
export const CounterWeaponSchema = z.object({
  weapon_name: z.string().describe("Name of the counter-weapon tool"),
  weapon_name_ar: z.string().describe("Arabic name"),
  result: z.string().describe("What this weapon found when analyzing the claim"),
  effectiveness: z.number().min(1).max(5).describe("Effectiveness rating 1-5"),
});

export type CounterWeapon = z.infer<typeof CounterWeaponSchema>;

/** Full layer-aware analysis result */
export const LayerAwareAnalysisSchema = z.object({
  deception_layer: DeceptionLayerSchema,
  counter_weapons: z.array(CounterWeaponSchema).min(3).max(6).describe("Counter-weapons deployed against the detected layer"),
});

export type LayerAwareAnalysis = z.infer<typeof LayerAwareAnalysisSchema>;
