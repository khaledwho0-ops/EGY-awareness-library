"use client";

import { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Eye, Brain, RefreshCw, Zap, Check, X, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { getProgress } from "@/lib/progress/progress-service";

/* ═══════════════════════════════════════════════════════════
   BEFORE / AFTER TRANSFORMATION — Feature #11
   "Visual proof your thinking changed"
   ═══════════════════════════════════════════════════════════ */

interface TransformationScenario {
  id: string;
  scenario: string;
  scenarioAr: string;
  day1Response: string;
  day1ResponseAr: string;
  day1Behavior: string;
  day1BehaviorAr: string;
  day14Response: string;
  day14ResponseAr: string;
  day14Behavior: string;
  day14BehaviorAr: string;
  skillLearned: string;
  skillLearnedAr: string;
  track: "deepreal" | "mental-health" | "religion-hub";
  color: string;
}

const SCENARIOS: TransformationScenario[] = [
  {
    id: "s1", track: "deepreal", color: "#3B82F6",
    scenario: "A WhatsApp message says: 'URGENT: Toxic chemicals found in popular Egyptian food brand!!!'",
    scenarioAr: "رسالة واتساب بتقول: 'عاجل: مواد كيماوية سامة في ماركة أكل مصرية مشهورة!!!'",
    day1Response: "Share immediately to warn family and friends",
    day1ResponseAr: "أشاركها فوراً عشان أحذر العيلة والأصحاب",
    day1Behavior: "Panic → Share → Spread unverified claim",
    day1BehaviorAr: "ذعر ← مشاركة ← نشر ادعاء غير موثق",
    day14Response: "Stop. Check the source. Search on Google and fact-check sites. Ask: who created this?",
    day14ResponseAr: "توقف. اتحقق من المصدر. دور في جوجل ومواقع التحقق. اسأل: مين عمل ده؟",
    day14Behavior: "Pause → Verify → Protect family with facts",
    day14BehaviorAr: "توقف ← تحقق ← احمِ العيلة بالحقائق",
    skillLearned: "SIFT Method (Stop, Investigate, Find, Trace)",
    skillLearnedAr: "طريقة SIFT (توقف، حقق، ابحث، تتبع)",
  },
  {
    id: "s2", track: "mental-health", color: "#EC4899",
    scenario: "You feel overwhelmed by negative news and can't stop scrolling",
    scenarioAr: "حاسس إنك مغمور بالأخبار السلبية ومش قادر تبطل سكرولينج",
    day1Response: "Keep scrolling. It's important to stay informed at all costs.",
    day1ResponseAr: "كمل سكرولينج. لازم تفضل متابع مهما كان.",
    day1Behavior: "Doom-scrolling → Anxiety → Sleep disruption",
    day1BehaviorAr: "سكرولينج سلبي ← قلق ← اضطراب نوم",
    day14Response: "Set a 15-minute news limit. Practice grounding. Separate news time from rest time.",
    day14ResponseAr: "حدد ١٥ دقيقة للأخبار. مارس تقنيات التهدئة. افصل وقت الأخبار عن الراحة.",
    day14Behavior: "Boundaries → Mindful consumption → Better sleep",
    day14BehaviorAr: "حدود ← استهلاك واعي ← نوم أفضل",
    skillLearned: "Digital Wellbeing & News Hygiene",
    skillLearnedAr: "الرفاهية الرقمية ونظافة الأخبار",
  },
  {
    id: "s3", track: "religion-hub", color: "#F59E0B",
    scenario: "Someone quotes a hadith you've never heard to support a political position",
    scenarioAr: "حد بيستشهد بحديث عمرك ما سمعت عنه عشان يدعم موقف سياسي",
    day1Response: "Accept it because it sounds Islamic and I don't want to question religion",
    day1ResponseAr: "اقبله عشان شكله إسلامي ومش عايز أشكك في الدين",
    day1Behavior: "Blind trust → Spread unverified quote → Manipulation victim",
    day1BehaviorAr: "ثقة عمياء ← نشر اقتباس غير موثق ← ضحية تلاعب",
    day14Response: "Check hadith authenticity on IslamWeb/Dorar. Distinguish between religion and political use of religion.",
    day14ResponseAr: "تحقق من صحة الحديث على إسلام ويب/الدرر. فرّق بين الدين والاستخدام السياسي للدين.",
    day14Behavior: "Verify → Protect faith from exploitation → Informed belief",
    day14BehaviorAr: "تحقق ← احمِ الإيمان من الاستغلال ← إيمان مستنير",
    skillLearned: "Positive Religious Coping (Brief RCOPE)",
    skillLearnedAr: "التكيف الديني الإيجابي (Brief RCOPE)",
  },
  {
    id: "s4", track: "deepreal", color: "#3B82F6",
    scenario: "A viral video shows a 'miracle cure' endorsed by a famous doctor",
    scenarioAr: "فيديو منتشر بيعرض 'علاج معجزة' بتأييد دكتور مشهور",
    day1Response: "It must be true — a doctor said it and millions watched it",
    day1ResponseAr: "لازم يكون صح — دكتور قاله وملايين شافوه",
    day1Behavior: "Authority bias + Bandwagon → Buy product → Health risk",
    day1BehaviorAr: "انحياز السلطة + تأثير القطيع ← شراء المنتج ← خطر صحي",
    day14Response: "Popularity ≠ truth. Check if the doctor is real, if the claim is peer-reviewed, if the product is FDA-approved.",
    day14ResponseAr: "الشعبية ≠ الحقيقة. تحقق إن الدكتور حقيقي، الادعاء محكّم علمياً، المنتج معتمد.",
    day14Behavior: "Question authority → Verify credentials → Evidence-based decisions",
    day14BehaviorAr: "شكك في السلطة ← تحقق من المؤهلات ← قرارات مبنية على الأدلة",
    skillLearned: "Authority Bias Recognition",
    skillLearnedAr: "التعرف على انحياز السلطة",
  },
];

export default function Transformation() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const progress = (() => { try { return getProgress(); } catch { return null; } })();
  const completedCount = progress?.exercises?.length ?? 0;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(16,185,129,0.15))",
            border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <ArrowLeftRight size={36} style={{ color: "#10B981" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Before →", ar: "قبل ←", arEG: "قبل ←" })} <span className="text-gradient">{t({ en: "After", ar: "بعد", arEG: "بعد" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "See how the 14-day program transforms your thinking. Real scenarios, real behavioral change.",
              ar: "شوف إزاي البرنامج بيغير تفكيرك في ١٤ يوم. سيناريوهات حقيقية، تغيير سلوكي حقيقي.",
              arEG: "شوف إزاي البرنامج بيغير تفكيرك في ١٤ يوم. سيناريوهات حقيقية، تغيير سلوكي حقيقي.",
            })}
          </p>
        </div>

        {/* Scenario Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(i)}
              className="glass-card"
              style={{
                padding: "8px 18px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff,
                border: activeScenario === i ? `2px solid ${s.color}` : "1px solid var(--border-primary)",
                background: activeScenario === i ? `${s.color}08` : "var(--bg-secondary)",
                color: activeScenario === i ? s.color : "var(--text-secondary)",
                fontWeight: activeScenario === i ? 700 : 400,
              }}
            >
              {t({ en: `Scenario ${i + 1}`, ar: `سيناريو ${i + 1}`, arEG: `سيناريو ${i + 1}` })}
            </button>
          ))}
        </div>

        {/* Active Scenario */}
        {SCENARIOS[activeScenario] && (() => {
          const s = SCENARIOS[activeScenario];
          return (
            <div>
              {/* Scenario Description */}
              <div className="glass-card" style={{ padding: 24, marginBottom: 20, borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
                  {s.track.replace("-", " ")}
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, margin: 0, fontFamily: ff }}>
                  {a ? s.scenarioAr : s.scenario}
                </p>
              </div>

              {/* Split Screen */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {/* DAY 1 — Before */}
                <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #EF4444", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700,
                    background: "rgba(239,68,68,0.1)", color: "#EF4444",
                  }}>
                    {t({ en: "DAY 1", ar: "اليوم ١", arEG: "اليوم ١" })}
                  </div>
                  <X size={28} style={{ color: "#EF4444", marginBottom: 12 }} />
                  <h3 style={{ fontSize: 15, marginBottom: 10, color: "#EF4444", fontFamily: ff }}>
                    {t({ en: "Your Response", ar: "ردك", arEG: "ردك" })}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontFamily: ff, color: "var(--text-secondary)" }}>
                    "{a ? s.day1ResponseAr : s.day1Response}"
                  </p>
                  <div style={{
                    padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.12)", fontSize: 13, fontFamily: ff, color: "var(--text-muted)",
                  }}>
                    <strong>{t({ en: "Behavior:", ar: "السلوك:", arEG: "السلوك:" })}</strong><br />
                    {a ? s.day1BehaviorAr : s.day1Behavior}
                  </div>
                </div>

                {/* DAY 14 — After */}
                <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #10B981", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700,
                    background: "rgba(16,185,129,0.1)", color: "#10B981",
                  }}>
                    {t({ en: "DAY 14", ar: "اليوم ١٤", arEG: "اليوم ١٤" })}
                  </div>
                  <Check size={28} style={{ color: "#10B981", marginBottom: 12 }} />
                  <h3 style={{ fontSize: 15, marginBottom: 10, color: "#10B981", fontFamily: ff }}>
                    {t({ en: "Your Response", ar: "ردك", arEG: "ردك" })}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontFamily: ff, color: "var(--text-secondary)" }}>
                    "{a ? s.day14ResponseAr : s.day14Response}"
                  </p>
                  <div style={{
                    padding: "10px 14px", borderRadius: 10, background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.12)", fontSize: 13, fontFamily: ff, color: "var(--text-muted)",
                  }}>
                    <strong>{t({ en: "Behavior:", ar: "السلوك:", arEG: "السلوك:" })}</strong><br />
                    {a ? s.day14BehaviorAr : s.day14Behavior}
                  </div>
                </div>
              </div>

              {/* Skill Learned */}
              <div className="glass-card" style={{ padding: 20, marginTop: 16, textAlign: "center", background: `${s.color}06` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontFamily: ff }}>
                  <Zap size={16} style={{ color: s.color }} />
                  <strong>{t({ en: "Skill Learned:", ar: "المهارة المكتسبة:", arEG: "المهارة المكتسبة:" })}</strong>
                  <span style={{ color: s.color }}>{a ? s.skillLearnedAr : s.skillLearned}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
            {t({ en: "Start Your Transformation", ar: "ابدأ تحولك", arEG: "ابدأ تحولك" })} <ArrowRight size={16} style={{ marginLeft: 8, transform: a ? "rotate(180deg)" : "none" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
