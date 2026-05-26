import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import { SUPPORT_DIRECTORIES } from "@/data/directory/support-registry";
import { auditSourceFreshness, getFreshnessSummary } from "@/lib/registry/source-freshness";
import { anonymizeParticipantEntity } from "@/lib/research/anonymization";
import {
  getCorrectionLedgerEntries,
  getProgress,
  type AssessmentProgress,
  type UserProgress,
} from "@/lib/progress/progress-service";

export type StudyArm = "tri-module" | "single-module" | "mixed-module" | "waitlist";

export interface ParticipantSnapshot {
  participantId: string;
  capturedAt: string;
  studyArm: StudyArm;
  languageProfile: "english" | "arabic" | "mixed" | "unknown";
  exerciseCounts: Record<"deepreal" | "mental-health" | "religion-hub", number>;
  exercisesCompleted: number;
  streakDays: number;
  totalTimeMinutes: number;
  avgMinutesPerExercise: number;
  sourceOpens: number;
  uniqueSources: number;
  promptUses: number;
  verificationCompleted: number;
  verificationSkipped: number;
  avgGatesFilled: number;
  correctionEntries: number;
  confidenceShift: number | null;
  trustCalibration: {
    baselineCtcs: number | null;
    midpointCtcs: number | null;
    postCtcs: number | null;
    latestCtcs: number | null;
    latestTce: number | null;
    latestAfs: number | null;
    latestEts: number | null;
  };
  assessments: {
    mistPre: number | null;
    mistPost: number | null;
    mistShift: number | null;
    mistVeracityShift: number | null;
    mistNaiveteShift: number | null;
    mistDistrustShift: number | null;
    mhlsPre: number | null;
    mhlsPost: number | null;
    mhlsShift: number | null;
    ghsqPre: number | null;
    ghsqPost: number | null;
    ghsqShift: number | null;
    rcopePositivePre: number | null;
    rcopePositivePost: number | null;
    rcopePositiveShift: number | null;
    rcopeNegativePre: number | null;
    rcopeNegativePost: number | null;
    rcopeNegativeShift: number | null;
    susPost: number | null;
    mcsdsPre: number | null;
    compositeImprovement: number | null;
  };
  matchedPairs: {
    mist: boolean;
    mhls: boolean;
    ghsq: boolean;
    rcope: boolean;
    sus: boolean;
  };
}

export interface StatisticalResult {
  n: number;
  meanPre: number | null;
  meanPost: number | null;
  meanShift: number | null;
  pValue: number | null;
  effectSize: number | null;
}

export interface SupervisorAnalytics {
  totalParticipants: number;
  completionRate: number;
  avgSUS: number | null;
  susPassRate: number | null;
  matchedPairCounts: Record<"mist" | "mhls" | "ghsq" | "rcope" | "sus", number>;
  engines: {
    deepreal: {
      activeParticipants: number;
      completedParticipants: number;
      avgMistShift: number | null;
      avgVeracityShift: number | null;
      avgNaiveteShift: number | null;
      avgDistrustShift: number | null;
      avgCtcs: number | null;
    };
    mentalHealth: {
      activeParticipants: number;
      completedParticipants: number;
      avgMhlsShift: number | null;
      avgGhsqShift: number | null;
      avgCtcs: number | null;
      avgConfidenceShift: number | null;
    };
    religionHub: {
      activeParticipants: number;
      completedParticipants: number;
      avgPositiveCopingShift: number | null;
      avgNegativeCopingShift: number | null;
      avgCtcs: number | null;
      avgCorrectionEntries: number | null;
    };
  };
  interventions: {
    sourceOpens: number;
    promptUses: number;
    verificationCompleted: number;
    verificationSkipped: number;
    correctionEntries: number;
  };
  hypotheses: Array<{
    id: string;
    label: string;
    result: StatisticalResult;
    significant: boolean;
    interpretation: string;
  }>;
  sourceOps: {
    freshness: ReturnType<typeof getFreshnessSummary>;
    missingUrls: number;
    missingBackups: number;
    pinnedSources: number;
    adminOnlySources: number;
    directoriesConfirmed: number;
    directoriesPending: number;
  };
}

const COHORT_KEY = "eal-research-cohort";
const PARTICIPANT_ID_KEY = "eal-participant-id";

