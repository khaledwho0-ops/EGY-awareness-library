"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * SCROLL PROGRESS BAR — Q53
 * Calculated by scrolled / (totalHeight - viewportHeight)
 * Animates top bar scaleX() linked to 14-day exercise progress
 * 
 * Framework: §18 — visual progress tracking
 */

interface ScrollProgressBarProps {
  /** Optional: override with manual progress (0-1) instead of scroll-based */
  manualProgress?: number;
  /** Which gradient variant to use */
  variant?: "default" | "14day" | "mvp";
  /** MVP accent color if variant is "mvp" */
  mvpColor?: string;
}

export function ScrollProgressBar({ manualProgress, variant = "default", mvpColor }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (manualProgress !== undefined) return;
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    setScrollProgress(Math.min(1, scrolled / total));
  }, [manualProgress]);

  useEffect(() => {
    if (manualProgress !== undefined) {
      return;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    const frame = window.requestAnimationFrame(() => {
      handleScroll();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, manualProgress]);

  const progress = manualProgress ?? scrollProgress;

  const gradients: Record<string, string> = {
    default: "linear-gradient(90deg, #667eea 0%, #f64f59 100%)",
    "14day": "linear-gradient(90deg, var(--accent-deepreal), var(--accent-mentalhealth), var(--accent-religionhub))",
    mvp: `linear-gradient(90deg, ${mvpColor || "var(--accent-cta)"}, color-mix(in srgb, ${mvpColor || "var(--accent-cta)"} 60%, white))`,
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: variant === "14day" ? 4 : 3,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        style={{
          height: "100%",
          background: gradients[variant],
          transformOrigin: "left",
          transform: `scaleX(${progress})`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
