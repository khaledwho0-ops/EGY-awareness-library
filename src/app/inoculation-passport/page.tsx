"use client";

import { useState, useEffect, useMemo } from "react";
import { Shield, Check, Lock, Clock, Sparkles, Award, Share2, Download, ArrowRight, Syringe } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { getCurrentUser } from "@/lib/auth";
import { getProgress } from "@/lib/progress/progress-service";

/* ═══════════════════════════════════════════════════════════
   INOCULATION PASSPORT — Feature #2
   "Like a vaccine card, but for your mind"
   ═══════════════════════════════════════════════════════════ */

interface InoculationTechnique {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
  color: string;
  description: string;
  descriptionAr: string;
  requiredExercises: number[];  // day numbers
  track: "deepreal" | "mental-health" | "religion-hub";
  decayRate: number; // % lost per week without practice
}

const TECHNIQUES: InoculationTechnique[] = [
  { id: "fear", name: "Fear-Mongering", nameAr: "بث الخوف", emoji: "😨", color: "#EF4444", description: "Spreading exaggerated threats to manipulate behavior", descriptionAr: "نشر تهديدات مبالغ فيها للتلاعب بالسلوك", requiredExercises: [1, 2], track: "deepreal", decayRate: 8 },
  { id: "emotion", name: "Emotional Manipulation", nameAr: "التلاعب العاطفي", emoji: "💔", color: "#EC4899", description: "Using emotions to bypass rational thinking", descriptionAr: "استخدام العواطف لتجاوز التفكير العقلاني", requiredExercises: [1, 2, 3], track: "mental-health", decayRate: 10 },
  { id: "authority", name: "False Authority", nameAr: "السلطة الزائفة", emoji: "👔", color: "#8B5CF6", description: "Citing fake experts to lend credibility", descriptionAr: "الاستشهاد بخبراء مزيفين لإضفاء المصداقية", requiredExercises: [1, 2, 3], track: "religion-hub", decayRate: 6 },
  { id: "conspiracy", name: "Conspiracy Logic", nameAr: "منطق المؤامرة", emoji: "🕳️", color: "#F59E0B", description: "Connecting unrelated events into a grand narrative", descriptionAr: "ربط أحداث غير مترابطة في سرد كبير", requiredExercises: [3, 4], track: "deepreal", decayRate: 7 },
  { id: "polarization", name: "Polarization", nameAr: "الاستقطاب", emoji: "⚡", color: "#06B6D4", description: "Dividing people into us-vs-them groups", descriptionAr: "تقسيم الناس إلى مجموعات نحن-ضدهم", requiredExercises: [5, 6], track: "deepreal", decayRate: 9 },
  { id: "impersonation", name: "Impersonation", nameAr: "انتحال الشخصية", emoji: "🎭", color: "#10B981", description: "Pretending to be a trusted source", descriptionAr: "التظاهر بأنك مصدر موثوق", requiredExercises: [7, 8], track: "deepreal", decayRate: 5 },
  { id: "trolling", name: "Trolling", nameAr: "التنمر الإلكتروني", emoji: "🧌", color: "#6366F1", description: "Provoking emotional reactions to derail discussion", descriptionAr: "استفزاز ردود فعل عاطفية لإخراج النقاش عن مساره", requiredExercises: [4, 5], track: "mental-health", decayRate: 8 },
  { id: "discrediting", name: "Discrediting", nameAr: "تشويه السمعة", emoji: "🗑️", color: "#F97316", description: "Attacking the messenger instead of the message", descriptionAr: "مهاجمة الشخص بدلاً من الرسالة", requiredExercises: [9, 10], track: "deepreal", decayRate: 6 },
  { id: "deepfake", name: "Deepfake Detection", nameAr: "كشف التزييف العميق", emoji: "🤖", color: "#E11D48", description: "Recognizing AI-generated or manipulated media", descriptionAr: "التعرف على الوسائط المولدة أو المعدلة بالذكاء الاصطناعي", requiredExercises: [11, 12], track: "deepreal", decayRate: 12 },
  { id: "cherrypicking", name: "Cherry-Picking", nameAr: "الانتقاء", emoji: "🍒", color: "#14B8A6", description: "Selecting only evidence that supports a position", descriptionAr: "اختيار الأدلة التي تدعم موقفاً معيناً فقط", requiredExercises: [6, 7, 8], track: "mental-health", decayRate: 7 },
  { id: "scapegoating", name: "Scapegoating", nameAr: "كبش الفداء", emoji: "🎯", color: "#A855F7", description: "Blaming a group for complex problems", descriptionAr: "إلقاء اللوم على مجموعة لمشاكل معقدة", requiredExercises: [4, 5, 6], track: "religion-hub", decayRate: 8 },
  { id: "distraction", name: "Distraction", nameAr: "الإلهاء", emoji: "🎪", color: "#0EA5E9", description: "Diverting attention from important issues", descriptionAr: "تحويل الانتباه عن القضايا المهمة", requiredExercises: [13, 14], track: "deepreal", decayRate: 9 },
];

