/**
 * ENHANCED PROGRESS TRACKING SERVICE — Framework §16.2, §18.1, §3.1, §5.3, §17.7
 *
 * Client-side progress tracking using localStorage:
 * - Exercise completion status per day/MVP
 * - Assessment completion status
 * - Time tracking per session
 * - Confidence pre/post data
 * - Trust calibration scores (§17.7: TCE, AFS, AOI, ETS, CTCS)
 * - Source-click tracking (§3.1 variable map)
 * - Prompt-usage tracking (§3.1 variable map)
 * - Verification-behavior logging (§17.4 8-Gate Check)
 *
 * NOTE: This is a prototype implementation for the MVP.
 * Production would use a database backend (§5.3).
 */

export interface ExerciseProgress {
  exerciseId: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  day: number;
  completedAt: string; // ISO date
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  confidencePre?: number;
  confidencePost?: number;
  // COM-B Behaviour Change tracking (Template Non-Negotiable #4)
  comBTarget?: string;
  comBMechanism?: string;
}

export interface AssessmentProgress {
  instrumentId: string;
  phase: "pre" | "post";
  completedAt: string;
  scores: Record<string, number>;
  duration: number;
}

/** §17.7: Trust Calibration Scores */
export interface TrustCalibrationData {
  tce: number;  // Trust Calibration Error
  afs: number;  // Acceptance Friction Score
  aoi: number;  // Acceptance-Override Index
  ets: number;  // Emotional Trust Susceptibility
  ctcs: number; // Composite Trust Calibration Score
  timestamp: string;
  phase: "baseline" | "midpoint" | "post";
}

/** §3.1: Source Click Event */
export interface SourceClickEvent {
  sourceId: number;
  sourceName: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  exerciseDay: number;
  clickedAt: string;
  context: "exercise" | "registry" | "keyhunter" | "evidence-search";
}

/** §3.1: Prompt Usage Event */
export interface PromptUsageEvent {
  promptId: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  exerciseDay: number;
  usedAt: string;
  modified: boolean; // Did user modify the pre-built prompt?
  resultViewed: boolean; // Did user view the result?
}

/** §17.4: Verification Behavior Event */
export interface VerificationEvent {
  exerciseId: string;
  type: "eight-gate" | "friction-overlay" | "bias-reflection" | "evidence-ladder";
  completedAt: string;
  gatesFilled?: number; // 0-5 for 8-Gate
  timeSpentSeconds: number;
  skipped: boolean;
}

export interface CorrectionLedgerEntry {
  claim: string;
  correction: string;
  date: string;
  exerciseId?: string;
}

export interface UserProgress {
  exercises: ExerciseProgress[];
  assessments: AssessmentProgress[];
  trustCalibration: TrustCalibrationData[];
  sourceClicks: SourceClickEvent[];
  promptUsage: PromptUsageEvent[];
  verificationEvents: VerificationEvent[];
  totalTimeMinutes: number;
  streak: number;
  lastActiveDate: string;
}

const STORAGE_KEY = "eal-progress";
const CORRECTION_LEDGER_KEY = "eal-correction-ledger";

const EMPTY_PROGRESS: UserProgress = {
  exercises: [],
  assessments: [],
  trustCalibration: [],
  sourceClicks: [],
  promptUsage: [],
  verificationEvents: [],
  totalTimeMinutes: 0,
  streak: 0,
  lastActiveDate: "",
};

/** Get all progress data */
export function getProgress(): UserProgress {
  if (typeof window === "undefined") return { ...EMPTY_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults for backward compatibility
      return { ...EMPTY_PROGRESS, ...parsed };
    }
  } catch { /* corrupted data — reset */ }
  return { ...EMPTY_PROGRESS };
}

/** Save progress data */
function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/** Record a completed exercise */
export function recordExerciseCompletion(
  exerciseId: string,
  mvp: "deepreal" | "mental-health" | "religion-hub",
  day: number,
  score: number,
  maxScore: number,
  timeSpentSeconds: number,
  confidencePre?: number,
  confidencePost?: number,
  comBTarget?: string,
  comBMechanism?: string,
): void {
  const progress = getProgress();
  
  // Don't duplicate — update if already exists
  const existing = progress.exercises.findIndex(e => e.exerciseId === exerciseId);
  const entry: ExerciseProgress = {
    exerciseId,
    mvp,
    day,
    completedAt: new Date().toISOString(),
    score,
    maxScore,
    timeSpentSeconds,
    confidencePre,
    confidencePost,
    comBTarget,
    comBMechanism,
  };
  
  if (existing >= 0) {
    progress.exercises[existing] = entry;
  } else {
    progress.exercises.push(entry);
  }
  
  // Update total time
  progress.totalTimeMinutes = Math.round(
    progress.exercises.reduce((acc, e) => acc + e.timeSpentSeconds, 0) / 60
  );
  
  // Update streak
  const today = new Date().toISOString().slice(0, 10);
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (progress.lastActiveDate === yesterday) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastActiveDate = today;
  }
  
  saveProgress(progress);
}

