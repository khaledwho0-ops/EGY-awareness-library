"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * SOURCE-OF-THE-DAY — §18 Mode 1
 * Daily source spotlight: shows one source, what it's good for,
 * what NOT to use it for, and one real example.
 * Builds source memory over the 14-day intervention.
 */

interface DailySource {
  day: number;
  name: string;
  type: string;
  url: string;
  goodFor: string;
  notFor: string;
  example: string;
  trustBand: "A" | "B" | "C";
  mvp: "deepreal" | "mental-health" | "religion-hub" | "all";
}

const DAILY_SOURCES: DailySource[] = [
  { day: 1, name: "Google Fact Check Explorer", type: "Fact-check aggregator", url: "https://toolbox.google.com/factcheck", goodFor: "Quick lookup of whether a claim has already been fact-checked by IFCN-certified organizations.", notFor: "Original research or claims that haven't gone viral yet.", example: "Search 'COVID vaccine microchip' to see 20+ fact-checks debunking this claim.", trustBand: "A", mvp: "deepreal" },
  { day: 2, name: "WHO Mental Health Portal", type: "Official health guidance", url: "https://www.who.int/health-topics/mental-health", goodFor: "Evidence-based mental health information reviewed by global health experts.", notFor: "Diagnosis, treatment plans, or replacing professional consultation.", example: "WHO's fact sheet on depression provides prevalence data and treatment options.", trustBand: "A", mvp: "mental-health" },
  { day: 3, name: "Al-Azhar Observatory", type: "Religious moderation authority", url: "https://www.azhar.eg", goodFor: "Official moderate Egyptian religious guidance and anti-extremism resources.", notFor: "Personal fatwa or detailed theological rulings on individual cases.", example: "Observatory statements on the importance of mental health awareness in Islam.", trustBand: "A", mvp: "religion-hub" },
  { day: 4, name: "Crossref", type: "Scholarly metadata", url: "https://www.crossref.org", goodFor: "Verifying whether a cited study actually exists and finding its DOI.", notFor: "Reading full papers (it's metadata, not full text).", example: "Search a study title to confirm it's published in a real journal.", trustBand: "A", mvp: "all" },
  { day: 5, name: "MedlinePlus", type: "Patient-facing medical info", url: "https://medlineplus.gov", goodFor: "Clear, evidence-based health explanations written for non-experts.", notFor: "Cutting-edge research or specialist clinical guidance.", example: "Search 'anxiety' for a comprehensive, NIH-reviewed overview.", trustBand: "A", mvp: "mental-health" },
  { day: 6, name: "Internet Archive / Wayback Machine", type: "Web archive", url: "https://web.archive.org", goodFor: "Checking if a webpage has been modified, deleted, or differs from its original version.", notFor: "Real-time monitoring or every claim (use for specific verification).", example: "Compare a news article's original headline with its current version.", trustBand: "A", mvp: "deepreal" },
  { day: 7, name: "Brief RCOPE Research Base", type: "Psychology of religion", url: "https://scholar.google.com/scholar?q=Brief+RCOPE", goodFor: "Understanding the validated science behind positive and negative religious coping.", notFor: "Religious guidance or theological advice.", example: "Pargament et al. (2011) showing positive coping correlates with better adjustment.", trustBand: "A", mvp: "religion-hub" },
  { day: 8, name: "AFP Fact Check", type: "International fact-checking", url: "https://factcheck.afp.com", goodFor: "Multilingual fact-checks including Arabic-language content.", notFor: "Opinion or editorial content (AFP separates news from fact-checks).", example: "AFP Arabic fact-checks on viral Middle East claims.", trustBand: "A", mvp: "deepreal" },
  { day: 9, name: "NIMH (National Institute of Mental Health)", type: "Research-backed health info", url: "https://www.nimh.nih.gov", goodFor: "High-quality educational summaries of mental health conditions based on latest research.", notFor: "Crisis intervention (call 16328 for immediate help in Egypt).", example: "NIMH's page on 'Understanding Psychosis' for educational literacy.", trustBand: "A", mvp: "mental-health" },
  { day: 10, name: "Dar al-Ifta Egypt", type: "Official religious guidance", url: "https://www.dar-alifta.org", goodFor: "Official, moderate religious consultation from a governmental institution.", notFor: "Replacing personal reflection or psychological support.", example: "Dar al-Ifta statements supporting mental health treatment alongside faith.", trustBand: "A", mvp: "religion-hub" },
  { day: 11, name: "Reuters Fact Check", type: "Wire service verification", url: "https://www.reuters.com/fact-check", goodFor: "Major wire service fact-checking with transparent methodology.", notFor: "In-depth academic analysis (it's journalism, not scholarship).", example: "Reuters debunking viral AI-generated images with detailed analysis.", trustBand: "A", mvp: "deepreal" },
  { day: 12, name: "Cochrane Library", type: "Systematic reviews", url: "https://www.cochranelibrary.com", goodFor: "Gold-standard systematic reviews synthesizing all available evidence on health topics.", notFor: "Quick answers — Cochrane reviews are detailed and technical.", example: "Cochrane review on CBT effectiveness for anxiety disorders.", trustBand: "A", mvp: "mental-health" },
  { day: 13, name: "OpenAlex", type: "Open research discovery", url: "https://openalex.org", goodFor: "Free, comprehensive search across 250M+ scholarly works to find evidence.", notFor: "Final truth — it indexes papers but doesn't evaluate their quality.", example: "Search 'religious coping wellbeing Egypt' to find relevant local research.", trustBand: "B", mvp: "all" },
  { day: 14, name: "IFCN Code of Principles", type: "Fact-checking standards", url: "https://ifcncodeofprinciples.poynter.org", goodFor: "Understanding what makes a fact-checker trustworthy and transparent.", notFor: "Fact-checking claims yourself — it's about methodology, not individual claims.", example: "Check if a fact-checking organization is IFCN-certified before trusting it.", trustBand: "A", mvp: "deepreal" },
];

