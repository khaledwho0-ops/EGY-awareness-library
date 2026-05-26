"use client";

import { useEffect, useState } from "react";
import { Database, Loader2, RefreshCw } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";

type LocalizedText = { en: string; ar: string };

type EvidenceOverview = {
  moduleId: ModuleId;
  claims: Array<{
    id: string;
    title: LocalizedText;
    summary: LocalizedText;
    metrics: Array<{
      id: string;
      label: LocalizedText;
      unit: string;
      snapshots: Array<{
        id: string;
        region: string;
        valueKind: string;
        valueNumeric: number | null;
        valueText: string;
        year: number | null;
        method: string;
        confidence: number;
        source: {
          sourceName: string;
          url: string;
          syncStatus: string;
        };
      }>;
    }>;
  }>;
  sourceHealth: {
    total: number;
    live: number;
    failed: number;
    seeded: number;
    stale: number;
  };
};

type EvidencePayload = {
  generatedAt: string;
  modules?: EvidenceOverview[];
} & Partial<EvidenceOverview>;

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

export function EvidenceCommandBoard({ module }: { module?: ModuleId }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [payload, setPayload] = useState<EvidencePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    const response = await fetch(module ? `/api/science/evidence?module=${module}` : "/api/science/evidence");
    if (!response.ok) {
      throw new Error(`evidence request failed: ${response.status}`);
    }
    const data = (await response.json()) as EvidencePayload;
    setPayload(data);
    setError("");
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(module ? `/api/science/evidence?module=${module}` : "/api/science/evidence");
        if (!response.ok) {
          throw new Error(`evidence request failed: ${response.status}`);
        }
        const data = (await response.json()) as EvidencePayload;
        if (!cancelled) {
          setPayload(data);
        }
      } catch (caughtError) {
        if (!cancelled) {
          const message = caughtError instanceof Error ? caughtError.message : "Unknown evidence loading failure";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [module]);

  async function refreshEvidence() {
    setRefreshing(true);
    try {
      const refreshResponse = await fetch("/api/science/refresh", { method: "POST" });
      if (!refreshResponse.ok) {
        throw new Error(`refresh failed: ${refreshResponse.status}`);
      }
      await load();
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unknown evidence refresh failure";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  }

  const modules = payload?.modules ?? (payload?.moduleId ? [payload as EvidenceOverview] : []);

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)", direction: a ? "rtl" : "ltr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Database size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Evidence board", ar: "لوحة الأدلة", arEG: "لوحة الأدلة" })}</strong>
          </div>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t({ en: "Every row should resolve to a source, year, method, and confidence value.", ar: "كل صف يجب أن يرتبط بمصدر، سنة، منهج، وثقة.", arEG: "كل صف لازم يرتبط بمصدر وسنة ومنهج وثقة." })}
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={refreshEvidence} disabled={refreshing}>
          {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {t({ en: "Refresh evidence", ar: "تحديث الأدلة", arEG: "حدّث الأدلة" })}
        </button>
      </div>

      {error && !loading ? (
        <div className="glass-card" style={{ padding: "var(--space-lg)", marginBottom: 12 }}>
          <strong style={{ display: "block", marginBottom: 8 }}>
            {t({ en: "Evidence board failed to load", ar: "ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ù„ÙˆØ­Ø© Ø§Ù„Ø£Ø¯Ù„Ø©", arEG: "ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ù„ÙˆØ­Ø© Ø§Ù„Ø£Ø¯Ù„Ø©" })}
          </strong>
          <p style={{ color: "var(--text-secondary)", marginTop: 0 }}>{error}</p>
          <button type="button" className="btn-secondary" onClick={() => void load()}>
            {t({ en: "Retry", ar: "أعد المحاولة", arEG: "جرّب تاني" })}
          </button>
        </div>
      ) : loading ? (
        <div>{t({ en: "Loading evidence board...", ar: "جارٍ تحميل لوحة الأدلة...", arEG: "بيتحمّل لوحة الأدلة..." })}</div>
      ) : (
        <div className="grid gap-4">
          {modules.map((entry) => (
            <div key={entry.moduleId} className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
              {!module ? (
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 8 }}>{entry.moduleId}</div>
              ) : null}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <span className="badge">{entry.sourceHealth.total} {t({ en: "sources", ar: "مصدر", arEG: "مصدر" })}</span>
                <span className="badge">{entry.sourceHealth.live} {t({ en: "live", ar: "حي", arEG: "شغال" })}</span>
                <span className="badge">{entry.sourceHealth.failed} {t({ en: "failed", ar: "فشل", arEG: "فشل" })}</span>
                <span className="badge">{entry.sourceHealth.seeded} {t({ en: "seeded", ar: "بذري", arEG: "بذري" })}</span>
              </div>
              <div className="grid gap-4">
                {entry.claims.map((claim) => (
                  <div key={claim.id} className="glass-card" style={{ padding: "var(--space-md)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6 }}>{copy(claim.title, a)}</h3>
                    <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(claim.summary, a)}</p>
                    <div className="grid gap-3">
                      {claim.metrics.map((metric) => (
                        <div key={metric.id}>
                          <strong>{copy(metric.label, a)}</strong>
                          <div className="grid gap-2" style={{ marginTop: 6 }}>
                            {metric.snapshots.map((snapshot) => (
                              <a
                                key={snapshot.id}
                                href={snapshot.source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card"
                                style={{ padding: "var(--space-sm)", background: "rgba(15,23,42,0.18)", textDecoration: "none", color: "inherit" }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                                  <div>
                                    <div style={{ fontWeight: 600 }}>{snapshot.region.toUpperCase()}</div>
                                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                                      {snapshot.valueNumeric ?? snapshot.valueText} {metric.unit !== "signal" && snapshot.valueNumeric !== null ? metric.unit : ""}
                                    </div>
                                  </div>
                                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                    {snapshot.year ?? "n/a"} • {snapshot.source.sourceName}
                                  </div>
                                </div>
                                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
                                  {t({ en: "Method:", ar: "المنهج:", arEG: "المنهج:" })} {snapshot.method} • {t({ en: "Confidence:", ar: "الثقة:", arEG: "الثقة:" })} {Math.round(snapshot.confidence * 100)}%
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
