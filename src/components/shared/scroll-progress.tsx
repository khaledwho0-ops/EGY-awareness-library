"use client";

import { useEffect, useState } from "react";

/**
 * Scroll Progress Indicator — DESIGN.txt §2.6
 * 
 * A thin bar at the top of the page that fills from left to right.
 * Uses transform:scaleX() for GPU-accelerated smoothness.
 * Gradient: purple-to-pink (#667eea → #f64f59)
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0) {
        setProgress(scrolled / total);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
