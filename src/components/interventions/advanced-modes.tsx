"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * SOURCE COMPARE MODE — §18 Mode 6
 * Side-by-side source panel: same topic from 2-3 trusted sources.
 * Teaches triangulation — the core of lateral reading.
 */

interface ComparisonSet {
  id: string;
  topic: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  sources: Array<{
    name: string;
    url?: string;
    trustBand: "A" | "B" | "C";
    excerpt: string;
    strength: string;
    limitation: string;
  }>;
  takeaway: string;
}

const COMPARISON_SETS: ComparisonSet[] = [
  {
    id: "sc-01", topic: "Can misinformation resistance actually be trained?", mvp: "deepreal",
    sources: [
      {
        name: "University of Cambridge - Bad News",
        url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation",
        trustBand: "A",
        excerpt: "Cambridge reported that a single Bad News gameplay session reduced the perceived reliability of fake news by an average of 21% while leaving judgments of real news unchanged.",
        strength: "Official university summary tied to the original intervention study",
        limitation: "News summary rather than the full methods paper",
      },
      {
        name: "University of Cambridge - MIST",
        url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test",
        trustBand: "A",
        excerpt: "Cambridge describes MIST as a validated misinformation susceptibility test developed and checked in experiments involving more than 8,000 participants over two years.",
        strength: "Official source for what the test measures and why it was created",
        limitation: "Public-facing overview, not the full psychometric appendix",
      },
      {
        name: "Viral thread / motivational repost",
        trustBand: "C",
        excerpt: "You can't train people against fake news. Either you're smart enough already or you're doomed. Anyone selling prebunking is lying to you.",
        strength: "Emotionally forceful and easy to remember",
        limitation: "No methods, no data, no source transparency, and absolute language that ignores actual intervention evidence",
      },
    ],
    takeaway: "The high-trust sources explain both the intervention and the evidence standard behind it. The low-trust claim gives certainty without method, sample, or measurement. That contrast is exactly what DeepReal trains users to catch.",
  },
  {
    id: "sc-02", topic: "Is therapy effective for anxiety?", mvp: "mental-health",
    sources: [
      { name: "NICE Guidelines (UK)", trustBand: "A", excerpt: "CBT is recommended as first-line treatment for generalised anxiety disorder. Medication may be considered if CBT is insufficient.", strength: "Evidence-based clinical guideline", limitation: "UK-specific context" },
      { name: "NIMH Information Page", trustBand: "A", excerpt: "Anxiety disorders are generally treated with psychotherapy, medication, or both. CBT is especially useful for treating anxiety disorders.", strength: "Research-backed public education", limitation: "General overview, not clinical guidance" },
      { name: "Anonymous forum post", trustBand: "C", excerpt: "Therapy is a waste of money. I went for 3 sessions and felt worse. Just exercise and meditate instead.", strength: "Personal lived experience", limitation: "Single anecdote, not generalizable, may discourage help-seeking" },
    ],
    takeaway: "Personal experience is valid but cannot override systematic evidence. Both official sources agree therapy works, while acknowledging it's not the only approach.",
  },
  {
    id: "sc-03", topic: "Does prayer improve mental health?", mvp: "religion-hub",
    sources: [
      { name: "Pargament et al. (2011)", trustBand: "A", excerpt: "Positive religious coping (including prayer) is consistently associated with better psychological adjustment (r=0.3-0.5). However, negative religious coping shows the opposite pattern.", strength: "100+ studies, validated instrument", limitation: "Correlational, not causal proof" },
      { name: "Al-Azhar Statement", trustBand: "A", excerpt: "Islam encourages seeking knowledge and treatment for illness, including mental illness. Prayer and medical treatment are complementary, not contradictory.", strength: "Official moderate religious authority", limitation: "Theological perspective, not empirical data" },
      { name: "Social media clip", trustBand: "C", excerpt: "Prayer ALONE cures ALL mental illness. If you need a doctor, your faith is weak!", strength: "Emotionally resonant for some", limitation: "Contradicts both research AND official religious guidance. May cause harm by discouraging treatment." },
    ],
    takeaway: "Both the research and the official religious authority agree: prayer can help, AND professional treatment is important. The social media clip contradicts BOTH sources.",
  },
];

