"use client";

import { SUCCESS_CRITERIA } from "@/lib/scoring/effect-size";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * SUCCESS CRITERIA TRACKER — §4.5
 * Live comparison against success criteria with visual indicators.
 */

interface SuccessTrackerProps {
  currentValues?: Record<string, number>;
}

export function SuccessTracker({ currentValues = {} }: SuccessTrackerProps) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{
      border: "1px solid var(--border-primary)", borderRadius: "14px",
      padding: "1.5rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🎯</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", fontFamily: ff }}>{t({ en: "Success Criteria Dashboard", ar: "لوحة معايير النجاح", arEG: "لوحة معايير النجاح" })}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>§4.5 Decision Matrix — minimum / target / stretch</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {SUCCESS_CRITERIA.map((criterion, i) => {
          const value = currentValues[criterion.metric];
          const level = criterion.currentLevel || (value !== undefined ? "minimum" : undefined);

          const levelColors = {
            not_met: "var(--accent-red, #ef4444)",
            minimum: "var(--accent-amber)",
            target: "var(--accent-blue, #3b82f6)",
            stretch: "var(--accent-emerald)",
          };

          return (
            <div key={i} style={{
              padding: "0.75rem 1rem", borderRadius: "10px",
              background: "color-mix(in srgb, var(--text-primary) 4%, transparent)",
              borderLeft: level ? `3px solid ${levelColors[level]}` : "3px solid var(--border-primary)",
            }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                {criterion.metric}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.35rem", marginBottom: "0.35rem" }}>
                {([
                  { label: t({ en: "Minimum", ar: "الحد الأدنى", arEG: "الحد الأدنى" }), value: criterion.minimum, level: "minimum" },
                  { label: t({ en: "Target", ar: "المستهدف", arEG: "المستهدف" }), value: criterion.target, level: "target" },
                  { label: t({ en: "Stretch", ar: "الطموح", arEG: "الطموح" }), value: criterion.stretch, level: "stretch" },
                ] as const).map((tier) => (
                  <div key={tier.label} style={{
                    padding: "0.35rem 0.5rem", borderRadius: "6px", textAlign: "center",
                    background: level === tier.level
                      ? `color-mix(in srgb, ${levelColors[tier.level]} 15%, transparent)`
                      : "color-mix(in srgb, var(--text-primary) 3%, transparent)",
                    border: level === tier.level ? `1px solid ${levelColors[tier.level]}` : "1px solid transparent",
                  }}>
                    <div style={{ fontSize: "0.6rem", opacity: 0.5, textTransform: "uppercase", fontWeight: 600 }}>{tier.label}</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: level === tier.level ? levelColors[tier.level] : "inherit" }}>
                      {tier.value}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "0.65rem", opacity: 0.5 }}>
                {t({ en: "If not met: ", ar: "إذا لم يتحقق: ", arEG: "إذا لم يتحقق: " })}{criterion.ifNotMet}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
