"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Calendar,
  Target,
  Clock,
  Flame,
  Download,
  ClipboardCheck,
  TrendingUp,
  MousePointerClick,
  Shield,
  Activity,
  BarChart3,
  Share2,
  FileText,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getProgress,
  getCompletedByMVP,
  getCompletedDays,
  getCurrentDay,
  getTodayTimeMinutes,
  isAssessmentCompleted,
  getAverageConfidenceShift,
  getSourceClickStats,
  getVerificationStats,
} from "@/lib/progress/progress-service";
import { buildCurrentParticipantRecord, generateResearchCSV, generateResearchJSON } from "@/lib/analytics/research-export";
import {
  getCurrentParticipantSnapshot,
  getCurrentParticipantSnapshotForExport,
} from "@/lib/research/research-ops";
import { getComBProfile } from "@/lib/analytics/comb-analytics";
import { generateFreshnessReport } from "@/data/research/source-freshness-monitor";
import type { UserProgress } from "@/lib/progress/progress-service";
import { getCurrentUser, isAdmin, type UserProfile } from "@/lib/auth";
import {
  buildAwarenessReport,
  buildPrintableReportHtml,
  createShareableReportLink,
  getLatestReportCheckpoint,
  saveReportCheckpoint,
} from "@/lib/export/reporting";
import { SuccessTracker } from "@/components/shared/success-tracker";
import { ModeControlRoom } from "@/components/interventions/mode-control-room";
import { CorrectionLedger } from "@/components/interventions/behavior-modes";
import { AfterActionReview } from "@/components/interventions/engagement-modes";
import { GuidedJourneyBoard } from "@/components/science/guided-journey-board";
import { useRTL } from "@/components/shared/rtl-provider";
import { DASH, DASH_X, s } from "@/data/i18n/site-strings";

/**
 * Dashboard Page — Framework §16.2, §18.1, §4.5, §5.3
 *
 * Central hub showing:
 * - 14-day calendar with exercise progress (§16.2)
 * - Per-MVP completion tracking
 * - Assessment status (pre/post)
 * - Streak counter
 * - Success criteria tracker (§4.5)
 * - Confidence shift visualization
 * - Source click & verification stats
 * - CSV/JSON export for research data (§5.3)
 */
