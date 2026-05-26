'use client';
/* ═══════════════════════════════════════════════════════════════
 * /six-layers page.tsx — The 6-Layer Experience Entry Point
 * 
 * Client component that assembles the full scrollytelling
 * experience: 3D scene + DOM scroll sections.
 * ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback } from 'react';
import { ScrollProvider, useScrollContext } from '@/components/six-layers/ScrollContext';
import { Scene } from '@/components/six-layers/Scene';
import { HeroSection } from '@/components/six-layers/HeroSection';
import { LayerSection } from '@/components/six-layers/LayerSection';
import { DefenseSection } from '@/components/six-layers/DefenseSection';
import { FloatingNav } from '@/components/six-layers/FloatingNav';
import { LAYERS } from '@/components/six-layers/data';

function SixLayersInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setProgress, setMouse, isAnimationsDisabled, setAnimationsDisabled } = useScrollContext();

  // Mouse tracking (normalized -1 to 1)
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [setMouse]);

  // Simple scroll progress (will be enhanced with GSAP in next chunk)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* 3D Particle Scene — fixed behind everything */}
      <Scene />

      {/* Floating Navigation — 6 dots */}
      <FloatingNav />

      {/* DOM Scroll Content — overlays the 3D scene */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* 6 Layer Sections */}
        {LAYERS.map((layer) => (
          <LayerSection key={layer.number} layer={layer} />
        ))}

        {/* Defense Section */}
        <DefenseSection />
      </div>

      {/* TURN OFF Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setAnimationsDisabled(!isAnimationsDisabled)}
          className={`px-4 py-2 font-mono text-sm tracking-widest uppercase border transition-all ${
            isAnimationsDisabled 
              ? 'bg-red-900/40 text-red-400 border-red-500/50 hover:bg-red-900/60' 
              : 'bg-black/40 text-white/50 border-white/20 hover:bg-white/10 hover:text-white'
          }`}
        >
          {isAnimationsDisabled ? '[ TURN ON ]' : '[ TURN OFF ]'}
        </button>
      </div>
    </div>
  );
}

export default function SixLayersPage() {
  return (
    <ScrollProvider>
      <SixLayersInner />
    </ScrollProvider>
  );
}