function createParticipantId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `participant-${Date.now()}`;
}

function getPersistentParticipantId(): string {
  if (typeof window === "undefined") {
    return "server-participant";
  }

  const existing = localStorage.getItem(PARTICIPANT_ID_KEY);
  if (existing) {
    return existing;
  }

  const created = createParticipantId();
  localStorage.setItem(PARTICIPANT_ID_KEY, created);
  return created;
}

function getAssessment(progress: UserProgress, instrumentId: string, phase: "pre" | "post"): AssessmentProgress | null {
  return progress.assessments.find(
    (entry) => entry.instrumentId === instrumentId && entry.phase === phase,
  ) ?? null;
}

function getNumericScore(entry: AssessmentProgress | null, key: string): number | null {
  if (!entry) {
    return null;
  }

  const value = entry.scores[key];
  return typeof value === "number" ? value : null;
}

function getShift(pre: number | null, post: number | null): number | null {
  if (pre === null || post === null) {
    return null;
  }
  return round(post - pre);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function average(values: Array<number | null | undefined>): number | null {
  const filtered = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (filtered.length === 0) {
    return null;
  }
  return round(filtered.reduce((sum, value) => sum + value, 0) / filtered.length);
}

function sampleStd(values: number[]): number | null {
  if (values.length < 2) {
    return null;
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

function estimateLanguage(progress: UserProgress): ParticipantSnapshot["languageProfile"] {
  const hasArabicAssessmentText =
    progress.assessments.some((entry) =>
      entry.instrumentId === "ghsq" || entry.instrumentId === "brief-rcope",
    );
  if (hasArabicAssessmentText) {
    return "mixed";
  }
  return "english";
}

function inferStudyArm(exerciseCounts: ParticipantSnapshot["exerciseCounts"]): StudyArm {
  const usedModules = Object.values(exerciseCounts).filter((count) => count > 0).length;
  if (usedModules === 0) {
    return "waitlist";
  }
  if (usedModules === 1) {
    return "single-module";
  }
  if (usedModules === 3) {
    return "tri-module";
  }
  return "mixed-module";
}

function getPairedValues(
  snapshots: ParticipantSnapshot[],
  preKey: keyof ParticipantSnapshot["assessments"],
  postKey: keyof ParticipantSnapshot["assessments"],
): Array<{ pre: number; post: number }> {
  return snapshots.flatMap((snapshot) => {
    const pre = snapshot.assessments[preKey];
    const post = snapshot.assessments[postKey];
    if (typeof pre === "number" && typeof post === "number") {
      return [{ pre, post }];
    }
    return [];
  });
}

function logGamma(x: number): number {
  const cof = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.001208650973866179,
    -0.000005395239384953,
  ];

  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;

  for (const value of cof) {
    y += 1;
    ser += value / y;
  }

  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function betaContinuedFraction(x: number, a: number, b: number): number {
  const maxIterations = 100;
  const epsilon = 3e-7;
  const fpMin = 1e-30;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;

  if (Math.abs(d) < fpMin) {
    d = fpMin;
  }

  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIterations; m += 1) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpMin) {
      d = fpMin;
    }
    c = 1 + aa / c;
    if (Math.abs(c) < fpMin) {
      c = fpMin;
    }
    d = 1 / d;
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpMin) {
      d = fpMin;
    }
    c = 1 + aa / c;
    if (Math.abs(c) < fpMin) {
      c = fpMin;
    }
    d = 1 / d;
    const delta = d * c;
    h *= delta;

    if (Math.abs(delta - 1) < epsilon) {
      break;
    }
  }

  return h;
}

function regularizedIncompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) {
    return 0;
  }
  if (x >= 1) {
    return 1;
  }

  const bt = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x),
  );

  if (x < (a + 1) / (a + b + 2)) {
    return (bt * betaContinuedFraction(x, a, b)) / a;
  }

  return 1 - (bt * betaContinuedFraction(1 - x, b, a)) / b;
}

function studentTCdf(t: number, degreesOfFreedom: number): number {
  if (degreesOfFreedom <= 0) {
    return 0.5;
  }

  const x = degreesOfFreedom / (degreesOfFreedom + t * t);
  const ib = regularizedIncompleteBeta(x, degreesOfFreedom / 2, 0.5);

  if (t >= 0) {
    return 1 - 0.5 * ib;
  }

  return 0.5 * ib;
}

