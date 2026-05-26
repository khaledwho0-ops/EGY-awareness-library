"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { DeepRealGameModeId } from "@/data/research/deepreal-game";

type LocalizedText = { en: string; ar: string };

type GamePayload = {
  mode: {
    id: DeepRealGameModeId;
    title: LocalizedText;
    subtitle: LocalizedText;
    roleLabel: LocalizedText;
    scoreLabel: LocalizedText;
    warning: LocalizedText;
    completionTitle: LocalizedText;
    completionSummary: LocalizedText;
    sources: Array<{ label: LocalizedText; url: string }>;
  };
  progress: {
    modeId: DeepRealGameModeId;
    currentRoundIndex: number;
    score: number;
    completedRounds: number;
    perfectRounds: number;
    history: Array<{
      roundId: string;
      choiceId: string;
      correct: boolean;
      scoreDelta: number;
      answeredAt: string;
    }>;
    isComplete: boolean;
    updatedAt: string;
  };
  currentRound: {
    id: string;
    title: LocalizedText;
    scene: LocalizedText;
    prompt: LocalizedText;
    objective: LocalizedText;
    choices: Array<{
      id: string;
      label: LocalizedText;
      tags: string[];
    }>;
  } | null;
  totalRounds: number;
  remainingRounds: number;
  completionRate: number;
  lastResolution: {
    roundId: string;
    choiceId: string;
    correct: boolean;
    scoreDelta: number;
    effectLabel: LocalizedText;
    feedback: LocalizedText;
    lesson: LocalizedText;
  } | null;
};

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

const MODE_META: Record<DeepRealGameModeId, { en: string; ar: string }> = {
  classic: { en: "Classic", ar: "كلاسيك" },
  egy: { en: "EGY", ar: "مصري" },
  pov: { en: "POV", ar: "المنظور الجيد" },
  "immunity-rumors": { en: "Rumors", ar: "شائعات" },
  "immunity-scams": { en: "Scams", ar: "احتيال" },
  "immunity-tiktok": { en: "TikTok", ar: "تيك توك" },
};

