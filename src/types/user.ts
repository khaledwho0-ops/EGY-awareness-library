/**
 * USER / PARTICIPANT TYPES + ZOD SCHEMAS
 * Framework: §1.5 (sampling strategy), §3.1 (demographics)
 *
 * Group A: All 3 MVPs (n=42)
 * Group B: Waitlist control (n=42)
 * Demographics: age, gender, education year, faculty, prior digital literacy, religious affiliation
 */
import { z } from "zod";

export const GroupAllocationEnum = z.enum(["A", "B"]);
export type GroupAllocation = z.infer<typeof GroupAllocationEnum>;

// ── §3.1 Demographics (6 covariates) ──
export const DemographicsSchema = z.object({
  age: z.number().int().min(18).max(30),
  gender: z.enum(["male", "female", "prefer_not_to_say"]),
  educationYear: z.number().int().min(1).max(6), // 1-4 undergrad + 5-6 postgrad
  faculty: z.string(),
  priorDigitalLiteracy: z.enum(["none", "basic", "intermediate", "advanced"]),
  religiousAffiliation: z.enum(["muslim", "christian", "other", "prefer_not_to_say"]),
});
export type Demographics = z.infer<typeof DemographicsSchema>;

export const ParticipantSchema = z.object({
  id: z.string(), // Random code ID — NO NAMES (§6.4)
  group: GroupAllocationEnum,
  demographics: DemographicsSchema,
  languagePreference: z.enum(["en", "ar"]),
  consentGiven: z.boolean(), // Must be true to participate
  consentTimestamp: z.string(), // ISO datetime
  enrolledAt: z.string(),
  currentDay: z.number().int().min(0).max(15), // Day 0 = baseline, 1-14 = intervention, 15 = post
  completedExercises: z.array(z.string()), // Exercise IDs
  droppedOut: z.boolean().default(false),
  dropoutReason: z.string().optional(),
});
export type Participant = z.infer<typeof ParticipantSchema>;

// ── §1.5 Inclusion criteria ──
export const INCLUSION_CRITERIA = [
  "Enrolled university student",
  "Own a smartphone",
  "Arabic or English literate",
  "Available 15 min/day for 14 days",
] as const;

// ── §1.5 Exclusion criteria ──
export const EXCLUSION_CRITERIA = [
  "Currently receiving psychiatric treatment",
  "Under 18 years of age",
  "Unable to commit to 14-day program",
] as const;