function runPairedTTest(pairs: Array<{ pre: number; post: number }>): StatisticalResult {
  if (pairs.length < 2) {
    return {
      n: pairs.length,
      meanPre: average(pairs.map((pair) => pair.pre)),
      meanPost: average(pairs.map((pair) => pair.post)),
      meanShift: average(pairs.map((pair) => pair.post - pair.pre)),
      pValue: null,
      effectSize: null,
    };
  }

  const diffs = pairs.map((pair) => pair.post - pair.pre);
  const meanDiff = diffs.reduce((sum, value) => sum + value, 0) / diffs.length;
  const sdDiff = sampleStd(diffs);

  if (!sdDiff || sdDiff === 0) {
    return {
      n: pairs.length,
      meanPre: average(pairs.map((pair) => pair.pre)),
      meanPost: average(pairs.map((pair) => pair.post)),
      meanShift: round(meanDiff),
      pValue: null,
      effectSize: null,
    };
  }

  const tStatistic = meanDiff / (sdDiff / Math.sqrt(diffs.length));
  const degreesOfFreedom = diffs.length - 1;
  const pValue = round(2 * (1 - studentTCdf(Math.abs(tStatistic), degreesOfFreedom)));
  const effectSize = round(meanDiff / sdDiff);

  return {
    n: pairs.length,
    meanPre: average(pairs.map((pair) => pair.pre)),
    meanPost: average(pairs.map((pair) => pair.post)),
    meanShift: round(meanDiff),
    pValue,
    effectSize,
  };
}

function runWelchTTest(groupA: number[], groupB: number[]): StatisticalResult {
  if (groupA.length < 2 || groupB.length < 2) {
    return {
      n: Math.min(groupA.length, groupB.length),
      meanPre: average(groupA),
      meanPost: average(groupB),
      meanShift: average(groupB) !== null && average(groupA) !== null
        ? round((average(groupB) ?? 0) - (average(groupA) ?? 0))
        : null,
      pValue: null,
      effectSize: null,
    };
  }

  const meanA = groupA.reduce((sum, value) => sum + value, 0) / groupA.length;
  const meanB = groupB.reduce((sum, value) => sum + value, 0) / groupB.length;
  const sdA = sampleStd(groupA);
  const sdB = sampleStd(groupB);

  if (!sdA || !sdB) {
    return {
      n: Math.min(groupA.length, groupB.length),
      meanPre: round(meanA),
      meanPost: round(meanB),
      meanShift: round(meanB - meanA),
      pValue: null,
      effectSize: null,
    };
  }

  const varA = (sdA ** 2) / groupA.length;
  const varB = (sdB ** 2) / groupB.length;
  const tStatistic = (meanB - meanA) / Math.sqrt(varA + varB);
  const numerator = (varA + varB) ** 2;
  const denominator =
    (varA ** 2) / (groupA.length - 1) +
    (varB ** 2) / (groupB.length - 1);
  const degreesOfFreedom = denominator === 0 ? 1 : numerator / denominator;
  const pValue = round(2 * (1 - studentTCdf(Math.abs(tStatistic), degreesOfFreedom)));
  const pooled = Math.sqrt((((groupA.length - 1) * sdA ** 2) + ((groupB.length - 1) * sdB ** 2)) / (groupA.length + groupB.length - 2));
  const effectSize = pooled === 0 ? null : round((meanB - meanA) / pooled);

  return {
    n: Math.min(groupA.length, groupB.length),
    meanPre: round(meanA),
    meanPost: round(meanB),
    meanShift: round(meanB - meanA),
    pValue,
    effectSize,
  };
}

