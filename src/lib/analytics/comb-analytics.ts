/**
 * COM-B ANALYTICS MODULE
 * Chunk 6 — Behavioral Change Analytics for N=84 Pilot
 *
 * Purpose: Aggregates COM-B target data from completed exercises
 * to generate behavioral change profile reports. This enables
 * researchers to track which COM-B segments the participant
 * has trained and identify coverage gaps.
 *
 * Template: Non-Negotiable #4 (COM-B mapping mandatory)
 * Framework: §3.1 variable map, §5.2 analysis plan
 */

import { getProgress } from "../progress/progress-service";

export interface ComBProfile {
  /** Total exercises completed */
  totalCompleted: number;

  /** Breakdown by COM-B target */
  byTarget: Record<string, number>;

  /** Percentage distribution */
  distribution: Record<string, number>;

  /** Coverage: how many of the 6 COM-B segments have been exercised */
  coverageSegments: number;
  totalSegments: 6;

  /** Exercises missing COM-B data (legacy or corrupted) */
  missingComBCount: number;

  /** Per-MVP breakdown */
  byMVP: Record<string, Record<string, number>>;

  /** Average score per COM-B target (performance analysis) */
  avgScoreByTarget: Record<string, { avgPercent: number; count: number }>;
}

const ALL_SEGMENTS = [
  "Capability/Psychological",
  "Capability/Physical",
  "Motivation/Reflective",
  "Motivation/Automatic",
  "Opportunity/Social",
  "Opportunity/Physical",
];

/**
 * Generates a COM-B behavioral change profile from completed exercises.
 */
export function getComBProfile(): ComBProfile {
  const progress = getProgress();
  const exercises = progress.exercises;

  const byTarget: Record<string, number> = {};
  const byMVP: Record<string, Record<string, number>> = {
    deepreal: {},
    "mental-health": {},
    "religion-hub": {},
  };
  const scoreAccum: Record<string, { totalPercent: number; count: number }> = {};
  let missingCount = 0;

  for (const ex of exercises) {
    if (!ex.comBTarget) {
      missingCount++;
      continue;
    }

    // Aggregate by target
    byTarget[ex.comBTarget] = (byTarget[ex.comBTarget] || 0) + 1;

    // Aggregate by MVP
    if (!byMVP[ex.mvp]) byMVP[ex.mvp] = {};
    byMVP[ex.mvp][ex.comBTarget] = (byMVP[ex.mvp][ex.comBTarget] || 0) + 1;

    // Score tracking
    if (!scoreAccum[ex.comBTarget]) {
      scoreAccum[ex.comBTarget] = { totalPercent: 0, count: 0 };
    }
    const pct = ex.maxScore > 0 ? (ex.score / ex.maxScore) * 100 : 0;
    scoreAccum[ex.comBTarget].totalPercent += pct;
    scoreAccum[ex.comBTarget].count += 1;
  }

  // Calculate distribution
  const totalWithComB = exercises.length - missingCount;
  const distribution: Record<string, number> = {};
  for (const [target, count] of Object.entries(byTarget)) {
    distribution[target] = totalWithComB > 0
      ? Math.round((count / totalWithComB) * 100)
      : 0;
  }

  // Coverage
  const coveredSegments = ALL_SEGMENTS.filter(s => (byTarget[s] || 0) > 0).length;

  // Average scores
  const avgScoreByTarget: Record<string, { avgPercent: number; count: number }> = {};
  for (const [target, data] of Object.entries(scoreAccum)) {
    avgScoreByTarget[target] = {
      avgPercent: Math.round(data.totalPercent / data.count),
      count: data.count,
    };
  }

  return {
    totalCompleted: exercises.length,
    byTarget,
    distribution,
    coverageSegments: coveredSegments,
    totalSegments: 6,
    missingComBCount: missingCount,
    byMVP,
    avgScoreByTarget,
  };
}

/**
 * Returns a human-readable COM-B summary for the dashboard.
 */
export function getComBSummary(): string {
  const profile = getComBProfile();

  if (profile.totalCompleted === 0) {
    return "No exercises completed yet. Start your first exercise to begin tracking behavioral change.";
  }

  const lines: string[] = [];
  lines.push(`📊 ${profile.totalCompleted} exercises completed`);
  lines.push(`🎯 COM-B Coverage: ${profile.coverageSegments}/${profile.totalSegments} segments`);

  const sorted = Object.entries(profile.byTarget).sort((a, b) => b[1] - a[1]);
  for (const [target, count] of sorted) {
    const pct = profile.distribution[target] || 0;
    const avgScore = profile.avgScoreByTarget[target];
    const scoreStr = avgScore ? ` (avg ${avgScore.avgPercent}%)` : "";
    lines.push(`  • ${target}: ${count}x (${pct}%)${scoreStr}`);
  }

  if (profile.missingComBCount > 0) {
    lines.push(`⚠️ ${profile.missingComBCount} exercises missing COM-B data`);
  }

  return lines.join("\n");
}

/**
 * Returns COM-B coverage gaps — segments not yet exercised.
 */
export function getComBGaps(): string[] {
  const profile = getComBProfile();
  return ALL_SEGMENTS.filter(s => !(profile.byTarget[s]));
}