export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [progressReady, setProgressReady] = useState(false);
  const [latestCheckpoint, setLatestCheckpoint] = useState<string | null>(null);
  const [exportFeedback, setExportFeedback] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const chartsReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { isRTL, t } = useRTL();
  const a = isRTL;
  const dir = a ? "rtl" : "ltr";
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const refreshCheckpointState = () => {
    const checkpoint = getLatestReportCheckpoint();
    setLatestCheckpoint(checkpoint?.savedAt ?? null);
  };

  useEffect(() => {
    function syncProgress() {
      setProgress(getProgress());
      setProgressReady(true);
      refreshCheckpointState();
    }

    syncProgress();
    window.addEventListener("storage", syncProgress);
    window.addEventListener("focus", syncProgress);
    document.addEventListener("visibilitychange", syncProgress);

    async function loadAuth() {
      const u = await getCurrentUser();
      setUserProfile(u);
      const a = await isAdmin();
      setIsAdminUser(a);
    }
    loadAuth();

    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener("focus", syncProgress);
      document.removeEventListener("visibilitychange", syncProgress);
    };
  }, []);

  useEffect(() => {
    if (!progressReady || !progress) return;

    const persistCheckpoint = (trigger: "checkpoint" | "session_end") => {
      const snapshot = getCurrentParticipantSnapshot();
      const report = buildAwarenessReport({
        snapshot,
        displayName: userProfile?.name,
        language: isRTL ? "ar" : "en",
      });
      saveReportCheckpoint(report, trigger);
      refreshCheckpointState();
    };

    persistCheckpoint("checkpoint");

    const handleBeforeUnload = () => persistCheckpoint("session_end");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [progressReady, progress, isRTL]);

  if (!progressReady || !progress) {
    return (
      <div style={{ paddingTop: "var(--navbar-height)" }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)" }}>{s(DASH.loading, a)}</p>
        </div>
      </div>
    );
  }

  const currentDay = getCurrentDay();
  const totalDays = 14;
  const completedExercises = progress.exercises.length;
  const totalExercises = 42;
  const todayMinutes = getTodayTimeMinutes();
  const confidenceShift = getAverageConfidenceShift();
  const sourceStats = getSourceClickStats();
  const verificationStats = getVerificationStats();
  const comBProfile = getComBProfile();
  const freshnessReport = generateFreshnessReport();
  const awarenessReport = buildAwarenessReport({
    snapshot: getCurrentParticipantSnapshot(),
    displayName: userProfile?.name,
    language: a ? "ar" : "en",
  });

  const saveManualReportCheckpoint = () => {
    saveReportCheckpoint(awarenessReport, "manual");
    refreshCheckpointState();
  };

  const mvps = [
    {
      id: "deepreal" as const, name: "DeepReal", icon: <ShieldCheck size={20} />,
      accent: "var(--accent-deepreal)", surface: "var(--accent-deepreal-surface)",
      exercises: "5 source + 5 detect + 4 bias",
      completed: getCompletedByMVP("deepreal"), completedDays: getCompletedDays("deepreal"),
      total: 14, href: "/deepreal",
    },
    {
      id: "mental-health" as const, name: "Mental Health", icon: <HeartPulse size={20} />,
      accent: "var(--accent-mentalhealth)", surface: "var(--accent-mentalhealth-surface)",
      exercises: "5 emotion + 4 stigma + 5 mixed",
      completed: getCompletedByMVP("mental-health"), completedDays: getCompletedDays("mental-health"),
      total: 14, href: "/mental-health",
    },
    {
      id: "religion-hub" as const, name: "Religion Hub", icon: <Sparkles size={20} />,
      accent: "var(--accent-religionhub)", surface: "var(--accent-religionhub-surface)",
      exercises: "7 positive + 4 threats + 3 bounds",
      completed: getCompletedByMVP("religion-hub"), completedDays: getCompletedDays("religion-hub"),
      total: 14, href: "/religion-hub",
    },
  ];

  const assessmentStatus = {
    preComplete: ["mist20", "mhls", "brief-rcope", "ghsq"].every(id => isAssessmentCompleted(id, "pre")),
    postComplete: ["mist20", "mhls", "brief-rcope", "ghsq", "sus"].every(id => isAssessmentCompleted(id, "post")),
    preCount: ["mist20", "mhls", "brief-rcope", "ghsq"].filter(id => isAssessmentCompleted(id, "pre")).length,
    postCount: ["mist20", "mhls", "brief-rcope", "ghsq", "sus"].filter(id => isAssessmentCompleted(id, "post")).length,
  };

  const mvpChartData = mvps.map((mvp) => ({
    name: mvp.name,
    completed: mvp.completed,
    remaining: mvp.total - mvp.completed,
  }));

  const trustTrendData = progress.trustCalibration.map((entry) => ({
    phase: entry.phase,
    ctcs: Number(entry.ctcs.toFixed(2)),
  }));

  const handleExportCSV = async () => {
    saveManualReportCheckpoint();
    const csv = await generateResearchCSV([buildCurrentParticipantRecord()]);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eal-research-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = async () => {
    saveManualReportCheckpoint();
    const json = await generateResearchJSON([buildCurrentParticipantRecord()]);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eal-research-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSnapshot = async () => {
    saveManualReportCheckpoint();
    const snapshot = await getCurrentParticipantSnapshotForExport();
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eal-participant-snapshot-anon-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    saveManualReportCheckpoint();
    const popup = window.open("", "_blank", "noopener,noreferrer,width=1000,height=900");
    if (!popup) {
      setExportFeedback(
        t({
          en: "Popup blocked. Allow popups to open the PDF print view.",
          ar: "تم حظر النافذة المنبثقة. اسمح بالنوافذ المنبثقة لفتح عرض طباعة PDF.",
          arEG: "تم حظر النافذة المنبثقة. اسمح بالنوافذ المنبثقة لفتح عرض طباعة PDF.",
        }),
      );
      return;
    }

    popup.document.open();
    popup.document.write(buildPrintableReportHtml(awarenessReport));
    popup.document.close();
    setExportFeedback(
      t({
        en: "PDF print view opened with Arabic-safe layout.",
        ar: "تم فتح عرض طباعة PDF بتنسيق عربي سليم.",
        arEG: "تم فتح عرض طباعة PDF بتنسيق عربي سليم.",
      }),
    );
  };

  const handleCopyShareLink = async () => {
    saveManualReportCheckpoint();
    const shareLink = createShareableReportLink(awarenessReport, window.location.origin);
    try {
      await navigator.clipboard.writeText(shareLink);
      setExportFeedback(
        t({
          en: "Expiring share link copied. It stays valid for 90 days.",
          ar: "تم نسخ رابط المشاركة المنتهي الصلاحية. يظل صالحاً لمدة 90 يوماً.",
          arEG: "تم نسخ رابط المشاركة المنتهي الصلاحية. يظل صالحاً لمدة 90 يوماً.",
        }),
      );
    } catch {
      setExportFeedback(shareLink);
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8" style={{ flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", marginBottom: "8px", direction: dir, fontFamily: ff }}>
              {s(DASH.your, a)} <span className="text-gradient">{s(DASH.dashboard, a)}</span>
            </h1>
            <p style={{ color: "var(--text-muted)", direction: dir, fontFamily: ff }}>
              {a ? `اليوم ${currentDay} من ${totalDays}` : `Day ${currentDay} of ${totalDays}`} • {completedExercises}/{totalExercises} {s(DASH.exercisesCompleted, a)}
            </p>
            {userProfile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: ff }}>
                  {a ? "مرحباً،" : "Welcome,"} <strong>{userProfile.name}</strong>
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  background: userProfile.role === "admin"
                    ? "rgba(239,68,68,0.12)" : userProfile.role === "guest"
                    ? "rgba(245,158,11,0.12)" : "rgba(37,99,235,0.12)",
                  color: userProfile.role === "admin"
                    ? "#EF4444" : userProfile.role === "guest"
                    ? "#F59E0B" : "#2563EB",
                  border: `1px solid ${userProfile.role === "admin"
                    ? "rgba(239,68,68,0.3)" : userProfile.role === "guest"
                    ? "rgba(245,158,11,0.3)" : "rgba(37,99,235,0.3)"}`,
                }}>
                  {userProfile.role === "admin" ? (a ? "مشرف" : "ADMIN")
                    : userProfile.role === "guest" ? (a ? "زائر" : "GUEST")
                    : (a ? "مستخدم" : "USER")}
                </span>
              </div>
            )}
          </div>
          {progress.exercises.length > 0 && (
            <div className="mobile-snap-scroll" style={{ marginTop: 8 }}>
              <button onClick={handleExportPdf} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", whiteSpace: "nowrap" }}>
                <FileText size={12} /> PDF
              </button>
              <button onClick={handleCopyShareLink} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Share2 size={12} /> {a ? "مشاركة" : "Share"}
              </button>
              <button onClick={handleExportCSV} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Download size={12} /> CSV
              </button>
              <button onClick={handleExportSnapshot} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Download size={12} /> Snapshot
              </button>
              <button onClick={handleExportJSON} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Download size={12} /> JSON
              </button>
            </div>
          )}
        </div>

        {/* 🔥 Angry Debunkers CTA Banner */}
        <Link href="/angry-debunkers" style={{ textDecoration: "none" }}>
          <div className="glass-card mb-6" style={{
            padding: "16px 24px", direction: dir, cursor: "pointer",
            background: "linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.06))",
            borderLeft: "4px solid #EF4444",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16, transition: "transform 0.2s", flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "rgba(239,68,68,0.12)", border: "2px solid rgba(239,68,68,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Flame size={20} style={{ color: "#EF4444" }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: ff }}>
                  {t({ en: "The Angry Debunkers", ar: "المُفنِّدون الغاضبون", arEG: "المُفنِّدون الغاضبون" })}
                  <span style={{ fontSize: 11, color: "var(--text-caption)", fontWeight: 400, marginLeft: 8 }}>العلم يقاتل</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: ff }}>
                  {t({ en: "Paste any claim → 10 scientific databases verify it instantly", ar: "الصق أي ادعاء ← ١٠ قواعد بيانات علمية تتحقق فوراً", arEG: "الصق أي ادعاء ← ١٠ قواعد بيانات علمية تتحقق فوراً" })}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ padding: "4px 12px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                🔥 {t({ en: "DEBUNK NOW", ar: "فنّد الآن", arEG: "فنّد دلوقتي" })}
              </span>
            </div>
          </div>
        </Link>

        {/* Overview Cards — Row 1 */}
        <div className="glass-card mb-6" style={{ padding: "var(--space-xl)", direction: dir }}>
          <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 1fr)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FileText size={18} style={{ color: "var(--accent-cta)" }} />
                <h2 style={{ fontSize: "var(--font-h3)", margin: 0, fontFamily: ff }}>
                  {a ? "مركز التقارير والتصدير" : "Report and export center"}
                </h2>
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16, fontFamily: ff }}>
                {a
                  ? "هذا هو مخرج chunk 2 من خطة التحديث: تقرير وعي عربي جاهز للطباعة إلى PDF، ورابط مشاركة ينتهي بعد 90 يوماً، ونقاط حفظ تلقائية أثناء الجلسة وعند إغلاقها."
                  : "This is chunk 2 of the update plan: an Arabic-safe report flow with PDF print output, 90-day expiring share links, and auto-saved checkpoints during the session and on exit."}
              </p>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 12 }}>
                <div style={{ padding: "12px 14px", borderRadius: 14, background: "var(--bg-secondary)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6, fontFamily: ff }}>
                    {a ? "الشارة الحالية" : "Current badge"}
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: ff }}>{a ? awarenessReport.badgeAr : awarenessReport.badgeEn}</div>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: 14, background: "var(--bg-secondary)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6, fontFamily: ff }}>
                    {a ? "أقوى مهارة" : "Strongest skill"}
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: ff }}>{a ? awarenessReport.strongestSkillAr : awarenessReport.strongestSkillEn}</div>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: 14, background: "var(--bg-secondary)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6, fontFamily: ff }}>
                    {a ? "التحسن المركب" : "Composite improvement"}
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: ff }}>{awarenessReport.compositeImprovement ?? 0}%</div>
                </div>
              </div>
              {exportFeedback && (
                <div style={{ fontSize: 12, color: "var(--accent-cta)", marginBottom: 10, fontFamily: ff }}>
                  {exportFeedback}
                </div>
              )}
              {latestCheckpoint && (
                <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>
                  {a ? "آخر نقطة حفظ:" : "Latest checkpoint:"}{" "}
                  {new Date(latestCheckpoint).toLocaleString(a ? "ar-EG" : "en-US")}
                </div>
              )}
            </div>

            <div style={{ padding: 18, borderRadius: 22, border: "1px solid rgba(56,189,248,0.18)", background: "linear-gradient(180deg, rgba(56,189,248,0.10), rgba(15,23,42,0.92))" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-cta)", marginBottom: 10 }}>
                {a ? "بطاقة مشاركة" : "Share card"}
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 10, lineHeight: 1.2, fontFamily: ff }}>
                {a ? "وعيك نما" : "Your Awareness Grew"}
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16, fontFamily: ff }}>
                {a ? awarenessReport.summaryAr[1] : awarenessReport.summaryEn[1]}
              </p>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", marginBottom: 6 }}>
                {awarenessReport.compositeImprovement ?? 0}%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>
                {a ? "رابط المشاركة ينتهي بعد 90 يوماً." : "Shared report links expire after 90 days."}
              </div>
            </div>
          </div>
        </div>

        <GuidedJourneyBoard variant="dashboard" />

        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} style={{ color: "var(--accent-cta)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.currentDay, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
              {currentDay}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> / {totalDays}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} style={{ color: "var(--accent-mentalhealth)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.exercisesDone, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
              {completedExercises}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> / {totalExercises}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} style={{ color: "var(--accent-deepreal)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.timeToday, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
              {todayMinutes}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> {s(DASH.min, a)}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} style={{ color: "var(--color-warning)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.streak, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: progress.streak > 0 ? "var(--color-warning)" : "var(--text-primary)" }}>
              {progress.streak}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> {s(DASH.days, a)}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck size={16} style={{ color: "var(--accent-religionhub)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.assessments, a)}</span>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>
              {assessmentStatus.preComplete ? <span style={{ color: "var(--color-success)" }}>Pre ✓</span> : <span style={{ color: "var(--color-warning)" }}>Pre: {assessmentStatus.preCount}/4</span>}
              {" • "}
              {assessmentStatus.postComplete ? <span style={{ color: "var(--color-success)" }}>Post ✓</span> : <span style={{ color: "var(--text-muted)" }}>Post: {assessmentStatus.postCount}/5</span>}
            </div>
            <Link href="/assessment" style={{ fontSize: "11px", color: "var(--accent-cta)" }}>{s(DASH.openAssessments, a)}</Link>
          </div>
        </div>
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          <div className="glass-card" style={{ padding: "var(--space-lg)", minHeight: 280, minWidth: 0, overflow: "hidden" }}>
            <h3 style={{ marginBottom: 12, fontFamily: ff }}>{s(DASH.mvpChart, a)}</h3>
            <div style={{ height: 240, width: "100%", minWidth: 0 }}>
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mvpChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="progress" fill="#16a34a" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="remaining" stackId="progress" fill="#334155" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Chart loading…</div>
              )}
            </div>
          </div>
          <div className="glass-card" style={{ padding: "var(--space-lg)", minHeight: 280, minWidth: 0, overflow: "hidden" }}>
            <h3 style={{ marginBottom: 12, fontFamily: ff }}>{s(DASH.trustTrend, a)}</h3>
            <div style={{ height: 240, width: "100%", minWidth: 0 }}>
              {trustTrendData.length > 0 && chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trustTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                    <XAxis dataKey="phase" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="ctcs" stroke="#2563eb" fill="rgba(37,99,235,0.22)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  {trustTrendData.length === 0
                    ? s(DASH.noTrustData, a)
                    : s(DASH.chartLoading, a)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ NEW: Research Analytics Row ═══ */}
        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>
          📊 {t({ en: "Research Analytics", ar: "تحليلات البحث", arEG: "تحليلات البحث" })}
        </h2>
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {/* Confidence Shift */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{ color: "var(--accent-mentalhealth)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.avgConfShift, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: confidenceShift.avgShift > 0 ? "var(--color-success)" : confidenceShift.avgShift < 0 ? "var(--color-danger)" : "var(--text-primary)" }}>
              {confidenceShift.avgShift > 0 ? "+" : ""}{confidenceShift.avgShift.toFixed(1)}%
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-caption)" }}>
              {s(DASH_X.fromExercises, a)} {confidenceShift.count} {s(DASH_X.exercisesLbl, a)}
            </span>
          </div>

          {/* Source Clicks */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick size={16} style={{ color: "var(--accent-deepreal)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.sourceClicks, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
              {sourceStats.total}
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-caption)" }}>
              {sourceStats.unique} {s(DASH_X.uniqueSrc, a)}
            </span>
          </div>

          {/* Verification Engagement */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} style={{ color: "var(--accent-religionhub)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.verifyEvents, a)}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
              {verificationStats.completed}
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-caption)" }}>
              {verificationStats.skipped} {s(DASH_X.skipped, a)} • {s(DASH_X.avg, a)} {verificationStats.avgGates.toFixed(1)} {s(DASH_X.gates, a)}
            </span>
          </div>

          {/* Trust Calibration */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} style={{ color: "var(--color-info)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{s(DASH.trustCalib, a)}</span>
            </div>
            {progress.trustCalibration.length > 0 ? (
              <div style={{ fontSize: "14px" }}>
                {progress.trustCalibration.map((entry, i) => (
                  <div key={i} className="flex justify-between" style={{ marginBottom: 4 }}>
                    <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{entry.phase}</span>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>CTCS: {entry.ctcs.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{s(DASH.notStarted, a)}</span>
                <br />
                <Link href="/baseline" style={{ fontSize: "11px", color: "var(--accent-cta)" }}>{s(DASH.takeBaseline, a)}</Link>
              </div>
            )}
          </div>

          {/* COM-B Coverage Card */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} style={{ color: "var(--accent-cta)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{t({ en: "COM-B Coverage", ar: "تغطية COM-B", arEG: "تغطية COM-B" })}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: comBProfile.coverageSegments >= 4 ? "var(--color-success)" : "var(--color-warning)" }}>
              {comBProfile.coverageSegments}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> / {comBProfile.totalSegments}</span>
            </div>
            {comBProfile.totalCompleted > 0 && (
              <div style={{ marginTop: 8 }}>
                {Object.entries(comBProfile.distribution).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([target, pct]) => (
                  <div key={target} style={{ fontSize: "11px", color: "var(--text-caption)", marginBottom: 2 }}>
                    {target.split("/")[1]}: {pct}%
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Source Freshness Card */}
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} style={{ color: freshnessReport.criticalCount > 0 ? "var(--color-danger)" : freshnessReport.staleCount > 0 ? "var(--color-warning)" : "var(--color-success)" }} />
              <span className="text-small" style={{ color: "var(--text-muted)", fontFamily: ff }}>{t({ en: "Source Freshness", ar: "حداثة المصادر", arEG: "حداثة المصادر" })}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: freshnessReport.criticalCount > 0 ? "var(--color-danger)" : "var(--color-success)" }}>
              {freshnessReport.freshCount}<span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400, fontFamily: "'Satoshi', sans-serif" }}> / {freshnessReport.totalSources}</span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-caption)" }}>
              {freshnessReport.staleCount > 0 ? `${freshnessReport.staleCount} ${t({ en: "warnings", ar: "تحذير", arEG: "تحذير" })}` : (t({ en: "All sources fresh", ar: "كل المصادر محدثة", arEG: "كل المصادر محدثة" }))} {freshnessReport.criticalCount > 0 ? ` • ${freshnessReport.criticalCount} ${t({ en: "critical", ar: "حرج", arEG: "حرج" })}` : ""}
            </span>
          </div>
        </div>

        {/* ═══ NEW: Success Criteria Tracker (§4.5) ═══ */}
        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>
          <BarChart3 size={20} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
          {s(DASH.successCriteria, a)}
        </h2>
        <div className="glass-card mb-8" style={{ padding: "var(--space-xl)" }}>
          <SuccessTracker />
        </div>

        <div style={{ marginBottom: "var(--space-xl)" }}>
          <ModeControlRoom currentDay={currentDay} />
        </div>

        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>
          {s(DASH.reflection, a)}
        </h2>
        <div
          className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          <CorrectionLedger />
          <AfterActionReview />
        </div>

        {/* MVP Progress Cards */}
        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>
          {s(DASH.awarenessEngines, a)}
        </h2>
        <div className="bento-grid mb-8">
          {mvps.map((mvp) => (
            <Link key={mvp.id} href={mvp.href} className="glass-card no-underline" style={{ padding: "var(--space-xl)", borderLeft: `3px solid ${mvp.accent}` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: mvp.surface, color: mvp.accent }}>
                  {mvp.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)" }}>{mvp.name}</h3>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{mvp.exercises}</span>
                </div>
              </div>
              <div style={{ width: "100%", height: 6, borderRadius: 3, background: "var(--bg-secondary)", overflow: "hidden", marginBottom: 8 }}>
                <div style={{ width: `${(mvp.completed / mvp.total) * 100}%`, height: "100%", background: mvp.accent, borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{mvp.completed}/{mvp.total} {s(DASH.completed, a)}</span>
            </Link>
          ))}
        </div>

        {/* 14-Day Calendar */}
        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>{s(DASH.calendar14, a)}</h2>
        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => {
              const drDone = getCompletedDays("deepreal").includes(day);
              const mhDone = getCompletedDays("mental-health").includes(day);
              const rhDone = getCompletedDays("religion-hub").includes(day);
              const allDone = drDone && mhDone && rhDone;
              const anyDone = drDone || mhDone || rhDone;
              return (
                <div key={day} className="flex flex-col items-center justify-center" style={{
                  padding: "var(--space-md)", borderRadius: "var(--radius-md)",
                  background: allDone ? "rgba(16,185,129,0.15)" : day === currentDay ? "var(--accent-cta)" : anyDone ? "rgba(0,102,255,0.08)" : "var(--bg-secondary)",
                  color: day === currentDay ? "white" : "var(--text-primary)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  border: `1px solid ${allDone ? "rgba(16,185,129,0.3)" : day === currentDay ? "transparent" : anyDone ? "rgba(0,102,255,0.2)" : "var(--border-primary)"}`,
                  position: "relative",
                }}>
                  <span style={{ fontSize: "11px", color: day === currentDay ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>{s(DASH_X.day, a)}</span>
                  <span style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>{day}</span>
                  {anyDone && (
                    <div className="flex gap-1" style={{ marginTop: 4 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: drDone ? "var(--accent-deepreal)" : "var(--border-primary)" }} />
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: mhDone ? "var(--accent-mentalhealth)" : "var(--border-primary)" }} />
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: rhDone ? "var(--accent-religionhub)" : "var(--border-primary)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4" style={{ fontSize: "11px", color: "var(--text-caption)" }}>
            <span className="flex items-center gap-1"><div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-deepreal)" }} /> DR</span>
            <span className="flex items-center gap-1"><div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-mentalhealth)" }} /> MH</span>
            <span className="flex items-center gap-1"><div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-religionhub)" }} /> RH</span>
            <span className="flex items-center gap-1"><div style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(16,185,129,0.3)" }} /> {s(DASH.allComplete, a)}</span>
          </div>
        </div>

        {/* ═══ ADMIN-ONLY PANEL ═══ */}
        {isAdminUser && (
          <div style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: "var(--font-h3)", marginBottom: "var(--space-md)", direction: dir, fontFamily: ff }}>
              🔐 {t({ en: "Admin Control Panel", ar: "لوحة تحكم المشرف", arEG: "لوحة تحكم المشرف" })}
            </h2>
            <div className="glass-card" style={{ padding: "var(--space-xl)", borderLeft: "4px solid #EF4444" }}>
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16, lineHeight: 1.7, fontFamily: ff }}>
                {t({
                  en: "These controls are only visible to administrators. Regular users and guests cannot see this section.",
                  ar: "هذه الأدوات مرئية فقط للمشرفين. المستخدمون العاديون والزوار لا يمكنهم رؤية هذا القسم.",
                  arEG: "هذه الأدوات مرئية فقط للمشرفين. المستخدمون العاديون والزوار لا يمكنهم رؤية هذا القسم.",
                })}
              </p>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <Link href="/supervisor" className="glass-card no-underline" style={{
                  padding: 16, display: "flex", flexDirection: "column", gap: 6,
                  borderTop: "3px solid #EF4444", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ShieldCheck size={18} style={{ color: "#EF4444" }} />
                    <strong style={{ fontSize: 14 }}>{t({ en: "Supervisor Dashboard", ar: "لوحة المشرف", arEG: "لوحة المشرف" })}</strong>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {t({ en: "Cohort analytics, hypothesis testing, governance", ar: "تحليلات الفوج، اختبار الفرضيات، الحوكمة", arEG: "تحليلات الفوج، اختبار الفرضيات، الحوكمة" })}
                  </span>
                </Link>
                <Link href="/report" className="glass-card no-underline" style={{
                  padding: 16, display: "flex", flexDirection: "column", gap: 6,
                  borderTop: "3px solid #8B5CF6", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <BarChart3 size={18} style={{ color: "#8B5CF6" }} />
                    <strong style={{ fontSize: 14 }}>{t({ en: "Full Report", ar: "التقرير الكامل", arEG: "التقرير الكامل" })}</strong>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {t({ en: "Research report with all data exports", ar: "تقرير البحث مع كل تصديرات البيانات", arEG: "تقرير البحث مع كل تصديرات البيانات" })}
                  </span>
                </Link>
                <Link href="/presentation" className="glass-card no-underline" style={{
                  padding: 16, display: "flex", flexDirection: "column", gap: 6,
                  borderTop: "3px solid #2563EB", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <FileText size={18} style={{ color: "#2563EB" }} />
                    <strong style={{ fontSize: 14 }}>{t({ en: "Presentation", ar: "العرض التقديمي", arEG: "العرض التقديمي" })}</strong>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {t({ en: "Defense presentation and project overview", ar: "عرض الدفاع ونظرة عامة على المشروع", arEG: "عرض الدفاع ونظرة عامة على المشروع" })}
                  </span>
                </Link>
                <Link href="/defense-main-plan" className="glass-card no-underline" style={{
                  padding: 16, display: "flex", flexDirection: "column", gap: 6,
                  borderTop: "3px solid #F59E0B", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Shield size={18} style={{ color: "#F59E0B" }} />
                    <strong style={{ fontSize: 14 }}>{t({ en: "Defense Plan", ar: "خطة الدفاع", arEG: "خطة الدفاع" })}</strong>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {t({ en: "Main defense plan and strategy overview", ar: "خطة الدفاع الرئيسية والاستراتيجية", arEG: "خطة الدفاع الرئيسية والاستراتيجية" })}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
