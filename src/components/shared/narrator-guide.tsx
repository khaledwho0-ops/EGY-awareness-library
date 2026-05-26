"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  BookOpen,
  BarChart3,
  ClipboardCheck,
  Globe,
  Home,
  Info,
} from "lucide-react";
import { useRTL } from "./rtl-provider";

/* ─────────────────────────────────────────────
   Page-specific narrator scripts
   Each page has multiple tips the user can cycle
   ───────────────────────────────────────────── */

interface NarratorTip {
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

const PAGE_TIPS: Record<string, NarratorTip[]> = {
  "/": [
    {
      icon: <Home size={18} />,
      titleEn: "Welcome!",
      titleAr: "!مرحباً",
      bodyEn: "This is the Egyptian Awareness Library — your 14-day evidence-based training platform. You have 3 learning tracks: DeepReal, Mental Health, and Religion Hub. Start with any track that interests you!",
      bodyAr: "هذه مكتبة الوعي المصرية — منصة تدريبك القائمة على الأدلة لمدة 14 يوماً. لديك 3 مسارات تعليمية: ديب ريل، الصحة النفسية، والمحور الديني. ابدأ بأي مسار يثير اهتمامك!",
    },
    {
      icon: <ClipboardCheck size={18} />,
      titleEn: "Take Baseline First",
      titleAr: "خذ التقييم القبلي أولاً",
      bodyEn: "For the best experience, complete the Baseline Assessment before starting exercises. This measures your starting point so we can show your growth!",
      bodyAr: "للحصول على أفضل تجربة، أكمل التقييم القبلي قبل بدء التمارين. هذا يقيس نقطة بدايتك حتى نتمكن من إظهار تقدمك!",
    },
    {
      icon: <BarChart3 size={18} />,
      titleEn: "Track Your Progress",
      titleAr: "تابع تقدمك",
      bodyEn: "Visit the Dashboard anytime to see your streak, XP, completed exercises, and behavioral change scores. Your data stays on your device.",
      bodyAr: "قم بزيارة لوحة التحكم في أي وقت لمشاهدة سلسلتك ونقاط الخبرة والتمارين المكتملة ودرجات التغيير السلوكي. بياناتك تبقى على جهازك.",
    },
  ],
  "/deepreal": [
    {
      icon: <ShieldCheck size={18} />,
      titleEn: "DeepReal Track",
      titleAr: "مسار ديب ريل",
      bodyEn: "This track teaches you to spot fake news, deepfakes, and manipulation. You'll learn the SIFT method, lateral reading, and source verification across 14 daily exercises.",
      bodyAr: "هذا المسار يعلمك اكتشاف الأخبار المزيفة والتزييف العميق والتلاعب. ستتعلم طريقة SIFT والقراءة الجانبية والتحقق من المصادر عبر 14 تمريناً يومياً.",
    },
    {
      icon: <Sparkles size={18} />,
      titleEn: "How It Works",
      titleAr: "كيف يعمل",
      bodyEn: "Each exercise has a real-world scenario, interactive tasks, and a verification console where you can fact-check claims live. Complete exercises daily to build your streak!",
      bodyAr: "كل تمرين يحتوي على سيناريو واقعي ومهام تفاعلية ووحدة تحقق حيث يمكنك التحقق من الادعاءات مباشرة. أكمل التمارين يومياً لبناء سلسلتك!",
    },
  ],
  "/mental-health": [
    {
      icon: <HeartPulse size={18} />,
      titleEn: "Mental Health Track",
      titleAr: "مسار الصحة النفسية",
      bodyEn: "Learn to name emotions, reduce stigma, and navigate mental health support. This module is EDUCATIONAL only — it does not diagnose or treat any condition.",
      bodyAr: "تعلم تسمية المشاعر وتقليل الوصمة والتنقل في دعم الصحة النفسية. هذه الوحدة تعليمية فقط — لا تشخص أو تعالج أي حالة.",
    },
    {
      icon: <Info size={18} />,
      titleEn: "Need Help?",
      titleAr: "تحتاج مساعدة؟",
      bodyEn: "If you or someone you know is in crisis, use the emergency contacts at the top of this page or in the footer. Hotline: 16328 (24/7).",
      bodyAr: "إذا كنت أنت أو شخص تعرفه في أزمة، استخدم جهات الاتصال الطارئة في أعلى هذه الصفحة أو في التذييل. الخط الساخن: 16328 (على مدار الساعة).",
    },
  ],
  "/religion-hub": [
    {
      icon: <BookOpen size={18} />,
      titleEn: "Religion Hub Track",
      titleAr: "مسار المحور الديني",
      bodyEn: "Explore positive religious coping from an academic psychology perspective. This module does NOT issue fatwas or theological rulings. For religious guidance, contact Dar al-Ifta (107).",
      bodyAr: "استكشف التكيف الديني الإيجابي من منظور علم النفس الأكاديمي. هذه الوحدة لا تصدر فتاوى أو أحكام شرعية. للإرشاد الديني، اتصل بدار الإفتاء (107).",
    },
  ],
  "/dashboard": [
    {
      icon: <BarChart3 size={18} />,
      titleEn: "Your Dashboard",
      titleAr: "لوحة التحكم",
      bodyEn: "This is your personal progress hub. See your daily streak, XP level, exercise completion rate, and COM-B behavioral change scores across all 3 tracks.",
      bodyAr: "هذا هو مركز تقدمك الشخصي. شاهد سلسلتك اليومية ومستوى الخبرة ومعدل إكمال التمارين ودرجات التغيير السلوكي COM-B عبر المسارات الثلاثة.",
    },
  ],
  "/assessment": [
    {
      icon: <ClipboardCheck size={18} />,
      titleEn: "Assessment Center",
      titleAr: "مركز التقييم",
      bodyEn: "Take validated psychometric assessments before and after your 14-day journey. Instruments include MIST-20, MHLS, Brief RCOPE, GHSQ, SUS, and MC-SDS.",
      bodyAr: "خذ التقييمات النفسية المُحققة قبل وبعد رحلتك لمدة 14 يوماً. الأدوات تشمل MIST-20 وMHLS وBrief RCOPE وGHSQ وSUS وMC-SDS.",
    },
  ],
  "/sources": [
    {
      icon: <Globe size={18} />,
      titleEn: "Source Registry",
      titleAr: "سجل المصادر",
      bodyEn: "Browse 100 trusted sources scored by a 7-criteria rubric. Use the fact-check search to verify any claim against Google Fact Check, Crossref, OpenAlex, and more.",
      bodyAr: "تصفح 100 مصدر موثوق مصنف بمعايير 7 معايير. استخدم بحث التحقق للتحقق من أي ادعاء عبر Google Fact Check وCrossref وOpenAlex والمزيد.",
    },
  ],
  "/about": [
    {
      icon: <Info size={18} />,
      titleEn: "About This Project",
      titleAr: "عن هذا المشروع",
      bodyEn: "The Egyptian Awareness Library is a graduation research project using a quasi-experimental design (N=84) to test the effectiveness of an integrated digital intervention.",
      bodyAr: "مكتبة الوعي المصرية هي مشروع بحث تخرج يستخدم تصميم شبه تجريبي (ن=84) لاختبار فعالية تدخل رقمي متكامل.",
    },
  ],
};

// Fallback for exercise pages
function getExerciseTips(path: string): NarratorTip[] {
  if (path.includes("/deepreal/exercise")) {
    return [{
      icon: <ShieldCheck size={18} />,
      titleEn: "Exercise Tips",
      titleAr: "نصائح التمرين",
      bodyEn: "Read the scenario carefully, then answer the interactive tasks. Use the Verification Console below to fact-check claims in real-time. Your confidence is logged before and after.",
      bodyAr: "اقرأ السيناريو بعناية، ثم أجب على المهام التفاعلية. استخدم وحدة التحقق أدناه للتحقق من الادعاءات في الوقت الفعلي. يتم تسجيل ثقتك قبل وبعد.",
    }];
  }
  if (path.includes("/mental-health/exercise")) {
    return [{
      icon: <HeartPulse size={18} />,
      titleEn: "Exercise Tips",
      titleAr: "نصائح التمرين",
      bodyEn: "This exercise builds your mental health literacy. Remember: this is educational — it won't diagnose you. If something resonates, the right move is to slow down and consider professional support.",
      bodyAr: "هذا التمرين يبني محو أميتك في الصحة النفسية. تذكر: هذا تعليمي — لن يشخصك. إذا شيء ما لفت انتباهك، الخطوة الصحيحة هي التمهل والنظر في الدعم المهني.",
    }];
  }
  if (path.includes("/religion-hub/exercise")) {
    return [{
      icon: <BookOpen size={18} />,
      titleEn: "Exercise Tips",
      titleAr: "نصائح التمرين",
      bodyEn: "This exercise explores positive religious coping from an academic lens. Verify any Quranic or Hadith references using the verification console. For religious guidance, consult qualified scholars.",
      bodyAr: "هذا التمرين يستكشف التكيف الديني الإيجابي من منظور أكاديمي. تحقق من أي مراجع قرآنية أو حديثية باستخدام وحدة التحقق. للإرشاد الديني، استشر العلماء المؤهلين.",
    }];
  }
  return [];
}

export function NarratorGuide() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [hasSeenPage, setHasSeenPage] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Get tips for current page
  const basePath = "/" + (pathname.split("/").filter(Boolean)[0] || "");
  const tips = PAGE_TIPS[basePath] || getExerciseTips(pathname) || PAGE_TIPS["/"];

