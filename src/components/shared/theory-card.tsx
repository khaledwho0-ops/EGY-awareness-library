"use client";

import { useState } from "react";
import type { TheoryConnection } from "@/data/theory/theory-connections";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * INTERACTIVE THEORY CARD — §8.1-8.3
 * 
 * "Why This Works" accordion card that shows users exactly
 * which theoretical framework powers each exercise and HOW
 * the causal mechanism works — not just static text.
 */

interface TheoryCardProps {
  theory: TheoryConnection;
  isActive?: boolean;
}

const ROLE_BADGES: Record<string, { label: string; color: string }> = {
  primary: { label: "Primary Theory", color: "var(--accent-amber)" },
  pedagogical: { label: "Pedagogical Framework", color: "var(--accent-emerald)" },
  supporting: { label: "Supporting Theory", color: "var(--accent-blue, #3b82f6)" },
  skill: { label: "Skill Framework", color: "var(--accent-purple, #8b5cf6)" },
  design: { label: "Design Framework", color: "var(--accent-indigo)" },
  risk: { label: "Risk Framework", color: "var(--accent-red, #ef4444)" },
};

export function TheoryCard({ theory, isActive = false }: TheoryCardProps) {
  const [expanded, setExpanded] = useState(isActive);
  const badge = ROLE_BADGES[theory.role] || ROLE_BADGES.supporting;
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div
      style={{
        border: `1px solid color-mix(in srgb, ${badge.color} 30%, transparent)`,
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          background: expanded
            ? `linear-gradient(135deg, color-mix(in srgb, ${badge.color} 12%, transparent), transparent)`
            : "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-primary)",
          textAlign: "left",
          gap: "0.75rem",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.65rem",
              padding: "0.15rem 0.5rem",
              borderRadius: "99px",
              background: `color-mix(in srgb, ${badge.color} 20%, transparent)`,
              color: badge.color,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}>
              {badge.label}
            </span>
            <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{theory.year}</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", marginTop: "0.35rem" }}>
            {theory.name}
          </div>
          <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "0.15rem" }}>
            {theory.authors}
          </div>
        </div>
        <span style={{ fontSize: "1rem", transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "none" }}>
          ▼
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          {/* Description */}
          <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 1rem", opacity: 0.85 }}>
            {theory.description}
          </p>

          {/* Causal Mechanism — the key "WHY" */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            background: `linear-gradient(135deg, color-mix(in srgb, ${badge.color} 10%, transparent), transparent)`,
            borderLeft: `3px solid ${badge.color}`,
            marginBottom: "0.75rem",
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: badge.color, marginBottom: "0.25rem", textTransform: "uppercase" }}>
              ⚡ {t({ en: "Causal Mechanism", ar: "الآلية السببية", arEG: "الآلية السببية" })}
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
              {theory.causalMechanism}
            </div>
          </div>

          {/* Evidence */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)",
            borderLeft: "3px solid var(--accent-emerald)",
            marginBottom: "0.75rem",
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-emerald)", marginBottom: "0.25rem", textTransform: "uppercase" }}>
              📊 {t({ en: "Evidence", ar: "الدليل", arEG: "الدليل" })}
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
              {theory.evidence}
            </div>
          </div>

          {/* Application in exercises */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            background: "color-mix(in srgb, var(--text-primary) 5%, transparent)",
            marginBottom: "0.75rem",
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, opacity: 0.7, marginBottom: "0.25rem", textTransform: "uppercase" }}>
              🎯 {t({ en: "How It\u0027s Applied", ar: "كيف يُطبّق", arEG: "كيف يُطبّق" })}
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{theory.applicationInExercise}</div>
          </div>

          {/* Expected outcome */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            background: "color-mix(in srgb, var(--accent-amber) 8%, transparent)",
            borderLeft: "3px solid var(--accent-amber)",
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-amber)", marginBottom: "0.25rem", textTransform: "uppercase" }}>
              ✨ {t({ en: "Expected Outcome", ar: "النتيجة المتوقعة", arEG: "النتيجة المتوقعة" })}
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{theory.expectedOutcome}</div>
          </div>

          {/* Active on days */}
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{t({ en: "Active on days:", ar: "نشط في الأيام:", arEG: "نشط في الأيام:" })}</span>
            {theory.exerciseDays.map((d) => (
              <span key={d} style={{
                fontSize: "0.65rem",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: `color-mix(in srgb, ${badge.color} 20%, transparent)`,
                color: badge.color,
                fontWeight: 600,
              }}>
                {d}
              </span>
            ))}
          </div>

          {/* Citation */}
          <div style={{ marginTop: "0.75rem", fontSize: "0.7rem", opacity: 0.5, fontStyle: "italic" }}>
            📚 {theory.keyReference}
          </div>
        </div>
      )}
    </div>
  );
}
