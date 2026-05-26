"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock3,
  Eye,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";

type BranchNode = {
  id: number;
  titleAr: string;
  titleEn: string;
  actionAr: string;
  actionEn: string;
  harmAr: string;
  harmEn: string;
  truthAr: string;
  truthEn: string;
  sourceLabelAr: string;
  sourceLabelEn: string;
};

const MISINFO_TEXT_AR =
  "السكر صحي ومفيش أي مشاكل حتى لو عندك مرض السكر";
const CORRECT_TEXT_AR =
  "مرض السكر النوع 2 يحتاج إدارة طبية دقيقة. الإنسولين والأدوية أنقذت ملايين الأرواح. المصدر: منظمة الصحة العالمية، 2024.";

const HARM_BRANCHES: BranchNode[] = [
  {
    id: 1,
    titleAr: "الأب",
    titleEn: "The father",
    actionAr: "أوقف الإنسولين بعد أن صدق الرسالة.",
    actionEn: "Stops insulin after believing the forwarded claim.",
    harmAr: "تدهورت حالته ووصل للطوارئ بعد أزمة سكر حادة.",
    harmEn: "He deteriorates and lands in emergency care after a severe diabetic crisis.",
    truthAr:
      "حالة توضيحية مبنية على نمط واقعي متكرر في رسائل واتساب الصحية داخل مصر. يجب الرجوع لطبيب معتمد فوراً.",
    truthEn:
      "Illustrative path based on a recurring Egyptian WhatsApp-health rumor pattern. Immediate physician follow-up is required.",
    sourceLabelAr: "Illustrative path grounded in Egyptian misinformation patterns",
    sourceLabelEn: "Illustrative path grounded in Egyptian misinformation patterns",
  },
  {
    id: 2,
    titleAr: "الطفل",
    titleEn: "The child",
    actionAr: "يكرر المعلومة لجده المريض على أنها نصيحة ذكية.",
    actionEn: "Repeats the claim to his grandfather as if it were a smart shortcut.",
    harmAr: "الجد يدخل في أزمة ارتفاع سكر لأن النصيحة جاءت من شخص يثق به.",
    harmEn: "The grandfather slips into hyperglycemia because the advice came from someone he trusts.",
    truthAr:
      "المشكلة ليست في النية بل في سلسلة الثقة داخل الأسرة عندما تغيب المراجعة الطبية.",
    truthEn:
      "The danger is not intent, but the family trust chain when medical review disappears.",
    sourceLabelAr: "Illustrative family-trust cascade",
    sourceLabelEn: "Illustrative family-trust cascade",
  },
  {
    id: 3,
    titleAr: "الأم",
    titleEn: "The mother",
    actionAr: "ترسله إلى جروب العائلة باعتباره معلومة نافعة.",
    actionEn: "Shares it to the family WhatsApp group as a useful health tip.",
    harmAr: "ثلاثة أقارب يبدؤون في تقليل الجرعات من غير متابعة.",
    harmEn: "Three relatives begin reducing medication doses with no supervision.",
    truthAr:
      "رسائل العائلة تمنح الشائعة قوة اجتماعية أكبر من أي عنوان صحفي، ولذلك تحتاج توقفاً واعياً قبل الإرسال.",
    truthEn:
      "Family-group forwards carry more social force than a headline, which is why they require a deliberate pause before sending.",
    sourceLabelAr: "Illustrative family-group spread pattern",
    sourceLabelEn: "Illustrative family-group spread pattern",
  },
  {
    id: 4,
    titleAr: "الشاب المؤمن",
    titleEn: "The believer",
    actionAr: "يعيد نشرها بصياغة دينية تمنحها يقيناً زائفاً.",
    actionEn: "Reposts it with religious language that gives it false certainty.",
    harmAr: "تصل الرسالة إلى دوائر أوسع لأن الاعتراض عليها يبدو كأنه اعتراض على الإيمان نفسه.",
    harmEn: "The message spreads further because objecting now feels like objecting to faith itself.",
    truthAr:
      "المنصة تفرق بين الإيمان الصادق وبين استخدام الخطاب الديني لإسكات الدليل الطبي.",
    truthEn:
      "The platform separates sincere faith from using religious rhetoric to silence medical evidence.",
    sourceLabelAr: "Illustrative religion-framed misinformation case",
    sourceLabelEn: "Illustrative religion-framed misinformation case",
  },
  {
    id: 5,
    titleAr: "الصيدلاني",
    titleEn: "The pharmacist",
    actionAr: "يرى المنشور لكنه يتردد في تصحيحه حتى لا يدخل في جدال.",
    actionEn: "Sees the post but hesitates to correct it to avoid conflict.",
    harmAr: "الصمت يتحول إلى موافقة ضمنية، ويخرج الزبائن وهم أكثر ثقة في الرسالة.",
    harmEn: "Silence becomes implied agreement, and customers leave more confident in the rumor.",
    truthAr:
      "واحدة من أخطر نقاط الفشل هي عندما يعرف شخص الحقيقة لكنه يختار الصمت الاجتماعي.",
    truthEn:
      "One of the most dangerous failure points is when someone knows the truth but chooses social silence.",
    sourceLabelAr: "Illustrative professional-silence scenario",
    sourceLabelEn: "Illustrative professional-silence scenario",
  },
  {
    id: 6,
    titleAr: "المعلمة",
    titleEn: "The teacher",
    actionAr: "ترسله إلى مجموعة أولياء الأمور باعتباره نصيحة مدرسية مفيدة.",
    actionEn: "Sends it to the parents' group as a caring school-health tip.",
    harmAr: "المعلومة تنتقل من بيت واحد إلى شبكة كاملة من الأسر في ساعات قليلة.",
    harmEn: "The claim jumps from one household to a full parent network within hours.",
    truthAr:
      "عندما ترتبط الشائعة بشخص له مكانة تعليمية، يصبح التصحيح أصعب ما لم يكن جاهزاً وواضحاً.",
    truthEn:
      "When a rumor is attached to an educator's status, correction becomes harder unless it is ready and explicit.",
    sourceLabelAr: "Illustrative school-network spread scenario",
    sourceLabelEn: "Illustrative school-network spread scenario",
  },
];

