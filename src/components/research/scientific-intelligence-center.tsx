"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Filter,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  AWARENESS_STANDARD_BLUEPRINT,
  FLAG_LIBRARY,
  SCIENCE_SIGNALS,
  TRUST_LEADERS,
  UPDATE_METHODS,
  AUDIENCE_RISK_PROFILES,
  type AudienceRiskProfile,
  type FlagFamily,
  type FlagRecord,
  type ScienceDomain,
  type ScienceSignal,
  type TrustedSourceLeader,
  type UpdateMethod,
  getFlagFamilyCount,
} from "@/data/research/scientific-intelligence";
import { useRTL } from "@/components/shared/rtl-provider";

const TAB_OPTIONS = [
  { id: "signals", label: "Scientific signals" },
  { id: "audiences", label: "Targeted people" },
  { id: "sources", label: "Why trust them" },
  { id: "flags", label: "Flag library" },
  { id: "updates", label: "Stay updated" },
  { id: "standards", label: "New standard" },
] as const;

const FAMILY_ACCENTS: Record<FlagFamily, string> = {
  red: "var(--color-danger)",
  camouflage: "var(--color-warning)",
  green: "var(--color-success)",
  grey: "var(--text-muted)",
  blood: "#b91c1c",
};

interface ScienceBriefingResponse {
  metrics: {
    signals: number;
    audiences: number;
    sources: number;
    flags: number;
    updates: number;
    standards: number;
  };
  collections: {
    signals: ScienceSignal[];
    audiences: AudienceRiskProfile[];
    sources: TrustedSourceLeader[];
    flags: FlagRecord[];
    updates: UpdateMethod[];
    standards: typeof AWARENESS_STANDARD_BLUEPRINT;
  };
}

const FALLBACK_DATA: ScienceBriefingResponse = {
  metrics: {
    signals: SCIENCE_SIGNALS.length,
    audiences: AUDIENCE_RISK_PROFILES.length,
    sources: TRUST_LEADERS.length,
    flags: FLAG_LIBRARY.length,
    updates: UPDATE_METHODS.length,
    standards: AWARENESS_STANDARD_BLUEPRINT.length,
  },
  collections: {
    signals: SCIENCE_SIGNALS,
    audiences: AUDIENCE_RISK_PROFILES,
    sources: TRUST_LEADERS,
    flags: FLAG_LIBRARY.filter((flag) => flag.family === "red").slice(0, 24),
    updates: UPDATE_METHODS.slice(0, 24),
    standards: AWARENESS_STANDARD_BLUEPRINT,
  },
};

