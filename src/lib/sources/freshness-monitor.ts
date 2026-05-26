/**
 * SOURCE FRESHNESS MONITOR — Q105
 * Cron-style time script that marks sources "outdated"
 * if >90 days without review
 * 
 * Framework: §23.1 — Source freshness monitor
 */

export interface SourceFreshnessRecord {
  sourceId: string;
  sourceName: string;
  lastReviewDate: string;
  reviewedBy: string;
  isStale: boolean;
  daysSinceReview: number;
  staleBadge: 'fresh' | 'aging' | 'stale' | 'critical';
}

const FRESHNESS_THRESHOLDS = {
  fresh: 30,     // 0-30 days: green
  aging: 60,     // 31-60 days: amber
  stale: 90,     // 61-90 days: orange
  critical: 91,  // 90+ days: red "OUTDATED" badge
};

/**
 * Calculate freshness status for a source
 */
export function checkSourceFreshness(
  sourceId: string,
  sourceName: string,
  lastReviewDate: string,
  reviewedBy: string
): SourceFreshnessRecord {
  const lastReview = new Date(lastReviewDate);
  const now = new Date();
  const diffMs = now.getTime() - lastReview.getTime();
  const daysSinceReview = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let staleBadge: SourceFreshnessRecord['staleBadge'] = 'fresh';
  if (daysSinceReview > FRESHNESS_THRESHOLDS.stale) staleBadge = 'critical';
  else if (daysSinceReview > FRESHNESS_THRESHOLDS.aging) staleBadge = 'stale';
  else if (daysSinceReview > FRESHNESS_THRESHOLDS.fresh) staleBadge = 'aging';

  return {
    sourceId,
    sourceName,
    lastReviewDate,
    reviewedBy,
    isStale: daysSinceReview > FRESHNESS_THRESHOLDS.stale,
    daysSinceReview,
    staleBadge,
  };
}

/**
 * Get CSS class and label for freshness badge
 */
export function getFreshnessBadge(record: SourceFreshnessRecord): {
  label: string;
  cssClass: string;
  color: string;
  bgColor: string;
} {
  switch (record.staleBadge) {
    case 'fresh':
      return { label: '✓ Fresh', cssClass: 'trust-band-a', color: 'var(--color-success)', bgColor: 'rgba(16,185,129,0.1)' };
    case 'aging':
      return { label: '⏳ Aging', cssClass: 'trust-band-b', color: 'var(--color-warning)', bgColor: 'rgba(245,158,11,0.1)' };
    case 'stale':
      return { label: '⚠ Needs Review', cssClass: 'trust-band-c', color: 'var(--color-danger)', bgColor: 'rgba(239,68,68,0.1)' };
    case 'critical':
      return { label: '🔴 OUTDATED', cssClass: '', color: '#dc2626', bgColor: 'rgba(220,38,38,0.15)' };
  }
}

/**
 * Batch check all sources — run on dashboard load
 */
export function batchCheckFreshness(sources: Array<{
  id: string; name: string; lastReview: string; reviewer: string;
}>): SourceFreshnessRecord[] {
  return sources.map(s => checkSourceFreshness(s.id, s.name, s.lastReview, s.reviewer));
}

/**
 * Get summary statistics for supervisor dashboard
 */
export function getFreshnessSummary(records: SourceFreshnessRecord[]): {
  total: number;
  fresh: number;
  aging: number;
  stale: number;
  critical: number;
  avgDays: number;
} {
  return {
    total: records.length,
    fresh: records.filter(r => r.staleBadge === 'fresh').length,
    aging: records.filter(r => r.staleBadge === 'aging').length,
    stale: records.filter(r => r.staleBadge === 'stale').length,
    critical: records.filter(r => r.staleBadge === 'critical').length,
    avgDays: records.length > 0
      ? Math.round(records.reduce((sum, r) => sum + r.daysSinceReview, 0) / records.length)
      : 0,
  };
}
