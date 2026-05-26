'use client';
/* ═══════════════════════════════════════════════════════════════
 * Scene.tsx — R3F Canvas wrapper with proper z-stacking
 * Canvas at z-0, content overlays at z-10+
 * ═══════════════════════════════════════════════════════════════ */

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black" style={{ zIndex: 0 }}>
      <div className="text-center">
        <div className="text-xs tracking-[0.3em] text-white/40 font-mono uppercase animate-pulse">
          Initializing Neural Core...
        </div>
        <div className="text-xs tracking-[0.3em] text-white/20 font-mono mt-2" dir="rtl">
          جاري تهيئة النواة العصبية...
        </div>
      </div>
    </div>
  ),
});

export function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0"
        style={{ zIndex: 0, background: 'radial-gradient(ellipse at center, hsl(240,10%,8%), #000)' }}
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <SceneCanvas />
    </div>
  );
}
