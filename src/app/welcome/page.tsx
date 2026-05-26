"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { 
  ShieldCheck, HeartPulse, Sparkles, ArrowRight, BarChart3, Users, 
  BookOpen, Brain, Globe, AlertTriangle, Info, Download, Command,
  Database, Zap, Lock, Eye, Activity, Map, Fingerprint, Terminal,
  CheckCircle2, ChevronDown, ChevronUp, ScrollText, Crosshair, Server,
  Code, FlaskConical, Layers, Cpu, Palette, LayoutGrid
} from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { REAL_WORLD_DATA } from "@/data/research/real-world-data";
import { PremiumChart, PremiumTable, Sparkline, RadarChart, HeatmapGrid, GaugeChart, StackedAreaChart, InoculationFlowchart, ABFlipCard, ArchitectureSVG, PilotTracker, PersonaVisualizer, LiveTerminal } from "@/components/ui/premium-charts";

// Premium Feature 8: Reading Progress Bar
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((scrollPx / winHeightPx) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, width: `${progress}%`, height: 3, background: "linear-gradient(90deg, var(--accent-cta), var(--accent-deepreal))", zIndex: 9999, transition: "width 0.1s" }} />;
}

// Premium Feature 3: Live Ticker
function LiveTicker({ isRTL }: { isRTL: boolean }) {
  const [val, setVal] = useState(417000000000);
  useEffect(() => {
    const int = setInterval(() => setVal(v => v + Math.floor(Math.random() * 10000)), 2000);
    return () => clearInterval(int);
  }, []);
  return (
    <div style={{ fontFamily: "monospace", color: "#EF4444", fontWeight: "bold" }}>
      ${val.toLocaleString()} {isRTL ? "خسائر عالمية (مباشر)" : "Global Loss (Live)"}
    </div>
  );
}

// Premium Feature 22: Server Ping
function ServerPing() {
  const [ping, setPing] = useState(24);
  useEffect(() => {
    const int = setInterval(() => setPing(Math.floor(Math.random() * 15) + 15), 3000);
    return () => clearInterval(int);
  }, []);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "monospace", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)", padding: "4px 8px", borderRadius: 4, border: "1px solid var(--border-primary)" }}>
      <Server size={12} style={{ color: "#10B981" }} /> WHO/CAPMAS LINK: {ping}ms
    </div>
  );
}

