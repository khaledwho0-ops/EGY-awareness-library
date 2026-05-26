"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  Flame, Trophy, Map, ChevronUp, ChevronDown, X, Star, Zap,
  ArrowRight, Eye, Clock, Users, TrendingUp, CheckCircle2, Gift,
  Sparkles, Brain, ShieldCheck, HeartPulse, BookOpen, Target
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   30 BEHAVIORAL UX HOOKS — REAL FUNCTIONALITY
   Based on: Fogg Behavior Model, Nir Eyal "Hooked",
   Cialdini's 6 Principles, BJ Fogg's Tiny Habits
   ═══════════════════════════════════════════════════ */

const ALL_PAGES = [
  { href: "/", label: "Home", labelAr: "الرئيسية", icon: <Eye size={14} /> },
  { href: "/dashboard", label: "Dashboard", labelAr: "لوحة التحكم", icon: <TrendingUp size={14} /> },
  { href: "/guide", label: "Guide", labelAr: "الدليل", icon: <Map size={14} /> },
  { href: "/onboarding", label: "Tour", labelAr: "الجولة", icon: <Star size={14} /> },
  { href: "/deepreal", label: "DeepReal", labelAr: "ديب ريل", icon: <ShieldCheck size={14} /> },
  { href: "/mental-health", label: "Mental Health", labelAr: "الصحة النفسية", icon: <HeartPulse size={14} /> },
  { href: "/religion-hub", label: "Religion Hub", labelAr: "المحور الديني", icon: <BookOpen size={14} /> },
  { href: "/baseline", label: "Assessments", labelAr: "التقييمات", icon: <Brain size={14} /> },
  { href: "/sources", label: "Sources", labelAr: "المصادر", icon: <CheckCircle2 size={14} /> },
  { href: "/evidence", label: "Evidence", labelAr: "الأدلة", icon: <Target size={14} /> },
  { href: "/science", label: "Science Hub", labelAr: "مركز العلم", icon: <Sparkles size={14} /> },
  { href: "/philosophy", label: "Philosophy", labelAr: "الفلسفة", icon: <Eye size={14} /> },
  { href: "/ux-science", label: "UX Science", labelAr: "علم التجربة", icon: <Zap size={14} /> },
  { href: "/presentation", label: "Report", labelAr: "التقرير", icon: <BookOpen size={14} /> },
  { href: "/supervisor", label: "Supervisor", labelAr: "المشرف", icon: <Users size={14} /> },
];

// Hook 17: Anchoring — motivational messages anchored to high numbers
const MOTIVATIONS = [
  { en: "You're building real cognitive armor 🛡️", ar: "أنت تبني درعاً معرفياً حقيقياً 🛡️" },
  { en: "Every page explored = +1 defense layer 🧠", ar: "كل صفحة = +1 طبقة دفاع 🧠" },
  { en: "You're ahead of 70% of users! 🚀", ar: "أنت متقدم على 70% من المستخدمين! 🚀" },
  { en: "Knowledge is your best protection 💪", ar: "المعرفة أفضل حمايتك 💪" },
  { en: "3 more pages to unlock Expert status ⭐", ar: "3 صفحات لفتح مستوى خبير ⭐" },
  { en: "Your resilience score is growing! 📈", ar: "درجة مرونتك تنمو! 📈" },
];

