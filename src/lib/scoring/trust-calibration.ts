/**
 * TRUST CALIBRATION SCORING ENGINE
 * Framework: §17.2 (5 new constructs) + §17.7 (score formulas)
 *
 * Implements the full anti-acceptance measurement system:
 * - TCE: Trust Calibration Error
 * - AFS: Acceptance Friction Score
 * - AOI: Authority Overweight Index
 * - ETS: Emotional Trigger Susceptibility
 * - CTCS: Comfort-Truth Confusion Score
 *
 * These constructs measure whether the student PAUSES before believing,
 * not just whether they know more after the intervention.
 */

// ═══════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════

/** A single claim-confidence pair from the Trust Calibration Battery */
export interface ClaimConfidenceItem {
  claimId: string;
  /** User's classification: real, fake, unsure */
  userClassification: "real" | "fake" | "unsure";
  /** User's confidence in their classification (0-100) */
  confidencePercent: number;
  /** Actual correctness of the claim */
  isActuallyTrue: boolean;
  /** Whether the user's classification was correct */
  isCorrect: boolean;
}

/** A source-ranking response from the Source Ranking Sprint */
export interface SourceRankingItem {
  scenarioId: string;
  /** Source ID and whether user ranked it primarily due to authority signals */
  rankings: Array<{
    sourceId: string;
    userRank: number;
    idealRank: number;
    /** Whether the source has strong authority markers (logo, title, institution name) */
    hasAuthorityMarkers: boolean;
    /** Whether the source has strong evidence quality */
    hasEvidenceQuality: boolean;
  }>;
}

/** An emotion-vs-evidence trial response */
export interface EmotionTrialItem {
  trialId: string;
  /** Whether the user accepted the neutral version */
  acceptedNeutral: boolean;
  /** Whether the user accepted the emotionally-loaded version */
  acceptedEmotional: boolean;
  /** The neutral and emotional versions have identical factual content */
  sameFactualContent: boolean;
}

/** A comfort-vs-accuracy trial response */
export interface ComfortTrialItem {
  trialId: string;
  /** Whether the user rated the comforting version as more reliable */
  ratedComfortingAsMoreReliable: boolean;
  /** Whether the comforting version actually has weaker evidence */
  comfortingHasWeakerEvidence: boolean;
}

/** Verification behavior tracked during Verification Path Replay */
export interface VerificationBehavior {
  replayId: string;
  /** Time in seconds before making a decision */
  pauseTimeSeconds: number;
  /** Number of sources opened */
  sourcesOpened: number;
  /** Number of evidence checks performed */
  evidenceChecks: number;
  /** Number of comparison actions taken */
  comparisonActions: number;
  /** Whether user used any verification tool */
  usedVerificationTool: boolean;
  /** Whether user changed initial judgment */
  changedJudgment: boolean;
}

/** Complete Trust Calibration Profile for a user */
export interface TrustCalibrationProfile {
  /** Trust Calibration Error: gap between confidence and correctness */
  tce: number;
  /** Acceptance Friction Score: degree of pause/check/seek behavior */
  afs: number;
  /** Authority Overweight Index: tendency to trust authority over evidence */
  aoi: number;
  /** Emotional Trigger Susceptibility: emotional content bias */
  ets: number;
  /** Comfort-Truth Confusion Score: comforting ≠ accurate confusion */
  ctcs: number;
  /** Timestamp */
  measuredAt: string;
  /** Phase */
  phase: "pre" | "post";
}

// ═══════════════════════════════════════════════════════
// SCORE FORMULAS — §17.7 EXACT IMPLEMENTATIONS
// ═══════════════════════════════════════════════════════

/**
 * Trust Calibration Error (TCE) — §17.7 Formula 1
 *
 * = average absolute value of (confidence% - correctness%)
 *
 * Where correctness% = 100 if correct, 0 if incorrect.
 * A perfectly calibrated user has TCE = 0.
 * A user who is always 100% confident but always wrong has TCE = 100.
 *
 * POST-TARGET: decrease by at least 20% (§17.8)
 */
