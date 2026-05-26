/**
 * PROMPT TYPES + ZOD SCHEMAS
 * Framework: §20.1 (7 rules), §20.2 (8 variable slots), §20.3-20.5 (42 prompts)
 * 
 * 24 DeepReal + 9 Mental Health + 9 Religion Hub = 42 total
 * Generate 250+ runtime variants via variable slots
 * All prompts include pedagogical strategy, Bloom level, and COM-B target (Chunk 4)
 */
import { z } from "zod";
import { MVPEnum } from "./source";

// ── §20.2 Variable Slots (8 slots) ──
export const VariableSlotEnum = z.enum([
  "claim",
  "url",
  "source_name",
  "date",
  "region",
  "language",
  "media_type",
  "topic",
]);
export type VariableSlot = z.infer<typeof VariableSlotEnum>;

// ── Prompt Use Case Categories ──
export const PromptUseCaseEnum = z.enum([
  // DeepReal (§20.3)
  "claim_verification",
  "source_evaluation",
  "deepfake_detection",
  "bias_detection",
  "media_analysis",
  "archive_lookup",
  // Mental Health (§20.4)
  "term_explanation",
  "myth_checking",
  "help_seeking_guidance",
  // Religion Hub (§20.5)
  "coping_strategy",
  "moderation_check",
  "meaning_making",
]);
export type PromptUseCase = z.infer<typeof PromptUseCaseEnum>;

// ── Prompt Strategy Types (Template §12 — 12 intervention strategies) ──
export const PromptStrategyEnum = z.enum([
  "lateral_reading",
  "source_triangulation",
  "reverse_image_search",
  "metadata_inspection",
  "prebunking",
  "cognitive_defusion",
  "behavioral_activation",
  "psychoeducation",
  "normalization",
  "meaning_making",
  "sacred_reframing",
  "boundary_setting",
]);
export type PromptStrategy = z.infer<typeof PromptStrategyEnum>;

// ── Bloom's Taxonomy Levels ──
export const BloomLevelEnum = z.enum([
  "remember",
  "understand",
  "apply",
  "analyze",
  "evaluate",
  "create",
]);
export type BloomLevel = z.infer<typeof BloomLevelEnum>;

export const PromptEntrySchema = z.object({
  id: z.string(), // e.g., "DR-P01", "MH-P01", "RH-P01"
  mvp: MVPEnum,
  useCase: PromptUseCaseEnum,
  title: z.string(),
  titleAr: z.string().optional(),
  template: z.string(), // Full prompt text with {variable} placeholders
  templateAr: z.string().optional(),
  variableSlots: z.array(VariableSlotEnum), // Which slots this prompt uses
  safetyNotes: z.array(z.string()).optional(),
  // §20.1 Rules compliance
  forcesUncertainty: z.boolean(), // Rule 1: force model to state uncertainty
  asksForEvidence: z.boolean(),   // Rule 2: ask for evidence, not opinion
  asksForSources: z.boolean(),    // Rule 3: ask for source types
  forbidsDiagnosis: z.boolean(),  // Rule 4: forbid diagnosis in MH mode
  forbidsFatwa: z.boolean(),      // Rule 5: forbid fatwa/verdict in RH mode
  // Pedagogical classification (Chunk 4/10)
  strategy: PromptStrategyEnum.optional(),
  bloomLevel: BloomLevelEnum.optional(),
  comBTarget: z.string().optional(),
});
export type PromptEntry = z.infer<typeof PromptEntrySchema>;

// ── §20.6 Prompt Lab UX Rule: "Never empty input box" ──
export const PROMPT_LAB_STEPS = [
  "Choose goal",
  "Choose source type",
  "Choose tone",
  "Choose language",
  "Auto-fill trusted sources",
] as const;
