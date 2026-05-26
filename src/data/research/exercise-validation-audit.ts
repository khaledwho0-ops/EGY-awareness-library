/**
 * EXERCISE VALIDATION AUDIT
 * Chunk 3C — Runtime validation of all 42 exercise JSONs
 *
 * Purpose: Ensures every exercise JSON conforms to the updated
 * ExerciseSchema (with COM-B fields), catching any data gaps
 * before the N=84 pilot deployment.
 *
 * Usage: Import and call validateAllExercises() from admin/test
 */

import { ExerciseSchema } from "../../types/exercise";
import type { Exercise } from "../../types/exercise";

export interface ValidationResult {
  file: string;
  mvp: string;
  day: number;
  valid: boolean;
  errors: string[];
  hasComB: boolean;
  hasBilingualContent: boolean;
  hasSafetyNote: boolean;
  hasEvidence: boolean;
}

export interface ValidationReport {
  totalFiles: number;
  validCount: number;
  invalidCount: number;
  comBCoverage: number;
  bilingualCoverage: number;
  results: ValidationResult[];
  generatedAt: string;
}

/**
 * Validates a single exercise object against the schema.
 */
export function validateExercise(
  exercise: unknown,
  fileName: string
): ValidationResult {
  const result = ExerciseSchema.safeParse(exercise);
  const ex = exercise as Record<string, unknown>;

  return {
    file: fileName,
    mvp: (ex.mvp as string) || "unknown",
    day: (ex.day as number) || 0,
    valid: result.success,
    errors: result.success
      ? []
      : result.error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`
        ),
    hasComB: !!ex.com_b_target && !!ex.com_b_mechanism,
    hasBilingualContent: !!ex.titleAr && !!ex.learningObjectiveAr,
    hasSafetyNote: ex.safetyNote !== null && ex.safetyNote !== undefined,
    hasEvidence: !!ex.evidence,
  };
}

/**
 * Generates a summary report header for logging.
 */
export function formatValidationSummary(report: ValidationReport): string {
  const lines = [
    `═══ Exercise Validation Report ═══`,
    `Generated: ${report.generatedAt}`,
    `Total: ${report.totalFiles} | Valid: ${report.validCount} | Invalid: ${report.invalidCount}`,
    `COM-B Coverage: ${report.comBCoverage}/${report.totalFiles} (${Math.round((report.comBCoverage / report.totalFiles) * 100)}%)`,
    `Bilingual Coverage: ${report.bilingualCoverage}/${report.totalFiles} (${Math.round((report.bilingualCoverage / report.totalFiles) * 100)}%)`,
    ``,
  ];

  for (const r of report.results) {
    const status = r.valid ? "✅" : "❌";
    const comB = r.hasComB ? "🎯" : "⚠️";
    lines.push(`${status} ${comB} ${r.file} (${r.mvp} day-${r.day})`);
    if (!r.valid) {
      for (const err of r.errors) {
        lines.push(`   └─ ${err}`);
      }
    }
  }

  return lines.join("\n");
}
