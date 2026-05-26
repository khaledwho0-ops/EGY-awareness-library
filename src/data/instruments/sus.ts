/**
 * SUS (System Usability Scale) Instrument
 * Framework: §3.2.5, §4.5
 *
 * Brooke, J. (1996). SUS: A 'Quick and Dirty' Usability Scale.
 * In: Usability Evaluation in Industry, pp. 189-194.
 *
 * IMPORTANT: Items use the EXACT original wording from Brooke (1996).
 * The word "system" must NOT be changed to "platform" or "app" —
 * doing so invalidates the psychometric properties (α = .91).
 * Brooke explicitly states that "system" can refer to any product
 * being evaluated — the word is intentionally generic.
 *
 * - 10 items, Likert 1-5 (Strongly Disagree to Strongly Agree)
 * - Score: 0-100
 * - Benchmark: >= 68 above average, >= 80.3 = A (top 10%)
 * - Adjective ratings: Sauro & Lewis (2016)
 * - Post-only assessment
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

const LIKERT_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

/**
 * EXACT original SUS items from Brooke (1996).
 * Items 1,3,5,7,9 are positively worded.
 * Items 2,4,6,8,10 are negatively worded (reversed scoring).
 */
const SUS_QUESTIONS: AssessmentQuestion[] = [
  { id: "sus-01", text: "I think that I would like to use this system frequently.", type: "likert", options: LIKERT_OPTIONS },
  { id: "sus-02", text: "I found the system unnecessarily complex.", type: "likert", options: LIKERT_OPTIONS, reversed: true },
  { id: "sus-03", text: "I thought the system was easy to use.", type: "likert", options: LIKERT_OPTIONS },
  { id: "sus-04", text: "I think that I would need the support of a technical person to be able to use this system.", type: "likert", options: LIKERT_OPTIONS, reversed: true },
  { id: "sus-05", text: "I found the various functions in this system were well integrated.", type: "likert", options: LIKERT_OPTIONS },
  { id: "sus-06", text: "I thought there was too much inconsistency in this system.", type: "likert", options: LIKERT_OPTIONS, reversed: true },
  { id: "sus-07", text: "I would imagine that most people would learn to use this system very quickly.", type: "likert", options: LIKERT_OPTIONS },
  { id: "sus-08", text: "I found the system very cumbersome to use.", type: "likert", options: LIKERT_OPTIONS, reversed: true },
  { id: "sus-09", text: "I felt very confident using the system.", type: "likert", options: LIKERT_OPTIONS },
  { id: "sus-10", text: "I needed to learn a lot of things before I could get going with this system.", type: "likert", options: LIKERT_OPTIONS, reversed: true },
];

/**
 * SUS Scoring Algorithm (Brooke, 1996):
 * - Odd items (1,3,5,7,9): contribution = response - 1
 * - Even items (2,4,6,8,10): contribution = 5 - response
 * - Total = sum of contributions × 2.5 → scale to 0-100
 *
 * Benchmarks (Sauro & Lewis, 2016):
 * - >= 80.3: Grade A (excellent), top 10%
 * - >= 68: Grade B (above average)
 * - >= 51: Grade C (average)
 * - < 51: Grade F (poor)
 *
 * Adjective scale (Bangor et al., 2009):
 * - 85+: Best Imaginable
 * - 73-85: Excellent
 * - 52-73: Good / OK
 * - 38-52: Poor
 * - < 25: Worst Imaginable
 */
function scoreSUS(answers: Record<string, number>): Record<string, number> {
  let sum = 0;
  SUS_QUESTIONS.forEach((q, i) => {
    const response = answers[q.id] || 3; // default to neutral if unanswered
    if (i % 2 === 0) {
      // Odd-numbered items (0-indexed: 0, 2, 4, 6, 8)
      sum += response - 1;
    } else {
      // Even-numbered items (0-indexed: 1, 3, 5, 7, 9)
      sum += 5 - response;
    }
  });

  const totalScore = sum * 2.5;

  // Percentile-based grading (Sauro & Lewis, 2016)
  const gradeValue = totalScore >= 80.3 ? 3 : totalScore >= 68 ? 2 : totalScore >= 51 ? 1 : 0;

  return {
    total_score: Math.round(totalScore * 10) / 10,
    grade_value: gradeValue,
  };
}

export function createSUSConfig(): AssessmentConfig {
  return {
    id: "sus-post",
    name: "System Usability Scale (SUS)",
    shortName: "SUS",
    description:
      'Rate your agreement with each statement about the system you just used. Note: "system" refers to the Egyptian Awareness Library platform.',
    phase: "post",
    questions: SUS_QUESTIONS,
    scoring: scoreSUS,
  };
}
