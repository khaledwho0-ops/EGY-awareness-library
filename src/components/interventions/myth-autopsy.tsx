"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * MYTH AUTOPSY BOARD — §18 Mode 8
 * Guided breakdown of one harmful myth:
 * Claim → Emotional Hook → Missing Evidence → Corrective Source
 * Converts abstract literacy into pattern recognition.
 */

interface MythCase {
  id: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  claim: string;
  emotionalHook: string;
  hookType: string;
  missingEvidence: string[];
  correctiveSource: { name: string; what: string; url?: string };
  correctedUnderstanding: string;
}

const MYTH_CASES: MythCase[] = [
  {
    id: "myth-dr-01", mvp: "deepreal",
    claim: "This AI can detect any deepfake with 99.9% accuracy!",
    emotionalHook: "Promise of a perfect solution removes the need for personal vigilance.",
    hookType: "False security / Hope",
    missingEvidence: ["No peer-reviewed validation study cited", "No mention of which deepfake types were tested", "No comparison with existing detection methods", "'99.9%' is a red flag — no detection system achieves this on diverse real-world data"],
    correctiveSource: { name: "IEEE Signal Processing Magazine", what: "Deepfake detection surveys consistently show 65-90% accuracy depending on generation method, with adversarial attacks reducing performance further.", url: "https://ieeexplore.ieee.org" },
    correctedUnderstanding: "No single tool provides perfect detection. Effective verification combines multiple methods: visual inspection, metadata analysis, source verification, and critical thinking.",
  },
  {
    id: "myth-mh-01", mvp: "mental-health",
    claim: "Depression is just laziness — if you tried harder, you'd feel better.",
    emotionalHook: "Appeals to personal control narrative and avoids uncomfortable truth about vulnerability.",
    hookType: "Identity / Stigma / Simplification",
    missingEvidence: ["Ignores neurobiological research on brain chemistry changes", "Ignores genetic vulnerability factors", "Ignores environmental stressors like poverty, trauma, loss", "No distinction between sadness and clinical depression"],
    correctiveSource: { name: "WHO Fact Sheet on Depression", what: "Depression is a common mental disorder involving persistent sadness, loss of interest, and inability to carry out daily activities. It results from a complex interaction of social, psychological, and biological factors.", url: "https://www.who.int/news-room/fact-sheets/detail/depression" },
    correctedUnderstanding: "Depression is a medical condition, not a character flaw. It affects people regardless of willpower and responds to evidence-based treatments including therapy and medication.",
  },
  {
    id: "myth-rh-01", mvp: "religion-hub",
    claim: "If your faith were strong enough, you wouldn't need therapy or medication.",
    emotionalHook: "Uses guilt and spiritual inadequacy to discourage professional help-seeking.",
    hookType: "Guilt / Spiritual bypass / Authority",
    missingEvidence: ["No evidence that faith alone treats clinical conditions", "Ignores Pargament's research showing positive coping works alongside professional care", "Ignores that major religious authorities support mental health treatment", "Conflates spiritual comfort with clinical treatment"],
    correctiveSource: { name: "Al-Azhar & Dar al-Ifta statements", what: "Major Egyptian religious authorities have explicitly supported seeking mental health treatment, stating that medical care is compatible with faith and spiritual practice.", url: "https://www.dar-alifta.org" },
    correctedUnderstanding: "Faith can be a powerful source of comfort and meaning. Professional mental health care addresses clinical needs that spiritual practice alone cannot treat. Both can work together.",
  },
  {
    id: "myth-dr-02", mvp: "deepreal",
    claim: "This fact-check site debunked it, so the original claim must be 100% false.",
    emotionalHook: "Desire for certainty — wanting a clear true/false answer to complex claims.",
    hookType: "Certainty seeking / Authority transfer",
    missingEvidence: ["Fact-checks themselves can contain errors or oversimplifications", "The claim may be partially true and partially false", "Context may have changed since the fact-check was published", "Different fact-checkers may reach different conclusions"],
    correctiveSource: { name: "IFCN Code of Principles", what: "Reputable fact-checkers maintain correction policies and transparency. No single fact-check should be treated as absolute truth — triangulate with multiple sources.", url: "https://ifcncodeofprinciples.poynter.org" },
    correctedUnderstanding: "Fact-checks are valuable starting points, not endpoints. Always check the fact-checker's methodology, read their reasoning, and compare with other sources.",
  },
  {
    id: "myth-mh-02", mvp: "mental-health",
    claim: "Anxiety is just overthinking — you need to relax and stop worrying so much.",
    emotionalHook: "Minimizes suffering by making it seem like a choice.",
    hookType: "Minimization / Simplification",
    missingEvidence: ["Ignores that anxiety disorders involve neurobiological changes", "Ignores that 'just relax' advice can increase shame", "No acknowledgment of evidence-based treatments", "Conflates normal worry with clinical anxiety disorder"],
    correctiveSource: { name: "NIMH: Anxiety Disorders", what: "Anxiety disorders involve persistent, excessive fear or worry that interferes with daily activities. They are treatable with therapy, medication, or both.", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
    correctedUnderstanding: "Anxiety disorders are real medical conditions, not personality flaws. Telling someone to 'just relax' is like telling someone with a broken leg to 'just walk.'",
  },
];

interface MythAutopsyProps {
  mvp: "deepreal" | "mental-health" | "religion-hub";
  day: number;
}

export function MythAutopsy({ mvp, day }: MythAutopsyProps) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const mvpMyths = MYTH_CASES.filter((m) => m.mvp === mvp);
  const myth = mvpMyths[day % mvpMyths.length] || mvpMyths[0];

  const steps = [
    { label: "The Claim", icon: "🎯", color: "var(--accent-red, #ef4444)", content: myth.claim },
    { label: "The Emotional Hook", icon: "🪝", color: "#f97316", content: `${myth.emotionalHook}\n\nHook type: ${myth.hookType}` },
    { label: "The Missing Evidence", icon: "🕳️", color: "var(--accent-amber)", content: myth.missingEvidence.map((e, i) => `${i + 1}. ${e}`).join("\n") },
    { label: "The Corrective Source", icon: "✅", color: "var(--accent-emerald)", content: `${myth.correctiveSource.name}\n\n${myth.correctiveSource.what}` },
    { label: "Corrected Understanding", icon: "💡", color: "var(--accent-blue, #3b82f6)", content: myth.correctedUnderstanding },
  ];

  return (
    <div className="brutalist-card stagger-reveal" style={{
      border: "3px solid var(--text-primary)",
      borderRadius: "0",
      padding: "1.5rem",
      background: "var(--bg-primary)",
      marginBottom: "1rem",
      transform: "rotate(-0.5deg)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🔬</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t({ en: "Myth Autopsy Board", ar: "لوحة تشريح الأسطورة", arEG: "لوحة تشريح الأسطورة" })}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>{t({ en: "Guided breakdown \u2014 learn the pattern, not just the answer", ar: "تفكيك موجه — تعلم النمط، ليس الإجابة فقط", arEG: "تفكيك موجه — تعلم النمط، ليس الإجابة فقط" })}</div>
        </div>
      </div>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => { setStep(i); setShowAll(false); }} style={{
            flex: 1, padding: "0.35rem", borderRadius: "6px", border: "none", cursor: "pointer",
            background: i === step ? s.color : "color-mix(in srgb, var(--text-primary) 8%, transparent)",
            color: i === step ? "#000" : "var(--text-secondary)",
            fontSize: "0.6rem", fontWeight: 600, transition: "all 0.2s",
          }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Current step content */}
      {!showAll && (
        <div style={{
          padding: "1rem",
          borderRadius: "10px",
          borderLeft: `3px solid ${steps[step].color}`,
          background: `color-mix(in srgb, ${steps[step].color} 8%, transparent)`,
          minHeight: "80px",
        }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: steps[step].color, marginBottom: "0.5rem", textTransform: "uppercase" }}>
            {steps[step].icon} {steps[step].label}
          </div>
          <div style={{ fontSize: "0.85rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {steps[step].content}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem" }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid var(--border-primary)", background: "transparent", color: "var(--text-primary)", cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1, fontSize: "0.75rem" }}>
          {t({ en: "\u2190 Back", ar: "رجوع \u2192", arEG: "رجوع \u2192" })}
        </button>
        <button onClick={() => setShowAll(true)}
          style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "none", background: "color-mix(in srgb, var(--text-primary) 10%, transparent)", color: "var(--text-primary)", cursor: "pointer", fontSize: "0.7rem" }}>
          {t({ en: "Show All Steps", ar: "عرض كل الخطوات", arEG: "عرض كل الخطوات" })}
        </button>
        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}
          style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "none", background: steps[step].color, color: "#000", cursor: step === steps.length - 1 ? "not-allowed" : "pointer", fontWeight: 600, fontSize: "0.75rem" }}>
          {t({ en: "Next \u2192", ar: "\u2190 التالي", arEG: "\u2190 التالي" })}
        </button>
      </div>
    </div>
  );
}