  // Reset on page change
  useEffect(() => {
    setTipIndex(0);
    setDismissed(false);
    // Auto-show after 2s on first visit to each page
    const seenKey = `narrator_seen_${basePath}`;
    const seen = typeof window !== "undefined" && sessionStorage.getItem(seenKey);
    if (!seen) {
      setHasSeenPage(false);
      const timer = setTimeout(() => {
        setIsOpen(true);
        setPulse(false);
        if (typeof window !== "undefined") sessionStorage.setItem(seenKey, "1");
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setHasSeenPage(true);
    }
  }, [basePath]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) { setIsOpen(false); setDismissed(true); }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const handleNext = useCallback(() => {
    if (tipIndex < tips.length - 1) setTipIndex((i) => i + 1);
  }, [tipIndex, tips.length]);

  const handlePrev = useCallback(() => {
    if (tipIndex > 0) setTipIndex((i) => i - 1);
  }, [tipIndex]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    setDismissed(true);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((o) => !o);
    setPulse(false);
  }, []);

  const tip = tips[tipIndex];
  if (!tip) return null;

  return (
    <>
      {/* Click-outside overlay to close */}
      {isOpen && (
        <div
          onClick={handleDismiss}
          style={{ position: "fixed", inset: 0, zIndex: 9997, background: "transparent" }}
        />
      )}

      {/* Floating button — positioned at top-right to avoid EngagementLayer FAB overlap */}
      <button
        onClick={handleToggle}
        aria-label={t({ en: "Narrator Guide", ar: "المساعد الرقمي", arEG: "المساعد الرقمي" })}
        style={{
          position: "fixed",
          top: 80,
          [a ? "left" : "right"]: 24,
          zIndex: 9999,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
          color: "#fff",
          boxShadow: isOpen
            ? "0 4px 24px rgba(99,102,241,0.5)"
            : "0 4px 20px rgba(99,102,241,0.4), 0 0 0 4px rgba(99,102,241,0.15)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: pulse && !hasSeenPage ? "narrator-pulse 2s infinite" : "none",
        }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Popup card */}
      <div
        style={{
          position: "fixed",
          top: 132,
          [a ? "left" : "right"]: 24,
          zIndex: 9998,
          width: "min(380px, calc(100vw - 48px))",
          borderRadius: 20,
          overflow: "hidden",
          background: "var(--bg-primary)",
          border: "1px solid var(--border-primary)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          direction: a ? "rtl" : "ltr",
        }}
      >
        {/* Header gradient */}
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              {tip.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                {a ? tip.titleAr : tip.titleEn}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                {t({ en: "Your digital guide", ar: "مساعدك الرقمي", arEG: "مساعدك الرقمي" })}
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "#fff",
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px 14px", fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {a ? tip.bodyAr : tip.bodyEn}
          </p>
        </div>

        {/* Navigation footer */}
        {tips.length > 1 && (
          <div
            style={{
              padding: "10px 20px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid var(--border-primary)",
            }}
          >
            <button
              onClick={a ? handleNext : handlePrev}
              disabled={tipIndex === 0}
              style={{
                background: "none",
                border: "none",
                cursor: tipIndex === 0 ? "default" : "pointer",
                color: tipIndex === 0 ? "var(--text-caption)" : "var(--accent-cta)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                fontWeight: 600,
                opacity: tipIndex === 0 ? 0.4 : 1,
                fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit",
              }}
            >
              {a ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              {t({ en: "Previous", ar: "السابق", arEG: "السابق" })}
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {tips.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === tipIndex ? 18 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === tipIndex
                      ? "linear-gradient(90deg, #6366f1, #a855f7)"
                      : "var(--border-primary)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={a ? handlePrev : handleNext}
              disabled={tipIndex === tips.length - 1}
              style={{
                background: "none",
                border: "none",
                cursor: tipIndex === tips.length - 1 ? "default" : "pointer",
                color: tipIndex === tips.length - 1 ? "var(--text-caption)" : "var(--accent-cta)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                fontWeight: 600,
                opacity: tipIndex === tips.length - 1 ? 0.4 : 1,
                fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit",
              }}
            >
              {t({ en: "Next", ar: "التالي", arEG: "التالي" })}
              {a ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes narrator-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(99,102,241,0.4), 0 0 0 4px rgba(99,102,241,0.15); }
          50% { box-shadow: 0 4px 28px rgba(99,102,241,0.6), 0 0 0 8px rgba(99,102,241,0.1); }
        }
      `}</style>
    </>
  );
}
