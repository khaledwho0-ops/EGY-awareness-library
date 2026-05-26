"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * DOT NAVIGATION — Q40
 * Fixed right-side dots with active enlargement (8px → 12px)
 * For SIFT Method step sequence
 * 
 * CSS: position: fixed, right: 24px, transform: translateY(-50%)
 * Framework: §18 Mode 2 (Source Compare) + SIFT Method
 */

interface DotNavSection {
  id: string;
  label: string;
}

interface DotNavigationProps {
  sections: DotNavSection[];
}

export function DotNavigation({ sections }: DotNavigationProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveIdx(i);
          break;
        }
      }
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const frame = window.requestAnimationFrame(() => {
      handleScroll();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`dot-nav-item ${i === activeIdx ? "active" : ""}`}
          title={s.label}
          aria-label={`Go to ${s.label}`}
          aria-current={i === activeIdx ? "step" : undefined}
        />
      ))}
    </nav>
  );
}
