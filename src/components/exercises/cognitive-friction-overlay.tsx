"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * COGNITIVE FRICTION OVERLAY — §17.4 + §17.5
 * 
 * The 8-Gate Check rendered as inline friction boxes that appear
 * DURING exercise tasks. Not a separate page — this is wired into
 * the exercise flow to create real pause-before-belief behavior.
 * 
 * UI Elements from §17.5:
 * - Claim Box: "State the claim in one sentence"
 * - Evidence Box: "Paste or select the evidence, not just opinion"
 * - Context Box: "When was this published? For whom?"
 * - Emotion Box: "How does this content make you feel?"
 * - Consequence Box: "What is the harm if this is wrong?"
 */

interface FrictionResponse {
  claim: string;
  evidence: string;
  context: string;
  emotion: string;
  consequence: string;
}

interface CognitiveFrictionOverlayProps {
  /** The claim/content being evaluated */
  claimText: string;
  /** Which MVP this is in */
  mvp: "deepreal" | "mental-health" | "religion-hub";
  /** Called when all 5 boxes are completed */
  onComplete: (responses: FrictionResponse) => void;
  /** Called when user wants to skip (only allowed after viewing all boxes) */
  onSkip?: () => void;
}

const FRICTION_BOXES = [
  {
    id: "claim",
    gate: "Gate 1: What is the exact claim?",
    label: "Claim Box",
    placeholder: "State the claim in one sentence before continuing...",
    icon: "🎯",
    timeEstimate: "15-20 sec",
    color: "var(--accent-amber)",
  },
  {
    id: "evidence",
    gate: "Gate 2: What evidence is actually shown?",
    label: "Evidence Box",
    placeholder: "Describe the evidence presented — not the opinion, the actual evidence...",
    icon: "🔍",
    timeEstimate: "20-30 sec",
    color: "var(--accent-emerald)",
  },
  {
    id: "context",
    gate: "Gates 3-4: Source, date, and context",
    label: "Context Box",
    placeholder: "Who is the source? When was this published? For whom? In which situation?",
    icon: "📅",
    timeEstimate: "15 sec",
    color: "var(--accent-blue, #3b82f6)",
  },
  {
    id: "emotion",
    gate: "Gate 7: What is my emotional state right now?",
    label: "Emotion Box",
    placeholder: "How does this content make you feel right now? Name the emotion...",
    icon: "💭",
    timeEstimate: "10 sec",
    color: "var(--accent-purple, #8b5cf6)",
  },
  {
    id: "consequence",
    gate: "Gate 8: What happens if I believe this too quickly?",
    label: "Consequence Box",
    placeholder: "What is the harm if this is wrong? What could go wrong?",
    icon: "⚠️",
    timeEstimate: "10 sec",
    color: "var(--accent-red, #ef4444)",
  },
] as const;