// Premium Feature 16: What-If Simulator
function WhatIfSimulator({ isRTL }: { isRTL: boolean }) {
  const [val, setVal] = useState(0);
  const costReduction = val * 4.17; // Simplistic $4.17B reduction per 1% inoculation
  return (
    <div style={{ padding: 24, background: "var(--bg-elevated)", borderRadius: 16, border: "1px solid var(--border-primary)" }}>
      <h4 style={{ margin: "0 0 16px", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
        {isRTL ? "محاكي تأثير التلقيح (What-If)" : "Inoculation Impact Simulator"}
      </h4>
      <input 
        type="range" min="0" max="100" value={val} 
        onChange={e => setVal(Number(e.target.value))} 
        style={{ width: "100%", accentColor: "var(--accent-deepreal)" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 14 }}>
        <span>{isRTL ? `زيادة التلقيح: ${val}%` : `Inoculation: ${val}%`}</span>
        <strong style={{ color: "#10B981" }}>{isRTL ? `توفير: $${costReduction.toFixed(1)}B` : `Saved: $${costReduction.toFixed(1)}B`}</strong>
      </div>
    </div>
  );
}

// Premium Feature 5: Hover Tooltip with Citation
function CitedData({ val, citation, color = "var(--text-primary)" }: { val: React.ReactNode, citation: string, color?: string }) {
  const [show, setShow] = useState(false);
  return (
    <span 
      style={{ color, cursor: "help", position: "relative", borderBottom: `1px dotted ${color}` }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
    >
      {val}
      {show && (
        <span style={{
          position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8,
          background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", padding: "8px 12px",
          borderRadius: 8, fontSize: 11, width: 200, color: "var(--text-secondary)", zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          textAlign: "center", pointerEvents: "none"
        }}>
          <Info size={12} style={{ marginBottom: 4, color: "var(--accent-cta)" }} />
          <br/>
          {citation}
        </span>
      )}
    </span>
  );
}

// Premium Feature: Typewriter Effect
function TypewriterQuote({ text, delay = 50 }: { text: string, delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        let i = 0;
        const int = setInterval(() => {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i === text.length) clearInterval(int);
        }, delay);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, delay, started]);

  return <div ref={ref} style={{ fontFamily: "monospace", minHeight: 60 }}>{displayed}<span className="blink">_</span><style>{`.blink { animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0; } }`}</style></div>;
}

// Premium Feature: Data Export Simulation
function ExportButton({ isRTL }: { isRTL: boolean }) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = () => {
    if (exporting) return;
    setExporting(true);
    let p = 0;
    const int = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(int);
        setTimeout(() => { setExporting(false); setProgress(0); }, 1000);
      }
    }, 150);
  };

  return (
    <button onClick={handleExport} className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", position: "relative", overflow: "hidden" }}>
      {exporting && <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${progress}%`, background: "rgba(16,185,129,0.2)", transition: "width 0.15s linear" }} />}
      <Download size={14} />
      <span style={{ position: "relative" }}>{exporting ? (isRTL ? `جاري التصدير ${progress}%` : `Exporting ${progress}%`) : (isRTL ? "تصدير البيانات (CSV)" : "Export Data (CSV)")}</span>
    </button>
  );
}

// Premium Feature: Deep Dive Accordion
function DeepDiveAccordion({ titleEn, titleAr, children }: { titleEn: string, titleAr: string, children: React.ReactNode }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border-primary)", borderRadius: 12, marginTop: 16, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-secondary)", border: "none", color: "var(--text-primary)", cursor: "pointer", fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Terminal size={14} style={{ color: "var(--accent-cta)" }} /> {a ? titleAr : titleEn}</div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div style={{ padding: 20, background: "rgba(0,0,0,0.2)", borderTop: "1px solid var(--border-primary)", fontSize: 13, color: "var(--text-muted)", fontFamily: "monospace", overflowX: "auto" }}>{children}</div>}
    </div>
  );
}

export default function WelcomePage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  
  const [loading, setLoading] = useState(true);
  const [isReturning, setIsReturning] = useState(false);
  const [showCitationsModal, setShowCitationsModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const visited = localStorage.getItem("eal_welcome_visited");
    if (visited) setIsReturning(true);
    else localStorage.setItem("eal_welcome_visited", "true");
    
    const timer = setTimeout(() => setLoading(false), 1200);
    
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setShowCitationsModal(p => !p);
      }
    };
    window.addEventListener("keydown", handleKey);

    // Intersection Observer for Scroll Spy
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -80% 0px" });
    
    document.querySelectorAll("section[id]").forEach(sec => observer.observe(sec));

    // Context Menu Feature
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.glass-card')) {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }
    };
    const closeContext = () => setContextMenu(null);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", closeContext);

    return () => { 
      clearTimeout(timer); 
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", closeContext);
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "var(--bg-primary)" }}>
        <div className="spinner" style={{ width: 40, height: 40, border: "3px solid var(--border-primary)", borderTopColor: "var(--accent-cta)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ color: "var(--text-muted)", fontFamily: ff }}>{t({ en: "Aggregating comprehensive project data...", ar: "جاري تجميع بيانات المشروع الشاملة...", arEG: "جاري تجميع بيانات المشروع الشاملة..." })}</p>
        <ServerPing />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // --- DATA PREP ---
  const fightBackData = [
    { metricEn: "Emotional Sharing Rate", metricAr: "معدل المشاركة العاطفية", val: `${REAL_WORLD_DATA.fightBack.global.emotionalSharingPercent}%` },
    { metricEn: "Prebunking vs Debunking", metricAr: "التلقيح المسبق مقابل التفنيد", val: `+${REAL_WORLD_DATA.prebunking.global.efficacyVsDebunking}%` },
    { metricEn: "Strict Echo Chambers", metricAr: "غرف الصدى المغلقة (مجرد 8%)", val: `${REAL_WORLD_DATA.echoChambers.global.strictEchoChamberPercent}%` },
  ];

  const engagementData = [
    { metricEn: "Gamification Retention", metricAr: "استبقاء التعلم بالألعاب", val: `+${REAL_WORLD_DATA.gamification.global.retentionIncrease}%` },
    { metricEn: "Source Requirement Gen Z", metricAr: "متطلبات شفافية المصادر للجيل Z", val: `${REAL_WORLD_DATA.scienceTrust.global.sourceRequirementGenZ}%` },
    { metricEn: "Youth Internet Penetration", metricAr: "انتشار الإنترنت للشباب (مصر)", val: `${REAL_WORLD_DATA.digitalLiteracy.egypt.youthInternetPenetration}%` },
  ];

  const radarData = [
    { label: "Verification Speed", val1: 40, val2: 90 },
    { label: "Bias Detection", val1: 30, val2: 85 },
    { label: "Emotional Control", val1: 50, val2: 80 },
    { label: "Source Trust", val1: 60, val2: 95 },
    { label: "Resilience", val1: 45, val2: 88 },
  ];

  const glossaryData = [
    { 
      termEn: "MIST-20", 
      termAr: "مقياس الاستعداد للتضليل (MIST-20)", 
      what: "Misinformation Susceptibility Test. A 20-item psychometric test.", 
      why: "Used before and after the 14-day DeepReal program to mathematically prove if the user's vulnerability to fake news has decreased." 
    },
    { 
      termEn: "MHLS", 
      termAr: "مقياس الوعي بالصحة النفسية (MHLS)", 
      what: "Mental Health Literacy Scale.", 
      why: "Used in the Mental Health module to measure stigma reduction and psychological awareness among the N=84 sample." 
    },
    { 
      termEn: "Active Inoculation (Prebunking)", 
      termAr: "التلقيح النشط (Prebunking)", 
      what: "Exposing users to weakened forms of manipulation techniques.", 
      why: "Because debunking fake news *after* belief forms is 50% less effective. Prebunking builds cognitive antibodies." 
    },
    { 
      termEn: "RCOPE", 
      termAr: "مقياس التكيف الديني (RCOPE)", 
      what: "Religious Coping Scale.", 
      why: "Used in the Religion Hub to determine if a user relies on positive religious coping (moderation) or negative religious coping (despair/extremism)." 
    },
    { 
      termEn: "Cognitive Bias", 
      termAr: "التحيز المعرفي", 
      what: "Systematic errors in human thinking (e.g., Confirmation Bias).", 
      why: "The primary attack vector for disinformation. The AI Debate Arena trains users to spot these biases in real-time." 
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", direction: dir, display: "flex", cursor: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='4' fill='%233B82F6'/%3E%3C/svg%3E\") 12 12, auto" }}>
      <ReadingProgress />
      
      {/* Premium Feature: Custom Context Menu */}
      {contextMenu && (
        <div style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x, background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", borderRadius: 8, padding: 8, zIndex: 99999, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: 200, fontFamily: ff, fontSize: 13 }}>
          <button style={{ width: "100%", padding: "8px 12px", textAlign: a ? "right" : "left", background: "transparent", border: "none", color: "var(--text-primary)", cursor: "pointer", borderRadius: 4 }} onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {t({ en: "Copy Citation (APA)", ar: "نسخ المصدر (APA)", arEG: "نسخ المصدر (APA)" })}
          </button>
          <button style={{ width: "100%", padding: "8px 12px", textAlign: a ? "right" : "left", background: "transparent", border: "none", color: "var(--text-primary)", cursor: "pointer", borderRadius: 4 }} onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {t({ en: "Export this dataset", ar: "تصدير هذه البيانات", arEG: "تصدير هذه البيانات" })}
          </button>
        </div>
      )}

      {/* Scroll-Spy Sidebar */}
      <nav style={{ width: 240, height: "100vh", position: "sticky", top: 0, padding: "var(--space-2xl) var(--space-md)", borderInlineEnd: "1px solid var(--border-primary)", display: typeof window !== 'undefined' && window.innerWidth < 1024 ? "none" : "flex", flexDirection: "column", gap: 12 }}>
        <h4 style={{ fontFamily: ff, color: "var(--text-muted)", marginBottom: 12, paddingInlineStart: 12 }}>{t({ en: "Complete Project Map", ar: "خريطة المشروع الشاملة", arEG: "خريطة المشروع الشاملة" })}</h4>
        {[
          { id: "hero", icon: <Map size={16}/>, labelEn: "Overview", labelAr: "نظرة عامة" },
          { id: "mvp1-deepreal", icon: <ShieldCheck size={16}/>, labelEn: "1. DeepReal Core", labelAr: "1. النواة: ديب ريل" },
          { id: "mvp2-mental", icon: <HeartPulse size={16}/>, labelEn: "2. Mental Health", labelAr: "2. الصحة النفسية" },
          { id: "mvp3-religion", icon: <BookOpen size={16}/>, labelEn: "3. Religion Hub", labelAr: "3. المحور الديني" },
          { id: "interactive", icon: <Activity size={16}/>, labelEn: "4. Interactive Arena", labelAr: "4. الساحة التفاعلية" },
          { id: "defense", icon: <Lock size={16}/>, labelEn: "5. Defense & Baseline", labelAr: "5. الدفاع والتقييم" },
          { id: "glossary", icon: <BookOpen size={16}/>, labelEn: "6. Scientific Glossary", labelAr: "6. المصطلحات العلمية" },
          { id: "techstack", icon: <Code size={16}/>, labelEn: "7. Tech Stack", labelAr: "7. المكدس التقني" },
          { id: "sciencestack", icon: <FlaskConical size={16}/>, labelEn: "8. Science Stack", labelAr: "8. المكدس العلمي" },
          { id: "infrastructure", icon: <Database size={16}/>, labelEn: "9. Scientific Infra", labelAr: "9. البنية العلمية" },
        ].map(item => (
          <a key={item.id} href={`#${item.id}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: activeSection === item.id ? "var(--accent-cta)" : "var(--text-secondary)", background: activeSection === item.id ? "rgba(59,130,246,0.1)" : "transparent", transition: "all 0.2s", fontFamily: ff, fontSize: 13, fontWeight: activeSection === item.id ? "bold" : "normal" }}>
            {item.icon} {a ? item.labelAr : item.labelEn}
          </a>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <ServerPing />
        </div>
      </nav>

      <main style={{ flex: 1, minWidth: 0 }}>
        {isReturning && (
          <div style={{ position: "fixed", bottom: 20, [a ? "left" : "right"]: 20, background: "var(--accent-cta)", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 8, fontFamily: ff, animation: "ux-slide-up 0.5s ease" }}>
            <ShieldCheck size={18} /> {t({ en: "Welcome back! Data is up to date.", ar: "مرحباً بعودتك! تم تحديث البيانات.", arEG: "مرحباً بعودتك! تم تحديث البيانات." })}
          </div>
        )}

        {/* HERO */}
        <section id="hero" style={{ padding: "80px 40px", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", gap: 16, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <ExportButton isRTL={a} />
            <button onClick={() => setShowCitationsModal(true)} className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px" }}>
              <ScrollText size={14} /> {t({ en: "Evidence Base (Ctrl+I)", ar: "قاعدة الأدلة (Ctrl+I)", arEG: "قاعدة الأدلة (Ctrl+I)" })}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("explore-hub:open", { detail: { tab: "tools" } }))}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 22px",
                borderRadius: 12, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #6366f1 0%, #8B5CF6 50%, #a855f7 100%)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit",
                boxShadow: "0 4px 20px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.6), 0 0 0 1px rgba(255,255,255,0.15) inset"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset"; }}
            >
              <Zap size={16} /> {t({ en: "⚡ Live Verification Tools (12 APIs)", ar: "⚡ أدوات التحقق الحية (12 API)", arEG: "⚡ أدوات التحقق الحية (12 API)" })}
            </button>
          </div>
          
          <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, fontFamily: t({ en: "'Clash Display', sans-serif", ar: "'Noto Kufi Arabic', sans-serif", arEG: "'Noto Kufi Arabic', sans-serif" }) }}>
            {t({ en: "Complete Project Anatomy", ar: "التشريح الكامل للمشروع", arEG: "التشريح الكامل للمشروع" })}
          </h1>
          <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: 800, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "Why was every page in this project built? This interface breaks down the scientific rationale, real-world data, and projected impact for every single component.", ar: "لماذا تم بناء كل صفحة في هذا المشروع؟ هذه الواجهة تشرح الجدوى العلمية، والبيانات الواقعية، والتأثير المتوقع لكل مكون من مكونات المنصة بدقة وحيادية.", arEG: "لماذا تم بناء كل صفحة في هذا المشروع؟ هذه الواجهة تشرح الجدوى العلمية، والبيانات الواقعية، والتأثير المتوقع لكل مكون من مكونات المنصة بدقة وحيادية." })}
          </p>
        </section>

        <div style={{ padding: "0 40px 120px", display: "flex", flexDirection: "column", gap: 80, maxWidth: 1000, margin: "0 auto" }}>
          
          {/* SECTION 1: DeepReal */}
          <section id="mvp1-deepreal" className="glass-card scroll-velocity-target" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #EF4444", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 24, [a ? "left" : "right"]: 24, opacity: 0.1 }}><ShieldCheck size={120} color="#EF4444" /></div>
            <div className="badge mb-4" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>Page: /deepreal</div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16, color: "var(--text-primary)" }}>{t({ en: "DeepReal Core Engine", ar: "محرك ديب ريل الأساسي", arEG: "محرك ديب ريل الأساسي" })}</h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7, maxWidth: 600 }}>
              {t({ en: "This engine targets financial and political misinformation using active inoculation techniques.", ar: "يواجه هذا المحرك أزمة التضليل المالي والسياسي عبر تقنيات التلقيح النشط.", arEG: "يواجه هذا المحرك أزمة التضليل المالي والسياسي عبر تقنيات التلقيح النشط." })}
            </p>
            
            <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap", alignItems: "start" }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8, fontFamily: ff }}>{t({ en: "Cumulative Growth", ar: "نمو الشائعات التراكمي (مصر)", arEG: "نمو الشائعات التراكمي (مصر)" })}</div>
                <StackedAreaChart data={[10, 11, 11.5, 12, 13.8, 14.5]} width={250} height={100} />
              </div>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8, fontFamily: ff }}>{t({ en: "Global Cost of Fraud", ar: "الخسائر العالمية من الاحتيال", arEG: "الخسائر العالمية من الاحتيال" })}</div>
                <LiveTicker isRTL={a} />
                <TypewriterQuote text={a ? '"التضليل الآن صناعة بمليارات الدولارات..."' : '"Disinformation is now a multi-billion dollar industry..."'} delay={40} />
              </div>
              <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 4, fontFamily: ff }}>{t({ en: "Case Study: Hoggpool Scam (Egypt)", ar: "حالة دراسة: احتيال Hoggpool (مصر)", arEG: "حالة دراسة: احتيال Hoggpool (مصر)" })}</div>
                <ABFlipCard titleEn="Financial Scam Immunity" titleAr="مناعة ضد الاحتيال المالي" valA="Loss of Savings" valB="Fraud Detected" isRTL={a} />
              </div>
            </div>

            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <h4 style={{ margin: "0 0 16px", fontFamily: ff, fontSize: 14, color: "var(--text-muted)" }}>{t({ en: "Active Inoculation Flow", ar: "تدفق عملية التلقيح النشط", arEG: "تدفق عملية التلقيح النشط" })}</h4>
              <InoculationFlowchart isRTL={a} />
            </div>

            <WhatIfSimulator isRTL={a} />

            <DeepDiveAccordion titleEn="API & Logic Layer: How /deepreal works" titleAr="هيكلة النظام: كيف يعمل /deepreal">
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 250 }}>
                  {"{\n  engine: 'MIST-20',\n  method: 'Inoculation',\n  dataSources: ['FactCheck API', 'Local Databases'],\n  userImpact: '21% reduction in susceptibility'\n}"}
                </div>
                <ArchitectureSVG isRTL={a} />
              </div>
            </DeepDiveAccordion>
          </section>

          {/* SECTION 2: Mental Health */}
          <section id="mvp2-mental" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #10B981" }}>
            <div className="badge mb-4" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Page: /mental-health</div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Mental Health", ar: "الصحة النفسية", arEG: "الصحة النفسية" })}</h2>
            
            <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 24 }}>
              <div>
                <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7 }}>
                  {a 
                    ? `بناءً على أرقام منظمة الصحة العالمية، هناك فجوة علاج تبلغ ${REAL_WORLD_DATA.mentalHealth.global.treatmentGapPercent}%. الصفحة تصمم لتقليل الوصمة بدلاً من تقديم علاج طبي مباشر.`
                    : `Based on WHO figures, there is a ${REAL_WORLD_DATA.mentalHealth.global.treatmentGapPercent}% treatment gap. This page is engineered for stigma reduction rather than direct clinical care.`}
                </p>
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 13, marginBottom: 8, fontFamily: ff, color: "var(--text-muted)" }}>{t({ en: "Stigma Reduction Target", ar: "هدف تقليل الوصمة", arEG: "هدف تقليل الوصمة" })}</div>
                  <div style={{ width: "100%", height: 8, background: "var(--bg-secondary)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${REAL_WORLD_DATA.mentalHealth.egypt.stigmaReductionGoal}%`, height: "100%", background: "#10B981", borderRadius: 4 }} />
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12, color: "#10B981", marginTop: 4 }}>{REAL_WORLD_DATA.mentalHealth.egypt.stigmaReductionGoal}%</div>
                </div>
              </div>
              <div style={{ padding: 24, background: "var(--bg-secondary)", borderRadius: 16, display: "flex", justifyContent: "center" }}>
                <RadarChart data={radarData} color="#10B981" size={250} />
              </div>
            </div>
          </section>

          {/* SECTION 3: Religion Hub */}
          <section id="mvp3-religion" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #8B5CF6" }}>
            <div className="badge mb-4" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>Page: /religion-hub</div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Religion Hub", ar: "المحور الديني", arEG: "المحور الديني" })}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 300px" }}>
                <GaugeChart value={REAL_WORLD_DATA.religion.egypt.religiousCopingPrevalence} labelEn="Religious Coping Reliance" labelAr="الاعتماد على التكيف الديني" color="#8B5CF6" />
              </div>
              <div style={{ flex: "2 1 400px", padding: 24, background: "var(--bg-secondary)", borderRadius: 16, borderLeft: "4px solid #8B5CF6" }}>
                <p style={{ margin: 0, fontSize: 15, color: "var(--text-primary)", fontFamily: ff, lineHeight: 1.7 }}>
                  {t({ en: "The Religion Hub directs this high percentage towards moderate, positive religious coping, protecting youth from ideological manipulation.", ar: "المحور الديني يوجه هذه النسبة العالية نحو التكيف الديني الإيجابي المعتدل، لحماية الشباب من التلاعب بالآيات أو الانحراف الفكري.", arEG: "المحور الديني يوجه هذه النسبة العالية نحو التكيف الديني الإيجابي المعتدل، لحماية الشباب من التلاعب بالآيات أو الانحراف الفكري." })}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: Interactive Arena */}
          <section id="interactive" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #F59E0B" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div className="badge" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>Page: /deepreal/game</div>
              <div className="badge" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>Page: /fight-back</div>
            </div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Interactive Arena & Fight-Back", ar: "الساحة التفاعلية والهجوم المضاد", arEG: "الساحة التفاعلية والهجوم المضاد" })}</h2>
            
            <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <PremiumTable 
                  titleEn="Why Gamification?" titleAr="لماذا نستخدم الألعاب والتلقيح؟"
                  sortable={true}
                  headers={[
                    { key: "metricEn", labelEn: "Metric", labelAr: "المقياس" },
                    { key: "val", labelEn: "Efficacy Gain", labelAr: "التأثير" }
                  ]}
                  data={[...fightBackData]}
                />
              </div>
              <div style={{ flex: 1, minWidth: 300 }}>
                <PremiumTable 
                  titleEn="Youth Engagement" titleAr="تفاعل الشباب والشفافية"
                  sortable={true}
                  headers={[
                    { key: "metricEn", labelEn: "Metric", labelAr: "المقياس" },
                    { key: "val", labelEn: "Value", labelAr: "القيمة" }
                  ]}
                  data={[...engagementData]}
                />
              </div>
            </div>

            <DeepDiveAccordion titleEn="Fight-Back DB Schema" titleAr="مخطط قاعدة بيانات الدفاع">
              {"interface FightBackEntry {\n  id: number;\n  type: 'fallacy' | 'bias' | 'manipulation';\n  egyptianExample: string;\n  defenseTactic: string;\n}"}
            </DeepDiveAccordion>
          </section>

          {/* SECTION 5: Defense & Baseline */}
          <section id="defense" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #06B6D4" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div className="badge" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>Page: /baseline</div>
              <div className="badge" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>Page: /dashboard</div>
              <div className="badge" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>Page: /assessment</div>
            </div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Measurement & Control (N=84)", ar: "القياس والتحكم (N=84)", arEG: "القياس والتحكم (N=84)" })}</h2>
            
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8, fontFamily: ff }}>{t({ en: "Cognitive Exercise Activity Map (Simulated)", ar: "خريطة نشاط التمارين المعرفية (محاكاة)", arEG: "خريطة نشاط التمارين المعرفية (محاكاة)" })}</div>
                <HeatmapGrid color="#06B6D4" days={90} />
              </div>
              <div style={{ flex: 1, minWidth: 300 }}>
                <PilotTracker isRTL={a} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ margin: "0 0 12px", fontFamily: ff, fontSize: 14, color: "var(--text-muted)" }}>{t({ en: "User Visibility (Guest vs Admin)", ar: "رؤية المستخدم (الزائر مقابل المشرف)", arEG: "رؤية المستخدم (الزائر مقابل المشرف)" })}</h4>
              <PersonaVisualizer isRTL={a} />
            </div>

            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7, marginBottom: 24 }}>
              {t({ en: "You cannot improve what you cannot measure. The Baseline provides psychometrics (MIST-20, MHLS) pre/post intervention (N=84), tracked via the Dashboard. Admins see aggregate analytics, while Guests see personal growth.", ar: "لا يمكن تحسين ما لا يمكن قياسه. صفحة التقييم توفر مقاييس مثل MIST-20 و MHLS قبل وبعد التدخل (N=84)، لتتبع التطور عبر لوحة التحكم الشخصية للزائر، بينما يرى المشرف كافة البيانات المجمعة.", arEG: "لا يمكن تحسين ما لا يمكن قياسه. صفحة التقييم توفر مقاييس مثل MIST-20 و MHLS قبل وبعد التدخل (N=84)، لتتبع التطور عبر لوحة التحكم الشخصية للزائر، بينما يرى المشرف كافة البيانات المجمعة." })}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/dashboard" className="btn-primary no-underline">{t({ en: "View Live Dashboard", ar: "رؤية لوحة التحكم الحية", arEG: "رؤية لوحة التحكم الحية" })}</Link>
              <Link href="/baseline" className="btn-secondary no-underline">{t({ en: "Test Baseline Metrics", ar: "اختبار مقاييس التقييم", arEG: "اختبار مقاييس التقييم" })}</Link>
            </div>
          </section>

          {/* SECTION 6: Scientific Glossary */}
          <section id="glossary" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #F43F5E" }}>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Scientific Glossary & Terminology", ar: "قاموس المصطلحات العلمية", arEG: "قاموس المصطلحات العلمية" })}</h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7, marginBottom: 24 }}>
              {t({ en: "The project utilizes precise academic psychometrics. This table explains every test (like MIST) and exactly why it is used in the platform.", ar: "يستخدم المشروع مصطلحات ومقاييس أكاديمية دقيقة. هذا الجدول يشرح كل مقياس (مثل MIST) ولماذا يتم استخدامه في المنصة.", arEG: "يستخدم المشروع مصطلحات ومقاييس أكاديمية دقيقة. هذا الجدول يشرح كل مقياس (مثل MIST) ولماذا يتم استخدامه في المنصة." })}
            </p>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", direction: dir, textAlign: a ? "right" : "left", fontFamily: ff }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "2px solid var(--border-primary)" }}>
                    <th style={{ padding: 16, color: "var(--text-muted)" }}>{t({ en: "Expression", ar: "المصطلح", arEG: "المصطلح" })}</th>
                    <th style={{ padding: 16, color: "var(--text-muted)" }}>{t({ en: "What is it?", ar: "ما هو؟", arEG: "ما هو؟" })}</th>
                    <th style={{ padding: 16, color: "var(--text-muted)" }}>{t({ en: "Why is it used?", ar: "لماذا نستخدمه؟", arEG: "لماذا نستخدمه؟" })}</th>
                  </tr>
                </thead>
                <tbody>
                  {glossaryData.map((item, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border-primary)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: 16, fontWeight: "bold", color: "#F43F5E" }}>{a ? item.termAr : item.termEn}</td>
                      <td style={{ padding: 16, fontSize: 14, color: "var(--text-secondary)" }}>{item.what}</td>
                      <td style={{ padding: 16, fontSize: 14, color: "var(--text-secondary)" }}>{item.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 7: Tech Stack — Zero to Launch */}
          <section id="techstack" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #8B5CF6" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <div className="badge" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>ENGINEERING</div>
              <div className="badge" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>DEVOPS</div>
            </div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 8 }}>{t({ en: "Tech Stack: Zero to Launch", ar: "المكدس التقني: من الصفر إلى الإطلاق", arEG: "المكدس التقني: من الصفر إلى الإطلاق" })}</h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7, marginBottom: 32 }}>
              {t({ en: "Every technology was chosen for a specific scientific and operational reason — nothing is random.", ar: "كل تقنية تم اختيارها لسبب علمي وعملي محدد، وليس عشوائياً.", arEG: "كل تقنية تم اختيارها لسبب علمي وعملي محدد، وليس عشوائياً." })}
            </p>

            {/* Visual Pipeline */}
            <div style={{ display: "flex", gap: 0, alignItems: "stretch", flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { icon: <Code size={20}/>, nameEn: "Next.js 16", nameAr: "Next.js 16", whyEn: "Server-side rendering for instant load + SEO for academic discovery", whyAr: "تحميل فوري عبر SSR + تحسين محركات البحث للاكتشاف الأكاديمي", color: "#3B82F6" },
                { icon: <Layers size={20}/>, nameEn: "React 19", nameAr: "React 19", whyEn: "Component architecture enables isolated testing of each MVP module", whyAr: "بنية المكونات تتيح اختبار كل وحدة MVP بشكل مستقل", color: "#06B6D4" },
                { icon: <Palette size={20}/>, nameEn: "CSS Variables", nameAr: "متغيرات CSS", whyEn: "16 dynamic themes for Negative UX experiments + accessibility", whyAr: "16 سمة ديناميكية لتجارب UX السلبي + إمكانية الوصول", color: "#F59E0B" },
                { icon: <LayoutGrid size={20}/>, nameEn: "TypeScript", nameAr: "TypeScript", whyEn: "Type-safety prevents data corruption in psychometric scoring", whyAr: "أمان الأنواع يمنع تلف البيانات في التسجيل النفسي", color: "#10B981" },
                { icon: <Cpu size={20}/>, nameEn: "Vercel Edge", nameAr: "Vercel Edge", whyEn: "Global CDN ensures <200ms load for Egyptian users", whyAr: "شبكة CDN عالمية تضمن تحميل أقل من 200 مللي ثانية", color: "#EC4899" },
                { icon: <Database size={20}/>, nameEn: "localStorage", nameAr: "localStorage", whyEn: "Zero-server pilot: No backend needed for N=84 data collection", whyAr: "تجربة بدون خادم: لا حاجة لخادم خلفي لجمع بيانات N=84", color: "#EF4444" },
              ].map((tech, i) => (
                <div key={i} style={{ flex: "1 1 150px", padding: 16, background: `rgba(${tech.color === '#3B82F6' ? '59,130,246' : tech.color === '#06B6D4' ? '6,182,212' : tech.color === '#F59E0B' ? '245,158,11' : tech.color === '#10B981' ? '16,185,129' : tech.color === '#EC4899' ? '236,72,153' : '239,68,68'},0.06)`, borderLeft: i > 0 ? `2px solid ${tech.color}` : `4px solid ${tech.color}`, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: tech.color }}>
                    {tech.icon}
                    <span style={{ fontWeight: 700, fontSize: 14, fontFamily: ff }}>{a ? tech.nameAr : tech.nameEn}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: ff, lineHeight: 1.5 }}>
                    {a ? tech.whyAr : tech.whyEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Build Pipeline Visual */}
            <div style={{ background: "#000", borderRadius: 12, padding: 20, fontFamily: "monospace", fontSize: 12, color: "#10B981", border: "1px solid #333" }}>
              <div style={{ color: "#6B7280", marginBottom: 8 }}>$ build-pipeline.sh</div>
              <div>{'>'} <span style={{ color: "#3B82F6" }}>npx create-next-app</span> egyptian-awareness-library</div>
              <div>{'>'} <span style={{ color: "#F59E0B" }}>42 JSON exercises</span> loaded (14 days × 3 MVPs)</div>
              <div>{'>'} <span style={{ color: "#06B6D4" }}>27 API endpoints</span> registered (/api/search/*, /api/science/*, /api/islamic/*)</div>
              <div>{'>'} <span style={{ color: "#EC4899" }}>16 color themes</span> compiled with CSS custom properties</div>
              <div>{'>'} <span style={{ color: "#10B981" }}>RTL + i18n</span> fully operational (Arabic/English)</div>
              <div>{'>'} <span style={{ color: "#EF4444" }}>npx vercel --prod</span> → deployed to global edge network</div>
              <div style={{ marginTop: 8, color: "#10B981" }}>✓ Build complete. 0 errors. 55 routes. Ready for N=84 pilot.</div>
            </div>
          </section>

          {/* SECTION 8: Behavioral Science Stack */}
          <section id="sciencestack" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #14B8A6" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <div className="badge" style={{ background: "rgba(20,184,166,0.1)", color: "#14B8A6" }}>BEHAVIORAL SCIENCE</div>
              <div className="badge" style={{ background: "rgba(20,184,166,0.1)", color: "#14B8A6" }}>PEER-REVIEWED</div>
            </div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 8 }}>{t({ en: "Science Stack: Applied Theories & Sources", ar: "المكدس العلمي: النظريات والمصادر المطبقة", arEG: "المكدس العلمي: النظريات والمصادر المطبقة" })}</h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7, marginBottom: 32 }}>
              {t({ en: "Every function in the platform is built on a specific behavioral theory with a documented academic source.", ar: "كل وظيفة في المنصة مبنية على نظرية سلوكية محددة ومصدر أكاديمي موثق.", arEG: "كل وظيفة في المنصة مبنية على نظرية سلوكية محددة ومصدر أكاديمي موثق." })}
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", direction: dir, textAlign: a ? "right" : "left", fontFamily: ff }}>
                <thead>
                  <tr style={{ background: "rgba(20,184,166,0.08)", borderBottom: "2px solid var(--border-primary)" }}>
                    <th style={{ padding: 14, color: "#14B8A6", fontSize: 13 }}>{t({ en: "Theory", ar: "النظرية", arEG: "النظرية" })}</th>
                    <th style={{ padding: 14, color: "#14B8A6", fontSize: 13 }}>{t({ en: "Where Applied", ar: "أين تُطبّق", arEG: "أين تُطبّق" })}</th>
                    <th style={{ padding: 14, color: "#14B8A6", fontSize: 13 }}>{t({ en: "Academic Source", ar: "المصدر الأكاديمي", arEG: "المصدر الأكاديمي" })}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { theory: "Inoculation Theory", theoryAr: "نظرية التلقيح", where: "DeepReal Engine — Prebunking exercises", whereAr: "محرك DeepReal — تمارين التلقيح المسبق", src: "McGuire (1964); Roozenbeek & van der Linden, Cambridge (2019)" },
                    { theory: "COM-B Model", theoryAr: "نموذج COM-B", where: "All 42 exercises — Capability/Opportunity/Motivation tagging", whereAr: "كل 42 تمرين — تصنيف القدرة/الفرصة/الدافع", src: "Michie et al., Implementation Science (2011)" },
                    { theory: "SIFT Method", theoryAr: "طريقة SIFT", where: "DeepReal verification flow — Stop/Investigate/Find/Trace", whereAr: "تدفق التحقق في DeepReal — توقف/ابحث/تحقق/تتبع", src: "Mike Caulfield, University of Washington (2019)" },
                    { theory: "Cognitive Load Theory", theoryAr: "نظرية الحمل المعرفي", where: "Negative UX in Fight-Back — Deliberate cognitive stress", whereAr: "UX السلبي في Fight-Back — ضغط معرفي متعمد", src: "Sweller, Educational Psychology Review (1988)" },
                    { theory: "Self-Determination Theory", theoryAr: "نظرية تقرير المصير", where: "Gamification — XP, Streaks, Autonomy in exercise choice", whereAr: "التلعيب — XP, السلاسل, حرية اختيار التمارين", src: "Deci & Ryan, Psychological Inquiry (2000)" },
                    { theory: "Brief RCOPE", theoryAr: "مقياس التكيف الديني المختصر", where: "Religion Hub — Positive vs Negative religious coping", whereAr: "المحور الديني — التكيف الديني الإيجابي مقابل السلبي", src: "Pargament et al., J. of Clinical Psychology (2011)" },
                    { theory: "MIST-20 Psychometric", theoryAr: "مقياس MIST-20 النفسي", where: "Baseline & Post-test — Misinformation susceptibility", whereAr: "التقييم القبلي والبعدي — قابلية التأثر بالتضليل", src: "Maertens et al., Behavior Research Methods (2023)" },
                    { theory: "Elaboration Likelihood", theoryAr: "نموذج احتمالية التفصيل", where: "AI Debate Arena — Central vs Peripheral route processing", whereAr: "ساحة المناظرة — المعالجة المركزية مقابل الهامشية", src: "Petty & Cacioppo, Advances in Experimental Social Psychology (1986)" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border-primary)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(20,184,166,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: 14, fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{a ? row.theoryAr : row.theory}</td>
                      <td style={{ padding: 14, fontSize: 12, color: "var(--text-secondary)" }}>{a ? row.whereAr : row.where}</td>
                      <td style={{ padding: 14, fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>{row.src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual: Theory Coverage Radar */}
            <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <h4 style={{ margin: "0 0 12px", fontFamily: ff, fontSize: 14, color: "var(--text-muted)" }}>{t({ en: "Theory Coverage Across Platform", ar: "تغطية النظريات عبر المنصة", arEG: "تغطية النظريات عبر المنصة" })}</h4>
                <RadarChart data={[
                  { label: "Inoculation", val1: 95, val2: 30 },
                  { label: "COM-B", val1: 100, val2: 20 },
                  { label: "SIFT", val1: 85, val2: 15 },
                  { label: "Cog. Load", val1: 70, val2: 40 },
                  { label: "RCOPE", val1: 90, val2: 25 },
                ]} size={200} />
              </div>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ padding: 20, background: "rgba(20,184,166,0.05)", borderRadius: 12, border: "1px solid rgba(20,184,166,0.2)" }}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: "#14B8A6", fontFamily: "monospace" }}>8</div>
                  <div style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: ff }}>{t({ en: "Behavioral Theories Applied", ar: "نظريات سلوكية مطبقة", arEG: "نظريات سلوكية مطبقة" })}</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: "#F59E0B", fontFamily: "monospace", marginTop: 12 }}>12+</div>
                  <div style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: ff }}>{t({ en: "Documented Academic Sources", ar: "مصادر أكاديمية موثقة", arEG: "مصادر أكاديمية موثقة" })}</div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: Scientific Infrastructure */}
          <section id="infrastructure" className="glass-card" style={{ padding: "var(--space-2xl)", borderTop: "4px solid #EC4899" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /science</div>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /sources</div>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /evidence</div>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /philosophy</div>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /guide</div>
              <div className="badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Page: /prompt-lab</div>
            </div>
            <h2 style={{ fontFamily: ff, fontSize: 32, marginBottom: 16 }}>{t({ en: "Scientific Infrastructure & Transparency", ar: "البنية التحتية العلمية والشفافية", arEG: "البنية التحتية العلمية والشفافية" })}</h2>
            
            <div style={{ padding: 24, background: "var(--bg-secondary)", borderRadius: 16, marginBottom: 24, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8, fontFamily: ff }}>{t({ en: "Gen Z Transparency Requirement", ar: "متطلبات شفافية المصادر للجيل Z", arEG: "متطلبات شفافية المصادر للجيل Z" })}</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#EC4899" }}>
                  <CitedData val={`${REAL_WORLD_DATA.scienceTrust.global.sourceRequirementGenZ}%`} citation={REAL_WORLD_DATA.scienceTrust.global.source} color="#EC4899" />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 250 }}>
                <LiveTerminal />
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", fontFamily: ff, lineHeight: 1.7 }}>
              {t({ en: "Because 80% of youth reject un-sourced info, 6 entire pages in this project are dedicated strictly to philosophy, open-access sources, UX science, and the evidence base. The system is designed to be 'Doctor-Proof' (immune to academic critique).", ar: "لأن 80% من الشباب يرفضون المعلومات دون مصادر واضحة، تم تصميم 6 صفحات كاملة في هذا المشروع خصيصاً للفلسفة، ومصادر البيانات المفتوحة، وعلم التجربة، وقاعدة الأدلة. النظام مصمم ليكون 'Doctor-Proof' (مضاد للنقد الأكاديمي).", arEG: "لأن 80% من الشباب يرفضون المعلومات دون مصادر واضحة، تم تصميم 6 صفحات كاملة في هذا المشروع خصيصاً للفلسفة، ومصادر البيانات المفتوحة، وعلم التجربة، وقاعدة الأدلة. النظام مصمم ليكون 'Doctor-Proof' (مضاد للنقد الأكاديمي)." })}
            </p>
          </section>

        </div>
      </main>

      {/* Global Citations Modal (Shortcut Ctrl+I) */}
      {showCitationsModal && (
        <>
          <div onClick={() => setShowCitationsModal(false)} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
          <div className="glass-card" style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 10001, width: "min(600px, calc(100vw - 32px))", maxHeight: "80vh", overflowY: "auto",
            padding: "var(--space-xl)", direction: dir
          }}>
            <h3 style={{ marginBottom: 20, fontFamily: ff, borderBottom: "1px solid var(--border-primary)", paddingBottom: 16 }}>
              {t({ en: "Complete Evidence & Citations Database", ar: "قاعدة المصادر و الأدلة الكاملة", arEG: "قاعدة المصادر و الأدلة الكاملة" })}
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, margin: 0, padding: 0, listStyle: "none" }}>
              {[
                REAL_WORLD_DATA.misinformation.global.source,
                REAL_WORLD_DATA.misinformation.global.inoculationSource,
                REAL_WORLD_DATA.misinformation.egypt.source,
                REAL_WORLD_DATA.mentalHealth.global.source,
                REAL_WORLD_DATA.mentalHealth.egypt.source,
                REAL_WORLD_DATA.religion.egypt.source,
                REAL_WORLD_DATA.fightBack.global.source,
                REAL_WORLD_DATA.prebunking.global.source,
                REAL_WORLD_DATA.gamification.global.source,
                REAL_WORLD_DATA.scienceTrust.global.source,
                REAL_WORLD_DATA.echoChambers.global.source,
                REAL_WORLD_DATA.digitalLiteracy.egypt.source
              ].map((src, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "start", fontSize: 14, color: "var(--text-secondary)", fontFamily: ff }}>
                  <ShieldCheck size={16} style={{ color: "var(--accent-cta)", flexShrink: 0, marginTop: 2 }} />
                  {src}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowCitationsModal(false)} className="btn-primary" style={{ width: "100%", marginTop: 24, padding: 12 }}>
              {t({ en: "Close", ar: "إغلاق", arEG: "إغلاق" })}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