function getInoculationStatus(technique: InoculationTechnique) {
  let progress: any = null;
  try { progress = getProgress(); } catch { /* */ }

  const completedExercises = progress?.exercises ?? [];
  const trackExercises = completedExercises.filter((e: any) => {
    const ctx = e.context ?? "";
    return ctx.includes(technique.track);
  });

  // Check if required exercises for this technique are completed
  const completedDays = new Set<number>();
  for (const ex of trackExercises) {
    const day = ex.day ?? ex.exerciseDay ?? 0;
    if (day) completedDays.add(day);
  }

  // Also check localStorage day completion keys
  for (const d of technique.requiredExercises) {
    try {
      const key = `eal-exercise-progress:${technique.track}:${d}`;
      const val = localStorage.getItem(key);
      if (val) completedDays.add(d);
    } catch { /* */ }
  }

  const required = technique.requiredExercises.length;
  const done = technique.requiredExercises.filter((d) => completedDays.has(d)).length;
  const percentComplete = required > 0 ? (done / required) * 100 : 0;

  // Compute decay — immunity fades over time since last practice
  let lastPracticed: Date | null = null;
  try {
    const lpKey = `eal-inoculation-last:${technique.id}`;
    const lpVal = localStorage.getItem(lpKey);
    if (lpVal) lastPracticed = new Date(lpVal);
  } catch { /* */ }

  let immunity = percentComplete;
  if (lastPracticed && percentComplete === 100) {
    const daysSince = (Date.now() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24);
    const weeksSince = daysSince / 7;
    const decay = weeksSince * technique.decayRate;
    immunity = Math.max(30, percentComplete - decay); // Never drops below 30% once earned
  }

  // Save last practice time when fully complete
  if (percentComplete === 100 && !lastPracticed) {
    try {
      localStorage.setItem(`eal-inoculation-last:${technique.id}`, new Date().toISOString());
    } catch { /* */ }
  }

  return {
    percentComplete: Math.round(percentComplete),
    immunity: Math.round(immunity),
    status: percentComplete === 100 ? (immunity > 80 ? "strong" : immunity > 50 ? "fading" : "weak") : percentComplete > 0 ? "partial" : "locked",
    daysCompleted: done,
    daysRequired: required,
  };
}

