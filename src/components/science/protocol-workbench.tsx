"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";
import type { ProtocolKind } from "@/lib/science/protocol-engine";

type LocalizedText = { en: string; ar: string };

type ProtocolField = {
  id: string;
  type: "boolean" | "scale" | "select" | "textarea";
  label: LocalizedText;
  description: LocalizedText;
  min?: number;
  max?: number;
  options?: Array<{
    value: string;
    label: LocalizedText;
  }>;
};

type ProtocolResponse = {
  protocol: {
    id: string;
    title: LocalizedText;
    summary: LocalizedText;
    goal: LocalizedText;
    decisionLogic: LocalizedText[];
    nextAction: LocalizedText;
    linkedEvidenceClaimIds: string[];
    inputSchema: ProtocolField[];
  };
  evaluation?: {
    score: number;
    outcome: {
      title: LocalizedText;
      meaning: LocalizedText;
      severity: "low" | "medium" | "high";
    };
    reasoning: LocalizedText[];
    nextAction: LocalizedText;
    egyptianContext?: LocalizedText;
    linkedEvidenceClaimIds: string[];
  };
};

interface ProtocolWorkbenchProps {
  module: ModuleId;
  kind: ProtocolKind;
  itemId: string;
  itemTitle: LocalizedText;
  onClose: () => void;
}

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

