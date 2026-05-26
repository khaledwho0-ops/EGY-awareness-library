"use client";

import { useState } from "react";
import { Shield, CheckCircle2, AlertTriangle } from "lucide-react";
import { EIGHT_GATE_CHECK, UI_BOXES } from "@/types/safety";
import { useRTL } from "@/components/shared/rtl-provider";
import { recordVerificationEvent } from "@/lib/progress/progress-service";

/**
 * 8-Gate Check Component — Framework §17.4
 *
 * Permanent shared protocol across all 3 MVPs.
 * Users must complete all 8 gates before accepting a claim.
 *
 * Also includes the §17.5 Five UI Boxes:
 * Claim → Evidence → Context → Emotion → Consequence
 */
export function EightGateCheck({ onComplete, exerciseId }: { onComplete?: () => void; exerciseId?: string }) {
  const [checks, setChecks] = useState<boolean[]>(new Array(8).fill(false));
  const [startTime] = useState(() => Date.now());
  const [boxValues, setBoxValues] = useState<Record<string, string>>({
    claim: "",
    evidence: "",
    context: "",
    emotion: "",
    consequence: "",
  });

  const allChecked = checks.every(Boolean);
  const allBoxesFilled = Object.values(boxValues).every((v) => v.trim().length > 0);
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          background: "rgba(245,158,11,0.08)",
          borderBottom: "2px solid var(--accent-deepreal)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Shield size={20} style={{ color: "var(--accent-deepreal)" }} />
        <div>
          <h3 style={{ fontSize: "16px", marginBottom: 2, fontFamily: ff }}>{t({ en: "8-Gate Check Protocol", ar: "بروتوكول فحص البوابات الثماني", arEG: "بروتوكول فحص البوابات الثماني" })}</h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, fontFamily: ff }}>
            {t({ en: "Complete all 8 gates before accepting any claim as true.", ar: "أكمل جميع البوابات الـ 8 قبل قبول أي ادعاء كحقيقي.", arEG: "أكمل جميع البوابات الـ 8 قبل قبول أي ادعاء كحقيقي." })}
          </p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* §17.5 Five UI Boxes */}
        <h4 style={{ fontSize: "14px", marginBottom: 12, color: "var(--text-secondary)", fontFamily: ff }}>
          {t({ en: "Step 1: Decompose the Claim", ar: "الخطوة 1: تفكيك الادعاء", arEG: "الخطوة 1: تفكيك الادعاء" })}
        </h4>
        <div className="flex flex-col gap-3 mb-6">
          {Object.entries(UI_BOXES).map(([key, box]) => (
            <div key={key}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                {box.label}
                <span style={{ fontWeight: 400, color: "var(--text-caption)", textTransform: "none", letterSpacing: 0 }}>
                  ({box.duration})
                </span>
              </label>
              <textarea
                value={boxValues[key]}
                onChange={(e) => setBoxValues((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder={box.prompt}
                rows={2}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontFamily: "'Satoshi', sans-serif",
                  resize: "vertical",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* §17.4 Eight Gates */}
        <h4 style={{ fontSize: "14px", marginBottom: 12, color: "var(--text-secondary)", fontFamily: ff }}>
          {t({ en: "Step 2: Walk Through All 8 Gates", ar: "الخطوة 2: امشِ عبر جميع البوابات الـ 8", arEG: "الخطوة 2: امشِ عبر جميع البوابات الـ 8" })}
        </h4>
        <div className="gate-check">
          {EIGHT_GATE_CHECK.map((gate, i) => (
            <div key={i} className="gate-check-step" style={{ alignItems: "center" }}>
              <label className="flex items-center gap-3 flex-1" style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={checks[i]}
                  onChange={() => {
                    const next = [...checks];
                    next[i] = !next[i];
                    setChecks(next);
                  }}
                  style={{ accentColor: "var(--accent-deepreal)", width: 18, height: 18 }}
                />
                <span style={{ fontSize: "14px", color: checks[i] ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.5, transition: "color 0.15s" }}>
                  {gate}
                </span>
              </label>
              {checks[i] && (
                <CheckCircle2 size={16} style={{ color: "var(--color-success)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* Status */}
        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            background: allChecked && allBoxesFilled ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
            border: `1px solid ${allChecked && allBoxesFilled ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {allChecked && allBoxesFilled ? (
            <>
              <CheckCircle2 size={16} style={{ color: "var(--color-success)" }} />
              <span style={{ fontSize: "13px", color: "var(--color-success)", fontWeight: 600, fontFamily: ff }}>
                {t({ en: "All gates passed. You may now form a reasoned judgment.", ar: "تم اجتياز جميع البوابات. يمكنك الآن تكوين حكم معقول.", arEG: "تم اجتياز جميع البوابات. يمكنك الآن تكوين حكم معقول." })}
              </span>
            </>
          ) : (
            <>
              <AlertTriangle size={16} style={{ color: "var(--color-warning)" }} />
              <span style={{ fontSize: "13px", color: "var(--color-warning)", fontFamily: ff }}>
                {a ? `${8 - checks.filter(Boolean).length} بوابات متبقية. أكمل الكل قبل القرار.` : `${8 - checks.filter(Boolean).length} gates remaining. Complete all before deciding.`}
              </span>
            </>
          )}
        </div>

        {allChecked && allBoxesFilled && onComplete && (
          <button
            onClick={() => {
              // Record verification event for research tracking
              if (exerciseId) {
                recordVerificationEvent(
                  exerciseId,
                  "eight-gate",
                  Math.round((Date.now() - startTime) / 1000),
                  false,
                  checks.filter(Boolean).length,
                );
              }
              onComplete();
            }}
            className="btn-primary mt-4"
            style={{ width: "100%" }}
          >
            <CheckCircle2 size={16} /> {t({ en: "Continue", ar: "متابعة", arEG: "متابعة" })}
          </button>
        )}
      </div>
    </div>
  );
}
