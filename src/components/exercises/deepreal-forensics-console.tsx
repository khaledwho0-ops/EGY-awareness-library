"use client";

import { useState } from "react";
import { AlertTriangle, ExternalLink, Loader2, Microscope, SearchCheck, ShieldCheck } from "lucide-react";
import type { ForensicResultExtended } from "@/lib/ai/forensic-analysis";
import { analyzeMedia } from "@/lib/ai/forensic-analysis";
import { useRTL } from "@/components/shared/rtl-provider";
import { ImplementIRLButton } from "@/components/shared/implement-irl-button";

interface ReverseImageMatch {
  title: string;
  domain: string;
  url?: string;
  score: number;
  firstIndexed?: string;
  note: string;
}

interface DeeprealForensicsConsoleProps {
  accentColor: string;
}

function formatEvidenceValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Unavailable";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}

function getEvidencePreview(record?: Record<string, unknown> | null): Array<[string, string]> {
  if (!record) {
    return [];
  }

  return Object.entries(record)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .slice(0, 6)
    .map(([key, value]) => [key, formatEvidenceValue(value)]);
}

export function DeeprealForensicsConsole({ accentColor }: DeeprealForensicsConsoleProps) {
  const { isRTL: a, t } = useRTL();
  const [imageUrl, setImageUrl] = useState("");
  const [metadataUrl, setMetadataUrl] = useState("");
  const [loading, setLoading] = useState<"image" | "metadata" | "c2pa" | "reverse-image" | null>(null);
  const [imageResult, setImageResult] = useState<ForensicResultExtended | null>(null);
  const [metadataResult, setMetadataResult] = useState<ForensicResultExtended | null>(null);
  const [c2paResult, setC2paResult] = useState<ForensicResultExtended | null>(null);
  const [reverseImageResults, setReverseImageResults] = useState<ReverseImageMatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runImageAnalysis = async () => {
    if (!imageUrl.trim()) return;
    setLoading("image");
    setError(null);

    try {
      const result = await analyzeMedia({
        type: "deepfake_image",
        mediaUrl: imageUrl.trim(),
        options: { sensitivity: "medium", returnHeatmap: true },
      });
      setImageResult(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Image analysis failed.");
    } finally {
      setLoading(null);
    }
  };

  const runMetadataAnalysis = async () => {
    if (!metadataUrl.trim()) return;
    setLoading("metadata");
    setError(null);

    try {
      const result = await analyzeMedia({
        type: "metadata_extraction",
        mediaUrl: metadataUrl.trim(),
      });
      setMetadataResult(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Metadata analysis failed.");
    } finally {
      setLoading(null);
    }
  };

  const runC2paAnalysis = async () => {
    if (!metadataUrl.trim()) return;
    setLoading("c2pa");
    setError(null);

    try {
      const result = await analyzeMedia({
        type: "c2pa_verification",
        mediaUrl: metadataUrl.trim(),
      });
      setC2paResult(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "C2PA verification failed.");
    } finally {
      setLoading(null);
    }
  };

  const runReverseImageSearch = async () => {
    if (!metadataUrl.trim()) return;
    setLoading("reverse-image");
    setError(null);

    try {
      const response = await fetch("/api/search/reverse-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: metadataUrl.trim() }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Reverse-image search failed.");
      }

      setReverseImageResults(payload.results ?? []);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Reverse-image search failed.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section
      style={{
        marginBottom: 20,
        padding: "18px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-primary)",
        background: "var(--bg-secondary)",
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
          <Microscope size={18} />
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: 4, fontSize: "15px", color: "var(--text-primary)" }}>
            {t({ en: "Media Forensics Workbench", ar: "ورشة التحليل الجنائي للوسائط", arEG: "ورشة التحليل الجنائي للوسائط" })}
          </h4>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t({ en: "Image analysis, metadata extraction, and backend-ready deepfake forensics from inside DeepReal.", ar: "تحليل الصور واستخراج البيانات الوصفية والتحقق من التزييف العميق من داخل ديب ريل.", arEG: "تحليل الصور واستخراج البيانات الوصفية والتحقق من التزييف العميق من داخل ديب ريل." })}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Image URL for manipulation analysis", ar: "رابط الصورة لتحليل التلاعب", arEG: "رابط الصورة لتحليل التلاعب" })}</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/suspicious-image.jpg"
              style={{
                flex: 1,
                minWidth: 240,
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button type="button" className="btn-secondary" onClick={runImageAnalysis} disabled={loading !== null}>
              {loading === "image" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              {t({ en: "Analyze Image", ar: "تحليل الصورة", arEG: "تحليل الصورة" })}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t({ en: "Image URL for metadata / provenance scan", ar: "رابط الصورة لفحص البيانات الوصفية", arEG: "رابط الصورة لفحص البيانات الوصفية" })}</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={metadataUrl}
              onChange={(event) => setMetadataUrl(event.target.value)}
              placeholder="https://example.com/image-with-metadata.jpg"
              style={{
                flex: 1,
                minWidth: 240,
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button type="button" className="btn-secondary" onClick={runMetadataAnalysis} disabled={loading !== null}>
              {loading === "metadata" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              {t({ en: "Extract Metadata", ar: "استخراج البيانات", arEG: "استخراج البيانات" })}
            </button>
            <button type="button" className="btn-secondary" onClick={runC2paAnalysis} disabled={loading !== null}>
              {loading === "c2pa" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              {t({ en: "Verify C2PA", ar: "تحقق C2PA", arEG: "تحقق C2PA" })}
            </button>
            <button type="button" className="btn-secondary" onClick={runReverseImageSearch} disabled={loading !== null}>
              {loading === "reverse-image" ? <Loader2 size={14} className="animate-spin" /> : <SearchCheck size={14} />}
              {t({ en: "Reverse Search", ar: "بحث عكسي", arEG: "بحث عكسي" })}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ IRL BUTTON FOR FORENSICS ═══ */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
        <ImplementIRLButton irlKey="forensics" accent={accentColor} />
        <span style={{ fontSize: 11, color: "var(--text-caption)" }}>
          {t({ en: "Practice forensics in real life", ar: "مارس الطب الشرعي في الحياة", arEG: "مارس الطب الشرعي في الحياة" })}
        </span>
      </div>

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
            marginTop: 12,
          }}
        >
          <AlertTriangle size={16} style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{error}</span>
        </div>
      )}

      {[imageResult, metadataResult, c2paResult].filter(Boolean).map((result, index) => {
        const exifPreview = getEvidencePreview(result?.rawExif);
        const manifestPreview = getEvidencePreview(result?.rawManifest ?? undefined);

        return (
          <div
            key={`${result?.type}-${index}`}
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
              background: "var(--bg-primary)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <strong style={{ color: "var(--text-primary)", fontSize: "13px" }}>
                {result?.type.replace(/_/g, " ")}
              </strong>
              <span style={{ color: accentColor, fontSize: "12px", fontWeight: 700 }}>
                {a ? `الثقة ${result?.confidence}%` : `Confidence ${result?.confidence}%`}
              </span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {result?.findings.map((finding, findingIndex) => (
                <div key={`${finding.category}-${findingIndex}`} style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{finding.category}:</strong> {finding.description}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: "12px", color: "var(--text-muted)" }}>
              {result?.disclaimer}
            </div>

            {exifPreview.length > 0 && (
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--border-primary)",
                  display: "grid",
                  gap: 6,
                }}
              >
                <strong style={{ color: "var(--text-primary)", fontSize: "12px" }}>{t({ en: "Raw EXIF evidence", ar: "بيانات EXIF الخام", arEG: "بيانات EXIF الخام" })}</strong>
                {exifPreview.map(([key, value]) => (
                  <div key={key} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            )}

            {manifestPreview.length > 0 && (
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--border-primary)",
                  display: "grid",
                  gap: 6,
                }}
              >
                <strong style={{ color: "var(--text-primary)", fontSize: "12px" }}>{t({ en: "C2PA manifest evidence", ar: "بيانات شهادة C2PA", arEG: "بيانات شهادة C2PA" })}</strong>
                {manifestPreview.map(([key, value]) => (
                  <div key={key} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            )}
          </div>
      )})}

      {reverseImageResults !== null && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-primary)",
            background: "var(--bg-primary)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            <strong style={{ color: "var(--text-primary)", fontSize: "13px" }}>
              {t({ en: "Reverse-image provenance", ar: "تتبع مصدر الصورة", arEG: "تتبع مصدر الصورة" })}
            </strong>
            <span style={{ color: accentColor, fontSize: "12px", fontWeight: 700 }}>
              {a ? `${reverseImageResults.length} تطابقات` : `${reverseImageResults.length} matches`}
            </span>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {reverseImageResults.length === 0 ? (
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {t({ en: "No reverse-image matches were returned.", ar: "لم يتم إرجاع نتائج بحث عكسي.", arEG: "لم يتم إرجاع نتائج بحث عكسي." })}
              </div>
            ) : reverseImageResults.slice(0, 4).map((match, index) => (
              <div key={`${match.domain}-${index}`} style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>{match.title}</strong>
                <div>{match.note}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4, color: "var(--text-muted)" }}>
                  <span>{match.domain}</span>
                  <span>{a ? `تشابه ${Math.round(match.score * 100)}%` : `${Math.round(match.score * 100)}% similarity`}</span>
                  {match.firstIndexed ? <span>{a ? `أول فهرسة: ${match.firstIndexed}` : `First indexed: ${match.firstIndexed}`}</span> : null}
                  {match.url ? (
                    <a
                      href={match.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        color: accentColor,
                        textDecoration: "none",
                        fontWeight: 700,
                      }}
                    >
                      {t({ en: "Open", ar: "فتح", arEG: "فتح" })} <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
