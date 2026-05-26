"use client";

import { useMemo } from "react";
import { VERIFIED_QUOTES } from "@/data/research/verified-quotes";
import { useRTL } from "@/components/shared/rtl-provider";

const LENS_LABELS = {
  deepreal: { en: "DeepReal", ar: "ديب ريال" },
  "mental-health": { en: "Mental Health", ar: "الصحة النفسية" },
  "religion-hub": { en: "Religion Hub", ar: "المحور الديني" },
} as const;

export function VerifiedQuotesStrip() {
  const { isRTL, t } = useRTL();
  const a = isRTL;

  // Show 6 randomized quotes per render (2 per module for balance)
  const selected = useMemo(() => {
    const byLens = { deepreal: [] as typeof VERIFIED_QUOTES, "mental-health": [] as typeof VERIFIED_QUOTES, "religion-hub": [] as typeof VERIFIED_QUOTES };
    for (const q of VERIFIED_QUOTES) byLens[q.lens].push(q);
    const pick = (arr: typeof VERIFIED_QUOTES, n: number) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
    return [...pick(byLens.deepreal, 2), ...pick(byLens["mental-health"], 2), ...pick(byLens["religion-hub"], 2)];
  }, []);

  return (
    <section style={{ padding: "var(--space-2xl) 0" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
        <h2 style={{ marginBottom: 10 }}>
          {t({ en: "Verified", ar: "حِكَم", arEG: "حِكَم" })} <span className="text-gradient">{t({ en: "Wisdom", ar: "موثقة من العلماء", arEG: "موثقة من العلماء" })}</span>
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 720, margin: "0 auto" }}>
          {a
            ? "ليست آراء خبراء عابرة. هذه اقتباسات حقيقية من علماء وفلاسفة ومصادر مقدسة — كل واحدة تتعلق مباشرة بالمرونة المعرفية والسلامة النفسية والاعتدال."
            : "Not expert opinions. Real quotations from scientists, philosophers, and sacred sources — each directly relevant to cognitive resilience, mental safety, and moderation."}
        </p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {selected.map((entry) => (
          <article key={entry.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start", marginBottom: 12 }}>
              <span className="badge">
                {a ? LENS_LABELS[entry.lens].ar : LENS_LABELS[entry.lens].en}
              </span>
              <span style={{ color: "var(--text-caption)", fontSize: 12 }}>
                {a ? entry.authorAr : entry.author}
              </span>
            </div>
            <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.55, fontWeight: 600, color: "var(--text-primary)" }}>
              &ldquo;{a ? entry.quoteAr : entry.quote}&rdquo;
            </blockquote>
            <p style={{ margin: "12px 0 0", color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>
              {a ? entry.framingAr : entry.framing}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

