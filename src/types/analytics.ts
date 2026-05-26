/**
 * ANALYTICS TYPES + ZOD SCHEMAS
 * Framework: §18 (17 non-exercise modes), §23.1 (12 missed additions)
 */
import { z } from "zod";
import { MVPEnum } from "./source";

// ── §18 Non-Exercise Mode Types (17 modes) ──
export const ModeTypeEnum = z.enum([
  "source_of_the_day",          // Mode 1: 2 min daily
  "verification_checklist",      // Mode 2: 20-40s per use
  "confidence_logging",          // Mode 3: 15s per interaction
  "correction_ledger",           // Mode 4: 3 min every 3 days
  "evidence_ladder",             // Mode 5: 1 min before content
  "source_compare",              // Mode 6: 4-6 min 2x weekly
  "archive_replay",              // Mode 7: 5 min selected claims (DR only)
  "myth_autopsy",                // Mode 8: 5 min 3x weekly
  "expert_voice_capsule",        // Mode 9: 2 min daily/alternate
  "decision_tree",               // Mode 10: 1-2 min triggered (MH+RH)
  "trusted_directory",           // Mode 11: Always available
  "bias_reflection",             // Mode 12: 1 min after hard tasks
  "prompt_lab",                  // Mode 13: 3-8 min as needed
  "peer_pair_review",            // Mode 14: 10 min weekly (DR+MH)
  "micro_scenario",              // Mode 15: 1-2 min optional
  "boundary_warning",            // Mode 16: 5-10s on relevant (MH+RH)
  "weekly_review",               // Mode 17: 10-12 min weekly
]);
export type ModeType = z.infer<typeof ModeTypeEnum>;

// ── §18.1 Mode Schedule (which days modes are active) ──
export const MODE_SCHEDULE = {
  // Days 1-3: 4 modes
  "1-3": ["source_of_the_day", "verification_checklist", "confidence_logging", "boundary_warning"],
  // Days 4-6: +3 modes
  "4-6": ["evidence_ladder", "source_compare", "bias_reflection"],
  // Days 7-9: +3 modes
  "7-9": ["myth_autopsy", "prompt_lab", "decision_tree"],
  // Days 10-12: +3 modes
  "10-12": ["expert_voice_capsule", "trusted_directory", "micro_scenario"],
  // Days 13-14: +3 modes
  "13-14": ["peer_pair_review", "weekly_review", "correction_ledger"],
} as const;

// ── Analytics Event ──
export const AnalyticsEventSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  eventType: z.enum([
    "exercise_start",
    "exercise_complete",
    "exercise_skip",
    "source_view",
    "source_click",
    "source_bookmark",
    "keyhunter_open",
    "keyhunter_layer_expand",
    "prompt_select",
    "prompt_copy",
    "prompt_customize",
    "assessment_start",
    "assessment_complete",
    "mode_interaction",
    "eight_gate_check",
    "confidence_log",
    "theme_toggle",
    "rtl_toggle",
    "crisis_panel_view",
    "help_seeking_route",
    "page_view",
    // COM-B behavioral tracking (Chunk 9)
    "comb_segment_trained",
    "comb_gap_detected",
    // Prompt strategy tracking (Chunk 9)
    "prompt_strategy_used",
    "bloom_level_engaged",
  ]),
  mvp: MVPEnum.optional(),
  metadata: z.record(z.string(), z.unknown()),
  timestamp: z.string(), // ISO datetime
});
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