export function DeepRealGameArena() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [mode, setMode] = useState<DeepRealGameModeId>("classic");
  const [payload, setPayload] = useState<GamePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/science/game?mode=${mode}`);
        const data = (await response.json()) as GamePayload | { error: string };
        if (!response.ok || "error" in data) {
          throw new Error("error" in data ? data.error : "Failed to load game.");
        }

        if (!cancelled) {
          setPayload(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load game.");
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
  }, [mode]);

  async function answer(choiceId: string) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/science/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "answer", mode, choiceId }),
      });
      const data = (await response.json()) as GamePayload | { error: string };
      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Failed to submit answer.");
      }
      setPayload(data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit answer.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/science/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset", mode }),
      });
      const data = (await response.json()) as GamePayload | { error: string };
      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Failed to reset game.");
      }
      setPayload(data);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Failed to reset game.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", direction: a ? "rtl" : "ltr" }}>
        <div
          className="glass-card"
          style={{
            padding: "var(--space-xl)",
            border: "1px solid color-mix(in srgb, var(--accent-deepreal) 35%, transparent)",
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-deepreal) 18%, transparent), transparent 45%), var(--bg-primary)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <ShieldCheck size={18} style={{ color: "var(--accent-deepreal)" }} />
                <span className="badge" style={{ background: "rgba(59,130,246,0.18)", color: "var(--accent-deepreal)" }}>
                  {t({ en: "Operational inoculation game", ar: "لعبة تمنيع تشغيلية", arEG: "لعبة تمنيع عملية" })}
                </span>
              </div>
              <h1 style={{ marginTop: 0, marginBottom: 8 }}>
                {t({ en: "DeepReal Arena", ar: "ساحة DeepReal", arEG: "ساحة DeepReal" })}
              </h1>
              <p style={{ marginTop: 0, color: "var(--text-secondary)", maxWidth: 760 }}>
                {t({ en: "Learn spread patterns inside a controlled simulation: classic, Egypt-context, and good-signal POV. Each round teaches the tactic, then routes it back into a real defense.", ar: "تعلّم أنماط الانتشار داخل محاكاة منضبطة: الوضع الكلاسيكي، السياق المصري، والمنظور الجيد. كل جولة تشرح التكتيك ثم تردّه إلى دفاع واقعي.", arEG: "اتعلّم إزاي المعلومات بتنتشر جوه محاكاة منضبطة: كلاسيك، سياق مصري، ومنظور إيجابي. كل جولة بتشرح التكتيك وبترجّعه لدفاع حقيقي." })}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["classic", "egy", "pov"] as DeepRealGameModeId[]).map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  className={mode === candidate ? "btn-primary" : "btn-secondary"}
                  onClick={() => setMode(candidate)}
                  disabled={busy}
                >
                  {a ? MODE_META[candidate].ar : MODE_META[candidate].en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="glass-card" style={{ padding: "var(--space-xl)", display: "flex", gap: 8, alignItems: "center" }}>
            <Loader2 size={16} className="animate-spin" />
            {t({ en: "Loading arena...", ar: "جارٍ تحميل الساحة...", arEG: "بيتحمّل الساحة..." })}
          </div>
        ) : error || !payload ? (
          <div className="glass-card" style={{ padding: "var(--space-xl)", background: "rgba(239,68,68,0.08)", textAlign: "center" }}>
            <AlertTriangle size={28} style={{ color: "var(--color-danger)", marginBottom: 12 }} />
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              {t({ en: "Failed to load current round", ar: "تعذر تحميل الجولة الحالية", arEG: "مقدرش يحمّل الجولة الحالية" })}
            </div>
            <div style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
              {error || t({ en: "We will try to load the first available round.", ar: "سنحاول فتح أول جولة متاحة.", arEG: "هنحاول نفتح أول جولة متاحة." })}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" className="btn-primary" onClick={() => setMode(mode)} disabled={busy}>
                <RotateCcw size={14} />
                {t({ en: "Retry", ar: "إعادة المحاولة", arEG: "جرّب تاني" })}
              </button>
              <button type="button" className="btn-secondary" onClick={() => { setMode("classic"); }} disabled={busy}>
                {t({ en: "Back to Arena", ar: "العودة للساحة", arEG: "ارجع للساحة" })}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))" }}>
            <div className="grid gap-4">
              <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                      {copy(payload.mode.roleLabel, a)}
                    </div>
                    <h2 style={{ marginTop: 0, marginBottom: 6 }}>{copy(payload.mode.title, a)}</h2>
                    <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(payload.mode.subtitle, a)}</p>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-md)", minWidth: 180, background: "var(--bg-secondary)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                      {copy(payload.mode.scoreLabel, a)}
                    </div>
                    <strong style={{ fontSize: 22 }}>{payload.progress.score}</strong>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {payload.progress.completedRounds}/{payload.totalRounds} • {payload.completionRate}%
                    </div>
                  </div>
                </div>
                <div
                  className="glass-card"
                  style={{
                    padding: "var(--space-md)",
                    background: "rgba(15,23,42,0.28)",
                    borderInlineStart: "3px solid var(--accent-amber)",
                    marginBottom: 14,
                  }}
                >
                  <strong style={{ display: "block", marginBottom: 6 }}>{t({ en: "Method warning", ar: "تنبيه المنهج", arEG: "تنبيه المنهج" })}</strong>
                  <span style={{ color: "var(--text-secondary)" }}>{copy(payload.mode.warning, a)}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {payload.mode.sources.map((item) => (
                    <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="badge" style={{ textDecoration: "none" }}>
                      {copy(item.label, a)}
                    </a>
                  ))}
                </div>
              </article>

              {payload.lastResolution ? (
                <article
                  className="glass-card"
                  style={{
                    padding: "var(--space-xl)",
                    border: `1px solid ${payload.lastResolution.correct ? "rgba(16,185,129,0.35)" : "rgba(245,158,11,0.35)"}`,
                    background: payload.lastResolution.correct ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <CheckCircle2 size={16} style={{ color: payload.lastResolution.correct ? "var(--accent-emerald)" : "var(--accent-amber)" }} />
                    <strong>{t({ en: "Last round result", ar: "نتيجة الجولة السابقة", arEG: "نتيجة الجولة اللي فاتت" })}</strong>
                  </div>
                  <div className="badge" style={{ marginBottom: 12 }}>
                    {copy(payload.lastResolution.effectLabel, a)} • {payload.lastResolution.scoreDelta > 0 ? `+${payload.lastResolution.scoreDelta}` : payload.lastResolution.scoreDelta}
                  </div>
                  <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{copy(payload.lastResolution.feedback, a)}</p>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <strong>{t({ en: "What do you actually learn?", ar: "ما الذي تتعلمه فعلياً؟", arEG: "إيه اللي بتتعلمه فعلاً؟" })}</strong>
                    <p style={{ marginBottom: 0 }}>{copy(payload.lastResolution.lesson, a)}</p>
                  </div>
                </article>
              ) : null}

              {payload.currentRound ? (
                <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                        {t({ en: "Current round", ar: "الجولة الحالية", arEG: "الجولة الحالية" })} {payload.progress.completedRounds + 1}/{payload.totalRounds}
                      </div>
                      <h3 style={{ marginTop: 0, marginBottom: 6 }}>{copy(payload.currentRound.title, a)}</h3>
                    </div>
                    <div className="badge">{copy(payload.currentRound.objective, a)}</div>
                  </div>

                  <div className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)", marginBottom: 14 }}>
                    <strong>{t({ en: "Scene", ar: "المشهد", arEG: "المشهد" })}</strong>
                    <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>{copy(payload.currentRound.scene, a)}</p>
                  </div>

                  <p style={{ fontWeight: 700, fontSize: 16, marginTop: 0 }}>{copy(payload.currentRound.prompt, a)}</p>

                  <div className="grid gap-3">
                    {payload.currentRound.choices.map((choice) => (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => answer(choice.id)}
                        disabled={busy}
                        className="glass-card"
                        style={{
                          padding: "var(--space-lg)",
                          textAlign: a ? "right" : "left",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-primary)",
                          cursor: "pointer",
                        }}
                      >
                        <strong style={{ display: "block", marginBottom: 8 }}>{copy(choice.label, a)}</strong>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {choice.tags.map((tag) => (
                            <span key={tag} className="badge">{tag}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </article>
              ) : (
                <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                  <h3 style={{ marginTop: 0 }}>{copy(payload.mode.completionTitle, a)}</h3>
                  <p style={{ color: "var(--text-secondary)" }}>{copy(payload.mode.completionSummary, a)}</p>
                  <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 16 }}>
                    <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Completed rounds", ar: "الجولات المكتملة", arEG: "الجولات اللي خلصت" })}</div>
                      <strong>{payload.progress.completedRounds}</strong>
                    </div>
                    <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Perfect rounds", ar: "الجولات الصحيحة", arEG: "الجولات الصح" })}</div>
                      <strong>{payload.progress.perfectRounds}</strong>
                    </div>
                    <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Score", ar: "النتيجة", arEG: "النتيجة" })}</div>
                      <strong>{payload.progress.score}</strong>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button type="button" className="btn-primary" onClick={reset} disabled={busy}>
                      <RotateCcw size={14} />
                      {t({ en: "Restart mode", ar: "ابدأ من جديد", arEG: "ابدأ من الأول" })}
                    </button>
                    <Link href="/deepreal" className="btn-secondary" style={{ textDecoration: "none" }}>
                      {t({ en: "Back to DeepReal", ar: "العودة إلى DeepReal", arEG: "ارجع لـ DeepReal" })}
                    </Link>
                    <Link href="/evidence" className="btn-secondary" style={{ textDecoration: "none" }}>
                      {t({ en: "Evidence board", ar: "لوحة الأدلة", arEG: "لوحة الأدلة" })}
                    </Link>
                  </div>
                </article>
              )}
            </div>

            <aside className="grid gap-4">
              <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                <strong style={{ display: "block", marginBottom: 10 }}>{t({ en: "Progress board", ar: "لوحة التقدم", arEG: "لوحة التقدم" })}</strong>
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Completed", ar: "المكتمل", arEG: "اللي خلص" })}</div>
                    <strong>{payload.progress.completedRounds}</strong>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Remaining", ar: "المتبقي", arEG: "الباقي" })}</div>
                    <strong>{payload.remainingRounds}</strong>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{t({ en: "Perfect", ar: "الصحيح", arEG: "الصح" })}</div>
                    <strong>{payload.progress.perfectRounds}</strong>
                  </div>
                </div>
                <button type="button" className="btn-secondary" onClick={reset} disabled={busy} style={{ marginTop: 14 }}>
                  <RotateCcw size={14} />
                  {t({ en: "Reset this mode", ar: "إعادة هذا الوضع", arEG: "ابدأ الوضع ده من الأول" })}
                </button>
              </article>

              <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                <strong style={{ display: "block", marginBottom: 10 }}>{t({ en: "How does this connect back to the real site?", ar: "كيف تربطها بالموقع الحقيقي؟", arEG: "إزاي تربط ده بالواقع؟" })}</strong>
                <div className="grid gap-3">
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <strong>{t({ en: "After classic", ar: "بعد classic", arEG: "بعد classic" })}</strong>
                    <p style={{ marginBottom: 0, color: "var(--text-secondary)" }}>
                      {t({ en: "Go back to the lab and run claim triage on a real claim.", ar: "ارجع إلى المختبر وشغّل claim triage على ادعاء حقيقي.", arEG: "ارجع للمختبر وشغّل claim triage على ادعاء حقيقي." })}
                    </p>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <strong>{t({ en: "After EGY", ar: "بعد EGY", arEG: "بعد EGY" })}</strong>
                    <p style={{ marginBottom: 0, color: "var(--text-secondary)" }}>
                      {t({ en: "Use Egyptian official routes and the evidence board before any share action.", ar: "استخدم المسارات الرسمية المصرية ولوحة الأدلة قبل أي مشاركة.", arEG: "استخدم المسارات الرسمية المصرية ولوحة الأدلة قبل ما تشير أي حاجة." })}
                    </p>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <strong>{t({ en: "After POV", ar: "بعد POV", arEG: "بعد POV" })}</strong>
                    <p style={{ marginBottom: 0, color: "var(--text-secondary)" }}>
                      {t({ en: "Turn good responses into habit: clarity, uncertainty, source, and safe handoff.", ar: "حوّل الردود الجيدة إلى عادة: وضوح، عدم يقين، مصدر، وإحالة آمنة.", arEG: "حوّل الردود الكويسة لعادة: وضوح، عدم يقين، مصدر، وإحالة آمنة." })}
                    </p>
                  </div>
                </div>
              </article>

              {payload.progress.history.length > 0 ? (
                <article className="glass-card" style={{ padding: "var(--space-xl)" }}>
                  <strong style={{ display: "block", marginBottom: 10 }}>{t({ en: "Recent decisions", ar: "آخر القرارات", arEG: "آخر القرارات" })}</strong>
                  <div className="grid gap-2">
                    {payload.progress.history.slice(-4).reverse().map((entry) => (
                      <div key={`${entry.roundId}-${entry.answeredAt}`} className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                          <strong>{entry.roundId}</strong>
                          <span className="badge" style={{ background: entry.correct ? "rgba(16,185,129,0.18)" : "rgba(245,158,11,0.18)" }}>
                            {entry.correct ? (t({ en: "Correct", ar: "صحيح", arEG: "صحيح" })) : (t({ en: "Weaker move", ar: "بديل أضعف", arEG: "بديل أضعف" }))}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
                          {t({ en: "Score", ar: "النقاط", arEG: "النقط" })} {entry.scoreDelta > 0 ? `+${entry.scoreDelta}` : entry.scoreDelta}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
