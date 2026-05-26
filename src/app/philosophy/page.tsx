"use client";

import { useRTL } from "@/components/shared/rtl-provider";
import { GUIDE, s } from "@/data/i18n/site-strings";
import {
  Brain, ShieldCheck, HeartPulse, BookOpen, Eye, Zap, Target,
  ArrowRight, Sparkles, Scale, Globe, Search, MessageCircle,
  CheckCircle2, Users, Layers, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function PhilosophyPage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "var(--navbar-height)", direction: dir, fontFamily: ff, minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "600px", background: "var(--accent-cta)", opacity: 0.08, filter: "blur(120px)", borderRadius: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="ux-float" style={{ display: "inline-block", marginBottom: "24px" }}>
            <Eye size={56} style={{ color: "var(--accent-cta)" }} />
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, marginBottom: "24px" }}>
            {t({ en: "The Project Philosophy", ar: "فلسفة المشروع", arEG: "فلسفة المشروع" })}
          </h1>
          <p style={{ fontSize: "20px", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
            {t({ en: "How we build real cognitive resilience through three integrated engines, powered by evidence-based psychology.", ar: "كيف نبني مرونة معرفية حقيقية من خلال ثلاثة محركات متكاملة، مدعومة بعلم النفس القائم على الأدلة.", arEG: "كيف نبني مرونة معرفية حقيقية من خلال ثلاثة محركات متكاملة، مدعومة بعلم النفس القائم على الأدلة." })}
          </p>
        </div>
      </section>

      {/* CORE TRIANGLE — 3 Engines Visual */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container animate-on-scroll">
          <h2 className="text-center" style={{ marginBottom: "48px" }}>
            <Layers className="inline-block mx-2" size={28} style={{ color: "var(--accent-cta)" }} />
            {t({ en: "The Core Triangle", ar: "المثلث الأساسي", arEG: "المثلث الأساسي" })}
          </h2>

          <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto", height: "400px" }}>
            {/* Connecting lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <line x1="50%" y1="15%" x2="15%" y2="85%" stroke="var(--border-primary)" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="50%" y1="15%" x2="85%" y2="85%" stroke="var(--border-primary)" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="15%" y1="85%" x2="85%" y2="85%" stroke="var(--border-primary)" strokeWidth="1" strokeDasharray="5,5" />
            </svg>

            {/* DeepReal — Top */}
            <div className="ux-float glass-card" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", padding: "20px", textAlign: "center", width: "180px", borderTop: "3px solid var(--accent-deepreal)", animationDelay: "0s" }}>
              <ShieldCheck size={32} style={{ color: "var(--accent-deepreal)", margin: "0 auto 8px" }} />
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t({ en: "DeepReal", ar: "ديب ريل", arEG: "ديب ريل" })}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>MIST-20</div>
            </div>

            {/* Mental Health — Bottom Left */}
            <div className="ux-float glass-card" style={{ position: "absolute", bottom: 0, left: 0, padding: "20px", textAlign: "center", width: "180px", borderTop: "3px solid var(--accent-mentalhealth)", animationDelay: "0.3s" }}>
              <HeartPulse size={32} style={{ color: "var(--accent-mentalhealth)", margin: "0 auto 8px" }} />
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t({ en: "Mental Health", ar: "الصحة النفسية", arEG: "الصحة النفسية" })}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>MHLS</div>
            </div>

            {/* Religion Hub — Bottom Right */}
            <div className="ux-float glass-card" style={{ position: "absolute", bottom: 0, right: 0, padding: "20px", textAlign: "center", width: "180px", borderTop: "3px solid var(--accent-religionhub)", animationDelay: "0.6s" }}>
              <BookOpen size={32} style={{ color: "var(--accent-religionhub)", margin: "0 auto 8px" }} />
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t({ en: "Religion Hub", ar: "المحور الديني", arEG: "المحور الديني" })}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Brief RCOPE</div>
            </div>

            {/* Center Label */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div className="ux-breathe" style={{ fontSize: "14px", fontWeight: "bold", color: "var(--accent-cta)" }}>
                {t({ en: "Cognitive Resilience", ar: "المرونة المعرفية", arEG: "المرونة المعرفية" })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FLOW — How it works animated pipeline */}
      <section className="section-padding">
        <div className="container animate-on-scroll">
          <h2 className="text-center" style={{ marginBottom: "48px" }}>
            <TrendingUp className="inline-block mx-2" size={28} style={{ color: "var(--accent-mentalhealth)" }} />
            {t({ en: "The Transformation Pipeline", ar: "مسار التحول", arEG: "مسار التحول" })}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "700px", margin: "0 auto" }}>
            {[
              { icon: <Brain size={24} />, title: t({ en: "Initial State", ar: "الحالة الأولية", arEG: "الحالة الأولية" }), desc: t({ en: "Naive trust, mental health stigma, toxic religious framing", ar: "ثقة ساذجة، وصمة نفسية، تأطير ديني سام", arEG: "ثقة ساذجة، وصمة نفسية، تأطير ديني سام" }), color: "var(--color-error)" },
              { icon: <Zap size={24} />, title: t({ en: "Intervention (14 Days)", ar: "التدخل (14 يوم)", arEG: "التدخل (14 يوم)" }), desc: t({ en: "15 min/day × 3 engines × 10 cognitive lenses", ar: "15 دقيقة يومياً × 3 محركات × 10 عدسات معرفية", arEG: "15 دقيقة يومياً × 3 محركات × 10 عدسات معرفية" }), color: "var(--accent-cta)" },
              { icon: <Eye size={24} />, title: t({ en: "Mechanisms", ar: "الآليات", arEG: "الآليات" }), desc: t({ en: "Cognitive inoculation + Friction-based shifting + Positive coping", ar: "تلقيح معرفي + تحويل احتكاكي + تكيف إيجابي", arEG: "تلقيح معرفي + تحويل احتكاكي + تكيف إيجابي" }), color: "var(--accent-mentalhealth)" },
              { icon: <Target size={24} />, title: t({ en: "Measurement", ar: "القياس", arEG: "القياس" }), desc: t({ en: "MIST-20 + MHLS + Brief RCOPE + SUS — paired t-test", ar: "MIST-20 + MHLS + Brief RCOPE + SUS — اختبار t مزدوج", arEG: "MIST-20 + MHLS + Brief RCOPE + SUS — اختبار t مزدوج" }), color: "var(--accent-religionhub)" },
              { icon: <CheckCircle2 size={24} />, title: t({ en: "Final State", ar: "الحالة النهائية", arEG: "الحالة النهائية" }), desc: t({ en: "Calibrated skepticism, mental health literacy, positive coping", ar: "شك تحليلي معاير، ثقافة نفسية، تكيف ديني إيجابي", arEG: "شك تحليلي معاير، ثقافة نفسية، تكيف ديني إيجابي" }), color: "var(--color-success)" },
            ].map((step, i) => (
              <div key={i}>
                <div className="glass-card ux-tilt" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px", direction: dir }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--bg-primary)", border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: step.color }}>
                    {step.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>{step.title}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{step.desc}</div>
                  </div>
                </div>
                {i < 4 && (
                  <div style={{ textAlign: "center", padding: "8px 0", color: "var(--text-muted)" }}>
                    <ChevronDown size={20} />
                  </div>
                )}
              </div>
            ))
            }
          </div>
        </div>
      </section>

      {/* NUMBERS THAT MATTER — Big Stats */}
      <section className="section-padding" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container animate-on-scroll">
          <h2 className="text-center" style={{ marginBottom: "48px" }}>
            {t({ en: "Numbers That Matter", ar: "الأرقام المهمة", arEG: "الأرقام المهمة" })}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "84", label: t({ en: "Participants", ar: "مشارك", arEG: "مشارك" }), color: "var(--accent-cta)" },
              { num: "300", label: t({ en: "Unique Exercises", ar: "تمرين فريد", arEG: "تمرين فريد" }), color: "var(--accent-deepreal)" },
              { num: "30", label: t({ en: "Cognitive Lenses", ar: "عدسة معرفية", arEG: "عدسة معرفية" }), color: "var(--accent-mentalhealth)" },
              { num: "5", label: t({ en: "Falsifiable Hypotheses", ar: "فرضيات قابلة للتفنيد", arEG: "فرضيات قابلة للتفنيد" }), color: "var(--accent-religionhub)" },
              { num: "14", label: t({ en: "Days of Intervention", ar: "يوم تدخل", arEG: "يوم تدخل" }), color: "var(--color-warning)" },
              { num: "3", label: t({ en: "Psychometric Scales", ar: "مقاييس نفسية", arEG: "مقاييس نفسية" }), color: "var(--accent-cta)" },
              { num: "10", label: t({ en: "Foundations / Engine", ar: "أسس لكل محرك", arEG: "أسس لكل محرك" }), color: "var(--accent-deepreal)" },
              { num: "2", label: t({ en: "Full Languages", ar: "لغات كاملة", arEG: "لغات كاملة" }), color: "var(--accent-mentalhealth)" },
            ].map((stat, i) => (
              <div key={i} className="glass-card ux-tilt text-center p-6">
                <div style={{ fontSize: "40px", fontWeight: "bold", color: stat.color, lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "8px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT — animated comparison */}
      <section className="section-padding">
        <div className="container animate-on-scroll">
          <h2 className="text-center" style={{ marginBottom: "48px" }}>
            {t({ en: "What Makes Us Different", ar: "ما يميزنا", arEG: "ما يميزنا" })}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Others */}
            <div className="glass-card p-6" style={{ borderTop: "3px solid var(--color-error)", direction: dir }}>
              <h3 style={{ fontSize: "18px", color: "var(--color-error)", marginBottom: "16px" }}>
                {t({ en: "❌ Other Platforms", ar: "❌ المنصات الأخرى", arEG: "❌ المنصات الأخرى" })}
              </h3>
              <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 2, listStyle: "none", padding: 0 }}>
                {[
                  t({ en: "General tips without measurement", ar: "نصائح عامة بدون قياس", arEG: "نصائح عامة بدون قياس" }),
                  t({ en: "Single engine only", ar: "محرك واحد فقط", arEG: "محرك واحد فقط" }),
                  t({ en: "Western-centric bias", ar: "تحيز غربي مركزي", arEG: "تحيز غربي مركزي" }),
                  t({ en: "No falsifiable hypotheses", ar: "بدون فرضيات قابلة للتفنيد", arEG: "بدون فرضيات قابلة للتفنيد" }),
                  t({ en: "No cultural context", ar: "بدون سياق ثقافي", arEG: "بدون سياق ثقافي" }),
                ].map((item, i) => (
                  <li key={i} style={{ opacity: 0.7 }}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Us */}
            <div className="glass-card p-6 ux-shimmer" style={{ borderTop: "3px solid var(--color-success)", direction: dir }}>
              <h3 style={{ fontSize: "18px", color: "var(--color-success)", marginBottom: "16px" }}>
                {t({ en: "✅ Egyptian Awareness Library", ar: "✅ مكتبة الوعي المصرية", arEG: "✅ مكتبة الوعي المصرية" })}
              </h3>
              <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 2, listStyle: "none", padding: 0 }}>
                {[
                  t({ en: "Rigorous pre/post measurement", ar: "قياس قبلي/بعدي صارم", arEG: "قياس قبلي/بعدي صارم" }),
                  t({ en: "3 integrated engines", ar: "3 محركات متكاملة", arEG: "3 محركات متكاملة" }),
                  t({ en: "Egyptian bilingual context", ar: "سياق مصري ثنائي اللغة", arEG: "سياق مصري ثنائي اللغة" }),
                  t({ en: "5 falsifiable hypotheses", ar: "5 فرضيات قابلة للتفنيد", arEG: "5 فرضيات قابلة للتفنيد" }),
                  t({ en: "Globally validated scales", ar: "مقاييس مُحققة عالمياً", arEG: "مقاييس مُحققة عالمياً" }),
                ].map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center animate-on-scroll">
        <div className="container">
          <h2 style={{ marginBottom: "24px" }}>{t({ en: "Ready to Explore?", ar: "جاهز للاستكشاف؟", arEG: "جاهز للاستكشاف؟" })}</h2>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/guide" className="btn-primary ux-pulse" style={{ padding: "14px 28px", fontSize: "16px" }}>
              {t({ en: "User Guide", ar: "دليل المستخدم", arEG: "دليل المستخدم" })} <ArrowRight size={18} className="inline-block ml-2" style={{ transform: a ? "rotate(180deg)" : "none" }} />
            </Link>
            <Link href="/onboarding" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "16px" }}>
              {t({ en: "Interactive Tour", ar: "الجولة التفاعلية", arEG: "الجولة التفاعلية" })}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChevronDown({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
