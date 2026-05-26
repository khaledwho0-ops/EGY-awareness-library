'use client';
/* ═══════════════════════════════════════════════════════════════
 * DefenseSection.tsx — "الدرع" — The Shield
 * Closing section with defense protocol table and CTA
 * ═══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';
import { DEFENSE_PROTOCOLS, LAYER_COLORS } from './data';

export function DefenseSection() {
  return (
    <section
      id="defense"
      data-layer={7}
      className="relative min-h-screen flex items-center py-24"
      style={{
        background: `radial-gradient(ellipse at 50% 80%, hsl(230, 30%, 8%), #000)`,
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-[clamp(3rem,8vw,6rem)] font-amiri leading-none mb-4"
            dir="rtl"
            style={{
              color: LAYER_COLORS.defense.accent,
              textShadow: `0 0 60px ${LAYER_COLORS.defense.accent}30`,
            }}
          >
            الدرع
          </h2>
          <p
            className="text-lg text-white/40 font-cairo"
            dir="rtl"
          >
            الآن ترى الهندسة. الآن يمكنك الدفاع.
          </p>
          <p className="text-sm text-white/20 mt-2 tracking-wide">
            Now you see the architecture. Now you can defend.
          </p>
        </motion.div>

        {/* Defense Protocol Table */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="rounded-2xl border border-white/[0.06] backdrop-blur-xl overflow-hidden relative"
          style={{ background: LAYER_COLORS.defense.glassTint }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "url('/noise.svg')" }}
          />

          <div className="relative z-10">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_1fr] lg:grid-cols-[80px_1fr_1fr] gap-4 p-4 border-b border-white/[0.06]">
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                Layer
              </span>
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                Attack
              </span>
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                Defense
              </span>
            </div>

            {/* Table Rows */}
            {DEFENSE_PROTOCOLS.map((row, i) => {
              type NumericLayer = 1 | 2 | 3 | 4 | 5 | 6;
              const color = LAYER_COLORS[row.layer as NumericLayer]?.accent || '#fff';
              return (
                <motion.div
                  key={row.layer}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="grid grid-cols-[60px_1fr_1fr] lg:grid-cols-[80px_1fr_1fr] gap-4 p-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <span
                    className="text-2xl font-amiri"
                    style={{ color }}
                  >
                    {row.layerAr}
                  </span>
                  <div>
                    <p className="text-sm text-white/50">{row.attack}</p>
                    <p className="text-xs text-white/20 font-cairo mt-0.5" dir="rtl">
                      {row.attackAr}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">{row.defense}</p>
                    <p className="text-xs text-white/30 font-cairo mt-0.5" dir="rtl">
                      {row.defenseAr}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Active Training Modules (Simulators) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-red-500 mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              Active Training Modules
            </h3>
            <p className="text-white/40 font-mono text-sm">
              Do not just read about the architecture. Test your resilience against it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Deception Simulator */}
            <a 
              href="/live-deception"
              className="group relative block p-8 rounded-2xl border border-red-500/30 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-red-500 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📱</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded text-[10px] font-mono uppercase tracking-wider animate-pulse">
                    Layer 6 Target
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  Live Deception Simulator
                </h4>
                <p className="text-sm text-white/50 font-mono leading-relaxed mb-6">
                  Enter a simulated social media feed. Activate the X-Ray Scanner to expose the psychological hooks, outrage vectors, and the Rabbit-Hole Engine in real-time.
                </p>
                <div className="text-xs text-red-400 font-mono tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Initiate Sequence <span>→</span>
                </div>
              </div>
            </a>

            {/* 3D Misinfo Atlas */}
            <a 
              href="/misinfo-atlas"
              className="group relative block p-8 rounded-2xl border border-blue-500/30 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-blue-500 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🌍</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded text-[10px] font-mono uppercase tracking-wider">
                    Global Overview
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  3D Infection Atlas
                </h4>
                <p className="text-sm text-white/50 font-mono leading-relaxed mb-6">
                  Visualize the physical architecture of deception. Track real OSINT cases across a 3D WebGL globe. Watch how misinformation spreads from hub to target.
                </p>
                <div className="text-xs text-blue-400 font-mono tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Launch WebGL <span>→</span>
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Footer micro-copy */}
        <div className="mt-20 text-center">
          <p className="text-[10px] text-white/10 font-mono tracking-[0.2em] uppercase">
            Systems Nominal • Cairo, EG — 30.0444°N
          </p>
          <p className="text-[10px] text-white/[0.06] font-cairo mt-1" dir="rtl">
            الأنظمة نشطة • القاهرة، مصر
          </p>
        </div>
      </div>
    </section>
  );
}
