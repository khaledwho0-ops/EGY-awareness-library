"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Languages, Loader2 } from "lucide-react";
import type { ArabicAnalysisResult } from "@/lib/nlp/arabic-analysis";

interface ArabicAnalysisCardProps {
  accentColor: string;
  text: string;
}

export function ArabicAnalysisCard({ accentColor, text }: ArabicAnalysisCardProps) {
  const [result, setResult] = useState<ArabicAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/nlp/arabic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Arabic analysis failed.");
        }

        if (!cancelled) {
          setResult(payload as ArabicAnalysisResult);
        }
      } catch (caughtError) {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError.message : "Arabic analysis failed.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <section
      style={{
        marginBottom: 20,
        padding: "16px 18px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-primary)",
        background: "var(--bg-secondary)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
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
          <Languages size={18} />
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: 4, fontSize: "15px", color: "var(--text-primary)" }}>
            Arabic NLP Snapshot
          </h4>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Chunk 6 entry point: Arabic sentiment, dialect hints, trigger extraction, and risk flags.
          </p>
        </div>
      </div>

      {!result && !error && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", color: "var(--text-muted)" }}>
          <Loader2 size={14} className="animate-spin" />
          Running Arabic analysis…
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
          }}
        >
          <AlertTriangle size={16} style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{error}</span>
        </div>
      )}

      {result && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="badge" style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}22` }}>
              Dialect: {result.dialectHint}
            </span>
            <span className="badge" style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)" }}>
              Sentiment: {result.sentiment.label} ({result.sentiment.confidence})
            </span>
            <span className="badge" style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)" }}>
              Provider: {result.provider}
            </span>
          </div>

          {result.emotionalTriggers.length > 0 && (
            <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Emotional triggers:</strong> {result.emotionalTriggers.join("، ")}
            </div>
          )}

          {result.riskFlags.length > 0 && (
            <div style={{ fontSize: "13px", color: "var(--color-danger)" }}>
              <strong>Risk flags:</strong> {result.riskFlags.join("، ")}
            </div>
          )}

          {result.entities.length > 0 && (
            <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Detected entities:</strong>{" "}
              {result.entities.map((entity) => `${entity.text} (${entity.type})`).join("، ")}
            </div>
          )}

          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{result.disclaimer}</div>
        </div>
      )}
    </section>
  );
}
