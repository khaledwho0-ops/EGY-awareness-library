"use client";

import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Beaker,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/* ──────────────────────────────────────────────
 *  SCIENCE PANEL — Applies Negative + Positive 
 *  science visually rather than as plain text.
 *
 *  Framework: §8.1, §8.2, §8.3 (Theoretical Stacks)
 *  Framework: §2.2 (Causal Mechanisms)
 *  Framework: §13.2 (Exercise Content Production)
 *
 *  This component renders three visual panels:
 *  1. Theory Connection — Which framework applies
 *  2. Positive Science — What research SUPPORTS  
 *  3. Negative Science — What research WARNS AGAINST
 *  4. Evidence Card — Source with quality tier
 * ────────────────────────────────────────────── */

export interface ScienceData {
  theoryName: string;
  theoryAuthor: string;
  theoryYear: string;
  theoryMechanism: string; // HOW it works — the causal logic
  positiveScience: {
    label: string; // e.g. "Benevolent Reappraisal"
    description: string; // What the science supports
    mechanism: string; // How the positive path works
    evidence: string; // Citation
  };
  negativeScience: {
    label: string; // e.g. "Punitive Reappraisal"
    description: string; // What the science warns against
    mechanism: string; // How the negative path harms
    evidence: string; // Citation
  };
  evidenceType: "systematic_review" | "rct" | "quasi_experiment" | "observational" | "expert_opinion" | "methodology";
  evidenceTrustBand: "A" | "B" | "C";
}

const evidenceLabels: Record<string, { label: string; color: string; tier: string }> = {
  systematic_review: { label: "Systematic Review / Meta-Analysis", color: "#10B981", tier: "Tier 1" },
  rct: { label: "Randomized Controlled Trial", color: "#3B82F6", tier: "Tier 2" },
  quasi_experiment: { label: "Quasi-Experimental Design", color: "#8B5CF6", tier: "Tier 3" },
  observational: { label: "Observational / Cohort Study", color: "#F59E0B", tier: "Tier 4" },
  expert_opinion: { label: "Expert Opinion / Framework", color: "#EF4444", tier: "Tier 5" },
  methodology: { label: "Methodological Framework", color: "#6366F1", tier: "Applied" },
};

interface SciencePanelProps {
  science: ScienceData;
  accentColor: string;
  mvp?: string;
  mode?: "full" | "theory-only" | "positive-only" | "negative-only";
}