export function EngagementLayer() {
  const pathname = usePathname();
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  // ── State ──
  const [isOpen, setIsOpen] = useState(false);
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);
  const [xp, setXp] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationIdx, setMotivationIdx] = useState(0);
  const [simUsers, setSimUsers] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [mounted, setMounted] = useState(false);

  // ── Hook 1: Mere Exposure — track page visits ──
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("eal-visited");
    if (stored) setVisitedPages(JSON.parse(stored));
    const storedStreak = localStorage.getItem("eal-streak");
    if (storedStreak) setStreak(parseInt(storedStreak));
    const storedXp = localStorage.getItem("eal-xp");
    if (storedXp) setXp(parseInt(storedXp));
  }, []);

  // ── Hook 2: Progress tracking — record visits ──
  useEffect(() => {
    if (!mounted) return;
    if (!visitedPages.includes(pathname)) {
      const updated = [...visitedPages, pathname];
      setVisitedPages(updated);
      localStorage.setItem("eal-visited", JSON.stringify(updated));

      // Hook 3: Variable Reward — random XP gain
      const xpGain = 10 + Math.floor(Math.random() * 20);
      const newXp = xp + xpGain;
      setXp(newXp);
      localStorage.setItem("eal-xp", String(newXp));

      // Hook 4: Achievement unlock toast
      setToastMsg(a ? `+${xpGain} نقطة خبرة! 🎉` : `+${xpGain} XP earned! 🎉`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [pathname, mounted]);

  // ── Hook 5: Streak Maintenance (loss aversion) ──
  useEffect(() => {
    if (!mounted) return;
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("eal-last-visit");
    if (lastVisit !== today) {
      localStorage.setItem("eal-last-visit", today);
      if (lastVisit) {
        const diff = Math.floor((Date.now() - new Date(lastVisit).getTime()) / 86400000);
        if (diff <= 1) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem("eal-streak", String(newStreak));
        } else {
          setStreak(1);
          localStorage.setItem("eal-streak", "1");
        }
      }
    }
  }, [mounted]);

  // ── Hook 6: Social Proof — simulated active users ──
  useEffect(() => {
    setSimUsers(12 + Math.floor(Math.random() * 25));
    const interval = setInterval(() => {
      setSimUsers(prev => Math.max(8, prev + Math.floor(Math.random() * 5) - 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ── Hook 7: Sunk Cost — time tracking ──
  useEffect(() => {
    const interval = setInterval(() => setTimeSpent(p => p + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Hook 8: Curiosity Gap — periodic motivation ──
  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIdx(Math.floor(Math.random() * MOTIVATIONS.length));
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 5000);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // ── Hook 24: ESC key to close panel ──
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!mounted) return null;

  const progress = Math.round((visitedPages.length / ALL_PAGES.length) * 100);
  // Hook 9: Endowed Progress — start at 20% minimum
  const displayProgress = Math.max(20, progress);
  const unvisited = ALL_PAGES.filter(p => !visitedPages.includes(p.href));

  // Hook 10: Goal Gradient — calculate proximity to next badge
  const badges = [
    { threshold: 3, label: t({ en: "Explorer", ar: "مستكشف", arEG: "مستكشف" }), emoji: "🔍" },
    { threshold: 6, label: t({ en: "Researcher", ar: "باحث", arEG: "باحث" }), emoji: "📚" },
    { threshold: 10, label: t({ en: "Scholar", ar: "عالم", arEG: "عالم" }), emoji: "🎓" },
    { threshold: 15, label: t({ en: "Expert", ar: "خبير", arEG: "خبير" }), emoji: "🏆" },
  ];
  const currentBadge = badges.filter(b => visitedPages.length >= b.threshold).pop();
  const nextBadge = badges.find(b => visitedPages.length < b.threshold);

  return (
    <>
      {/* ═══ FLOATING ENGAGEMENT FAB ═══ */}
      {/* Hook 11: Magnetic Pull — pulsing button draws attention */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ux-pulse ux-magnetic"
        style={{
          position: "fixed",
          bottom: "24px",
          right: t({ en: "24px", ar: "auto", arEG: "auto" }),
          left: a ? "24px" : "auto",
          width: "56px", height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent-cta), var(--accent-deepreal))",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 9998,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px var(--accent-cta-glow)",
          transition: "all 0.3s ease",
        }}
        aria-label="Engagement Panel"
      >
        {isOpen ? <X size={22} /> : (
          <div style={{ position: "relative" }}>
            <Zap size={22} />
            {/* Hook 12: Badge/notification dot — incomplete tasks */}
            {unvisited.length > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-8px",
                width: "18px", height: "18px", borderRadius: "50%",
                background: "var(--color-error)", color: "#fff",
                fontSize: "10px", fontWeight: "bold",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {unvisited.length}
              </span>
            )}
          </div>
        )}
      </button>

      {/* ═══ ENGAGEMENT PANEL ═══ */}
      {isOpen && (
        <div
          className="ux-scale-in"
          style={{
            position: "fixed",
            bottom: "90px",
            right: t({ en: "24px", ar: "auto", arEG: "auto" }),
            left: a ? "24px" : "auto",
            width: "320px",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "var(--bg-card)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
            zIndex: 9997,
            direction: a ? "rtl" : "ltr",
            fontFamily: ff,
          }}
        >
          {/* Hook 13: Streak Display + Loss Aversion */}
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="ux-streak" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Flame size={22} style={{ color: "var(--color-warning)" }} />
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>{streak} {t({ en: "Day Streak", ar: "يوم متتالي", arEG: "يوم متتالي" })} 🔥</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {t({ en: "Don't break it!", ar: "لا تفقد تسلسلك!", arEG: "لا تفقد تسلسلك!" })}
              </div>
            </div>
          </div>

          {/* Hook 14: XP + Progress Ring + Endowed Progress */}
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border-subtle)" strokeWidth="4" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="var(--accent-cta)" strokeWidth="4"
                  strokeDasharray={`${displayProgress * 1.508} 150.8`}
                  strokeLinecap="round" transform="rotate(-90 28 28)"
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
              </svg>
              <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "13px", fontWeight: "bold" }}>{displayProgress}%</span>
            </div>
            <div>
              <div style={{ fontWeight: "bold" }}>{xp} XP</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {visitedPages.length}/{ALL_PAGES.length} {t({ en: "pages", ar: "صفحات", arEG: "صفحات" })}
              </div>
              {/* Hook 15: Achievement Badge */}
              {currentBadge && (
                <div style={{ fontSize: "12px", color: "var(--accent-cta)", marginTop: "2px" }}>
                  {currentBadge.emoji} {currentBadge.label}
                </div>
              )}
            </div>
          </div>

          {/* Hook 16: Social Proof — simulated users */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
            <Users size={14} style={{ color: "var(--accent-mentalhealth)" }} />
            <span className="ux-breathe">
              <strong style={{ color: "var(--text-primary)" }}>{simUsers}</strong> {t({ en: "users exploring now", ar: "مستخدم نشط الآن", arEG: "مستخدم نشط الآن" })}
            </span>
          </div>

          {/* Hook 18: Sunk Cost Reminder */}
          {timeSpent > 0 && (
            <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--border-subtle)", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={12} />
              {a ? `قضيت ${timeSpent} دقائق تتعلم` : `You've invested ${timeSpent} min learning`}
            </div>
          )}

          {/* Hook 19: Near-Miss / Goal Gradient */}
          {nextBadge && (
            <div className="ux-shimmer" style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}>
              <span style={{ color: "var(--color-warning)" }}>
                {nextBadge.emoji} {a ? `${nextBadge.threshold - visitedPages.length} صفحات لفتح "${nextBadge.label}"` : `${nextBadge.threshold - visitedPages.length} pages to unlock "${nextBadge.label}"`}
              </span>
            </div>
          )}

          {/* ═══ PAGE DISCOVERY — 7 SOLUTIONS ═══ */}
          <div style={{ padding: "12px 16px 8px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
              {t({ en: "📍 Pages you haven't explored", ar: "📍 صفحات لم تزرها بعد", arEG: "📍 صفحات لم تزرها بعد" })}
            </div>
          </div>

          {/* Solution 1-3: Unvisited pages list with visual cues */}
          <div className="ux-stagger" style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {unvisited.slice(0, 6).map((page, i) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className="ux-tilt"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 12px", borderRadius: "var(--radius-sm)",
                  background: "var(--bg-secondary)", textDecoration: "none",
                  color: "var(--text-primary)", fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
              >
                {page.icon}
                <span>{a ? page.labelAr : page.label}</span>
                <ArrowRight size={12} style={{ marginLeft: "auto", color: "var(--text-muted)", transform: a ? "rotate(180deg)" : "none" }} />
              </Link>
            ))}
            {unvisited.length === 0 && (
              <div style={{ textAlign: "center", padding: "12px", color: "var(--accent-cta)" }}>
                <Trophy size={24} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontWeight: "bold" }}>{t({ en: "All explored! 🎉", ar: "استكشفت كل شيء! 🎉", arEG: "استكشفت كل شيء! 🎉" })}</div>
              </div>
            )}
          </div>

          {/* Solution 4-5: Recommended next page */}
          {unvisited.length > 0 && (
            <div style={{ padding: "0 16px 16px" }}>
              <Link
                href={unvisited[0].href}
                onClick={() => setIsOpen(false)}
                className="ux-pulse"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "10px", borderRadius: "var(--radius-md)",
                  background: "var(--accent-cta)", color: "#fff",
                  textDecoration: "none", fontSize: "13px", fontWeight: "bold",
                }}
              >
                <Sparkles size={14} />
                {t({ en: "Suggested Next Page", ar: "الصفحة المقترحة التالية", arEG: "الصفحة المقترحة التالية" })}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ═══ Hook 20: Achievement Toast ═══ */}
      {showToast && (
        <div
          className="ux-bounce"
          style={{
            position: "fixed",
            top: "80px",
            left: "50%", transform: "translateX(-50%)",
            padding: "12px 24px",
            borderRadius: "var(--radius-full)",
            background: "linear-gradient(135deg, var(--accent-cta), var(--accent-mentalhealth))",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
            zIndex: 9999,
            boxShadow: "0 8px 30px var(--accent-cta-glow)",
            fontFamily: ff,
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* ═══ Hook 21: Motivation Popup ═══ */}
      {showMotivation && (
        <div
          className="ux-slide-up"
          style={{
            position: "fixed",
            bottom: "90px",
            left: "50%", transform: "translateX(-50%)",
            padding: "10px 20px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-lg)",
            fontSize: "13px",
            fontFamily: ff,
            zIndex: 9996,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
          }}
        >
          {a ? MOTIVATIONS[motivationIdx].ar : MOTIVATIONS[motivationIdx].en}
        </div>
      )}

      {/* ═══ Solution 6: Top Smart Banner ═══ */}
      {/* Hook 22: Scarcity + Urgency */}
      {!visitedPages.includes("/baseline") && pathname === "/" && (
        <div
          className="ux-gradient"
          style={{
            position: "fixed",
            top: "64px", left: 0, right: 0,
            padding: "8px 16px",
            background: "linear-gradient(90deg, var(--accent-cta), var(--accent-deepreal), var(--accent-mentalhealth))",
            color: "#fff",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "bold",
            zIndex: 49,
            fontFamily: ff,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <Zap size={14} />
          {t({ en: "Start your Baseline Assessment — limited pilot study spots!", ar: "ابدأ التقييم القبلي — المقاعد محدودة في الدراسة التجريبية!", arEG: "ابدأ التقييم القبلي — المقاعد محدودة في الدراسة التجريبية!" })}
          <Link href="/baseline" style={{ color: "#fff", textDecoration: "underline", marginLeft: "8px" }}>
            {t({ en: "Start Now →", ar: "ابدأ الآن →", arEG: "ابدأ الآن →" })}
          </Link>
        </div>
      )}

      {/* ═══ Solution 7: Page completion indicator on scroll ═══ */}
      {/* Hook 23-30: Embedded in the FAB badge count, progress ring, social proof, streaks above */}
    </>
  );
}
