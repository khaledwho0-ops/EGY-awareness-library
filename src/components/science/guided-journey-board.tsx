"use client";

import Link from "next/link";
import { startTransition, useEffect, useState, useTransition } from "react";
import { ArrowRight, BrainCircuit, Database, RefreshCw, Route, ShieldCheck } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";

type LocalizedText = { en: string; ar: string };

type JourneyModule = {
  module: ModuleId;
  href: string;
  title: LocalizedText;
  philosophy: LocalizedText;
  routeStatus: "guide-required" | "guided" | "in-progress" | "complete";
  activeEmotion: LocalizedText | null;
  emotionalNudge: LocalizedText;
  scientificReason: LocalizedText;
  nextStep: {
    order: number;
    title: LocalizedText;
    when: LocalizedText;
    action: LocalizedText;
  };
  progress: {
    completedSteps: number;
    totalSteps: number;
    percentage: number;
  };
  comparisonFocus: {
    label: LocalizedText;
    global: number;
    egypt: number;
    unit: string;
    source: string;
  };
};

type JourneyPayload = {
  generatedAt: string;
  primaryModule: ModuleId;
  modules: JourneyModule[];
  refreshSummary: {
    lastRefreshAt: string | null;
    sourceCount: number;
    signalCount: number;
    updateMethodCount: number;
    history: Array<{
      id: number;
      triggeredAt: string;
      note: string;
    }>;
    sources: Array<{
      id: string;
      name: string;
      scope: string;
      freshness: "reference" | "current" | "monitor" | "archive";
    }>;
  };
};

function copy(text: LocalizedText, isArabic: boolean) {
  return isArabic ? text.ar : text.en;
}

function getStatusLabel(status: JourneyModule["routeStatus"], isArabic: boolean) {
  if (status === "guide-required") {
    return isArabic ? "ابدأ بالتوجيه" : "Needs guide";
  }
  if (status === "guided") {
    return isArabic ? "مسار موجّه" : "Guided now";
  }
  if (status === "in-progress") {
    return isArabic ? "قيد التنفيذ" : "In progress";
  }
  return isArabic ? "المسار مكتمل" : "Core route done";
}
// NOTE: getStatusLabel kept with isArabic param for now — it is called outside JSX context

function formatDate(value: string | null, locale: string) {
  if (!value) {
    return locale === "ar-EG" ? "لم يتم التحديث بعد" : "Not refreshed yet";
  }

  return new Date(value).toLocaleString(locale);
}