export function ScientificIntelligenceCenter() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [activeTab, setActiveTab] = useState<(typeof TAB_OPTIONS)[number]["id"]>("signals");
  const [domain, setDomain] = useState<ScienceDomain | "all">("all");
  const [flagFamily, setFlagFamily] = useState<FlagFamily>("red");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ScienceBriefingResponse>(FALLBACK_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const briefingUrl = useMemo(() => {
    const params = new URLSearchParams({
      domain,
      family: flagFamily,
      q: query,
    });

    return `/api/science/briefing?${params.toString()}`;
  }, [domain, flagFamily, query]);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(briefingUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Science briefing failed with ${response.status}`);
        }

        const payload = (await response.json()) as ScienceBriefingResponse;
        setData(payload);
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        console.error(fetchError);
        setError("Science briefing API unavailable. Showing local fallback dataset.");
        setData(FALLBACK_DATA);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void run();
    return () => controller.abort();
  }, [briefingUrl]);

  const { signals, audiences, sources, flags, updates, standards } = data.collections;

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", direction: a ? "rtl" : "ltr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <ShieldCheck size={20} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ margin: 0 }}>{t({ en: "Scientific Intelligence Center", ar: "مركز الذكاء العلمي", arEG: "مركز الذكاء العلمي" })}</h2>
          </div>
          <p style={{ margin: 0, color: "var(--text-muted)", maxWidth: 860 }}>
            {t({ en: "A working science surface for global and Egypt-specific evidence, trust logic, risk audiences, flag systems, and update discipline.", ar: "واجهة عملية تربط الأدلة العالمية والمصرية، الفئات المستهدفة، أسباب الثقة بالمصادر، مكتبة الإشارات التحذيرية، وطرق البقاء محدّثاً.", arEG: "واجهة عملية تربط الأدلة العالمية والمصرية، الفئات المستهدفة، أسباب الثقة بالمصادر، مكتبة الإشارات التحذيرية، وطرق البقاء محدّثاً." })}
          </p>
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, minmax(120px, 1fr))", minWidth: 320 }}>
          <MetricCard icon={<BookOpen size={16} />} label={t({ en: "Signals", ar: "إشارات علمية", arEG: "إشارات علمية" })} value={String(data.metrics.signals)} />
          <MetricCard icon={<ShieldCheck size={16} />} label={t({ en: "Trusted leaders", ar: "مصادر موثوقة", arEG: "مصادر موثوقة" })} value={String(data.metrics.sources)} />
          <MetricCard icon={<RefreshCw size={16} />} label={t({ en: "Update methods", ar: "طرق تحديث", arEG: "طرق تحديث" })} value={String(data.metrics.updates)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {TAB_OPTIONS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "btn-primary" : "btn-secondary"}
            style={{ fontSize: 13, padding: "8px 12px" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 240 }}>
          <Filter size={14} style={{ color: "var(--text-muted)" }} />
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value as ScienceDomain | "all")}
            style={controlStyle}
          >
            <option value="all">{t({ en: "All domains", ar: "كل المجالات", arEG: "كل المجالات" })}</option>
            <option value="misinformation">{t({ en: "Misinformation", ar: "التضليل", arEG: "التضليل" })}</option>
            <option value="mental-health">{t({ en: "Mental health", ar: "الصحة النفسية", arEG: "الصحة النفسية" })}</option>
            <option value="religion">{t({ en: "Religion", ar: "الدين", arEG: "الدين" })}</option>
            <option value="trusted-sources">{t({ en: "Trusted sources", ar: "المصادر", arEG: "المصادر" })}</option>
            <option value="standards">{t({ en: "Standards", ar: "المعايير", arEG: "المعايير" })}</option>
          </select>
        </label>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t({ en: "Search the evidence surface...", ar: "ابحث في الدليل...", arEG: "ابحث في الدليل..." })}
          style={{ ...controlStyle, flex: 1, minWidth: 240 }}
        />
      </div>

      <div
        className="glass-card"
        style={{
          padding: "var(--space-md)",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {loading
            ? a
              ? "جارٍ تحديث الملخص العلمي من المسار الخلفي..."
              : "Refreshing science briefing from the backend route..."
            : a
              ? "الملخص العلمي متصل بمسار API قابل للاستعلام."
              : "Science briefing is now backed by a queryable API route."}
        </div>
        {error && (
          <div style={{ fontSize: 12, color: "var(--color-warning)" }}>
            {error}
          </div>
        )}
      </div>

      {activeTab === "signals" && (
        <CardGrid>
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </CardGrid>
      )}

      {activeTab === "audiences" && (
        <CardGrid>
          {audiences.map((profile) => (
            <div key={profile.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <strong>{a ? profile.audienceAr : profile.audience}</strong>
                <span className="badge">{profile.region}</span>
              </div>
              <p style={{ marginBottom: 8, color: "var(--text-secondary)" }}>{profile.threat}</p>
              <p style={{ marginBottom: 8, color: "var(--text-muted)", fontSize: 13 }}>
                <strong>{t({ en: "Likely harm:", ar: "الضرر المحتمل:", arEG: "الضرر المحتمل:" })}</strong> {profile.likelyHarm}
              </p>
              <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 13 }}>
                <strong>{t({ en: "Protective move:", ar: "الحركة الوقائية:", arEG: "الحركة الوقائية:" })}</strong> {profile.protectiveMove}
              </p>
            </div>
          ))}
        </CardGrid>
      )}

      {activeTab === "sources" && (
        <CardGrid>
          {sources.map((source) => (
            <div key={source.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <strong>{source.name}</strong>
                <span className="badge">{source.category}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>{source.whyTrusted}</p>
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>{source.whyWeUseIt}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {source.trustSignals.map((signal) => (
                  <span key={signal} className="badge" style={{ background: "var(--bg-secondary)" }}>
                    {signal}
                  </span>
                ))}
              </div>
              <a href={source.url} target="_blank" rel="noopener noreferrer" style={ctaLinkStyle}>
                {t({ en: "Visit source", ar: "زيارة المصدر", arEG: "زيارة المصدر" })} <ExternalLink size={12} style={{ display: "inline" }} />
              </a>
            </div>
          ))}
        </CardGrid>
      )}

      {activeTab === "flags" && (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {(["red", "camouflage", "green", "grey", "blood"] as FlagFamily[]).map((family) => (
              <button
                key={family}
                type="button"
                onClick={() => setFlagFamily(family)}
                className={flagFamily === family ? "btn-primary" : "btn-secondary"}
                style={{ borderColor: FAMILY_ACCENTS[family], fontSize: 13 }}
              >
                {family} {getFlagFamilyCount(family)}
              </button>
            ))}
          </div>

          <CardGrid>
            {flags.map((flag) => (
              <div
                key={flag.id}
                className="glass-card"
                style={{ padding: "var(--space-lg)", borderLeft: `3px solid ${FAMILY_ACCENTS[flag.family]}` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                  <strong>{flag.title}</strong>
                  <span className="badge">{flag.domain}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>{flag.cue}</p>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 8 }}>{flag.whyItMatters}</p>
                <p style={{ margin: 0, fontSize: 13 }}>
                  <strong>{t({ en: "Counter move:", ar: "الحركة المضادة:", arEG: "الحركة المضادة:" })}</strong> {flag.counterMove}
                </p>
              </div>
            ))}
          </CardGrid>
        </>
      )}

      {activeTab === "updates" && (
        <CardGrid>
          {updates.map((method) => (
            <div key={method.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <strong>{method.title}</strong>
                <span className="badge">{method.cadence}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>{method.action}</p>
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 8 }}>{method.whyItWorks}</p>
              <p style={{ margin: 0, fontSize: 13 }}>
                <strong>{t({ en: "Source anchor:", ar: "مرساة المصدر:", arEG: "مرساة المصدر:" })}</strong> {method.sourceAnchor}
              </p>
            </div>
          ))}
        </CardGrid>
      )}

      {activeTab === "standards" && (
        <CardGrid>
          {standards.map((standard) => (
            <div key={standard.id} className="glass-card" style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Sparkles size={16} style={{ color: "var(--accent-cta)" }} />
                <strong>{standard.title}</strong>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{standard.description}</p>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
                <strong>{t({ en: "Implementation:", ar: "التطبيق:", arEG: "التطبيق:" })}</strong> {standard.implementation}
              </p>
            </div>
          ))}
        </CardGrid>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 20 }}>
        <MetricCard icon={<AlertTriangle size={16} />} label={t({ en: "Blood flags", ar: "إشارات الدم", arEG: "إشارات الدم" })} value={String(getFlagFamilyCount("blood"))} />
        <MetricCard icon={<HeartPulse size={16} />} label={t({ en: "Targeted audiences", ar: "الفئات المستهدفة", arEG: "الفئات المستهدفة" })} value={String(data.metrics.audiences)} />
        <MetricCard icon={<RefreshCw size={16} />} label={t({ en: "Standard pillars", ar: "المعيار الجديد", arEG: "المعيار الجديد" })} value={String(data.metrics.standards)} />
      </div>
    </section>
  );
}

function SignalCard({ signal }: { signal: ScienceSignal }) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <span className="badge">{signal.region}</span>
        <span style={{ color: "var(--accent-cta)", fontWeight: 700 }}>{signal.value}</span>
      </div>
      <h3 style={{ fontSize: 18, marginBottom: 8 }}>{signal.title}</h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>{signal.summary}</p>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>{signal.whyItMatters}</p>
      <a href={signal.url} target="_blank" rel="noopener noreferrer" style={ctaLinkStyle}>
        {signal.source} <ExternalLink size={12} style={{ display: "inline" }} />
      </a>
    </div>
  );
}

function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      {children}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-md)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", marginBottom: 8 }}>
        {icon}
        <span style={{ fontSize: 13 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>{value}</div>
    </div>
  );
}

const controlStyle = {
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  background: "var(--bg-secondary)",
  border: "1px solid var(--border-primary)",
  color: "var(--text-primary)",
} satisfies CSSProperties;

const ctaLinkStyle = {
  color: "var(--accent-cta)",
  textDecoration: "none",
  fontWeight: 700,
} satisfies CSSProperties;
