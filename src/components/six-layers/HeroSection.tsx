'use client';
/* ═══════════════════════════════════════════════════════════════
 * HeroSection.tsx — Immersive hero with transparent bg
 * Particles show through behind the text
 * ═══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[110vh] flex items-center justify-center">
      {/* NO opaque background — particles show through */}

      <div className="text-center relative z-10 px-6 max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-[10px] tracking-[0.5em] text-white/15 font-mono uppercase">
            موثوق دوت كوم — Egyptian Awareness Library
          </span>
        </motion.div>

        {/* Arabic Title */}
        <motion.h1
          className="font-amiri text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] text-white/90 mb-6"
          dir="rtl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ textShadow: '0 0 80px rgba(255,255,255,0.1)' }}
        >
          هندسة الخداع
        </motion.h1>

        {/* Subtitle Arabic */}
        <motion.p
          className="font-cairo text-[clamp(1.1rem,3vw,1.6rem)] text-white/40 mb-3"
          dir="rtl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          ٦ طبقات من التضليل المعلوماتي
        </motion.p>

        {/* English Subtitle */}
        <motion.p
          className="text-[clamp(0.7rem,1.3vw,0.95rem)] tracking-[0.4em] uppercase text-white/20 font-light mb-16"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          The Architecture of Deception — 6 Layers
        </motion.p>

        {/* Divider line */}
        <motion.div
          className="w-16 h-[1px] bg-white/10 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.15em] text-white/15 font-mono uppercase mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span>70+ case studies</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/15" />
          <span>6 layers of deception</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/15" />
          <span>1000+ years of history</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/15" />
          <span>Egyptian focus 🇪🇬</span>
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.25em] text-white/20 font-mono uppercase">
            Scroll to descend into the depths
          </span>
          <span className="text-xs text-white/10 font-cairo" dir="rtl">
            مرر للأسفل لتنزل إلى الأعماق
          </span>
          <motion.div
            className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center p-1.5 mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <div className="w-1 h-2.5 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Very subtle gradient at bottom for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
