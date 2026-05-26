"use client";

import Link from "next/link";
import type { HandoffScenario } from "@/lib/routing/cross-mvp-router";
import { MVP_IDENTITY } from "@/lib/routing/cross-mvp-router";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * HANDOFF CARD — §25.4
 * UI card suggesting relevant exercise from another MVP with explanation.
 * Appears after exercise completion when a cross-MVP connection is detected.
 */

interface HandoffCardProps {
  scenario: HandoffScenario;
  onDismiss?: () => void;
}

export function HandoffCard({ scenario, onDismiss }: HandoffCardProps) {
  const target = MVP_IDENTITY[scenario.secondMVP];
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const mvpColors: Record<string, string> = {
    deepreal: "var(--accent-amber)",
    "mental-health": "var(--accent-emerald)",
    "religion-hub": "var(--accent-indigo)",
  };
  const color = mvpColors[scenario.secondMVP];

  return (
    <div style={{
      border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
      borderRadius: "14px",
      padding: "1.25rem",
      background: `linear-gradient(135deg, color-mix(in srgb, ${color} 10%, transparent), var(--glass-bg))`,
      backdropFilter: "blur(12px)",
      marginTop: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🔄</span>
        <div style={{ fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 700, color, letterSpacing: "0.5px" }}>
          {t({ en: "Cross-Engine Connection Detected", ar: "تم اكتشاف اتصال بين المحركات", arEG: "تم اكتشاف اتصال بين المحركات" })}
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 0.75rem", opacity: 0.9 }}>
        {scenario.userPrompt}
      </p>

      <div style={{
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderLeft: `3px solid ${color}`,
        marginBottom: "0.75rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <span style={{ fontSize: "1.1rem" }}>{target.icon}</span>
          <span style={{ fontWeight: 700, fontSize: "0.85rem", color }}>{target.role}</span>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.7, fontStyle: "italic" }}>
          {t({ en: "Core question: ", ar: "السؤال الأساسي: ", arEG: "السؤال الأساسي: " })}{target.coreQuestion}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        {onDismiss && (
          <button onClick={onDismiss} style={{
            padding: "0.4rem 0.75rem", borderRadius: "6px",
            border: "1px solid var(--border-primary)", background: "transparent",
            color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.75rem",
          }}>
            {t({ en: "Not now", ar: "ليس الآن", arEG: "ليس الآن" })}
          </button>
        )}
        <Link
          href={`/${scenario.secondMVP}/exercise/${scenario.suggestedExerciseDay || 1}`}
          style={{
            padding: "0.4rem 1rem", borderRadius: "6px", border: "none",
            background: color, color: "#000", fontWeight: 600,
            fontSize: "0.75rem", textDecoration: "none", display: "inline-block",
          }}
        >
          {t({ en: "Explore ", ar: "← استكشف ", arEG: "← استكشف " })}{scenario.secondMVP === "deepreal" ? "DeepReal" : scenario.secondMVP === "mental-health" ? (t({ en: "Mental Health", ar: "الصحة النفسية", arEG: "الصحة النفسية" })) : (t({ en: "Religion Hub", ar: "محور الدين", arEG: "محور الدين" }))}{a ? "" : " \u2192"}
        </Link>
      </div>
    </div>
  );
}