export function buildParticipantSnapshot(
  progress: UserProgress,
  participantId = getPersistentParticipantId(),
  includeLocalCorrectionLedger = false,
): ParticipantSnapshot {
  const exerciseCounts = {
    deepreal: progress.exercises.filter((entry) => entry.mvp === "deepreal").length,
    "mental-health": progress.exercises.filter((entry) => entry.mvp === "mental-health").length,
    "religion-hub": progress.exercises.filter((entry) => entry.mvp === "religion-hub").length,
  };

  const sourceOpenTotal = progress.sourceClicks.length;
  const uniqueSources = new Set(progress.sourceClicks.map((entry) => entry.sourceId)).size;
  const verificationCompleted = progress.verificationEvents.filter((entry) => !entry.skipped).length;
  const verificationSkipped = progress.verificationEvents.filter((entry) => entry.skipped).length;
  const gates = progress.verificationEvents
    .map((entry) => entry.gatesFilled)
    .filter((value): value is number => typeof value === "number");

  const mistPre = getAssessment(progress, "mist20", "pre");
  const mistPost = getAssessment(progress, "mist20", "post");
  const mhlsPre = getAssessment(progress, "mhls", "pre");
  const mhlsPost = getAssessment(progress, "mhls", "post");
  const ghsqPre = getAssessment(progress, "ghsq", "pre");
  const ghsqPost = getAssessment(progress, "ghsq", "post");
  const rcopePre = getAssessment(progress, "brief-rcope", "pre");
  const rcopePost = getAssessment(progress, "brief-rcope", "post");
  const susPost = getAssessment(progress, "sus", "post");
  const mcsdsPre = getAssessment(progress, "mc-sds", "pre");

  const mistPreTotal = getNumericScore(mistPre, "total_score");
  const mistPostTotal = getNumericScore(mistPost, "total_score");
  const mhlsPreTotal = getNumericScore(mhlsPre, "total_score");
  const mhlsPostTotal = getNumericScore(mhlsPost, "total_score");
  const ghsqPreTotal = getNumericScore(ghsqPre, "overall_help_seeking");
  const ghsqPostTotal = getNumericScore(ghsqPost, "overall_help_seeking");
  const rcopePositivePre = getNumericScore(rcopePre, "positive_coping");
  const rcopePositivePost = getNumericScore(rcopePost, "positive_coping");
  const rcopeNegativePre = getNumericScore(rcopePre, "negative_coping");
  const rcopeNegativePost = getNumericScore(rcopePost, "negative_coping");
  const susPostTotal = getNumericScore(susPost, "total_score");
  const mcsdsPreTotal = getNumericScore(mcsdsPre, "total_score");

  const trustBaseline = progress.trustCalibration.find((entry) => entry.phase === "baseline") ?? null;
  const trustMidpoint = progress.trustCalibration.find((entry) => entry.phase === "midpoint") ?? null;
  const trustPost = progress.trustCalibration.find((entry) => entry.phase === "post") ?? null;
  const trustLatest = progress.trustCalibration.at(-1) ?? null;

  const normalizedChanges = [
    getShift(mistPreTotal, mistPostTotal) !== null ? (getShift(mistPreTotal, mistPostTotal) ?? 0) / 20 : null,
    getShift(mhlsPreTotal, mhlsPostTotal) !== null ? (getShift(mhlsPreTotal, mhlsPostTotal) ?? 0) / 125 : null,
    getShift(ghsqPreTotal, ghsqPostTotal) !== null ? (getShift(ghsqPreTotal, ghsqPostTotal) ?? 0) / 7 : null,
    getShift(rcopePositivePre, rcopePositivePost) !== null ? (getShift(rcopePositivePre, rcopePositivePost) ?? 0) / 21 : null,
    getShift(rcopeNegativePre, rcopeNegativePost) !== null ? (-(getShift(rcopeNegativePre, rcopeNegativePost) ?? 0)) / 21 : null,
  ].filter((value): value is number => typeof value === "number");

  return {
    participantId,
    capturedAt: new Date().toISOString(),
    studyArm: inferStudyArm(exerciseCounts),
    languageProfile: estimateLanguage(progress),
    exerciseCounts,
    exercisesCompleted: progress.exercises.length,
    streakDays: progress.streak,
    totalTimeMinutes: progress.totalTimeMinutes,
    avgMinutesPerExercise: progress.exercises.length > 0 ? round(progress.totalTimeMinutes / progress.exercises.length) : 0,
    sourceOpens: sourceOpenTotal,
    uniqueSources,
    promptUses: progress.promptUsage.length,
    verificationCompleted,
    verificationSkipped,
    avgGatesFilled: gates.length > 0 ? round(gates.reduce((sum, value) => sum + value, 0) / gates.length) : 0,
    correctionEntries: includeLocalCorrectionLedger ? getCorrectionLedgerEntries().length : 0,
    confidenceShift: progress.exercises.some((entry) => typeof entry.confidencePre === "number" && typeof entry.confidencePost === "number")
      ? average(progress.exercises.map((entry) =>
          typeof entry.confidencePre === "number" && typeof entry.confidencePost === "number"
            ? entry.confidencePost - entry.confidencePre
            : null,
        ))
      : null,
    trustCalibration: {
      baselineCtcs: trustBaseline?.ctcs ?? null,
      midpointCtcs: trustMidpoint?.ctcs ?? null,
      postCtcs: trustPost?.ctcs ?? null,
      latestCtcs: trustLatest?.ctcs ?? null,
      latestTce: trustLatest?.tce ?? null,
      latestAfs: trustLatest?.afs ?? null,
      latestEts: trustLatest?.ets ?? null,
    },
    assessments: {
      mistPre: mistPreTotal,
      mistPost: mistPostTotal,
      mistShift: getShift(mistPreTotal, mistPostTotal),
      mistVeracityShift: getShift(getNumericScore(mistPre, "veracity_discernment"), getNumericScore(mistPost, "veracity_discernment")),
      mistNaiveteShift: getShift(getNumericScore(mistPre, "naivete"), getNumericScore(mistPost, "naivete")),
      mistDistrustShift: getShift(getNumericScore(mistPre, "distrust"), getNumericScore(mistPost, "distrust")),
      mhlsPre: mhlsPreTotal,
      mhlsPost: mhlsPostTotal,
      mhlsShift: getShift(mhlsPreTotal, mhlsPostTotal),
      ghsqPre: ghsqPreTotal,
      ghsqPost: ghsqPostTotal,
      ghsqShift: getShift(ghsqPreTotal, ghsqPostTotal),
      rcopePositivePre,
      rcopePositivePost,
      rcopePositiveShift: getShift(rcopePositivePre, rcopePositivePost),
      rcopeNegativePre,
      rcopeNegativePost,
      rcopeNegativeShift: getShift(rcopeNegativePre, rcopeNegativePost),
      susPost: susPostTotal,
      mcsdsPre: mcsdsPreTotal,
      compositeImprovement: normalizedChanges.length > 0 ? round((normalizedChanges.reduce((sum, value) => sum + value, 0) / normalizedChanges.length) * 100) : null,
    },
    matchedPairs: {
      mist: mistPreTotal !== null && mistPostTotal !== null,
      mhls: mhlsPreTotal !== null && mhlsPostTotal !== null,
      ghsq: ghsqPreTotal !== null && ghsqPostTotal !== null,
      rcope: rcopePositivePre !== null && rcopePositivePost !== null && rcopeNegativePre !== null && rcopeNegativePost !== null,
      sus: susPostTotal !== null,
    },
  };
}

