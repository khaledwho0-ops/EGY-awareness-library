"use client";

import { useRTL } from "@/components/shared/rtl-provider";
import { useState, useEffect } from "react";
import {
  Zap, Brain, Eye, Heart, Clock, Users, TrendingUp, Gift, Star,
  Flame, Target, Lock, Bell, BarChart, Sparkles, Shield, ArrowRight,
  CheckCircle2, Trophy, Gauge, AlertTriangle, MessageCircle
} from "lucide-react";

const HOOKS = [
  { id: 1, name: "Variable Reward", nameAr: "المكافأة المتغيرة", desc: "Random XP gains keep users guessing. Each page gives 10-30 XP.", descAr: "مكاسب XP عشوائية تبقي المستخدم في حالة تخمين.", icon: <Gift size={20} />, color: "var(--accent-cta)", cat: "reward" },
  { id: 2, name: "Streak Maintenance", nameAr: "صيانة التسلسل", desc: "Loss aversion: users return daily to protect their streak.", descAr: "نفور الخسارة: يعود المستخدم يومياً لحماية تسلسله.", icon: <Flame size={20} />, color: "var(--color-warning)", cat: "habit" },
  { id: 3, name: "Social Proof", nameAr: "الدليل الاجتماعي", desc: "'X users exploring now' creates perceived activity.", descAr: "'X مستخدم نشط الآن' يخلق نشاطاً محسوساً.", icon: <Users size={20} />, color: "var(--accent-mentalhealth)", cat: "social" },
  { id: 4, name: "Endowed Progress", nameAr: "التقدم الممنوح", desc: "Progress starts at 20%, not 0%. Users feel already invested.", descAr: "التقدم يبدأ من 20% وليس 0%. يشعر المستخدم بالاستثمار.", icon: <TrendingUp size={20} />, color: "var(--accent-deepreal)", cat: "progress" },
  { id: 5, name: "Achievement Badges", nameAr: "شارات الإنجاز", desc: "Explorer → Researcher → Scholar → Expert progression.", descAr: "مستكشف → باحث → عالم → خبير.", icon: <Trophy size={20} />, color: "var(--accent-religionhub)", cat: "reward" },
  { id: 6, name: "Sunk Cost Fallacy", nameAr: "مغالطة التكلفة الغارقة", desc: "'You invested X min' reminds users of time spent.", descAr: "'استثمرت X دقيقة' يذكر المستخدم بالوقت المبذول.", icon: <Clock size={20} />, color: "var(--text-muted)", cat: "retention" },
  { id: 7, name: "Near-Miss Effect", nameAr: "تأثير الفوت القريب", desc: "'2 pages to unlock Scholar' creates proximity urgency.", descAr: "'صفحتان لفتح عالم' يخلق إلحاح القرب.", icon: <Target size={20} />, color: "var(--color-error)", cat: "progress" },
  { id: 8, name: "Curiosity Gap", nameAr: "فجوة الفضول", desc: "Blurred previews and 'unlock' labels create need-to-know.", descAr: "المعاينات المموهة تخلق حاجة للمعرفة.", icon: <Eye size={20} />, color: "var(--accent-cta)", cat: "attention" },
  { id: 9, name: "Zeigarnik Effect", nameAr: "تأثير زيغارنيك", desc: "Incomplete tasks nag the mind. Badge count shows unfinished.", descAr: "المهام غير المكتملة تلح على العقل.", icon: <AlertTriangle size={20} />, color: "var(--color-warning)", cat: "retention" },
  { id: 10, name: "Goal Gradient", nameAr: "تدرج الهدف", desc: "Effort increases as users near a goal (next badge).", descAr: "الجهد يزداد كلما اقترب المستخدم من الهدف.", icon: <TrendingUp size={20} />, color: "var(--accent-mentalhealth)", cat: "progress" },
  { id: 11, name: "Anchoring", nameAr: "التثبيت", desc: "Showing 300 exercises and 84 participants first sets high anchor.", descAr: "عرض 300 تمرين و84 مشارك أولاً يضع مرساة عالية.", icon: <BarChart size={20} />, color: "var(--accent-deepreal)", cat: "persuasion" },
  { id: 12, name: "Reciprocity", nameAr: "المعاملة بالمثل", desc: "'We prepared this for you' triggers return obligation.", descAr: "'أعددنا هذا لك' يحفز التزام الرد.", icon: <Heart size={20} />, color: "var(--accent-religionhub)", cat: "social" },
  { id: 13, name: "Scarcity", nameAr: "الندرة", desc: "'Limited pilot spots' creates urgency to act.", descAr: "'مقاعد محدودة' يخلق إلحاحاً للتصرف.", icon: <Lock size={20} />, color: "var(--color-error)", cat: "persuasion" },
  { id: 14, name: "Default Bias", nameAr: "تحيز الافتراضي", desc: "Pre-selected recommendations reduce decision friction.", descAr: "التوصيات المحددة مسبقاً تقلل احتكاك القرار.", icon: <CheckCircle2 size={20} />, color: "var(--accent-cta)", cat: "friction" },
  { id: 15, name: "Commitment Escalation", nameAr: "تصعيد الالتزام", desc: "Small asks first (visit page) → bigger (take assessment).", descAr: "طلبات صغيرة أولاً (زيارة) → أكبر (تقييم).", icon: <TrendingUp size={20} />, color: "var(--accent-mentalhealth)", cat: "habit" },
  { id: 16, name: "Peak-End Rule", nameAr: "قاعدة الذروة والنهاية", desc: "Celebration on completion makes memory positive.", descAr: "الاحتفال عند الإكمال يجعل الذكرى إيجابية.", icon: <Sparkles size={20} />, color: "var(--accent-religionhub)", cat: "reward" },
  { id: 17, name: "Mere Exposure", nameAr: "التعرض المجرد", desc: "Repeated brand elements increase liking subconsciously.", descAr: "تكرار عناصر العلامة يزيد الإعجاب لاواعياً.", icon: <Eye size={20} />, color: "var(--text-muted)", cat: "retention" },
  { id: 18, name: "Authority Bias", nameAr: "تحيز السلطة", desc: "Expert endorsement and university affiliation add trust.", descAr: "تأييد الخبراء والانتماء الجامعي يضيف ثقة.", icon: <Shield size={20} />, color: "var(--accent-deepreal)", cat: "persuasion" },
  { id: 19, name: "Number Attachment", nameAr: "التعلق بالأرقام", desc: "Bold stats (84, 300, 5) create perceived precision.", descAr: "الأرقام الجريئة تخلق دقة محسوسة.", icon: <BarChart size={20} />, color: "var(--accent-cta)", cat: "persuasion" },
  { id: 20, name: "Micro-Celebrations", nameAr: "الاحتفالات المصغرة", desc: "XP toast popup on each new page creates dopamine hit.", descAr: "إشعار XP عند كل صفحة جديدة يحفز الدوبامين.", icon: <Sparkles size={20} />, color: "var(--color-warning)", cat: "reward" },
  { id: 21, name: "FOMO", nameAr: "الخوف من الفوات", desc: "'Others are ahead' creates competitive pressure.", descAr: "'الآخرون متقدمون' يخلق ضغط المنافسة.", icon: <Users size={20} />, color: "var(--color-error)", cat: "social" },
  { id: 22, name: "Feedback Loops", nameAr: "حلقات التغذية الراجعة", desc: "Immediate visual response to every action.", descAr: "استجابة بصرية فورية لكل إجراء.", icon: <Zap size={20} />, color: "var(--accent-cta)", cat: "attention" },
  { id: 23, name: "Personalization", nameAr: "التخصيص", desc: "RTL/LTR adaptation makes it feel 'built for me'.", descAr: "تكيف RTL/LTR يجعل المستخدم يشعر بأنه 'مصمم لي'.", icon: <Heart size={20} />, color: "var(--accent-mentalhealth)", cat: "friction" },
  { id: 24, name: "Progress Visibility", nameAr: "رؤية التقدم", desc: "Circular progress ring always visible in FAB.", descAr: "حلقة التقدم الدائرية مرئية دائماً.", icon: <Gauge size={20} />, color: "var(--accent-deepreal)", cat: "progress" },
  { id: 25, name: "Notification Dot", nameAr: "نقطة الإشعار", desc: "Red badge count on FAB creates irresistible urge to clear.", descAr: "عدد الشارات الأحمر يخلق رغبة لا تقاوم للتصفية.", icon: <Bell size={20} />, color: "var(--color-error)", cat: "attention" },
  { id: 26, name: "Magnetic Animation", nameAr: "الحركة المغناطيسية", desc: "Hover scale on buttons creates playful interaction.", descAr: "تكبير الأزرار عند التمرير يخلق تفاعلاً مرحاً.", icon: <Zap size={20} />, color: "var(--accent-religionhub)", cat: "attention" },
  { id: 27, name: "Smart Suggestions", nameAr: "اقتراحات ذكية", desc: "'Suggested Next Page' removes decision paralysis.", descAr: "'الصفحة المقترحة' يزيل شلل القرار.", icon: <Brain size={20} />, color: "var(--accent-cta)", cat: "friction" },
  { id: 28, name: "Stagger Reveal", nameAr: "الكشف المتتابع", desc: "List items appear one-by-one, creating anticipation.", descAr: "العناصر تظهر واحدة تلو الأخرى مما يخلق ترقباً.", icon: <Eye size={20} />, color: "var(--accent-mentalhealth)", cat: "attention" },
  { id: 29, name: "Gradient Urgency", nameAr: "إلحاح التدرج", desc: "Animated gradient banner creates time-pressure feeling.", descAr: "الشريط المتدرج المتحرك يخلق شعور ضغط الوقت.", icon: <Clock size={20} />, color: "var(--color-warning)", cat: "persuasion" },
  { id: 30, name: "Pulse CTA", nameAr: "النبض على الزر", desc: "Pulsing glow on primary buttons draws eye unconsciously.", descAr: "التوهج النابض على الأزرار يجذب العين لاواعياً.", icon: <Zap size={20} />, color: "var(--accent-cta)", cat: "attention" },
];

