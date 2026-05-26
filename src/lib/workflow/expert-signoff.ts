/**
 * EXPERT SIGN-OFF WORKFLOW — Q100
 * Programmatic state system: draft → reviewed → approved
 * Forces 3 experts to digitally sign (CVI) before publishing
 * 
 * Framework: §23.1 — Expert sign-off workflow
 */

export type ContentState = 'draft' | 'expert_review' | 'reviewed' | 'approved' | 'published';

export interface ExpertSignOff {
  expertId: string;
  expertName: string;
  domain: 'media_literacy' | 'mental_health' | 'religion';
  signedAt: string;
  cviScore: number; // Content Validity Index (0-1)
  comments?: string;
}

export interface ContentApproval {
  exerciseId: string;
  currentState: ContentState;
  signOffs: ExpertSignOff[];
  requiredSignOffs: number;
  createdAt: string;
  lastUpdated: string;
}

/**
 * Create initial content approval record
 */
export function createApprovalRecord(exerciseId: string): ContentApproval {
  return {
    exerciseId,
    currentState: 'draft',
    signOffs: [],
    requiredSignOffs: 3,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Add expert sign-off and advance state
 */
export function addSignOff(
  record: ContentApproval,
  signOff: ExpertSignOff
): ContentApproval {
  const updated = { ...record };
  updated.signOffs = [...updated.signOffs, signOff];
  updated.lastUpdated = new Date().toISOString();

  // Advance state based on sign-off count
  if (updated.signOffs.length >= updated.requiredSignOffs) {
    const avgCVI = updated.signOffs.reduce((sum, s) => sum + s.cviScore, 0) / updated.signOffs.length;
    // CVI must be ≥ 0.78 for approval (Lawshe standard)
    updated.currentState = avgCVI >= 0.78 ? 'approved' : 'expert_review';
  } else if (updated.signOffs.length > 0) {
    updated.currentState = 'reviewed';
  }

  return updated;
}

/**
 * Check if content can be published
 */
export function canPublish(record: ContentApproval): boolean {
  return record.currentState === 'approved';
}

/**
 * Get approval status label and color for UI
 */
export function getApprovalBadge(state: ContentState): {
  label: string;
  color: string;
  bg: string;
} {
  switch (state) {
    case 'draft':
      return { label: 'Draft', color: 'var(--text-muted)', bg: 'var(--bg-secondary)' };
    case 'expert_review':
      return { label: 'In Review', color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.1)' };
    case 'reviewed':
      return { label: 'Partially Reviewed', color: 'var(--color-info)', bg: 'rgba(59,130,246,0.1)' };
    case 'approved':
      return { label: 'Approved ✓', color: 'var(--color-success)', bg: 'rgba(16,185,129,0.1)' };
    case 'published':
      return { label: 'Published', color: 'var(--accent-cta)', bg: 'rgba(0,102,255,0.1)' };
  }
}

/**
 * Get all approval records from storage
 */
export function getAllApprovals(): Record<string, ContentApproval> {
  try {
    const stored = localStorage.getItem('content_approvals');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save approval record
 */
export function saveApproval(record: ContentApproval): void {
  try {
    const all = getAllApprovals();
    all[record.exerciseId] = record;
    localStorage.setItem('content_approvals', JSON.stringify(all));
  } catch { /* silent */ }
}