export function CognitiveFrictionOverlay({
  claimText,
  mvp,
  onComplete,
  onSkip,
}: CognitiveFrictionOverlayProps) {
  const [responses, setResponses] = useState<Record<string, string>>({
    claim: "",
    evidence: "",
    context: "",
    emotion: "",
    consequence: "",
  });
  const [activeBox, setActiveBox] = useState(0);
  const [viewedAll, setViewedAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const handleInputChange = (boxId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [boxId]: value }));
  };

  const handleNext = () => {
    if (activeBox < FRICTION_BOXES.length - 1) {
      setActiveBox(activeBox + 1);
      if (activeBox + 1 === FRICTION_BOXES.length - 1) {
        setViewedAll(true);
      }
    }
  };

  const handlePrev = () => {
    if (activeBox > 0) {
      setActiveBox(activeBox - 1);
    }
  };

  const allFilled = Object.values(responses).every((v) => v.trim().length >= 3);

  const handleSubmit = () => {
    if (allFilled) {
      onComplete({
        claim: responses.claim,
        evidence: responses.evidence,
        context: responses.context,
        emotion: responses.emotion,
        consequence: responses.consequence,
      });
    }
  };

  const completedCount = Object.values(responses).filter((v) => v.trim().length >= 3).length;

  const mvpLabels: Record<string, string> = {
    deepreal: t({ en: "Verification Friction", ar: "احتكاك التحقق", arEG: "احتكاك التحقق" }),
    "mental-health": t({ en: "Safety Reflection", ar: "تأمل السلامة", arEG: "تأمل السلامة" }),
    "religion-hub": t({ en: "Moderation Check", ar: "فحص الاعتدال", arEG: "فحص الاعتدال" }),
  };

  return (
    <div className="cognitive-friction-overlay" style={{ 
      border: `1px solid color-mix(in srgb, ${FRICTION_BOXES[activeBox].color} 40%, transparent)`,
      borderRadius: "16px",
      padding: "0",
      marginBlock: "1.5rem",
      background: "var(--glass-bg)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: `linear-gradient(135deg, color-mix(in srgb, ${FRICTION_BOXES[activeBox].color} 15%, transparent), transparent)`,
          border: "none",
          cursor: "pointer",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🧠</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
              {mvpLabels[mvp]} — {t({ en: "8-Gate Protocol", ar: "بروتوكول 8 بوابات", arEG: "بروتوكول 8 بوابات" })}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              {completedCount}/5 {t({ en: "reflection boxes completed", ar: "مربعات تأمل مكتملة", arEG: "مربعات تأمل مكتملة" })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Progress dots */}
          {FRICTION_BOXES.map((box, i) => (
            <div key={box.id} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: responses[box.id]?.trim().length >= 3
                ? box.color
                : i === activeBox ? `color-mix(in srgb, ${box.color} 50%, transparent)` : "var(--border-primary)",
              transition: "all 0.3s ease",
            }} />
          ))}
          <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", transition: "transform 0.3s" }}>
            {isExpanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div style={{ padding: "1.5rem" }}>
          {/* Claim preview */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            background: "color-mix(in srgb, var(--text-primary) 5%, transparent)",
            marginBottom: "1.25rem",
            fontSize: "0.85rem",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}>
            <span style={{ fontWeight: 600, fontStyle: "normal" }}>{t({ en: "Evaluating: ", ar: "تقييم: ", arEG: "تقييم: " })}</span>
            {claimText.length > 200 ? claimText.substring(0, 200) + "..." : claimText}
          </div>

          {/* Active friction box */}
          <div style={{
            border: `1px solid color-mix(in srgb, ${FRICTION_BOXES[activeBox].color} 30%, transparent)`,
            borderRadius: "12px",
            padding: "1.25rem",
            background: `linear-gradient(180deg, color-mix(in srgb, ${FRICTION_BOXES[activeBox].color} 8%, transparent), transparent)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{FRICTION_BOXES[activeBox].icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: FRICTION_BOXES[activeBox].color }}>
                  {FRICTION_BOXES[activeBox].label}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                  {FRICTION_BOXES[activeBox].gate} • ~{FRICTION_BOXES[activeBox].timeEstimate}
                </div>
              </div>
            </div>

            <textarea
              value={responses[FRICTION_BOXES[activeBox].id]}
              onChange={(e) => handleInputChange(FRICTION_BOXES[activeBox].id, e.target.value)}
              placeholder={FRICTION_BOXES[activeBox].placeholder}
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                resize: "vertical",
                fontSize: "0.85rem",
                fontFamily: "inherit",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            gap: "0.5rem",
          }}>
            <button
              onClick={handlePrev}
              disabled={activeBox === 0}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border-primary)",
                background: "transparent",
                color: "var(--text-primary)",
                cursor: activeBox === 0 ? "not-allowed" : "pointer",
                opacity: activeBox === 0 ? 0.4 : 1,
                fontSize: "0.8rem",
              }}
            >
              {t({ en: "\u2190 Previous", ar: "السابق \u2192", arEG: "السابق \u2192" })}
            </button>

            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              {activeBox + 1} / {FRICTION_BOXES.length}
            </span>

            {activeBox < FRICTION_BOXES.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  background: FRICTION_BOXES[activeBox].color,
                  color: "#000",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                }}
              >
                {t({ en: "Next \u2192", ar: "\u2190 التالي", arEG: "\u2190 التالي" })}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allFilled}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  border: "none",
                  background: allFilled ? "var(--accent-emerald)" : "var(--border-primary)",
                  color: allFilled ? "#000" : "var(--text-secondary)",
                  cursor: allFilled ? "pointer" : "not-allowed",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                }}
              >
                ✓ {t({ en: "Submit Reflection", ar: "إرسال التأمل", arEG: "إرسال التأمل" })}
              </button>
            )}
          </div>

          {/* Skip option — only after viewing all */}
          {viewedAll && onSkip && !allFilled && (
            <button
              onClick={onSkip}
              style={{
                display: "block",
                margin: "0.75rem auto 0",
                padding: "0.35rem 0.75rem",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.7rem",
                cursor: "pointer",
                textDecoration: "underline",
                opacity: 0.6,
              }}
            >
              {t({ en: "Skip reflection (not recommended)", ar: "تخطي التأمل (غير موصى به)", arEG: "تخطي التأمل (غير موصى به)" })}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
