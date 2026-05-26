"use client";

import { useState } from "react";
import { Loader2, Search, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import { ImplementIRLButton } from "@/components/shared/implement-irl-button";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";
import type { NormalizedAPIResponse } from "@/types";

type LocalizedText = { en: string; ar: string };

type ModuleOperationPayload = {
  result: {
    score: number;
    outcome: {
      title: LocalizedText;
      summary: LocalizedText;
      severity: "low" | "medium" | "high";
    };
    reasons: LocalizedText[];
    nextActions: LocalizedText[];
  };
};

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

function getIcon(module: ModuleId) {
  if (module === "deepreal") return <ShieldCheck size={16} style={{ color: "var(--accent-deepreal)" }} />;
  if (module === "mental-health") return <HeartPulse size={16} style={{ color: "var(--accent-mentalhealth)" }} />;
  return <Sparkles size={16} style={{ color: "var(--accent-religionhub)" }} />;
}

function accessLabel(result: NormalizedAPIResponse, arabic: boolean) {
  if (result.accessTier === "free") return arabic ? "مجاني" : "Free";
  if (result.accessTier === "mixed") return arabic ? "مختلط" : "Mixed";
  if (result.accessTier === "paid") return arabic ? "مدفوع / بديل" : "Paid fallback";
  return arabic ? "غير مؤكد" : "Unknown access";
}

export function ModuleLabConsole({ module, embedded = false }: { module: ModuleId; embedded?: boolean }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ModuleOperationPayload["result"] | null>(null);
  const [deeprealSearch, setDeeprealSearch] = useState<NormalizedAPIResponse[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(
    module === "deepreal"
      ? { claim: "", context: "", urgency: 5, emotionalPressure: 5, sourceKnown: false, officialMatch: false }
      : module === "mental-health"
        ? { distress: 5, functionDrop: 4, dangerNow: false, supportAvailable: true }
        : { coercion: 5, guilt: 5, replacesCare: false, sectarian: false }
  );

  async function runLab() {
    setLoading(true);
    try {
      const operationResponse = await fetch("/api/science/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module, input: form }),
      });
      const operationData = (await operationResponse.json()) as ModuleOperationPayload;
      setResult(operationData.result);

      if (module === "deepreal" && typeof form.claim === "string" && form.claim.trim()) {
        const query = encodeURIComponent(form.claim);
        const [factcheck, evidence] = await Promise.all([
          fetch(`/api/search/factcheck?q=${query}`).then((response) => response.json()).catch(() => ({ results: [] })),
          fetch(`/api/search/evidence?q=${query}`).then((response) => response.json()).catch(() => ({ results: [] })),
        ]);
        const merged = [...(factcheck.results ?? []), ...(evidence.results ?? [])].slice(0, 6) as NormalizedAPIResponse[];
        setDeeprealSearch(merged);
      } else {
        setDeeprealSearch([]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        marginBottom: embedded ? 0 : "var(--space-xl)",
        direction: a ? "rtl" : "ltr",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        {getIcon(module)}
        <strong>{t({ en: embedded ? "Real-Time Cognitive Lab" : "Operational Lab", ar: "مختبر الإدراك اللحظي", arEG: "المختبر اللحظي" })}</strong>
      </div>
      <p style={{ color: "var(--text-muted)", marginTop: 0 }}>
        {module === "deepreal"
          ? t({ en: "Enter a claim to run logical triage and first-pass verification with free-access evidence first.", ar: "أدخل الدعوى لتشغيل الفرز المنطقي والتحقق الأولي مع مصادر مجانية أولاً.", arEG: "اكتب الادعاء عشان تشغّل الفرز المنطقي والتحقق الأولي بمصادر مجانية الأول." })
          : module === "mental-health"
            ? t({ en: "Turn distress into a clear support route instead of generic reading, and monitor the state in real time.", ar: "حوّل الضيق إلى مسار دعم واضح بدلاً من القراءة العامة، وراقب الحالة في اللحظة.", arEG: "حوّل الضيق لمسار دعم واضح بدل القراءة العامة، وراقب الحالة في اللحظة." })
            : t({ en: "Test the message religiously: does it build peace or control, and does it respect boundaries?", ar: "اختبر الرسالة دينياً: هل تبني السلام أم السيطرة؟ وهل تحترم الحدود؟", arEG: "اختبر الرسالة دينياً: بتبني سلام ولا سيطرة؟ وبتحترم الحدود؟" })}
      </p>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
        <div className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
          {module === "deepreal" ? (
            <div className="grid gap-3">
              <label>
                <span>{t({ en: "Claim", ar: "الادعاء", arEG: "الادعاء" })}</span>
                <textarea rows={4} value={String(form.claim ?? "")} onChange={(event) => setForm((current) => ({ ...current, claim: event.target.value }))} />
              </label>
              <label>
                <span>{t({ en: "Context", ar: "السياق", arEG: "السياق" })}</span>
                <textarea rows={2} value={String(form.context ?? "")} onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))} />
              </label>
              <label>
                <span>{t({ en: "Urgency", ar: "الاستعجال", arEG: "الاستعجال" })}</span>
                <input type="range" min={0} max={10} value={Number(form.urgency ?? 0)} onChange={(event) => setForm((current) => ({ ...current, urgency: Number(event.target.value) }))} />
              </label>
              <label>
                <span>{t({ en: "Emotional pressure", ar: "الضغط العاطفي", arEG: "الضغط العاطفي" })}</span>
                <input type="range" min={0} max={10} value={Number(form.emotionalPressure ?? 0)} onChange={(event) => setForm((current) => ({ ...current, emotionalPressure: Number(event.target.value) }))} />
              </label>
              {/* ═══ ENHANCED DEEPREAL CHECKBOXES ═══ */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.sourceKnown)
                    ? "2px solid rgba(59,130,246,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.sourceKnown)
                    ? "rgba(59,130,246,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.sourceKnown)}
                  onChange={(event) => setForm((current) => ({ ...current, sourceKnown: event.target.checked }))}
                  style={{ width: 20, height: 20, accentColor: "#3b82f6", cursor: "pointer", flexShrink: 0 }}
                />
                <span style={{
                  color: Boolean(form.sourceKnown) ? "#93c5fd" : "var(--text-secondary)",
                  fontWeight: Boolean(form.sourceKnown) ? 700 : 400,
                }}>
                  {t({ en: "I know the original source", ar: "أعرف المصدر الأصلي", arEG: "أعرف المصدر الأصلي" })}
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.officialMatch)
                    ? "2px solid rgba(16,185,129,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.officialMatch)
                    ? "rgba(16,185,129,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.officialMatch)}
                  onChange={(event) => setForm((current) => ({ ...current, officialMatch: event.target.checked }))}
                  style={{ width: 20, height: 20, accentColor: "#10b981", cursor: "pointer", flexShrink: 0 }}
                />
                <span style={{
                  color: Boolean(form.officialMatch) ? "#6ee7b7" : "var(--text-secondary)",
                  fontWeight: Boolean(form.officialMatch) ? 700 : 400,
                }}>
                  {t({ en: "I found official/scholarly support", ar: "وجدت تأكيداً رسمياً/علمياً", arEG: "لقيت تأكيد رسمي/علمي" })}
                </span>
              </label>
            </div>
          ) : module === "mental-health" ? (
            <div className="grid gap-3">
              <label>
                <span>{t({ en: "Distress level", ar: "شدة الضيق", arEG: "مستوى الضيق" })}</span>
                <input type="range" min={0} max={10} value={Number(form.distress ?? 0)} onChange={(event) => setForm((current) => ({ ...current, distress: Number(event.target.value) }))} />
              </label>
              <label>
                <span>{t({ en: "Daily function drop", ar: "تعطل الوظيفة اليومية", arEG: "تأثر المهام اليومية" })}</span>
                <input type="range" min={0} max={10} value={Number(form.functionDrop ?? 0)} onChange={(event) => setForm((current) => ({ ...current, functionDrop: Number(event.target.value) }))} />
              </label>
              {/* ═══ ENHANCED CHECKBOXES — Fixed visibility ═══ */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.dangerNow)
                    ? "2px solid rgba(239,68,68,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.dangerNow)
                    ? "rgba(239,68,68,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.dangerNow)}
                  onChange={(event) => setForm((current) => ({ ...current, dangerNow: event.target.checked }))}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#ef4444",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  color: Boolean(form.dangerNow) ? "#fca5a5" : "var(--text-secondary)",
                  fontWeight: Boolean(form.dangerNow) ? 700 : 400,
                }}>
                  {t({ en: "Immediate danger now", ar: "يوجد خطر فوري الآن", arEG: "في خطر فوري دلوقتي" })}
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.supportAvailable)
                    ? "2px solid rgba(16,185,129,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.supportAvailable)
                    ? "rgba(16,185,129,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.supportAvailable)}
                  onChange={(event) => setForm((current) => ({ ...current, supportAvailable: event.target.checked }))}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#10b981",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  color: Boolean(form.supportAvailable) ? "#6ee7b7" : "var(--text-secondary)",
                  fontWeight: Boolean(form.supportAvailable) ? 700 : 400,
                }}>
                  {t({ en: "Trusted support is available", ar: "يوجد شخص موثوق متاح", arEG: "في حد موثوق موجود" })}
                </span>
              </label>
            </div>
          ) : (
            <div className="grid gap-3">
              <label>
                <span>{t({ en: "Coercion", ar: "القسر", arEG: "الإجبار" })}</span>
                <input type="range" min={0} max={10} value={Number(form.coercion ?? 0)} onChange={(event) => setForm((current) => ({ ...current, coercion: Number(event.target.value) }))} />
              </label>
              <label>
                <span>{t({ en: "Weaponized guilt", ar: "تسليح الذنب", arEG: "تسليح الذنب" })}</span>
                <input type="range" min={0} max={10} value={Number(form.guilt ?? 0)} onChange={(event) => setForm((current) => ({ ...current, guilt: Number(event.target.value) }))} />
              </label>
              {/* ═══ ENHANCED RELIGION HUB CHECKBOXES ═══ */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.replacesCare)
                    ? "2px solid rgba(168,85,247,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.replacesCare)
                    ? "rgba(168,85,247,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.replacesCare)}
                  onChange={(event) => setForm((current) => ({ ...current, replacesCare: event.target.checked }))}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#a855f7",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  color: Boolean(form.replacesCare) ? "#c4b5fd" : "var(--text-secondary)",
                  fontWeight: Boolean(form.replacesCare) ? 700 : 400,
                }}>
                  {t({ en: "Replaces care with certainty", ar: "يستبدل الرعاية باليقين", arEG: "بيستبدل الرعاية باليقين" })}
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: Boolean(form.sectarian)
                    ? "2px solid rgba(239,68,68,0.6)"
                    : "1px solid var(--border-primary)",
                  background: Boolean(form.sectarian)
                    ? "rgba(239,68,68,0.08)"
                    : "var(--bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form.sectarian)}
                  onChange={(event) => setForm((current) => ({ ...current, sectarian: event.target.checked }))}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#ef4444",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  color: Boolean(form.sectarian) ? "#fca5a5" : "var(--text-secondary)",
                  fontWeight: Boolean(form.sectarian) ? 700 : 400,
                }}>
                  {t({ en: "Contains sectarian targeting", ar: "يوجد استهداف طائفي", arEG: "فيه استهداف طائفي" })}
                </span>
              </label>
            </div>
          )}

          <button type="button" className="btn-primary" onClick={runLab} disabled={loading} style={{ marginTop: 16 }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {t({ en: "Run lab", ar: "شغّل المختبر", arEG: "شغّل المختبر" })}
          </button>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
            <ImplementIRLButton
              irlKey={module === "deepreal" ? "reverse-engineering" : module === "mental-health" ? "lab-distress" : "default"}
              accent={module === "deepreal" ? "var(--accent-deepreal)" : module === "mental-health" ? "var(--accent-mentalhealth)" : "var(--accent-religionhub)"}
            />
          </div>
        </div>

        <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
          {result ? (
            <div className="grid gap-3">
              <div className="badge" style={{ width: "fit-content" }}>
                {t({ en: "Score", ar: "الدرجة", arEG: "الدرجة" })} {result.score}
              </div>
              <h3 style={{ margin: 0 }}>{copy(result.outcome.title, a)}</h3>
              <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(result.outcome.summary, a)}</p>
              <div className="grid gap-2">
                {result.reasons.map((reason, index) => (
                  <div key={index} style={{ color: "var(--text-secondary)" }}>
                    {copy(reason, a)}
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                {result.nextActions.map((action, index) => (
                  <div key={index} className="glass-card" style={{ padding: "var(--space-sm)", background: "var(--bg-secondary)" }}>
                    {copy(action, a)}
                  </div>
                ))}
              </div>
              {module === "deepreal" && deeprealSearch.length > 0 ? (
                <div>
                  <strong>{t({ en: "Free-first backend verification hits", ar: "الضربات الخلفية المجانية", arEG: "نتايج التحقق المجانية" })}</strong>
                  <div className="grid gap-2" style={{ marginTop: 8 }}>
                    {deeprealSearch.map((entry, index) => (
                      <a
                        key={`${entry.url}-${index}`}
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card"
                        style={{ padding: "var(--space-sm)", background: "var(--bg-secondary)", textDecoration: "none", color: "inherit" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{entry.title}</div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{entry.sourceName}</div>
                          </div>
                          <span className="badge" style={{ whiteSpace: "nowrap" }}>
                            {accessLabel(entry, a)}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>
                          {entry.accessNotes ?? entry.summary}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              {t({ en: "Run the lab to see the outcome, reasons, and next actions.", ar: "شغّل المختبر لترى النتيجة، الأسباب، والخطوات التالية.", arEG: "شغّل المختبر عشان تشوف النتيجة والأسباب والخطوات الجاية." })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