/** Record assessment completion */
export function recordAssessmentCompletion(
  instrumentId: string,
  phase: "pre" | "post",
  scores: Record<string, number>,
  duration: number,
): void {
  const progress = getProgress();
  
  const existing = progress.assessments.findIndex(
    a => a.instrumentId === instrumentId && a.phase === phase
  );
  const entry: AssessmentProgress = {
    instrumentId,
    phase,
    completedAt: new Date().toISOString(),
    scores,
    duration,
  };
  
  if (existing >= 0) {
    progress.assessments[existing] = entry;
  } else {
    progress.assessments.push(entry);
  }
  
  saveProgress(progress);
}

/** §17.7: Record trust calibration battery results */
export function recordTrustCalibration(data: TrustCalibrationData): void {
  const progress = getProgress();
  // Replace if same phase exists
  const existing = progress.trustCalibration.findIndex(t => t.phase === data.phase);
  if (existing >= 0) {
    progress.trustCalibration[existing] = data;
  } else {
    progress.trustCalibration.push(data);
  }
  saveProgress(progress);
}

/** §3.1: Record a source click */
export function recordSourceClick(
  sourceId: number,
  sourceName: string,
  mvp: "deepreal" | "mental-health" | "religion-hub",
  exerciseDay: number,
  context: SourceClickEvent["context"],
): void {
  const progress = getProgress();
  progress.sourceClicks.push({
    sourceId,
    sourceName,
    mvp,
    exerciseDay,
    clickedAt: new Date().toISOString(),
    context,
  });
  saveProgress(progress);
}

/** §3.1: Record prompt usage */
export function recordPromptUsage(
  promptId: string,
  mvp: "deepreal" | "mental-health" | "religion-hub",
  exerciseDay: number,
  modified: boolean,
  resultViewed: boolean,
): void {
  const progress = getProgress();
  progress.promptUsage.push({
    promptId,
    mvp,
    exerciseDay,
    usedAt: new Date().toISOString(),
    modified,
    resultViewed,
  });
  saveProgress(progress);
}

/** §17.4: Record verification behavior (8-Gate, friction, bias reflection) */
export function recordVerificationEvent(
  exerciseId: string,
  type: VerificationEvent["type"],
  timeSpentSeconds: number,
  skipped: boolean,
  gatesFilled?: number,
): void {
  const progress = getProgress();
  progress.verificationEvents.push({
    exerciseId,
    type,
    completedAt: new Date().toISOString(),
    timeSpentSeconds,
    skipped,
    gatesFilled,
  });
  saveProgress(progress);
}

/** Get completed exercise count per MVP */
export function getCompletedByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): number {
  return getProgress().exercises.filter(e => e.mvp === mvp).length;
}

/** Get completed day numbers per MVP */
export function getCompletedDays(mvp: "deepreal" | "mental-health" | "religion-hub"): number[] {
  return getProgress().exercises
    .filter(e => e.mvp === mvp)
    .map(e => e.day)
    .sort((a, b) => a - b);
}

/** Check if a specific exercise is completed */
export function isExerciseCompleted(exerciseId: string): boolean {
  return getProgress().exercises.some(e => e.exerciseId === exerciseId);
}

/** Check if a specific assessment is completed */
export function isAssessmentCompleted(instrumentId: string, phase: "pre" | "post"): boolean {
  return getProgress().assessments.some(
    a => a.instrumentId === instrumentId && a.phase === phase
  );
}

/** Get the current day (furthest completed + 1) */
export function getCurrentDay(): number {
  const progress = getProgress();
  if (progress.exercises.length === 0) return 1;
  const maxDay = Math.max(...progress.exercises.map(e => e.day));
  return Math.min(maxDay + 1, 14);
}

/** Get today's total time in minutes */
export function getTodayTimeMinutes(): number {
  const today = new Date().toISOString().slice(0, 10);
  return Math.round(
    getProgress().exercises
      .filter(e => e.completedAt.startsWith(today))
      .reduce((acc, e) => acc + e.timeSpentSeconds, 0) / 60
  );
}

