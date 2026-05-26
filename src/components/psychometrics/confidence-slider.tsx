"use client";

import { useState, useCallback } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * CONFIDENCE RANGE SLIDER — Q3
 * Collects confidence percentage (0-100) with programmatic accuracy
 * Before student answers — feeds into Trust Calibration Error (TCE)
 * 
 * TCE = |Confidence% - Correctness%|
 * Framework: §17.1
 */

interface ConfidenceSliderProps {
  /** Question/claim being evaluated */
  label: string;
  /** Callback when confidence is submitted */
  onSubmit: (confidence: number) => void;
  /** Initial value */
  initialValue?: number;
}

export function ConfidenceSlider({ label, onSubmit, initialValue = 50 }: ConfidenceSliderProps) {
  const [value, setValue] = useState(initialValue);
  const [submitted, setSubmitted] = useState(false);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    onSubmit(value);
  }, [value, onSubmit]);

  const getConfidenceLabel = (v: number): string => {
    if (v <= 20) return "Very Unsure";
    if (v <= 40) return "Somewhat Unsure";
    if (v <= 60) return "Neutral";
    if (v <= 80) return "Fairly Confident";
    return "Very Confident";
  };

  const getConfidenceColor = (v: number): string => {
    if (v <= 30) return "var(--color-danger)";
    if (v <= 60) return "var(--color-warning)";
    return "var(--color-success)";
  };

  if (submitted) {
    return (
      <div style={{
        padding: "12px 16px", borderRadius: "var(--radius-md)",
        background: "rgba(0,102,255,0.06)", border: "1px solid rgba(0,102,255,0.15)",
        display: "flex", alignItems: "center", gap: 12, fontSize: 13,
      }}>
        <span style={{ color: "var(--text-muted)" }}>{t({ en: "Confidence locked:", ar: "تم تثبيت الثقة:", arEG: "تم تثبيت الثقة:" })}</span>
        <span style={{ fontWeight: 700, color: getConfidenceColor(value) }}>{value}%</span>
        <span style={{ color: "var(--text-caption)", fontSize: 11 }}>({getConfidenceLabel(value)})</span>
      </div>
    );
  }

  return (
    <div style={{
      padding: "16px 20px", borderRadius: "var(--radius-md)",
      background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
    }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.03em" }}>
        📊 {t({ en: "How confident are you?", ar: "ما مدى ثقتك؟", arEG: "ما مدى ثقتك؟" })}
      </label>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, maxWidth: "65ch" }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="confidence-slider"
          aria-label="Confidence percentage"
          style={{ flex: 1 }}
        />
        <div style={{
          minWidth: 64, textAlign: "center", padding: "6px 12px",
          borderRadius: "var(--radius-md)", background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
          fontWeight: 700, fontSize: 18, fontFamily: "'Clash Display', sans-serif",
          color: getConfidenceColor(value),
        }}>
          {value}%
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: "var(--text-caption)" }}>{t({ en: "0% \u2014 Guessing", ar: "0% \u2014 تخمين", arEG: "0% \u2014 تخمين" })}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: getConfidenceColor(value) }}>{getConfidenceLabel(value)}</span>
        <span style={{ fontSize: 10, color: "var(--text-caption)" }}>{t({ en: "100% \u2014 Certain", ar: "100% \u2014 متأكد", arEG: "100% \u2014 متأكد" })}</span>
      </div>
      <button
        onClick={handleSubmit}
        className="btn-primary"
        style={{ width: "100%", fontSize: 13 }}
      >
        {a ? `ثبّت ثقتي (${value}%)` : `Lock My Confidence (${value}%)`}
      </button>
    </div>
  );
}
