'use client';
/* ═══════════════════════════════════════════════════════════════
 * LayerSection.tsx — Full layer section with rich content
 * No cropping, transparent bg, glassmorphism cards, full data
 * ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { LayerData } from './data';
import { useScrollContext } from './ScrollContext';

/* ── Animated Counter ────────────────────────────────────────── */
function AnimatedCounter({
  target, suffix, label, labelEn, accentColor,
}: { target: number; suffix: string; label: string; labelEn: string; accentColor: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    // Use IntersectionObserver directly for reliable detection
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          obs.disconnect();
          const duration = 2500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  const display = Number.isInteger(target) ? Math.round(value).toLocaleString() : value.toFixed(1);

  return (
    <div ref={ref} className="text-center p-5 rounded-2xl border border-white/[0.1] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] hover:shadow-lg relative overflow-hidden" style={{ background: `${accentColor}10` }}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: 0.5 }} />
      <div className="text-[clamp(1.8rem,4vw,3rem)] font-bold tabular-nums leading-none drop-shadow-md" style={{ color: accentColor, fontFamily: "'Clash Display', sans-serif", textShadow: `0 0 20px ${accentColor}80` }}>
        {display}<span className="text-[0.5em] opacity-80 ml-1">{suffix}</span>
      </div>
      <div className="text-[11px] text-white/50 font-mono uppercase tracking-widest mt-3">{labelEn}</div>
      <div className="text-sm text-white/40 font-cairo mt-1 font-bold tracking-wide" dir="rtl">{label}</div>
    </div>
  );
}