function StampCard({ technique, isRTL }: { technique: InoculationTechnique; isRTL: boolean }) {
  const status = getInoculationStatus(technique);
  const ff = isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <div
      className="glass-card"
      style={{
        padding: 20,
        position: "relative",
        overflow: "hidden",
        border: status.status === "strong" ? `2px solid ${technique.color}` : "1px solid var(--border-primary)",
        opacity: status.status === "locked" ? 0.6 : 1,
        transition: "all 0.3s",
      }}
    >
      {/* Stamp watermark */}
      {status.status === "strong" && (
        <div style={{
          position: "absolute", top: -10, right: -10, width: 80, height: 80,
          borderRadius: "50%", border: `3px solid ${technique.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: "rotate(15deg)", opacity: 0.15,
        }}>
          <Check size={40} strokeWidth={4} style={{ color: technique.color }} />
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${technique.color}15`, border: `1.5px solid ${technique.color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>
          {technique.emoji}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: ff }}>
            {isRTL ? technique.nameAr : technique.name}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-caption)", display: "flex", alignItems: "center", gap: 4 }}>
            {status.status === "strong" && <><Check size={12} style={{ color: "#10B981" }} /> {isRTL ? "مُلقّح" : "INOCULATED"}</>}
            {status.status === "fading" && <><Clock size={12} style={{ color: "#F59E0B" }} /> {isRTL ? "يتلاشى" : "FADING"}</>}
            {status.status === "weak" && <><Clock size={12} style={{ color: "#EF4444" }} /> {isRTL ? "ضعيف" : "WEAK"}</>}
            {status.status === "partial" && <><Sparkles size={12} style={{ color: "#06B6D4" }} /> {status.daysCompleted}/{status.daysRequired} {isRTL ? "أيام" : "days"}</>}
            {status.status === "locked" && <><Lock size={12} style={{ color: "var(--text-muted)" }} /> {isRTL ? "مقفل" : "LOCKED"}</>}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px", fontFamily: ff }}>
        {isRTL ? technique.descriptionAr : technique.description}
      </p>

      {/* Immunity bar */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 10, color: "var(--text-caption)", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
          <span>{isRTL ? "المناعة" : "Immunity"}</span>
          <span style={{ color: technique.color, fontWeight: 700 }}>{status.immunity}%</span>
        </div>
        <div style={{ width: "100%", height: 5, borderRadius: 3, background: "var(--bg-primary)" }}>
          <div style={{
            width: `${status.immunity}%`, height: "100%", borderRadius: 3,
            background: status.status === "strong" ? `linear-gradient(90deg, ${technique.color}88, ${technique.color})`
              : status.status === "fading" ? `linear-gradient(90deg, ${technique.color}44, ${technique.color}88)`
              : `${technique.color}33`,
            transition: "width 0.6s ease",
          }} />
        </div>
      </div>

      {status.status === "fading" && (
        <div style={{ marginTop: 8, fontSize: 10, color: "#F59E0B", display: "flex", alignItems: "center", gap: 4, fontFamily: ff }}>
          ⚠️ {isRTL ? "تمرن مرة أخرى لاستعادة المناعة الكاملة" : "Practice again to restore full immunity"}
        </div>
      )}
    </div>
  );
}

export default function InoculationPassport() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const statuses = useMemo(() => {
    if (!mounted) return [];
    return TECHNIQUES.map((tech) => ({ tech, status: getInoculationStatus(tech) }));
  }, [mounted]);

  const totalImmunity = statuses.length > 0
    ? Math.round(statuses.reduce((s, t) => s + t.status.immunity, 0) / statuses.length)
    : 0;
  const inoculatedCount = statuses.filter((s) => s.status.status === "strong").length;
  const fadingCount = statuses.filter((s) => s.status.status === "fading").length;
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      if (mounted) {
        const u = await getCurrentUser();
        setUserProfile(u);
      }
    }
    fetchUser();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))",
            border: "2px solid rgba(16,185,129,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Syringe size={36} style={{ color: "#10B981" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Inoculation", ar: "جواز", arEG: "جواز" })} <span className="text-gradient">{t({ en: "Passport", ar: "التلقيح", arEG: "التلقيح" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "Your mental vaccination card. Each stamp represents a manipulation technique you've been inoculated against. Immunity fades without practice — just like real vaccines.",
              ar: "بطاقة التلقيح الذهني. كل ختم يمثل تقنية تلاعب تم تلقيحك ضدها. المناعة تتلاشى بدون ممارسة — مثل اللقاحات الحقيقية.",
              arEG: "بطاقة التلقيح الذهني. كل ختم يمثل تقنية تلاعب تم تلقيحك ضدها. المناعة تتلاشى بدون ممارسة — مثل اللقاحات الحقيقية.",
            })}
          </p>
        </div>

        {/* Summary Card */}
        <div className="glass-card" style={{
          padding: 28, marginBottom: 32,
          background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))",
          display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", minWidth: 100 }}>
            <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: totalImmunity > 60 ? "#10B981" : totalImmunity > 30 ? "#F59E0B" : "#EF4444" }}>
              {totalImmunity}%
            </div>
            <div style={{ fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
              {t({ en: "TOTAL IMMUNITY", ar: "المناعة الكلية", arEG: "المناعة الكلية" })}
            </div>
          </div>
          <div style={{ width: 1, height: 50, background: "var(--border-primary)" }} />
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#10B981" }}>{inoculatedCount}</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
                {t({ en: "Inoculated", ar: "مُلقّح", arEG: "مُلقّح" })}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#F59E0B" }}>{fadingCount}</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
                {t({ en: "Fading", ar: "يتلاشى", arEG: "يتلاشى" })}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text-muted)" }}>{12 - inoculatedCount - fadingCount}</div>
              <div style={{ fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
                {t({ en: "Remaining", ar: "متبقي", arEG: "متبقي" })}
              </div>
            </div>
          </div>
          {userProfile && (
            <>
              <div style={{ width: 1, height: 50, background: "var(--border-primary)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: ff }}>{userProfile.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-caption)" }}>
                  {t({ en: "Passport Holder", ar: "حامل الجواز", arEG: "حامل الجواز" })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Passport Stamps Grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {TECHNIQUES.map((tech) => (
            <StampCard key={tech.id} technique={tech} isRTL={a} />
          ))}
        </div>

        {/* Shareable card */}
        <div className="glass-card" style={{ padding: 28, marginTop: 32, textAlign: "center" }}>
          <Award size={28} style={{ color: "#F59E0B", marginBottom: 12 }} />
          <h3 style={{ marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Share Your Immunity Status", ar: "شارك حالة مناعتك", arEG: "شارك حالة مناعتك" })}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16, fontFamily: ff }}>
            {t({
              en: `"I'm ${totalImmunity}% inoculated against misinformation — ${inoculatedCount}/12 techniques mastered"`,
              ar: `"أنا ملقح بنسبة ${totalImmunity}% ضد المعلومات المضللة — ${inoculatedCount}/12 تقنية"`,
              arEG: `"أنا ملقح بنسبة ${totalImmunity}% ضد المعلومات المضللة — ${inoculatedCount}/12 تقنية"`,
            })}
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "10px 20px", fontSize: 13 }}>
              <ArrowRight size={14} style={{ marginRight: 6, transform: a ? "rotate(180deg)" : "none" }} />
              {t({ en: "Keep Training", ar: "استمر بالتدريب", arEG: "استمر بالتدريب" })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
