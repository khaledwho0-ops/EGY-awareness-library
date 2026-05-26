"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Play, Square, FastForward, Rewind, Activity, ChevronRight, SkipForward } from "lucide-react";

interface TourAction {
  type: "scroll" | "click" | "wait";
  target?: string;
  y?: number;
  label: string;
  labelAr: string;
}

interface TourStep {
  route: string;
  pageName: string;
  pageNameAr: string;
  actions: TourAction[];
}

function makeScrollSteps(nameEn: string, nameAr: string): TourAction[] {
  return [
    { type: "wait", label: `Loading ${nameEn}...`, labelAr: `تحميل ${nameAr}...` },
    { type: "scroll", y: 0, label: `${nameEn} — Top`, labelAr: `${nameAr} — أعلى` },
    { type: "scroll", y: 20, label: `${nameEn} — 20%`, labelAr: `${nameAr} — 20%` },
    { type: "scroll", y: 40, label: `${nameEn} — 40%`, labelAr: `${nameAr} — 40%` },
    { type: "scroll", y: 60, label: `${nameEn} — 60%`, labelAr: `${nameAr} — 60%` },
    { type: "scroll", y: 80, label: `${nameEn} — 80%`, labelAr: `${nameAr} — 80%` },
    { type: "scroll", y: 100, label: `${nameEn} — Bottom ✓`, labelAr: `${nameAr} — أسفل ✓` },
  ];
}

const TOUR: TourStep[] = [
  { route: "/", pageName: "Homepage", pageNameAr: "الرئيسية", actions: makeScrollSteps("Homepage", "الرئيسية") },
  { route: "/welcome", pageName: "Project Anatomy", pageNameAr: "تشريح المشروع", actions: makeScrollSteps("Project Anatomy", "تشريح المشروع") },
  { route: "/dashboard", pageName: "Dashboard", pageNameAr: "لوحة التحكم", actions: makeScrollSteps("Dashboard", "لوحة التحكم") },
  { route: "/deepreal", pageName: "DeepReal Hub", pageNameAr: "مركز ديب ريل", actions: makeScrollSteps("DeepReal Hub", "مركز ديب ريل") },
  { route: "/deepreal/exercise/1", pageName: "DeepReal Day 1", pageNameAr: "ديب ريل يوم 1", actions: makeScrollSteps("DeepReal Exercise", "تمرين ديب ريل") },
  { route: "/deepreal/game", pageName: "DeepReal Game", pageNameAr: "لعبة ديب ريل", actions: makeScrollSteps("DeepReal Game", "لعبة ديب ريل") },
  { route: "/mental-health", pageName: "Mental Health", pageNameAr: "الصحة النفسية", actions: makeScrollSteps("Mental Health", "الصحة النفسية") },
  { route: "/mental-health/exercise/1", pageName: "Mental Health Day 1", pageNameAr: "الصحة النفسية يوم 1", actions: makeScrollSteps("MH Exercise", "تمرين الصحة النفسية") },
  { route: "/religion-hub", pageName: "Religion Hub", pageNameAr: "المحور الديني", actions: makeScrollSteps("Religion Hub", "المحور الديني") },
  { route: "/religion-hub/exercise/1", pageName: "Religion Day 1", pageNameAr: "المحور الديني يوم 1", actions: makeScrollSteps("Religion Exercise", "تمرين المحور الديني") },
  { route: "/fight-back", pageName: "Fight Back", pageNameAr: "المواجهة", actions: makeScrollSteps("Fight Back", "المواجهة") },
  { route: "/baseline", pageName: "Baseline", pageNameAr: "التقييم الأساسي", actions: makeScrollSteps("Baseline", "التقييم الأساسي") },
  { route: "/assessment", pageName: "Assessment", pageNameAr: "التقييم", actions: makeScrollSteps("Assessment", "التقييم") },
  { route: "/philosophy", pageName: "Philosophy", pageNameAr: "الفلسفة", actions: makeScrollSteps("Philosophy", "الفلسفة") },
  { route: "/science", pageName: "Science Hub", pageNameAr: "مركز العلم", actions: makeScrollSteps("Science Hub", "مركز العلم") },
  { route: "/sources", pageName: "Sources", pageNameAr: "المصادر", actions: makeScrollSteps("Sources", "المصادر") },
  { route: "/evidence", pageName: "Evidence", pageNameAr: "الأدلة", actions: makeScrollSteps("Evidence", "الأدلة") },
  { route: "/reverse", pageName: "Reverse Mode", pageNameAr: "الوضع العكسي", actions: makeScrollSteps("Reverse Mode", "الوضع العكسي") },
  { route: "/guide", pageName: "Guide", pageNameAr: "الدليل", actions: makeScrollSteps("Guide", "الدليل") },
  { route: "/ux-science", pageName: "UX Science", pageNameAr: "علم UX", actions: makeScrollSteps("UX Science", "علم UX") },
];