/* ── Case Study Card + Popup Modal ────────────────────────────── */
function CaseCard({
  title, titleAr, year, domain, domainAr, damage, damageAr, layerAnalysis, egyptianSpecific, glassTint, accentColor, illustrationEn, illustrationAr,
}: {
  title: string; titleAr: string; year: string; domain: string; domainAr: string;
  damage: string; damageAr: string; layerAnalysis?: string; egyptianSpecific?: boolean; glassTint: string; accentColor: string;
  illustrationEn?: string; illustrationAr?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsOpen(true)}
        className="group relative rounded-2xl border border-white/[0.1] backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.3] hover:scale-[1.03] overflow-hidden cursor-pointer"
        style={{ background: glassTint, boxShadow: `0 8px 32px 0 rgba(0,0,0,0.3)` }}
      >
        {/* Dynamic Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}30, transparent 70%)` }} />
        
        {/* Top accent bar */}
        <div className="h-[3px] w-full relative z-10" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, boxShadow: `0 0 15px ${accentColor}` }} />

        <div className="p-5">
          {/* Egyptian badge */}
          {egyptianSpecific && (
            <div className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
              <span>🇪🇬</span>
              <span className="text-white/30 text-[10px]">مصري</span>
            </div>
          )}

          {/* Year + Domain */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-mono uppercase tracking-wider border" style={{ borderColor: `${accentColor}30`, color: accentColor, background: `${accentColor}10` }}>
              {year}
            </span>
            <span className="text-[10px] text-white/25 font-mono uppercase tracking-wider">{domain}</span>
            <span className="text-[10px] text-white/15 font-cairo">{domainAr}</span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-bold text-white relative z-10 mb-2 leading-snug tracking-wide" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            {title}
          </h4>
          <p className="text-base text-white/50 font-cairo mb-5 relative z-10 font-medium" dir="rtl">{titleAr}</p>

          {/* Damage */}
          <div className="border-t border-white/[0.06] pt-3 mt-auto">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px]" style={{ color: accentColor }}>⚠</span>
              <span className="text-[10px] text-white/20 font-mono uppercase tracking-wider">Impact</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{damage}</p>
            <p className="text-xs text-white/25 font-cairo mt-1.5" dir="rtl">{damageAr}</p>
          </div>

          {/* Click hint */}
          <div className="mt-3 text-[10px] text-white/15 text-center group-hover:text-white/30 transition-colors">
            ↗ Click for details · اضغط للتفاصيل
          </div>
        </div>
      </motion.div>

      {/* ── POPUP MODAL ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.1]"
            style={{ background: '#0d0d0d' }}
          >
            {/* Accent top bar */}
            <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all z-10"
            >
              ✕
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider border" style={{ borderColor: `${accentColor}40`, color: accentColor, background: `${accentColor}15` }}>
                  {year}
                </span>
                <span className="text-xs text-white/30 font-mono uppercase tracking-wider">{domain}</span>
                {egyptianSpecific && <span className="text-sm">🇪🇬</span>}
              </div>

              <h3 className="text-2xl font-bold text-white/95 mb-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {title}
              </h3>
              <p className="text-lg text-white/40 font-cairo mb-6" dir="rtl">{titleAr}</p>

              {/* Impact Section */}
              <div className="rounded-xl border border-white/[0.08] p-5 mb-6" style={{ background: `${accentColor}08` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm" style={{ color: accentColor }}>⚠</span>
                  <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Impact / التأثير</span>
                </div>
                <p className="text-base text-white/70 leading-relaxed mb-2">{damage}</p>
                <p className="text-sm text-white/35 font-cairo leading-relaxed" dir="rtl">{damageAr}</p>
              </div>

              {/* Zero-Background Illustration Section */}
              {(illustrationEn || illustrationAr) && (
                <div className="rounded-xl border border-white/[0.08] p-6 mb-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accentColor }} />
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg" style={{ color: accentColor }}>💡</span>
                    <span className="text-xs text-white/40 font-mono uppercase tracking-wider">How it works / كيف حدث الخداع؟</span>
                  </div>
                  {illustrationEn && <p className="text-base text-white/80 leading-relaxed mb-4">{illustrationEn}</p>}
                  {illustrationAr && <p className="text-base text-white/60 font-cairo leading-relaxed" dir="rtl">{illustrationAr}</p>}
                </div>
              )}

              {/* Layer Analysis */}
              {layerAnalysis && (
                <div className="rounded-xl border border-white/[0.08] p-5 mb-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm" style={{ color: accentColor }}>🔍</span>
                    <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Layer Analysis / تحليل الطبقة</span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{layerAnalysis}</p>
                </div>
              )}

              {/* Egyptian Context Badge */}
              {egyptianSpecific && (
                <div className="rounded-xl border border-white/[0.08] p-5" style={{ background: 'rgba(255,200,50,0.03)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🇪🇬</span>
                    <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Egyptian Context / السياق المصري</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    This case study has direct impact on Egypt and the Egyptian people. It represents a real pattern of misinformation that affects millions of Egyptians daily.
                  </p>
                  <p className="text-sm text-white/30 font-cairo mt-2 leading-relaxed" dir="rtl">
                    دراسة الحالة هذه لها تأثير مباشر على مصر والشعب المصري. تمثل نمطاً حقيقياً من التضليل يؤثر على ملايين المصريين يومياً.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/* ── Egyptian Connection Details ──────────────────────────────── */
const EGYPTIAN_DETAILS: Record<number, { title: string; titleAr: string; body: string; bodyAr: string; stats: string[] }> = {
  1: {
    title: 'How Layer 1 Kills in Egypt',
    titleAr: 'كيف تقتل الطبقة الأولى في مصر',
    body: 'In Egypt, Layer 1 fabrication kills children through counterfeit antibiotics (2022 — children died from fake ceftriaxone). It steals life savings through crypto scams like HoggPool ($620K stolen). It fills the medical vacuum left by 1.44 psychiatrists per 100,000 people with TikTok charlatans who claim doctorates they never earned. The Egyptian Medical Syndicate warns against social media health misinformation, but when real doctors are threatened for speaking publicly about working conditions (Privacy International), the public square is left to Street Doctors.',
    bodyAr: 'في مصر، الكذب المطلق يقتل الأطفال عبر المضادات الحيوية المغشوشة (٢٠٢٢). يسرق المدخرات عبر نصب العملات الرقمية مثل هوج بول. يملأ الفراغ الطبي بدكاترة التيكتوك الذين يدّعون شهادات لم يحصلوا عليها — بينما الأطباء الحقيقيون مُهدَّدون.',
    stats: ['53.9% of Egyptians self-medicate with antibiotics', '82 million Egyptian internet users exposed', '14.5% misinformation rate (2025)', '29 arrested in HoggPool crypto scam'],
  },
  2: {
    title: 'Egypt: Where Both Sides Always Lie by Omission',
    titleAr: 'مصر: حيث الطرفان يكذبان بالحذف دائماً',
    body: 'Egyptian media operates in permanent Layer 2 mode. The Battle of the Camel (2011) was "concerned citizens" on state TV and "regime thugs" on Al Jazeera — same event, two fabricated realities. The June 30, 2013 crowd numbers became political weapons: Tamarod claimed 22 million signatures, while the actual turnout was disputed between 14-30 million. The Ras El-Hekma deal ($35B) was simultaneously "national salvation" and "selling Egypt by the pound" — TIMEP analysis shows both narratives omit critical context.',
    bodyAr: 'الإعلام المصري يعمل في وضع الطبقة الثانية الدائم. موقعة الجمل كانت "مواطنين مهتمين" على التلفزيون الحكومي و"بلطجية النظام" على الجزيرة. أرقام ٣٠ يونيو أصبحت أسلحة سياسية. صفقة رأس الحكمة إما "إنقاذ وطني" أو "بيع مصر بالجنيه".',
    stats: ['Battle of the Camel: 11 dead, 600+ injured', 'June 30: 22M claimed vs disputed actual count', 'Ras El-Hekma: $35B deal, only $10B fresh money', 'EGP: 3 devaluations in 8 years'],
  },
  3: {
    title: 'Stripped Context Destroys Egyptian Minds',
    titleAr: 'اقتطاع السياق يدمر العقول المصرية',
    body: 'In Egypt, Quran 2:191 is stripped from its context by both Islamophobes AND extremists — the surrounding verses (2:190, 2:192, 2:193) reveal rules of defensive engagement, not carte-blanche violence. Meanwhile, 78.4% of Egyptian OCD patients attribute their symptoms to jinn possession rather than medical illness. Schizophrenia, epilepsy, and bipolar disorder are routinely decontextualized from medicine into supernatural explanations — while Al-Azhar officially endorses psychiatric treatment.',
    bodyAr: 'في مصر، آية البقرة ١٩١ تُقتطع من سياقها بواسطة المعادين للإسلام والمتطرفين معاً. ٧٨.٤٪ من مرضى الوسواس القهري في مصر ينسبون أعراضهم للجن. الفصام والصرع يُخرجان من السياق الطبي إلى التفسيرات الخارقة.',
    stats: ['78.4% OCD patients: possession attribution', '1.44 psychiatrists per 100K population', 'Al-Azhar affirms psychiatry but can\'t compete with TikTok', '67% first present to non-medical care'],
  },
  4: {
    title: 'Weaponized Timing in Egypt',
    titleAr: 'التوقيت المسلّح في مصر',
    body: 'The January 28, 2011 internet blackout — the first nationwide shutdown in modern history — was an attempt to suppress information at peak crisis. It backfired spectacularly, costing $90M and driving more people to the streets. The March 2024 EGP float was preceded by WEEKS of manufactured panic, with black market rates hitting 60 EGP/USD before the official 50 EGP/USD rate. Someone benefited from the chaos window.',
    bodyAr: 'قطع الإنترنت في ٢٨ يناير ٢٠١١ — أول انقطاع وطني في التاريخ الحديث — كان محاولة لقمع المعلومات في ذروة الأزمة. انقلب الأمر، بتكلفة ٩٠ مليون دولار. تعويم مارس ٢٠٢٤ سبقته أسابيع من الذعر المُصنَّع.',
    stats: ['5-day internet blackout (Jan 2011)', '$90M economic loss from blackout', '38% overnight EGP devaluation', 'Black market rate 60 vs official 50 EGP/USD'],
  },
  5: {
    title: 'Evil Application of Knowledge in Egypt',
    titleAr: 'التطبيق الشرير للمعرفة في مصر',
    body: 'With only 1.44 psychiatrists per 100,000 people, Egypt\'s mental health vacuum is filled by exploitative Ruqyah practitioners who charge for physical "exorcism" — beating, burning, and confining patients. In 2015, two exorcists beat an Egyptian woman to death. Pharmacists knowingly dispense antibiotics without prescriptions because the system rewards volume over safety. The GLP-1 (Ozempic) black market thrives via TikTok influencer recommendations.',
    bodyAr: 'مع ١.٤٤ طبيب نفسي فقط لكل ١٠٠ ألف مصري، يملأ الفراغ ممارسو الرقية الاستغلالية. في ٢٠١٥، ضرب اثنان من "المعالجين" امرأة مصرية حتى الموت. الصيادلة يصرفون المضادات الحيوية بدون وصفة لأن النظام يكافئ الحجم.',
    stats: ['1.44 psychiatrists per 100K (Egypt)', 'Woman beaten to death in exorcism (2015)', '91.7% students got antibiotics without prescription', 'GLP-1 black market via TikTok'],
  },
  6: {
    title: 'The Egyptian Matrix — All Layers Converge',
    titleAr: 'المصفوفة المصرية — كل الطبقات تتقاطع',
    body: 'The WhatsApp family group is Egypt\'s Layer 6 delivery system. A fabricated voice note from "a doctor at Qasr Al-Ainy" reaches millions through the most trusted vector: family. COVID herbal protocols mixed Layer 2 (real herbs) with Layer 1 (fabricated claims) delivered via Layer 4 (peak-panic timing) through Layer 6 (family trust). The techno-utopian myth that social media enables democracy was falsified in Egypt — the same Facebook that organized the Khaled Said page later became a vehicle for industrial-scale state disinformation.',
    bodyAr: 'مجموعة واتساب العائلة هي نظام توصيل الطبقة السادسة في مصر. رسالة صوتية مزيفة من "دكتور في قصر العيني" تصل لملايين عبر أكثر ناقل موثوق: العائلة. أسطورة أن السوشيال ميديا تدعم الديمقراطية تم تفنيدها في مصر.',
    stats: ['82M Egyptian internet users', '70%+ on WhatsApp', 'COVID vaccine: 20.2% refusal in Egypt', 'Facebook: liberation tool → disinfo weapon'],
  },
};

/* ── Layer 7 Special Section ─────────────────────────────────── */
function Layer7Special({ layer }: { layer: LayerData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scaleIn = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);

  return (
    <section ref={ref} className="relative py-32 min-h-screen border-y-[12px] border-red-600 z-50 overflow-hidden">
       {/* 
         Removed bg-black from section so the underlying WebGL Black Hole particles show through!
         Instead, we use a harsh, highly translucent red vignette.
       */}
       <motion.div 
         className="absolute inset-0 pointer-events-none"
         style={{ background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.15) 0%, rgba(0,0,0,0.8) 100%)' }}
         animate={{ opacity: [0.6, 1, 0.6, 0.9, 0.7] }}
         transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
       />

       <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 text-white">
          
          <motion.div style={{ y: yText, scale: scaleIn }} className="mb-24 text-center">
             <motion.div 
               animate={{ x: [-2, 2, -1, 1, 0], y: [1, -1, 2, -2, 0] }}
               transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
               className="inline-block bg-white text-black px-6 py-2 text-3xl font-black mb-8 border-4 border-black shadow-[8px_8px_0_#f0f]"
             >
                {layer.numberAr} | {layer.number}
             </motion.div>
             <h1 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase text-white tracking-tighter leading-none" style={{ textShadow: "8px 8px 0 #f00, -8px -8px 0 #0ff, 0 0 30px #f00" }}>
               {layer.name}
             </h1>
             <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-white mt-6 font-cairo drop-shadow-[0_0_20px_rgba(255,0,0,1)]" style={{ textShadow: "5px 5px 0 #f0f, -5px -5px 0 #ff0" }}>
               {layer.nameAr}
             </h2>

             <div className="mt-16 grid gap-6 md:grid-cols-2">
               <motion.div 
                 animate={{ rotate: [-0.5, 0.5, -0.5] }}
                 transition={{ duration: 0.15, repeat: Infinity }}
                 className="bg-white text-black p-8 border-4 border-red-600 shadow-[10px_10px_0_#f00]"
               >
                 <p className="text-xl font-black uppercase tracking-wider leading-relaxed">{layer.definition}</p>
               </motion.div>
               <motion.div 
                 animate={{ rotate: [0.5, -0.5, 0.5] }}
                 transition={{ duration: 0.15, repeat: Infinity }}
                 className="bg-black text-white p-8 border-4 border-[#0ff] shadow-[10px_10px_0_#0ff]" 
                 dir="rtl"
               >
                 <p className="text-2xl font-black font-cairo leading-relaxed">{layer.definitionAr}</p>
               </motion.div>
             </div>
          </motion.div>

          {/* Layer 7 Case Studies */}
          <div className="grid gap-12 pb-12 max-w-5xl mx-auto">
            {layer.caseStudies.map((cs, idx) => (
               <motion.div 
                 key={cs.id}
                 initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100, skewX: 10 }}
                 whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                 viewport={{ margin: "-100px" }}
                 className="group relative"
               >
                 {/* Intense Glitch Container */}
                 <motion.div
                   animate={{ x: [-1, 2, -2, 1, 0], y: [1, -2, 1, -1, 0] }}
                   transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                   className="p-8 md:p-12 border-8 border-white bg-black hover:bg-white hover:text-black transition-colors duration-200"
                   style={{ boxShadow: idx % 2 === 0 ? "12px 12px 0 #f00" : "12px 12px 0 #0ff" }}
                 >
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-white/20 pb-6 mb-6 group-hover:border-black/20">
                     <div>
                       <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{cs.title}</h3>
                       <h4 className="text-2xl md:text-4xl font-black font-cairo mt-2 text-[#f0f] group-hover:text-red-700">{cs.titleAr}</h4>
                     </div>
                     <div className="mt-4 md:mt-0 flex gap-4">
                       <span className="text-2xl font-black font-mono bg-red-600 text-white px-4 py-2 uppercase border-2 border-white">{cs.domain}</span>
                     </div>
                   </div>
                   
                   <div className="space-y-8 text-xl md:text-2xl font-bold leading-relaxed">
                     <p className="bg-white/10 p-6 border-l-8 border-[#0ff] group-hover:bg-black/5 group-hover:border-black">⚠️ {cs.illustrationEn}</p>
                     <p className="font-cairo text-right bg-white/10 p-6 border-r-8 border-[#f0f] group-hover:bg-black/5 group-hover:border-black" dir="rtl">⚠️ {cs.illustrationAr}</p>
                   </div>
                 </motion.div>
               </motion.div>
            ))}
          </div>
       </div>
    </section>
  );
}

/* ── Standard Layer UI (Glassmorphism) ───────────────────────── */
function StandardLayerUI({ layer }: { layer: LayerData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const egyptian = EGYPTIAN_DETAILS[layer.number];
  const egyptianCases = layer.caseStudies.filter((cs) => cs.egyptianSpecific);
  const globalCases = layer.caseStudies.filter((cs) => !cs.egyptianSpecific);

  return (
    <section
      ref={sectionRef}
      id={`layer-${layer.number}`}
      data-layer={layer.number}
      className="relative py-24 pb-40 min-h-screen"
      style={{ '--layer-accent': layer.accentHSL, '--glass-tint': layer.glassTint } as React.CSSProperties}
    >
      {/* Stronger Semi-transparent gradient background — particles glow through */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent 0%, ${layer.bgHSL} 10%, ${layer.bgHSL} 90%, transparent 100%)`,
        opacity: 0.4,
      }} />

      {/* Sweeping background ambient glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ background: `radial-gradient(circle at 50% 50%, ${layer.accentHSL}20 0%, transparent 60%)`, backgroundSize: '200% 200%' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12">

        {/* ── Layer Header ── */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ scale: 0.3, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[clamp(6rem,18vw,14rem)] font-amiri leading-none relative"
            style={{ color: layer.accentHSL, textShadow: `0 0 100px ${layer.accentHSL}80, 0 0 200px ${layer.accentHSL}40`, filter: `drop-shadow(0 0 50px ${layer.accentHSL}60)` }}
          >
            {layer.numberAr}
            {/* Core highlight in center of number */}
            <div className="absolute inset-0 bg-white opacity-10 mix-blend-overlay rounded-full blur-2xl" />
          </motion.span>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-amiri text-white font-bold leading-tight drop-shadow-2xl" dir="rtl">{layer.nameAr}</h2>
            <h3 className="text-[clamp(0.75rem,1.2vw,1rem)] tracking-[0.4em] uppercase text-white/50 mt-4 font-bold" style={{ fontFamily: "'Clash Display', sans-serif" }}>{layer.name}</h3>
          </motion.div>
        </div>

        {/* ── Definition ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl text-center"
          style={{ background: layer.glassTint }}
        >
          <p className="text-base text-white/60 leading-relaxed mb-3">{layer.definition}</p>
          <p className="text-base text-white/35 font-cairo leading-relaxed" dir="rtl">{layer.definitionAr}</p>
        </motion.div>

        {/* ── Counters ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20 max-w-3xl mx-auto"
        >
          {layer.counters.map((c, i) => (
            <AnimatedCounter key={i} target={c.target} suffix={c.suffix} label={c.label} labelEn={c.labelEn} accentColor={layer.accentHSL} />
          ))}
        </motion.div>

        {/* ── Global Case Studies ── */}
        {globalCases.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px]" style={{ background: layer.accentHSL }} />
              <span className="text-xs tracking-[0.2em] text-white/25 font-mono uppercase">Global Case Studies</span>
              <span className="text-xs text-white/12 font-cairo" dir="rtl">دراسات حالة عالمية</span>
            </div>
            <div className="grid gap-5 pb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {globalCases.map((cs) => (
                <div key={cs.id} className="snap-start">
                  <CaseCard {...cs} glassTint={layer.glassTint} accentColor={layer.accentHSL} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Egyptian Case Studies ── */}
        {egyptianCases.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-lg">🇪🇬</span>
              <div className="w-10 h-[1px]" style={{ background: layer.accentHSL }} />
              <span className="text-xs tracking-[0.2em] text-white/25 font-mono uppercase">Egyptian Cases</span>
              <span className="text-xs text-white/12 font-cairo" dir="rtl">حالات مصرية</span>
            </div>
            <div className="grid gap-5 pb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {egyptianCases.map((cs) => (
                <div key={cs.id} className="snap-start">
                  <CaseCard {...cs} glassTint={layer.glassTint} accentColor={layer.accentHSL} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Egyptian Deep Dive Panel ── */}
        {egyptian && (
          <motion.div
            initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/[0.08] backdrop-blur-xl overflow-hidden relative"
            style={{ background: `${layer.accentHSL}08` }}
          >
            {/* Accent top bar */}
            <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${layer.accentHSL}, transparent)` }} />

            <div className="p-8">
               <div className="flex items-center gap-3 mb-5">
                 <span className="text-2xl">🇪🇬</span>
                 <div>
                   <h4 className="text-sm font-semibold tracking-wider uppercase" style={{ color: layer.accentHSL, fontFamily: "'Clash Display', sans-serif" }}>{egyptian.title}</h4>
                   <p className="text-sm text-white/30 font-cairo" dir="rtl">{egyptian.titleAr}</p>
                 </div>
               </div>

               <p className="text-sm text-white/55 leading-relaxed mb-4 max-w-4xl">{egyptian.body}</p>
               <p className="text-sm text-white/30 font-cairo leading-relaxed mb-6 max-w-4xl" dir="rtl">{egyptian.bodyAr}</p>

               {/* Stats grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {egyptian.stats.map((stat, i) => (
                   <div key={i} className="flex items-start gap-2 text-xs">
                     <span style={{ color: layer.accentHSL }}>▸</span>
                     <span className="text-white/45">{stat}</span>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* ── Layer Separator ── */}
        <div className="mt-24 flex justify-center">
          <div className="w-[1px] h-24" style={{ background: `linear-gradient(180deg, ${layer.accentHSL}40, transparent)` }} />
        </div>
      </div>
    </section>
  );
}

import { Layer8Special } from './Layer8Special';

/* ── Layer Section (Main Controller) ─────────────────────────── */
export function LayerSection({ layer }: { layer: LayerData }) {
  const { isAnimationsDisabled } = useScrollContext();

  // Layer 8: The Unknown
  if (layer.number === 8) {
    return <Layer8Special layer={layer} />;
  }

  const [l7Phase, setL7Phase] = useState<'toggling' | 'faded' | 'creepy'>('toggling');
  const [isBrutalist, setIsBrutalist] = useState(true);

  useEffect(() => {
    if (layer.number !== 7) return;

    let isActive = true;

    async function runTimeline() {
      while (isActive) {
        // Phase 1: Toggling (0s to 70s)
        setL7Phase('toggling');
        // Toggle every 30 seconds as requested
        for (let i = 0; i < 70; i += 30) {
          if (!isActive) return;
          setIsBrutalist(b => !b);
          // Wait 30 seconds, or whatever is remaining of the 70 seconds
          const waitTime = Math.min(30, 70 - i) * 1000;
          await new Promise(r => setTimeout(r, waitTime));
        }

        if (!isActive) return;

        // Phase 2: Fade Out
        setL7Phase('faded');
        await new Promise(r => setTimeout(r, 3000));

        if (!isActive) return;

        // Phase 3: Creepy Text
        setL7Phase('creepy');
        await new Promise(r => setTimeout(r, 12000)); // Hold creepy text for 12 seconds
        
        // Loop goes back to while(isActive) and resets to toggling phase
      }
    }

    runTimeline();

    return () => {
      isActive = false;
    };
  }, [layer.number]);

  if (layer.number === 7) {
    if (l7Phase === 'faded') {
      return (
        <section className="min-h-screen bg-black flex items-center justify-center transition-opacity duration-[3000ms] opacity-0" />
      );
    }
    
    if (l7Phase === 'creepy') {
      return (
        <section className="min-h-screen flex items-center justify-center bg-black relative z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4 }}
            className="text-red-600 font-bold text-center flex flex-col items-center justify-center"
            style={{ textShadow: "0 0 20px red, 0 0 40px darkred", letterSpacing: "8px" }}
          >
            <h1 className="text-[clamp(2rem,5vw,6rem)] font-mono mb-4 px-4 uppercase tracking-widest text-center">CONTINUE SCROLLING</h1>
            <h1 className="text-[clamp(2rem,5vw,6rem)] font-mono px-4 uppercase tracking-widest text-center">AS WE WANT</h1>
          </motion.div>
        </section>
      );
    }

    // Toggling Phase (Slow 4-second CSS Cross-fade)
    return (
      <div id="layer-7" data-layer="7" className="grid">
        <div
          className="col-start-1 row-start-1 z-20"
          style={isAnimationsDisabled ? { opacity: 1, pointerEvents: 'auto' } : { 
            opacity: isBrutalist ? 1 : 0, 
            pointerEvents: isBrutalist ? 'auto' : 'none',
            transition: 'opacity 4s ease-in-out' 
          }}
        >
          <Layer7Special layer={layer} />
        </div>

        <div
          className="col-start-1 row-start-1 z-10"
          style={isAnimationsDisabled ? { display: 'none' } : { 
            opacity: isBrutalist ? 0 : 1, 
            pointerEvents: isBrutalist ? 'none' : 'auto',
            transition: 'opacity 4s ease-in-out' 
          }}
        >
          <StandardLayerUI layer={layer} />
        </div>
      </div>
    );
  }

  // Normal layers (1-6) just return the standard UI
  return <StandardLayerUI layer={layer} />;
}
