/**
 * ASSESSMENT TYPES + ZOD SCHEMAS
 * Framework: §3.1 (12 original variables), §3.2 (6 instruments), §17.2 (5 new constructs)
 * Framework: §5.2 (8 planned analyses), §17.7 (5 score formulas)
 *
 * Total: 17 constructs tracked
 * Instruments: MIST-20, MHLS, GHSQ, Brief RCOPE, SUS, MC-SDS
 * Baseline: TCE, AFS, AOI, ETS, CTCS
 */
import { z } from "zod";

// ── §3.2 Instrument Types (6 instruments) ──
export const InstrumentEnum = z.enum([
  "MIST_20",       // 0-20, alpha .77, pre+post
  "MHLS",          // 35-160, alpha .873, pre+post
  "GHSQ",          // Likert summation, r=.86, pre+post
  "BRIEF_RCOPE",   // 14 items (7 pos 7-28, 7 neg 7-28), alpha .90/.81, pre+post
  "SUS",           // 0-100, alpha .91, post only
  "MC_SDS",        // 0-13, alpha .75, pre only
]);
export type Instrument = z.infer<typeof InstrumentEnum>;

// ── Assessment Phase ──
export const PhaseEnum = z.enum(["pre", "post"]);
export type Phase = z.infer<typeof PhaseEnum>;

// ── §3.1 MIST-20 Subscores ──
export const MIST20ScoreSchema = z.object({
  totalScore: z.number().int().min(0).max(20),       // DV1: overall
  realDetection: z.number().int().min(0).max(10),      // DV1a: correctly identified real
  fakeDetection: z.number().int().min(0).max(10),      // DV1a: correctly identified fake
  naivete: z.number().min(0).max(1),                   // DV1a: accepting fake as real
  distrust: z.number().min(0).max(1),                  // DV1a: rejecting real as fake
  veracityDiscernment: z.number(),                      // Signal detection d'
});
export type MIST20Score = z.infer<typeof MIST20ScoreSchema>;

// ── §3.1 MHLS Score (6 domains) ──
export const MHLSScoreSchema = z.object({
  totalScore: z.number().int().min(35).max(160),       // DV2
  recognitionOfDisorders: z.number(),
  knowledgeOfHelpSeeking: z.number(),
  knowledgeOfSelfHelpStrategies: z.number(),
  knowledgeOfProfessionalHelp: z.number(),
  attitudesToPromoteRecognition: z.number(),
  attitudesToHelpSeeking: z.number(),
});
export type MHLSScore = z.infer<typeof MHLSScoreSchema>;

// ── §3.1 Brief RCOPE Scores ──
export const BriefRCOPEScoreSchema = z.object({
  positiveScore: z.number().int().min(7).max(28),      // DV3a
  negativeScore: z.number().int().min(7).max(28),      // DV3b
});
export type BriefRCOPEScore = z.infer<typeof BriefRCOPEScoreSchema>;

// ── §4.5 SUS Score ──
export const SUSScoreSchema = z.object({
  totalScore: z.number().min(0).max(100),               // DV4
  // benchmark: >= 68 above average, >= 75 good, >= 80 excellent
});
export type SUSScore = z.infer<typeof SUSScoreSchema>;

// ── GHSQ Score ──
export const GHSQScoreSchema = z.object({
  totalScore: z.number(),                               // DV2a
});
export type GHSQScore = z.infer<typeof GHSQScoreSchema>;

// ── MC-SDS Score (Covariate) ──
export const MCSDSScoreSchema = z.object({
  totalScore: z.number().int().min(0).max(13),
});
export type MCSDSScore = z.infer<typeof MCSDSScoreSchema>;

// ── §17.2 Five New Baseline Constructs ──
export const BaselineConstructEnum = z.enum([
  "TCE",   // Trust Calibration Error
  "AFS",   // Acceptance Friction Score
  "AOI",   // Authority Overweight Index
  "ETS",   // Emotional Trigger Susceptibility
  "CTCS",  // Comfort-Truth Confusion Score
]);
export type BaselineConstruct = z.infer<typeof BaselineConstructEnum>;

// ── §17.7 Score Formulas ──
export const BaselineScoreSchema = z.object({
  construct: BaselineConstructEnum,
  score: z.number(),
  rawData: z.record(z.string(), z.unknown()),
  // Formulas:
  // TCE = avg|confidence% - correctness%|
  // AFS = weighted(pause + opens + checks + comparisons)
  // AOI = % authority-accepted
  // ETS = acceptance_emotional - acceptance_neutral
  // CTCS = % comfort-weak-evidence accepted
});
export type BaselineScore = z.infer<typeof BaselineScoreSchema>;

// ── §17.8 Success Targets ──
export const BASELINE_TARGETS = {
  TCE: { direction: "decrease", threshold: 0.20 },  // decrease ≥20%
  AFS: { direction: "increase", threshold: 0.25 },  // increase ≥25%
  AOI: { direction: "decrease", threshold: 0.15 },  // decrease ≥15%
  ETS: { direction: "decrease", threshold: 0.15 },  // decrease ≥15%
  CTCS: { direction: "decrease", threshold: 0.15 }, // decrease ≥15%
} as const;

// ── Complete Assessment Response ──
export const AssessmentResponseSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  instrument: InstrumentEnum,
  phase: PhaseEnum,
  rawAnswers: z.record(z.string(), z.unknown()),
  computedScores: z.record(z.string(), z.unknown()),
  startedAt: z.string(), // ISO datetime
  completedAt: z.string(), // ISO datetime
});
export type AssessmentResponse = z.infer<typeof AssessmentResponseSchema>;

// ── §4.5 Success Criteria (7 metrics) ──
export const SUCCESS_CRITERIA = {
  MIST20_improvement: { minimum: 0, target: 0.15, stretch: 0.25 },
  MHLS_improvement: { minimum: "p<0.05", target: "d>=0.5", stretch: "d>=0.8" },
  RCOPE_positive_increase: { minimum: "p<0.05", target: "d>=0.3", stretch: "d>=0.5" },
  RCOPE_negative_no_increase: { minimum: "p>=0.05", target: "decrease", stretch: "sig_decrease" },
  SUS_score: { minimum: 68, target: 75, stretch: 80 },
  completion_rate: { minimum: 0.50, target: 0.65, stretch: 0.80 },
  expert_CVI: { minimum: 0.78, target: 0.85, stretch: 0.95 },
} as const;

// ── §5.1 Power Analysis ──
export const POWER_ANALYSIS = {
  testFamily: "t-test (paired, two-tailed)",
  effectSize: 0.50, // medium, conservative
  alpha: 0.05,
  power: 0.80,
  requiredNPerGroup: 34,
  inflatedFor20Dropout: 42,
  totalTarget: 84,
  software: "G*Power 3.1",
  bonferroniAdjusted: 0.01, // 0.05/5
} as const;