export function LiveAutopilot() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x to 5x
  const [stepIdx, setStepIdx] = useState(0);
  const [actionIdx, setActionIdx] = useState(0);
  const [currentLabel, setCurrentLabel] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [navigating, setNavigating] = useState(false);
  
  const cancelRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedRef = useRef(speed);

  // Keep speedRef in sync so the timer callback always reads the latest
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl");
  }, []);

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const stop = useCallback(() => {
    cancelRef.current = true;
    setIsActive(false);
    setNavigating(false);
    clearTimer();
    setCurrentLabel(isRTL ? "⏹ تم الإيقاف" : "⏹ Stopped");
  }, [isRTL]);

  const start = useCallback(() => {
    cancelRef.current = false;
    setStepIdx(0);
    setActionIdx(0);
    setCurrentLabel("");
    setNavigating(false);
    setIsActive(true);
  }, []);

  const skipPage = useCallback(() => {
    if (!isActive) return;
    clearTimer();
    setActionIdx(0);
    setStepIdx(prev => {
      const next = prev + 1;
      if (next >= TOUR.length) { stop(); return prev; }
      return next;
    });
  }, [isActive, stop]);

  // Execute a single action
  const executeAction = useCallback((action: TourAction) => {
    setCurrentLabel(isRTL ? action.labelAr : action.label);

    if (action.type === "scroll" && action.y !== undefined) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: (action.y / 100) * max, behavior: "smooth" });
    } else if (action.type === "click" && action.target) {
      const el = document.querySelector(action.target) as HTMLElement;
      if (el) el.click();
    }
  }, [isRTL]);

  // Main engine loop
  useEffect(() => {
    if (!isActive || cancelRef.current) return;

    const step = TOUR[stepIdx];
    if (!step) { stop(); return; }

    // Step 1: Navigate to the route if we're not there
    if (actionIdx === 0 && pathname !== step.route) {
      setNavigating(true);
      setCurrentLabel(isRTL ? `⏳ الانتقال إلى ${step.pageNameAr}...` : `⏳ Navigating to ${step.pageName}...`);
      window.scrollTo({ top: 0 });
      router.push(step.route);
      
      // Wait for page to load before starting actions
      timerRef.current = setTimeout(() => {
        if (cancelRef.current) return;
        setNavigating(false);
        setActionIdx(0); // trigger re-run now that pathname should match
      }, 2500 / Math.max(speedRef.current, 0.5));
      return;
    }

    // Step 2: If still navigating, wait
    if (navigating) return;

    // Step 3: Execute current action
    const action = step.actions[actionIdx];
    if (!action) {
      // All actions for this page done — move to next page
      const nextStep = stepIdx + 1;
      if (nextStep >= TOUR.length) {
        setCurrentLabel(isRTL ? "✅ الجولة اكتملت! تم زيارة كل الصفحات." : "✅ Tour Complete! All pages visited.");
        timerRef.current = setTimeout(() => { stop(); router.push("/"); }, 3000);
        return;
      }
      setActionIdx(0);
      setStepIdx(nextStep);
      return;
    }

    executeAction(action);

    // Schedule next action
    const baseDelay = action.type === "wait" ? 2500 : 2000;
    const delay = baseDelay / Math.max(speedRef.current, 0.5);

    timerRef.current = setTimeout(() => {
      if (cancelRef.current) return;
      setActionIdx(prev => prev + 1);
    }, delay);

    return () => clearTimer();
  }, [isActive, stepIdx, actionIdx, pathname, navigating, router, stop, executeAction, isRTL]);

  // Cleanup on unmount
  useEffect(() => { return () => clearTimer(); }, []);

  const progressPct = TOUR.length > 0 ? Math.round((stepIdx / TOUR.length) * 100) : 0;
  const currentPage = TOUR[stepIdx];

  return (
    <div style={{
      position: "fixed", bottom: 24, left: 24, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 0,
      width: isActive ? 380 : "auto", transition: "width 0.3s ease",
    }}>
      {/* Expanded panel when active */}
      {isActive && (
        <div style={{
          background: "var(--bg-elevated)", border: "1px solid rgba(16,185,129,0.3)",
          borderBottom: "none", borderRadius: "16px 16px 0 0",
          padding: "16px 20px", backdropFilter: "blur(16px)",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.3)",
        }}>
          {/* Status line */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Activity size={14} color="#10B981" style={{ animation: "pulse-spin 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, color: "#10B981", fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentLabel || "Starting..."}
            </span>
          </div>

          {/* Page name */}
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <ChevronRight size={16} color="#10B981" />
            {currentPage?.[isRTL ? "pageNameAr" : "pageName"] || "Done"}
          </div>

          {/* Progress bar */}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 8, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #10B981, #06B6D4, #8B5CF6)", borderRadius: 6, transition: "width 0.8s ease" }} />
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 14, fontFamily: "monospace" }}>
            <span>{isRTL ? "صفحة" : "Page"} {Math.min(stepIdx + 1, TOUR.length)}/{TOUR.length}</span>
            <span>{progressPct}%</span>
            <span>{speed <= 1 ? `${speed}x 🐢` : speed >= 4 ? `${speed}x 🚀` : `${speed}x`}</span>
          </div>

          {/* Speed slider */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <button onClick={() => setSpeed(s => Math.max(0.5, s - 0.5))} style={{ background: "none", border: "1px solid var(--border-primary)", borderRadius: 6, padding: "4px 8px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Rewind size={14} />
            </button>
            <input
              type="range" min="0.5" max="5" step="0.5" value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#10B981", cursor: "pointer" }}
            />
            <button onClick={() => setSpeed(s => Math.min(5, s + 0.5))} style={{ background: "none", border: "1px solid var(--border-primary)", borderRadius: 6, padding: "4px 8px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <FastForward size={14} />
            </button>
          </div>

          {/* Skip button */}
          <button onClick={skipPage} style={{ width: "100%", padding: "6px 0", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-primary)", borderRadius: 8, color: "var(--text-muted)", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <SkipForward size={12} /> {isRTL ? "تخطي الصفحة" : "Skip Page"}
          </button>
        </div>
      )}

      {/* Main button */}
      <div style={{
        display: "flex", alignItems: "center", overflow: "hidden",
        background: isActive ? "rgba(16,185,129,0.12)" : "var(--bg-elevated)",
        border: `1px solid ${isActive ? "rgba(16,185,129,0.3)" : "var(--border-primary)"}`,
        borderRadius: isActive ? "0 0 16px 16px" : 100,
        backdropFilter: "blur(16px)",
        boxShadow: isActive ? "0 4px 20px rgba(16,185,129,0.15)" : "0 4px 12px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}>
        <button
          onClick={isActive ? stop : start}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: isActive ? "#EF4444" : "#10B981",
            border: "none", color: "#fff", fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", fontSize: 14, padding: "12px 24px",
          }}
        >
          {isActive ? (
            <><Square size={14} fill="#fff" /> {isRTL ? "إيقاف" : "STOP"}</>
          ) : (
            <><Play size={14} fill="#fff" /> {isRTL ? "🚀 تشغيل الجولة" : "🚀 AUTOPILOT"}</>
          )}
        </button>
      </div>

      <style>{`
        @keyframes pulse-spin { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </div>
  );
}