export function ProtocolWorkbench({ module, kind, itemId, itemTitle, onClose }: ProtocolWorkbenchProps) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [payload, setPayload] = useState<ProtocolResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/science/protocol?module=${module}&kind=${kind}&id=${itemId}`);
        const data = (await response.json()) as ProtocolResponse | { error: string };
        if (!response.ok || "error" in data) {
          throw new Error("error" in data ? data.error : "Failed to load protocol.");
        }
        if (!cancelled) {
          setPayload(data);
          const nextForm: Record<string, unknown> = {};
          for (const field of data.protocol.inputSchema) {
            nextForm[field.id] = field.type === "boolean" ? false : field.type === "scale" ? field.min ?? 0 : field.options?.[0]?.value ?? "";
          }
          setForm(nextForm);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load protocol.");
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
  }, [itemId, kind, module]);

  async function runProtocol() {
    setRunning(true);
    setError("");
    try {
      const response = await fetch("/api/science/protocol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module, kind, id: itemId, inputs: form }),
      });
      const data = (await response.json()) as ProtocolResponse | { error: string };
      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Failed to run protocol.");
      }
      setPayload(data);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Failed to run protocol.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", marginTop: 16, direction: a ? "rtl" : "ltr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
            {t({ en: "Execution workbench", ar: "مختبر التنفيذ", arEG: "مختبر التنفيذ" })}
          </div>
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>{copy(itemTitle, a)}</h3>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t({ en: "Turn this item into an executable, documented decision.", ar: "حوّل العنصر إلى قرار عملي موثق.", arEG: "حوّل العنصر ده لقرار عملي موثّق." })}
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={onClose}>
          <X size={14} /> {t({ en: "Close", ar: "إغلاق", arEG: "قفل" })}
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Loader2 size={16} className="animate-spin" /> {t({ en: "Loading protocol...", ar: "جارٍ تحميل البروتوكول...", arEG: "بيتحمّل البروتوكول..." })}
        </div>
      ) : error ? (
        <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(239,68,68,0.08)" }}>
          <AlertTriangle size={16} style={{ color: "var(--color-danger)", marginBottom: 8 }} />
          <div>{error}</div>
        </div>
      ) : payload ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
          <div className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
            <strong style={{ display: "block", marginBottom: 6 }}>{t({ en: "Goal", ar: "الهدف", arEG: "الهدف" })}</strong>
            <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(payload.protocol.goal, a)}</p>

            <strong style={{ display: "block", marginBottom: 6 }}>{t({ en: "Decision logic", ar: "منطق القرار", arEG: "منطق القرار" })}</strong>
            <div className="grid gap-2" style={{ marginBottom: 16 }}>
              {payload.protocol.decisionLogic.map((line, index) => (
                <div key={index} style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  {copy(line, a)}
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {payload.protocol.inputSchema.map((field) => {
                if (field.type === "boolean") {
                  return (
                    <label key={field.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.id])}
                        onChange={(event) => setForm((current) => ({ ...current, [field.id]: event.target.checked }))}
                        style={{ marginTop: 4, width: 18, height: 18, accentColor: "var(--accent-cta)" }}
                      />
                      <div>
                        <span style={{ fontWeight: 600, display: "block" }}>{copy(field.label, a)}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block" }}>{copy(field.description, a)}</span>
                      </div>
                    </label>
                  );
                }

                return (
                  <label key={field.id} style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontWeight: 600 }}>{copy(field.label, a)}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{copy(field.description, a)}</span>
                    {field.type === "scale" ? (
                    <input
                      type="range"
                      min={field.min ?? 0}
                      max={field.max ?? 10}
                      value={Number(form[field.id] ?? field.min ?? 0)}
                      onChange={(event) => setForm((current) => ({ ...current, [field.id]: Number(event.target.value) }))}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(form[field.id] ?? "")}
                      onChange={(event) => setForm((current) => ({ ...current, [field.id]: event.target.value }))}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {copy(option.label, a)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <textarea
                      rows={3}
                      value={String(form[field.id] ?? "")}
                      onChange={(event) => setForm((current) => ({ ...current, [field.id]: event.target.value }))}
                    />
                  )}
                </label>
                );
              })}
            </div>

            <button type="button" className="btn-primary" onClick={runProtocol} disabled={running} style={{ marginTop: 16 }}>
              {running ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              {t({ en: "Run protocol", ar: "شغّل البروتوكول", arEG: "شغّل البروتوكول" })}
            </button>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <strong style={{ display: "block", marginBottom: 8 }}>{t({ en: "Outcome", ar: "النتيجة", arEG: "النتيجة" })}</strong>
            {payload.evaluation ? (
              <div className="grid gap-3">
                <div className="badge" style={{ width: "fit-content" }}>
                  {t({ en: "Score", ar: "الدرجة", arEG: "الدرجة" })} {payload.evaluation.score}
                </div>
                <h4 style={{ margin: 0 }}>{copy(payload.evaluation.outcome.title, a)}</h4>
                <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(payload.evaluation.outcome.meaning, a)}</p>
                <div className="grid gap-2">
                  {payload.evaluation.reasoning.map((reason, index) => (
                    <div key={index} style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                      {copy(reason, a)}
                    </div>
                  ))}
                </div>
                <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                  <strong>{t({ en: "Next action", ar: "الإجراء التالي", arEG: "الخطوة الجاية" })}</strong>
                  <p style={{ marginBottom: 0 }}>{copy(payload.evaluation.nextAction, a)}</p>
                </div>
                {payload.evaluation.egyptianContext && (
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(34, 197, 94, 0.08)", borderLeft: "3px solid #22c55e" }}>
                    <strong>{t({ en: "Real-world application", ar: "تطبيق واقعي", arEG: "تطبيق عملي في مصر" })}</strong>
                    <p style={{ marginBottom: 0, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      {copy(payload.evaluation.egyptianContext, a)}
                    </p>
                  </div>
                )}
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {t({ en: "Linked evidence claim ids:", ar: "معرّفات الأدلة المرتبطة:", arEG: "معرّفات الأدلة المرتبطة:" })} {payload.evaluation.linkedEvidenceClaimIds.join(", ")}
                </div>
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", margin: 0 }}>
                {t({ en: "Fill the inputs and run the protocol to see the result.", ar: "املأ الحقول ثم شغّل البروتوكول لرؤية النتيجة.", arEG: "املا الحقول وشغّل البروتوكول عشان تشوف النتيجة." })}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
