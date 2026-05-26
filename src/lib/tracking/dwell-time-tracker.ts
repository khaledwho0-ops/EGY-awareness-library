/**
 * DWELL TIME TRACKER — Q5 (AFS) + Q14 (Archive Awareness)
 * 
 * Hidden event listeners measuring:
 * - Time (ms) before user clicks accept/submit (Dwell Time)
 * - Source-opening behavior (verification clicks)
 * - Reverse-search / archive button clicks
 * 
 * Feeds into: Acceptance Friction Score (AFS) = weighted(pause + opens + checks + comparisons)
 * Framework: §17.2, §17.3
 */

export interface DwellEvent {
  type: 'accept_click' | 'source_open' | 'archive_check' | 'reverse_search' | 'evidence_check' | 'comparison_action' | 'hover_source' | 'scroll_pause';
  timestamp: number;
  dwellMs: number;
  elementId?: string;
  metadata?: Record<string, unknown>;
}

export interface AFSSession {
  exerciseId: string;
  startTime: number;
  events: DwellEvent[];
  totalDwellMs: number;
  sourceOpens: number;
  evidenceChecks: number;
  comparisonActions: number;
  archiveChecks: number;
  reverseSearchClicks: number;
  acceptClickDwellMs: number;
}

// Weights for AFS calculation (§17.7)
const AFS_WEIGHTS = {
  pauseTime: 0.3,       // Longer pause = higher friction = better
  sourceOpens: 0.25,     // More source opens = more verification
  evidenceChecks: 0.25,  // Evidence review actions
  comparisonActions: 0.2 // Side-by-side comparisons
};

let currentSession: AFSSession | null = null;

export function startDwellSession(exerciseId: string): void {
  currentSession = {
    exerciseId,
    startTime: Date.now(),
    events: [],
    totalDwellMs: 0,
    sourceOpens: 0,
    evidenceChecks: 0,
    comparisonActions: 0,
    archiveChecks: 0,
    reverseSearchClicks: 0,
    acceptClickDwellMs: 0,
  };
}

export function recordDwellEvent(
  type: DwellEvent['type'],
  elementId?: string,
  metadata?: Record<string, unknown>
): void {
  if (!currentSession) return;
  
  const now = Date.now();
  const dwellMs = now - currentSession.startTime;
  
  const event: DwellEvent = {
    type,
    timestamp: now,
    dwellMs,
    elementId,
    metadata,
  };
  
  currentSession.events.push(event);
  
  // Update counters
  switch (type) {
    case 'accept_click':
      currentSession.acceptClickDwellMs = dwellMs;
      break;
    case 'source_open':
      currentSession.sourceOpens++;
      break;
    case 'archive_check':
      currentSession.archiveChecks++;
      break;
    case 'reverse_search':
      currentSession.reverseSearchClicks++;
      break;
    case 'evidence_check':
      currentSession.evidenceChecks++;
      break;
    case 'comparison_action':
      currentSession.comparisonActions++;
      break;
  }
  
  currentSession.totalDwellMs = dwellMs;
}

/**
 * Calculate Acceptance Friction Score (AFS)
 * Formula from §17.7: weighted score of pause + opens + checks + comparisons
 * Range: 0-100 (higher = more friction = better critical thinking)
 */
export function calculateAFS(): number {
  if (!currentSession) return 0;
  
  // Normalize each component to 0-100
  const pauseScore = Math.min(100, (currentSession.acceptClickDwellMs / 60000) * 100); // 60s = max
  const sourceScore = Math.min(100, currentSession.sourceOpens * 25); // 4 opens = max
  const evidenceScore = Math.min(100, currentSession.evidenceChecks * 33); // 3 checks = max
  const comparisonScore = Math.min(100, currentSession.comparisonActions * 50); // 2 comparisons = max
  
  return Math.round(
    pauseScore * AFS_WEIGHTS.pauseTime +
    sourceScore * AFS_WEIGHTS.sourceOpens +
    evidenceScore * AFS_WEIGHTS.evidenceChecks +
    comparisonScore * AFS_WEIGHTS.comparisonActions
  );
}

export function endDwellSession(): AFSSession | null {
  if (!currentSession) return null;
  const session = { ...currentSession };
  
  // Persist to localStorage for research export
  try {
    const key = `afs_${session.exerciseId}`;
    const existing = JSON.parse(localStorage.getItem('afs_sessions') || '{}');
    existing[key] = {
      ...session,
      afsScore: calculateAFS(),
      endTime: Date.now(),
    };
    localStorage.setItem('afs_sessions', JSON.stringify(existing));
  } catch { /* silent */ }
  
  currentSession = null;
  return session;
}

export function getCurrentSession(): AFSSession | null {
  return currentSession;
}
