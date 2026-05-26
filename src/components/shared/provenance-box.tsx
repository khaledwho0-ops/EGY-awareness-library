"use client";

import { useRTL } from "@/components/shared/rtl-provider";

/**
 * EVIDENCE PROVENANCE BOX — §23.1 #2 + §19.5
 * 
 * "Built from" box showing source type, last review date, evidence tier.
 * Every exercise shows its provenance chain: primary + comparative + methodological source.
 * §19.5: 1 primary source, 1 comparative source, 1 methodological source.
 */

interface ProvenanceSource {
  name: string;
  role: "primary" | "comparative" | "methodological";
  type: "official" | "peer_reviewed" | "fact_check" | "journalistic" | "exploratory";
  trustBand: "A" | "B" | "C";
  url?: string;
}

interface ProvenanceBoxProps {
  exerciseTitle: string;
  lastReviewDate: string;
  reviewStatus: "draft" | "reviewed" | "approved";
  reviewer?: string;
  sources: ProvenanceSource[];
  evidenceTier: "systematic_review" | "rct" | "observational" | "expert_opinion" | "educational";
}

const STATUS_CONFIG = {
  draft: { label: "Draft", color: "var(--accent-amber)", icon: "📝" },
  reviewed: { label: "Expert Reviewed", color: "var(--accent-blue, #3b82f6)", icon: "👁️" },
  approved: { label: "Approved", color: "var(--accent-emerald)", icon: "✅" },
};

const ROLE_LABELS = {
  primary: "Primary Source",
  comparative: "Comparative Source",
  methodological: "How We Know",
};

const TIER_LABELS = {
  systematic_review: { label: "Systematic Review Level", strength: 5 },
  rct: { label: "Controlled Trial Level", strength: 4 },
  observational: { label: "Observational Level", strength: 3 },
  expert_opinion: { label: "Expert Opinion Level", strength: 2 },
  educational: { label: "Educational Content", strength: 1 },
};

export function ProvenanceBox({
  exerciseTitle,
  lastReviewDate,
  reviewStatus,
  reviewer,
  sources,
  evidenceTier,
}: ProvenanceBoxProps) {
  const status = STATUS_CONFIG[reviewStatus];
  const tier = TIER_LABELS[evidenceTier];
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div style={{
      border: "1px solid var(--border-primary)",
      borderRadius: "12px",
      padding: "1rem 1.25rem",
      background: "var(--glass-bg)",
      backdropFilter: "blur(12px)",
      fontSize: "0.8rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1rem" }}>📋</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.8rem" }}>{t({ en: "Evidence Provenance", ar: "سلسلة الإثبات", arEG: "سلسلة الإثبات" })}</div>
            <div style={{ fontSize: "0.68rem", opacity: 0.6 }}>{exerciseTitle}</div>
          </div>
        </div>
        <span style={{
          fontSize: "0.6rem",
          padding: "0.15rem 0.5rem",
          borderRadius: "99px",
          background: `color-mix(in srgb, ${status.color} 20%, transparent)`,
          color: status.color,
          fontWeight: 700,
        }}>
          {status.icon} {status.label}
        </span>
      </div>

      {/* Evidence tier bar */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
          <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{t({ en: "Evidence strength", ar: "قوة الدليل", arEG: "قوة الدليل" })}</span>
          <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>{tier.label}</span>
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{
              flex: 1, height: "4px", borderRadius: "2px",
              background: i <= tier.strength ? "var(--accent-emerald)" : "color-mix(in srgb, var(--text-primary) 10%, transparent)",
            }} />
          ))}
        </div>
      </div>

      {/* Source chain — §19.5: primary + comparative + methodological */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.5rem" }}>
        {sources.map((src, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.35rem 0.5rem", borderRadius: "6px",
            background: "color-mix(in srgb, var(--text-primary) 4%, transparent)",
          }}>
            <span style={{
              fontSize: "0.55rem", fontWeight: 700, padding: "0.1rem 0.35rem",
              borderRadius: "3px", background: "color-mix(in srgb, var(--accent-emerald) 15%, transparent)",
              color: "var(--accent-emerald)", whiteSpace: "nowrap",
            }}>
              {ROLE_LABELS[src.role]}
            </span>
            <span style={{ fontSize: "0.75rem", flex: 1 }}>{src.name}</span>
            <span style={{
              fontSize: "0.55rem", fontWeight: 700,
              color: src.trustBand === "A" ? "var(--accent-emerald)" : src.trustBand === "B" ? "var(--accent-amber)" : "var(--accent-red, #ef4444)",
            }}>
              {src.trustBand}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.5, fontSize: "0.65rem" }}>
        <span>{t({ en: "Last reviewed: ", ar: "آخر مراجعة: ", arEG: "آخر مراجعة: " })}{lastReviewDate}</span>
        {reviewer && <span>{t({ en: "By: ", ar: "بواسطة: ", arEG: "بواسطة: " })}{reviewer}</span>}
      </div>
    </div>
  );
}

/**
 * EVIDENCE DISAMBIGUATION — §2.3
 * Interactive display distinguishing Content Evidence vs Validation Evidence vs Framework Evidence
 */
export function EvidenceDisambiguation() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const types = [
    {
      type: "Content Evidence",
      definition: "Research used to BUILD the exercises and information within the app",
      example: "Peer-reviewed papers on deepfake detection techniques used to create exercise scenarios",
      color: "var(--accent-amber)",
      icon: "📚",
    },
    {
      type: "Validation Evidence",
      definition: "Research used to PROVE the app works",
      example: "Pre/post test data from user study showing MIST-20 score improvement",
      color: "var(--accent-emerald)",
      icon: "📊",
    },
    {
      type: "Framework Evidence",
      definition: "Research used to justify the DESIGN of the system",
      example: "Inoculation theory papers justifying the 'daily exercise' approach",
      color: "var(--accent-indigo)",
      icon: "🏗️",
    },
  ];

  return (
    <div style={{
      border: "1px solid var(--border-primary)",
      borderRadius: "14px",
      padding: "1.25rem",
      background: "var(--glass-bg)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
        🔍 {t({ en: "Three Types of Evidence", ar: "ثلاثة أنواع من الأدلة", arEG: "ثلاثة أنواع من الأدلة" })}
      </div>
      <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "1rem" }}>
        These three must NEVER be confused. Each has its own citation list and quality standard. (§2.3)
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {types.map((item) => (
          <div key={item.type} style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            borderLeft: `3px solid ${item.color}`,
            background: `color-mix(in srgb, ${item.color} 8%, transparent)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
              <span>{item.icon}</span>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: item.color }}>{item.type}</span>
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.4, marginBottom: "0.35rem" }}>{item.definition}</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.6, fontStyle: "italic" }}>{t({ en: "Example: ", ar: "مثال: ", arEG: "مثال: " })}{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