const POSITIVE_BRANCHES = [
  { id: 1, titleAr: "الأب", titleEn: "The father", actionAr: "يكمل علاجه ويطلب مراجعة من طبيبه.", actionEn: "Keeps treatment on track and requests physician review." },
  { id: 2, titleAr: "الطفل", titleEn: "The child", actionAr: "يتعلم أن الصحة ليست نصيحة سريعة بل مسؤولية.", actionEn: "Learns that health is not a shortcut but a responsibility." },
  { id: 3, titleAr: "الأم", titleEn: "The mother", actionAr: "تستبدل الإرسال الأعمى برسالة تصحيح داخل الجروب.", actionEn: "Replaces blind forwarding with a correction message in the group." },
  { id: 4, titleAr: "الشاب المؤمن", titleEn: "The believer", actionAr: "يربط الأمانة الدينية بطلب الدليل وليس رفضه.", actionEn: "Connects religious integrity to seeking evidence, not rejecting it." },
  { id: 5, titleAr: "الصيدلاني", titleEn: "The pharmacist", actionAr: "يتدخل مبكراً ويشرح الفرق بين النصيحة والشائعة.", actionEn: "Intervenes early and explains the line between advice and rumor." },
  { id: 6, titleAr: "المعلمة", titleEn: "The teacher", actionAr: "تحول المجموعة المدرسية إلى قناة تصحيح لا إلى قناة تضليل.", actionEn: "Turns the school group into a correction channel instead of a rumor channel." },
];

