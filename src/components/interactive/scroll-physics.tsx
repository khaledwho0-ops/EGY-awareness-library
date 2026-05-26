"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Q42: PARALLAX HERO — Background moves at 0.3x scroll speed
 * Creates visual depth connecting awareness layers.
 */
export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div ref={bgRef} className="parallax-bg" aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/**
 * Q53: SCROLL PROGRESS BAR — Top bar scaleX linked to 14-day progress
 * Calculated by scrolled / (totalHeight - viewportHeight)
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(scrolled / total, 1) : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="progress-14day" role="progressbar" aria-valuenow={Math.round(progress * 100)}>
      <div className="progress-14day-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/**
 * Q46: SCROLL-TRIGGERED STAGGER — IntersectionObserver 0.1s delays
 * For Myth Autopsy: gradually dismantles myth parts while scrolling.
 */
export function StaggerReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`stagger-reveal ${className}`}>
      {children}
    </div>
  );
}

/**
 * Q52: STICKY VERIFICATION CHECKLIST — position:sticky; top:80px
 * Stays alongside user reading a misleading claim.
 */
export function StickyChecklist({
  items,
  checkedItems,
  onToggle,
}: {
  items: { id: string; label: string }[];
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="sticky-checklist" style={{
      padding: "var(--space-lg)",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-card)",
      border: "1px solid var(--border-primary)",
    }}>
      <h4 style={{ fontSize: "14px", marginBottom: 12 }}>✅ Verification Checklist</h4>
      {items.map(item => (
        <label
          key={item.id}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 0", fontSize: "13px", cursor: "pointer",
            color: checkedItems.has(item.id) ? "var(--color-success)" : "var(--text-primary)",
            textDecoration: checkedItems.has(item.id) ? "line-through" : "none",
          }}
        >
          <input
            type="checkbox"
            checked={checkedItems.has(item.id)}
            onChange={() => onToggle(item.id)}
            style={{ accentColor: "var(--accent-cta)" }}
          />
          {item.label}
        </label>
      ))}
      <div style={{ marginTop: 12, fontSize: "11px", color: "var(--text-muted)" }}>
        {checkedItems.size}/{items.length} verified
      </div>
    </div>
  );
}

/**
 * Q51: HORIZONTAL SCROLL CARDS — Pinned axis, scroll-snap
 * For Negative Coping Awareness cards — saves vertical space.
 */
export function HorizontalScrollCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="horizontal-scroll">
      {children}
    </div>
  );
}

/**
 * Q40: DOT NAVIGATION — Centered dots, active enlarges 1.5x
 * For SIFT Method step sequence during full-screen training.
 */
export function DotNavigation({
  total,
  active,
  onNavigate,
}: {
  total: number;
  active: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <nav className="dot-nav" aria-label="Step navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`dot-nav-item ${i === active ? "active" : ""}`}
          onClick={() => onNavigate(i)}
          aria-label={`Step ${i + 1} of ${total}`}
          aria-current={i === active ? "step" : undefined}
        />
      ))}
    </nav>
  );
}
