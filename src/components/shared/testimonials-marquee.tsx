"use client";

import { useRTL } from "@/components/shared/rtl-provider";

interface QuoteItem {
  name: string;
  role: string;
  text: string;
}

const QUOTES: QuoteItem[] = [
  {
    name: "Carl Sagan",
    role: "Astronomer",
    text: "Extraordinary claims require extraordinary evidence.",
  },
  {
    name: "Richard Feynman",
    role: "Physicist",
    text: "You must not fool yourself, and you are the easiest person to fool.",
  },
  {
    name: "William James",
    role: "Psychologist and Philosopher",
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
  },
  {
    name: "Viktor E. Frankl",
    role: "Psychiatrist",
    text: "Between stimulus and response there is a space.",
  },
  {
    name: "Jonathan Sacks",
    role: "Rabbi and Philosopher",
    text: "A world without room for difference is a world without room for humanity.",
  },
  {
    name: "Karen Armstrong",
    role: "Historian of Religion",
    text: "Compassion is the test of any true religion.",
  },
  {
    name: "Ibn Rushd",
    role: "Philosopher",
    text: "Ignorance leads to fear, fear leads to hatred, and hatred leads to violence.",
  },
  {
    name: "Al-Hasan al-Basri",
    role: "Scholar",
    text: "The believer pauses when he is uncertain until the matter becomes clear.",
  },
];

export function TestimonialsMarquee() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const row1 = QUOTES.slice(0, 4);
  const row2 = QUOTES.slice(4, 8);

  const renderCard = (quote: QuoteItem) => (
    <div
      key={`${quote.name}-${quote.text}`}
      className="glass-card"
      style={{
        padding: "20px 24px",
        minWidth: 320,
        maxWidth: 380,
        flexShrink: 0,
        borderRadius: "var(--radius-lg)",
      }}
    >
      <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 12, fontStyle: "italic" }}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-cta), var(--accent-religionhub))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            color: "white",
          }}
        >
          {quote.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{quote.name}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{quote.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{ overflow: "hidden", padding: "var(--space-2xl) 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
        <span className="text-gradient">{t({ en: "Trusted Quotations", ar: "اقتباسات موثوقة", arEG: "اقتباسات موثوقة" })}</span>
      </h2>

      <div className="marquee-wrapper" style={{ marginBottom: 16 }}>
        <div className="marquee-track">
          {[...row1, ...row1].map((quote, index) => (
            <div key={`r1-${index}`}>{renderCard(quote)}</div>
          ))}
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track-reverse">
          {[...row2, ...row2].map((quote, index) => (
            <div key={`r2-${index}`}>{renderCard(quote)}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
