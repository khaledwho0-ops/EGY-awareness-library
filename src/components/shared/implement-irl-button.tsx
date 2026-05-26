"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Lightbulb, X, BookOpen, Beaker, Footprints } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { getIRLContent } from "@/data/irl/irl-knowledge-store";

interface ImplementIRLButtonProps {
  /** Key to look up in the IRL knowledge store */
  irlKey: string;
  /** Optional label override */
  label?: string;
  /** Compact mode — icon-only button */
  compact?: boolean;
  /** Accent color */
  accent?: string;
}

export function ImplementIRLButton({ irlKey, label, compact = false, accent = "var(--accent-cta)" }: ImplementIRLButtonProps) {
  const { isRTL, t } = useRTL();
  const [open, setOpen] = useState(false);
  const content = getIRLContent(irlKey);

  const buttonLabel = label || t({ en: "Apply IRL", ar: "نفّذ في الحياة", arEG: "نفّذ في الحياة" });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={buttonLabel}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: compact ? "4px 8px" : "6px 12px",
          borderRadius: 999,
          border: `1px solid ${accent}40`,
          background: `${accent}10`,
          color: accent,
          fontSize: compact ? 11 : 12,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = `${accent}22`;
          (e.target as HTMLButtonElement).style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = `${accent}10`;
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        <Lightbulb size={compact ? 12 : 14} />
        {!compact && buttonLabel}
      </button>

      {/* ═══ MODAL via Portal — avoids parent overflow:hidden clipping ═══ */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            style={{
              background: "var(--bg-card, #1a1a2e)",
              borderRadius: 20,
              border: "1px solid var(--border-primary, rgba(148,163,184,0.15))",
              maxWidth: 600,
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
              padding: 0,
              direction: isRTL ? "rtl" : "ltr",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px 16px",
                borderBottom: "1px solid var(--border-primary, rgba(148,163,184,0.12))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                background: `linear-gradient(135deg, ${accent}08, transparent)`,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Lightbulb size={18} style={{ color: accent }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent }}>
                    {t({ en: "Implement in Real Life", ar: "نفّذ في الحياة", arEG: "نفّذ في الحياة" })}
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, color: "var(--text-primary, #e2e8f0)" }}>
                  {isRTL ? content.titleAr : content.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  background: "var(--bg-secondary, rgba(30,41,59,0.8))",
                  border: "1px solid var(--border-primary, rgba(148,163,184,0.15))",
                  borderRadius: 10,
                  padding: 8,
                  cursor: "pointer",
                  color: "var(--text-muted, #94a3b8)",
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Real-Life Steps */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Footprints size={16} style={{ color: "var(--color-success, #10b981)" }} />
                  <strong style={{ fontSize: 14, color: "var(--text-primary, #e2e8f0)" }}>
                    {t({ en: "Real-Life Steps", ar: "خطوات واقعية", arEG: "خطوات واقعية" })}
                  </strong>
                </div>
                <ol style={{ margin: 0, paddingInlineStart: 20 }}>
                  {content.steps.map((step, i) => (
                    <li key={i} style={{ color: "var(--text-secondary, #cbd5e1)", lineHeight: 1.7, marginBottom: 8, fontSize: 14 }}>
                      {isRTL ? step.ar : step.en}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Scientific Methods */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Beaker size={16} style={{ color: accent }} />
                <strong style={{ fontSize: 14, color: "var(--text-primary, #e2e8f0)" }}>
                  {t({ en: "3 Scientific Methods", ar: "3 أساليب علمية", arEG: "3 أساليب علمية" })}
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {content.methods.map((method, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: "var(--bg-secondary, rgba(30,41,59,0.6))",
                      border: "1px solid var(--border-primary, rgba(148,163,184,0.1))",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: `${accent}20`, color: accent,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800,
                      }}>
                        {i + 1}
                      </span>
                      <strong style={{ fontSize: 13, color: "var(--text-primary, #e2e8f0)" }}>
                        {isRTL ? method.nameAr : method.nameEn}
                      </strong>
                    </div>
                    <p style={{ color: "var(--text-secondary, #cbd5e1)", fontSize: 13, lineHeight: 1.6, margin: "0 0 8px" }}>
                      {isRTL ? method.descAr : method.descEn}
                    </p>
                    <div style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.12)",
                      fontSize: 12,
                      color: "var(--color-success, #10b981)",
                      marginBottom: method.source ? 8 : 0,
                    }}>
                      <strong>✦ {t({ en: "Exercise:", ar: "التمرين:", arEG: "التمرين:" })}</strong>{" "}
                      {isRTL ? method.exerciseAr : method.exerciseEn}
                    </div>
                    {method.source && (
                      <div style={{ fontSize: 11, color: "var(--text-caption, #64748b)", marginTop: 4 }}>
                        <BookOpen size={10} style={{ display: "inline", marginInlineEnd: 4 }} />
                        {method.source}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
