import { Languages } from "lucide-react";

interface BilingualTermCardProps {
  englishTerm: string;
  arabicTerm: string;
  definition: string;
  definitionAr: string;
  source?: string;
}

export function BilingualTermCard({
  englishTerm,
  arabicTerm,
  definition,
  definitionAr,
  source,
}: BilingualTermCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "16px",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        color: "var(--text-primary)",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Languages size={18} style={{ color: "var(--accent-cta)" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>
            {englishTerm}
          </span>
        </div>
        <div style={{ fontSize: "18px", fontWeight: 700, textAlign: "right" }} dir="rtl">
          {arabicTerm}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h6 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 4 }}>
            English Definition
          </h6>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            {definition}
          </p>
        </div>
        <div style={{ textAlign: "right" }} dir="rtl">
          <h6 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 4 }}>
            التعريف العربي
          </h6>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            {definitionAr}
          </p>
        </div>
      </div>

      {source && (
        <div style={{ marginTop: 8, fontSize: "11px", color: "var(--text-caption)", borderTop: "1px solid var(--border-subtle)", paddingTop: 8 }}>
          <span style={{ fontWeight: 600 }}>Semantic Anchor:</span> {source}
        </div>
      )}
    </div>
  );
}
