'use client';
/* ═══════════════════════════════════════════════════════════════
 * FloatingNav.tsx — Minimal floating navigation (6 dots)
 * Shows current layer, allows click-to-jump
 * ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYERS, LAYER_COLORS } from './data';
import { useScrollContext } from './ScrollContext';

export function FloatingNav() {
  const [currentLayer, setCurrentLayer] = useState(0);
  const { setCurrentLayer: setContextLayer } = useScrollContext();
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  // Track which layer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const layer = Number(entry.target.getAttribute('data-layer'));
            if (!isNaN(layer)) {
              setCurrentLayer(layer);
              setContextLayer(layer);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe hero
    const hero = document.getElementById('hero');
    if (hero) {
      hero.setAttribute('data-layer', '0');
      observer.observe(hero);
    }

    // Observe layer sections
    for (let i = 1; i <= 8; i++) {
      const el = document.getElementById(`layer-${i}`);
      if (el) observer.observe(el);
    }

    // Observe defense
    const defense = document.getElementById('defense');
    if (defense) {
      defense.setAttribute('data-layer', '9');
      observer.observe(defense);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  type LayerColorKey = keyof typeof LAYER_COLORS;
  const getColor = (layer: number) => {
    // 8 is the new layer, it uses the hardcoded '#ffffff' from data.ts
    if (layer === 8) return '#ffffff';
    const key = (layer === 0 ? 'hero' : layer === 9 ? 'defense' : layer) as LayerColorKey;
    return LAYER_COLORS[key]?.accent || '#fff';
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Layer dots */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((layer) => {
        const isActive = currentLayer === layer;
        const isHovered = hoveredLayer === layer;
        const color = getColor(layer);
        const id = layer === 0 ? 'hero' : layer === 9 ? 'defense' : `layer-${layer}`;
        const label =
          layer === 0
            ? 'هندسة الخداع'
            : layer === 9
            ? 'الدرع'
            : LAYERS[layer - 1]?.nameAr || '';

        return (
          <div
            key={layer}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredLayer(layer)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-8 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-cairo backdrop-blur-xl border border-white/[0.06]"
                  style={{
                    background: `${color}15`,
                    color: color,
                  }}
                  dir="rtl"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              onClick={() => scrollTo(id)}
              className="relative w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: isActive ? color : 'rgba(255,255,255,0.15)',
                boxShadow: isActive ? `0 0 12px ${color}60` : 'none',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Navigate to ${label}`}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-[-4px] rounded-full border"
                  style={{ borderColor: `${color}40` }}
                  layoutId="nav-ring"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        );
      })}

      {/* Current layer label */}
      <div className="mt-4 text-[9px] text-white/20 font-mono tracking-wider text-center">
        {currentLayer === 0
          ? 'HERO'
          : currentLayer === 9
          ? 'SHIELD'
          : `L${currentLayer}`}
      </div>
    </div>
  );
}
