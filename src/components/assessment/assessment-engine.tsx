"use client";

import { useState, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { submitAssessmentAction } from "@/app/actions/assessment";

/**
 * Assessment Engine - Framework Section 3.2, 17.7
 *
 * Supports 6 instruments:
 * - MIST-20: 20 items, binary real/fake
 * - MHLS: 35 items, Likert 1-5
 * - Brief RCOPE: 14 items, Likert 1-4
 * - GHSQ: help-seeking Likert items
 * - SUS: 10 items, Likert 1-5
 * - MC-SDS: 13 items, binary true/false
 */

export interface AssessmentQuestion {
  id: string;
  text: string;
  textAr?: string;
  type: "likert" | "binary" | "real_fake";
  options?: { value: number; label: string; labelAr?: string }[];
  reversed?: boolean;
  subscale?: string;
}

export interface AssessmentConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  phase: "pre" | "post";
  questions: AssessmentQuestion[];
  scoring: (answers: Record<string, number>) => Record<string, number>;
}

interface AssessmentEngineProps {
  config: AssessmentConfig;
  onComplete: (results: {
    answers: Record<string, number>;
    scores: Record<string, number>;
    duration: number;
  }) => void;
}

export function AssessmentEngine({ config, onComplete }: AssessmentEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startTime] = useState(() => Date.now());
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const currentQuestion = config.questions[currentIndex];
  const questionGroupId = `assessment-question-${config.id}-${currentQuestion?.id ?? "complete"}`;
  const progress = ((currentIndex + 1) / config.questions.length) * 100;
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;

  const handleAnswer = useCallback(
    (value: number) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion]
  );

  const handleNext = async () => {
    if (currentIndex < config.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const computed = config.scoring(answers);
    const computedDuration = Math.round((Date.now() - startTime) / 1000);

    // Call Zero-Trust Server Action
    await submitAssessmentAction({
      configId: config.id,
      answers,
      scores: computed,
      duration: computedDuration,
    });

    onComplete({
      answers,
      scores: computed,
      duration: computedDuration,
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="glass-card" style={{ maxWidth: 600, margin: "0 auto", overflow: "hidden" }}>
      <div
        style={{ height: 4, background: "var(--bg-secondary)" }}
        role="progressbar"
        aria-label={`${config.shortName} progress`}
        aria-valuemin={0}
        aria-valuemax={config.questions.length}
        aria-valuenow={currentIndex + 1}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--accent-cta)",
            transition: "width 0.3s ease",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} style={{ color: "var(--accent-cta)" }} />
          <span style={{ fontWeight: 600, fontSize: "14px" }}>{config.shortName}</span>
          <span
            className="badge"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-caption)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {config.phase === "pre" ? (t({ en: "Pre-Test", ar: "اختبار قبلي", arEG: "اختبار قبلي" })) : t({ en: "Post-Test", ar: "اختبار بعدي", arEG: "اختبار بعدي" })}
          </span>
        </div>
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          {currentIndex + 1} / {config.questions.length}
        </span>
      </div>

      <fieldset style={{ padding: "32px 24px", border: "none", margin: 0 }}>
        <legend
          id={questionGroupId}
          style={{
            fontSize: "17px",
            fontWeight: 500,
            lineHeight: 1.6,
            color: "var(--text-primary)",
            marginBottom: 24,
            direction: a ? "rtl" : "ltr",
            fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit",
          }}
        >
          {a && currentQuestion.textAr ? currentQuestion.textAr : currentQuestion.text}
        </legend>

        <div className="flex flex-col gap-2">
          {currentQuestion.type === "likert" &&
            currentQuestion.options?.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <label
                  key={option.value}
                  style={{
                    width: "100%",
                    padding: "12px 18px",
                    borderRadius: "var(--radius-md)",
                    background: isSelected ? "rgba(0,102,255,0.12)" : "var(--bg-secondary)",
                    border: `1px solid ${isSelected ? "var(--accent-cta)" : "var(--border-primary)"}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14px",
                    fontFamily: "'Satoshi', sans-serif",
                    color: "var(--text-primary)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleAnswer(option.value)}
                    style={{ cursor: "pointer" }}
                  />
                  {a && option.labelAr ? option.labelAr : option.label}
                </label>
              );
            })}

          {currentQuestion.type === "binary" && (
            <>
              <label style={binaryOptionStyle(answers[currentQuestion.id] === 1, "var(--color-success)", "rgba(16,185,129,0.12)")}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={1}
                  checked={answers[currentQuestion.id] === 1}
                  onChange={() => handleAnswer(1)}
                  style={{ display: "none" }}
                />
                {t({ en: "True", ar: "صحيح", arEG: "صحيح" })}
              </label>
              <label style={binaryOptionStyle(answers[currentQuestion.id] === 0, "var(--color-danger)", "rgba(239,68,68,0.12)")}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={0}
                  checked={answers[currentQuestion.id] === 0}
                  onChange={() => handleAnswer(0)}
                  style={{ display: "none" }}
                />
                {t({ en: "False", ar: "خطأ", arEG: "خطأ" })}
              </label>
            </>
          )}

          {currentQuestion.type === "real_fake" && (
            <>
              <label style={binaryOptionStyle(answers[currentQuestion.id] === 1, "var(--color-success)", "rgba(16,185,129,0.12)")}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={1}
                  checked={answers[currentQuestion.id] === 1}
                  onChange={() => handleAnswer(1)}
                  style={{ display: "none" }}
                />
                ✓ {t({ en: "Real Headline", ar: "عنوان حقيقي", arEG: "عنوان حقيقي" })}
              </label>
              <label style={binaryOptionStyle(answers[currentQuestion.id] === 0, "var(--color-danger)", "rgba(239,68,68,0.12)")}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={0}
                  checked={answers[currentQuestion.id] === 0}
                  onChange={() => handleAnswer(0)}
                  style={{ display: "none" }}
                />
                ✕ {t({ en: "Fake Headline", ar: "عنوان مزيف", arEG: "عنوان مزيف" })}
              </label>
            </>
          )}
        </div>
      </fieldset>

      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn-secondary"
          style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          <ArrowLeft size={14} /> {t({ en: "Back", ar: "رجوع", arEG: "رجوع" })}
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswered}
          className="btn-primary"
          style={{ opacity: !isAnswered ? 0.4 : 1 }}
        >
          {currentIndex < config.questions.length - 1 ? (
            <>
              {t({ en: "Next", ar: "التالي", arEG: "التالي" })} <ArrowRight size={14} />
            </>
          ) : (
            <>
              {t({ en: "Finish", ar: "إنهاء", arEG: "إنهاء" })} <CheckCircle2 size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function binaryOptionStyle(selected: boolean, borderColor: string, activeBackground: string) {
  return {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: selected ? activeBackground : "var(--bg-secondary)",
    border: `1px solid ${selected ? borderColor : "var(--border-primary)"}`,
    cursor: "pointer",
    textAlign: "center" as const,
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "'Satoshi', sans-serif",
    color: "var(--text-primary)",
    transition: "all 0.15s ease",
  };
}
