"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  Loader2,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import type { Exercise, NormalizedAPIResponse } from "@/types";
import { useRTL } from "@/components/shared/rtl-provider";
import { ImplementIRLButton } from "@/components/shared/implement-irl-button";

interface ClaimPriorityResult {
  text: string;
  score: number;
  classification: "NFS" | "UFS" | "CFS";
}

interface QuranSearchResult {
  text: string;
  surahNumber: number;
  surahName: string;
  surahArabic: string;
  ayahNumber: number;
  reference: string;
}

interface QuranResponse {
  count?: number;
  results?: QuranSearchResult[];
  editions?: Array<{
    identifier?: string;
    language?: string;
    name?: string;
    text?: string;
    surah?: {
      number: number;
      englishName: string;
      arabicName: string;
    };
  }>;
}

interface HadithSearchResult {
  id: string;
  collection: string;
  reference?: string;
  grade?: string;
  narrator?: string;
  englishText: string;
  arabicText?: string;
  sourceUrl?: string;
  provider: "sunnah-configured" | "hadithapi";
}

interface VeracityResult {
  claim: string;
  verdict: "refuted" | "supported" | "mixed" | "uncertain";
  confidence: number;
  explanation: string;
  evidence: Array<{
    title: string;
    rationale: string;
    sourceType: string;
    url?: string;
  }>;
  provider: "veracity-backend" | "local-rag-fallback";
}

interface SemanticIslamicResult {
  source: "quran" | "hadith";
  title: string;
  reference?: string;
  excerpt: string;
  score: number;
  url?: string;
}

interface VerificationConsoleProps {
  accentColor: string;
  exercise: Exercise;
  onVerificationReward?: (activityKey: string) => void;
}

function extractPrimaryClaim(text: string): string {
  const quotedClaim = text.match(/['"“”]([^'"“”]{20,220})['"“”]/);
  if (quotedClaim?.[1]) {
    return quotedClaim[1].trim();
  }

  const firstSentence = text
    .split(/\n+/)
    .flatMap((block) => block.split(/[.!?]+/))
    .map((sentence) => sentence.trim())
    .find((sentence) => sentence.length > 35);

  return firstSentence ?? text.slice(0, 180).trim();
}

function extractQuranSeed(text: string): string {
  const verseReference = text.match(/\b(\d{1,3}:\d{1,3})\b/);
  if (verseReference?.[1]) {
    return verseReference[1];
  }

  const keywordMatch = text.match(/\b(mercy|patience|forgiveness|hope|support|faith|sabr|rahma)\b/i);
  return keywordMatch?.[1] ?? "patience";
}

function classificationLabel(classification: ClaimPriorityResult["classification"]): string {
  switch (classification) {
    case "CFS":
      return "High priority";
    case "UFS":
      return "Medium priority";
    default:
      return "Low priority";
  }
}

function veracityProviderLabel(provider: VeracityResult["provider"]): string {
  return provider === "veracity-backend" ? "Live backend" : "Local fallback";
}