export function GuidedJourneyBoard({ variant = "dashboard" }: { variant?: "home" | "dashboard" }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const locale = t({ en: "en-US", ar: "ar-EG", arEG: "ar-EG" });
  const [payload, setPayload] = useState<JourneyPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPending, beginTransition] = useTransition();

  async function loadJourney() {
    try {
      const response = await fetch("/api/science/journey");
      if (!response.ok) {
        throw new Error(`journey request failed: ${response.status}`);
      }
      const nextPayload = (await response.json()) as JourneyPayload;
      setPayload(nextPayload);
      setError("");
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unknown journey loading failure";
      setError(message);
    }
  }

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/science/journey");
        if (!response.ok) {
          throw new Error(`journey request failed: ${response.status}`);
        }
        const nextPayload = (await response.json()) as JourneyPayload;
        if (!cancelled) {
          setPayload(nextPayload);
        }
      } catch (caughtError) {
        if (!cancelled) {
          const message = caughtError instanceof Error ? caughtError.message : "Unknown journey loading failure";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshSources() {
    try {
      const response = await fetch("/api/science/refresh", { method: "POST" });
      if (!response.ok) {
        throw new Error(`refresh failed: ${response.status}`);
      }
      startTransition(() => {
        void loadJourney();
      });
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unknown refresh failure";
      setError(message);
    }
  }

  if (loading) {
    return (
      <section className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)" }}>
        {t({ en: "Loading the scientific journey map...", ar: "جارٍ تحميل خارطة الطريق العلمية...", arEG: "بيتحمّل خارطة الطريق العلمية..." })}
      </section>
    );
  }

  if (!payload) {
    return (
      <section className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)" }}>
        <strong style={{ display: "block", marginBottom: 8 }}>
          {t({ en: "Scientific journey map failed to load", ar: "فشل تحميل خارطة المسار العلمية", arEG: "فشل تحميل خارطة المسار العلمية" })}
        </strong>
        <p style={{ color: "var(--text-secondary)", marginTop: 0 }}>
          {error || t({ en: "The journey payload did not arrive correctly.", ar: "لم تصل بيانات المسار بشكل صحيح.", arEG: "بيانات المسار موصلتش صح." })}
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => beginTransition(() => void loadJourney())}
          disabled={isPending}
        >
          {t({ en: "Retry", ar: "أعد المحاولة", arEG: "جرّب تاني" })}
        </button>
      </section>
    );
  }

  const primary = payload.modules.find((item) => item.module === payload.primaryModule) ?? payload.modules[0];

  return (
    <section
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        marginBottom: "var(--space-xl)",
        direction: a ? "rtl" : "ltr",
        background:
          variant === "home"
            ? "linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.88))"
            : "var(--bg-secondary)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", marginBottom: 18 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Route size={18} style={{ color: "var(--accent-cta)" }} />
            <strong style={{ fontSize: 18 }}>
              {t({ en: "Scientific journey guide", ar: "موجّه المسار العلمي", arEG: "موجّه المسار العلمي" })}
            </strong>
          </div>
          <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
            {t({ en: "Instead of leaving the user lost between pages, this guide tells them what to do now, why this is the right route, and when to move to the next step.", ar: "بدلاً من أن يضيع المستخدم بين الصفحات، هذا الموجّه يحدد له ماذا يفعل الآن، ولماذا هذا هو المسار الصحيح، ومتى ينتقل إلى الخطوة التالية.", arEG: "بدل ما المستخدم يتوه بين الصفحات، الموجّه ده بيحدد له يعمل إيه دلوقتي، وليه ده المسار الصح، وإمتى ينتقل للخطوة الجاية." })}
          </p>
        </div>

        <div className="glass-card" style={{ padding: "var(--space-md)", minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Database size={15} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Science pulse", ar: "نبض المصادر", arEG: "نبض المصادر" })}</strong>
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 4 }}>
            {t({ en: "Last refresh:", ar: "آخر تحديث:", arEG: "آخر تحديث:" })} {formatDate(payload.refreshSummary.lastRefreshAt, locale)}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 10 }}>
            {payload.refreshSummary.sourceCount} {t({ en: "tracked sources", ar: "مصدر متتبع", arEG: "مصدر متتبع" })} • {payload.refreshSummary.signalCount}{" "}
            {t({ en: "science signals", ar: "إشارة علمية", arEG: "إشارة علمية" })}
          </div>
          <button type="button" className="btn-secondary" onClick={() => beginTransition(() => void refreshSources())} disabled={isPending}>
            <RefreshCw size={14} />
            {isPending ? t({ en: "Refreshing", ar: "جارٍ التحديث", arEG: "بيتحدّث" }) : t({ en: "Refresh science log", ar: "تحديث السجل العلمي", arEG: "حدّث السجل العلمي" })}
          </button>
        </div>
      </div>

      {error ? (
        <div
          className="glass-card"
          style={{
            padding: "var(--space-md)",
            marginBottom: 16,
            border: "1px solid rgba(248, 113, 113, 0.35)",
            background: "rgba(127, 29, 29, 0.18)",
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>
            {t({ en: "A science sync problem needs review", ar: "يوجد خلل في مزامنة البيانات", arEG: "يوجد خلل في مزامنة البيانات" })}
          </strong>
          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{error}</span>
        </div>
      ) : null}

      <div className="grid gap-4" style={{ gridTemplateColumns: "1.3fr 1fr", alignItems: "stretch", marginBottom: 18 }}>
        <div
          className="glass-card"
          style={{
            padding: "var(--space-lg)",
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(59, 130, 246, 0.08))",
            border: "1px solid rgba(245, 158, 11, 0.24)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ fontSize: 13, color: "var(--text-caption)", marginBottom: 6 }}>
                {t({ en: "Start here now", ar: "ابدأ من هنا الآن", arEG: "ابدأ من هنا دلوقتي" })}
              </div>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{copy(primary.title, a)}</h3>
              <p style={{ marginTop: 0, marginBottom: 12, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {copy(primary.philosophy, a)}
              </p>

              {primary.activeEmotion ? (
                <div style={{ fontSize: 13, marginBottom: 10, color: "var(--text-muted)" }}>
                  <strong>{t({ en: "Current state:", ar: "حالتي الآن:", arEG: "حالتي دلوقتي:" })}</strong> {copy(primary.activeEmotion, a)}
                </div>
              ) : null}

              <div style={{ marginBottom: 10 }}>
                <strong style={{ display: "block", marginBottom: 4 }}>{t({ en: "Why this route?", ar: "لماذا هذا المسار؟", arEG: "ليه المسار ده؟" })}</strong>
                <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {copy(primary.emotionalNudge, a)}
                </p>
              </div>

              <div style={{ marginBottom: 12 }}>
                <strong style={{ display: "block", marginBottom: 4 }}>{t({ en: "Scientific reason", ar: "السبب العلمي", arEG: "السبب العلمي" })}</strong>
                <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {copy(primary.scientificReason, a)}
                </p>
              </div>

              <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(15, 23, 42, 0.28)" }}>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                  {`${t({ en: "Step", ar: "الخطوة", arEG: "الخطوة" })} ${primary.nextStep.order}`}
                </div>
                <strong>{copy(primary.nextStep.title, a)}</strong>
                <p style={{ marginTop: 8, marginBottom: 6, color: "var(--text-secondary)" }}>
                  <strong>{t({ en: "When:", ar: "متى:", arEG: "إمتى:" })}</strong> {copy(primary.nextStep.when, a)}
                </p>
                <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                  <strong>{t({ en: "Action:", ar: "ماذا أفعل:", arEG: "أعمل إيه:" })}</strong> {copy(primary.nextStep.action, a)}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 220 }}>
              <span
                className="badge"
                style={{
                  background: "rgba(245, 158, 11, 0.14)",
                  color: "var(--accent-cta)",
                  border: "1px solid rgba(245, 158, 11, 0.22)",
                  justifyContent: "center",
                }}
              >
                {getStatusLabel(primary.routeStatus, a)}
              </span>
              <Link href={primary.href} className="btn-primary no-underline" style={{ justifyContent: "center" }}>
                {t({ en: "Open route", ar: "افتح المسار", arEG: "افتح المسار" })} <ArrowRight size={15} style={{ transform: a ? "rotate(180deg)" : "none" }} />
              </Link>
              <Link href="/science" className="btn-secondary no-underline" style={{ justifyContent: "center" }}>
                {t({ en: "Open science library", ar: "افتح مكتبة العلم", arEG: "افتح مكتبة العلم" })}
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <ShieldCheck size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Latest tracked sources", ar: "أحدث المصادر المتتبعة", arEG: "أحدث المصادر المتتبعة" })}</strong>
          </div>
          <div className="grid gap-2">
            {payload.refreshSummary.sources.slice(0, 6).map((source) => (
              <div key={source.id} className="glass-card" style={{ padding: "var(--space-sm)", background: "var(--bg-secondary)" }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{source.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {source.scope} • {t({ en: "freshness", ar: "حالة الحداثة", arEG: "حالة الحداثة" })}: {source.freshness}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: variant === "dashboard" ? 18 : 0 }}>
        {payload.modules.map((module) => (
          <div key={module.module} className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(15, 23, 42, 0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 10, alignItems: "start" }}>
              <div>
                <h4 style={{ margin: 0 }}>{copy(module.title, a)}</h4>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginTop: 4 }}>
                  {getStatusLabel(module.routeStatus, a)}
                </div>
              </div>
              <Link href={module.href} className="btn-secondary no-underline" style={{ padding: "6px 10px", fontSize: 12 }}>
                {t({ en: "Continue", ar: "استمرار", arEG: "كمّل" })}
              </Link>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.65, minHeight: 68 }}>
              {copy(module.philosophy, a)}
            </p>

            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                <span>{t({ en: "Progress", ar: "التقدم", arEG: "التقدم" })}</span>
                <span>
                  {module.progress.completedSteps}/{module.progress.totalSteps}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "rgba(148, 163, 184, 0.18)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${module.progress.percentage}%`,
                    borderRadius: 999,
                    background: "linear-gradient(90deg, var(--accent-cta), rgba(59,130,246,0.85))",
                  }}
                />
              </div>
            </div>

            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
              <strong>{t({ en: "Next step:", ar: "الخطوة التالية:", arEG: "الخطوة الجاية:" })}</strong> {copy(module.nextStep.title, a)}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
              <strong>{t({ en: "Action:", ar: "الإجراء:", arEG: "الخطوة:" })}</strong> {copy(module.nextStep.action, a)}
            </div>
            <div className="glass-card" style={{ padding: "var(--space-sm)", background: "var(--bg-primary)" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                {copy(module.comparisonFocus.label, a)}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {t({ en: "Egypt", ar: "مصر", arEG: "مصر" })} {module.comparisonFocus.egypt}
                {module.comparisonFocus.unit ? ` ${module.comparisonFocus.unit}` : ""} • {t({ en: "Global", ar: "العالم", arEG: "العالم" })} {module.comparisonFocus.global}
                {module.comparisonFocus.unit ? ` ${module.comparisonFocus.unit}` : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      {variant === "dashboard" ? (
        <div className="glass-card" style={{ padding: "var(--space-lg)", overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <BrainCircuit size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Egypt vs global table", ar: "جدول مصر مقابل العالم", arEG: "جدول مصر مقابل العالم" })}</strong>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
            <thead>
              <tr style={{ textAlign: a ? "right" : "left", borderBottom: "1px solid var(--border-primary)" }}>
                <th style={{ padding: "10px 12px" }}>{t({ en: "Module", ar: "المسار", arEG: "المسار" })}</th>
                <th style={{ padding: "10px 12px" }}>{t({ en: "Metric", ar: "المؤشر", arEG: "المؤشر" })}</th>
                <th style={{ padding: "10px 12px" }}>{t({ en: "Egypt", ar: "مصر", arEG: "مصر" })}</th>
                <th style={{ padding: "10px 12px" }}>{t({ en: "Global", ar: "العالم", arEG: "العالم" })}</th>
                <th style={{ padding: "10px 12px" }}>{t({ en: "Source", ar: "المصدر", arEG: "المصدر" })}</th>
              </tr>
            </thead>
            <tbody>
              {payload.modules.map((module) => (
                <tr key={module.module} style={{ borderBottom: "1px solid rgba(148, 163, 184, 0.12)" }}>
                  <td style={{ padding: "12px" }}>{copy(module.title, a)}</td>
                  <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{copy(module.comparisonFocus.label, a)}</td>
                  <td style={{ padding: "12px" }}>{module.comparisonFocus.egypt}</td>
                  <td style={{ padding: "12px" }}>{module.comparisonFocus.global}</td>
                  <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: 13 }}>{module.comparisonFocus.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