export function calculateTCE(items: ClaimConfidenceItem[]): number {
  if (items.length === 0) return 0;

  const totalError = items.reduce((sum, item) => {
    const correctnessPercent = item.isCorrect ? 100 : 0;
    return sum + Math.abs(item.confidencePercent - correctnessPercent);
  }, 0);

  return Math.round((totalError / items.length) * 100) / 100;
}

/**
 * Acceptance Friction Score (AFS) — §17.7 Formula 2
 *
 * = weighted score of pause time + source opens + evidence checks + comparison actions
 *
 * Weights are based on verification behavior value:
 *   - Pause time: 0.15 (per second, capped at 30s)
 *   - Source opens: 3.0 per source
 *   - Evidence checks: 5.0 per check
 *   - Comparison actions: 4.0 per action
 *   - Used verification tool: 8.0 bonus
 *   - Changed judgment: 6.0 bonus
 *
 * Higher AFS = more verification friction = better.
 * POST-TARGET: increase by at least 25% (§17.8)
 */
export function calculateAFS(behaviors: VerificationBehavior[]): number {
  if (behaviors.length === 0) return 0;

  const WEIGHTS = {
    pausePerSecond: 0.15,
    pauseCap: 30,
    sourceOpen: 3.0,
    evidenceCheck: 5.0,
    comparisonAction: 4.0,
    verificationToolBonus: 8.0,
    changedJudgmentBonus: 6.0,
  };

  const totalScore = behaviors.reduce((sum, b) => {
    const pauseScore = Math.min(b.pauseTimeSeconds, WEIGHTS.pauseCap) * WEIGHTS.pausePerSecond;
    const sourceScore = b.sourcesOpened * WEIGHTS.sourceOpen;
    const evidenceScore = b.evidenceChecks * WEIGHTS.evidenceCheck;
    const comparisonScore = b.comparisonActions * WEIGHTS.comparisonAction;
    const toolBonus = b.usedVerificationTool ? WEIGHTS.verificationToolBonus : 0;
    const judgmentBonus = b.changedJudgment ? WEIGHTS.changedJudgmentBonus : 0;

    return sum + pauseScore + sourceScore + evidenceScore + comparisonScore + toolBonus + judgmentBonus;
  }, 0);

  return Math.round((totalScore / behaviors.length) * 100) / 100;
}

/**
 * Authority Overweight Index (AOI) — §17.7 Formula 3
 *
 * = % of answers accepted primarily due to title/logo/status instead of evidence
 *
 * Calculated from source-ranking tasks where sources with strong authority
 * markers but weak evidence are ranked higher than sources with weak
 * authority markers but strong evidence.
 *
 * POST-TARGET: decrease by at least 15% (§17.8)
 */
export function calculateAOI(rankings: SourceRankingItem[]): number {
  if (rankings.length === 0) return 0;

  let totalComparisons = 0;
  let authorityOverweightCount = 0;

  rankings.forEach((scenario) => {
    scenario.rankings.forEach((source) => {
      totalComparisons++;

      // Authority overweight: user ranked a high-authority/low-evidence source
      // higher than a low-authority/high-evidence source
      if (source.hasAuthorityMarkers && !source.hasEvidenceQuality) {
        // Check if user ranked this authority-heavy source above its ideal rank
        if (source.userRank < source.idealRank) {
          authorityOverweightCount++;
        }
      }
    });
  });

  if (totalComparisons === 0) return 0;
  return Math.round((authorityOverweightCount / totalComparisons) * 100 * 100) / 100;
}

/**
 * Emotional Trigger Susceptibility (ETS) — §17.7 Formula 4
 *
 * = acceptance rate for emotional content - acceptance rate for neutral content
 *
 * Measured from matched claim pairs: one neutral, one emotionally loaded,
 * with identical factual content.
 *
 * A user with ETS = 0 is equally discerning regardless of emotional loading.
 * A user with ETS = 50 accepts emotional content 50% more often than neutral.
 *
 * POST-TARGET: decrease by at least 15% (§17.8)
 */
