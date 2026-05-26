"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Q3: CONFIDENCE RANGE SLIDER — TCE measurement
 * §17.7: Collects confidence % (0-100) BEFORE the user answers.
 * Used to compute Trust Calibration Error = |Confidence% - Correctness%|
 */
export function ConfidenceSlider({
  onConfirm,
  label = "How confident are you in your ability to identify the correct answer?",
}: {
  onConfirm: (value: number) => void;
  label?: string;
}) {
  const [value, setValue] = useState(50);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm(value);
  };

  if (confirmed) {
    return (
      <div style={{
        padding: "12px 16px",
        borderRadius: "var(--radius-md)",
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.2)",
        fontSize: "13px",
        color: "var(--text-muted)",
      }}>
        ✓ Confidence recorded: <strong style={{ color: "var(--text-primary)" }}>{value}%</strong>
      </div>
    );
  }

  return (
    <div style={{
      padding: "20px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-secondary)",
      border: "1px solid var(--border-primary)",
    }}>
      <label style={{ fontSize: "14px", fontWeight: 600, display: "block", marginBottom: 12, color: "var(--text-primary)" }}>
        🎯 {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: "12px", color: "var(--color-danger)", fontWeight: 600 }}>0%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="confidence-slider"
          style={{ flex: 1 }}
          aria-label="Confidence level percentage"
        />
        <span style={{ fontSize: "12px", color: "var(--color-success)", fontWeight: 600 }}>100%</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{
          fontSize: "28px", fontWeight: 800,
          fontFamily: "'Clash Display', sans-serif",
          color: value < 30 ? "var(--color-danger)" : value < 70 ? "var(--color-warning)" : "var(--color-success)",
        }}>
          {value}%
        </span>
      </div>
      <button
        onClick={handleConfirm}
        className="btn-primary"
        style={{ width: "100%", marginTop: 12, fontSize: "14px" }}
      >
        Lock Confidence
      </button>
    </div>
  );
}

/**
 * Q5: AFS DWELL TIME TRACKER — Hidden event listeners
 * §17.7: Measures exact seconds before user clicks accept.
 * Calculates Acceptance Friction Score from pause time + click count.
 */
export function DwellTimeTracker({
  children,
  onAccept,
  exerciseId,
}: {
  children: React.ReactNode;
  onAccept: (dwellMs: number, clickCount: number) => void;
  exerciseId: string;
}) {
  const startTime = useRef(0);
  const clickCount = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startTime.current = Date.now();
    clickCount.current = 0;
  }, [exerciseId]);

  useEffect(() => {
    const handler = () => { clickCount.current++; };
    const el = containerRef.current;
    if (el) el.addEventListener("click", handler);
    return () => { if (el) el.removeEventListener("click", handler); };
  }, []);

  const handleAccept = () => {
    const dwellMs = Date.now() - startTime.current;
    onAccept(dwellMs, clickCount.current);
  };

  return (
    <div ref={containerRef} data-dwell-exercise={exerciseId}>
      {children}
      <button
        onClick={handleAccept}
        className="btn-primary"
        style={{ marginTop: 16, width: "100%" }}
      >
        Accept & Continue
      </button>
    </div>
  );
}

/**
 * Q6: AOI AUTHORITY CARDS — Uniform 16/9 source logos
 * §17.7: Cards with identical visual weight to measure
 * if user is biased towards authority (logo size = uniform).
 */
export function AuthorityCard({
  sourceName,
  sourceType,
  logoEmoji,
  trustBand,
  selected,
  onSelect,
}: {
  sourceName: string;
  sourceType: string;
  logoEmoji: string;
  trustBand: "A" | "B" | "C";
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      style={{
        aspectRatio: "16/9",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "var(--space-lg)",
        borderRadius: "var(--radius-lg)",
        border: selected
          ? "2px solid var(--accent-cta)"
          : "1px solid var(--border-primary)",
        background: selected ? "rgba(0,102,255,0.06)" : "var(--bg-card)",
        cursor: "pointer",
        transition: "all var(--transition-base)",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "32px" }}>{logoEmoji}</span>
      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{sourceName}</span>
      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{sourceType}</span>
      <span className={`badge trust-band-${trustBand.toLowerCase()}`} style={{ fontSize: "10px" }}>
        Band {trustBand}
      </span>
    </button>
  );
}

/**
 * Q11: THUMBNAIL TRAP TEST — 6 emotional vs 6 neutral
 * §17.7: Measures Emotional Trigger Susceptibility (ETS)
 * Displays 12 images in a grid; tracks which ones the user clicks.
 */
