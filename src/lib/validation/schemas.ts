/**
 * Q75/Q94: ZOD SCHEMAS — Strict validation for all form/assessment data
 * Prevents polluted data (empty texts, extreme values) from entering the database.
 * Normalizes responses from 5 different APIs into a unified card display format.
 */

// Lightweight Zod-like runtime validation (no external dependency)
// Production: replace with import { z } from "zod"

type ValidationResult<T> = { success: true; data: T } | { success: false; error: string };

/** Assessment submission schema */
export interface AssessmentSubmission {
  instrumentId: string;
  phase: "pre" | "post";
  responses: Record<string, number>;
  startedAt: string;
  completedAt: string;
  participantId: string;
}

export function validateAssessmentSubmission(data: unknown): ValidationResult<AssessmentSubmission> {
  if (!data || typeof data !== "object") return { success: false, error: "Data must be an object" };
  const d = data as Record<string, unknown>;

  if (!d.instrumentId || typeof d.instrumentId !== "string" || d.instrumentId.length < 2)
    return { success: false, error: "instrumentId must be a non-empty string" };
  if (d.phase !== "pre" && d.phase !== "post")
    return { success: false, error: "phase must be 'pre' or 'post'" };
  if (!d.responses || typeof d.responses !== "object")
    return { success: false, error: "responses must be an object" };

  // Validate each response is a number within acceptable range
  for (const [key, val] of Object.entries(d.responses as Record<string, unknown>)) {
    if (typeof val !== "number" || val < 0 || val > 100)
      return { success: false, error: `Response '${key}' must be a number 0-100` };
  }

  if (!d.startedAt || typeof d.startedAt !== "string")
    return { success: false, error: "startedAt must be an ISO date string" };
  if (!d.completedAt || typeof d.completedAt !== "string")
    return { success: false, error: "completedAt must be an ISO date string" };

  return { success: true, data: d as unknown as AssessmentSubmission };
}

/** Normalized API Response schema — Unified card format from 5 APIs */
export interface NormalizedSource {
  id: string;
  title: string;
  sourceName: string;
  url: string;
  claimReviewed?: string;
  rating?: string;
  datePublished?: string;
  apiOrigin: "factcheck" | "openalex" | "crossref" | "nominatim" | "local";
}

export function validateNormalizedSource(data: unknown): ValidationResult<NormalizedSource> {
  if (!data || typeof data !== "object") return { success: false, error: "Data must be an object" };
  const d = data as Record<string, unknown>;

  if (!d.id || typeof d.id !== "string") return { success: false, error: "id required" };
  if (!d.title || typeof d.title !== "string") return { success: false, error: "title required" };
  if (!d.sourceName || typeof d.sourceName !== "string") return { success: false, error: "sourceName required" };
  if (!d.url || typeof d.url !== "string") return { success: false, error: "url required" };

  const validOrigins = ["factcheck", "openalex", "crossref", "nominatim", "local"];
  if (!validOrigins.includes(d.apiOrigin as string))
    return { success: false, error: "apiOrigin must be one of: " + validOrigins.join(", ") };

  return { success: true, data: d as unknown as NormalizedSource };
}

/** Exercise completion validation */
export interface ExerciseSubmission {
  exerciseId: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  day: number;
  answers: Record<string, string | number>;
  confidencePre: number;
  confidencePost: number;
  timeSpentSeconds: number;
}

export function validateExerciseSubmission(data: unknown): ValidationResult<ExerciseSubmission> {
  if (!data || typeof data !== "object") return { success: false, error: "Data must be an object" };
  const d = data as Record<string, unknown>;

  if (!d.exerciseId || typeof d.exerciseId !== "string")
    return { success: false, error: "exerciseId required" };
  if (!["deepreal", "mental-health", "religion-hub"].includes(d.mvp as string))
    return { success: false, error: "mvp must be deepreal, mental-health, or religion-hub" };
  if (typeof d.day !== "number" || d.day < 1 || d.day > 14)
    return { success: false, error: "day must be 1-14" };
  if (typeof d.confidencePre !== "number" || d.confidencePre < 0 || d.confidencePre > 100)
    return { success: false, error: "confidencePre must be 0-100" };
  if (typeof d.confidencePost !== "number" || d.confidencePost < 0 || d.confidencePost > 100)
    return { success: false, error: "confidencePost must be 0-100" };
  if (typeof d.timeSpentSeconds !== "number" || d.timeSpentSeconds < 0)
    return { success: false, error: "timeSpentSeconds must be >= 0" };

  return { success: true, data: d as unknown as ExerciseSubmission };
}
