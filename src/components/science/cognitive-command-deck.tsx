"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { Brain, BookOpen, Filter, Link2, ScrollText, Search, ShieldCheck } from "lucide-react";
import { ImplementIRLButton } from "@/components/shared/implement-irl-button";
import { useRTL } from "@/components/shared/rtl-provider";
import type { BiasFamily } from "@/data/research/cognitive-knowledge";

type DeckTab = "resilience" | "basics" | "biases" | "sources" | "authorities" | "references";

function copy(text: { en: string; ar: string }, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

type ResolvedReferencePayload =
  | {
      results?: {
        editions?: Array<{
          language?: string;
          name?: string;
          text?: string;
          surah?: { number: number; englishName: string; arabicName: string };
        }>;
        results?: Array<{
          englishText?: string;
          arabicText?: string;
          collection?: string;
          reference?: string;
          grade?: string;
        }>;
      };
      disclaimer?: string;
    }
  | undefined;

type FreeEvidenceResult = {
  id: string;
  title: string;
  sourceName: string;
  sourceType: string;
  url: string;
  publishedAt: string;
  summary: string;
  trustBand: "A" | "B" | "C";
  tags: string[];
  whyRecommended: string;
  accessTier: "free" | "mixed" | "paid" | "unknown";
  openAccess: boolean;
  accessNotes: string;
};

export function CognitiveCommandDeck({
  protocols,
  basics,
  biases,
  communities,
  authorities,
  references,
}: {
  protocols: Array<{
    id: string;
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    action: { en: string; ar: string };
    whyItWorks: { en: string; ar: string };
    sources: Array<{ label: { en: string; ar: string }; url: string }>;
  }>;
  basics: Array<{
    id: string;
    category: { en: string; ar: string };
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    action: { en: string; ar: string };
    whyItMatters: { en: string; ar: string };
    tags: string[];
    coreKeywords: string[];
    expertKeywords: string[];
    hiddenTerms: string[];
    researchPhrases: string[];
    threatKeywords: string[];
    confusionWords: string[];
    promptSuggestions: string[];
    sources: Array<{ label: { en: string; ar: string }; url: string }>;
  }>;
  biases: Array<{
    id: string;
    family: BiasFamily;
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    manipulationUse: { en: string; ar: string };
    defenseMove: { en: string; ar: string };
    tags: string[];
    sources: Array<{ label: { en: string; ar: string }; url: string }>;
  }>;
  communities: Array<{
    id: string;
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    url: string;
    access: "free" | "community" | "official";
    tags: string[];
  }>;
  authorities: Array<{
    id: string;
    title: { en: string; ar: string };
    expertType: { en: string; ar: string };
    useWhen: { en: string; ar: string };
    whyTrusted: { en: string; ar: string };
    verifyYourself: { en: string; ar: string };
    doNotRelyIf: { en: string; ar: string };
    proofSignals: string[];
    routes: Array<{
      label: { en: string; ar: string };
      url: string;
      access: "free" | "official" | "community";
    }>;
  }>;
  references: Array<{
    id: string;
    tradition: "quran" | "hadith";
    title: { en: string; ar: string };
    theme: { en: string; ar: string };
    summary: { en: string; ar: string };
    whyRelevant: { en: string; ar: string };
    resolve: {
      type: "ayah" | "search";
      q: string;
    };
    sourceUrl?: string;
    tags: string[];
  }>;
}) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [tab, setTab] = useState<DeckTab>("resilience");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(8);
  const [family, setFamily] = useState<BiasFamily>("deepfake-fallacy");
  const [referenceResults, setReferenceResults] = useState<Record<string, ResolvedReferencePayload>>({});
  const [resolvingReferenceId, setResolvingReferenceId] = useState("");
  const [evidenceQuery, setEvidenceQuery] = useState("");
  const [evidenceResults, setEvidenceResults] = useState<FreeEvidenceResult[]>([]);
  const [evidencePolicy, setEvidencePolicy] = useState<"free-first" | "free-and-fallback">("free-first");
  const [searchingEvidence, setSearchingEvidence] = useState(false);
  const [evidenceError, setEvidenceError] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  useEffect(() => {
    setVisible(tab === "resilience" ? 8 : 12);
  }, [tab, family]);

  const filteredBasics = basics.filter((item) => {
    if (!deferredQuery) return true;
    return [
      item.title.en,
      item.title.ar,
      item.category.en,
      item.category.ar,
      ...item.tags,
      ...item.coreKeywords,
      ...item.expertKeywords,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  const filteredBiases = biases.filter((item) => {
    if (item.family !== family) return false;
    if (!deferredQuery) return true;
    return [
      item.title.en,
      item.title.ar,
      item.summary.en,
      item.summary.ar,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  const filteredCommunities = communities.filter((item) => {
    if (!deferredQuery) return true;
    return [
      item.title.en,
      item.title.ar,
      item.summary.en,
      item.summary.ar,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  const filteredAuthorities = authorities.filter((item) => {
    if (!deferredQuery) return true;
    return [
      item.title.en,
      item.title.ar,
      item.expertType.en,
      item.expertType.ar,
      item.useWhen.en,
      item.useWhen.ar,
      ...item.proofSignals,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  const filteredReferences = references.filter((item) => {
    if (!deferredQuery) return true;
    return [
      item.title.en,
      item.title.ar,
      item.summary.en,
      item.summary.ar,
      item.whyRelevant.en,
      item.whyRelevant.ar,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  async function resolveReference(referenceId: string, tradition: "quran" | "hadith", type: "ayah" | "search", q: string) {
    setResolvingReferenceId(referenceId);
    try {
      const base = tradition === "quran" ? "/api/islamic/quran" : "/api/islamic/hadith";
      const params =
        tradition === "quran"
          ? new URLSearchParams({ type, q })
          : new URLSearchParams({ q });
      const response = await fetch(`${base}?${params.toString()}`);
      const data = (await response.json()) as ResolvedReferencePayload;
      setReferenceResults((current) => ({ ...current, [referenceId]: data }));
    } finally {
      setResolvingReferenceId("");
    }
  }

  async function searchFreeEvidence() {
    const trimmed = evidenceQuery.trim();
    if (!trimmed) return;

    setSearchingEvidence(true);
    setEvidenceError("");
    try {
      const response = await fetch(`/api/search/evidence?q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) {
        throw new Error("Evidence search failed");
      }
      const data = (await response.json()) as {
        results?: FreeEvidenceResult[];
        policy?: "free-first" | "free-and-fallback";
      };
      setEvidenceResults(data.results ?? []);
      setEvidencePolicy(data.policy ?? "free-first");
    } catch {
      setEvidenceResults([]);
      setEvidenceError(t({ en: "Could not load free evidence routes right now.", ar: "تعذر جلب مسارات الأدلة المجانية الآن.", arEG: "تعذر جلب مسارات الأدلة المجانية الآن." }));
    } finally {
      setSearchingEvidence(false);
    }
  }

  const tabItems: Array<{ id: DeckTab; label: string; count: number }> = [
    { id: "resilience", label: t({ en: "Resilience", ar: "المرونة", arEG: "المرونة" }), count: protocols.length },
    { id: "basics", label: "KeyHunter V2", count: basics.length },
    { id: "biases", label: t({ en: "Biases & fallacies", ar: "التحيزات والمغالطات", arEG: "التحيزات والمغالطات" }), count: biases.length },
    { id: "sources", label: t({ en: "Free routes", ar: "المسارات المجانية", arEG: "المسارات المجانية" }), count: communities.length },
    { id: "authorities", label: t({ en: "Authority routes", ar: "من نثق به", arEG: "مين نثق بيه" }), count: authorities.length },
  ];

  if (references.length > 0) {
    tabItems.push({ id: "references", label: t({ en: "Quran/Hadith refs", ar: "مراجع القرآن والحديث", arEG: "مراجع القرآن والحديث" }), count: references.length });
  }

  const canLoadMore =
    (tab === "resilience" && visible < protocols.length) ||
    (tab === "basics" && visible < filteredBasics.length) ||
    (tab === "biases" && visible < filteredBiases.length) ||
    (tab === "sources" && visible < filteredCommunities.length) ||
    (tab === "authorities" && visible < filteredAuthorities.length) ||
    (tab === "references" && visible < filteredReferences.length);

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Brain size={18} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Real-time cognitive command", ar: "مركز الإدراك اللحظي", arEG: "مركز الإدراك اللحظي" })}</strong>
          </div>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            {a
              ? "طبقة واحدة ترفع المرونة المعرفية: بروتوكولات فورية، KeyHunter V2، تحيزات ومغالطات، مسارات مجانية، وخريطة خبرة يمكن التحقق منها."
              : "One layer for cognitive resilience: real-time protocols, KeyHunter V2, bias/fallacy libraries, free routes, and an authority map you can verify yourself."}
          </p>
        </div>

        <label className="glass-card" style={{ padding: "var(--space-sm) var(--space-md)", minWidth: 260, background: "var(--bg-secondary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={14} />
            <input
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                startTransition(() => setQuery(nextValue));
              }}
              placeholder={t({ en: "Search basics, biases, routes, and references", ar: "ابحث في الأساسيات والتحيزات والمراجع والمسارات", arEG: "ابحث في الأساسيات والتحيزات والمراجع والمسارات" })}
              style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text-primary)" }}
            />
          </div>
        </label>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {tabItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? "btn-primary" : "btn-secondary"}
            onClick={() => setTab(item.id)}
          >
            {item.label} {item.count}
          </button>
        ))}
      </div>

      {tab === "resilience" ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {protocols.slice(0, visible).map((item) => (
            <article key={item.id} className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6 }}>
                {t({ en: "Cognitive resilience upgrade", ar: "ترقية المرونة المعرفية", arEG: "ترقية المرونة المعرفية" })}
              </div>
              <strong>{copy(item.title, a)}</strong>
              <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{copy(item.summary, a)}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                <strong>{t({ en: "Action:", ar: "الإجراء:", arEG: "الخطوة:" })}</strong> {copy(item.action, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
                <strong>{t({ en: "Why it works:", ar: "لماذا يعمل:", arEG: "ليه بيشتغل:" })}</strong> {copy(item.whyItWorks, a)}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                {item.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="badge" style={{ textDecoration: "none" }}>
                    {copy(source.label, a)}
                  </a>
                ))}
                <ImplementIRLButton irlKey={`resilience-${item.id}`} compact accent="var(--accent-cta)" />
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "basics" ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {filteredBasics.slice(0, visible).map((item) => (
            <article key={item.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <strong>{copy(item.title, a)}</strong>
                <span className="badge">{copy(item.category, a)}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{copy(item.summary, a)}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                <strong>{t({ en: "Why it matters:", ar: "لماذا يهم:", arEG: "ليه ده مهم:" })}</strong> {copy(item.whyItMatters, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                <strong>{t({ en: "Action:", ar: "الإجراء:", arEG: "الخطوة:" })}</strong> {copy(item.action, a)}
              </p>
              <details>
                <summary style={{ cursor: "pointer", fontWeight: 700, marginBottom: 8 }}>
                  {t({ en: "Open the 7 layers", ar: "افتح الطبقات السبع", arEG: "افتح الطبقات السبع" })}
                </summary>
                <div className="grid gap-2" style={{ marginTop: 8 }}>
                  {[
                    { label: t({ en: "Core", ar: "الأساسية", arEG: "الأساسية" }), values: item.coreKeywords },
                    { label: t({ en: "Expert", ar: "الخبيرة", arEG: "الخبيرة" }), values: item.expertKeywords },
                    { label: t({ en: "Hidden", ar: "الخفية", arEG: "الخفية" }), values: item.hiddenTerms },
                    { label: t({ en: "Research", ar: "عبارات البحث", arEG: "عبارات البحث" }), values: item.researchPhrases },
                    { label: t({ en: "Threats", ar: "التهديدات", arEG: "التهديدات" }), values: item.threatKeywords },
                    { label: t({ en: "Confusion", ar: "ألفاظ التشويش", arEG: "ألفاظ التشويش" }), values: item.confusionWords },
                    { label: t({ en: "Prompts", ar: "مطالبات الفحص", arEG: "مطالبات الفحص" }), values: item.promptSuggestions },
                  ].map((layer) => (
                    <div key={layer.label} className="glass-card" style={{ padding: "var(--space-sm)", background: "var(--bg-secondary)" }}>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6 }}>{layer.label}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {layer.values.map((value) => (
                          <span key={value} className="badge">{value}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
                {item.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="badge" style={{ textDecoration: "none" }}>
                    {copy(source.label, a)}
                  </a>
                ))}
                <ImplementIRLButton irlKey={`keyhunter-${item.id}`} compact accent="var(--accent-cta)" />
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "biases" ? (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { id: "deepfake-fallacy", label: t({ en: "Deepfake fallacies", ar: "مغالطات التزييف العميق", arEG: "مغالطات التزييف العميق" }) },
              { id: "deepfake-bias", label: t({ en: "Deepfake biases", ar: "انحيازات التزييف العميق", arEG: "انحيازات التزييف العميق" }) },
              { id: "religious-bias", label: t({ en: "Religious biases", ar: "التحيزات الدينية", arEG: "التحيزات الدينية" }) },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={family === item.id ? "btn-primary" : "btn-secondary"}
                onClick={() => setFamily(item.id as BiasFamily)}
              >
                <Filter size={14} />
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {filteredBiases.slice(0, visible).map((item) => (
              <article key={item.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
                <strong>{copy(item.title, a)}</strong>
                <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{copy(item.summary, a)}</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                  <strong>{t({ en: "How it is used:", ar: "كيف يُستخدم:", arEG: "بيتستخدم إزاي:" })}</strong> {copy(item.manipulationUse, a)}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
                  <strong>{t({ en: "How to fight back:", ar: "كيف تُقاومه:", arEG: "إزاي تقاومه:" })}</strong> {copy(item.defenseMove, a)}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  {item.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="badge" style={{ textDecoration: "none" }}>
                      {copy(source.label, a)}
                    </a>
                  ))}
                  <ImplementIRLButton irlKey={`bias-${item.id}`} compact accent="var(--accent-cta)" />
                </div>
              </article>
            ))}
          </div>
        </>
      ) : null}

      {tab === "sources" ? (
        <div className="grid gap-4">
          <div className="glass-card" style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              <div>
                <strong>{t({ en: "Live free-evidence search", ar: "بحث مباشر في الأدلة المجانية", arEG: "بحث مباشر في الأدلة المجانية" })}</strong>
                <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                  {a
                    ? "ابحث داخل OpenAlex وSemantic Scholar وEurope PMC وDOAJ. هذا المسار يفضّل النتائج المفتوحة والمجانية فقط."
                    : "Search OpenAlex, Semantic Scholar, Europe PMC, and DOAJ. This route prioritizes open and free-access evidence only."}
                </p>
              </div>
              <span className="badge">{evidencePolicy}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <input
                value={evidenceQuery}
                onChange={(event) => setEvidenceQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void searchFreeEvidence();
                  }
                }}
                placeholder={t({ en: "Example: misinformation mental health egypt", ar: "مثال: misinformation mental health egypt", arEG: "مثال: misinformation mental health egypt" })}
                style={{
                  flex: "1 1 280px",
                  minWidth: 220,
                  background: "rgba(15,23,42,0.22)",
                  color: "var(--text-primary)",
                  border: "1px solid rgba(148,163,184,0.18)",
                  borderRadius: 14,
                  padding: "12px 14px",
                }}
              />
              <button type="button" className="btn-primary" onClick={() => void searchFreeEvidence()} disabled={searchingEvidence}>
                {searchingEvidence ? (t({ en: "Searching", ar: "جارٍ البحث", arEG: "بيدوّر" })) : t({ en: "Search free evidence", ar: "ابحث مجاناً", arEG: "دوّر مجاناً" })}
              </button>
            </div>
            {evidenceError ? (
              <p style={{ color: "#fca5a5", marginBottom: 0 }}>{evidenceError}</p>
            ) : null}
            {evidenceResults.length > 0 ? (
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                {evidenceResults.map((result) => (
                  <a
                    key={result.id}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card"
                    style={{ padding: "var(--space-md)", textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <strong>{result.title}</strong>
                      <span className="badge">{result.accessTier}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>{result.summary}</p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                      <strong>{t({ en: "Source:", ar: "المصدر:", arEG: "المصدر:" })}</strong> {result.sourceName} · {result.publishedAt}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                      <strong>{t({ en: "Why recommended:", ar: "لماذا رُشح:", arEG: "ليه اترشح:" })}</strong> {result.whyRecommended}
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span className="badge">trust {result.trustBand}</span>
                      {result.tags.map((tag) => (
                        <span key={`${result.id}-${tag}`} className="badge">{tag}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {filteredCommunities.slice(0, visible).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{ padding: "var(--space-lg)", textDecoration: "none", color: "inherit" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Link2 size={14} style={{ color: "var(--accent-cta)" }} />
                  <strong>{copy(item.title, a)}</strong>
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{copy(item.summary, a)}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="badge">{item.access}</span>
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "authorities" ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {filteredAuthorities.slice(0, visible).map((item) => (
            <article key={item.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <ShieldCheck size={14} style={{ color: "var(--accent-cta)" }} />
                <strong>{copy(item.title, a)}</strong>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
                <strong>{t({ en: "Who is this?", ar: "من هو؟", arEG: "مين ده؟" })}</strong> {copy(item.expertType, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                <strong>{t({ en: "Use when:", ar: "متى أستخدمه؟", arEG: "استخدمه إمتى؟" })}</strong> {copy(item.useWhen, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                <strong>{t({ en: "Why trusted:", ar: "لماذا نثق به؟", arEG: "ليه نثق بيه؟" })}</strong> {copy(item.whyTrusted, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                <strong>{t({ en: "How to verify yourself:", ar: "كيف أتحقق بنفسي؟", arEG: "إزاي أتأكد بنفسي؟" })}</strong> {copy(item.verifyYourself, a)}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                <strong>{t({ en: "Do not rely if:", ar: "متى لا أعتمد عليه؟", arEG: "متعتمدش عليه لو:" })}</strong> {copy(item.doNotRelyIf, a)}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {item.proofSignals.map((signal) => (
                  <span key={signal} className="badge">{signal}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.routes.map((route) => (
                  <a key={route.url} href={route.url} target="_blank" rel="noopener noreferrer" className="badge" style={{ textDecoration: "none" }}>
                    {copy(route.label, a)} · {route.access}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "references" ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {filteredReferences.slice(0, visible).map((item) => {
            const resolved = referenceResults[item.id];
            return (
              <article key={item.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <ScrollText size={14} style={{ color: "var(--accent-cta)" }} />
                  <strong>{copy(item.title, a)}</strong>
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
                  <strong>{copy(item.theme, a)}</strong> · {item.tradition === "quran" ? "Quran" : "Hadith"}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{copy(item.summary, a)}</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                  <strong>{t({ en: "Why relevant:", ar: "لماذا يهم؟", arEG: "ليه ده مهم؟" })}</strong> {copy(item.whyRelevant, a)}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: resolved ? 12 : 0 }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={resolvingReferenceId === item.id}
                    onClick={() => resolveReference(item.id, item.tradition, item.resolve.type, item.resolve.q)}
                  >
                    {resolvingReferenceId === item.id ? (t({ en: "Resolving", ar: "جارٍ الجلب", arEG: "بيتحمّل" })) : t({ en: "Resolve text", ar: "اجلب النص", arEG: "هات النص" })}
                  </button>
                  {item.sourceUrl ? (
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: "none" }}>
                      {t({ en: "Open source", ar: "افتح المصدر", arEG: "افتح المصدر" })}
                    </a>
                  ) : null}
                </div>
                {resolved ? (
                  <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    {item.tradition === "quran" ? (
                      <div className="grid gap-2">
                        {resolved.results?.editions?.slice(0, 2).map((edition, index) => (
                          <div key={`${item.id}-${index}`}>
                            <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                              {edition.language ?? "text"} {edition.surah?.number ? `· ${edition.surah.number}` : ""}
                            </div>
                            <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{edition.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        {resolved.results?.results?.slice(0, 2).map((entry, index) => (
                          <div key={`${item.id}-${index}`}>
                            <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                              {entry.collection ?? "Hadith"} {entry.reference ? `· ${entry.reference}` : ""} {entry.grade ? `· ${entry.grade}` : ""}
                            </div>
                            <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{entry.englishText}</div>
                            {entry.arabicText ? (
                              <div style={{ color: "var(--text-muted)", lineHeight: 1.7, marginTop: 6 }}>{entry.arabicText}</div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                    {resolved.disclaimer ? (
                      <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--text-caption)" }}>{resolved.disclaimer}</p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}

      {canLoadMore ? (
        <div style={{ marginTop: 16 }}>
          <button type="button" className="btn-secondary" onClick={() => setVisible((current) => current + 12)}>
            <BookOpen size={14} />
            {t({ en: "Load more", ar: "تحميل المزيد", arEG: "حمّل أكتر" })}
          </button>
        </div>
      ) : null}
    </section>
  );
}
