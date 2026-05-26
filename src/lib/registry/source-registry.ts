/**
 * SOURCE REGISTRY SERVICE
 * Framework: §19 (100 sources), §19.2 (scoring rubric), §19.5 (operational rule)
 * Framework: §28.5 (6 tag fields), §28.6 (4 visibility tiers)
 *
 * Features:
 * - Load and reference all 100 sources from §19.4
 * - Filter by MVP, trust band, visibility tier
 * - Search by name, whyTrusted, appUse
 * - Per-topic: 1 primary + 1 comparative + 1 methodological (§19.5)
 */

import type { SourceEntry, MVP, TrustBand, SourceRole, UserVisibility } from "@/types";
import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";

// Cast to the framework SourceEntry type
const ALL_SOURCES: SourceEntry[] = TRUSTED_SOURCES as unknown as SourceEntry[];

/**
 * Calculate trust band from total score (§19.2)
 * A = 12-14, B = 9-11, C = 6-8, Rejected = 0-5
 */
export function calculateTrustBand(totalScore: number): TrustBand {
  if (totalScore >= 12) return "A";
  if (totalScore >= 9) return "B";
  if (totalScore >= 6) return "C";
  return "rejected";
}

/**
 * Get all sources, optionally filtered
 */
export function getSources(filters?: {
  mvp?: MVP;
  trustBand?: TrustBand;
  visibility?: UserVisibility;
  role?: SourceRole;
  search?: string;
}): SourceEntry[] {
  let results = [...ALL_SOURCES];

  if (filters?.mvp) {
    results = results.filter((s) => s.mvp === filters.mvp);
  }
  if (filters?.trustBand) {
    results = results.filter((s) => s.trustBand === filters.trustBand);
  }
  if (filters?.visibility) {
    results = results.filter((s) => s.userVisibility === filters.visibility);
  }
  if (filters?.role) {
    results = results.filter((s) => s.sourceRole === filters.role);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.whyTrusted.toLowerCase().includes(q) ||
        s.appUse.toLowerCase().includes(q)
    );
  }

  // Sort by trust band (A first)
  const bandOrder: Record<string, number> = { A: 0, B: 1, C: 2, rejected: 3 };
  return results.sort((a, b) => {
    return bandOrder[a.trustBand] - bandOrder[b.trustBand];
  });
}

/**
 * Get sources for a specific topic per §19.5 operational rule:
 * 1 primary source + 1 comparative source + 1 methodological source
 */
export function getTopicSources(mvp: MVP): {
  primary: SourceEntry | undefined;
  comparative: SourceEntry | undefined;
  methodological: SourceEntry | undefined;
} {
  const mvpSources = getSources({ mvp, visibility: "default_user" });

  return {
    primary: mvpSources.find((s) => s.sourceRole === "primary_guidance"),
    comparative: mvpSources.find((s) => s.sourceRole === "fact_check" || s.sourceRole === "research_discovery"),
    methodological: mvpSources.find((s) => s.evidenceLevel === "methodological" || s.evidenceLevel === "peer_reviewed"),
  };
}

/**
 * Get a single source by ID
 */
export function getSourceById(id: number): SourceEntry | undefined {
  return ALL_SOURCES.find((s) => s.id === id);
}

/**
 * Get source counts by trust band
 */
export function getSourceCountsByBand(): Record<TrustBand, number> {
  const counts: Record<TrustBand, number> = { A: 0, B: 0, C: 0, rejected: 0 };
  ALL_SOURCES.forEach((s) => {
    counts[s.trustBand]++;
  });
  return counts;
}

/**
 * Get default user-facing sources (§28.6 Tier 1)
 */
export function getDefaultSources(): SourceEntry[] {
  return getSources({ visibility: "default_user" });
}

/**
 * Get total source count
 */
export function getTotalSourceCount(): number {
  return ALL_SOURCES.length;
}

/**
 * Get source counts by MVP
 */
export function getSourceCountsByMVP(): Record<MVP, number> {
  const counts: Record<MVP, number> = { deepreal: 0, "mental-health": 0, "religion-hub": 0 };
  ALL_SOURCES.forEach((s) => {
    counts[s.mvp]++;
  });
  return counts;
}
