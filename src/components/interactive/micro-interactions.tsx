"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Q49: WORD-BY-WORD TEXT REVEAL — cubic-bezier(0.4, 0, 0.2, 1)
 * For Bias Reflection Minute: slows user rhythm, forces reflection.
 */
export function TextReveal({
  text,
  delayPerWord = 120,
  onComplete,
}: {
  text: string;
  delayPerWord?: number;
  onComplete?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const words = text.split(" ");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let count = 0;
    timerRef.current = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= words.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        onComplete?.();
      }
    }, delayPerWord);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [words.length, delayPerWord, onComplete]);

  return (
    <p style={{ fontSize: "18px", lineHeight: 1.8, minHeight: "4em" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="text-reveal-word"
          style={{
            animationDelay: `${i * delayPerWord}ms`,
            opacity: i < visibleCount ? 1 : 0,
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

/**
 * Q47: WAVEFORM ANIMATION — Audio playing visual pulse
 * For Expert Voice Capsule: circular vibrations showing audio is active.
 */
export function WaveformIndicator({ playing = false }: { playing?: boolean }) {
  return (
    <div className={`waveform-bars ${playing ? "playing" : ""}`} aria-label={playing ? "Audio playing" : "Audio paused"}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="waveform-bar" />
      ))}
    </div>
  );
}

/**
 * Q48: DECISION TREE ACCORDION — If/then directives
 * Collapsible with max-height:auto, prevents vertical scroll exhaustion.
 */
export function DecisionTreeAccordion({
  nodes,
}: {
  nodes: { question: string; yesPath: string; noPath: string; detail?: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {nodes.map((node, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%", padding: "16px 20px", border: "none", background: "transparent",
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: "14px", fontWeight: 600, color: "var(--text-primary)",
                textAlign: "left",
              }}
              aria-expanded={isOpen}
            >
              <span>🔀 {node.question}</span>
              <span style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
            </button>
            <div style={{
              maxHeight: isOpen ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "var(--radius-md)",
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                  fontSize: "13px",
                }}>
                  <strong style={{ color: "var(--color-success)" }}>IF YES →</strong> {node.yesPath}
                </div>
                <div style={{
                  padding: "10px 14px", borderRadius: "var(--radius-md)",
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                  fontSize: "13px",
                }}>
                  <strong style={{ color: "var(--color-danger)" }}>IF NO →</strong> {node.noPath}
                </div>
                {node.detail && (
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: 4 }}>{node.detail}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Q50: PEER PAIR TAB NAV — Sliding underline with translateX
 * For comparing student's answer with peer answer.
 */
export function PeerPairTabs({
  myAnswer,
  peerAnswer,
}: {
  myAnswer: React.ReactNode;
  peerAnswer: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"mine" | "peer">("mine");
  const tab1Ref = useRef<HTMLButtonElement>(null);
  const tab2Ref = useRef<HTMLButtonElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const updateUnderline = useCallback(() => {
    const ref = activeTab === "mine" ? tab1Ref : tab2Ref;
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        setUnderlineStyle({
          left: ref.current.offsetLeft,
          width: ref.current.offsetWidth,
        });
      }
    }
  }, [activeTab]);

  useEffect(() => { updateUnderline(); }, [updateUnderline]);

  return (
    <div>
      <div className="tab-nav" role="tablist">
        <button
          ref={tab1Ref}
          role="tab"
          aria-selected={activeTab === "mine"}
          className={`tab-nav-item ${activeTab === "mine" ? "active" : ""}`}
          onClick={() => setActiveTab("mine")}
        >
          My Answer
        </button>
        <button
          ref={tab2Ref}
          role="tab"
          aria-selected={activeTab === "peer"}
          className={`tab-nav-item ${activeTab === "peer" ? "active" : ""}`}
          onClick={() => setActiveTab("peer")}
        >
          Peer&apos;s Answer
        </button>
        <div
          className="tab-nav-underline"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        />
      </div>
      <div role="tabpanel" style={{ padding: "var(--space-lg) 0" }}>
        {activeTab === "mine" ? myAnswer : peerAnswer}
      </div>
    </div>
  );
}

/**
 * Q60: TESTIMONIALS MARQUEE — Expert reviews, opposite-speed rows
 * Duplicate nodes for infinite scroll animation.
 */
export function ExpertMarquee({
  reviews,
}: {
  reviews: { name: string; role: string; quote: string }[];
}) {
  const row1 = reviews.slice(0, Math.ceil(reviews.length / 2));
  const row2 = reviews.slice(Math.ceil(reviews.length / 2));

  const renderCard = (r: typeof reviews[0], i: number) => (
    <div key={i} className="glass-card" style={{
      padding: "var(--space-lg)", minWidth: 280, maxWidth: 340, flexShrink: 0,
    }}>
      <p style={{ fontSize: "13px", fontStyle: "italic", marginBottom: 12, color: "var(--text-secondary)" }}>
        &ldquo;{r.quote}&rdquo;
      </p>
      <div style={{ fontSize: "12px" }}>
        <strong style={{ color: "var(--text-primary)" }}>{r.name}</strong>
        <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>{r.role}</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {row1.map(renderCard)}
          {row1.map((r, i) => renderCard(r, i + 100))}
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track-reverse">
          {row2.map(renderCard)}
          {row2.map((r, i) => renderCard(r, i + 200))}
        </div>
      </div>
    </div>
  );
}
