"use client";

import { SourceRegistry } from "@/components/sources/source-registry";
import { BookOpen } from "lucide-react";
import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import type { SourceEntry } from "@/types";
import { EvidenceSearch } from "@/components/shared/evidence-search";
import { SupportDirectoryPanel } from "@/components/research/support-directory-panel";
import { useRTL } from "@/components/shared/rtl-provider";
import { SRC, s } from "@/data/i18n/site-strings";
import { ComprehensiveResourceDirectory } from "@/components/sources/comprehensive-resource-directory";

const sources = TRUSTED_SOURCES as unknown as SourceEntry[];

/**
 * Source Registry Page — Framework §19
 * Browse, search, and filter the 100 trusted sources.
 */
export default function SourcesPage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} style={{ color: "var(--accent-cta)" }} />
          <h1 style={{ fontSize: "var(--font-h2)" }}>
            <span className="text-gradient">{s(SRC.title, a)}</span>
          </h1>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: "var(--space-md)", maxWidth: 600, fontFamily: ff }}>
          {a ? `${sources.length} ${s(SRC.desc, a)}` : `${sources.length} ${s(SRC.desc, a)}`}
        </p>

        {/* Source Freshness Health Summary (Chunk 10) */}
        {(() => {
          const now = Date.now();
          let fresh = 0, aging = 0, stale = 0, critical = 0;
          for (const src of sources) {
            if (!src.lastVerified) { critical++; continue; }
            const days = Math.floor((now - new Date(src.lastVerified).getTime()) / 86400000);
            if (days <= 90) fresh++;
            else if (days <= 180) aging++;
            else if (days <= 365) stale++;
            else critical++;
          }
          return (
            <div className="glass-card mb-6" style={{ padding: "var(--space-md) var(--space-lg)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", fontFamily: ff }}>{t({ en: "Source Freshness:", ar: "حداثة المصادر:", arEG: "حداثة المصادر:" })}</span>
              <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>✓ {fresh} {t({ en: "fresh", ar: "محدّث", arEG: "محدّث" })}</span>
              {aging > 0 && <span className="badge" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>⏳ {aging} {t({ en: "aging", ar: "قديم", arEG: "قديم" })}</span>}
              {stale > 0 && <span className="badge" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>⚠ {stale} {t({ en: "stale", ar: "تحذير", arEG: "تحذير" })}</span>}
              {critical > 0 && <span className="badge" style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}>🚨 {critical} {t({ en: "critical", ar: "حرج", arEG: "حرج" })}</span>}
            </div>
          );
        })()}

        <EvidenceSearch />

        <ComprehensiveResourceDirectory />

        <div style={{ marginTop: "var(--space-2xl)" }}>
          <SupportDirectoryPanel title={s(SRC.supportTitle, a)} />
        </div>
        
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <SourceRegistry sources={sources} />
        </div>
      </div>
    </div>
  );
}
