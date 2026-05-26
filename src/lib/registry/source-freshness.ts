/**
 * SOURCE FRESHNESS MONITOR — §23.1 #12
 * 
 * Marks source records stale after 90 days without review.
 * Trust depends on recency in dynamic fields.
 */

export interface FreshnessStatus {
  sourceId: number;
  sourceName: string;
  lastVerified: string;
  daysSinceVerification: number;
  status: "fresh" | "aging" | "stale" | "critical";
  action: string;
}

/**
 * Calculate freshness status for a source.
 * - Fresh: 0-30 days
 * - Aging: 31-60 days
 * - Stale: 61-90 days
 * - Critical: 90+ days
 */
export function checkFreshness(lastVerified: string): {
  daysSince: number;
  status: "fresh" | "aging" | "stale" | "critical";
  action: string;
} {
  const now = new Date();
  const verified = new Date(lastVerified);
  const daysSince = Math.floor((now.getTime() - verified.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSince <= 30) {
    return { daysSince, status: "fresh", action: "No action needed" };
  } else if (daysSince <= 60) {
    return { daysSince, status: "aging", action: "Schedule review within 30 days" };
  } else if (daysSince <= 90) {
    return { daysSince, status: "stale", action: "Review urgently — approaching 90-day limit" };
  } else {
    return { daysSince, status: "critical", action: "CRITICAL: Source exceeds 90-day freshness limit. Remove from user-facing display until re-verified." };
  }
}

/**
 * Batch check all sources in the registry
 */
export function auditSourceFreshness(
  sources: Array<{ id: number; name: string; lastVerified?: string }>
): FreshnessStatus[] {
  return sources.map((src) => {
    const lastVerified = src.lastVerified || "2025-01-01";
    const { daysSince, status, action } = checkFreshness(lastVerified);
    return {
      sourceId: src.id,
      sourceName: src.name,
      lastVerified,
      daysSinceVerification: daysSince,
      status,
      action,
    };
  });
}

/**
 * Get summary statistics for freshness audit
 */
export function getFreshnessSummary(statuses: FreshnessStatus[]): {
  total: number;
  fresh: number;
  aging: number;
  stale: number;
  critical: number;
  healthPercent: number;
} {
  const fresh = statuses.filter((s) => s.status === "fresh").length;
  const aging = statuses.filter((s) => s.status === "aging").length;
  const stale = statuses.filter((s) => s.status === "stale").length;
  const critical = statuses.filter((s) => s.status === "critical").length;
  const total = statuses.length;

  return {
    total,
    fresh,
    aging,
    stale,
    critical,
    healthPercent: total > 0 ? Math.round((fresh / total) * 100) : 0,
  };
}

/** Freshness badge colors */
export const FRESHNESS_COLORS = {
  fresh: "#10b981",
  aging: "#f59e0b",
  stale: "#f97316",
  critical: "#ef4444",
} as const;