export function SourceOfDay({ day }: { day: number }) {
  const [dismissed, setDismissed] = useState(false);
  const source = DAILY_SOURCES.find((s) => s.day === day) || DAILY_SOURCES[0];
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const wasSeen =
    typeof window !== "undefined" && !!localStorage.getItem(`eal-sotd-${day}`);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`eal-sotd-${day}`, "seen");
    }
    setDismissed(true);
  };

  if (dismissed || wasSeen) return null;

  const bandColors = { A: "var(--accent-emerald)", B: "var(--accent-amber)", C: "var(--accent-red, #ef4444)" };

  return (
    <div style={{
      border: "1px solid color-mix(in srgb, var(--accent-amber) 30%, transparent)",
      borderRadius: "14px",
      padding: "1.25rem",
      background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-amber) 8%, transparent), var(--glass-bg))",
      backdropFilter: "blur(12px)",
      marginBottom: "1rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📚</span>
          <div>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-amber)", letterSpacing: "0.5px" }}>
              {a ? `مصدر اليوم — اليوم ${day}` : `Source of the Day \u2014 Day ${day}`}
            </div>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>{source.name}</div>
          </div>
        </div>
        <span style={{
          fontSize: "0.6rem", padding: "0.15rem 0.5rem", borderRadius: "99px",
          background: `color-mix(in srgb, ${bandColors[source.trustBand]} 20%, transparent)`,
          color: bandColors[source.trustBand], fontWeight: 700,
        }}>
          Band {source.trustBand}
        </span>
      </div>

      <div style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: "0.75rem" }}>{source.type}</div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)", borderLeft: "3px solid var(--accent-emerald)" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent-emerald)" }}>✅ {t({ en: "Good for", ar: "جيد لـ", arEG: "جيد لـ" })}</div>
          <div style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{source.goodFor}</div>
        </div>
        <div style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "color-mix(in srgb, var(--accent-red, #ef4444) 8%, transparent)", borderLeft: "3px solid var(--accent-red, #ef4444)" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent-red, #ef4444)" }}>⚠️ {t({ en: "Not for", ar: "ليس لـ", arEG: "ليس لـ" })}</div>
          <div style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{source.notFor}</div>
        </div>
        <div style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "color-mix(in srgb, var(--text-primary) 5%, transparent)" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, opacity: 0.6 }}>💡 {t({ en: "Example", ar: "مثال", arEG: "مثال" })}</div>
          <div style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{source.example}</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", alignItems: "center" }}>
        <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "var(--accent-amber)", textDecoration: "none", fontWeight: 600 }}>
          {t({ en: "Visit source \u2192", ar: "← زيارة المصدر", arEG: "← زيارة المصدر" })}
        </a>
        <button onClick={handleDismiss} style={{ fontSize: "0.7rem", padding: "0.3rem 0.75rem", borderRadius: "6px", border: "1px solid var(--border-primary)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}>
          {t({ en: "Got it \u2713", ar: "فهمت ✓", arEG: "فهمت ✓" })}
        </button>
      </div>
    </div>
  );
}
