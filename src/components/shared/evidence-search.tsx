"use client";

import { startTransition, useState } from "react";
import { Search, ExternalLink, Loader2, BookOpen, AlertCircle } from "lucide-react";
import type { NormalizedAPIResponse } from "@/types";
import { useRTL } from "@/components/shared/rtl-provider";

type SearchMode =
  | "fact_check"
  | "crossref"
  | "openalex"
  | "semantic_scholar"
  | "veracity"
  | "ncbi"
  | "mediawiki"
  | "archive";

interface VeracitySearchEvidence {
  title: string;
  rationale: string;
  sourceType: string;
  url?: string;
}

interface VeracitySearchResult {
  claim: string;
  verdict: "refuted" | "supported" | "mixed" | "uncertain";
  confidence: number;
  explanation: string;
  evidence: VeracitySearchEvidence[];
  provider: string;
}

function normalizeVeracityResult(result: VeracitySearchResult): NormalizedAPIResponse[] {
  const trustBand = result.verdict === "supported" ? "A" : result.verdict === "mixed" ? "B" : "C";
  const summary = `${result.explanation} [Verdict: ${result.verdict}, confidence ${Math.round(result.confidence * 100)}%, provider: ${result.provider}]`;

  const primaryResult: NormalizedAPIResponse = {
    id: `veracity-${encodeURIComponent(result.claim).slice(0, 40)}`,
    title: result.claim,
    sourceName: "Veracity",
    sourceType: "fact_check",
    url: result.evidence.find((entry) => entry.url)?.url ?? "#",
    publishedAt: "Live verification",
    summary,
    trustBand,
    module: "deepreal",
    tags: ["veracity", result.verdict, "grounded-verification"],
    whyRecommended: "Grounded claim verdict synthesized from configured evidence sources.",
  };

  const evidenceResults = result.evidence.slice(0, 5).map((entry, index): NormalizedAPIResponse => ({
    id: `veracity-evidence-${index}-${encodeURIComponent(entry.title).slice(0, 24)}`,
    title: entry.title,
    sourceName: result.provider,
    sourceType:
      entry.sourceType === "academic"
        ? "journal"
        : entry.sourceType === "official_guidance"
          ? "official_guidance"
          : entry.sourceType === "archive"
            ? "archive"
            : "fact_check",
    url: entry.url ?? "#",
    publishedAt: "Evidence",
    summary: entry.rationale,
    trustBand,
    module: "deepreal",
    tags: ["veracity-evidence", entry.sourceType],
    whyRecommended: `Used as supporting evidence for the ${result.verdict} verdict.`,
  }));

  return [primaryResult, ...evidenceResults];
}