export function calculateETS(trials: EmotionTrialItem[]): number {
  if (trials.length === 0) return 0;

  const neutralAcceptRate = trials.filter((t) => t.acceptedNeutral).length / trials.length;
  const emotionalAcceptRate = trials.filter((t) => t.acceptedEmotional).length / trials.length;

  // Convert to percentage difference
  const ets = (emotionalAcceptRate - neutralAcceptRate) * 100;
  return Math.round(ets * 100) / 100;
}

/**
 * Comfort-Truth Confusion Score (CTCS) — §17.7 Formula 5
 *
 * = % of supportive-feeling but weakly-evidenced content accepted as reliable
 *
 * Especially important in Mental Health and Religion Hub where content
 * that feels comforting may not be evidence-backed.
 *
 * POST-TARGET: decrease by at least 15% (§17.8)
 */
export function calculateCTCS(trials: ComfortTrialItem[]): number {
  if (trials.length === 0) return 0;

  // Only count trials where the comforting version actually has weaker evidence
  const relevantTrials = trials.filter((t) => t.comfortingHasWeakerEvidence);
  if (relevantTrials.length === 0) return 0;

  const confusedCount = relevantTrials.filter((t) => t.ratedComfortingAsMoreReliable).length;
  return Math.round((confusedCount / relevantTrials.length) * 100 * 100) / 100;
}

// ═══════════════════════════════════════════════════════
// COMPOSITE PROFILE BUILDER
// ═══════════════════════════════════════════════════════

/**
 * Build complete Trust Calibration Profile from all battery components.
 * This runs all 5 scoring algorithms and packages results.
 */
export function buildTrustCalibrationProfile(
  claimItems: ClaimConfidenceItem[],
  verificationBehaviors: VerificationBehavior[],
  sourceRankings: SourceRankingItem[],
  emotionTrials: EmotionTrialItem[],
  comfortTrials: ComfortTrialItem[],
  phase: "pre" | "post",
): TrustCalibrationProfile {
  return {
    tce: calculateTCE(claimItems),
    afs: calculateAFS(verificationBehaviors),
    aoi: calculateAOI(sourceRankings),
    ets: calculateETS(emotionTrials),
    ctcs: calculateCTCS(comfortTrials),
    measuredAt: new Date().toISOString(),
    phase,
  };
}

// ═══════════════════════════════════════════════════════
// SUCCESS TARGETS — §17.8
// ═══════════════════════════════════════════════════════

export const TRUST_CALIBRATION_TARGETS = {
  tce: { label: "Trust Calibration Error", direction: "decrease" as const, targetPercent: 20 },
  afs: { label: "Acceptance Friction Score", direction: "increase" as const, targetPercent: 25 },
  aoi: { label: "Authority Overweight Index", direction: "decrease" as const, targetPercent: 15 },
  ets: { label: "Emotional Trigger Susceptibility", direction: "decrease" as const, targetPercent: 15 },
  ctcs: { label: "Comfort-Truth Confusion", direction: "decrease" as const, targetPercent: 15 },
} as const;

/**
 * Calculate improvement percentage between pre and post profiles.
 * Returns positive values for improvement, negative for regression.
 */
export function calculateImprovement(
  pre: TrustCalibrationProfile,
  post: TrustCalibrationProfile,
): Record<string, { value: number; target: number; met: boolean }> {
  const results: Record<string, { value: number; target: number; met: boolean }> = {};

  for (const [key, target] of Object.entries(TRUST_CALIBRATION_TARGETS)) {
    const preVal = pre[key as keyof TrustCalibrationProfile] as number;
    const postVal = post[key as keyof TrustCalibrationProfile] as number;

    if (preVal === 0) {
      results[key] = { value: 0, target: target.targetPercent, met: false };
      continue;
    }

    const changePercent = ((postVal - preVal) / Math.abs(preVal)) * 100;

    // For "decrease" targets, improvement is negative change
    // For "increase" targets, improvement is positive change
    const improvement = target.direction === "decrease" ? -changePercent : changePercent;
    results[key] = {
      value: Math.round(improvement * 100) / 100,
      target: target.targetPercent,
      met: improvement >= target.targetPercent,
    };
  }

  return results;
}
