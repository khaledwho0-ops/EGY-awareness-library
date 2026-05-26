"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, Printer } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

type LocalizedText = { en: string; ar: string };

type ReportPayload = {
  summary: {
    primaryModule: string;
    modulesInProgress: number;
    completeModules: number;
    evidenceClaims: number;
    liveSources: number;
    failedSources: number;
  };
  journey: {
    modules: Array<{
      module: string;
      title: LocalizedText;
      routeStatus: string;
      progress: { percentage: number };
      nextStep: { title: LocalizedText; action: LocalizedText };
      scientificReason: LocalizedText;
    }>;
  };
  evidence: Array<{
    moduleId: string;
    claims: Array<{
      title: LocalizedText;
      metrics: Array<{
        label: LocalizedText;
        snapshots: Array<{
          region: string;
          valueNumeric: number | null;
          valueText: string;
          source: { sourceName: string };
        }>;
      }>;
    }>;
  }>;
};

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

export function ReportingConsole() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [payload, setPayload] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/science/report");
        const data = (await response.json()) as ReportPayload;
        if (!cancelled) {
          setPayload(data);
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

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", direction: a ? "rtl" : "ltr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <FileText size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Presentation and reporting center", ar: "مركز العرض والتقرير", arEG: "مركز العرض والتقرير" })}</strong>
          </div>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t({ en: "Live executive summary built from journey state, evidence, and source health.", ar: "ملخص تنفيذي حي مبني على الرحلة، الأدلة، وصحة المصادر.", arEG: "ملخص تنفيذي حي مبني على الرحلة والأدلة وصحة المصادر." })}
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={() => window.print()}>
          <Printer size={14} /> {t({ en: "Print", ar: "طباعة", arEG: "اطبع" })}
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Loader2 size={16} className="animate-spin" /> {t({ en: "Loading report...", ar: "جارٍ تحميل التقرير...", arEG: "بيتحمّل التقرير..." })}
        </div>
      ) : payload ? (
        <div className="grid gap-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Primary module", ar: "الوحدة الأساسية", arEG: "الوحدة الأساسية" })}: {payload.summary.primaryModule}</div>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Modules in progress", ar: "الوحدات قيد التنفيذ", arEG: "الوحدات اللي شغالة" })}: {payload.summary.modulesInProgress}</div>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Completed modules", ar: "الوحدات المكتملة", arEG: "الوحدات اللي خلصت" })}: {payload.summary.completeModules}</div>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Evidence claims", ar: "مطالبات الأدلة", arEG: "مطالبات الأدلة" })}: {payload.summary.evidenceClaims}</div>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Live sources", ar: "مصادر حية", arEG: "مصادر شغالة" })}: {payload.summary.liveSources}</div>
            <div className="glass-card" style={{ padding: "var(--space-md)" }}>{t({ en: "Failed sources", ar: "مصادر فاشلة", arEG: "مصادر فشلت" })}: {payload.summary.failedSources}</div>
          </div>

          {payload.journey.modules.map((module) => (
            <div key={module.module} className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
              <h3 style={{ marginTop: 0 }}>{copy(module.title, a)}</h3>
              <p style={{ color: "var(--text-secondary)" }}>{copy(module.scientificReason, a)}</p>
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                {t({ en: "Progress", ar: "التقدم", arEG: "التقدم" })}: {module.progress.percentage}%
              </div>
              <div className="glass-card" style={{ padding: "var(--space-md)", marginBottom: 12 }}>
                <strong>{t({ en: "Next step", ar: "الخطوة التالية", arEG: "الخطوة الجاية" })}</strong>
                <div>{copy(module.nextStep.title, a)}</div>
                <div style={{ color: "var(--text-muted)" }}>{copy(module.nextStep.action, a)}</div>
              </div>
              <div className="grid gap-3">
                {payload.evidence
                  .find((entry) => entry.moduleId === module.module)
                  ?.claims.slice(0, 2)
                  .map((claim, index) => (
                    <div key={index} className="glass-card" style={{ padding: "var(--space-md)" }}>
                      <strong>{copy(claim.title, a)}</strong>
                      <div className="grid gap-2" style={{ marginTop: 8 }}>
                        {claim.metrics.slice(0, 2).map((metric, metricIndex) => (
                          <div key={metricIndex}>
                            <div style={{ fontWeight: 600 }}>{copy(metric.label, a)}</div>
                            {metric.snapshots.slice(0, 2).map((snapshot, snapshotIndex) => (
                              <div key={snapshotIndex} style={{ fontSize: 13, color: "var(--text-muted)" }}>
                                {snapshot.region.toUpperCase()}: {snapshot.valueNumeric ?? snapshot.valueText} • {snapshot.source.sourceName}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
