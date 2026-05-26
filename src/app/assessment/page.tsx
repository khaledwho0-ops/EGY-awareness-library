"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Microscope,
  ShieldAlert,
} from "lucide-react";
import { AssessmentEngine } from "@/components/assessment/assessment-engine";
import { createMIST20Config } from "@/data/instruments/mist-20";
import { createSUSConfig } from "@/data/instruments/sus";
import { createMHLSConfig } from "@/data/instruments/mhls";
import { createBriefRCOPEConfig } from "@/data/instruments/brief-rcope";
import { createGHSQConfig } from "@/data/instruments/ghsq";
import { createMCSDSConfig } from "@/data/instruments/mc-sds";
import { INSTRUMENT_READINESS } from "@/data/research/instrument-readiness";
import { getAssessmentScienceContext } from "@/data/research/scientific-intelligence";
import type { AssessmentConfig } from "@/components/assessment/assessment-engine";
import { recordAssessmentCompletion } from "@/lib/progress/progress-service";
import { getResearchGovernance } from "@/lib/research/research-governance";
import { useRTL } from "@/components/shared/rtl-provider";
import { ASSESS, ASSESS_X, s } from "@/data/i18n/site-strings";

interface AssessmentResults {
  answers: Record<string, number>;
  scores: Record<string, number>;
  duration: number;
}

