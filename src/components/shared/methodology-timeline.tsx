"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * METHODOLOGY TIMELINE — §3.3
 * Interactive measurement schedule visualization.
 * Shows the full quasi-experimental design flow.
 */

interface TimelinePhase {
  id: string;
  label: string;
  day: string;
  description: string;
  instruments: string[];
  color: string;
  icon: string;
}

const PHASES: TimelinePhase[] = [
  {
    id: "recruitment", label: "Recruitment & Screening", day: "Week -2 to -1",
    description: "Participant recruitment from Egyptian university campus. Eligibility screening, consent, and group allocation.",
    instruments: ["Consent form", "Demographics survey", "MC-SDS (social desirability)"],
    color: "var(--accent-purple, #8b5cf6)", icon: "📋",
  },
  {
    id: "baseline", label: "Baseline Assessment", day: "Day 0",
    description: "Pre-intervention measurement battery. Trust Calibration Battery establishes susceptibility baseline.",
    instruments: ["MIST-20 (pre)", "MHLS (pre)", "Brief RCOPE (pre)", "GHSQ (pre)", "Trust Calibration Battery"],
    color: "var(--accent-amber)", icon: "📊",
  },
  {
    id: "phase1", label: "Foundation Phase", day: "Days 1-3",
    description: "Introductory exercises building base knowledge. SIFT tutorial, basic recognition, terminology.",
    instruments: ["Exercise completion tracking", "Confidence logging", "Source-of-the-Day exposure"],
    color: "#06b6d4", icon: "🏗️",
  },
  {
    id: "phase2", label: "Practice Phase", day: "Days 4-7",
    description: "Application exercises with increasing complexity. Evidence Ladder, Source Compare, first corrections.",
    instruments: ["Correction Ledger entries", "Verification Checklist usage", "Bias Reflection responses"],
    color: "var(--accent-blue, #3b82f6)", icon: "🔬",
  },
  {
    id: "midpoint", label: "Midpoint Check", day: "Day 7",
    description: "First After-Action Review. Engagement tracking assessment. No instrument re-administration.",
    instruments: ["After-Action Review", "Engagement metrics export", "Compliance check"],
    color: "var(--accent-indigo)", icon: "📋",
  },
  {
    id: "phase3", label: "Analysis Phase", day: "Days 8-11",
    description: "Higher-order exercises: Myth Autopsy, Expert Capsules, Decision Trees, cross-MVP connections.",
    instruments: ["Myth Autopsy completions", "Cross-MVP handoff tracking", "Prompt Lab usage"],
    color: "#8b5cf6", icon: "🧠",
  },
  {
    id: "phase4", label: "Integration Phase", day: "Days 12-14",
    description: "Synthesis and evaluation exercises. Comprehensive scenarios requiring multi-tool verification.",
    instruments: ["Full scenario analysis", "Micro-Scenario Feed engagement", "Peer Review (solo)"],
    color: "var(--accent-emerald)", icon: "🎓",
  },
  {
    id: "post", label: "Post Assessment", day: "Day 14+",
    description: "Post-intervention measurement battery. Direct comparison with Day 0 baseline.",
    instruments: ["MIST-20 (post)", "MHLS (post)", "Brief RCOPE (post)", "GHSQ (post)", "SUS", "Trust Calibration Battery (post)"],
    color: "var(--accent-amber)", icon: "📊",
  },
  {
    id: "analysis", label: "Data Analysis", day: "Week +1 to +3",
    description: "Paired t-tests, Cohen's d effect sizes, Bonferroni-corrected comparisons, SPSS/R analysis.",
    instruments: ["Research CSV export", "Effect size calculation", "Success criteria evaluation"],
    color: "var(--accent-red, #ef4444)", icon: "📈",
  },
];

export function MethodologyTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div style={{
      border: "1px solid var(--border-primary)", borderRadius: "14px",
      padding: "1.5rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "1.25rem" }}>📅</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t({ en: "Research Methodology Timeline", ar: "الجدول الزمني لمنهجية البحث", arEG: "الجدول الزمني لمنهجية البحث" })}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>§3.3 Measurement Schedule — Quasi-experimental design</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "0.75rem", top: 0, bottom: 0, width: "2px",
          background: "linear-gradient(to bottom, var(--accent-amber), var(--accent-emerald), var(--accent-indigo))",
        }} />

        {PHASES.map((phase) => {
          const isSelected = selectedPhase === phase.id;

          return (
            <button key={phase.id} onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
              style={{
                position: "relative", display: "block", width: "100%", textAlign: "left",
                marginBottom: "0.5rem", padding: "0.6rem 0.75rem 0.6rem 1.5rem",
                borderRadius: "10px", cursor: "pointer",
                border: isSelected ? `1px solid ${phase.color}` : "1px solid transparent",
                background: isSelected ? `color-mix(in srgb, ${phase.color} 10%, transparent)` : "transparent",
                color: "var(--text-primary)", transition: "all 0.2s",
              }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: "-0.85rem", top: "0.85rem",
                width: "12px", height: "12px", borderRadius: "50%",
                background: phase.color, border: "2px solid var(--bg-primary)",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>{phase.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{phase.label}</span>
                </div>
                <span style={{ fontSize: "0.7rem", opacity: 0.5, fontWeight: 600 }}>{phase.day}</span>
              </div>

              {isSelected && (
                <div style={{ marginTop: "0.5rem" }}>
                  <p style={{ fontSize: "0.8rem", opacity: 0.8, lineHeight: 1.5, margin: "0 0 0.5rem" }}>
                    {phase.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                    {phase.instruments.map((inst, i) => (
                      <span key={i} style={{
                        fontSize: "0.6rem", padding: "0.15rem 0.5rem", borderRadius: "99px",
                        background: `color-mix(in srgb, ${phase.color} 15%, transparent)`,
                        color: phase.color, fontWeight: 600,
                      }}>
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
