"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  getAverageConfidenceShift,
  getCorrectionLedgerEntries,
  getProgress,
  getSourceClickStats,
  getVerificationStats,
} from "@/lib/progress/progress-service";

/**
 * VERIFICATION CHECKLIST — §18 Mode 2
 * Persistent mini-checklist that creates friction before claim acceptance.
 */
export function VerificationChecklist({ onComplete }: { onComplete: (checks: Record<string, boolean>) => void }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [checks, setChecks] = useState<Record<string, boolean>>({
    source: false, date: false, evidence: false, other: false, emotion: false,
  });

  const items = [
    { id: "source", label: "I checked WHO made this claim", icon: "🔍" },
    { id: "date", label: "I checked WHEN this was published", icon: "📅" },
    { id: "evidence", label: "I looked at the EVIDENCE, not just the headline", icon: "📊" },
    { id: "other", label: "I found at least ONE other source", icon: "🔗" },
    { id: "emotion", label: "I noticed my emotional reaction before judging", icon: "💭" },
  ];

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const allChecked = checkedCount === items.length;

  const toggle = (id: string) => {
    const updated = { ...checks, [id]: !checks[id] };
    setChecks(updated);
    if (Object.values(updated).every(Boolean)) onComplete(updated);
  };

  return (
    <div style={{
      border: "1px solid color-mix(in srgb, var(--accent-emerald) 30%, transparent)",
      borderRadius: "14px", padding: "1.25rem",
      background: "var(--glass-bg)", backdropFilter: "blur(12px)", marginBlock: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>✅</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t({ en: "Verification Checklist", ar: "قائمة التحقق", arEG: "قائمة التحقق" })}</div>
            <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{t({ en: "Before accepting \u2014 did you check?", ar: "قبل القبول \u2014 هل تحققت؟", arEG: "قبل القبول \u2014 هل تحققت؟" })}</div>
          </div>
        </div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: allChecked ? "var(--accent-emerald)" : "var(--text-secondary)" }}>
          {checkedCount}/{items.length}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {items.map((item) => (
          <button key={item.id} onClick={() => toggle(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              width: "100%", textAlign: "left",
              padding: "0.5rem 0.75rem", borderRadius: "8px",
              border: checks[item.id] ? "1px solid var(--accent-emerald)" : "1px solid var(--border-primary)",
              background: checks[item.id] ? "color-mix(in srgb, var(--accent-emerald) 10%, transparent)" : "transparent",
              color: "var(--text-primary)", cursor: "pointer", transition: "all 0.2s", fontSize: "0.8rem",
            }}>
            <span style={{ fontSize: "0.9rem" }}>{checks[item.id] ? "☑️" : "☐"}</span>
            <span style={{ fontSize: "0.85rem" }}>{item.icon}</span>
            <span style={{ opacity: checks[item.id] ? 1 : 0.7 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * MICRO-SCENARIO FEED — §18 Mode 15
 * Short scenario cards for idle-time learning without scoring.
 */
const SCENARIOS = [
  { id: "ms-01", mvp: "deepreal" as const, scenario: "A friend shares a news article with a headline: 'Scientists prove that 5G causes cancer!' The article is from a website you've never heard of.", question: "What's your first verification step?", insight: "SIFT Step 1: STOP. Don't share yet. Check the source, then find better coverage from known outlets." },
  { id: "ms-02", mvp: "mental-health" as const, scenario: "Your cousin tells you: 'I read online that I have ADHD because I can't focus during boring lectures.'", question: "How would you respond?", insight: "Difficulty focusing during unstimulating activities is common. ADHD is a clinical diagnosis requiring professional assessment — this is education vs. diagnosis boundary." },
  { id: "ms-03", mvp: "religion-hub" as const, scenario: "A YouTube video says: 'If you're depressed, it means your faith is weak. Just pray more and you'll be fine.'", question: "What patterns do you notice?", insight: "This combines spiritual bypassing (using faith to avoid addressing psychological needs) with guilt induction. Major authorities like Al-Azhar support mental health treatment alongside faith." },
  { id: "ms-04", mvp: "deepreal" as const, scenario: "You see a shocking photo on Twitter claiming to show a recent disaster. The image has over 50K retweets.", question: "What should you check?", insight: "Use reverse image search — viral photos are frequently recycled from unrelated events. Popularity ≠ accuracy." },
  { id: "ms-05", mvp: "mental-health" as const, scenario: "A popular influencer promotes a supplement claiming it 'cures anxiety naturally with zero side effects.'", question: "What red flags do you notice?", insight: "Claims of 'curing' clinical conditions with no side effects are red flags. No supplement can replace evidence-based treatment. Check if there's peer-reviewed research." },
  { id: "ms-06", mvp: "religion-hub" as const, scenario: "An anonymous account shares a clip of a preacher saying: 'Anyone who sees a therapist is rejecting God's will.'", question: "How would you evaluate this?", insight: "Check: Is this from an accredited authority? Anonymous clips lack accountability. Both Dar al-Ifta and Al-Azhar support seeking mental health treatment." },
];

export function MicroScenario({ mvp, index = 0 }: { mvp: "deepreal" | "mental-health" | "religion-hub"; index?: number }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [showInsight, setShowInsight] = useState(false);
  const filtered = SCENARIOS.filter((s) => s.mvp === mvp);
  const scenario = filtered[index % filtered.length];

  return (
    <div style={{
      border: "1px solid var(--border-primary)", borderRadius: "14px",
      padding: "1.25rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)", marginBlock: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🎲</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t({ en: "Quick Scenario", ar: "سيناريو سريع", arEG: "سيناريو سريع" })}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{t({ en: "~1 min \u2022 No scoring \u2022 Just think", ar: "~1 دقيقة \u2022 بدون درجات \u2022 فكر فقط", arEG: "~1 دقيقة \u2022 بدون درجات \u2022 فكر فقط" })}</div>
        </div>
      </div>

      <div style={{ padding: "0.75rem 1rem", borderRadius: "8px", background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", marginBottom: "0.75rem", fontSize: "0.85rem", lineHeight: 1.6 }}>
        {scenario.scenario}
      </div>

      <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--accent-amber)", marginBottom: "0.5rem" }}>
        💡 {scenario.question}
      </div>

      {!showInsight ? (
        <button onClick={() => setShowInsight(true)}
          style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid var(--accent-amber)", background: "transparent", color: "var(--accent-amber)", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>
          {t({ en: "Show Insight", ar: "عرض الإفادة", arEG: "عرض الإفادة" })}
        </button>
      ) : (
        <div style={{
          padding: "0.75rem 1rem", borderRadius: "8px",
          borderLeft: "3px solid var(--accent-emerald)",
          background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)",
          fontSize: "0.8rem", lineHeight: 1.5,
        }}>
          {scenario.insight}
        </div>
      )}
    </div>
  );
}

/**
 * AFTER-ACTION REVIEW — §18 Mode 17
 * Weekly summary: what fooled you, what improved, which sources you used.
 */
export function AfterActionReview() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [stats] = useState<{
    exercisesCompleted: number;
    correctionsCount: number;
    sourcesUsed: number;
    avgConfidenceShift: number;
    verificationActions: number;
  } | null>(() => {
    const progress = getProgress();
    const corrections = getCorrectionLedgerEntries();
    const sourceStats = getSourceClickStats();
    const confidenceShift = getAverageConfidenceShift();
    const verificationStats = getVerificationStats();

    return {
      exercisesCompleted: progress.exercises.length,
      correctionsCount: corrections.length,
      sourcesUsed: sourceStats.total,
      avgConfidenceShift: Number(confidenceShift.avgShift.toFixed(1)),
      verificationActions: verificationStats.completed,
    };
  });

  return (
    <div style={{
      border: "1px solid color-mix(in srgb, var(--accent-indigo) 30%, transparent)",
      borderRadius: "14px", padding: "1.5rem",
      background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-indigo) 8%, transparent), var(--glass-bg))",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>📋</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>{t({ en: "Weekly After-Action Review", ar: "مراجعة ما بعد الإجراء الأسبوعية", arEG: "مراجعة ما بعد الإجراء الأسبوعية" })}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>§18 Mode 17 • What changed this week?</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
        {[
          { label: "Exercises Completed", value: stats?.exercisesCompleted || 0, icon: "📝", color: "var(--accent-emerald)" },
          { label: "Beliefs Corrected", value: stats?.correctionsCount || 0, icon: "🔄", color: "var(--accent-amber)" },
          { label: "Sources Consulted", value: stats?.sourcesUsed || 0, icon: "📚", color: "var(--accent-blue, #3b82f6)" },
          { label: "Avg Confidence Δ", value: `${stats?.avgConfidenceShift || 0}%`, icon: "📊", color: "var(--accent-purple, #8b5cf6)" },
          { label: "Verification Actions", value: stats?.verificationActions || 0, icon: "🛡️", color: "var(--accent-indigo, #8b5cf6)" },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: "0.75rem", borderRadius: "10px",
            background: `color-mix(in srgb, ${stat.color} 8%, transparent)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Reflection prompts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {[
          "What fooled me this week that I now recognize?",
          "What verification habit am I building?",
          "What would I do differently next time?",
        ].map((prompt, i) => (
          <div key={i} style={{
            padding: "0.6rem 0.75rem", borderRadius: "8px",
            background: "color-mix(in srgb, var(--text-primary) 4%, transparent)",
            fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span style={{ fontSize: "0.9rem" }}>🤔</span>
            <span style={{ fontStyle: "italic", opacity: 0.8 }}>{prompt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