export function getCurrentParticipantSnapshot(): ParticipantSnapshot {
  return buildParticipantSnapshot(getProgress(), getPersistentParticipantId(), true);
}

export function syncCurrentParticipantSnapshot(): ParticipantSnapshot[] {
  return upsertParticipantSnapshot(getCurrentParticipantSnapshot());
}

export async function getCurrentParticipantSnapshotForExport(): Promise<ParticipantSnapshot> {
  return anonymizeParticipantEntity(getCurrentParticipantSnapshot());
}

export function getResearchCohort(): ParticipantSnapshot[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(COHORT_KEY);
    return raw ? (JSON.parse(raw) as ParticipantSnapshot[]) : [];
  } catch {
    return [];
  }
}

function saveResearchCohort(cohort: ParticipantSnapshot[]): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(COHORT_KEY, JSON.stringify(cohort));
}

export function upsertParticipantSnapshot(snapshot: ParticipantSnapshot): ParticipantSnapshot[] {
  const cohort = getResearchCohort();
  const existingIndex = cohort.findIndex((entry) => entry.participantId === snapshot.participantId);

  if (existingIndex >= 0) {
    cohort[existingIndex] = snapshot;
  } else {
    cohort.push(snapshot);
  }

  saveResearchCohort(cohort);
  return cohort;
}

export function removeParticipantSnapshot(participantId: string): ParticipantSnapshot[] {
  const cohort = getResearchCohort().filter((entry) => entry.participantId !== participantId);
  saveResearchCohort(cohort);
  return cohort;
}