export function SourceCompare({ mvp, index = 0 }: { mvp: "deepreal" | "mental-health" | "religion-hub"; index?: number }) {
  const [revealed, setRevealed] = useState(false);
  const filtered = COMPARISON_SETS.filter((s) => s.mvp === mvp);
  const set = filtered[index % filtered.length];
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const bandColors = { A: "var(--accent-emerald)", B: "var(--accent-amber)", C: "var(--accent-red, #ef4444)" };

  return (
    <div style={{
      border: "1px solid var(--border-primary)", borderRadius: "14px",
      padding: "1.5rem", background: "var(--glass-bg)", backdropFilter: "blur(12px)", marginBlock: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1.25rem" }}>⚖️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t({ en: "Source Compare", ar: "مقارنة المصادر", arEG: "مقارنة المصادر" })}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{t({ en: "Same topic, different sources \u2014 learn to triangulate", ar: "نفس الموضوع، مصادر مختلفة \u2014 تعلم التثليث", arEG: "نفس الموضوع، مصادر مختلفة \u2014 تعلم التثليث" })}</div>
        </div>
      </div>

      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--accent-amber)", marginBottom: "1rem" }}>
        {t({ en: "Topic: ", ar: "الموضوع: ", arEG: "الموضوع: " })}{set.topic}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
        {set.sources.map((src, i) => (
          <div key={i} style={{
            padding: "0.75rem 1rem", borderRadius: "10px",
            border: `1px solid color-mix(in srgb, ${bandColors[src.trustBand]} 30%, transparent)`,
            background: `color-mix(in srgb, ${bandColors[src.trustBand]} 5%, transparent)`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{src.name}</span>
              <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "99px", background: `color-mix(in srgb, ${bandColors[src.trustBand]} 20%, transparent)`, color: bandColors[src.trustBand], fontWeight: 700 }}>
                Band {src.trustBand}
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.5, fontStyle: "italic", marginBottom: "0.5rem", opacity: 0.85 }}>
              &ldquo;{src.excerpt}&rdquo;
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.7rem" }}>
              <div style={{ color: "var(--accent-emerald)" }}>✅ {src.strength}</div>
              <div style={{ color: "var(--accent-red, #ef4444)" }}>⚠️ {src.limitation}</div>
            </div>
            {src.url && (
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: "0.5rem",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--accent-cta)",
                  textDecoration: "none",
                }}
              >
                {t({ en: "Official source \u2197", ar: "← المصدر الرسمي", arEG: "← المصدر الرسمي" })}
              </a>
            )}
          </div>
        ))}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{
          width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none",
          background: "var(--accent-amber)", color: "#000", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
        }}>
          🔍 {t({ en: "Reveal Triangulation Takeaway", ar: "إظهار خلاصة التثليث", arEG: "إظهار خلاصة التثليث" })}
        </button>
      ) : (
        <div style={{
          padding: "0.75rem 1rem", borderRadius: "10px",
          borderLeft: "3px solid var(--accent-emerald)",
          background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)",
          fontSize: "0.85rem", lineHeight: 1.6,
        }}>
          💡 {set.takeaway}
        </div>
      )}
    </div>
  );
}

/**
 * EXPERT VOICE CAPSULE — §18 Mode 9
 * 60-90 sec text explanation by a domain expert on one key concept.
 */
const EXPERT_CAPSULES = [
  { id: "ec-01", mvp: "deepreal" as const, expertName: "Based on van der Linden (2022)", title: "Why Your Brain Falls for Fake News", duration: "~90 sec read", content: "Your brain has two systems. System 1 is fast, automatic, and emotional — it's what makes you react to a scary headline before thinking. System 2 is slow, analytical, and effortful — it's what makes you stop and check. Misinformation exploits System 1. It uses emotional triggers, authority signals, and social proof to bypass your analytical thinking. The goal of inoculation is not to make you skeptical of everything — it's to train you to recognize when System 1 is being exploited, so you can activate System 2 when it matters most." },
  { id: "ec-02", mvp: "mental-health" as const, expertName: "Based on Jorm (2012)", title: "What Mental Health Literacy Actually Means", duration: "~60 sec read", content: "Mental health literacy isn't just knowing the names of disorders. It's a complete set of skills: Can you recognize when someone might be struggling? Do you know what helps? Do you know where to get help? And critically — are your attitudes supportive rather than stigmatizing? Research shows that improving these skills doesn't just help individuals — it transforms communities. When enough people in a community can recognize distress and respond with support rather than judgment, help-seeking becomes normal, and outcomes improve for everyone." },
  { id: "ec-03", mvp: "religion-hub" as const, expertName: "Based on Pargament (2011)", title: "Religion as a Coping Resource, Not a Test", duration: "~90 sec read", content: "Research identifies two distinct patterns of religious coping. Positive coping involves seeking spiritual connection, finding meaning through faith, and using religious community for support. Negative coping involves feeling punished or abandoned by God, questioning whether God cares, and experiencing interpersonal religious conflict. Here's what's crucial: negative coping is not a sign of 'weak faith.' It's a normal response to crisis that can be recognized and addressed. The goal is awareness — understanding which patterns you use, when they help, and when they might need professional support alongside spiritual practice." },
];

export function ExpertCapsule({ mvp }: { mvp: "deepreal" | "mental-health" | "religion-hub" }) {
  const [expanded, setExpanded] = useState(false);
  const capsule = EXPERT_CAPSULES.find((c) => c.mvp === mvp) || EXPERT_CAPSULES[0];

  const mvpColors: Record<string, string> = {
    deepreal: "var(--accent-amber)",
    "mental-health": "var(--accent-emerald)",
    "religion-hub": "var(--accent-indigo)",
  };

  return (
    <div style={{
      border: `1px solid color-mix(in srgb, ${mvpColors[mvp]} 30%, transparent)`,
      borderRadius: "14px", padding: "1.25rem",
      background: `linear-gradient(135deg, color-mix(in srgb, ${mvpColors[mvp]} 8%, transparent), var(--glass-bg))`,
      backdropFilter: "blur(12px)", marginBlock: "1rem",
    }}>
      <button onClick={() => setExpanded(!expanded)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "transparent", border: "none", cursor: "pointer", color: "var(--text-primary)", textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🎓</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{capsule.title}</div>
            <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{capsule.expertName} • {capsule.duration}</div>
          </div>
        </div>
        <span style={{ transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "none" }}>▼</span>
      </button>

      {expanded && (
        <div style={{ marginTop: "0.75rem", padding: "1rem", borderRadius: "10px", background: "color-mix(in srgb, var(--text-primary) 4%, transparent)", fontSize: "0.85rem", lineHeight: 1.7 }}>
          {capsule.content}
        </div>
      )}
    </div>
  );
}
