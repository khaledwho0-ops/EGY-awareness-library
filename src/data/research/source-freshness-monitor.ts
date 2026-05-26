/**
 * SOURCE FRESHNESS MONITOR
 * Chunk 3B — Automated staleness detection for §19.2 Trust Rubric
 *
 * Purpose: Flags sources whose `lastVerified` date exceeds the
 * configured threshold, supporting the "Source Retrieval Timestamp"
 * non-negotiable from the Master Framework.
 *
 * Template: §19.2 Source Scoring Rubric — freshness criterion
 * Rule: source_retrieval_timestamp > 90 days = STALE warning
 */

import { TRUSTED_SOURCES } from "../sources/trusted-sources";

export interface FreshnessReport {
  totalSources: number;
  freshCount: number;
  staleCount: number;
  criticalCount: number;
  staleSources: StaleSource[];
  generatedAt: string;
}

export interface StaleSource {
  id: number;
  name: string;
  mvp: string;
  trustBand: string;
  lastVerified: string;
  daysSinceVerification: number;
  severity: "warning" | "critical";
}

const STALE_THRESHOLD_DAYS = 90;
const CRITICAL_THRESHOLD_DAYS = 180;

/**
 * Calculates the number of days between two dates.
 */
function daysBetween(date1: Date, date2: Date): number {
  const ms = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/**
 * Generates a freshness report for all trusted sources.
 * Call this on app startup or from an admin dashboard.
 */
export function generateFreshnessReport(referenceDate?: Date): FreshnessReport {
  const now = referenceDate || new Date();
  const staleSources: StaleSource[] = [];

  for (const source of TRUSTED_SOURCES) {
    const lastVerified = new Date(source.lastVerified);
    const days = daysBetween(now, lastVerified);

    if (days > STALE_THRESHOLD_DAYS) {
      staleSources.push({
        id: source.id,
        name: source.name,
        mvp: source.mvp,
        trustBand: source.trustBand,
        lastVerified: source.lastVerified,
        daysSinceVerification: days,
        severity: days > CRITICAL_THRESHOLD_DAYS ? "critical" : "warning",
      });
    }
  }

  // Sort by severity (critical first), then by days
  staleSources.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === "critical" ? -1 : 1;
    return b.daysSinceVerification - a.daysSinceVerification;
  });

  return {
    totalSources: TRUSTED_SOURCES.length,
    freshCount: TRUSTED_SOURCES.length - staleSources.length,
    staleCount: staleSources.filter(s => s.severity === "warning").length,
    criticalCount: staleSources.filter(s => s.severity === "critical").length,
    staleSources,
    generatedAt: now.toISOString(),
  };
}

/**
 * Returns a quick freshness summary for the admin dashboard.
 */
export function getFreshnessSummary(referenceDate?: Date): string {
  const report = generateFreshnessReport(referenceDate);

  if (report.criticalCount > 0) {
    return `⚠️ CRITICAL: ${report.criticalCount} sources >180 days stale. ${report.staleCount} warnings. ${report.freshCount}/${report.totalSources} fresh.`;
  }
  if (report.staleCount > 0) {
    return `🟡 WARNING: ${report.staleCount} sources >90 days stale. ${report.freshCount}/${report.totalSources} fresh.`;
  }
  return `✅ ALL FRESH: ${report.freshCount}/${report.totalSources} sources verified within 90 days.`;
}

/**
 * Returns stale sources filtered by MVP for targeted remediation.
 */
export function getStaleSourcesByMVP(
  mvp: "deepreal" | "mental-health" | "religion-hub",
  referenceDate?: Date
): StaleSource[] {
  const report = generateFreshnessReport(referenceDate);
  return report.staleSources.filter(s => s.mvp === mvp);
}
