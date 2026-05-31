"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ShieldCheck,
  HeartPulse,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react";
import { ParallaxHero } from "@/components/shared/parallax-hero";
import { useRTL } from "@/components/shared/rtl-provider";
import { HOME, s } from "@/data/i18n/site-strings";
import { KEYHUNTER_V2, COGNITIVE_COMMUNITIES, REALTIME_COGNITIVE_V2 } from "@/data/research/cognitive-knowledge";
import { BRAIN_EXERCISES, MYTH_LIBRARY, REAL_SCENARIOS } from "@/data/research/module-libraries";
import { RELIGION_REFERENCE_LIBRARY } from "@/data/research/authority-references";
import { VERIFIED_QUOTES } from "@/data/research/verified-quotes";

/*
 * Flow: Hero → MVP Cards → Evidence Features → Verified Voices → Methodology → Contributions → Baseline CTA → Final CTA
 */

/**
 * Landing Page — Framework §25.6 (EXACT TEXT) + DESIGN.txt §6.1 Hero
 *
 * Aesthetic: Dark Luxury + Glassmorphism (§1.1 + §1.6)
 * Layout: Hero + Bento Feature Grid (§1.5 + §3.2)
 * Animation: Scroll-triggered fade-up (§2.2), parallax glow (§2.1)
 * Typography: Display headline (§5.5) with gradient text (§5.4)
 */