export function VerificationConsole({
  accentColor,
  exercise,
  onVerificationReward,
}: VerificationConsoleProps) {
  const isReligionTrack = exercise.mvp === "religion-hub";
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const defaultClaim = useMemo(() => extractPrimaryClaim(exercise.content.scenario), [exercise.content.scenario]);
  const defaultQuranQuery = useMemo(() => extractQuranSeed(exercise.content.scenario), [exercise.content.scenario]);

  const [claimQuery, setClaimQuery] = useState(defaultClaim);
  const [quranQuery, setQuranQuery] = useState(defaultQuranQuery);
  const [hadithQuery, setHadithQuery] = useState(defaultQuranQuery);
  const [semanticQuery, setSemanticQuery] = useState(defaultQuranQuery);
  const [claimPriority, setClaimPriority] = useState<ClaimPriorityResult[] | null>(null);
  const [factChecks, setFactChecks] = useState<NormalizedAPIResponse[] | null>(null);
  const [quranResults, setQuranResults] = useState<QuranResponse | null>(null);
  const [hadithResults, setHadithResults] = useState<HadithSearchResult[] | null>(null);
  const [veracityResult, setVeracityResult] = useState<VeracityResult | null>(null);
  const [semanticResults, setSemanticResults] = useState<SemanticIslamicResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<"priority" | "factcheck" | "veracity" | "quran" | "hadith" | "semantic" | null>(null);

  const handlePriorityCheck = async () => {
    if (!claimQuery.trim()) return;

    setLoadingState("priority");
    setError(null);

    try {
      const response = await fetch("/api/search/claimbuster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: claimQuery }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Claim-worthiness analysis failed.");
      }

      setClaimPriority(payload.results ?? []);
      onVerificationReward?.("claimbuster");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Claim-worthiness analysis failed.");
    } finally {
      setLoadingState(null);
    }
  };

  const handleFactCheck = async () => {
    if (!claimQuery.trim()) return;

    setLoadingState("factcheck");
    setError(null);

    try {
      // Fire fact-check AND veracity in parallel — veracity always returns useful output
      const [factCheckResponse, veracityResponse] = await Promise.all([
        fetch(`/api/search/factcheck?q=${encodeURIComponent(claimQuery)}`),
        fetch("/api/search/veracity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            claim: claimQuery,
            context: `${exercise.content.scenario}\n\n${exercise.content.task.instructions}`,
          }),
        }),
      ]);

      const factCheckPayload = await factCheckResponse.json();
      const veracityPayload = await veracityResponse.json();

      if (!factCheckResponse.ok) {
        throw new Error(factCheckPayload?.error || "Live fact-check lookup failed.");
      }

      setFactChecks(factCheckPayload.results ?? []);
      if (veracityPayload.result) {
        setVeracityResult(veracityPayload.result);
      }
      onVerificationReward?.("factcheck");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Live fact-check lookup failed.");
    } finally {
      setLoadingState(null);
    }
  };

  const handleVeracityCheck = async () => {
    if (!claimQuery.trim()) return;

    setLoadingState("veracity");
    setError(null);

    try {
      const response = await fetch("/api/search/veracity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claim: claimQuery,
          context: `${exercise.content.scenario}\n\n${exercise.content.task.instructions}`,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Grounded veracity lookup failed.");
      }

      setVeracityResult(payload.result ?? null);
      onVerificationReward?.("veracity");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Grounded veracity lookup failed.");
    } finally {
      setLoadingState(null);
    }
  };

  const handleQuranCheck = async () => {
    if (!quranQuery.trim()) return;

    setLoadingState("quran");
    setError(null);

    try {
      const lookupType = /^\d{1,3}:\d{1,3}$/.test(quranQuery.trim()) ? "ayah" : "search";
      const response = await fetch(`/api/islamic/quran?type=${lookupType}&q=${encodeURIComponent(quranQuery.trim())}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Quran verification failed.");
      }

      setQuranResults(payload.results ?? null);
      onVerificationReward?.("quran");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Quran verification failed.");
    } finally {
      setLoadingState(null);
    }
  };

  const handleHadithCheck = async () => {
    if (!hadithQuery.trim()) return;

    setLoadingState("hadith");
    setError(null);

    try {
      const response = await fetch(`/api/islamic/hadith?q=${encodeURIComponent(hadithQuery.trim())}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Hadith verification failed.");
      }

      setHadithResults(payload.results ?? []);
      onVerificationReward?.("hadith");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Hadith verification failed.");
    } finally {
      setLoadingState(null);
    }
  };

  const handleSemanticCheck = async () => {
    if (!semanticQuery.trim()) return;

    setLoadingState("semantic");
    setError(null);

    try {
      const response = await fetch(`/api/islamic/semantic?q=${encodeURIComponent(semanticQuery.trim())}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Semantic Islamic search failed.");
      }

      setSemanticResults(payload.results ?? []);
      onVerificationReward?.("semantic-islamic");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Semantic Islamic search failed.");
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <section
      style={{
        marginBottom: 20,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-primary)",
        background: "var(--bg-secondary)",
        padding: "18px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${accentColor}12`,
            color: accentColor,
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={18} />
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: 4, fontSize: "15px", color: "var(--text-primary)" }}>
            {t({ en: "Live Verification Console", ar: "وحدة التحقق المباشر", arEG: "وحدة التحقق المباشر" })}
          </h4>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, direction: a ? "rtl" : "ltr", fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
            {t({ en: "This exercise now supports the plan\u0027s live verification loop: score the claim, run a live fact-check, and verify religious references when applicable.", ar: "يدعم هذا التمرين حلقة التحقق المباشر: تقييم الادعاء، وتشغيل التحقق المباشر، والتحقق من المراجع الدينية عند الاقتضاء.", arEG: "يدعم هذا التمرين حلقة التحقق المباشر: تقييم الادعاء، وتشغيل التحقق المباشر، والتحقق من المراجع الدينية عند الاقتضاء." })}
          </p>
        </div>
      </div>

      {/* ═══ IRL BUTTON FOR VERIFICATION ═══ */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <ImplementIRLButton
          irlKey={isReligionTrack ? "authority" : "keyhunter"}
          accent={accentColor}
          compact
        />
        <span style={{ fontSize: 11, color: "var(--text-caption)" }}>
          {t({ en: "Apply verification skills IRL", ar: "طبّق مهارات التحقق في الواقع", arEG: "طبّق مهارات التحقق في الواقع" })}
        </span>
      </div>

      <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
        <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Claim or assertion to verify", ar: "الادعاء أو التأكيد للتحقق", arEG: "الادعاء أو التأكيد للتحقق" })}</label>
        <textarea
          value={claimQuery}
          onChange={(event) => setClaimQuery(event.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-primary)",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handlePriorityCheck}
            disabled={loadingState !== null}
          >
            {loadingState === "priority" ? <Loader2 size={14} className="animate-spin" /> : <Scale size={14} />}
            {t({ en: "Score Priority", ar: "تسجيل الأولوية", arEG: "تسجيل الأولوية" })}
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleFactCheck}
            disabled={loadingState !== null}
          >
            {loadingState === "factcheck" ? <Loader2 size={14} className="animate-spin" /> : <SearchCheck size={14} />}
            {t({ en: "Run Live Fact-Check", ar: "تشغيل التحقق المباشر", arEG: "تشغيل التحقق المباشر" })}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleVeracityCheck}
            disabled={loadingState !== null}
          >
            {loadingState === "veracity" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
            {t({ en: "Run Veracity", ar: "تشغيل المصداقية", arEG: "تشغيل المصداقية" })}
          </button>
        </div>
      </div>

      {isReligionTrack && (
        <div
          style={{
            marginBottom: 14,
            paddingTop: 14,
            borderTop: "1px solid var(--border-primary)",
            display: "grid",
            gap: 10,
          }}
        >
          <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Quran search or verse reference", ar: "بحث في القرآن أو مرجع آية", arEG: "بحث في القرآن أو مرجع آية" })}</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={quranQuery}
              onChange={(event) => setQuranQuery(event.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={handleQuranCheck}
              disabled={loadingState !== null}
            >
              {loadingState === "quran" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              {t({ en: "Verify Quran", ar: "تحقق من القرآن", arEG: "تحقق من القرآن" })}
            </button>
          </div>
          <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Hadith keyword or phrase", ar: "كلمة أو عبارة حديث", arEG: "كلمة أو عبارة حديث" })}</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={hadithQuery}
              onChange={(event) => setHadithQuery(event.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={handleHadithCheck}
              disabled={loadingState !== null}
            >
              {loadingState === "hadith" ? <Loader2 size={14} className="animate-spin" /> : <SearchCheck size={14} />}
              {t({ en: "Verify Hadith", ar: "تحقق من الحديث", arEG: "تحقق من الحديث" })}
            </button>
          </div>
          <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Ask a semantic faith question", ar: "اطرح سؤالا\u064b إيمانيا\u064b دلاليا\u064b", arEG: "اطرح سؤالا\u064b إيمانيا\u064b دلاليا\u064b" })}</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={semanticQuery}
              onChange={(event) => setSemanticQuery(event.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={handleSemanticCheck}
              disabled={loadingState !== null}
            >
              {loadingState === "semantic" ? <Loader2 size={14} className="animate-spin" /> : <SearchCheck size={14} />}
              {t({ en: "Ask Semantically", ar: "اسأل دلاليا\u064b", arEG: "اسأل دلاليا\u064b" })}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            background: "rgba(239, 68, 68, 0.08)",
            color: "var(--text-primary)",
            marginBottom: 14,
          }}
        >
          <AlertTriangle size={16} style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: "13px", lineHeight: 1.5 }}>{error}</span>
        </div>
      )}

      {claimPriority && claimPriority.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Claim-worthiness signal", ar: "إشارة جدارة الادعاء", arEG: "إشارة جدارة الادعاء" })}
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {claimPriority.slice(0, 3).map((item) => (
              <div
                key={`${item.text}-${item.score}`}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-primary)",
                  background: "var(--bg-primary)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>{classificationLabel(item.classification)}</strong>
                  <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>Score {item.score}</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {factChecks !== null && (
        <div style={{ marginBottom: isReligionTrack ? 14 : 0 }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Live fact-check results", ar: "نتائج التحقق المباشر", arEG: "نتائج التحقق المباشر" })}
          </div>
          {factChecks.length === 0 ? (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border-primary)",
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
              {t({ en: "No ClaimReview results were returned for this wording. Try a shorter or more literal claim.", ar: "لم يتم إرجاع نتائج. جرب ادعاءً أقصر أو أكثر حرفية.", arEG: "لم يتم إرجاع نتائج. جرب ادعاءً أقصر أو أكثر حرفية." })}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {factChecks.slice(0, 3).map((result) => (
                <div
                  key={result.id}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-primary)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        {result.sourceName}
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {result.summary}
                      </p>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        color: accentColor,
                        textDecoration: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {t({ en: "Open", ar: "فتح", arEG: "فتح" })} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {veracityResult && (
        <div style={{ marginBottom: isReligionTrack ? 14 : 0 }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Grounded veracity result", ar: "نتيجة المصداقية الموثقة", arEG: "نتيجة المصداقية الموثقة" })}
          </div>
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
              background: "var(--bg-primary)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <strong style={{ fontSize: "13px", color: "var(--text-primary)", textTransform: "capitalize" }}>
                {veracityResult.verdict}
              </strong>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                  {veracityProviderLabel(veracityResult.provider)}
                </span>
                <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>
                  {t({ en: "Confidence", ar: "الثقة", arEG: "الثقة" })} {Math.round(veracityResult.confidence * 100)}%
                </span>
              </div>
            </div>
            <p style={{ margin: 0, marginBottom: 10, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {veracityResult.explanation}
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {veracityResult.evidence.slice(0, 3).map((item) => (
                <div key={`${item.title}-${item.sourceType}`} style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                    <strong style={{ color: "var(--text-primary)" }}>{item.title}</strong>
                    <span style={{ color: accentColor, fontSize: "12px", fontWeight: 700 }}>
                      {item.sourceType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div>{item.rationale}</div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 8,
                        color: accentColor,
                        textDecoration: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {t({ en: "Open evidence", ar: "فتح الدليل", arEG: "فتح الدليل" })} <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isReligionTrack && quranResults?.results && (
        <div>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Quran lookup", ar: "بحث في القرآن", arEG: "بحث في القرآن" })}
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {quranResults.results.slice(0, 3).map((result) => (
              <div
                key={result.reference}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-primary)",
                  background: "var(--bg-primary)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                    {result.surahName} ({result.reference})
                  </strong>
                  <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>
                    {result.surahArabic}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {result.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isReligionTrack && quranResults?.editions && (
        <div>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Quran verse lookup", ar: "بحث في آية قرآنية", arEG: "بحث في آية قرآنية" })}
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {quranResults.editions
              .filter((edition) => edition.text)
              .slice(0, 2)
              .map((edition) => (
                <div
                  key={`${edition.identifier}-${edition.surah?.number}`}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-primary)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                      {edition.surah?.englishName ?? edition.name}
                    </strong>
                    <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>
                      {edition.language}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {edition.text}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {isReligionTrack && hadithResults !== null && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Hadith lookup", ar: "بحث في الحديث", arEG: "بحث في الحديث" })}
          </div>
          {hadithResults.length === 0 ? (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border-primary)",
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
              {t({ en: "No hadith matches were returned for this query.", ar: "لم يتم إرجاع حديث لهذا الاستفسار.", arEG: "لم يتم إرجاع حديث لهذا الاستفسار." })}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {hadithResults.slice(0, 3).map((result) => (
                <div
                  key={result.id}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-primary)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                      {result.collection} {result.reference ? `• ${result.reference}` : ""}
                    </strong>
                    {result.grade ? (
                      <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>
                        {result.grade}
                      </span>
                    ) : null}
                  </div>
                  {result.narrator ? (
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 6 }}>
                      {t({ en: "Narrator:", ar: "الراوي:", arEG: "الراوي:" })} {result.narrator}
                    </div>
                  ) : null}
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {result.englishText}
                  </p>
                  {result.sourceUrl ? (
                    <a
                      href={result.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 8,
                        color: accentColor,
                        textDecoration: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {t({ en: "Open source", ar: "فتح المصدر", arEG: "فتح المصدر" })} <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isReligionTrack && semanticResults !== null && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 }}>
            {t({ en: "Semantic Islamic search", ar: "بحث دلالي إسلامي", arEG: "بحث دلالي إسلامي" })}
          </div>
          {semanticResults.length === 0 ? (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border-primary)",
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
              No semantic matches were returned for this question.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {semanticResults.slice(0, 4).map((result, index) => (
                <div
                  key={`${result.source}-${result.reference ?? result.title}-${index}`}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-primary)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                      {result.title} {result.reference ? `• ${result.reference}` : ""}
                    </strong>
                    <span style={{ fontSize: "12px", color: accentColor, fontWeight: 700 }}>
                      {result.source} • {Math.round(result.score * 100)}%
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {result.excerpt}
                  </p>
                  {result.url ? (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 8,
                        color: accentColor,
                        textDecoration: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      Open source <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
