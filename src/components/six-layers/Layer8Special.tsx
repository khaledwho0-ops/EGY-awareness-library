import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { useScrollContext } from './ScrollContext';
import { LayerData } from './data';
import { LAYER_8_100_CASES } from './layer8Cases';

export function Layer8Special({ layer }: { layer: LayerData }) {
  const { stateRef, isAnimationsDisabled } = useScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isAnimationsDisabled) {
      setPhase(0);
      return;
    }
    
    if (!isInView) return;
    
    // Massive delay to allow reading all 108 cases
    // Estimated reading time for 108 cases is around 20-30 minutes.
    // Phase 1 (Glitch/Upside down starts): 20 minutes (1,200,000 ms)
    // Phase 2 (Deeper glitch): 25 minutes (1,500,000 ms)
    // Phase 3 (Final RED sentence): 30 minutes (1,800,000 ms)
    const t1 = setTimeout(() => setPhase(1), 1200000);
    const t2 = setTimeout(() => setPhase(2), 1500000);
    const t3 = setTimeout(() => setPhase(3), 1800000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView, isAnimationsDisabled]);
  
  useAnimationFrame(() => {
    if (isAnimationsDisabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const screenX = ((stateRef.current.mouseX + 1) / 2) * window.innerWidth;
    const screenY = (-(stateRef.current.mouseY - 1) / 2) * window.innerHeight;
    const pxX = screenX - rect.left;
    const pxY = screenY - rect.top;

    mouseX.set(mouseX.get() + (pxX - mouseX.get()) * 0.15);
    mouseY.set(mouseY.get() + (pxY - mouseY.get()) * 0.15);
  });

  const torchMask = useMotionTemplate`radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, black 10%, transparent 60%)`;

  // ALL CASES (8 Previous + 100 New) are ALWAYS visible from the start
  const allCasesCombined = [...layer.caseStudies, ...LAYER_8_100_CASES];
  const activeCases = allCasesCombined;

  if (!isAnimationsDisabled && phase === 3) {
    return (
      <div className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden" style={{ zIndex: 50, backgroundColor: 'black' }}>
        <h1 className="text-red-600 font-bold text-center animate-final-sentence" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Clash Display', sans-serif" }}>
          YOU CANT DO ANYTHING BUT BE TERRIFIED.<br />
          NO TORCH.<br />
          IT IS LIGHT BY ITSELF.
        </h1>
      </div>
    );
  }

  return (
    <div id="layer-8" data-layer="8" className="relative min-h-screen py-32" style={{ zIndex: 50, backgroundColor: 'black' }}>
      
      <motion.div 
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pb-64"
        style={isAnimationsDisabled ? {} : { WebkitMaskImage: torchMask, maskImage: torchMask }}
      >
        
        {/* Header */}
        <div className={`text-center mb-32 ${!isAnimationsDisabled && phase >= 1 ? 'animate-cursed-glitch' : ''}`}>
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-amiri text-red-900 font-bold leading-none mb-4 drop-shadow-2xl" dir="rtl">
            {layer.nameAr}
          </h2>
          <h3 className="text-2xl tracking-[1em] uppercase text-white/50 font-bold" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            {layer.name}
          </h3>
          <p className="mt-12 text-white/60 max-w-2xl mx-auto text-xl leading-relaxed font-cairo" dir="rtl">
            {layer.definitionAr}
          </p>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-sm leading-relaxed uppercase tracking-widest font-mono">
            {layer.definition}
          </p>
        </div>

        {/* Creepy Case Studies */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${!isAnimationsDisabled && phase >= 1 ? 'animate-cursed-glitch' : ''}`}>
          {activeCases.map((caseStudy, idx) => (
            <div key={`${caseStudy.id}-${idx}`} className="p-10 border border-white/5 bg-black/40 rounded-3xl backdrop-blur-sm transition-all duration-1000">
              <div className="text-red-500 font-mono text-xs tracking-[0.2em] mb-6">CLASSIFIED // {caseStudy.year}</div>
              <h4 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Clash Display', sans-serif" }}>{caseStudy.title}</h4>
              <h5 className="text-2xl font-cairo text-white/90 mb-8" dir="rtl">{caseStudy.titleAr}</h5>
              
              <div className="space-y-6">
                <p className="text-white/70 text-base leading-relaxed">{caseStudy.illustrationEn}</p>
                <div className="w-full h-px bg-red-900/30" />
                <p className="text-white/70 text-base font-cairo leading-relaxed" dir="rtl">{caseStudy.illustrationAr}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