export default function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { isRTL, language } = useRTL();
  const a = language; // pass language string to s() for arEG support

  const moduleCounts = {
    deepreal: {
      exercises: BRAIN_EXERCISES.filter((item) => item.module === "deepreal").length,
      scenarios: REAL_SCENARIOS.filter((item) => item.module === "deepreal").length,
      basics: KEYHUNTER_V2.filter((item) => item.module === "deepreal").length,
    },
    mentalHealth: {
      exercises: BRAIN_EXERCISES.filter((item) => item.module === "mental-health").length,
      scenarios: REAL_SCENARIOS.filter((item) => item.module === "mental-health").length,
      basics: KEYHUNTER_V2.filter((item) => item.module === "mental-health").length,
    },
    religionHub: {
      exercises: BRAIN_EXERCISES.filter((item) => item.module === "religion-hub").length,
      scenarios: REAL_SCENARIOS.filter((item) => item.module === "religion-hub").length,
      references: RELIGION_REFERENCE_LIBRARY.length,
    },
  };

  const systemCounts = {
    brainExercises: BRAIN_EXERCISES.length,
    keyhunter: KEYHUNTER_V2.length,
    protocols: REALTIME_COGNITIVE_V2.length,
    communities: COGNITIVE_COMMUNITIES.length,
    myths: MYTH_LIBRARY.length,
    references: RELIGION_REFERENCE_LIBRARY.length,
  };

  const homeQuotes = [
    VERIFIED_QUOTES.find((quote) => quote.id === "quote-feynman"),
    VERIFIED_QUOTES.find((quote) => quote.id === "quote-who-mentalhealth"),
    VERIFIED_QUOTES.find((quote) => quote.id === "quote-quran-hujurat"),
  ].filter(Boolean) as typeof VERIFIED_QUOTES;

  useEffect(() => {
    // Scroll-triggered animations — DESIGN.txt §2.2
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: <BookOpen size={20} />,
      title: isRTL ? `${systemCounts.keyhunter} أساس KeyHunter V2` : `${systemCounts.keyhunter} KeyHunter V2 basics`,
      desc: isRTL ? "طبقات أساسية تشغيلية عبر المنتجات الثلاثة بدلاً من قاموس عام أو كلمات زخرفية." : "Operational basics across the three MVPs instead of generic glossary filler.",
      color: "var(--accent-cta)",
    },
    {
      icon: <Lightbulb size={20} />,
      title: isRTL ? `${systemCounts.protocols} بروتوكول إدراكي لحظي` : `${systemCounts.protocols} real-time cognitive protocols`,
      desc: isRTL ? "مسارات مقاومة معرفية قابلة للتنفيذ فوراً، مع اعتماد على مصادر مفتوحة ومجانية." : "Immediate cognitive-resilience routes with free/open evidence anchors.",
      color: "var(--accent-deepreal)",
    },
    {
      icon: <Target size={20} />,
      title: isRTL ? `${systemCounts.brainExercises} تمرين عقلي` : `${systemCounts.brainExercises} brain exercises`,
      desc: isRTL ? "تمارين تشغيلية حقيقية تتقدم من الفرز والتحقق إلى التثبيت والتوجيه والدفاع." : "Real operational drills spanning triage, verification, stabilization, and defense.",
      color: "var(--accent-mentalhealth)",
    },
    {
      icon: <BarChart3 size={20} />,
      title: isRTL ? `${systemCounts.communities} مساراً ومجتمعاً مجانياً` : `${systemCounts.communities} free routes and communities`,
      desc: isRTL ? "شبكة مفتوحة من جهات التحقق والبحث والدعم والاعتدال، مع تقليل المسارات المدفوعة." : "An open network of verification, research, support, and moderation routes with paid dead ends reduced.",
      color: "var(--accent-religionhub)",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: isRTL ? `${systemCounts.myths} خرافة مفككة` : `${systemCounts.myths} myths debunked`,
      desc: isRTL ? "تفكيك قابل للتشغيل للمزاعم النفسية والإعلامية والدينية بدلاً من رسائل طمأنة عامة." : "Executable myth breakdowns across misinformation, mental health, and religion.",
      color: "var(--color-warning)",
    },
    {
      icon: <Users size={20} />,
      title: isRTL ? `${systemCounts.references} مرجع قرآن/حديث` : `${systemCounts.references} Quran/Hadith refs`,
      desc: isRTL ? "مراجع قابلة للاستدعاء داخل الواجهة مع ربط مباشر بمسار الاعتدال وحدود الرعاية." : "Resolvable references inside the UI, tied directly to moderation and care-boundary logic.",
      color: "var(--color-info)",
    },
  ];

  const contributions = [
    { num: "01", title: s(HOME.c1Title, a), desc: s(HOME.c1Desc, a), color: "var(--accent-cta)" },
    { num: "02", title: s(HOME.c2Title, a), desc: s(HOME.c2Desc, a), color: "var(--accent-deepreal)" },
    { num: "03", title: s(HOME.c3Title, a), desc: s(HOME.c3Desc, a), color: "var(--accent-mentalhealth)" },
    { num: "04", title: s(HOME.c4Title, a), desc: s(HOME.c4Desc, a), color: "var(--accent-religionhub)" },
  ];

  const dir = isRTL ? "rtl" : "ltr";
  const ff = isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* ═══ HERO SECTION ═══ */}
      <ParallaxHero speed={0.3}>
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100vh", padding: "120px 0 80px" }}
      >
        <div className="hero-glow" />
        <div style={{ position: "absolute", top: "30%", left: "20%", width: "400px", height: "400px", background: "var(--hero-orb-1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: "350px", height: "350px", background: "var(--hero-orb-2)", pointerEvents: "none" }} />

        <div className="container relative" style={{ zIndex: 1, textAlign: "center", direction: dir }}>
          <div className="inline-flex items-center gap-2 mb-6" style={{ padding: "6px 16px", borderRadius: "var(--radius-full)", background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", fontFamily: ff }}>
            <GraduationCap size={14} style={{ color: "var(--accent-cta)" }} />
            {s(HOME.badge, a)}
          </div>

          <div style={{ marginBottom: "18px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-caption)", fontFamily: ff }}>
            {s(HOME.modesLive, a)}
          </div>

          <h1 className="text-display" style={{ maxWidth: "900px", margin: "0 auto", marginBottom: "24px" }}>
            {s(HOME.headlineBuild, a)}{" "}
            <span className="text-gradient">{s(HOME.headlineAwareness, a)}</span>
            <br />
            {s(HOME.headlineThat, a)}
          </h1>

          <p style={{ fontSize: "20px", color: "var(--text-muted)", maxWidth: "640px", margin: "0 auto 40px", lineHeight: 1.6, fontFamily: ff }}>
            {s(HOME.subtext, a)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "14px 28px", fontSize: "16px" }}>
              {s(HOME.startJourney, a)} <ArrowRight size={18} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </Link>
            <Link href="/bad-news" className="btn-primary no-underline" style={{ padding: "14px 28px", fontSize: "16px", background: "var(--accent-deepreal)", borderColor: "var(--accent-deepreal)" }}>
              Play Bad News
            </Link>
            <Link href="#how-it-works" className="btn-secondary no-underline" style={{ padding: "14px 28px", fontSize: "16px", fontFamily: ff }}>
              {s(HOME.seeHow, a)}
            </Link>
            <Link href="/welcome" className="btn-secondary no-underline" style={{ padding: "14px 28px", fontSize: "16px", fontFamily: ff }}>
              {isRTL ? "قاعدة البيانات الشاملة (تشريح المشروع)" : "Complete Project Data & Anatomy"}
            </Link>
            <a href="/angry-debunkers" className="btn-primary no-underline" style={{
              background: 'linear-gradient(135deg, #C2185B, #7B1FA2)',
              padding: '16px 32px', fontSize: '16px', fontWeight: 800,
              borderRadius: 'var(--radius-lg)', animation: 'pulse 3s infinite'
            }}>
              🔥 {isRTL ? 'أطلق المفنّدين الغاضبين' : 'Launch Angry Debunkers'}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6" style={{ fontSize: "13px", color: "var(--text-caption)", fontFamily: ff }}>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {s(HOME.program14, a)}</span>
            <span className="flex items-center gap-1.5"><Users size={13} /> {s(HOME.forStudents, a)}</span>
            <span className="flex items-center gap-1.5"><Target size={13} /> {isRTL ? `${systemCounts.brainExercises} تمريناً تنفيذياً` : `${systemCounts.brainExercises} operational drills`}</span>
            <span className="flex items-center gap-1.5"><BarChart3 size={13} /> {isRTL ? `${systemCounts.communities} مساراً مجانياً` : `${systemCounts.communities} free routes`}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> {isRTL ? '55+ منظمة عالمية' : '55+ Global Orgs'}</span>
            <span className="flex items-center gap-1.5"><Sparkles size={13} /> {isRTL ? '8 طبقات خداع' : '8 Deception Layers'}</span>
          </div>
        </div>
      </section>
      </ParallaxHero>

      {/* ═══ 3 MVP CARDS ═══ */}
      <section id="how-it-works" className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: "12px" }}>
              {s(HOME.threeEngines, a)} <span className="text-gradient">{s(HOME.awarenessEngines, a)}</span>
            </h2>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "17px", lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: ff }}>
              {s(HOME.threeEngDesc, a)}
            </p>
          </div>

          <div className="bento-grid">
            {/* DeepReal */}
            <div className="glass-card card-deepreal animate-on-scroll stagger-1" style={{ padding: "var(--space-xl)", direction: dir }}>
              <div className="flex items-center justify-center mb-4" style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--accent-deepreal-surface)" }}>
                <ShieldCheck size={24} style={{ color: "var(--accent-deepreal)" }} />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "22px" }}>DeepReal</h3>
              <p className="badge mb-3" style={{ background: "var(--accent-deepreal-surface)", color: "var(--accent-deepreal)", border: "1px solid rgba(245,158,11,0.2)" }}>
                {s(HOME.verificationEngine, a)}
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px", fontFamily: ff }}>{s(HOME.drDesc, a)}</p>
              <div className="flex flex-col gap-2" style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-deepreal)" }} /> {isRTL ? `${moduleCounts.deepreal.exercises} تمرين تحقق` : `${moduleCounts.deepreal.exercises} verification drills`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-deepreal)" }} /> {isRTL ? `${moduleCounts.deepreal.scenarios} سيناريو حقيقي` : `${moduleCounts.deepreal.scenarios} real scenarios`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-deepreal)" }} /> {isRTL ? `${moduleCounts.deepreal.basics} أساس KeyHunter` : `${moduleCounts.deepreal.basics} KeyHunter basics`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-deepreal)" }} /> {isRTL ? "3 أنماط لعبة تشغيلية" : "3 operational game modes"}</span>
              </div>
              <Link href="/deepreal" className="flex items-center gap-2 mt-4 no-underline font-semibold" style={{ color: "var(--accent-deepreal)", fontSize: "14px" }}>
                {s(HOME.explore, a)} DeepReal <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
              </Link>
            </div>

            {/* Mental Health */}
            <div className="glass-card card-mentalhealth animate-on-scroll stagger-2" style={{ padding: "var(--space-xl)", direction: dir }}>
              <div className="flex items-center justify-center mb-4" style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--accent-mentalhealth-surface)" }}>
                <HeartPulse size={24} style={{ color: "var(--accent-mentalhealth)" }} />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "22px" }}>{isRTL ? "الصحة النفسية" : "Mental Health"}</h3>
              <p className="badge mb-3" style={{ background: "var(--accent-mentalhealth-surface)", color: "var(--accent-mentalhealth)", border: "1px solid rgba(16,185,129,0.2)" }}>
                {s(HOME.understandingEngine, a)}
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px", fontFamily: ff }}>{s(HOME.mhDesc, a)}</p>
              <div className="flex flex-col gap-2" style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-mentalhealth)" }} /> {isRTL ? `${moduleCounts.mentalHealth.exercises} تمرين تثبيت ودعم` : `${moduleCounts.mentalHealth.exercises} stabilization drills`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-mentalhealth)" }} /> {isRTL ? `${moduleCounts.mentalHealth.scenarios} سيناريو دعم` : `${moduleCounts.mentalHealth.scenarios} support scenarios`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-mentalhealth)" }} /> {isRTL ? `${moduleCounts.mentalHealth.basics} أساس KeyHunter` : `${moduleCounts.mentalHealth.basics} KeyHunter basics`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-mentalhealth)" }} /> {isRTL ? "فحوصات ومسارات مجانية مباشرة" : "live screening and free routes"}</span>
              </div>
              <Link href="/mental-health" className="flex items-center gap-2 mt-4 no-underline font-semibold" style={{ color: "var(--accent-mentalhealth)", fontSize: "14px" }}>
                {s(HOME.explore, a)} {isRTL ? "الصحة النفسية" : "Mental Health"} <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
              </Link>
            </div>

            {/* Religion Hub */}
            <div className="glass-card card-religionhub animate-on-scroll stagger-3" style={{ padding: "var(--space-xl)", direction: dir }}>
              <div className="flex items-center justify-center mb-4" style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--accent-religionhub-surface)" }}>
                <Sparkles size={24} style={{ color: "var(--accent-religionhub)" }} />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "22px" }}>{isRTL ? "المحور الديني" : "Religion Hub"}</h3>
              <p className="badge mb-3" style={{ background: "var(--accent-religionhub-surface)", color: "var(--accent-religionhub)", border: "1px solid rgba(139,92,246,0.2)" }}>
                {s(HOME.meaningEngine, a)}
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px", fontFamily: ff }}>{s(HOME.rhDesc, a)}</p>
              <div className="flex flex-col gap-2" style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-religionhub)" }} /> {isRTL ? `${moduleCounts.religionHub.exercises} تمرين اعتدال` : `${moduleCounts.religionHub.exercises} moderation drills`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-religionhub)" }} /> {isRTL ? `${moduleCounts.religionHub.scenarios} سيناريو حدود` : `${moduleCounts.religionHub.scenarios} boundary scenarios`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-religionhub)" }} /> {isRTL ? `${moduleCounts.religionHub.references} مرجع قرآن/حديث` : `${moduleCounts.religionHub.references} Quran/Hadith refs`}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "var(--accent-religionhub)" }} /> {isRTL ? "مسارات فتوى واعتدال رسمية" : "official moderation and fatwa routes"}</span>
              </div>
              <Link href="/religion-hub" className="flex items-center gap-2 mt-4 no-underline font-semibold" style={{ color: "var(--accent-religionhub)", fontSize: "14px" }}>
                {s(HOME.explore, a)} {isRTL ? "المحور الديني" : "Religion Hub"} <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE ARSENAL ═══ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll" style={{ direction: dir }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-caption)', marginBottom: '8px', fontFamily: ff }}>WEAPONS OF TRUTH</div>
            <h2 style={{ marginBottom: '12px' }}>
              THE ARSENAL — <span className="text-gradient">{isRTL ? 'أسلحة الحقيقة' : 'Weapons of Truth'}</span>
            </h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)', fontFamily: ff }}>
              {isRTL ? 'ست أدوات قتالية للتحقق والكشف والتحقيق — كل واحدة مصممة لمعركة مختلفة.' : 'Six combat-grade tools for verification, detection & investigation — each built for a different battle.'}
            </p>
          </div>

          <div className="arsenal-grid">
            {/* 🔥 The Angry Debunkers */}
            <Link href="/angry-debunkers" className="arsenal-card animate-on-scroll stagger-1 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #C2185B, #C2185B44)' }} />
              <div className="arsenal-card-icon" style={{ background: '#C2185B18', color: '#C2185B' }}>🔥</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>The Angry Debunkers</h3>
              <p style={{ color: '#C2185B', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? 'المفنّدون الغاضبون' : 'AI-Powered Debunking'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#C2185B' }} /> {isRTL ? 'ساندويتش الحقيقة بالذكاء الاصطناعي' : 'AI Truth Sandwich'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#C2185B' }} /> {isRTL ? 'كشف 8 طبقات خداع' : '8-layer deception detection'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#C2185B' }} /> {isRTL ? 'تتبع المصدر الأول' : 'Patient Zero tracking'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#C2185B', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>

            {/* 🤖 AI Investigation Squad */}
            <Link href="/ai-agents" className="arsenal-card animate-on-scroll stagger-2 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #1976D2, #1976D244)' }} />
              <div className="arsenal-card-icon" style={{ background: '#1976D218', color: '#1976D2' }}>🤖</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>AI Investigation Squad</h3>
              <p style={{ color: '#1976D2', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? 'فريق التحقيق بالذكاء الاصطناعي' : 'Parallel AI Agents'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#1976D2' }} /> {isRTL ? '5 عملاء متخصصين' : '5 specialized agents'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#1976D2' }} /> {isRTL ? 'عمل متوازي في الوقت الفعلي' : 'Real-time parallel processing'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#1976D2' }} /> {isRTL ? 'تقارير موحدة' : 'Unified reporting'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#1976D2', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>

            {/* 🌍 Global Alliance */}
            <Link href="/global-alliance" className="arsenal-card animate-on-scroll stagger-3 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #10B981, #10B98144)' }} />
              <div className="arsenal-card-icon" style={{ background: '#10B98118', color: '#10B981' }}>🌍</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>Global Alliance</h3>
              <p style={{ color: '#10B981', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? 'التحالف العالمي' : 'Worldwide Fact-Checking'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#10B981' }} /> {isRTL ? '55+ منظمة تحقق عالمية' : '55+ fact-checking organizations'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#10B981' }} /> {isRTL ? 'تغطية عالمية شاملة' : 'Worldwide coverage'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#10B981' }} /> {isRTL ? 'تحقق متعدد اللغات' : 'Multi-language verification'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#10B981', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>

            {/* 🕌 Islamic Verification */}
            <Link href="/religion-hub/tools" className="arsenal-card animate-on-scroll stagger-4 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #D4A843, #D4A84344)' }} />
              <div className="arsenal-card-icon" style={{ background: '#D4A84318', color: '#D4A843' }}>🕌</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>Islamic Verification</h3>
              <p style={{ color: '#D4A843', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? 'التحقق الإسلامي' : 'Religious Auth Tools'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#D4A843' }} /> {isRTL ? 'توثيق الحديث' : 'Hadith authentication'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#D4A843' }} /> {isRTL ? 'سياق الفتوى' : 'Fatwa context analysis'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#D4A843' }} /> {isRTL ? 'التحقق القرآني' : 'Quran verification'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#D4A843', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>

            {/* 🧅 8-Layer Deception */}
            <Link href="/six-layers" className="arsenal-card animate-on-scroll stagger-5 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #7B1FA2, #7B1FA244)' }} />
              <div className="arsenal-card-icon" style={{ background: '#7B1FA218', color: '#7B1FA2' }}>🧅</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>8-Layer Deception</h3>
              <p style={{ color: '#7B1FA2', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? '8 طبقات من الخداع' : 'Deception Anatomy'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#7B1FA2' }} /> {isRTL ? 'من الاختلاق الكامل' : 'From Absolute Fabrication'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#7B1FA2' }} /> {isRTL ? 'إلى المجهول' : 'To The Unknown'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#7B1FA2' }} /> {isRTL ? 'تشريح كل طبقة' : 'Each layer dissected'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#7B1FA2', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>

            {/* 🔍 OSINT Investigator */}
            <Link href="/osint-investigator" className="arsenal-card animate-on-scroll stagger-6 no-underline" style={{ direction: dir }}>
              <div className="arsenal-card-border" style={{ background: 'linear-gradient(135deg, #78909C, #78909C44)' }} />
              <div className="arsenal-card-icon" style={{ background: '#78909C18', color: '#78909C' }}>🔍</div>
              <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>OSINT Investigator</h3>
              <p style={{ color: '#78909C', fontSize: '13px', marginBottom: '12px', fontFamily: ff }}>{isRTL ? 'محقق المصادر المفتوحة' : 'Open-Source Intel'}</p>
              <div className="flex flex-col gap-1" style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: ff }}>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#78909C' }} /> {isRTL ? 'أدوات استخبارات مفتوحة' : 'Open-source intelligence tools'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#78909C' }} /> {isRTL ? 'التحقق من الصور والفيديو' : 'Image & video verification'}</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: '#78909C' }} /> {isRTL ? 'تحليل البيانات الوصفية' : 'Metadata analysis'}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 font-semibold" style={{ color: '#78909C', fontSize: '14px' }}>
                {isRTL ? 'استكشف' : 'Explore'} → <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW ANGRY DEBUNKERS WORK ═══ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: '12px' }}>
              {isRTL ? 'كيف يعمل' : 'How'} <span className="text-gradient">{isRTL ? 'المفنّدون الغاضبون' : 'Angry Debunkers Work'}</span>
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)', fontFamily: ff }}>
              {isRTL ? 'أربع خطوات من الادعاء إلى الحقيقة — مدعومة بالذكاء الاصطناعي.' : 'Four steps from claim to truth — powered by AI.'}
            </p>
          </div>

          <div className="step-flow animate-on-scroll">
            {[
              { num: '1', title: isRTL ? 'الصق الادعاء' : 'Paste Claim', desc: isRTL ? 'أدخل أي ادعاء مشبوه أو رابط أو نص.' : 'Enter any suspicious claim, link, or text.' },
              { num: '2', title: isRTL ? 'الذكاء الاصطناعي يفحص' : 'AI Scans', desc: isRTL ? '5 عملاء ذكاء اصطناعي يحللون عبر 8 طبقات.' : '5 AI agents analyze across 8 deception layers.' },
              { num: '3', title: isRTL ? 'ساندويتش الحقيقة' : 'Truth Sandwich', desc: isRTL ? 'النتيجة مغلفة بالحقيقة أولاً وأخيراً.' : 'Result wrapped with truth first and last.' },
              { num: '4', title: isRTL ? 'تعمّق أكثر' : 'Go Deeper', desc: isRTL ? 'استكشف المصادر والطبقات والأدلة.' : 'Explore sources, layers, and evidence.' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div className="step-flow-item">
                  <div className="step-flow-number" style={{ background: 'linear-gradient(135deg, #C2185B, #7B1FA2)', color: '#fff' }}>{step.num}</div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px', fontFamily: ff }}>{step.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: ff }}>{step.desc}</p>
                </div>
                {i < 3 && <div className="step-flow-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES BAR ═══ */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: "8px" }}>
              {s(HOME.builtOn, a)} <span className="text-gradient">{s(HOME.evidence, a)}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto", fontFamily: ff }}>
              {s(HOME.evidenceDesc, a)}
            </p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {features.map((feature, i) => (
              <div key={i} className={`glass-card animate-on-scroll stagger-${i + 1}`} style={{ padding: "var(--space-lg)", direction: dir }}>
                <div className="flex items-center justify-center mb-3" style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: `${feature.color}15`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h4 style={{ fontSize: "16px", marginBottom: "6px", fontFamily: ff }}>{feature.title}</h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, fontFamily: ff }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: "8px" }}>
              {isRTL ? "أصوات موثقة" : "Verified voices"} <span className="text-gradient">{isRTL ? "لا شعارات عامة" : "not generic authority slogans"}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "720px", margin: "0 auto", fontFamily: ff }}>
              {a
                ? "بدلاً من لغة آراء الخبراء العامة، تعرض الواجهة اقتباسات موثقة ترتبط مباشرة بفلسفة التحقق، والصحة النفسية، والاعتدال."
                : "Instead of vague expert-opinion marketing, the landing page now uses documented quotes tied directly to verification, mental health, and moderation philosophy."}
            </p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {homeQuotes.map((quote, index) => (
              <div key={quote.id} className={`glass-card animate-on-scroll stagger-${index + 1}`} style={{ padding: "var(--space-xl)", direction: dir }}>
                <p style={{ fontSize: "18px", lineHeight: 1.7, color: "var(--text-primary)", marginBottom: 16, fontFamily: ff }}>
                  “{isRTL ? quote.quoteAr : quote.quote}”
                </p>
                <div style={{ fontWeight: 700, marginBottom: 6, fontFamily: ff }}>
                  {isRTL ? quote.authorAr : quote.author}
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 0, fontFamily: ff }}>
                  {isRTL ? quote.framingAr : quote.framing}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ METHODOLOGY ═══ */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: "8px" }}>
              {s(HOME.researchMethodology, a)} <span className="text-gradient">{s(HOME.methodology, a)}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontFamily: ff }}>
              {s(HOME.methDesc, a)}
            </p>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="glass-card animate-on-scroll stagger-1" style={{ padding: "var(--space-xl)", direction: dir }}>
              <h4 style={{ marginBottom: "16px", color: "var(--accent-cta)" }}>{s(HOME.protocol14, a)}</h4>
              <div className="flex flex-col gap-3">
                {[
                  { day: isRTL ? "اليوم 0" : "Day 0", task: isRTL ? "البطارية القبلية + التقييم القبلي" : "Baseline Battery + Pre-Assessment", color: "var(--color-info)" },
                  { day: isRTL ? "الأيام 1-14" : "Days 1-14", task: isRTL ? "تمارين يومية 15 دقيقة عبر 3 منتجات" : "Daily 15-min exercises across 3 MVPs", color: "var(--accent-mentalhealth)" },
                  { day: isRTL ? "اليوم 15" : "Day 15", task: isRTL ? "التقييم البعدي + SUS + النوعي" : "Post-Assessment + SUS + Qualitative", color: "var(--accent-religionhub)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="badge" style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40`, whiteSpace: "nowrap", fontSize: "11px" }}>
                      {item.day}
                    </span>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: ff }}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card animate-on-scroll stagger-2" style={{ padding: "var(--space-xl)", direction: dir }}>
              <h4 style={{ marginBottom: "16px", color: "var(--accent-deepreal)" }}>{s(HOME.targetSample, a)}</h4>
              <div className="flex flex-col gap-3" style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: ff }}>
                <div className="flex justify-between"><span>{s(HOME.population, a)}</span><span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s(HOME.egyStudents, a)}</span></div>
                <div style={{ borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="flex justify-between"><span>{s(HOME.ageRange, a)}</span><span style={{ fontWeight: 600, color: "var(--text-primary)" }}>18-30</span></div>
                <div style={{ borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="flex justify-between"><span>{s(HOME.minimumN, a)}</span><span style={{ fontWeight: 600, color: "var(--text-primary)" }}>84 (42 {isRTL ? "لكل مجموعة" : "per group"})</span></div>
                <div style={{ borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="flex justify-between"><span>{s(HOME.design, a)}</span><span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s(HOME.quasiExp, a)}</span></div>
                <div style={{ borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="flex justify-between"><span>{s(HOME.effectSize, a)}</span><span style={{ fontWeight: 600, color: "var(--text-primary)" }}>d = 0.50 ({isRTL ? "متوسط" : "medium"})</span></div>
              </div>
            </div>

            <div className="glass-card animate-on-scroll stagger-3" style={{ padding: "var(--space-xl)", direction: dir }}>
              <h4 style={{ marginBottom: "16px", color: "var(--accent-mentalhealth)" }}>{s(HOME.validatedInst, a)}</h4>
              <div className="flex flex-col gap-2">
                {[
                  { name: "MIST-20", alpha: "α = .77", mvp: "DeepReal" },
                  { name: "MHLS", alpha: "α = .873", mvp: isRTL ? "الصحة النفسية" : "Mental Health" },
                  { name: "Brief RCOPE", alpha: "α = .90/.81", mvp: isRTL ? "المحور الديني" : "Religion Hub" },
                  { name: "GHSQ", alpha: "r = .86", mvp: isRTL ? "الصحة النفسية" : "Mental Health" },
                  { name: "SUS", alpha: "α = .91", mvp: isRTL ? "كل المنتجات" : "All MVPs" },
                  { name: "MC-SDS", alpha: "α = .75", mvp: isRTL ? "المتغير المشترك" : "Covariate" },
                ].map((inst, i) => (
                  <div key={i} className="flex items-center justify-between" style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", fontSize: "13px" }}>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{inst.name}</span>
                    <div className="flex items-center gap-3">
                      <span style={{ color: "var(--text-muted)" }}>{inst.alpha}</span>
                      <span className="badge" style={{ background: "var(--bg-elevated)", color: "var(--text-caption)", border: "1px solid var(--border-primary)", fontSize: "10px" }}>
                        {inst.mvp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ORIGINAL CONTRIBUTIONS ═══ */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll" style={{ direction: dir }}>
            <h2 style={{ marginBottom: "8px" }}>
              {s(HOME.originalContributions, a)} <span className="text-gradient">{s(HOME.contributions, a)}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontFamily: ff }}>
              {s(HOME.contribDesc, a)}
            </p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {contributions.map((c, i) => (
              <div key={i} className={`glass-card animate-on-scroll stagger-${i + 1}`} style={{ padding: "var(--space-lg)", borderTop: `3px solid ${c.color}`, direction: dir }}>
                <div style={{ fontSize: "32px", fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: c.color, opacity: 0.3, marginBottom: 8 }}>{c.num}</div>
                <h4 style={{ fontSize: "16px", marginBottom: "8px", fontFamily: ff }}>{c.title}</h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, fontFamily: ff }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 animate-on-scroll">
            <Link href="/about" className="btn-secondary no-underline" style={{ fontSize: "14px", fontFamily: ff }}>
              {s(HOME.readFramework, a)}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BASELINE BATTERY CTA ═══ */}
      <section className="section-padding animate-on-scroll">
        <div className="container">
          <div className="glass-card" style={{ padding: "var(--space-2xl)", textAlign: "center", background: "linear-gradient(135deg, rgba(0,102,255,0.06), rgba(139,92,246,0.06))", border: "1px solid rgba(0,102,255,0.15)", direction: dir }}>
            <div style={{ fontSize: "32px", marginBottom: 12 }}>🧠</div>
            <h3 style={{ marginBottom: "8px", fontFamily: ff }}>{s(HOME.trustBattery, a)}</h3>
            <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 24px", fontSize: "15px", fontFamily: ff }}>
              {s(HOME.trustBatteryDesc, a)}
            </p>
            <Link href="/baseline" className="btn-primary no-underline" style={{ padding: "12px 28px" }}>
              {s(HOME.takeBaseline, a)} <ArrowRight size={16} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUSTED BY ═══ */}
      <section className="section-padding animate-on-scroll" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-8" style={{ direction: dir }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-caption)', fontFamily: ff }}>
              {isRTL ? 'موثوق من قبل' : 'TRUSTED BY'}
            </p>
          </div>
          <div className="trusted-row">
            {['Matsda2sh', 'AFP Fact Check', 'Full Fact', 'Snopes', 'Africa Check', 'Bellingcat'].map((org, i) => (
              <div key={i} className="trusted-logo" style={{ fontFamily: ff }}>
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="section-padding animate-on-scroll" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="glass-card" style={{ padding: "var(--space-3xl)", textAlign: "center", background: "linear-gradient(135deg, rgba(0,102,255,0.08), rgba(139,92,246,0.08), rgba(16,185,129,0.06))", border: "1px solid rgba(0,102,255,0.15)", direction: dir }}>
            <h2 style={{ marginBottom: "12px", fontFamily: ff }}>
              {isRTL ? "هل أنت مستعد لبناء" : "Ready to Build Your"} <span className="text-gradient">{isRTL ? "وعيك؟" : "Awareness?"}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "580px", margin: "0 auto 28px", fontSize: "16px", lineHeight: 1.7, fontFamily: ff }}>
              {a
                ? "15 دقيقة يومياً لمدة 14 يوماً. ثلاثة محركات. منصة متكاملة واحدة. تمارين قائمة على الأدلة مصممة لطلاب الجامعات المصرية."
                : "15 minutes a day for 14 days. Three engines. One integrated platform. Evidence-based exercises designed for Egyptian university students."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "14px 32px", fontSize: "16px" }}>
                {isRTL ? "ابدأ الآن" : "Start Now"} <ArrowRight size={18} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INSTITUTIONAL IDENTITY FOOTER ═══ */}
      <section style={{ padding: "2rem 0 3rem", borderTop: "1px solid var(--border-primary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", direction: dir }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.4, marginBottom: "0.5rem", fontFamily: ff }}>
              {isRTL ? "وزارة التعليم العالي والبحث العلمي" : "Ministry of Higher Education and Scientific Research"}
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.25rem", fontFamily: ff }}>
              {isRTL ? "المعهد التكنولوجي العالي بهليوبوليس الجديدة" : "Higher Technology Institute in New Heliopolis"}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", fontSize: "0.75rem", opacity: 0.6, fontFamily: ff }}>
              {["Ziad", "Yasmine", "Khaled", "Donia", "Mohamed"].map((name, i) => {
                const displayName = isRTL ? ["زیاد", "ياسمين", "خالد", "دنيا", "محمد"][i] : name;
                if (name === "Khaled") {
                  return (
                    <span 
                      key={i}
                      style={{
                        color: "var(--accent-cta)",
                        fontWeight: 900,
                        fontFamily: "'Clash Display', sans-serif",
                        textShadow: "0 0 10px rgba(0, 102, 255, 0.8)",
                        fontSize: "0.9rem",
                        opacity: 1
                      }}
                    >
                      {displayName}
                    </span>
                  );
                }
                return <span key={i}>{displayName}</span>;
              })}
            </div>
            <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.7rem", opacity: 0.4 }}>
              <span>✉️ info@eal.edu.eg</span>
              <span>📞 +20 1200009061</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