function looksLikeProgress(value: unknown): value is UserProgress {
  return Boolean(
    value &&
    typeof value === "object" &&
    "exercises" in value &&
    "assessments" in value &&
    "sourceClicks" in value,
  );
}

function looksLikeSnapshot(value: unknown): value is ParticipantSnapshot {
  return Boolean(
    value &&
    typeof value === "object" &&
    "participantId" in value &&
    "assessments" in value &&
    "exerciseCounts" in value,
  );
}

export function importParticipantPayload(payload: unknown): ParticipantSnapshot {
  if (looksLikeSnapshot(payload)) {
    return payload;
  }

  if (looksLikeProgress(payload)) {
    return buildParticipantSnapshot(payload, createParticipantId());
  }

  throw new Error("Unsupported participant payload. Import exported participant JSON or a participant snapshot.");
}

export function importParticipantJsonText(text: string): ParticipantSnapshot[] {
  const parsed = JSON.parse(text) as unknown;

  const items = Array.isArray(parsed) ? parsed : [parsed];
  return items.map((item) => importParticipantPayload(item));
}

export function buildSupervisorAnalytics(cohortInput?: ParticipantSnapshot[]): SupervisorAnalytics {
  const cohort = cohortInput ?? getResearchCohort();
  const completionRate = cohort.length > 0
    ? round((cohort.filter((entry) => entry.exercisesCompleted >= 42).length / cohort.length) * 100)
    : 0;
  const avgSUS = average(cohort.map((entry) => entry.assessments.susPost));
  const susPassRateValues = cohort.filter((entry) => typeof entry.assessments.susPost === "number");
  const susPassRate = susPassRateValues.length > 0
    ? round((susPassRateValues.filter((entry) => (entry.assessments.susPost ?? 0) >= 68).length / susPassRateValues.length) * 100)
    : null;

  const freshness = getFreshnessSummary(auditSourceFreshness(TRUSTED_SOURCES));
  const directoriesConfirmed = SUPPORT_DIRECTORIES.filter((entry) => entry.status === "confirmed").length;
  const directoriesPending = SUPPORT_DIRECTORIES.filter((entry) => entry.status === "pending").length;

  const deeprealSnapshots = cohort.filter((entry) => entry.exerciseCounts.deepreal > 0);
  const mentalHealthSnapshots = cohort.filter((entry) => entry.exerciseCounts["mental-health"] > 0);
  const religionHubSnapshots = cohort.filter((entry) => entry.exerciseCounts["religion-hub"] > 0);

  const mistPairs = getPairedValues(cohort, "mistPre", "mistPost");
  const mhlsPairs = getPairedValues(cohort, "mhlsPre", "mhlsPost");
  const ghsqPairs = getPairedValues(cohort, "ghsqPre", "ghsqPost");
  const rcopePairs = getPairedValues(cohort, "rcopePositivePre", "rcopePositivePost");
  const rcopeNegativePairs = getPairedValues(cohort, "rcopeNegativePre", "rcopeNegativePost");

  const hypotheses = [
    {
      id: "H1",
      label: "MIST-20 improvement after DeepReal exposure",
      result: runPairedTTest(mistPairs),
    },
    {
      id: "H2",
      label: "MHLS improvement after Mental Health exposure",
      result: runPairedTTest(mhlsPairs),
    },
    {
      id: "H3",
      label: "GHSQ help-seeking improvement after Mental Health exposure",
      result: runPairedTTest(ghsqPairs),
    },
    {
      id: "H4",
      label: "Positive religious coping increases without negative coping increase",
      result: runPairedTTest(rcopePairs),
    },
    {
      id: "H5",
      label: "Tri-module participants outperform single-module participants on normalized improvement",
      result: runWelchTTest(
        cohort
          .filter((entry) => entry.studyArm === "single-module")
          .map((entry) => entry.assessments.compositeImprovement)
          .filter((value): value is number => typeof value === "number"),
        cohort
          .filter((entry) => entry.studyArm === "tri-module")
          .map((entry) => entry.assessments.compositeImprovement)
          .filter((value): value is number => typeof value === "number"),
      ),
    },
  ].map((hypothesis) => {
    let significant = false;
    let interpretation = "Insufficient matched data.";

    if (hypothesis.result.pValue !== null) {
      significant = hypothesis.result.pValue < 0.01;
      interpretation = significant
        ? "Meets the Bonferroni-adjusted threshold."
        : "Observed change is real-valued, but does not pass the Bonferroni-adjusted threshold.";
    }

    if (hypothesis.id === "H4" && rcopeNegativePairs.length >= 2) {
      const negativeChange = runPairedTTest(rcopeNegativePairs);
      if (negativeChange.meanShift !== null && negativeChange.meanShift <= 0) {
        interpretation = `${interpretation} Negative coping did not increase (${negativeChange.meanShift}).`;
      } else if (negativeChange.meanShift !== null) {
        interpretation = `${interpretation} Negative coping increased by ${negativeChange.meanShift}.`;
      }
    }

    return {
      ...hypothesis,
      significant,
      interpretation,
    };
  });

  return {
    totalParticipants: cohort.length,
    completionRate,
    avgSUS,
    susPassRate,
    matchedPairCounts: {
      mist: mistPairs.length,
      mhls: mhlsPairs.length,
      ghsq: ghsqPairs.length,
      rcope: rcopePairs.length,
      sus: cohort.filter((entry) => typeof entry.assessments.susPost === "number").length,
    },
    engines: {
      deepreal: {
        activeParticipants: deeprealSnapshots.length,
        completedParticipants: deeprealSnapshots.filter((entry) => entry.exerciseCounts.deepreal >= 14).length,
        avgMistShift: average(deeprealSnapshots.map((entry) => entry.assessments.mistShift)),
        avgVeracityShift: average(deeprealSnapshots.map((entry) => entry.assessments.mistVeracityShift)),
        avgNaiveteShift: average(deeprealSnapshots.map((entry) => entry.assessments.mistNaiveteShift)),
        avgDistrustShift: average(deeprealSnapshots.map((entry) => entry.assessments.mistDistrustShift)),
        avgCtcs: average(deeprealSnapshots.map((entry) => entry.trustCalibration.latestCtcs)),
      },
      mentalHealth: {
        activeParticipants: mentalHealthSnapshots.length,
        completedParticipants: mentalHealthSnapshots.filter((entry) => entry.exerciseCounts["mental-health"] >= 14).length,
        avgMhlsShift: average(mentalHealthSnapshots.map((entry) => entry.assessments.mhlsShift)),
        avgGhsqShift: average(mentalHealthSnapshots.map((entry) => entry.assessments.ghsqShift)),
        avgCtcs: average(mentalHealthSnapshots.map((entry) => entry.trustCalibration.latestCtcs)),
        avgConfidenceShift: average(mentalHealthSnapshots.map((entry) => entry.confidenceShift)),
      },
      religionHub: {
        activeParticipants: religionHubSnapshots.length,
        completedParticipants: religionHubSnapshots.filter((entry) => entry.exerciseCounts["religion-hub"] >= 14).length,
        avgPositiveCopingShift: average(religionHubSnapshots.map((entry) => entry.assessments.rcopePositiveShift)),
        avgNegativeCopingShift: average(religionHubSnapshots.map((entry) => entry.assessments.rcopeNegativeShift)),
        avgCtcs: average(religionHubSnapshots.map((entry) => entry.trustCalibration.latestCtcs)),
        avgCorrectionEntries: average(religionHubSnapshots.map((entry) => entry.correctionEntries)),
      },
    },
    interventions: {
      sourceOpens: cohort.reduce((sum, entry) => sum + entry.sourceOpens, 0),
      promptUses: cohort.reduce((sum, entry) => sum + entry.promptUses, 0),
      verificationCompleted: cohort.reduce((sum, entry) => sum + entry.verificationCompleted, 0),
      verificationSkipped: cohort.reduce((sum, entry) => sum + entry.verificationSkipped, 0),
      correctionEntries: cohort.reduce((sum, entry) => sum + entry.correctionEntries, 0),
    },
    hypotheses,
    sourceOps: {
      freshness,
      missingUrls: TRUSTED_SOURCES.filter((entry) => !entry.url).length,
      missingBackups: TRUSTED_SOURCES.filter((entry) => !entry.backupSource).length,
      pinnedSources: TRUSTED_SOURCES.filter((entry) => entry.userVisibility === "default_user").length,
      adminOnlySources: TRUSTED_SOURCES.filter((entry) => entry.userVisibility === "admin_only").length,
      directoriesConfirmed,
      directoriesPending,
    },
  };
}