export function EvidenceSearch() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("fact_check");
  const [results, setResults] = useState<NormalizedAPIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiDisclaimer, setApiDisclaimer] = useState<string | null>(null);
  const [apiProvider, setApiProvider] = useState<string | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setApiDisclaimer(null);
    setApiProvider(null);
    setHasSearched(true);

    try {
      const endpointMap = {
        fact_check: "/api/search/factcheck",
        crossref: "/api/search/evidence",
        openalex: "/api/search/openalex",
        semantic_scholar: "/api/search/semantic-scholar",
        ncbi: "/api/search/ncbi",
        mediawiki: "/api/search/mediawiki",
        archive: "/api/search/archive",
      } as const;

      const res = searchMode === "veracity"
        ? await fetch("/api/search/veracity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ claim: query }),
          })
        : await fetch(`${endpointMap[searchMode as Exclude<SearchMode, "veracity">]}?q=${encodeURIComponent(query)}`);
      
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const apiErrMsg = payload?.messageEn || payload?.error || payload?.message || "Failed to fetch evidence from server.";
        throw new Error(apiErrMsg);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.ok === false) {
        throw new Error(data.messageEn || data.errorCode || "Unknown API error.");
      }

      startTransition(() => {
        setApiDisclaimer(data.disclaimer || null);
        setApiProvider(data.provider || null);

        if (searchMode === "veracity" && data.result) {
          setResults(normalizeVeracityResult(data.result as VeracitySearchResult));
          return;
        }

        setResults(data.results || []);
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during search.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTrustBandColor = (band: string) => {
    switch (band) {
      case "A": return "var(--color-success)";
      case "B": return "var(--color-warning)";
      case "C": return "var(--color-danger)";
      default: return "var(--text-muted)";
    }
  };

  return (
    <div className="glass-card" style={{ padding: "var(--space-xl)", marginTop: "var(--space-xl)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", background: "rgba(59, 130, 246, 0.15)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Search size={20} style={{ color: "#3B82F6" }} />
        </div>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "var(--text-primary)", fontFamily: ff }}>
            {t({ en: "Live Evidence & Fact-Check Search (§21.4)", ar: "بحث الأدلة والتحقق المباشر (§21.4)", arEG: "بحث الأدلة والتحقق المباشر (§21.4)" })}
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, fontFamily: ff }}>
            {t({ en: "Backend-only research routing across the framework\u0027s official discovery stack: Google Fact Check, Crossref, OpenAlex, Semantic Scholar, Veracity, NCBI, MediaWiki orientation, and Internet Archive.", ar: "توجيه البحث عبر مجموعة الاكتشاف الرسمية للإطار.", arEG: "توجيه البحث عبر مجموعة الاكتشاف الرسمية للإطار." })}
          </p>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {[
          ["fact_check", "Fact Check"],
          ["crossref", "Crossref"],
          ["openalex", "OpenAlex"],
          ["semantic_scholar", "Semantic Scholar"],
          ["veracity", "Veracity"],
          ["ncbi", "NCBI"],
          ["mediawiki", "MediaWiki"],
          ["archive", "Archive"],
        ].map(([mode, label]) => (
          <button
            key={mode}
            onClick={() => setSearchMode(mode as typeof searchMode)}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "13px",
              fontWeight: 600,
              background: searchMode === mode ? "var(--accent-cta)" : "transparent",
              color: searchMode === mode ? "white" : "var(--text-secondary)",
              border: `1px solid ${searchMode === mode ? "transparent" : "var(--border-primary)"}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            searchMode === "fact_check"
              ? "Enter a claim to fact-check..."
              : searchMode === "veracity"
                ? "Enter a claim for grounded verdict + evidence..."
                : searchMode === "semantic_scholar"
                  ? "Enter a research topic to get AI-summarized papers..."
                : searchMode === "ncbi"
                  ? "Enter a biomedical topic, symptom, or condition..."
                  : searchMode === "mediawiki"
                  ? "Enter a concept or entity for orientation..."
                  : searchMode === "archive"
                    ? "Enter a document, site, or subject to inspect historically..."
                    : "Enter a topic to find research..."
          }
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-primary)",
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || !query.trim()}
          style={{ minWidth: 120 }}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : (t({ en: "Search", ar: "بحث", arEG: "بحث" }))}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div style={{
          padding: "16px", borderRadius: "var(--radius-md)", background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", gap: 12, alignItems: "flex-start",
          marginBottom: 20
        }}>
          <AlertCircle size={18} style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "14px", color: "var(--text-primary)", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Results state */}
      {!isLoading && !error && hasSearched && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-primary)" }}>
          <BookOpen size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", fontFamily: ff }}>
            {t({ en: "No verified results returned", ar: "لم يتم إرجاع نتائج مؤكدة", arEG: "مفيش نتايج مؤكدة رجعت" })}
          </h3>
          {apiProvider && (
            <div style={{ fontSize: "12px", display: "inline-block", background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6", padding: "2px 8px", borderRadius: "12px", fontWeight: 600, marginBottom: "12px" }}>
              Provider: {apiProvider}
            </div>
          )}
          <p style={{ fontSize: "14px", fontFamily: ff, marginBottom: "16px", maxWidth: "600px", margin: "0 auto 16px", lineHeight: 1.5 }}>
            {apiDisclaimer 
              ? apiDisclaimer 
              : t({ en: "The selected backend returned no matches for this query.", ar: "لم يتم العثور على نتائج في المزود المحدد.", arEG: "المصدر ده ملقاش حاجة للبحث ده." })}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--color-warning)", fontWeight: 500 }}>
              {t({ en: "Note: Absence of evidence does not mean the claim is true.", ar: "ملاحظة: غياب الدليل لا يعني أن الادعاء صحيح.", arEG: "ملاحظة: غياب الدليل مش معناه إن الادعاء صح." })}
            </span>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              {t({ en: "Try selecting a different provider (e.g. Crossref or OpenAlex).", ar: "جرب تحديد مزود مختلف (مثل Crossref).", arEG: "جرب مصدر تاني (زي Crossref أو OpenAlex)." })}
            </span>
          </div>
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>
            {a ? `أفضل النتائج (${results.length})` : `Top Results (${results.length})`}
          </div>
          {results.map((res) => (
            <div key={res.id} style={{
              padding: "16px", borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
              background: "var(--bg-secondary)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.4 }}>
                    {res.title}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "var(--radius-full)", background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6", fontWeight: 600 }}>
                      {res.sourceType}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      {res.publishedAt}
                    </span>
                    <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "var(--radius-full)", border: `1px solid ${getTrustBandColor(res.trustBand)}30`, color: getTrustBandColor(res.trustBand), fontWeight: 700 }}>
                      Band {res.trustBand}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                    {res.summary}
                  </p>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
                    borderRadius: "var(--radius-md)", background: "var(--bg-primary)",
                    border: "1px solid var(--border-primary)", color: "var(--text-primary)",
                    fontSize: "12px", fontWeight: 600, textDecoration: "none", flexShrink: 0,
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "var(--bg-secondary)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "var(--bg-primary)")}
                >
                  View Source <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
