"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * PARALLAX HERO — Q42
 * Background layer moves at 0.3 * scrollY (30% speed)
 * Creates depth illusion for landing page
 * 
 * Framework: §14.2 — Visual Depth
 */

interface ParallaxHeroProps {
  children: React.ReactNode;
  /** Speed factor: 0.3 = 30% of scroll speed */
  speed?: number;
  /** Minimum height */
  minHeight?: string;
  /** Background gradient */
  bgGradient?: string;
}

export function ParallaxHero({
  children,
  speed = 0.3,
  minHeight = "80vh",
  bgGradient = "radial-gradient(ellipse at 30% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
}: ParallaxHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (bgRef.current) {
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * speed}px)`;
    }
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ position: "relative", minHeight, overflow: "hidden" }}>
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="parallax-bg"
        style={{
          background: bgGradient,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* Content Layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
