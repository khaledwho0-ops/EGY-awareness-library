"use client";

import { useState, useEffect } from "react";
import { Activity, Brain, Target, TrendingUp, Flame, Zap, ArrowRight, BarChart3, Shield, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { getProgress } from "@/lib/progress/progress-service";

/* ═══════════════════════════════════════════════════════════
   COM-B BEHAVIORAL CHANGE TRACKER — Feature #7
   "See your actual behavioral change, not just knowledge"
   Based on the COM-B Model (Capability, Opportunity, Motivation → Behavior)
   ═══════════════════════════════════════════════════════════ */

function getComBData() {
  let progress: any = null;
  try { progress = getProgress(); } catch { /* */ }
  const exercises = progress?.exercises ?? [];
  const totalExercises = 42;
  const completed = exercises.length;

  // Track breakdowns
  const drExercises = exercises.filter((e: any) => (e.context || "").includes("deepreal")).length;
  const mhExercises = exercises.filter((e: any) => (e.context || "").includes("mental")).length;
  const rhExercises = exercises.filter((e: any) => (e.context || "").includes("religion")).length;

  // Capability: knowledge gained from exercises (0-100)
  const capabilityPhysical = Math.min(100, Math.round((completed / totalExercises) * 100 * 1.2));
  const capabilityPsych = Math.min(100, Math.round(((drExercises * 3 + mhExercises * 4 + rhExercises * 3) / 42) * 100));

  // Opportunity: how many times they used verification tools
  let verificationUses = 0;
  try { verificationUses = parseInt(localStorage.getItem("eal-verification-uses") || "0", 10); } catch { /* */ }
  const opportunitySocial = Math.min(100, verificationUses * 8);
  const opportunityPhysical = Math.min(100, Math.round((completed / 14) * 100));

  // Motivation: streak + confidence
  let streakDays = 0;
  try {
    for (let i = 1; i <= 14; i++) {
      if (localStorage.getItem(`day_${i}_completed`)) streakDays++;
    }
  } catch { /* */ }
  const motivationReflective = Math.min(100, Math.round((completed / totalExercises) * 120));
  const motivationAutomatic = Math.min(100, streakDays * 7);

  // Overall behavior change
  const behaviorChange = Math.round(
    (capabilityPhysical * 0.2 + capabilityPsych * 0.2 +
     opportunitySocial * 0.15 + opportunityPhysical * 0.15 +
     motivationReflective * 0.15 + motivationAutomatic * 0.15)
  );

  return {
    capability: { physical: capabilityPhysical, psychological: capabilityPsych, overall: Math.round((capabilityPhysical + capabilityPsych) / 2) },
    opportunity: { social: opportunitySocial, physical: opportunityPhysical, overall: Math.round((opportunitySocial + opportunityPhysical) / 2) },
    motivation: { reflective: motivationReflective, automatic: motivationAutomatic, overall: Math.round((motivationReflective + motivationAutomatic) / 2) },
    behavior: behaviorChange,
    tracks: { deepreal: drExercises, mentalHealth: mhExercises, religionHub: rhExercises },
    streakDays,
    verificationUses,
    totalCompleted: completed,
  };
}

function COMBar({ label, value, color, maxWidth = "100%" }: { label: string; value: number; color: string; maxWidth?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ width: maxWidth, height: 8, borderRadius: 4, background: "var(--bg-primary)" }}>
        <div style={{
          width: `${value}%`, height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
}

export default function COMBTracker() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const data = getComBData();

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(16,185,129,0.15))",
            border: "2px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Activity size={36} style={{ color: "#6366F1" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Behavioral Change", ar: "متتبع التغيير", arEG: "متتبع التغيير" })} <span className="text-gradient">{t({ en: "Tracker", ar: "السلوكي", arEG: "السلوكي" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "Based on the COM-B Model: Capability + Opportunity + Motivation = Behavior Change",
              ar: "مبني على نموذج COM-B: القدرة + الفرصة + الدافع = تغيير السلوك",
              arEG: "مبني على نموذج COM-B: القدرة + الفرصة + الدافع = تغيير السلوك",
            })}
          </p>
        </div>

        {/* Overall Behavior Score */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 24, textAlign: "center", background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.05))" }}>
          <div style={{ fontSize: 52, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: data.behavior > 60 ? "#10B981" : data.behavior > 30 ? "#F59E0B" : "#EF4444" }}>
            {data.behavior}%
          </div>
          <div style={{ fontSize: 13, color: "var(--text-caption)", fontFamily: ff }}>
            {t({ en: "OVERALL BEHAVIORAL CHANGE", ar: "التغيير السلوكي الكلي", arEG: "التغيير السلوكي الكلي" })}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontFamily: ff }}>
            {data.behavior > 60
              ? t({ en: "Excellent! Your critical thinking habits are forming.", ar: "ممتاز! عادات التفكير النقدي لديك تتشكل.", arEG: "ممتاز! عادات التفكير النقدي بتتشكل." })
              : data.behavior > 30
              ? t({ en: "Good progress — keep training to strengthen new habits.", ar: "تقدم جيد — استمر في التدريب لتقوية العادات الجديدة.", arEG: "تقدم جيد — كمّل تدريب عشان تقوي العادات الجديدة." })
              : t({ en: "Just getting started — every exercise builds new neural pathways!", ar: "بداية جيدة — كل تمرين يبني مسارات عصبية جديدة!", arEG: "بداية كويسة — كل تمرين بيبني مسارات عصبية جديدة!" })}
          </div>
        </div>

        {/* COM-B Breakdown */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: 24 }}>
          {/* Capability */}
          <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #3B82F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Brain size={20} style={{ color: "#3B82F6" }} />
              <h3 style={{ margin: 0, fontSize: 16, fontFamily: ff }}>
                {t({ en: "Capability", ar: "القدرة", arEG: "القدرة" })}
              </h3>
              <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 800, color: "#3B82F6" }}>{data.capability.overall}%</span>
            </div>
            <COMBar label={a ? "المعرفة (تمارين مكتملة)" : "Knowledge (exercises done)"} value={data.capability.physical} color="#3B82F6" />
            <COMBar label={a ? "المهارات النفسية" : "Psychological skills"} value={data.capability.psychological} color="#60A5FA" />
            <p style={{ fontSize: 11, color: "var(--text-caption)", margin: 0, lineHeight: 1.5, fontFamily: ff }}>
              {t({ en: "Can you distinguish real from fake? Do you know the SIFT method?", ar: "تقدر تفرق بين الحقيقي والمزيف؟ تعرف طريقة SIFT؟", arEG: "تقدر تفرق بين الحقيقي والمزيف؟ تعرف طريقة SIFT؟" })}
            </p>
          </div>

          {/* Opportunity */}
          <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #10B981" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Target size={20} style={{ color: "#10B981" }} />
              <h3 style={{ margin: 0, fontSize: 16, fontFamily: ff }}>
                {t({ en: "Opportunity", ar: "الفرصة", arEG: "الفرصة" })}
              </h3>
              <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 800, color: "#10B981" }}>{data.opportunity.overall}%</span>
            </div>
            <COMBar label={a ? "استخدام أدوات التحقق" : "Verification tool usage"} value={data.opportunity.social} color="#10B981" />
            <COMBar label={a ? "الوصول للتمارين" : "Exercise access"} value={data.opportunity.physical} color="#34D399" />
            <p style={{ fontSize: 11, color: "var(--text-caption)", margin: 0, lineHeight: 1.5, fontFamily: ff }}>
              {t({ en: `You've used verification tools ${data.verificationUses} times on real content.`, ar: `استخدمت أدوات التحقق ${data.verificationUses} مرة على محتوى حقيقي.`, arEG: `استخدمت أدوات التحقق ${data.verificationUses} مرة على محتوى حقيقي.` })}
            </p>
          </div>

          {/* Motivation */}
          <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #F59E0B" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Flame size={20} style={{ color: "#F59E0B" }} />
              <h3 style={{ margin: 0, fontSize: 16, fontFamily: ff }}>
                {t({ en: "Motivation", ar: "الدافع", arEG: "الدافع" })}
              </h3>
              <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 800, color: "#F59E0B" }}>{data.motivation.overall}%</span>
            </div>
            <COMBar label={a ? "دافع تأملي (فهم القيمة)" : "Reflective (understanding value)"} value={data.motivation.reflective} color="#F59E0B" />
            <COMBar label={a ? "دافع تلقائي (العادة)" : "Automatic (habit)"} value={data.motivation.automatic} color="#FBBF24" />
            <p style={{ fontSize: 11, color: "var(--text-caption)", margin: 0, lineHeight: 1.5, fontFamily: ff }}>
              {t({ en: `${data.streakDays}-day streak. Consistency builds automatic habits.`, ar: `سلسلة ${data.streakDays} أيام. الاستمرارية تبني عادات تلقائية.`, arEG: `سلسلة ${data.streakDays} أيام. الاستمرارية بتبني عادات تلقائية.` })}
            </p>
          </div>
        </div>

        {/* Track Breakdown */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16, fontFamily: ff }}>
            {t({ en: "Track Performance", ar: "أداء المسارات", arEG: "أداء المسارات" })}
          </h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div style={{ textAlign: "center", padding: 16, borderRadius: 12, background: "rgba(59,130,246,0.06)" }}>
              <Shield size={24} style={{ color: "#3B82F6", marginBottom: 6 }} />
              <div style={{ fontSize: 24, fontWeight: 800, color: "#3B82F6" }}>{data.tracks.deepreal}/14</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)" }}>DeepReal</div>
            </div>
            <div style={{ textAlign: "center", padding: 16, borderRadius: 12, background: "rgba(236,72,153,0.06)" }}>
              <Heart size={24} style={{ color: "#EC4899", marginBottom: 6 }} />
              <div style={{ fontSize: 24, fontWeight: 800, color: "#EC4899" }}>{data.tracks.mentalHealth}/14</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)" }}>Mental Health</div>
            </div>
            <div style={{ textAlign: "center", padding: 16, borderRadius: 12, background: "rgba(245,158,11,0.06)" }}>
              <Sparkles size={24} style={{ color: "#F59E0B", marginBottom: 6 }} />
              <div style={{ fontSize: 24, fontWeight: 800, color: "#F59E0B" }}>{data.tracks.religionHub}/14</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)" }}>Religion Hub</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
            {t({ en: "Continue Training", ar: "استمر في التدريب", arEG: "كمّل التدريب" })}
          </Link>
        </div>
      </div>
    </div>
  );
}
