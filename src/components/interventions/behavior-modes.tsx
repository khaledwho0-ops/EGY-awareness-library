"use client";

import { useState } from "react";
import { getCorrectionLedgerEntries } from "@/lib/progress/progress-service";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * BIAS REFLECTION MINUTE — §18 Mode 12
 * Post-exercise metacognition prompt: "Did I want this claim to be true?"
 */
export function BiasReflection({ onComplete }: { onComplete: (response: string) => void }) {
  const [response, setResponse] = useState("");
  const [step, setStep] = useState(0);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const prompts = [
    { question: "Before checking, did you want this to be true or false?", placeholder: "I wanted it to be..." },
    { question: "What emotion did you feel when you first saw this content?", placeholder: "I felt..." },
    { question: "Did your judgment change after checking? Why or why not?", placeholder: "My judgment..." },
  ];

  return (
    <div style={{ border: "1px solid color-mix(in srgb, var(--accent-purple, #8b5cf6) 30%, transparent)", borderRadius: "14px", padding: "1.25rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)", marginBlock: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🪞</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t({ en: "Bias Reflection Minute", ar: "دقيقة تأمل التحيز", arEG: "دقيقة تأمل التحيز" })}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>~1 min • Trains metacognition (§18 Mode 12)</div>
        </div>
      </div>
      <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--accent-purple, #8b5cf6)" }}>
        {prompts[step].question}
      </div>
      <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder={prompts[step].placeholder} rows={2}
        style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--border-primary)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "0.8rem", fontFamily: "inherit", resize: "none" }} />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
        {step < prompts.length - 1 ? (
          <button onClick={() => { setStep(step + 1); setResponse(""); }}
            style={{ padding: "0.35rem 0.75rem", borderRadius: "6px", border: "none", background: "var(--accent-purple, #8b5cf6)", color: "#fff", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>
            {t({ en: "Next \u2192", ar: "\u2190 التالي", arEG: "\u2190 التالي" })}
          </button>
        ) : (
          <button onClick={() => onComplete(response)} disabled={!response.trim()}
            style={{ padding: "0.35rem 0.75rem", borderRadius: "6px", border: "none", background: "var(--accent-emerald)", color: "#000", fontWeight: 600, fontSize: "0.75rem", cursor: response.trim() ? "pointer" : "not-allowed" }}>
            {t({ en: "Complete \u2713", ar: "إكمال \u2713", arEG: "إكمال \u2713" })}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * CORRECTION LEDGER — §18 Mode 4
 * Personal record of corrected beliefs. Makes being wrong normal.
 */
export function CorrectionLedger() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [entries] = useState<Array<{ claim: string; correction: string; date: string }>>(() =>
    getCorrectionLedgerEntries()
  );

  return (
    <div style={{ border: "1px solid color-mix(in srgb, var(--accent-amber) 30%, transparent)", borderRadius: "14px", padding: "1.25rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem" }}>📒</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t({ en: "My Correction Ledger", ar: "سجل تصحيحاتي", arEG: "سجل تصحيحاتي" })}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{a ? `الخطأ هو طريقة التعلم \u2022 ${entries.length} تصحيحات مسجلة` : `Being wrong is how learning works \u2022 ${entries.length} corrections recorded`}</div>
        </div>
      </div>
      {entries.length === 0 ? (
        <div style={{ padding: "1rem", textAlign: "center", opacity: 0.5, fontSize: "0.8rem" }}>
          {t({ en: "No corrections yet \u2014 they\u0027ll appear as you complete exercises.", ar: "لا تصحيحات بعد \u2014 ستظهر عند إكمال التمارين.", arEG: "لا تصحيحات بعد \u2014 ستظهر عند إكمال التمارين." })}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "300px", overflow: "auto" }}>
          {entries.slice(-10).reverse().map((entry, i) => (
            <div key={i} style={{ padding: "0.6rem 0.75rem", borderRadius: "8px", background: "color-mix(in srgb, var(--text-primary) 4%, transparent)", fontSize: "0.8rem" }}>
              <div style={{ color: "var(--accent-red, #ef4444)", fontWeight: 600, marginBottom: "0.2rem" }}>❌ {t({ en: "I thought: ", ar: "اعتقدت: ", arEG: "اعتقدت: " })}{entry.claim}</div>
              <div style={{ color: "var(--accent-emerald)", fontWeight: 600 }}>✅ {t({ en: "Actually: ", ar: "في الواقع: ", arEG: "في الواقع: " })}{entry.correction}</div>
              <div style={{ fontSize: "0.65rem", opacity: 0.4, marginTop: "0.2rem" }}>{new Date(entry.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * DECISION TREE NAVIGATOR — §18 Mode 10
 * If/then action routing for MH + Religion Hub.
 */
export function DecisionTree({ mvp }: { mvp: "mental-health" | "religion-hub" }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [currentNode, setCurrentNode] = useState("start");

  const mhTree: Record<string, { question: string; options: Array<{ label: string; next: string }> }> = {
    start: { question: "How are you feeling right now?", options: [
      { label: "I'm feeling distressed", next: "distressed" },
      { label: "I'm curious about a topic", next: "curious" },
      { label: "I'm worried about someone else", next: "worried" },
    ]},
    distressed: { question: "Are you in immediate danger or crisis?", options: [
      { label: "Yes, I need help now", next: "crisis" },
      { label: "No, but I'm struggling", next: "struggling" },
    ]},
    crisis: { question: "Please reach out immediately:", options: [
      { label: "📞 Call 16328 (Egypt Mental Health Hotline)", next: "end_crisis" },
      { label: "🚑 Call 123 (Emergency/Ambulance)", next: "end_crisis" },
    ]},
    struggling: { question: "What would help most right now?", options: [
      { label: "Learn about what I'm feeling", next: "end_learn" },
      { label: "Find professional support", next: "end_support" },
      { label: "Try a grounding exercise", next: "end_ground" },
    ]},
    curious: { question: "What are you curious about?", options: [
      { label: "Understanding a mental health term", next: "end_glossary" },
      { label: "How to support someone", next: "end_support_other" },
    ]},
    worried: { question: "What concerns you?", options: [
      { label: "They mentioned self-harm", next: "crisis" },
      { label: "They seem withdrawn/different", next: "end_support_other" },
    ]},
    end_crisis: { question: "Your safety matters most. Please call now. This app is educational only.", options: [] },
    end_learn: { question: "Head to the Mental Health exercises to learn more. Remember: education, not diagnosis.", options: [] },
    end_support: { question: "Contact your university counseling center or call 16328 for guidance.", options: [] },
    end_ground: { question: "Try this: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.", options: [] },
    end_glossary: { question: "Browse our evidence-based glossary of 15 key mental health terms.", options: [] },
    end_support_other: { question: "Listen without judging. Share 16328 hotline. Encourage professional help.", options: [] },
  };

  const religionTree: Record<string, { question: string; options: Array<{ label: string; next: string }> }> = {
    start: { question: "What kind of support do you need right now?", options: [
      { label: "I need formal religious guidance", next: "guidance" },
      { label: "I feel guilt or anxiety after religious content", next: "guilt" },
      { label: "I want healthier coping patterns", next: "coping" },
    ]},
    guidance: { question: "Use the right authority for the right need.", options: [
      { label: "Call Dar al-Ifta 107", next: "end_guidance" },
      { label: "Review Al-Azhar moderation sources", next: "end_moderation" },
    ]},
    guilt: { question: "What is the safest immediate response?", options: [
      { label: "Pause, breathe, and stop the exercise", next: "end_pause" },
      { label: "If distress is strong, move to mental-health support", next: "end_support" },
    ]},
    coping: { question: "Which path fits best?", options: [
      { label: "Reflect on positive coping habits", next: "end_coping" },
      { label: "Learn what spiritual bypassing looks like", next: "end_boundaries" },
    ]},
    end_guidance: { question: "Formal guidance belongs with official scholars, not this app.", options: [] },
    end_moderation: { question: "Use Al-Azhar moderation references when the issue involves manipulation, hate, or extremism.", options: [] },
    end_pause: { question: "Discomfort can be part of learning. Distress means pause, ground, and do not force yourself to continue.", options: [] },
    end_support: { question: "If the issue is psychological distress, combine spiritual support with professional mental-health care.", options: [] },
    end_coping: { question: "Positive coping means meaning, support, patience, and reflection without denial of reality.", options: [] },
    end_boundaries: { question: "Faith should not be used to silence pain, block treatment, or intensify shame.", options: [] },
  };

  const tree = mvp === "mental-health" ? mhTree : religionTree;
  const node = tree[currentNode];

  return (
    <div style={{ border: "1px solid color-mix(in srgb, var(--accent-emerald) 30%, transparent)", borderRadius: "14px", padding: "1.25rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🗺️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t({ en: "Decision Navigator", ar: "ملاح القرارات", arEG: "ملاح القرارات" })}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{t({ en: "Safe routing to the right resource", ar: "توجيه آمن للمورد الصحيح", arEG: "توجيه آمن للمورد الصحيح" })}</div>
        </div>
      </div>

      <div style={{ padding: "1rem", borderRadius: "10px", background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)", marginBottom: "0.75rem" }}>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{node?.question}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {node?.options.map((opt, i) => (
          <button key={i} onClick={() => setCurrentNode(opt.next)}
            style={{ width: "100%", textAlign: "left", padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid var(--border-primary)", background: "transparent", color: "var(--text-primary)", cursor: "pointer", fontSize: "0.8rem", transition: "all 0.2s" }}>
            {opt.label}
          </button>
        ))}
        {node?.options.length === 0 && (
          <button onClick={() => setCurrentNode("start")}
            style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "none", background: "var(--accent-emerald)", color: "#000", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
            {t({ en: "Start Over", ar: "ابدأ من جديد", arEG: "ابدأ من جديد" })}
          </button>
        )}
      </div>
    </div>
  );
}