export function ThumbnailTrapTest({
  onComplete,
}: {
  onComplete: (emotionalClicks: number, neutralClicks: number) => void;
}) {
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const thumbnails = [
    { id: 1, type: "emotional" as const, emoji: "😱", label: "BREAKING: Shocking discovery!", color: "#EF4444" },
    { id: 2, type: "neutral" as const, emoji: "📊", label: "Q3 Employment Statistics", color: "var(--text-muted)" },
    { id: 3, type: "emotional" as const, emoji: "😡", label: "OUTRAGE: You won't believe...", color: "#EF4444" },
    { id: 4, type: "neutral" as const, emoji: "📋", label: "WHO Regional Health Report", color: "var(--text-muted)" },
    { id: 5, type: "emotional" as const, emoji: "😢", label: "Heartbreaking truth revealed!", color: "#F59E0B" },
    { id: 6, type: "neutral" as const, emoji: "📄", label: "Policy Review Document 2024", color: "var(--text-muted)" },
    { id: 7, type: "emotional" as const, emoji: "🔥", label: "URGENT: Last chance before...", color: "#EF4444" },
    { id: 8, type: "neutral" as const, emoji: "📈", label: "Annual Literacy Assessment", color: "var(--text-muted)" },
    { id: 9, type: "emotional" as const, emoji: "💀", label: "DANGER: Hidden threat exposed", color: "#EF4444" },
    { id: 10, type: "neutral" as const, emoji: "🗂️", label: "Ministry of Education Memo", color: "var(--text-muted)" },
    { id: 11, type: "emotional" as const, emoji: "🤯", label: "Mind-blowing secret they hide", color: "#F59E0B" },
    { id: 12, type: "neutral" as const, emoji: "📑", label: "Peer-reviewed Meta-analysis", color: "var(--text-muted)" },
  ];

  const toggle = (id: number) => {
    if (submitted) return;
    setClicked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    const emotionalClicks = thumbnails.filter(t => t.type === "emotional" && clicked.has(t.id)).length;
    const neutralClicks = thumbnails.filter(t => t.type === "neutral" && clicked.has(t.id)).length;
    setSubmitted(true);
    onComplete(emotionalClicks, neutralClicks);
  };

  return (
    <div>
      <h4 style={{ fontSize: "16px", marginBottom: 4 }}>📰 Which articles would you click?</h4>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 16 }}>
        Select articles you would normally click on in your social media feed.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {thumbnails.map(t => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            className="card-image-16-9"
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 4, padding: 12, cursor: submitted ? "default" : "pointer",
              borderRadius: "var(--radius-md)",
              border: clicked.has(t.id) ? "2px solid var(--accent-cta)" : "1px solid var(--border-primary)",
              background: clicked.has(t.id) ? "rgba(0,102,255,0.06)" : "var(--bg-card)",
              transition: "all 0.2s ease", aspectRatio: "16/9", overflow: "hidden",
              opacity: submitted && t.type === "emotional" && clicked.has(t.id) ? 0.7 : 1,
            }}
          >
            <span style={{ fontSize: "24px" }}>{t.emoji}</span>
            <span className="line-clamp-2" style={{
              fontSize: "11px", fontWeight: 600, textAlign: "center",
              color: submitted && t.type === "emotional" && clicked.has(t.id) ? t.color : "var(--text-primary)",
            }}>
              {t.label}
            </span>
            {submitted && (
              <span style={{ fontSize: "9px", fontWeight: 700, color: t.type === "emotional" ? "#EF4444" : "#10B981" }}>
                {t.type === "emotional" ? "⚠ EMOTIONAL" : "✓ NEUTRAL"}
              </span>
            )}
          </button>
        ))}
      </div>
      {!submitted && (
        <button onClick={handleSubmit} className="btn-primary" style={{ width: "100%", marginTop: 16 }} disabled={clicked.size === 0}>
          Submit Selections ({clicked.size} selected)
        </button>
      )}
      {submitted && (
        <div style={{
          marginTop: 16, padding: 16, borderRadius: "var(--radius-md)",
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
        }}>
          <strong>ETS Result:</strong> You clicked {thumbnails.filter(t => t.type === "emotional" && clicked.has(t.id)).length}/6 emotional thumbnails
          vs {thumbnails.filter(t => t.type === "neutral" && clicked.has(t.id)).length}/6 neutral ones.
        </div>
      )}
    </div>
  );
}

/**
 * Q14: ARCHIVE AWARENESS TRACKING
 * Records clicks on reverse-search and archive buttons for AFS data.
 */
export function ArchiveAwarenessButton({
  action,
  label,
  icon,
  onTrack,
}: {
  action: "reverse-search" | "archive-check" | "whois-lookup";
  label: string;
  icon: string;
  onTrack: (action: string) => void;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => { setClicked(true); onTrack(action); }}
      className={clicked ? "btn-primary" : "btn-secondary"}
      style={{ fontSize: "13px", padding: "8px 16px", gap: 6 }}
      aria-label={`${label} verification tool`}
    >
      <span>{icon}</span> {label}
      {clicked && <span style={{ fontSize: "10px", opacity: 0.7 }}>✓</span>}
    </button>
  );
}