const CATEGORIES = [
  { key: "all", label: "All", labelAr: "الكل" },
  { key: "attention", label: "Attention", labelAr: "الانتباه" },
  { key: "reward", label: "Reward", labelAr: "المكافأة" },
  { key: "habit", label: "Habit", labelAr: "العادة" },
  { key: "progress", label: "Progress", labelAr: "التقدم" },
  { key: "social", label: "Social", labelAr: "اجتماعي" },
  { key: "persuasion", label: "Persuasion", labelAr: "الإقناع" },
  { key: "friction", label: "Friction", labelAr: "الاحتكاك" },
  { key: "retention", label: "Retention", labelAr: "الاحتفاظ" },
];

export default function UXSciencePage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = filter === "all" ? HOOKS : HOOKS.filter(h => h.cat === filter);

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "var(--navbar-height)", direction: dir, fontFamily: ff, minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: "400px", height: "400px", background: "var(--accent-cta)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "300px", height: "300px", background: "var(--accent-religionhub)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="ux-float" style={{ display: "inline-block", marginBottom: "24px" }}>
            <Brain size={56} style={{ color: "var(--accent-cta)" }} />
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, marginBottom: "16px" }}>
            {t({ en: "30 Behavioral Hooks Applied", ar: "30 خدعة سلوكية مطبقة", arEG: "30 خدعة سلوكية مطبقة" })}
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "650px", margin: "0 auto", lineHeight: 1.7 }}>
            {t({ en: "Every psychological technique used on this site — visible and explained. The same methods Instagram, TikTok, and Duolingo use.", ar: "كل تقنية نفسية مستخدمة في هذا الموقع — مرئية ومشروحة. نفس الأساليب التي تستخدمها Instagram و TikTok و Duolingo.", arEG: "كل تقنية نفسية مستخدمة في هذا الموقع — مرئية ومشروحة. نفس الأساليب التي تستخدمها Instagram و TikTok و Duolingo." })}
          </p>

          {/* Live counter */}
          <div className="ux-breathe" style={{ marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "var(--radius-full)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", fontSize: "14px" }}>
            <Sparkles size={14} style={{ color: "var(--accent-cta)" }} />
            <span style={{ color: "var(--text-muted)" }}>{t({ en: "You're experiencing", ar: "أنت تتعرض لـ", arEG: "أنت تتعرض لـ" })} <strong style={{ color: "var(--accent-cta)" }}>30</strong> {t({ en: "hooks right now", ar: "خدعة الآن", arEG: "خدعة الآن" })}</span>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ padding: "0 0 40px" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={filter === cat.key ? "ux-pulse" : ""}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-primary)",
                  background: filter === cat.key ? "var(--accent-cta)" : "var(--bg-secondary)",
                  color: filter === cat.key ? "#fff" : "var(--text-primary)",
                  cursor: "pointer", fontSize: "13px", fontFamily: ff,
                  transition: "all 0.2s ease",
                }}
              >
                {a ? cat.labelAr : cat.label} ({cat.key === "all" ? 30 : HOOKS.filter(h => h.cat === cat.key).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOOKS GRID */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div className="ux-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {filtered.map((hook) => (
              <div
                key={hook.id}
                className="glass-card ux-tilt"
                onMouseEnter={() => setHoveredId(hook.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: "20px", direction: dir, cursor: "default",
                  borderLeft: a ? "none" : `3px solid ${hook.color}`,
                  borderRight: a ? `3px solid ${hook.color}` : "none",
                  transition: "all 0.3s ease",
                  transform: hoveredId === hook.id ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--bg-primary)", border: `1px solid ${hook.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: hook.color,
                  }}>
                    {hook.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "bold" }}>#{hook.id}</span>
                    <div style={{ fontWeight: "bold", fontSize: "15px" }}>{a ? hook.nameAr : hook.name}</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {a ? hook.descAr : hook.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="section-padding" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
        <div className="container">
          <h3 style={{ marginBottom: "16px" }}>{t({ en: "Scientific Sources", ar: "المصادر العلمية", arEG: "المصادر العلمية" })}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", fontSize: "13px", color: "var(--text-muted)" }}>
            {[
              "Nir Eyal — Hooked (2014)",
              "BJ Fogg — Tiny Habits (2019)",
              "Cialdini — Influence (2006)",
              "Kahneman — Thinking Fast & Slow (2011)",
              "Zeigarnik Effect (1927)",
              "Endowment Effect — Thaler (1980)",
            ].map((src, i) => (
              <span key={i} className="glass-card" style={{ padding: "6px 14px", borderRadius: "var(--radius-full)" }}>{src}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
