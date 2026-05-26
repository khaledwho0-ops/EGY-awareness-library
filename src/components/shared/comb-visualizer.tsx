"use client";

import { useState } from "react";
import type { COMBEntry } from "@/data/theory/comb-mapping";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * COM-B VISUALIZER — §15.1
 * Visual COM-B wheel showing which barrier each exercise targets.
 * Michie et al. (2011) Behaviour Change Wheel rendered as interactive UI.
 */

interface COMBVisualizerProps {
  entries: COMBEntry[];
  mvp: "deepreal" | "mental-health" | "religion-hub";
  currentDay?: number;
}

const COMPONENT_CONFIG: Record<string, { label: string; shortLabel: string; color: string; icon: string }> = {
  "capability-psychological": { label: "Capability (Psychological)", shortLabel: "C-Psych", color: "#f59e0b", icon: "🧠" },
  "capability-physical": { label: "Capability (Physical)", shortLabel: "C-Phys", color: "#f97316", icon: "🤲" },
  "opportunity-physical": { label: "Opportunity (Physical)", shortLabel: "O-Phys", color: "#10b981", icon: "🏗️" },
  "opportunity-social": { label: "Opportunity (Social)", shortLabel: "O-Soc", color: "#06b6d4", icon: "👥" },
  "motivation-reflective": { label: "Motivation (Reflective)", shortLabel: "M-Ref", color: "#8b5cf6", icon: "💭" },
  "motivation-automatic": { label: "Motivation (Automatic)", shortLabel: "M-Auto", color: "#ec4899", icon: "⚡" },
};

export function COMBVisualizer({ entries, mvp, currentDay }: COMBVisualizerProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const activeEntries = currentDay
    ? entries.filter((e) => e.exerciseDays.includes(currentDay))
    : entries;

  const mvpColors: Record<string, string> = {
    deepreal: "var(--accent-amber)",
    "mental-health": "var(--accent-emerald)",
    "religion-hub": "var(--accent-indigo)",
  };

  return (
    <div style={{
      border: `1px solid color-mix(in srgb, ${mvpColors[mvp]} 25%, var(--border-primary))`,
      borderRadius: "16px",
      padding: "1.5rem",
      background: "var(--glass-bg)",
      backdropFilter: "blur(12px)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>⚙️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            {t({ en: "COM-B Behavior Change Map", ar: "خريطة تغيير السلوك COM-B", arEG: "خريطة تغيير السلوك COM-B" })}
          </div>
          <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>
            Michie et al. (2011) • {currentDay ? (a ? `الحواجز المستهدفة في اليوم ${currentDay}` : `Day ${currentDay} barriers targeted`) : (t({ en: "All barriers", ar: "كل الحواجز", arEG: "كل الحواجز" }))}
          </div>
        </div>
      </div>

      {/* COM-B Wheel — 6 segments in a grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}>
        {Object.entries(COMPONENT_CONFIG).map(([key, config]) => {
          const count = activeEntries.filter((e) => e.component === key).length;
          const isSelected = selectedComponent === key;
          const isActive = count > 0;

          return (
            <button
              key={key}
              onClick={() => setSelectedComponent(isSelected ? null : key)}
              style={{
                padding: "0.75rem 0.5rem",
                borderRadius: "10px",
                border: isSelected
                  ? `2px solid ${config.color}`
                  : "1px solid var(--border-primary)",
                background: isActive
                  ? `color-mix(in srgb, ${config.color} ${isSelected ? 20 : 10}%, transparent)`
                  : "color-mix(in srgb, var(--text-primary) 3%, transparent)",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                opacity: isActive ? 1 : 0.4,
                color: "var(--text-primary)",
              }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{config.icon}</div>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, color: isActive ? config.color : "inherit" }}>
                {config.shortLabel}
              </div>
              {isActive && (
                <div style={{
                  fontSize: "0.6rem",
                  marginTop: "0.2rem",
                  opacity: 0.7,
                }}>
                  {count} barrier{count !== 1 ? "s" : ""}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel for selected component */}
      {selectedComponent && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {activeEntries
            .filter((e) => e.component === selectedComponent)
            .map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  borderLeft: `3px solid ${COMPONENT_CONFIG[entry.component].color}`,
                  background: "color-mix(in srgb, var(--text-primary) 4%, transparent)",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: COMPONENT_CONFIG[entry.component].color, marginBottom: "0.35rem" }}>
                  🚧 {t({ en: "Barrier", ar: "الحاجز", arEG: "الحاجز" })}
                </div>
                <div style={{ fontSize: "0.8rem", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {entry.barrier}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-emerald)", marginBottom: "0.35rem" }}>
                  ✅ {t({ en: "Intervention", ar: "التدخل", arEG: "التدخل" })}
                </div>
                <div style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                  {entry.intervention}
                </div>
                {entry.measuredBy && (
                  <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: "0.5rem" }}>
                    📏 {t({ en: "Measured by: ", ar: "يُقاس بواسطة: ", arEG: "يُقاس بواسطة: " })}{entry.measuredBy}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Legend */}
      {!selectedComponent && (
        <div style={{ fontSize: "0.7rem", opacity: 0.5, textAlign: "center" }}>
          {t({ en: "Tap a component to see barriers and interventions", ar: "انقر على مكون لعرض الحواجز والتدخلات", arEG: "انقر على مكون لعرض الحواجز والتدخلات" })}
        </div>
      )}
    </div>
  );
}
