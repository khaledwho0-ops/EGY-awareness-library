"use client";

import { useState, useMemo } from "react";
import { Shield, Brain, BookOpen, Search, AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { FALLACIES, BIASES, RELIGIOUS_BIASES, type FightBackEntry, type FightBackCategory } from "@/data/research/fight-back-data";

const CATEGORY_META: Record<FightBackCategory, { icon: React.ReactNode; labelEn: string; labelAr: string; color: string }> = {
  fallacy: { icon: <Shield size={16} />, labelEn: "Logical Fallacies", labelAr: "المغالطات المنطقية", color: "#3B82F6" },
  bias: { icon: <Brain size={16} />, labelEn: "Cognitive Biases", labelAr: "الانحيازات المعرفية", color: "#F59E0B" },
  religious: { icon: <BookOpen size={16} />, labelEn: "Religious Manipulation", labelAr: "التلاعب الديني", color: "#EF4444" },
};

export default function FightBackPage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [activeTab, setActiveTab] = useState<FightBackCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const allEntries = useMemo(() => [...FALLACIES, ...BIASES, ...RELIGIOUS_BIASES], []);

  const filtered = useMemo(() => {
    let entries = activeTab === "all" ? allEntries : allEntries.filter(e => e.category === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.filter(e =>
        e.nameEn.toLowerCase().includes(q) || e.nameAr.includes(q) || e.nameArEG.includes(q) ||
        e.descriptionEn.toLowerCase().includes(q) || e.descriptionAr.includes(q) || e.descriptionArEG.includes(q)
      );
    }
    return entries;
  }, [activeTab, search, allEntries]);

  const stats = {
    fallacy: FALLACIES.length,
    bias: BIASES.length,
    religious: RELIGIOUS_BIASES.length,
    total: allEntries.length,
  };

  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <div style={{ paddingTop: "var(--navbar-height)", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-md)" }}>
        {/* Hero */}
        <div className="glass-card" style={{
          padding: "var(--space-2xl)",
          background: "radial-gradient(circle at top right, rgba(239,68,68,0.12), transparent 50%), var(--bg-primary)",
          border: "1px solid rgba(239,68,68,0.2)",
          marginBottom: "var(--space-xl)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚔️</div>
          <h1 style={{ marginBottom: 10, fontFamily: ff }}>
            {t({ en: "Fight Back", ar: "قاتل التضليل", arEG: "قاتل التضليل" })} <span className="text-gradient">{t({ en: "— Defense Arsenal", ar: "— ارسانال الدفاع", arEG: "— ارسانال الدفاع" })}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: 700, margin: "0 auto", fontSize: 16, fontFamily: ff }}>
            {t({ en: "No generic answers. Every entry explains: What is it? Why does it work? How to spot it? How to defend yourself? — with real Egyptian-context examples.", ar: "لا إجابات عامة. كل إدخال يشرح: ما هو؟ لماذا يعمل؟ كيف تكتشفه؟ كيف تدافع عن نفسك؟ — بأمثلة حقيقية من السياق المصري.", arEG: "لا إجابات عامة. كل إدخال يشرح: ما هو؟ لماذا يعمل؟ كيف تكتشفه؟ كيف تدافع عن نفسك؟ — بأمثلة حقيقية من السياق المصري." })}
          </p>

          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", marginTop: 24 }}>
            <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(59,130,246,0.1)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#3B82F6" }}>{stats.fallacy}+</div>
              <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>{t({ en: "Logical Fallacies", ar: "مغالطة منطقية", arEG: "مغالطة منطقية" })}</div>
            </div>
            <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(245,158,11,0.1)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B" }}>{stats.bias}+</div>
              <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>{t({ en: "Cognitive Biases", ar: "انحياز معرفي", arEG: "انحياز معرفي" })}</div>
            </div>
            <div className="glass-card" style={{ padding: "var(--space-md)", background: "rgba(239,68,68,0.1)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#EF4444" }}>{stats.religious}+</div>
              <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>{t({ en: "Religious Manipulation", ar: "تلاعب ديني", arEG: "تلاعب ديني" })}</div>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "var(--space-lg)", alignItems: "center" }}>
          <div style={{ flex: "1 1 240px", position: "relative" }}>
            <Search size={16} style={{ position: "absolute", top: 14, [a ? "right" : "left"]: 14, color: "var(--text-caption)" }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t({ en: "Search fallacies, biases...", ar: "ابحث عن مغالطة أو انحياز...", arEG: "ابحث عن مغالطة أو انحياز..." })}
              style={{
                width: "100%", padding: "12px 16px", [t({ en: "paddingLeft", ar: "paddingRight", arEG: "paddingRight" })]: 40,
                borderRadius: 12, border: "1px solid var(--border-primary)",
                background: "var(--bg-secondary)", color: "var(--text-primary)",
                fontSize: 14, outline: "none", fontFamily: ff,
              }}
            />
          </div>
          {(["all", "fallacy", "bias", "religious"] as const).map(tab => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "btn-primary" : "btn-secondary"}
              style={{ padding: "10px 18px", fontSize: 13, fontFamily: ff }}
            >
              {tab === "all"
                ? (a ? `الكل (${stats.total})` : `All (${stats.total})`)
                : `${a ? CATEGORY_META[tab].labelAr : CATEGORY_META[tab].labelEn} (${tab === "fallacy" ? stats.fallacy : tab === "bias" ? stats.bias : stats.religious})`
              }
            </button>
          ))}
        </div>

        {/* Entries Grid */}
        <div className="grid gap-3">
          {filtered.map(entry => {
            const meta = CATEGORY_META[entry.category];
            const isExpanded = expandedId === entry.id;
            return (
              <article key={entry.id} className="glass-card" style={{
                padding: 0, overflow: "hidden",
                border: isExpanded ? `1px solid ${meta.color}33` : "1px solid var(--border-primary)",
                transition: "all 0.3s ease",
              }}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 12,
                    padding: "16px 20px", background: "transparent", border: "none",
                    cursor: "pointer", color: "var(--text-primary)",
                    textAlign: a ? "right" : "left", fontFamily: ff,
                  }}
                >
                  <span style={{ color: meta.color, flexShrink: 0 }}>{meta.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: 15 }}>#{entry.id} {t({ en: entry.nameEn, ar: entry.nameAr, arEG: entry.nameArEG })}</strong>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t({ en: entry.descriptionEn, ar: entry.descriptionAr, arEG: entry.descriptionArEG })}
                    </div>
                  </div>
                  <span className="badge" style={{ background: `${meta.color}18`, color: meta.color, flexShrink: 0 }}>
                    {entry.severity === "high" ? (t({ en: "High", ar: "عالي", arEG: "عالي" })) : entry.severity === "medium" ? (t({ en: "Med", ar: "متوسط", arEG: "متوسط" })) : (t({ en: "Low", ar: "منخفض", arEG: "منخفض" }))}
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div style={{ padding: "0 20px 20px", display: "grid", gap: 12 }}>
                    <div className="glass-card" style={{ padding: 16, background: "rgba(239,68,68,0.06)", borderInlineStart: "3px solid #EF4444" }}>
                      <strong style={{ display: "block", marginBottom: 6, fontSize: 13, fontFamily: ff }}>{t({ en: "⚠️ Real Example", ar: "⚠️ مثال حقيقي", arEG: "⚠️ مثال حقيقي" })}</strong>
                      <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", fontFamily: ff, fontStyle: "italic" }}>
                        {t({ en: entry.exampleEn, ar: entry.exampleAr, arEG: entry.exampleArEG })}
                      </p>
                    </div>
                    <div className="glass-card" style={{ padding: 16, background: "rgba(16,185,129,0.06)", borderInlineStart: "3px solid #10B981" }}>
                      <strong style={{ display: "block", marginBottom: 6, fontSize: 13, fontFamily: ff }}>{t({ en: "🛡️ How to Defend Yourself", ar: "🛡️ كيف تدافع عن نفسك", arEG: "🛡️ إزاي تدافع عن نفسك" })}</strong>
                      <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", fontFamily: ff }}>
                        {t({ en: entry.defenseEn, ar: entry.defenseAr, arEG: entry.defenseArEG })}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {entry.sources.map(src => (
                        <a key={src} href={`https://${src}`} target="_blank" rel="noopener noreferrer"
                          className="badge" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                          <ExternalLink size={10} /> {src}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
            <AlertTriangle size={24} style={{ color: "var(--text-caption)", marginBottom: 8 }} />
            <p style={{ color: "var(--text-muted)", fontFamily: ff }}>{t({ en: "No results found.", ar: "لم يتم العثور على نتائج.", arEG: "لم يتم العثور على نتائج." })}</p>
          </div>
        )}
      </div>
    </div>
  );
}