export default function AssessmentPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [completedAssessment, setCompletedAssessment] = useState<{
    config: AssessmentConfig;
    results: AssessmentResults;
  } | null>(null);
  const [participantLanguage] = useState<"english" | "arabic">(
    () => getResearchGovernance().participantLanguage
  );
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const instruments = [
    {
      id: "mist20",
      name: "MIST-20",
      fullName: "Misinformation Susceptibility Test",
      icon: <ShieldCheck size={20} />,
      accent: "var(--accent-deepreal)",
      mvp: "DeepReal",
      items: 20,
      time: "5-8 min",
      alpha: "α = .77",
      phases: ["pre", "post"],
      description:
        "Rate 20 headlines as REAL or FAKE. Measures veracity discernment, naivete, and distrust.",
      citation: "Maertens et al. (2024)",
    },
    {
      id: "mhls",
      name: "MHLS",
      fullName: "Mental Health Literacy Scale",
      icon: <HeartPulse size={20} />,
      accent: "var(--accent-mentalhealth)",
      mvp: "Mental Health",
      items: 35,
      time: "10-15 min",
      alpha: "α = .873",
      phases: ["pre", "post"],
      description:
        "35-item scale measuring recognition, knowledge, and attitudes toward mental health.",
      citation: "O'Connor & Casey (2015)",
    },
    {
      id: "brief-rcope",
      name: "Brief RCOPE",
      fullName: "Brief Religious Coping Scale",
      icon: <Sparkles size={20} />,
      accent: "var(--accent-religionhub)",
      mvp: "Religion Hub",
      items: 14,
      time: "3-5 min",
      alpha: "α = .90/.81",
      phases: ["pre", "post"],
      description:
        "14 items measuring positive (7) and negative (7) religious coping patterns.",
      citation: "Pargament et al. (2011)",
    },
    {
      id: "ghsq",
      name: "GHSQ",
      fullName: "General Help-Seeking Questionnaire",
      icon: <HeartPulse size={20} />,
      accent: "var(--accent-mentalhealth)",
      mvp: "Mental Health",
      items: 17,
      time: "5-7 min",
      alpha: "r = .86",
      phases: ["pre", "post"],
      description:
        "Measures likelihood of seeking help from various sources for personal/emotional problems and suicidal ideation.",
      citation: "Wilson et al. (2005)",
    },
    {
      id: "sus",
      name: "SUS",
      fullName: "System Usability Scale",
      icon: <BarChart3 size={20} />,
      accent: "var(--accent-cta)",
      mvp: "All MVPs",
      items: 10,
      time: "2-3 min",
      alpha: "α = .91",
      phases: ["post"],
      description:
        "10-item usability scale. Benchmark: >=68 above average, >=75 good, >=80 excellent.",
      citation: "Brooke (1996)",
    },
    {
      id: "mc-sds",
      name: "MC-SDS",
      fullName: "Marlowe-Crowne Social Desirability",
      icon: <AlertTriangle size={20} />,
      accent: "var(--text-muted)",
      mvp: "Covariate",
      items: 13,
      time: "3-4 min",
      alpha: "α = .75",
      phases: ["pre"],
      description:
        "13-item scale detecting social desirability bias. Used as a covariate in analysis.",
      citation: "Crowne & Marlowe (1960)",
    },
  ];

  function getAssessmentConfig(id: string): AssessmentConfig | null {
    switch (id) {
      case "mist20-pre":
        return createMIST20Config("pre");
      case "mist20-post":
        return createMIST20Config("post");
      case "mhls-pre":
        return createMHLSConfig("pre");
      case "mhls-post":
        return createMHLSConfig("post");
      case "brief-rcope-pre":
        return createBriefRCOPEConfig("pre");
      case "brief-rcope-post":
        return createBriefRCOPEConfig("post");
      case "ghsq-pre":
        return createGHSQConfig("pre");
      case "ghsq-post":
        return createGHSQConfig("post");
      case "sus-post":
        return createSUSConfig();
      case "mc-sds-pre":
        return createMCSDSConfig();
      default:
        return null;
    }
  }

  if (completedAssessment) {
    const scienceContext = getAssessmentScienceContext(
      completedAssessment.config.id.replace(/-pre$|-post$/, "")
    );

    return (
      <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-xl))" }}>
        <div className="container" style={{ paddingBottom: "var(--space-3xl)" }}>
          <button
            type="button"
            onClick={() => setCompletedAssessment(null)}
            className="flex items-center gap-1 mb-4"
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={14} /> {s(ASSESS.backTo, a)}
          </button>

          <div
            className="glass-card"
            style={{
              padding: "var(--space-2xl)",
              marginBottom: "var(--space-xl)",
              background:
                "linear-gradient(135deg, rgba(0,102,255,0.08), rgba(16,185,129,0.08))",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={22} style={{ color: "var(--color-success)" }} />
                  <span className="badge">
                    {completedAssessment.config.phase === "pre"
                      ? a
                        ? "نتيجة قبلية"
                        : "Pre-test result"
                      : a
                        ? "نتيجة بعدية"
                        : "Post-test result"}
                  </span>
                </div>
                <h1 style={{ fontSize: "var(--font-h2)", marginBottom: 8 }}>
                  {completedAssessment.config.name}
                </h1>
                <p style={{ color: "var(--text-muted)", maxWidth: 720, margin: 0, fontFamily: ff }}>
                  {completedAssessment.config.description}
                </p>
              </div>

              <div
                className="glass-card"
                style={{ padding: "var(--space-lg)", minWidth: 220, alignSelf: "flex-start" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginBottom: 8,
                  }}
                >
                  <Clock size={14} />
                  {t({ en: "Completion time", ar: "مدة الإنجاز", arEG: "مدة الإنجاز" })}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
                  {Math.max(1, Math.round(completedAssessment.results.duration / 60))} {t({ en: "min", ar: "د", arEG: "د" })}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginTop: 4 }}>
                  {Object.keys(completedAssessment.results.answers).length}{" "}
                  {t({ en: "answers recorded", ar: "إجابة مسجلة", arEG: "إجابة مسجلة" })}
                </div>
              </div>
            </div>

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                marginBottom: 24,
              }}
            >
              {Object.entries(completedAssessment.results.scores).map(([key, value]) => (
                <div
                  key={key}
                  className="glass-card"
                  style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-caption)",
                      marginBottom: 8,
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </div>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 700,
                      fontFamily: "'Clash Display', sans-serif",
                      color: "var(--accent-cta)",
                    }}
                  >
                    {typeof value === "number" ? value.toFixed(value % 1 === 0 ? 0 : 2) : value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => {
                  setCompletedAssessment(null);
                  setActiveAssessment(completedAssessment.config.id);
                }}
                className="btn-primary"
                style={{ flex: "1 1 auto", minWidth: 140 }}
              >
                {t({ en: "Retake assessment", ar: "إعادة الاختبار", arEG: "إعادة الاختبار" })}
              </button>
              <button
                type="button"
                onClick={() => setCompletedAssessment(null)}
                className="btn-secondary"
                style={{ flex: "1 1 auto", minWidth: 140 }}
              >
                {t({ en: "Back to assessment hub", ar: "العودة إلى مركز التقييم", arEG: "العودة إلى مركز التقييم" })}
              </button>
              <Link href="/science" className="btn-secondary no-underline" style={{ flex: "1 1 auto", minWidth: 140, textAlign: "center" }}>
                {t({ en: "Open science hub", ar: "فتح مركز العلم", arEG: "فتح مركز العلم" })}
              </Link>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Microscope size={18} style={{ color: "var(--accent-cta)" }} />
              <h2 style={{ margin: 0 }}>
                {t({ en: "Science context tied to this assessment", ar: "السياق العلمي المرتبط بالاختبار", arEG: "السياق العلمي المرتبط بالاختبار" })}
              </h2>
            </div>
            <p style={{ color: "var(--text-muted)", marginTop: 0, marginBottom: 20, fontFamily: ff }}>
              {t({ en: "These results now connect to traceable evidence instead of disappearing as isolated numbers.", ar: "هذه النتائج مرتبطة بأدلة حقيقية ومصادر يمكن تتبعها، وليست مجرد أرقام معزولة.", arEG: "هذه النتائج مرتبطة بأدلة حقيقية ومصادر يمكن تتبعها، وليست مجرد أرقام معزولة." })}
            </p>

            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
            >
              {scienceContext.map((signal) => (
                <a
                  key={signal.id}
                  href={signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card no-underline"
                  style={{ padding: "var(--space-lg)", color: "inherit" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                    <span className="badge">{signal.region}</span>
                    <span style={{ color: "var(--accent-cta)", fontWeight: 700 }}>{signal.value}</span>
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{signal.title}</h3>
                  <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{signal.summary}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>
                    {signal.whyItMatters}
                  </p>
                  <div style={{ fontSize: 13, color: "var(--accent-cta)", fontWeight: 700 }}>
                    {signal.source} <ArrowRight size={12} style={{ display: "inline" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeAssessment) {
    const config = getAssessmentConfig(activeAssessment);

    if (config) {
      return (
        <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-xl))" }}>
          <div className="container" style={{ paddingBottom: "var(--space-3xl)" }}>
            <button
              type="button"
              onClick={() => setActiveAssessment(null)}
              className="flex items-center gap-1 mb-4"
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={14} /> {s(ASSESS.backTo, a)}
            </button>

            {activeAssessment.startsWith("ghsq") && (
              <div
                style={{
                  padding: "10px 16px",
                  background: "rgba(239,68,68,0.08)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  fontSize: "13px",
                  marginBottom: "var(--space-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <AlertTriangle size={16} style={{ color: "var(--color-danger)", flexShrink: 0 }} />
                <span>
                  This questionnaire includes questions about suicidal thoughts. If you are currently
                  in crisis, please call <strong>16328</strong> immediately.
                </span>
              </div>
            )}

            <AssessmentEngine
              config={config}
              onComplete={(results) => {
                const instrumentId = config.id.replace(/-pre$|-post$/, "");
                // Client-side persistence (localStorage)
                recordAssessmentCompletion(
                  instrumentId,
                  config.phase,
                  results.scores,
                  results.duration
                );
                // Server-side persistence (N=84 pilot data)
                fetch("/api/assessment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    pid: localStorage.getItem("eal-participant-id") || "anonymous",
                    instrumentId,
                    phase: config.phase,
                    scores: results.scores,
                    duration: results.duration,
                    language: participantLanguage,
                  }),
                }).catch(() => {/* fire-and-forget — localStorage is the primary store */});
                setCompletedAssessment({ config, results });
                setActiveAssessment(null);
              }}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <section
          style={{
            marginBottom: "var(--space-xl)",
            border: "1px solid var(--border-primary)",
            borderRadius: 24,
            padding: 24,
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-cta) 14%, transparent) 0%, transparent 32%), linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 95%, white 5%) 0%, color-mix(in srgb, var(--bg-card) 98%, transparent) 100%)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <ShieldAlert size={20} style={{ color: "var(--accent-cta)" }} />
            <strong>Self-Test Protocol</strong>
          </div>
          <p style={{ margin: "0 0 14px", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            CHUNK 8 now lives as its own route: the baseline battery, readiness matrix, launch blockers,
            hypotheses, and success criteria behind this assessment system.
          </p>
          <Link
            href="/self-test-protocol"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              background: "var(--accent-cta)",
              color: "var(--text-inverse)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open the protocol
          </Link>
        </section>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck size={28} style={{ color: "var(--accent-cta)" }} />
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">{s(ASSESS.title, a)}</span>
            </h1>
          </div>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, fontFamily: ff }}>
            {s(ASSESS.desc, a)}
          </p>

          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(0,102,255,0.06)",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(0,102,255,0.15)",
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            <strong>{s(ASSESS_X.schedule, a)}</strong>
            <br />
            <strong>{s(ASSESS_X.day0, a)}</strong> {s(ASSESS_X.day0Scales, a)}
            <br />
            <strong>{s(ASSESS_X.day15, a)}</strong> {s(ASSESS_X.day15Scales, a)}
          </div>

          <div
            className={
              participantLanguage === "arabic" ? "disclaimer-bar disclaimer-bar-warning" : "disclaimer-bar"
            }
            style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 10 }}
          >
            {participantLanguage === "arabic" ? (
              <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 2 }} />
            ) : (
              <ShieldCheck size={14} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: 2 }} />
            )}
            <span style={{ fontSize: "12px" }}>
              <strong>{s(ASSESS_X.activeLang, a)}</strong>{" "}
              {participantLanguage === "english" ? s(ASSESS_X.enPath, a) : s(ASSESS_X.arPath, a)}.{" "}
              {participantLanguage === "english" ? s(ASSESS_X.enNote, a) : s(ASSESS_X.arNote, a)}
            </span>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {instruments.map((inst) => {
            const readiness = INSTRUMENT_READINESS[inst.id];
            const languageStatus = readiness
              ? participantLanguage === "english"
                ? readiness.english
                : readiness.arabic
              : "ready";
            const isBlocked = languageStatus === "blocked";
            const readinessColor =
              languageStatus === "ready"
                ? "var(--color-success)"
                : languageStatus === "conditional"
                  ? "var(--color-warning)"
                  : "var(--color-danger)";

            return (
              <div
                key={inst.id}
                className="glass-card"
                style={{
                  padding: "var(--space-lg)",
                  borderLeft: `3px solid ${isBlocked ? "var(--color-danger)" : inst.accent}`,
                  opacity: isBlocked ? 0.85 : 1,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: `${inst.accent}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: inst.accent,
                    }}
                  >
                    {inst.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", marginBottom: 2 }}>{inst.name}</h3>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{inst.fullName}</span>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>
                  {inst.description}
                </p>

                <p style={{ fontSize: "11px", color: "var(--text-caption)", fontStyle: "italic", marginBottom: 12 }}>
                  {inst.citation}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="badge"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    {inst.items} {s(ASSESS_X.items, a)}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    {inst.time}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    {inst.alpha}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: `${inst.accent}15`,
                      color: inst.accent,
                      border: `1px solid ${inst.accent}30`,
                    }}
                  >
                    {inst.mvp}
                  </span>
                  {readiness && (
                    <span
                      className="badge"
                      style={{
                        background: `${readinessColor}15`,
                        color: readinessColor,
                        border: `1px solid ${readinessColor}30`,
                      }}
                    >
                      {participantLanguage === "english" ? `EN ${languageStatus}` : `AR ${languageStatus}`}
                    </span>
                  )}
                </div>

                {readiness && (
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-primary)",
                      marginBottom: 12,
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong style={{ color: "var(--text-primary)" }}>{s(ASSESS_X.launchRule, a)}</strong>{" "}
                    {readiness.deploymentRule}
                  </div>
                )}

                <div className="flex gap-2" style={{ marginTop: 4 }}>
                  {inst.phases.includes("pre") && (
                    <button
                      type="button"
                      onClick={() => setActiveAssessment(`${inst.id}-pre`)}
                      className="flex-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        border: isBlocked ? "1px solid var(--border-primary)" : `2px solid ${inst.accent}`,
                        background: isBlocked ? "var(--bg-secondary)" : `linear-gradient(135deg, ${inst.accent}18, ${inst.accent}08)`,
                        color: isBlocked ? "var(--text-muted)" : inst.accent,
                        cursor: isBlocked ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.2s ease",
                        opacity: isBlocked ? 0.5 : 1,
                      }}
                      disabled={isBlocked}
                      onMouseEnter={(e) => { if (!isBlocked) (e.currentTarget.style.background = `${inst.accent}30`); }}
                      onMouseLeave={(e) => { if (!isBlocked) (e.currentTarget.style.background = `linear-gradient(135deg, ${inst.accent}18, ${inst.accent}08)`); }}
                    >
                      {isBlocked ? s(ASSESS.blocked, a) : <><span>▶</span> {s(ASSESS.preTest, a)}</>} <ArrowRight size={14} />
                    </button>
                  )}
                  {inst.phases.includes("post") && (
                    <button
                      type="button"
                      onClick={() => setActiveAssessment(`${inst.id}-post`)}
                      className="flex-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        border: isBlocked ? "1px solid var(--border-primary)" : "1px solid var(--border-primary)",
                        background: isBlocked ? "var(--bg-secondary)" : "var(--bg-secondary)",
                        color: isBlocked ? "var(--text-muted)" : "var(--text-primary)",
                        cursor: isBlocked ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.2s ease",
                        opacity: isBlocked ? 0.5 : 1,
                      }}
                      disabled={isBlocked}
                    >
                      {isBlocked ? s(ASSESS.blocked, a) : s(ASSESS.postTest, a)} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