export function SciencePanel({ science, accentColor, mode = "full" }: SciencePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const evInfo = evidenceLabels[science.evidenceType];
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* ═══ THEORY CONNECTION CARD ═══ */}
      {(mode === "full" || mode === "theory-only") && (
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "var(--radius-md)",
          background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}15)`,
          border: `1px solid ${accentColor}30`,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Satoshi', sans-serif",
          marginBottom: expanded ? 12 : 0,
          transition: "all 0.25s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `${accentColor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={18} style={{ color: accentColor }} />
            </div>
            <div>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-caption)", marginBottom: 2 }}>
                {t({ en: "Applied Framework", ar: "الإطار المُطبق", arEG: "الإطار المُطبق" })}
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Clash Display', sans-serif" }}>
                {science.theoryName}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {science.theoryAuthor}, {science.theoryYear}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Evidence quality badge */}
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: `${evInfo.color}15`,
                color: evInfo.color,
                fontSize: "10px",
                fontWeight: 700,
                border: `1px solid ${evInfo.color}30`,
              }}
            >
              {evInfo.tier}
            </span>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: science.evidenceTrustBand === "A" ? "rgba(16,185,129,0.15)" : science.evidenceTrustBand === "B" ? "rgba(59,130,246,0.15)" : "rgba(245,158,11,0.15)",
                color: science.evidenceTrustBand === "A" ? "#10B981" : science.evidenceTrustBand === "B" ? "#3B82F6" : "#F59E0B",
                fontSize: "10px",
                fontWeight: 700,
                border: `1px solid ${science.evidenceTrustBand === "A" ? "rgba(16,185,129,0.3)" : science.evidenceTrustBand === "B" ? "rgba(59,130,246,0.3)" : "rgba(245,158,11,0.3)"}`,
              }}
            >
              Band {science.evidenceTrustBand}
            </span>
            {expanded ? <ChevronUp size={16} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />}
          </div>
        </div>

        {/* Mechanism preview */}
        {!expanded && (
          <div style={{ marginTop: 8, fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
            <Lightbulb size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            {science.theoryMechanism.substring(0, 120)}...
          </div>
        )}
      </button>
      )}

      {/* ═══ EXPANDED / APPLIED MULTI-MODES ═══ */}
      {(expanded || mode === "positive-only" || mode === "negative-only") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Theory Mechanism */}
          {(mode === "full" || mode === "theory-only") && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "var(--radius-md)",
              background: `${accentColor}08`,
              border: `1px solid ${accentColor}20`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Beaker size={14} style={{ color: accentColor }} />
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: accentColor }}>
                {t({ en: "How This Theory Works", ar: "كيف تعمل هذه النظرية", arEG: "كيف تعمل هذه النظرية" })}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
              {science.theoryMechanism}
            </p>
          </div>
          )}

          {/* POSITIVE + NEGATIVE Side by Side */}
          <div style={{ display: mode === "full" ? "grid" : "block", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* ✅ POSITIVE SCIENCE */}
            {(mode === "full" || mode === "positive-only") && (
            <div
              style={{
                padding: "16px",
                borderRadius: "var(--radius-md)",
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <TrendingUp size={14} style={{ color: "#10B981" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#10B981" }}>
                  {t({ en: "Positive Science", ar: "العلم الإيجابي", arEG: "العلم الإيجابي" })}
                </span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontFamily: "'Clash Display', sans-serif",
                  marginBottom: 6,
                }}
              >
                {science.positiveScience.label}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 8px 0" }}>
                {science.positiveScience.description}
              </p>
              <div
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: "rgba(16,185,129,0.08)",
                  fontSize: "11px",
                  color: "#10B981",
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                <ShieldCheck size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                <strong>{t({ en: "Mechanism:", ar: "الآلية:", arEG: "الآلية:" })}</strong> {science.positiveScience.mechanism}
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-caption)", lineHeight: 1.4 }}>
                <BookOpen size={9} style={{ display: "inline", marginRight: 3, verticalAlign: "middle" }} />
                {science.positiveScience.evidence}
              </div>
            </div>
            )}

            {/* ❌ NEGATIVE SCIENCE */}
            {(mode === "full" || mode === "negative-only") && (
            <div
              style={{
                padding: "16px",
                borderRadius: "var(--radius-md)",
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <TrendingDown size={14} style={{ color: "#EF4444" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#EF4444" }}>
                  {t({ en: "Negative Science", ar: "العلم السلبي", arEG: "العلم السلبي" })}
                </span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontFamily: "'Clash Display', sans-serif",
                  marginBottom: 6,
                }}
              >
                {science.negativeScience.label}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 8px 0" }}>
                {science.negativeScience.description}
              </p>
              <div
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: "rgba(239,68,68,0.08)",
                  fontSize: "11px",
                  color: "#EF4444",
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                <AlertTriangle size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                <strong>{t({ en: "Risk:", ar: "الخطر:", arEG: "الخطر:" })}</strong> {science.negativeScience.mechanism}
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-caption)", lineHeight: 1.4 }}>
                <BookOpen size={9} style={{ display: "inline", marginRight: 3, verticalAlign: "middle" }} />
                {science.negativeScience.evidence}
              </div>
            </div>
            )}
          </div>

          {/* Evidence Quality Bar */}
          {(mode === "full" || mode === "theory-only") && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
              <BookOpen size={12} style={{ color: evInfo.color }} />
              <span style={{ color: "var(--text-muted)" }}>{t({ en: "Evidence Type:", ar: "نوع الدليل:", arEG: "نوع الدليل:" })}</span>
              <span style={{ color: evInfo.color, fontWeight: 600 }}>{evInfo.label}</span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {/* Visual tier indicator — 5 dots  */}
              {[1, 2, 3, 4, 5].map((tier) => {
                const tierIndex = ["systematic_review", "rct", "quasi_experiment", "observational", "expert_opinion"].indexOf(science.evidenceType);
                const active = tier <= (tierIndex >= 0 ? 5 - tierIndex : 5);
                return (
                  <div
                    key={tier}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: active ? evInfo.color : "var(--border-secondary)",
                      transition: "all 0.2s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
