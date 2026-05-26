"use client";

import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Search,
  AlertTriangle,
  RefreshCw,
  Lightbulb,
  Eye,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";
import type { KeyHunterEntry } from "@/types";
import { KEYHUNTER_LAYERS } from "@/types/keyhunter";
import { useRTL } from "@/components/shared/rtl-provider";

interface KeyHunterDrawerProps {
  entry: KeyHunterEntry;
  onClose?: () => void;
}

/**
 * KeyHunter Drawer Component — Framework §7
 *
 * Displays all 7 layers of a KeyHunter entry:
 * 1. Core Keywords (blue) — 3-5 terms
 * 2. Expert Keywords (purple) — 3-5 terms
 * 3. Hidden Terms (pink) — 2-3 terms
 * 4. Research Phrases (green) — 2-3 phrases
 * 5. Threat Keywords (red) — 2-3 terms
 * 6. Confusion Words (amber) — 2-3 explanations
 * 7. Prompt Suggestions (cyan) — 1-2 ready-to-use prompts
 *
 * Glassmorphism panel that slides in from the right (DESIGN.txt §1.1)
 */
export function KeyHunterDrawer({ entry }: KeyHunterDrawerProps) {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(
    new Set(["coreKeywords"])
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const toggleLayer = (key: string) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const layerIcons: Record<string, React.ReactNode> = {
    coreKeywords: <BookOpen size={14} />,
    expertKeywords: <GraduationCap size={14} />,
    hiddenTerms: <Eye size={14} />,
    researchPhrases: <Search size={14} />,
    threatKeywords: <AlertTriangle size={14} />,
    confusionWords: <RefreshCw size={14} />,
    promptSuggestions: <Lightbulb size={14} />,
  };

  const layerColors: Record<string, string> = {
    coreKeywords: "#3B82F6",
    expertKeywords: "#8B5CF6",
    hiddenTerms: "#EC4899",
    researchPhrases: "#10B981",
    threatKeywords: "#EF4444",
    confusionWords: "#F59E0B",
    promptSuggestions: "#06B6D4",
  };

  const getLayerValues = (key: string): string[] => {
    return (entry as Record<string, unknown>)[key] as string[] || [];
  };

  return (
    <div
      className="glass-strong"
      style={{
        width: "100%",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "var(--space-lg)",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="badge"
            style={{
              background: "rgba(59,130,246,0.12)",
              color: "#3B82F6",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            KeyHunter
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-caption)" }}>
            {entry.mvp.toUpperCase()} • {entry.id}
          </span>
        </div>
        <h3 style={{ fontSize: "18px", marginBottom: 4 }}>{entry.topic}</h3>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {entry.source}
        </p>
      </div>

      {/* 7 Layers */}
      <div style={{ padding: "var(--space-sm)" }}>
        {KEYHUNTER_LAYERS.map((layer) => {
          const values = getLayerValues(layer.key);
          const isExpanded = expandedLayers.has(layer.key);
          const color = layerColors[layer.key];

          return (
            <div key={layer.key} style={{ marginBottom: 2 }}>
              {/* Layer Header */}
              <button
                onClick={() => toggleLayer(layer.key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "var(--radius-sm)",
                  textAlign: "left",
                  color: "var(--text-primary)",
                  fontFamily: "'Satoshi', sans-serif",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Layer color indicator */}
                <div
                  style={{
                    width: 4,
                    height: 24,
                    borderRadius: 2,
                    background: color,
                    flexShrink: 0,
                  }}
                />

                {/* Icon */}
                <span style={{ color, flexShrink: 0 }}>
                  {layerIcons[layer.key]}
                </span>

                {/* Label */}
                <span style={{ flex: 1, fontSize: "13px", fontWeight: 600 }}>
                  {layer.icon} {layer.label}
                </span>

                {/* Count badge */}
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-caption)",
                    fontWeight: 500,
                  }}
                >
                  {values.length}
                </span>

                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Layer Content */}
              {isExpanded && (
                <div
                  style={{
                    padding: "4px 14px 12px 42px",
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    {values.map((value, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 group"
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--bg-secondary)",
                          fontSize: "13px",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span style={{ flex: 1, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {value}
                        </span>
                        <button
                          onClick={() => copyToClipboard(value, `${layer.key}-${i}`)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-caption)",
                            opacity: 0.5,
                            transition: "opacity 0.15s",
                            padding: 6,
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                          aria-label="Copy to clipboard"
                        >
                          {copiedId === `${layer.key}-${i}` ? (
                            <Check size={12} style={{ color: "var(--color-success)" }} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "var(--space-sm) var(--space-lg)",
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "11px",
          color: "var(--text-caption)",
        }}
      >
        {t({ en: "Last updated: ", ar: "آخر تحديث: ", arEG: "آخر تحديث: " })}{entry.lastUpdated}
      </div>
    </div>
  );
}

/**
 * Compact KeyHunter Card — used inline within exercises
 */
export function KeyHunterCard({ entry }: { entry: KeyHunterEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full"
        style={{
          padding: "12px 14px",
          minHeight: 48,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--text-primary)",
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          transition: "all 0.2s ease",
        }}
      >
        <BookOpen size={14} style={{ color: "#3B82F6" }} />
        <span style={{ flex: 1 }}>{t({ en: "KeyHunter: ", ar: "صياد المفاتيح: ", arEG: "صياد المفاتيح: " })}{entry.topic}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div style={{ marginTop: 8 }}>
          <KeyHunterDrawer entry={entry} />
        </div>
      )}
    </div>
  );
}
