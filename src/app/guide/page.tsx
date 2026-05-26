"use client";

import { useRTL } from "@/components/shared/rtl-provider";
import { GUIDE, s } from "@/data/i18n/site-strings";
import {
  ArrowRight,
  Map,
  ShieldCheck,
  Brain,
  Sparkles,
  BarChart,
  Lightbulb,
  CheckCircle2,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  FlaskConical,
  Target,
  Eye,
  Zap,
  Search,
  Scale,
  HeartPulse,
  MessageCircle,
  Globe,
  BookOpen,
  Gauge,
  TrendingUp,
  Users,
  AlertCircle,
  Layers,
  ClipboardCheck
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function GuidePage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--navbar-height)", direction: dir }}>
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden" style={{ padding: "80px 0 60px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ position: "absolute", top: "-50%", left: "-10%", width: "600px", height: "600px", background: "var(--hero-orb-1)", opacity: 0.4, filter: "blur(80px)", pointerEvents: "none" }} />
        
        <div className="container relative z-10 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 mb-6" style={{ padding: "6px 16px", borderRadius: "var(--radius-full)", background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", fontFamily: ff }}>
            <Map size={16} style={{ color: "var(--accent-cta)" }} />
            {s(GUIDE.startHere, a)}
          </div>
          
          <h1 className="text-display" style={{ marginBottom: "24px" }}>
            {s(GUIDE.title, a)}
          </h1>
          
          <p style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6, fontFamily: ff }}>
            {s(GUIDE.subtitle, a)}
          </p>
        </div>
      </section>

      {/* WHY DIFFERENT SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Lightbulb className="inline-block mb-1 mx-2 text-gradient" size={28} />
              {s(GUIDE.whyDifferent, a)}
            </h2>
          </div>

          <div className="grid gap-6 animate-on-scroll" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="glass-card" style={{ padding: "var(--space-xl)", borderTop: "3px solid var(--accent-deepreal)" }}>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} style={{ color: "var(--accent-deepreal)" }} />
                <h3 style={{ fontSize: "18px", fontFamily: ff }}>{s(GUIDE.engineIntegration, a)}</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, fontFamily: ff }}>
                {s(GUIDE.diff1, a)}
              </p>
            </div>

            <div className="glass-card" style={{ padding: "var(--space-xl)", borderTop: "3px solid var(--accent-mentalhealth)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Brain size={24} style={{ color: "var(--accent-mentalhealth)" }} />
                <h3 style={{ fontSize: "18px", fontFamily: ff }}>{s(GUIDE.evidenceLogic, a)}</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, fontFamily: ff }}>
                {s(GUIDE.diff2, a)}
              </p>
            </div>

            <div className="glass-card" style={{ padding: "var(--space-xl)", borderTop: "3px solid var(--accent-religionhub)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} style={{ color: "var(--accent-religionhub)" }} />
                <h3 style={{ fontSize: "18px", fontFamily: ff }}>{s(GUIDE.egyptianContext, a)}</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, fontFamily: ff }}>
                {s(GUIDE.diff3, a)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHICAL PILLARS SECTION */}
      <section className="section-padding relative overflow-hidden" style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}>
        {/* Animated Background Orbs */}
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "300px", height: "300px", background: "var(--accent-cta)", opacity: 0.1, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "20%", width: "400px", height: "400px", background: "var(--accent-mentalhealth)", opacity: 0.1, filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Sparkles className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--color-warning)" }} />
              {s(GUIDE.philosophyTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.philosophyDesc, a)}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 animate-on-scroll">
            {/* Pillar 1 */}
            <div className="glass-card flex flex-col items-center text-center group" style={{ padding: "var(--space-2xl)", transition: "all 0.3s ease", border: "1px solid var(--border-subtle)" }}>
              <div className="mb-6 relative">
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--accent-deepreal)", zIndex: 2, position: "relative" }}>
                  <Brain size={36} style={{ color: "var(--accent-deepreal)" }} />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "var(--accent-deepreal)", animationDuration: "3s" }}></div>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: ff, color: "var(--text-primary)" }}>{s(GUIDE.phil1Title, a)}</h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: ff }}>{s(GUIDE.phil1Desc, a)}</p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card flex flex-col items-center text-center group" style={{ padding: "var(--space-2xl)", transition: "all 0.3s ease", border: "1px solid var(--border-subtle)" }}>
              <div className="mb-6 relative">
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--accent-mentalhealth)", zIndex: 2, position: "relative" }}>
                  <ShieldCheck size={36} style={{ color: "var(--accent-mentalhealth)" }} />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "var(--accent-mentalhealth)", animationDuration: "3s", animationDelay: "1s" }}></div>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: ff, color: "var(--text-primary)" }}>{s(GUIDE.phil2Title, a)}</h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: ff }}>{s(GUIDE.phil2Desc, a)}</p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card flex flex-col items-center text-center group" style={{ padding: "var(--space-2xl)", transition: "all 0.3s ease", border: "1px solid var(--border-subtle)" }}>
              <div className="mb-6 relative">
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--accent-religionhub)", zIndex: 2, position: "relative" }}>
                  <Map size={36} style={{ color: "var(--accent-religionhub)" }} />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "var(--accent-religionhub)", animationDuration: "3s", animationDelay: "2s" }}></div>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: ff, color: "var(--text-primary)" }}>{s(GUIDE.phil3Title, a)}</h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: ff }}>{s(GUIDE.phil3Desc, a)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH CHARTS & LOGIC SECTION */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <BarChart className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--color-info)" }} />
              {s(GUIDE.chartsTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.theLogic, a)} — {s(GUIDE.logicDesc, a)}
            </p>
          </div>

          <div className="glass-card animate-on-scroll mb-8" style={{ padding: "var(--space-2xl)" }}>
            <h3 style={{ marginBottom: "24px", textAlign: "center", fontFamily: ff }}>{s(GUIDE.experimentalWorkflow, a)}</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6" style={{ direction: dir }}>
              {/* Day 0 */}
              <div className="flex-1 text-center w-full">
                <div style={{ background: "var(--bg-elevated)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--accent-cta)" }}>
                  <div className="text-xl font-bold mb-2">{s(GUIDE.day0, a)}</div>
                  <div className="text-sm text-muted">{s(GUIDE.day0Desc, a)}</div>
                  <div className="text-xs opacity-70 mt-2">{s(GUIDE.day0Items, a)}</div>
                </div>
              </div>
              
              <div className="hidden md:block opacity-50"><ArrowRight size={24} style={{ transform: a ? "rotate(180deg)" : "none" }} /></div>
              <div className="block md:hidden opacity-50"><ArrowRight size={24} style={{ transform: "rotate(90deg)" }} /></div>

              {/* Day 1-14 */}
              <div className="flex-1 text-center w-full">
                <div style={{ background: "var(--bg-elevated)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--accent-mentalhealth)" }}>
                  <div className="text-xl font-bold mb-2">1-14</div>
                  <div className="text-sm text-muted">{s(GUIDE.day1_14Desc, a)}</div>
                  <div className="text-xs opacity-70 mt-2">{s(GUIDE.day1_14Items, a)}</div>
                </div>
              </div>

              <div className="hidden md:block opacity-50"><ArrowRight size={24} style={{ transform: a ? "rotate(180deg)" : "none" }} /></div>
              <div className="block md:hidden opacity-50"><ArrowRight size={24} style={{ transform: "rotate(90deg)" }} /></div>

              {/* Day 15 */}
              <div className="flex-1 text-center w-full">
                <div style={{ background: "var(--bg-elevated)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--accent-religionhub)" }}>
                  <div className="text-xl font-bold mb-2">{s(GUIDE.day15, a)}</div>
                  <div className="text-sm text-muted">{s(GUIDE.day15Desc, a)}</div>
                  <div className="text-xs opacity-70 mt-2">{s(GUIDE.day15Items, a)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-on-scroll">
            <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <h4 style={{ marginBottom: "16px", fontFamily: ff }}>
                <TrendingUp className="inline-block mb-1" size={18} style={{ color: "var(--accent-cta)", marginRight: "8px" }} />
                {s(GUIDE.expectedImpact, a)}
              </h4>
              
              {/* Calibrated Chart — matches protocol target of ≥15% improvement */}
              <div style={{ display: "flex", alignItems: "flex-end", height: "150px", gap: "20px", padding: "10px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "100%", height: "60%", background: "var(--text-muted)", borderRadius: "4px 4px 0 0", opacity: 0.85, boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)", position: "relative" }}>
                    <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "11px", fontWeight: "bold", color: "var(--text-primary)", opacity: 0.7 }}>60%</span>
                  </div>
                  <span style={{ fontSize: "12px", fontFamily: ff }}>{s(GUIDE.pre, a)}</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "100%", height: "75%", background: "var(--accent-cta)", borderRadius: "4px 4px 0 0", boxShadow: "0 -5px 15px var(--accent-cta-glow)", position: "relative" }}>
                    <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "11px", fontWeight: "bold", color: "#fff" }}>75%</span>
                  </div>
                  <span style={{ fontSize: "12px", fontFamily: ff }}>{s(GUIDE.post, a)}</span>
                </div>
                <div style={{ position: "absolute", right: "16px", top: "16px", fontSize: "11px", color: "var(--accent-cta)", fontWeight: "bold", fontFamily: ff }}>+15%</div>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px", textAlign: "center", fontFamily: ff }}>
                {s(GUIDE.impactDesc, a)}
              </p>
            </div>

            <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <h4 style={{ marginBottom: "16px", fontFamily: ff }}>
                <Gauge className="inline-block mb-1" size={18} style={{ color: "var(--color-warning)", marginRight: "8px" }} />
                {s(GUIDE.scoreChange, a)}
              </h4>
              
              {/* Pre/Post Paired t-test — grounded in actual protocol methodology */}
              <div style={{ display: "flex", alignItems: "flex-end", height: "150px", gap: "12px", padding: "10px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)" }}>
                {[{label: 'MIST-20', pre: '55%', post: '70%', preH: '55%', postH: '70%', color: 'var(--accent-deepreal)'}, {label: 'MHLS', pre: '50%', post: '65%', preH: '50%', postH: '65%', color: 'var(--accent-mentalhealth)'}, {label: 'RCOPE+', pre: '45%', post: '60%', preH: '45%', postH: '60%', color: 'var(--accent-religionhub)'}].map((m, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ display: "flex", gap: "4px", width: "100%", alignItems: "flex-end", height: "100px" }}>
                      <div style={{ flex: 1, height: m.preH, background: "var(--text-muted)", borderRadius: "3px 3px 0 0", opacity: 0.6 }}></div>
                      <div style={{ flex: 1, height: m.postH, background: m.color, borderRadius: "3px 3px 0 0", boxShadow: `0 -4px 12px ${m.color}33` }}></div>
                    </div>
                    <span style={{ fontSize: "10px", fontFamily: ff, fontWeight: "bold" }}>{m.label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px", textAlign: "center", fontFamily: ff }}>
                {s(GUIDE.scoreChangeDesc, a)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FALSIFIABLE HYPOTHESES SECTION */}
      <section className="section-padding relative overflow-hidden">
        <div style={{ position: "absolute", top: "50%", left: "50%", width: "500px", height: "500px", background: "var(--accent-deepreal)", opacity: 0.06, filter: "blur(120px)", borderRadius: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <FlaskConical className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--accent-deepreal)" }} />
              {s(GUIDE.hypothesesTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.hypothesesDesc, a)}
            </p>
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto animate-on-scroll">
            {[
              { key: 'h1', color: 'var(--accent-deepreal)', icon: <Brain size={20} /> },
              { key: 'h2', color: 'var(--accent-mentalhealth)', icon: <HeartPulse size={20} /> },
              { key: 'h3', color: 'var(--accent-religionhub)', icon: <BookOpen size={20} /> },
              { key: 'h4', color: 'var(--accent-cta)', icon: <Zap size={20} /> },
              { key: 'h5', color: 'var(--color-warning)', icon: <Gauge size={20} /> },
            ].map((h, i) => (
              <div key={i} className="glass-card flex items-center gap-4 p-5" style={{ direction: dir, borderLeft: a ? 'none' : `3px solid ${h.color}`, borderRight: a ? `3px solid ${h.color}` : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${h.color}`, color: h.color }}>
                  {h.icon}
                </div>
                <p style={{ fontSize: "15px", fontFamily: ff, color: "var(--text-primary)", margin: 0 }}>{s((GUIDE as any)[h.key], a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS CRITERIA SECTION */}
      <section className="section-padding" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Target className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--color-success)" }} />
              {s(GUIDE.successTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.successDesc, a)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 animate-on-scroll">
            {[
              { label: 'MIST-20', min: '>0%', tgt: '≥15%', str: '≥25%', color: 'var(--accent-deepreal)' },
              { label: 'MHLS', min: 'p<0.05', tgt: 'd≥0.5', str: 'd≥0.8', color: 'var(--accent-mentalhealth)' },
              { label: 'RCOPE+', min: 'p<0.05', tgt: 'd≥0.3', str: 'd≥0.5', color: 'var(--accent-religionhub)' },
              { label: 'SUS', min: '≥68', tgt: '≥75', str: '≥80', color: 'var(--color-warning)' },
              { label: 'Completion', min: '≥50%', tgt: '≥65%', str: '≥80%', color: 'var(--accent-cta)' },
              { label: 'Expert CVI', min: '≥0.78', tgt: '≥0.85', str: '≥0.95', color: 'var(--color-success)' },
            ].map((c, i) => (
              <div key={i} className="glass-card p-5 flex flex-col items-center text-center" style={{ borderTop: `3px solid ${c.color}` }}>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: c.color, marginBottom: "12px", fontFamily: ff }}>{c.label}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "4px 8px", borderRadius: "4px", background: "var(--bg-primary)" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.minimum, a)}</span>
                    <span style={{ fontWeight: "bold", fontFamily: "monospace" }}>{c.min}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "4px 8px", borderRadius: "4px", background: "var(--bg-primary)" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.target, a)}</span>
                    <span style={{ fontWeight: "bold", color: c.color, fontFamily: "monospace" }}>{c.tgt}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "4px 8px", borderRadius: "4px", background: "var(--bg-primary)" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.stretch, a)}</span>
                    <span style={{ fontWeight: "bold", color: "var(--color-success)", fontFamily: "monospace" }}>{c.str}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COGNITIVE DEFENSE LENSES SECTION */}
      <section className="section-padding relative overflow-hidden">
        <div style={{ position: "absolute", bottom: "0", right: "0", width: "400px", height: "400px", background: "var(--accent-religionhub)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Eye className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--accent-cta)" }} />
              {s(GUIDE.cogDefenseTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.cogDefenseDesc, a)}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-on-scroll">
            {[
              { icon: <Zap size={22} />, label: a ? 'ضغط الاستعجال' : 'Urgency', color: 'var(--color-error)' },
              { icon: <Search size={22} />, label: a ? 'سلسلة المصدر' : 'Source Chain', color: 'var(--accent-deepreal)' },
              { icon: <Eye size={22} />, label: a ? 'سلامة السياق' : 'Context', color: 'var(--accent-mentalhealth)' },
              { icon: <Scale size={22} />, label: a ? 'اختبار السلطة' : 'Authority', color: 'var(--color-warning)' },
              { icon: <HeartPulse size={22} />, label: a ? 'تنظيم الانفعال' : 'Emotion', color: 'var(--accent-religionhub)' },
              { icon: <BarChart size={22} />, label: a ? 'فئة الدليل' : 'Evidence', color: 'var(--accent-cta)' },
              { icon: <Brain size={22} />, label: a ? 'احتكاك الانحياز' : 'Bias', color: 'var(--color-error)' },
              { icon: <Globe size={22} />, label: a ? 'انضباط الترجمة' : 'Translation', color: 'var(--accent-deepreal)' },
              { icon: <MessageCircle size={22} />, label: a ? 'توجيه المخاطر' : 'Risk Route', color: 'var(--accent-mentalhealth)' },
              { icon: <CheckCircle2 size={22} />, label: a ? 'عادة الصيانة' : 'Habit', color: 'var(--color-success)' },
            ].map((lens, i) => (
              <div key={i} className="glass-card flex flex-col items-center justify-center text-center p-4 group" style={{ minHeight: "100px", transition: "all 0.3s ease", cursor: "default" }}>
                <div style={{ color: lens.color, marginBottom: "8px", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                  {lens.icon}
                </div>
                <span style={{ fontSize: "12px", fontWeight: "bold", fontFamily: ff, color: "var(--text-primary)" }}>{lens.label}</span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINE DEEP-DIVE SECTION */}
      <section className="section-padding" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Layers className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--accent-cta)" }} />
              {s(GUIDE.engineDeepTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.engineDeepDesc, a)}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 animate-on-scroll">
            {[
              { title: GUIDE.engineDR, desc: GUIDE.engineDRDesc, color: 'var(--accent-deepreal)', icon: <ShieldCheck size={32} />, fNum: '10', eNum: '100' },
              { title: GUIDE.engineMH, desc: GUIDE.engineMHDesc, color: 'var(--accent-mentalhealth)', icon: <HeartPulse size={32} />, fNum: '10', eNum: '100' },
              { title: GUIDE.engineRH, desc: GUIDE.engineRHDesc, color: 'var(--accent-religionhub)', icon: <BookOpen size={32} />, fNum: '10', eNum: '100' },
            ].map((eng, i) => (
              <div key={i} className="glass-card flex flex-col" style={{ padding: "var(--space-xl)", borderTop: `3px solid ${eng.color}`, direction: dir }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ color: eng.color }}>{eng.icon}</div>
                  <h3 style={{ fontSize: "22px", fontFamily: ff, color: "var(--text-primary)", margin: 0 }}>{s(eng.title, a)}</h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, fontFamily: ff, flex: 1 }}>{s(eng.desc, a)}</p>
                <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: eng.color }}>{eng.fNum}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.foundations, a)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: eng.color }}>{eng.eNum}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.exercises, a)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLING STRATEGY SECTION */}
      <section className="section-padding relative overflow-hidden">
        <div style={{ position: "absolute", top: "30%", right: "10%", width: "350px", height: "350px", background: "var(--accent-cta)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <Users className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--color-warning)" }} />
              {s(GUIDE.samplingTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.samplingDesc, a)}
            </p>
          </div>

          <div className="max-w-3xl mx-auto animate-on-scroll">
            {/* Big N Card */}
            <div className="glass-card text-center p-8 mb-6" style={{ border: "1px solid var(--accent-cta)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, var(--accent-deepreal), var(--accent-mentalhealth), var(--accent-religionhub))" }} />
              <div style={{ fontSize: "56px", fontWeight: "bold", color: "var(--accent-cta)", lineHeight: 1 }}>84</div>
              <div style={{ fontSize: "18px", fontWeight: "bold", fontFamily: ff, marginTop: "8px" }}>{s(GUIDE.sampN, a)}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "monospace", marginTop: "8px" }}>{s(GUIDE.sampNDesc, a)}</div>
            </div>

            {/* Group Allocation */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-5 text-center" style={{ borderLeft: a ? 'none' : '3px solid var(--accent-cta)', borderRight: a ? '3px solid var(--accent-cta)' : 'none' }}>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-cta)" }}>42</div>
                <div style={{ fontSize: "14px", fontFamily: ff, marginTop: "4px" }}>{a ? 'المجموعة أ: 3 محركات' : 'Group A: All 3 Engines'}</div>
              </div>
              <div className="glass-card p-5 text-center" style={{ borderLeft: a ? 'none' : '3px solid var(--text-muted)', borderRight: a ? '3px solid var(--text-muted)' : 'none' }}>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--text-muted)" }}>42</div>
                <div style={{ fontSize: "14px", fontFamily: ff, marginTop: "4px" }}>{a ? 'المجموعة ب: قائمة انتظار' : 'Group B: Waitlist Control'}</div>
              </div>
            </div>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="glass-card px-4 py-2" style={{ fontSize: "13px", fontFamily: ff, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Users size={14} style={{ color: "var(--accent-mentalhealth)" }} />
                {s(GUIDE.sampTarget, a)}
              </span>
              <span className="glass-card px-4 py-2" style={{ fontSize: "13px", fontFamily: ff, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} style={{ color: "var(--accent-cta)" }} />
                {s(GUIDE.sampCommit, a)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BIAS LIBRARY SECTION */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <AlertCircle className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--color-error)" }} />
              {s(GUIDE.biasTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.biasDesc, a)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-on-scroll">
            {[
              { title: GUIDE.biasDeepfake, count: 10, frames: 10, combos: 100, color: 'var(--accent-deepreal)', icon: <ShieldCheck size={24} /> },
              { title: GUIDE.biasCognitive, count: 10, frames: 10, combos: 100, color: 'var(--accent-mentalhealth)', icon: <Brain size={24} /> },
              { title: GUIDE.biasReligious, count: 10, frames: 10, combos: 100, color: 'var(--accent-religionhub)', icon: <BookOpen size={24} /> },
            ].map((b, i) => (
              <div key={i} className="glass-card p-6" style={{ direction: dir }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ color: b.color }}>{b.icon}</div>
                  <h4 style={{ fontFamily: ff, margin: 0, fontSize: "16px" }}>{s(b.title, a)}</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center" style={{ fontSize: "13px" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.biasPatterns, a)}</span>
                    <span style={{ fontWeight: "bold", color: b.color }}>{b.count}</span>
                  </div>
                  <div className="flex justify-between items-center" style={{ fontSize: "13px" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.biasFrames, a)}</span>
                    <span style={{ fontWeight: "bold", color: b.color }}>{b.frames}</span>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", marginTop: "4px" }}>
                    <div className="flex justify-between items-center" style={{ fontSize: "13px" }}>
                      <span style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.biasCombinations, a)}</span>
                      <span style={{ fontWeight: "bold", fontSize: "16px", color: b.color }}>{b.combos}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-center animate-on-scroll">
            <div className="glass-card inline-block px-8 py-4" style={{ border: "1px solid var(--border-primary)" }}>
              <span style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: ff }}>{s(GUIDE.biasTotal, a)}: </span>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "var(--accent-cta)" }}>300</span>
              <span style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: ff }}> {s(GUIDE.biasCombinations, a)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVALUATION PROTOCOL SECTION */}
      <section className="section-padding relative overflow-hidden">
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "300px", height: "300px", background: "var(--accent-mentalhealth)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 style={{ marginBottom: "16px" }}>
              <ClipboardCheck className="inline-block mb-1 mx-2" size={28} style={{ color: "var(--accent-mentalhealth)" }} />
              {s(GUIDE.evalTitle, a)}
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", fontFamily: ff }}>
              {s(GUIDE.evalDesc, a)}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto animate-on-scroll">
            {[
              { title: GUIDE.evalQuant, method: a ? 'قبلي/بعدي شبه تجريبي' : 'Pre/Post Quasi-Experiment', color: 'var(--accent-deepreal)', num: '1' },
              { title: GUIDE.evalQual, method: a ? '3 أسئلة مفتوحة + مقابلات' : '3 Open Questions + Interviews', color: 'var(--accent-mentalhealth)', num: '2' },
              { title: GUIDE.evalUsability, method: a ? 'استبيان SUS + 5 مهام' : 'SUS + 5-Task Usability Test', color: 'var(--color-warning)', num: '3' },
              { title: GUIDE.evalExpert, method: a ? '3 خبراء يراجعون المحتوى' : '3 Domain Experts Review', color: 'var(--accent-religionhub)', num: '4' },
              { title: GUIDE.evalTechnical, method: a ? 'قائمة فحص وظيفية' : 'Feature Checklist Testing', color: 'var(--accent-cta)', num: '5' },
            ].map((ev, i) => (
              <div key={i} className="glass-card p-5 flex flex-col items-center text-center" style={{ borderBottom: `3px solid ${ev.color}` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${ev.color}`, marginBottom: "12px" }}>
                  <span style={{ fontWeight: "bold", color: ev.color, fontSize: "14px" }}>{ev.num}</span>
                </div>
                <h4 style={{ fontSize: "14px", fontFamily: ff, color: "var(--text-primary)", marginBottom: "8px" }}>{s(ev.title, a)}</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: ff, margin: 0 }}>{ev.method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE GUIDE */}
      <section className="section-padding">
        <div className="container text-center mb-10 animate-on-scroll">
          <h2 style={{ marginBottom: "16px" }}>
            <LayoutDashboard className="inline-block mb-1 mx-2 text-gradient" size={28} />
            {s(GUIDE.howToUse, a)}
          </h2>
        </div>

        <div className="container max-w-4xl mx-auto">
          <div className="grid gap-6 animate-on-scroll">
            
            {/* Step 1 */}
            <div className="glass-card flex items-start gap-4 p-6" style={{ direction: dir }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent-cta-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent-cta)" }}>1</span>
              </div>
              <div>
                <h4 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: ff }}>{s(GUIDE.step1, a)}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontFamily: ff }}>
                  {s(GUIDE.step1Desc, a)}
                </p>
                <Link href="/baseline" className="inline-flex items-center gap-2 mt-4 text-sm font-bold no-underline" style={{ color: "var(--accent-cta)" }}>
                  {s(GUIDE.goToBaseline, a)} <ArrowRight size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card flex items-start gap-4 p-6" style={{ direction: dir }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent-mentalhealth)" }}>2</span>
              </div>
              <div>
                <h4 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: ff }}>{s(GUIDE.step2, a)}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontFamily: ff }}>
                  {s(GUIDE.step2Desc, a)}
                </p>
                <Link href="/dashboard" className="inline-flex items-center gap-2 mt-4 text-sm font-bold no-underline" style={{ color: "var(--accent-mentalhealth)" }}>
                  {s(GUIDE.goToDashboard, a)} <ArrowRight size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card flex items-start gap-4 p-6" style={{ direction: dir }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent-religionhub)" }}>3</span>
              </div>
              <div>
                <h4 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: ff }}>{s(GUIDE.step3, a)}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontFamily: ff }}>
                  {s(GUIDE.step3Desc, a)}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="glass-card flex items-start gap-4 p-6" style={{ direction: dir }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--text-primary)" }}>4</span>
              </div>
              <div>
                <h4 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: ff }}>{s(GUIDE.step4, a)}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontFamily: ff }}>
                  {s(GUIDE.step4Desc, a)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center animate-on-scroll">
        <div className="container">
          <h2 style={{ marginBottom: "24px", fontFamily: ff }}>{s(GUIDE.ready, a)}</h2>
          <Link href="/dashboard" className="btn-primary" style={{ padding: "16px 32px", fontSize: "18px", fontFamily: ff }}>
            {s(GUIDE.goToDashboard, a)} <ArrowRight size={20} style={{ transform: a ? "rotate(180deg)" : "none" }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
