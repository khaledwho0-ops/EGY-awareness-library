"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  Shield,
  ChevronDown,
  ChevronUp,
  Globe,
  BookOpen,
  CheckCircle2,
  Star,
} from "lucide-react";
import type { SourceEntry, MVP, TrustBand } from "@/types";
import { checkFreshness, FRESHNESS_COLORS } from "@/lib/registry/source-freshness";
import { useRTL } from "@/components/shared/rtl-provider";

interface SourceRegistryProps {
  sources: SourceEntry[];
  defaultMVP?: MVP;
}

/**
 * Source Registry Component — Framework §19
 *
 * 3-layer architecture (§19.1):
 * - Pinned Sources: default_user visibility
 * - Searchable Registry: full library with filters
 * - Research Back Office: admin_only (separate admin page)
 *
 * Features:
 * - Search by name/description
 * - Filter by MVP, trust band, source role
 * - Trust band badges (A=green, B=yellow, C=orange)
 * - Expandable source details with scoring rubric
 * - "Why Recommended" explanation
 */
export function SourceRegistry({ sources, defaultMVP }: SourceRegistryProps) {
  const [search, setSearch] = useState("");
  const [filterMVP, setFilterMVP] = useState<MVP | "all">(defaultMVP || "all");
  const [filterBand, setFilterBand] = useState<TrustBand | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const filtered = useMemo(() => {
    let results = sources;

    if (filterMVP !== "all") {
      results = results.filter((s) => s.mvp === filterMVP);
    }
    if (filterBand !== "all") {
      results = results.filter((s) => s.trustBand === filterBand);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.whyTrusted.toLowerCase().includes(q) ||
          s.appUse.toLowerCase().includes(q)
      );
    }

    return results;
  }, [sources, filterMVP, filterBand, search]);

  const bandColors: Record<TrustBand, { bg: string; text: string; border: string; label: string }> = {
    A: { bg: "rgba(16,185,129,0.12)", text: "#10B981", border: "rgba(16,185,129,0.3)", label: "Band A (12-14)" },
    B: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", border: "rgba(245,158,11,0.3)", label: "Band B (9-11)" },
    C: { bg: "rgba(239,68,68,0.12)", text: "#EF4444", border: "rgba(239,68,68,0.3)", label: "Band C (6-8)" },
    rejected: { bg: "rgba(100,100,100,0.12)", text: "#888", border: "rgba(100,100,100,0.3)", label: "Rejected (0-5)" },
  };

  const mvpAccents: Record<MVP, string> = {
    "deepreal": "var(--accent-deepreal)",
    "mental-health": "var(--accent-mentalhealth)",
    "religion-hub": "var(--accent-religionhub)",
  };

  return (
    <div>
      {/* Search + Filters Bar */}
      <div
        className="flex flex-wrap gap-3 mb-6"
        style={{ position: "sticky", top: "var(--navbar-height)", zIndex: 10, paddingTop: 12, paddingBottom: 12, background: "var(--bg-primary)" }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 flex-1"
          style={{
            minWidth: 200,
            padding: "8px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder={t({ en: "Search sources...", ar: "بحث في المصادر...", arEG: "بحث في المصادر..." })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "14px",
              width: "100%",
              fontFamily: "'Satoshi', sans-serif",
            }}
          />
        </div>

        {/* MVP Filter */}
        <select
          value={filterMVP}
          onChange={(e) => setFilterMVP(e.target.value as MVP | "all")}
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-primary)",
            fontSize: "13px",
            fontFamily: "'Satoshi', sans-serif",
            cursor: "pointer",
          }}
        >
          <option value="all">{t({ en: "All Modules", ar: "كل الوحدات", arEG: "كل الوحدات" })}</option>
          <option value="deepreal">DeepReal</option>
          <option value="mental-health">Mental Health</option>
          <option value="religion-hub">Religion Hub</option>
        </select>

        {/* Trust Band Filter */}
        <select
          value={filterBand}
          onChange={(e) => setFilterBand(e.target.value as TrustBand | "all")}
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-primary)",
            fontSize: "13px",
            fontFamily: "'Satoshi', sans-serif",
            cursor: "pointer",
          }}
        >
          <option value="all">{t({ en: "All Trust Bands", ar: "كل نطاقات الثقة", arEG: "كل نطاقات الثقة" })}</option>
          <option value="A">Band A (12-14)</option>
          <option value="B">Band B (9-11)</option>
          <option value="C">Band C (6-8)</option>
        </select>

        {/* Count */}
        <div
          className="flex items-center gap-1"
          style={{ padding: "8px 14px", fontSize: "13px", color: "var(--text-muted)" }}
        >
          <Filter size={14} />
          {filtered.length} {t({ en: "sources", ar: "مصدر", arEG: "مصدر" })}
        </div>
      </div>

      {/* Source Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((source) => {
          const band = bandColors[source.trustBand];
          const isExpanded = expandedId === source.id;

          return (
            <div
              key={source.id}
              className="glass-card"
              style={{
                padding: 0,
                overflow: "hidden",
                borderLeft: `3px solid ${source.mvp ? mvpAccents[source.mvp] : "var(--border-primary)"}`,
                transition: "all 0.2s ease",
              }}
            >
              {/* Main row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : source.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--text-primary)",
                  fontFamily: "'Satoshi', sans-serif",
                }}
              >
                {/* ID Badge */}
                <span
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-secondary)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  #{source.id}
                </span>

                {/* Name + Description */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{source.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {source.appUse}
                  </div>
                </div>

                {/* Trust Band Badge */}
                <span
                  className="badge"
                  style={{
                    background: band.bg,
                    color: band.text,
                    border: `1px solid ${band.border}`,
                    flexShrink: 0,
                  }}
                >
                  <Star size={10} style={{ marginRight: 3 }} />
                  Band {source.trustBand}
                </span>

                {/* Freshness Badge — §23.1 #12 */}
                {source.lastVerified && (() => {
                  const freshness = checkFreshness(source.lastVerified);
                  return (
                    <span
                      className="badge"
                      style={{
                        background: `${FRESHNESS_COLORS[freshness.status]}15`,
                        color: FRESHNESS_COLORS[freshness.status],
                        border: `1px solid ${FRESHNESS_COLORS[freshness.status]}30`,
                        flexShrink: 0,
                        fontSize: "10px",
                      }}
                    >
                      {freshness.status === "fresh" ? "✓" : freshness.status === "aging" ? "⏳" : freshness.status === "stale" ? "⚠" : "🚨"} {freshness.daysSince}d
                    </span>
                  );
                })()}

                {/* Expand arrow */}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div
                  style={{
                    padding: "0 18px 18px",
                    borderTop: "1px solid var(--border-subtle)",
                  }}
                >
                  {/* Why Trusted + App Use */}
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "12px 0", lineHeight: 1.6 }}>
                    <strong>{t({ en: "Why trusted:", ar: "لماذا موثوق:", arEG: "لماذا موثوق:" })}</strong> {source.whyTrusted}
                  </p>

                  {/* Tags Grid */}
                  <div
                    className="grid gap-2 mb-3"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", fontSize: "12px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Shield size={12} style={{ color: "var(--text-muted)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{t({ en: "Role:", ar: "الدور:", arEG: "الدور:" })}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{source.sourceRole.replace(/_/g, " ")}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <BookOpen size={12} style={{ color: "var(--text-muted)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{t({ en: "Evidence:", ar: "الدليل:", arEG: "الدليل:" })}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{source.evidenceLevel.replace(/_/g, " ")}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Globe size={12} style={{ color: "var(--text-muted)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{t({ en: "Jurisdiction:", ar: "الاختصاص:", arEG: "الاختصاص:" })}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{source.jurisdiction}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={12} style={{ color: "var(--text-muted)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{t({ en: "Verified:", ar: "تم التحقق:", arEG: "تم التحقق:" })}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{source.lastVerified}</span>
                    </div>
                  </div>

                  {/* URL Link */}
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--accent-cta)",
                        textDecoration: "none",
                        marginTop: 8,
                      }}
                    >
                      <ExternalLink size={13} />
                      {t({ en: "Visit Source", ar: "زيارة المصدر", arEG: "زيارة المصدر" })}
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            className="glass-card"
            style={{
              padding: "var(--space-2xl)",
              textAlign: "center",
            }}
          >
            <Search size={32} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
            <p style={{ color: "var(--text-muted)" }}>{t({ en: "No sources match your filters.", ar: "لا توجد مصادر مطابقة للتصفية.", arEG: "لا توجد مصادر مطابقة للتصفية." })}</p>
          </div>
        )}
      </div>
    </div>
  );
}
