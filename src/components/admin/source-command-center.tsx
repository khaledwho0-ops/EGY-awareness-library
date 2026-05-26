"use client";

import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import { SUPPORT_DIRECTORIES } from "@/data/directory/support-registry";
import { auditSourceFreshness, getFreshnessSummary } from "@/lib/registry/source-freshness";

export function SourceCommandCenter() {
  const freshnessStatuses = auditSourceFreshness(TRUSTED_SOURCES);
  const freshnessSummary = getFreshnessSummary(freshnessStatuses);
  const criticalSources = freshnessStatuses.filter((entry) => entry.status === "critical").slice(0, 8);
  const staleSources = freshnessStatuses.filter((entry) => entry.status === "stale").slice(0, 8);
  const missingUrls = TRUSTED_SOURCES.filter((entry) => !entry.url);
  const missingBackups = TRUSTED_SOURCES.filter((entry) => !entry.backupSource);
  const pinnedSources = TRUSTED_SOURCES.filter((entry) => entry.userVisibility === "default_user");
  const adminOnlySources = TRUSTED_SOURCES.filter((entry) => entry.userVisibility === "admin_only");
  const pendingDirectories = SUPPORT_DIRECTORIES.filter((entry) => entry.status === "pending");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {[
          { label: "Registry health", value: `${freshnessSummary.healthPercent}%`, sub: `${freshnessSummary.fresh}/${freshnessSummary.total} fresh` },
          { label: "Pinned sources", value: pinnedSources.length, sub: "default_user entries" },
          { label: "Admin-only", value: adminOnlySources.length, sub: "back-office discovery sources" },
          { label: "Missing URLs", value: missingUrls.length, sub: "needs operational linking" },
          { label: "Missing backups", value: missingBackups.length, sub: "needs fallback source" },
          { label: "Pending directories", value: pendingDirectories.length, sub: "local verification still required" },
        ].map((card) => (
          <div key={card.label} className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: "30px", fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>{card.value}</div>
            <div style={{ fontSize: "11px", color: "var(--text-caption)" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <h3 style={{ marginBottom: 10 }}>Sources needing freshness attention</h3>
          <div style={{ display: "grid", gap: 8, fontSize: "13px" }}>
            {criticalSources.length === 0 && staleSources.length === 0 && (
              <div style={{ color: "var(--text-muted)" }}>No stale or critical sources in the current registry snapshot.</div>
            )}
            {[...criticalSources, ...staleSources].map((entry) => (
              <div
                key={entry.sourceId}
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <strong>#{entry.sourceId} {entry.sourceName}</strong>
                <div style={{ color: "var(--text-muted)", marginTop: 4 }}>
                  {entry.daysSinceVerification} days since verification · {entry.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <h3 style={{ marginBottom: 10 }}>Metadata gaps blocking strong source ops</h3>
          <div style={{ display: "grid", gap: 8, fontSize: "13px" }}>
            <div>
              <strong>URLs still missing:</strong> {missingUrls.slice(0, 8).map((entry) => entry.name).join(", ") || "None"}
            </div>
            <div>
              <strong>Backups still missing:</strong> {missingBackups.slice(0, 8).map((entry) => entry.name).join(", ") || "None"}
            </div>
            <div>
              <strong>Pending local directory confirmation:</strong> {pendingDirectories.map((entry) => entry.name).join(", ") || "None"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