const EGYPT_DOTS = [
  { name: "Cairo", cx: 118, cy: 68 },
  { name: "Giza", cx: 108, cy: 74 },
  { name: "Alexandria", cx: 88, cy: 42 },
  { name: "Suez", cx: 148, cy: 82 },
  { name: "Mansoura", cx: 122, cy: 50 },
  { name: "Tanta", cx: 105, cy: 51 },
  { name: "Asyut", cx: 123, cy: 132 },
  { name: "Luxor", cx: 138, cy: 176 },
  { name: "Aswan", cx: 148, cy: 214 },
  { name: "Port Said", cx: 161, cy: 60 },
];

function toArabicNumber(value: number) {
  return new Intl.NumberFormat("ar-EG").format(Math.round(value));
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reducedMotion;
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function countTo(
  from: number,
  to: number,
  durationMs: number,
  onUpdate: (value: number) => void,
  onDone?: () => void,
) {
  const start = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(from + (to - from) * eased);
    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

export function BranchingVisualExperience() {
  const { isRTL } = useRTL();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<
    "idle" | "spreading" | "branches" | "truth" | "rewinding" | "rewound" | "correcting" | "corrected"
  >("idle");
  const [branchCount, setBranchCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [displayText, setDisplayText] = useState(MISINFO_TEXT_AR);
  const [showTextOnly, setShowTextOnly] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [liveMessage, setLiveMessage] = useState("");
  const holdTimer = useRef<number | null>(null);
  const holdInterval = useRef<number | null>(null);

  const canRevealTruth = phase === "branches" && branchCount === HARM_BRANCHES.length;
  const canRewind = phase === "truth";
  const canDeepReal = phase === "rewound";
  const positiveVisible = phase === "corrected";

  useEffect(() => {
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
      if (holdInterval.current) window.clearInterval(holdInterval.current);
    };
  }, []);

  const startSpread = () => {
    setPhase("spreading");
    setBranchCount(0);
    setShareCount(0);
    setDisplayText(MISINFO_TEXT_AR);
    setLiveMessage(
      isRTL ? "بدأ الانتشار. جاري احتساب المشاركات." : "Spread started. Counting shares.",
    );
    vibrate(50);

    const stopPrimary = countTo(0, 1247, reducedMotion ? 100 : 1800, setShareCount);
    window.setTimeout(() => {
      stopPrimary();
      setPhase("branches");

      if (reducedMotion) {
        setBranchCount(HARM_BRANCHES.length);
        setShareCount(3000);
        return;
      }

      HARM_BRANCHES.forEach((branch, index) => {
        window.setTimeout(() => {
          setBranchCount(index + 1);
          setLiveMessage(
            isRTL
              ? `فرع جديد: ${branch.titleAr} — ${branch.actionAr}`
              : `New branch: ${branch.titleEn} — ${branch.actionEn}`,
          );
          vibrate(20);
        }, index * 300);
      });

      countTo(1247, 3000, 2600, setShareCount);
    }, reducedMotion ? 0 : 2000);
  };

  const revealTruth = () => {
    setPhase("truth");
    setLiveMessage(
      isRTL
        ? "تم كشف طبقات الضرر ومسارات التصحيح التوضيحية."
        : "Truth reveal enabled. The illustrative harm paths are now visible.",
    );
    vibrate([30, 30]);
  };

  const executeRewind = () => {
    setPhase("rewinding");
    setLiveMessage(
      isRTL
        ? "السفر عبر الزمن يعمل الآن. الانتشار يعود إلى مصدره."
        : "Time travel engaged. The spread is reversing back to its origin.",
    );
    countTo(shareCount, 1, reducedMotion ? 80 : 1800, setShareCount);

    if (reducedMotion) {
      setBranchCount(0);
      setPhase("rewound");
      return;
    }

    HARM_BRANCHES.slice().reverse().forEach((_, index) => {
      window.setTimeout(() => {
        setBranchCount(HARM_BRANCHES.length - index - 1);
      }, index * 180);
    });

    window.setTimeout(() => {
      setPhase("rewound");
      setDisplayText(MISINFO_TEXT_AR);
    }, 1600);
  };

  const startHold = () => {
    if (phase !== "truth") return;
    setHoldProgress(0);
    const holdDuration = 2000;
    const step = reducedMotion ? 100 : 80;
    const totalSteps = holdDuration / step;
    let currentStep = 0;

    holdInterval.current = window.setInterval(() => {
      currentStep += 1;
      setHoldProgress(Math.min(100, (currentStep / totalSteps) * 100));
      vibrate(15);
    }, step);

    holdTimer.current = window.setTimeout(() => {
      if (holdInterval.current) window.clearInterval(holdInterval.current);
      setHoldProgress(100);
      executeRewind();
    }, holdDuration);
  };

  const cancelHold = () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    if (holdInterval.current) window.clearInterval(holdInterval.current);
    holdTimer.current = null;
    holdInterval.current = null;
    setHoldProgress(0);
  };

  const activateDeepReal = () => {
    setPhase("correcting");
    setLiveMessage(
      isRTL
        ? "DeepReal يعيد صياغة الجملة الخاطئة إلى حقيقة قابلة للتحقق."
        : "DeepReal is rewriting the false sentence into a verifiable truth.",
    );
    vibrate(200);

    if (reducedMotion) {
      setDisplayText(CORRECT_TEXT_AR);
      setPhase("corrected");
      return;
    }

    let cursor = 0;
    setDisplayText("");
    const timer = window.setInterval(() => {
      cursor += 1;
      setDisplayText(CORRECT_TEXT_AR.slice(0, cursor));
      if (cursor >= CORRECT_TEXT_AR.length) {
        window.clearInterval(timer);
        setPhase("corrected");
      }
    }, 18);
  };

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      "٦ عائلات تضررت من جملة واحدة. جرّب تجربة مكتبة الوعي المصري قبل ما تشارك أي ادعاء طبي.",
    );
    return `https://wa.me/?text=${message}`;
  }, []);

  return (
    <section
      id="branching-visual"
      className="glass-card"
      style={{
        padding: "var(--space-2xl)",
        overflow: "hidden",
        position: "relative",
        scrollMarginTop: "calc(var(--navbar-height) + 20px)",
        background:
          "radial-gradient(circle at top, rgba(239,68,68,0.12), rgba(5,10,20,0.98) 56%)",
      }}
    >
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
        }}
      >
        {liveMessage}
      </div>

      <BackgroundParticles phase={phase} reducedMotion={reducedMotion} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: "rgba(239,68,68,0.12)", color: "#fecaca", marginBottom: 12, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <AlertTriangle size={14} />
            {isRTL ? "مشهد الانتشار" : "Spread simulation"}
          </div>
          <h2 style={{ fontSize: "var(--font-h2)", marginBottom: 10 }}>
            <span className="text-gradient">
              {isRTL ? "صفحة التفرع البصري للتضليل" : "Misinformation branching visual page"}
            </span>
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 760, lineHeight: 1.8 }}>
            {isRTL
              ? "خمسة حالات تفاعلية كاملة: مشاركة الشائعة، انفجار الفروع، كشف الأثر، السفر العكسي، ثم DeepReal لتحويل الجملة الخاطئة إلى معلومة صحيحة قابلة للنشر."
              : "A full five-state interaction: share the rumor, watch the branches explode, reveal the consequences, rewind the chain, then let DeepReal replace the false sentence with a verifiable one."}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
          <button onClick={() => setShowTextOnly((current) => !current)} className="btn-secondary" style={{ padding: "10px 14px", fontSize: 13 }}>
            <Eye size={14} />
            {showTextOnly
              ? isRTL
                ? "الرجوع إلى الوضع البصري"
                : "Back to visual mode"
              : isRTL
                ? "عرض نصي بدون رسوم متحركة"
                : "Text-only fallback"}
          </button>
          <div style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(56,189,248,0.12)", color: "#bae6fd", fontSize: 12 }}>
            {reducedMotion
              ? isRTL
                ? "Reduced Motion مفعّل"
                : "Reduced motion active"
              : isRTL
                ? "الرسوم تعمل بكاملها"
                : "Full motion enabled"}
          </div>
        </div>
      </div>

      {showTextOnly ? (
        <TextOnlyBranchView isRTL={isRTL} />
      ) : (
        <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1.35fr) minmax(260px, .65fr)" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: "var(--space-2xl)", border: "1px solid rgba(248,113,113,0.25)", background: "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(11,17,28,0.94))", marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <div>
                  <div style={{ color: "var(--text-caption)", fontSize: 12, marginBottom: 8 }}>
                    {phase === "spreading"
                      ? isRTL
                        ? "جاري الانتشار..."
                        : "Spreading..."
                      : phase === "rewinding"
                        ? isRTL
                          ? "السفر العكسي قيد التنفيذ..."
                          : "Rewinding..."
                        : phase === "correcting"
                          ? "DeepReal"
                          : isRTL
                            ? "النقطة الأصلية"
                            : "Origin point"}
                  </div>
                  <h3 style={{ fontSize: 28, lineHeight: 1.5, marginBottom: 0 }}>
                    {displayText}
                  </h3>
                </div>
                <div style={{ minWidth: 170, padding: "14px 16px", borderRadius: 18, background: "rgba(239,68,68,0.12)", textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ color: "var(--text-caption)", fontSize: 12, marginBottom: 6 }}>
                    {isRTL ? "عداد الانتشار" : "Spread counter"}
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>
                    {toArabicNumber(shareCount)}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {isRTL ? "كل ضغطة تبدأ من شخص واحد" : "Every cascade starts with one decision"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {phase === "idle" && (
                  <button onClick={startSpread} className="btn-primary" style={{ padding: "14px 20px", animation: reducedMotion ? "none" : "pulse 1.8s infinite" }}>
                    <Share2 size={16} />
                    {isRTL ? "شارك وصدّق" : "Share & Believe"}
                  </button>
                )}
                {canRevealTruth && (
                  <button onClick={revealTruth} className="btn-secondary" style={{ padding: "14px 20px" }}>
                    <Eye size={16} />
                    {isRTL ? "ورّيني الحقيقة" : "Show me the truth"}
                  </button>
                )}
                {canRewind && (
                  <button onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold} onTouchStart={startHold} onTouchEnd={cancelHold} className="btn-secondary" style={{ padding: "14px 20px", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", inset: 0, width: `${holdProgress}%`, background: "rgba(56,189,248,0.18)", transition: "width 0.08s linear" }} />
                    <span style={{ position: "relative", display: "inline-flex", gap: 8, alignItems: "center" }}>
                      <Clock3 size={16} />
                      {isRTL ? "السفر عبر الزمن" : "Time travel"}
                    </span>
                  </button>
                )}
                {canDeepReal && (
                  <button onClick={activateDeepReal} className="btn-primary" style={{ padding: "14px 20px", background: "linear-gradient(135deg, var(--accent-cta), var(--accent-mentalhealth))" }}>
                    <ShieldCheck size={16} />
                    DeepReal
                  </button>
                )}
                {phase === "corrected" && (
                  <button onClick={() => { setPhase("idle"); setBranchCount(0); setShareCount(0); setDisplayText(MISINFO_TEXT_AR); }} className="btn-secondary" style={{ padding: "14px 20px" }}>
                    <RotateCcw size={16} />
                    {isRTL ? "إعادة التجربة" : "Run it again"}
                  </button>
                )}
              </div>
            </motion.div>

            <AnimatePresence>
              {(phase === "branches" || phase === "truth" || phase === "rewinding") && (
                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {HARM_BRANCHES.slice(0, branchCount).map((branch, index) => (
                    <motion.article
                      key={branch.id}
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: reducedMotion ? 0.05 : 0.32, delay: reducedMotion ? 0 : index * 0.04 }}
                      className="glass-card"
                      style={{ padding: "var(--space-lg)", borderInlineStart: `5px solid ${phase === "truth" ? "#ef4444" : index < 2 ? "#94a3b8" : index < 4 ? "#f59e0b" : "#ef4444"}`, background: "rgba(10,16,28,0.9)" }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>
                        {isRTL ? branch.titleAr : branch.titleEn}
                      </div>
                      <div style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 10 }}>
                        {isRTL ? branch.actionAr : branch.actionEn}
                      </div>
                      <div style={{ padding: "10px 12px", borderRadius: 14, background: "rgba(239,68,68,0.08)", color: "#fecaca", fontSize: 13, lineHeight: 1.7, marginBottom: phase === "truth" ? 10 : 0 }}>
                        {isRTL ? branch.harmAr : branch.harmEn}
                      </div>
                      {phase === "truth" && (
                        <div style={{ padding: "10px 12px", borderRadius: 14, background: "rgba(56,189,248,0.08)", color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8 }}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>
                            {isRTL ? "كشف الأثر" : "Consequence reveal"}
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            {isRTL ? branch.truthAr : branch.truthEn}
                          </div>
                          <div style={{ color: "var(--text-caption)", fontSize: 12 }}>
                            {isRTL ? branch.sourceLabelAr : branch.sourceLabelEn}
                          </div>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {positiveVisible && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 16 }}>
                {POSITIVE_BRANCHES.map((branch) => (
                  <div key={branch.id} className="glass-card" style={{ padding: "var(--space-lg)", borderInlineStart: "5px solid var(--accent-mentalhealth)", background: "rgba(6,78,59,0.14)" }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                      {isRTL ? branch.titleAr : branch.titleEn}
                    </div>
                    <div style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                      {isRTL ? branch.actionAr : branch.actionEn}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <EgyptSpreadMap isRTL={isRTL} dotCount={phase === "corrected" ? EGYPT_DOTS.length : phase === "truth" || phase === "branches" || phase === "rewinding" ? Math.min(EGYPT_DOTS.length, Math.max(branchCount + 4, 0)) : 0} positive={phase === "corrected"} />
            <div className="glass-card" style={{ padding: "var(--space-lg)", background: positiveVisible ? "rgba(6,95,70,0.14)" : "rgba(15,23,42,0.88)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <ButterflyGlyph positive={positiveVisible} />
                <div style={{ fontWeight: 700 }}>
                  {positiveVisible
                    ? isRTL
                      ? "الفراشة رجعت لفوق"
                      : "The butterfly rises"
                    : isRTL
                      ? "أفعالك ليها عواقب"
                      : "Your actions carry consequences"}
                </div>
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 0 }}>
                {positiveVisible
                  ? isRTL
                    ? "عندما تتحول الجملة إلى حقيقة قابلة للتحقق، تعود الشبكة نفسها لتوزيع الأثر الإيجابي."
                    : "When the sentence becomes verifiable truth, the same network starts distributing positive outcomes."
                  : isRTL
                    ? "الضرر لا يتحرك فقط عبر من يصدق، بل أيضاً عبر من يسكت أو يعيد الصياغة أو يمنح الشائعة مكانة اجتماعية."
                    : "Harm moves not only through belief, but through silence, reframing, and the borrowed status that makes a rumor look legitimate."}
              </p>
            </div>

            {positiveVisible && (
              <div className="glass-card" style={{ padding: "var(--space-lg)", border: "1px solid rgba(56,189,248,0.18)", background: "linear-gradient(180deg, rgba(56,189,248,0.10), rgba(15,23,42,0.95))" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-cta)", marginBottom: 8 }}>
                  {isRTL ? "بطاقة مشاركة" : "Share card"}
                </div>
                <h3 style={{ fontSize: 22, lineHeight: 1.4, marginBottom: 8 }}>
                  {isRTL ? "٦ عائلات تضررت من جملة واحدة. أفعالك ليها عواقب." : "Six families were harmed by one sentence. Your actions carry consequences."}
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16 }}>
                  {isRTL
                    ? "اعرف أكتر على صفحة DeepReal وجرب قبل ما تعيد إرسال أي ادعاء طبي."
                    : "Open DeepReal and test the claim before you ever forward a medical rumor again."}
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary no-underline" style={{ padding: "12px 16px" }}>
                    <Share2 size={14} />
                    WhatsApp
                  </a>
                  <Link href="/deepreal" className="btn-secondary no-underline" style={{ padding: "12px 16px" }}>
                    <ArrowUpRight size={14} />
                    DeepReal
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, marginTop: 20, color: "var(--text-caption)", fontSize: 12, lineHeight: 1.8 }}>
        {isRTL
          ? "ملاحظة صريحة: حالات الضرر الظاهرة هنا موضوعة كتدفق توضيحي مبني على أنماط تضليل واقعية داخل مصر، وليست تقارير صحفية موثقة فردياً داخل الصفحة الحالية."
          : "Honest note: the harm cases shown here are illustrative flows grounded in real Egyptian misinformation patterns, not individually verified newsroom case files on this page."}
        {" "}
        <Link href="/sources" style={{ color: "var(--accent-cta)" }}>
          {isRTL ? "راجع قاعدة المصادر" : "Open the sources registry"}
        </Link>
        {" "}
        {isRTL ? "لمراجعة الأدلة الحقيقية قبل النشر." : "to inspect real evidence before forwarding."}
      </div>
    </section>
  );
}

function TextOnlyBranchView({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="glass-card" style={{ position: "relative", zIndex: 2, padding: "var(--space-xl)", background: "rgba(9,15,25,0.94)" }}>
      <h3 style={{ marginBottom: 12 }}>
        {isRTL ? "الوضع النصي بدون رسوم" : "Text-only fallback"}
      </h3>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 18 }}>
        {isRTL
          ? "هذا الجدول يقدّم نفس السيناريو من دون حركة أو مؤثرات بصرية. كل سطر يمثل سلسلة قرار ثم ضرر ثم مسار تصحيح."
          : "This table delivers the same scenario without motion or visual effects. Each row shows the decision, the harm path, and the correction path."}
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {HARM_BRANCHES.map((branch) => (
          <div key={branch.id} style={{ padding: "12px 14px", borderRadius: 14, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {isRTL ? branch.titleAr : branch.titleEn}
            </div>
            <div style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
              {isRTL ? branch.actionAr : branch.actionEn}
            </div>
            <div style={{ color: "#fecaca", lineHeight: 1.8, marginTop: 6 }}>
              {isRTL ? branch.harmAr : branch.harmEn}
            </div>
            <div style={{ color: "#bae6fd", lineHeight: 1.8, marginTop: 6 }}>
              {isRTL ? branch.truthAr : branch.truthEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EgyptSpreadMap({
  isRTL,
  dotCount,
  positive,
}: {
  isRTL: boolean;
  dotCount: number;
  positive: boolean;
}) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
      <div style={{ fontWeight: 700, marginBottom: 10 }}>
        {isRTL ? "خريطة الانتشار الرمزية" : "Symbolic Egypt spread map"}
      </div>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 12, fontSize: 13 }}>
        {isRTL
          ? positive
            ? "هذه الحقيقة وصلت إلى دوائر جديدة عبر التصحيح."
            : "هذه المعلومة وصلت إلى دوائر واسعة بسرعة."
          : positive
            ? "The correction now moves across the same network."
            : "The rumor reaches wider circles at speed."}
      </p>
      <svg viewBox="0 0 220 260" width="100%" height="220" aria-hidden="true">
        <path
          d="M69 18 92 31 130 20 165 42 180 72 172 93 179 120 165 144 168 168 158 191 167 230 148 246 128 240 118 212 120 178 96 165 78 134 58 113 44 92 54 58 69 18Z"
          fill="rgba(148,163,184,0.09)"
          stroke="rgba(148,163,184,0.28)"
          strokeWidth="2"
        />
        {EGYPT_DOTS.map((dot, index) => (
          <g key={dot.name} style={{ opacity: index < dotCount ? 1 : 0.12, transition: "opacity 0.3s ease, transform 0.3s ease" }}>
            <circle cx={dot.cx} cy={dot.cy} r="6" fill={index < dotCount ? (positive ? "#22c55e" : "#ef4444") : "rgba(148,163,184,0.2)"} />
            <circle cx={dot.cx} cy={dot.cy} r="12" fill={index < dotCount ? (positive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.14)") : "transparent"} />
          </g>
        ))}
      </svg>
      <div style={{ color: "var(--text-caption)", fontSize: 12 }}>
        {isRTL ? "خريطة رمزية وليست تمثيلاً جغرافياً دقيقاً." : "Symbolic map, not a geographic precision layer."}
      </div>
    </div>
  );
}

function ButterflyGlyph({ positive }: { positive: boolean }) {
  return (
    <div style={{ width: 30, height: 24, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "absolute", left: 1, width: 12, height: 16, borderRadius: "70% 40% 60% 50%", background: positive ? "rgba(34,197,94,0.78)" : "rgba(217,119,6,0.78)", transform: "rotate(-24deg)" }} />
      <span style={{ position: "absolute", right: 1, width: 12, height: 16, borderRadius: "40% 70% 50% 60%", background: positive ? "rgba(16,185,129,0.78)" : "rgba(251,191,36,0.78)", transform: "rotate(24deg)" }} />
      <span style={{ width: 4, height: 20, borderRadius: 999, background: "rgba(248,250,252,0.82)", position: "relative", zIndex: 2 }} />
    </div>
  );
}

function BackgroundParticles({
  phase,
  reducedMotion,
}: {
  phase: string;
  reducedMotion: boolean;
}) {
  const particles = Array.from({ length: 14 }, (_, index) => index);
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((particle) => {
        const baseLeft = (particle * 7.3) % 100;
        const baseTop = (particle * 11.1) % 100;
        return (
          <motion.span
            key={particle}
            style={{
              position: "absolute",
              left: `${baseLeft}%`,
              top: `${baseTop}%`,
              width: 3 + (particle % 3),
              height: 3 + (particle % 3),
              borderRadius: "50%",
              background: phase === "corrected" ? "rgba(34,197,94,0.26)" : "rgba(148,163,184,0.18)",
            }}
            animate={
              reducedMotion
                ? { opacity: 0.2 }
                : {
                    y: [0, -12, 0],
                    x: [0, particle % 2 === 0 ? 8 : -8, 0],
                    opacity: [0.12, 0.32, 0.12],
                  }
            }
            transition={{ repeat: Infinity, duration: 8 + (particle % 5), ease: "easeInOut", delay: particle * 0.2 }}
          />
        );
      })}
      {!reducedMotion && (phase === "branches" || phase === "truth" || phase === "corrected") && (
        <motion.div
          initial={{ opacity: 0, x: -160, y: 70 }}
          animate={{ opacity: [0, 1, 0.9, 0.2], x: phase === "corrected" ? [-160, 80, 240] : [-160, 40, 180], y: phase === "corrected" ? [70, 20, -40] : [70, 120, 150] }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ButterflyGlyph positive={phase === "corrected"} />
            <Sparkles size={14} style={{ color: "rgba(250,204,21,0.7)" }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