/** Get average confidence shift across all exercises */
export function getAverageConfidenceShift(): { avgShift: number; count: number } {
  const exercises = getProgress().exercises.filter(
    e => e.confidencePre !== undefined && e.confidencePost !== undefined
  );
  if (exercises.length === 0) return { avgShift: 0, count: 0 };
  const totalShift = exercises.reduce(
    (acc, e) => acc + ((e.confidencePost ?? 0) - (e.confidencePre ?? 0)),
    0
  );
  return { avgShift: totalShift / exercises.length, count: exercises.length };
}

/** Get source click count (total and unique) */
export function getSourceClickStats(): { total: number; unique: number; byMVP: Record<string, number> } {
  const clicks = getProgress().sourceClicks;
  const uniqueIds = new Set(clicks.map(c => c.sourceId));
  const byMVP: Record<string, number> = { deepreal: 0, "mental-health": 0, "religion-hub": 0 };
  clicks.forEach(c => { byMVP[c.mvp] = (byMVP[c.mvp] || 0) + 1; });
  return { total: clicks.length, unique: uniqueIds.size, byMVP };
}

/** Get verification engagement stats */
export function getVerificationStats(): { total: number; completed: number; skipped: number; avgGates: number } {
  const events = getProgress().verificationEvents;
  const completed = events.filter(e => !e.skipped).length;
  const skipped = events.filter(e => e.skipped).length;
  const gateEvents = events.filter(e => e.gatesFilled !== undefined);
  const avgGates = gateEvents.length > 0
    ? gateEvents.reduce((acc, e) => acc + (e.gatesFilled ?? 0), 0) / gateEvents.length
    : 0;
  return { total: events.length, completed, skipped, avgGates };
}

/** Export all data as CSV (for research) */
export function exportProgressCSV(): string {
  const progress = getProgress();
  const lines = [
    "type,id,mvp,day,phase,completedAt,score,maxScore,timeSeconds,confidencePre,confidencePost,comBTarget,comBMechanism",
  ];
  
  progress.exercises.forEach(e => {
    lines.push(
      `exercise,${e.exerciseId},${e.mvp},${e.day},,${e.completedAt},${e.score},${e.maxScore},${e.timeSpentSeconds},${e.confidencePre ?? ""},${e.confidencePost ?? ""},${e.comBTarget ?? ""},"${(e.comBMechanism ?? "").replace(/"/g, '""')}"`
    );
  });
  
  progress.assessments.forEach(a => {
    const scoreStr = Object.entries(a.scores).map(([k, v]) => `${k}=${v}`).join(";");
    lines.push(
      `assessment,${a.instrumentId},,,,${a.completedAt},${scoreStr},,${a.duration},,`
    );
  });

  // Trust calibration rows
  progress.trustCalibration.forEach(t => {
    lines.push(
      `trust_calibration,${t.phase},,,,${t.timestamp},TCE=${t.tce};AFS=${t.afs};AOI=${t.aoi};ETS=${t.ets};CTCS=${t.ctcs},,,,`
    );
  });

  // Source clicks
  progress.sourceClicks.forEach(s => {
    lines.push(
      `source_click,${s.sourceId},${s.mvp},${s.exerciseDay},,${s.clickedAt},${s.sourceName},,,,`
    );
  });

  // Prompt usage
  progress.promptUsage.forEach(p => {
    lines.push(
      `prompt_usage,${p.promptId},${p.mvp},${p.exerciseDay},,${p.usedAt},modified=${p.modified};viewed=${p.resultViewed},,,,`
    );
  });

  // Verification events
  progress.verificationEvents.forEach(v => {
    lines.push(
      `verification,${v.exerciseId},${v.type},,,,${v.completedAt},gates=${v.gatesFilled ?? ""},${v.timeSpentSeconds},skipped=${v.skipped},,`
    );
  });
  
  return lines.join("\n");
}

/** Export all data as JSON (for advanced research analytics pipelines, §23.1 Addition #5) */
export function exportProgressJSON(): string {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
}

export function getCorrectionLedgerEntries(): CorrectionLedgerEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CORRECTION_LEDGER_KEY);
    return raw ? (JSON.parse(raw) as CorrectionLedgerEntry[]) : [];
  } catch {
    return [];
  }
}

export function recordCorrectionLedgerEntry(entry: CorrectionLedgerEntry): void {
  if (typeof window === "undefined") return;

  const existing = getCorrectionLedgerEntries();
  existing.push(entry);
  localStorage.setItem(CORRECTION_LEDGER_KEY, JSON.stringify(existing.slice(-25)));
}
