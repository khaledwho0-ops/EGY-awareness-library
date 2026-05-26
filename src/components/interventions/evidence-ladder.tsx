"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * EVIDENCE LADDER CARD — §18 Mode 5
 * Visual ranking of evidence quality:
 * Opinion → Anecdote → Single Study → Review → Official Guidance → Archive Proof
 * Teaches users WHY not all evidence is equal.
 */

const EVIDENCE_TIERS = [
  { level: 6, label: "Systematic Review / Meta-Analysis", icon: "🏆", color: "#10b981", description: "Multiple studies analyzed together. Strongest possible evidence.", example: "Cochrane review of CBT for anxiety (analyzing 50+ RCTs)" },
  { level: 5, label: "Official Guidance (WHO, NICE, CDC)", icon: "🏛️", color: "#06b6d4", description: "Evidence-based guidelines from recognized health/policy authorities.", example: "WHO mental health action plan based on global evidence" },
  { level: 4, label: "Peer-Reviewed Study (RCT)", icon: "🔬", color: "#3b82f6", description: "Single well-designed study with controls, published in a reviewed journal.", example: "Randomized trial showing inoculation reduces fake news susceptibility by 21%" },
  { level: 3, label: "Observational Study / Survey", icon: "📊", color: "#8b5cf6", description: "Study without random assignment. Shows correlation, not necessarily causation.", example: "Survey finding that 60% of students share articles without reading them" },
  { level: 2, label: "Expert Opinion / Case Report", icon: "👤", color: "#f59e0b", description: "Individual expert's view or single case. May be insightful but not generalizable.", example: "A psychiatrist's blog post about their experience treating anxiety" },
  { level: 1, label: "Anecdote / Personal Experience", icon: "💬", color: "#f97316", description: "Individual story. Emotionally compelling but can be misleading or unrepresentative.", example: "'My cousin cured their depression by drinking herbal tea'" },
  { level: 0, label: "Opinion / Social Media Post", icon: "📱", color: "#ef4444", description: "No evidence basis. May contain misinformation, bias, or emotional manipulation.", example: "Anonymous TikTok claiming medication is 'poison'" },
];

interface EvidenceLadderProps {
  /** Highlight a specific tier to show where current content sits */
  highlightLevel?: number;
  /** Optional context about what's being evaluated */
  contextLabel?: string;
  /** Compact mode for inline display */
  compact?: boolean;
}

export function EvidenceLadder({ highlightLevel, contextLabel, compact = false }: EvidenceLadderProps) {
  const [expandedTier, setExpandedTier] = useState<number | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div style={{
      border: "1px solid var(--border-primary)",
      borderRadius: "14px",
      padding: compact ? "1rem" : "1.5rem",
      background: "var(--glass-bg)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: compact ? "0.75rem" : "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>📐</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: compact ? "0.85rem" : "0.95rem" }}>{t({ en: "Evidence Quality Ladder", ar: "سلم جودة الأدلة", arEG: "سلم جودة الأدلة" })}</div>
          {contextLabel && <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>{contextLabel}</div>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {EVIDENCE_TIERS.map((tier) => {
          const isHighlighted = highlightLevel === tier.level;
          const isExpanded = expandedTier === tier.level;

          return (
            <button
              key={tier.level}
              onClick={() => setExpandedTier(isExpanded ? null : tier.level)}
              className={tier.level === 6 ? "evidence-tier-highlight" : ""}
              style={{
                width: "100%",
                textAlign: "left",
                padding: compact ? "0.5rem 0.75rem" : "0.6rem 1rem",
                borderRadius: "8px",
                border: isHighlighted ? `2px solid ${tier.color}` : "1px solid transparent",
                background: isHighlighted
                  ? `color-mix(in srgb, ${tier.color} 15%, transparent)`
                  : "color-mix(in srgb, var(--text-primary) 3%, transparent)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                color: "var(--text-primary)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: compact ? "0.9rem" : "1.1rem", width: "24px", textAlign: "center" }}>{tier.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: compact ? "0.75rem" : "0.8rem", fontWeight: 600, color: isHighlighted ? tier.color : "inherit" }}>
                    {tier.label}
                  </div>
                  {!compact && (
                    <div style={{ fontSize: "0.7rem", opacity: 0.6, marginTop: "0.1rem" }}>
                      {tier.description}
                    </div>
                  )}
                </div>
                <div style={{
                  width: `${20 + tier.level * 12}px`,
                  height: "4px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, ${tier.color}, color-mix(in srgb, ${tier.color} 30%, transparent))`,
                }} />
              </div>

              {isExpanded && (
                <div style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}>
                  <div style={{ fontWeight: 600, marginBottom: "0.25rem", color: tier.color }}>{t({ en: "Example:", ar: "مثال:", arEG: "مثال:" })}</div>
                  {tier.example}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: "0.65rem", opacity: 0.4, marginTop: "0.75rem", textAlign: "center" }}>
        {t({ en: "Higher = stronger evidence. Always check where your source sits.", ar: "أعلى = دليل أقوى. تحقق دائماً من موقع مصدرك.", arEG: "أعلى = دليل أقوى. تحقق دائماً من موقع مصدرك." })}
      </div>
    </div>
  );
}
