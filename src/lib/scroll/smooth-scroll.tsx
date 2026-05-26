"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * SMOOTH SCROLL (LENIS-STYLE) — Q45
 * Linear interpolation (lerp) scroll physics
 * For archive replay: accurate, smooth scrolling without jumps
 * 
 * Instead of importing Lenis library, implements the core lerp physics
 * Framework: §18 Mode 6 (Archive Replay)
 */

interface UseSmoothScrollOptions {
  /** Interpolation factor: 0.05 = very smooth, 0.15 = responsive */
  lerp?: number;
  /** Enable/disable */
  enabled?: boolean;
}

export function useSmoothScroll({ lerp = 0.08, enabled = true }: UseSmoothScrollOptions = {}) {
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const animationId = useRef<number | null>(null);
  const animateRef = useRef<() => void>(() => {});

  const animate = useCallback(() => {
    if (!enabled) return;

    currentScroll.current += (targetScroll.current - currentScroll.current) * lerp;

    // Snap if close enough (prevents infinite micro-animations)
    if (Math.abs(targetScroll.current - currentScroll.current) < 0.5) {
      currentScroll.current = targetScroll.current;
    }

    window.scrollTo(0, currentScroll.current);
    animationId.current = requestAnimationFrame(animateRef.current);
  }, [lerp, enabled]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    if (!enabled) return;

    currentScroll.current = window.scrollY;
    targetScroll.current = window.scrollY;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll.current = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          targetScroll.current + e.deltaY
        )
      );
    };

    // Override native scroll behavior with passive: false
    window.addEventListener("wheel", onWheel, { passive: false });
    animationId.current = requestAnimationFrame(animateRef.current);

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [enabled, animate]);
}

/**
 * Wrapper component that enables smooth scrolling for its page
 */
export function SmoothScrollProvider({ children, lerp = 0.08 }: { children: React.ReactNode; lerp?: number }) {
  useSmoothScroll({ lerp, enabled: true });
  return <>{children}</>;
}
