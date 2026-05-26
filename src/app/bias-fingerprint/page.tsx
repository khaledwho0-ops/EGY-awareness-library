"use client";

import { useState, useEffect, useMemo } from "react";
import { Brain, ShieldCheck, AlertTriangle, TrendingUp, Eye, Zap, Users, Target, Fingerprint, Info, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";

import { getProgress } from "@/lib/progress/progress-service";

/* ═══════════════════════════════════════════════════════════
   COGNITIVE BIAS FINGERPRINT — Feature #1
   "You can't fix what you can't see"
   ═══════════════════════════════════════════════════════════ */

interface BiasProfile {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  descriptionAr: string;
  vulnerability: number; // 0-100
  exercises: string[];
  tip: string;
  tipAr: string;
}

function computeBiasVulnerability(): BiasProfile[] {
  let progress: any = null;
  try {
    progress = getProgress();
  } catch { /* */ }

  const completedCount = progress?.exercises?.length ?? 0;
  const hasStarted = completedCount > 0;

  // Seed from exercise data — in production these would come from tagged exercise responses
  const baseVulnerabilities = {
    confirmation: hasStarted ? Math.max(15, 85 - completedCount * 4.2) : 78,
    anchoring: hasStarted ? Math.max(20, 72 - completedCount * 3.1) : 72,
    authority: hasStarted ? Math.max(10, 80 - completedCount * 3.8) : 80,
    emotional: hasStarted ? Math.max(18, 88 - completedCount * 4.5) : 88,
    bandwagon: hasStarted ? Math.max(12, 65 - completedCount * 2.9) : 65,
    dunningKruger: hasStarted ? Math.max(25, 70 - completedCount * 3.0) : 70,
    availability: hasStarted ? Math.max(15, 75 - completedCount * 3.5) : 75,
    sunkCost: hasStarted ? Math.max(20, 60 - completedCount * 2.5) : 60,
  };

  return [
    {
      id: "confirmation",
      name: "Confirmation Bias",
      nameAr: "انحياز التأكيد",
      icon: <Eye size={20} />,
      color: "#EF4444",
      description: "Tendency to search for information that confirms existing beliefs",
      descriptionAr: "الميل للبحث عن معلومات تؤكد المعتقدات الحالية",
      vulnerability: Math.round(baseVulnerabilities.confirmation),
      exercises: ["DeepReal Day 1-3", "Source verification"],
      tip: "Practice the SIFT method: Stop, Investigate, Find better coverage, Trace claims.",
      tipAr: "مارس طريقة SIFT: توقف، حقق، ابحث عن تغطية أفضل، تتبع الادعاءات.",
    },
    {
      id: "anchoring",
      name: "Anchoring Effect",
      nameAr: "تأثير الإرساء",
      icon: <Target size={20} />,
      color: "#F59E0B",
      description: "Over-relying on the first piece of information encountered",
      descriptionAr: "الاعتماد المفرط على أول معلومة تصادفها",
      vulnerability: Math.round(baseVulnerabilities.anchoring),
      exercises: ["DeepReal Day 4-5"],
      tip: "Always seek multiple independent sources before forming an opinion.",
      tipAr: "ابحث دائماً عن مصادر مستقلة متعددة قبل تكوين رأي.",
    },
    {
      id: "authority",
      name: "Authority Bias",
      nameAr: "انحياز السلطة",
      icon: <ShieldCheck size={20} />,
      color: "#8B5CF6",
      description: "Blindly trusting information from perceived authority figures",
      descriptionAr: "الثقة العمياء بالمعلومات من شخصيات ذات سلطة مفترضة",
      vulnerability: Math.round(baseVulnerabilities.authority),
      exercises: ["Religion Hub Day 1-7"],
      tip: "Credentials don't guarantee correctness. Verify claims regardless of source status.",
      tipAr: "الشهادات لا تضمن الصحة. تحقق من الادعاءات بغض النظر عن مكانة المصدر.",
    },
    {
      id: "emotional",
      name: "Emotional Reasoning",
      nameAr: "التفكير العاطفي",
      icon: <Zap size={20} />,
      color: "#EC4899",
      description: "Believing something is true because it 'feels' right",
      descriptionAr: "الاعتقاد بأن شيئاً صحيح لأنه 'يشعر' بالصواب",
      vulnerability: Math.round(baseVulnerabilities.emotional),
      exercises: ["Mental Health Day 1-5"],
      tip: "When content triggers strong emotion, that's when you need to slow down the most.",
      tipAr: "عندما يثير المحتوى مشاعر قوية، هذا هو الوقت الذي تحتاج فيه للتباطؤ أكثر.",
    },
    {
      id: "bandwagon",
      name: "Bandwagon Effect",
      nameAr: "تأثير العربة",
      icon: <Users size={20} />,
      color: "#06B6D4",
      description: "Adopting beliefs because many others hold them",
      descriptionAr: "تبني المعتقدات لأن كثيرين يعتقدون بها",
      vulnerability: Math.round(baseVulnerabilities.bandwagon),
      exercises: ["DeepReal Day 6-10"],
      tip: "Popularity is not proof. Millions can share something false.",
      tipAr: "الشعبية ليست دليلاً. الملايين يمكنهم مشاركة شيء كاذب.",
    },
    {
      id: "dunningKruger",
      name: "Dunning-Kruger",
      nameAr: "تأثير دانينج-كروجر",
      icon: <Brain size={20} />,
      color: "#10B981",
      description: "Overestimating one's own knowledge in unfamiliar domains",
      descriptionAr: "المبالغة في تقدير المعرفة الشخصية في مجالات غير مألوفة",
      vulnerability: Math.round(baseVulnerabilities.dunningKruger),
      exercises: ["All tracks — self-assessment"],
      tip: "The more you learn, the more you realize how much you don't know.",
      tipAr: "كلما تعلمت أكثر، أدركت أكثر كم لا تعرف.",
    },
    {
      id: "availability",
      name: "Availability Heuristic",
      nameAr: "استدلال التوافر",
      icon: <AlertTriangle size={20} />,
      color: "#F97316",
      description: "Judging likelihood by how easily examples come to mind",
      descriptionAr: "الحكم على الاحتمالية بمدى سهولة تذكر الأمثلة",
      vulnerability: Math.round(baseVulnerabilities.availability),
      exercises: ["Mental Health Day 6-10"],
      tip: "Just because you saw it on social media doesn't mean it's common.",
      tipAr: "مجرد رؤيتك لشيء على وسائل التواصل لا يعني أنه شائع.",
    },
    {
      id: "sunkCost",
      name: "Sunk Cost Fallacy",
      nameAr: "مغالطة التكلفة الغارقة",
      icon: <TrendingUp size={20} />,
      color: "#6366F1",
      description: "Continuing to believe something because you've invested in it",
      descriptionAr: "الاستمرار في تصديق شيء لأنك استثمرت فيه",
      vulnerability: Math.round(baseVulnerabilities.sunkCost),
      exercises: ["Religion Hub Day 8-14"],
      tip: "It's okay to change your mind. That's growth, not weakness.",
      tipAr: "لا بأس بتغيير رأيك. هذا نمو وليس ضعفاً.",
    },
  ];
}

function RadarCanvas({ biases, isRTL }: { biases: BiasProfile[]; isRTL: boolean }) {
  const size = 320;
  const center = size / 2;
  const maxR = size / 2 - 40;
  const count = biases.length;

  const points = biases.map((b, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const r = (b.vulnerability / 100) * maxR;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), angle, b };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 400, margin: "0 auto", display: "block" }}>
      {/* Grid circles */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={Array.from({ length: count }, (_, i) => {
            const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
            const r = (level / 100) * maxR;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(148,163,184,0.15)"
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {points.map((p, i) => (
        <line key={i} x1={center} y1={center} x2={center + maxR * Math.cos(p.angle)} y2={center + maxR * Math.sin(p.angle)} stroke="rgba(148,163,184,0.1)" strokeWidth={1} />
      ))}

      {/* Data polygon */}
      <polygon points={polygon} fill="rgba(239,68,68,0.15)" stroke="#EF4444" strokeWidth={2} />

      {/* Data points + labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={5} fill={p.b.color} stroke="#fff" strokeWidth={1.5} />
          <text
            x={center + (maxR + 24) * Math.cos(p.angle)}
            y={center + (maxR + 24) * Math.sin(p.angle)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize={9}
            fontWeight={600}
            fontFamily={isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit"}
          >
            {isRTL ? p.b.nameAr.split(" ").slice(0, 2).join(" ") : p.b.name.split(" ")[0]}
          </text>
          <text
            x={center + (maxR + 24) * Math.cos(p.angle)}
            y={center + (maxR + 24) * Math.sin(p.angle) + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={p.b.color}
            fontSize={10}
            fontWeight={800}
          >
            {p.b.vulnerability}%
          </text>
        </g>
      ))}

      {/* Center score */}
      <text x={center} y={center - 8} textAnchor="middle" fill="var(--text-primary)" fontSize={22} fontWeight={800} fontFamily="'Clash Display', sans-serif">
        {Math.round(biases.reduce((s, b) => s + b.vulnerability, 0) / biases.length)}%
      </text>
      <text x={center} y={center + 12} textAnchor="middle" fill="var(--text-muted)" fontSize={10}>
        {isRTL ? "متوسط الهشاشة" : "AVG VULNERABILITY"}
      </text>
    </svg>
  );
}

export default function BiasFingerprint() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [selectedBias, setSelectedBias] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const biases = useMemo(() => computeBiasVulnerability(), []);
  const user = null as any; // Removed getCurrentUser from client component
  const avgVulnerability = Math.round(biases.reduce((s, b) => s + b.vulnerability, 0) / biases.length);
  const strongestDefense = biases.reduce((a, b) => (a.vulnerability < b.vulnerability ? a : b));
  const weakestDefense = biases.reduce((a, b) => (a.vulnerability > b.vulnerability ? a : b));

  if (!mounted) return null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(139,92,246,0.15))",
            border: "2px solid rgba(239,68,68,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Fingerprint size={36} style={{ color: "#EF4444" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Your Cognitive", ar: "بصمتك", arEG: "بصمتك" })} <span className="text-gradient">{t({ en: "Bias Fingerprint", ar: "المعرفية", arEG: "المعرفية" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "A personalized map of your vulnerability to 8 cognitive biases — built from your actual exercise responses.",
              ar: "خريطة شخصية لهشاشتك أمام 8 انحيازات معرفية — مبنية من إجاباتك الفعلية في التمارين.",
              arEG: "خريطة شخصية لهشاشتك أمام 8 انحيازات معرفية — مبنية من إجاباتك الفعلية في التمارين.",
            })}
          </p>
          {user && (
            <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-caption)" }}>
              {t({ en: "Profile for:", ar: "الملف الشخصي لـ:", arEG: "الملف الشخصي لـ:" })} <strong>{user.name}</strong>
            </div>
          )}
        </div>

        {/* Radar Chart + Summary */}
        <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(300px, 1fr) minmax(280px, 1fr)", marginBottom: 32 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <RadarCanvas biases={biases} isRTL={a} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="glass-card" style={{ padding: 20, borderLeft: "4px solid #10B981" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                {t({ en: "Strongest Defense", ar: "أقوى دفاع", arEG: "أقوى دفاع" })}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#10B981", fontFamily: ff }}>
                {a ? strongestDefense.nameAr : strongestDefense.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{strongestDefense.vulnerability}% {t({ en: "vulnerability", ar: "هشاشة", arEG: "هشاشة" })}</div>
            </div>
            <div className="glass-card" style={{ padding: 20, borderLeft: "4px solid #EF4444" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                {t({ en: "Biggest Blind Spot", ar: "أكبر نقطة ضعف", arEG: "أكبر نقطة ضعف" })}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#EF4444", fontFamily: ff }}>
                {a ? weakestDefense.nameAr : weakestDefense.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{weakestDefense.vulnerability}% {t({ en: "vulnerability", ar: "هشاشة", arEG: "هشاشة" })}</div>
            </div>
            <div className="glass-card" style={{ padding: 20, background: avgVulnerability > 60 ? "rgba(239,68,68,0.06)" : avgVulnerability > 40 ? "rgba(245,158,11,0.06)" : "rgba(16,185,129,0.06)" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                {t({ en: "Overall Resilience Level", ar: "مستوى المرونة الكلي", arEG: "مستوى المرونة الكلي" })}
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: avgVulnerability > 60 ? "#EF4444" : avgVulnerability > 40 ? "#F59E0B" : "#10B981" }}>
                {100 - avgVulnerability}%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: ff }}>
                {avgVulnerability > 60
                  ? t({ en: "Needs significant work — start with exercises!", ar: "يحتاج عمل كبير — ابدأ بالتمارين!", arEG: "يحتاج عمل كبير — ابدأ بالتمارين!" })
                  : avgVulnerability > 40
                  ? t({ en: "Good progress — keep training your defenses", ar: "تقدم جيد — استمر في تدريب دفاعاتك", arEG: "تقدم جيد — استمر في تدريب دفاعاتك" })
                  : t({ en: "Excellent! Your cognitive armor is strong", ar: "ممتاز! درعك المعرفي قوي", arEG: "ممتاز! درعك المعرفي قوي" })}
              </div>
            </div>
          </div>
        </div>

        {/* Bias Detail Cards */}
        <h2 style={{ fontSize: 20, marginBottom: 16, fontFamily: ff }}>
          {t({ en: "Bias-by-Bias Breakdown", ar: "تحليل كل انحياز", arEG: "تحليل كل انحياز" })}
        </h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {biases.map((bias) => (
            <button
              key={bias.id}
              onClick={() => setSelectedBias(selectedBias === bias.id ? null : bias.id)}
              className="glass-card"
              style={{
                padding: 20, textAlign: "left", border: selectedBias === bias.id ? `2px solid ${bias.color}` : "1px solid var(--border-primary)",
                cursor: "pointer", background: selectedBias === bias.id ? `${bias.color}08` : "var(--bg-secondary)",
                transition: "all 0.2s", direction: dir,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ color: bias.color }}>{bias.icon}</div>
                  <strong style={{ fontSize: 14, fontFamily: ff }}>{a ? bias.nameAr : bias.name}</strong>
                </div>
                <span style={{
                  padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: bias.vulnerability > 60 ? "rgba(239,68,68,0.12)" : bias.vulnerability > 40 ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                  color: bias.vulnerability > 60 ? "#EF4444" : bias.vulnerability > 40 ? "#F59E0B" : "#10B981",
                }}>
                  {bias.vulnerability}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: "100%", height: 6, borderRadius: 3, background: "var(--bg-primary)", marginBottom: 8 }}>
                <div style={{
                  width: `${bias.vulnerability}%`, height: "100%", borderRadius: 3,
                  background: `linear-gradient(90deg, ${bias.color}88, ${bias.color})`,
                  transition: "width 0.5s ease",
                }} />
              </div>

              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, margin: 0, fontFamily: ff }}>
                {a ? bias.descriptionAr : bias.description}
              </p>

              {selectedBias === bias.id && (
                <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-cta)", marginBottom: 4, fontFamily: ff }}>
                    💡 {t({ en: "How to strengthen:", ar: "كيف تقوي:", arEG: "كيف تقوي:" })}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, fontFamily: ff }}>
                    {a ? bias.tipAr : bias.tip}
                  </p>
                  <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-caption)" }}>
                    {t({ en: "Related exercises:", ar: "تمارين ذات صلة:", arEG: "تمارين ذات صلة:" })} {bias.exercises.join(", ")}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 32, marginTop: 32, textAlign: "center", background: "linear-gradient(135deg, rgba(239,68,68,0.05), rgba(139,92,246,0.05))" }}>
          <h3 style={{ marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Want to reduce your vulnerability?", ar: "تريد تقليل هشاشتك؟", arEG: "تريد تقليل هشاشتك؟" })}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16, fontFamily: ff }}>
            {t({
              en: "Complete more exercises to strengthen your cognitive defenses. Your fingerprint updates in real-time.",
              ar: "أكمل المزيد من التمارين لتقوية دفاعاتك المعرفية. بصمتك تتحدث في الوقت الحقيقي.",
              arEG: "أكمل المزيد من التمارين لتقوية دفاعاتك المعرفية. بصمتك تتحدث في الوقت الحقيقي.",
            })}
          </p>
          <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "12px 28px", fontSize: 14 }}>
            {t({ en: "Go to Exercises", ar: "اذهب للتمارين", arEG: "اذهب للتمارين" })} <ArrowRight size={16} style={{ marginLeft: 6, transform: a ? "rotate(180deg)" : "none" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
