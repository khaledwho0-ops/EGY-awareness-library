"use client";

import { Contrast, Eye, Palette } from "lucide-react";
import { THEME_OPTIONS, useTheme, type ResolvedTheme } from "./theme-provider";
import { useRTL } from "./rtl-provider";

const RECOMMENDED_THEMES: ResolvedTheme[] = [
  "steel-azure",
  "light",
  "terracotta",
  "icy-gunmetal",
];

function themeLabel(value: ResolvedTheme) {
  return THEME_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function VisualClarityPanel() {
  const { isRTL } = useRTL();
  const {
    resolvedTheme,
    contrastMode,
    isAutoCycling,
    setTheme,
    setContrastMode,
    startAutoCycle,
    stopAutoCycle,
  } = useTheme();

  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)", marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Eye size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{isRTL ? "وضوح بصري فوري" : "Instant visual clarity"}</strong>
          </div>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            {isRTL
              ? "عدّل السمة والتباين من داخل مسار العمل نفسه. الهدف ليس التجميل، بل خفض إجهاد العين وتقليل أخطاء القراءة تحت الضغط."
              : "Adjust theme and contrast inside the workflow itself. The goal is not decoration; it is lower eye strain and fewer reading errors under pressure."}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "start" }}>
          <span className="badge">
            {isRTL ? "السمة الحالية" : "Current theme"}: {themeLabel(resolvedTheme)}
          </span>
          <span className="badge">
            {isRTL ? "التباين" : "Contrast"}: {contrastMode === "high" ? (isRTL ? "عالٍ" : "High") : isRTL ? "عادي" : "Normal"}
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 14 }}>
        {RECOMMENDED_THEMES.map((theme) => {
          const active = resolvedTheme === theme;
          return (
            <button
              key={theme}
              type="button"
              className={active ? "btn-primary" : "btn-secondary"}
              onClick={() => setTheme(theme)}
              style={{ justifyContent: "space-between" }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Palette size={14} />
                {themeLabel(theme)}
              </span>
              <span style={{ fontSize: 12 }}>
                {active ? (isRTL ? "نشطة" : "Active") : isRTL ? "فعّل" : "Use"}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <button
          type="button"
          className={contrastMode === "normal" ? "btn-primary" : "btn-secondary"}
          onClick={() => setContrastMode("normal")}
        >
          <Contrast size={14} />
          {isRTL ? "تباين عادي" : "Normal contrast"}
        </button>
        <button
          type="button"
          className={contrastMode === "high" ? "btn-primary" : "btn-secondary"}
          onClick={() => setContrastMode("high")}
        >
          <Contrast size={14} />
          {isRTL ? "تباين عالٍ" : "High contrast"}
        </button>
        <button
          type="button"
          className={isAutoCycling ? "btn-primary" : "btn-secondary"}
          onClick={() => {
            if (isAutoCycling) {
              stopAutoCycle();
              return;
            }
            startAutoCycle();
          }}
        >
          <Palette size={14} />
          {isAutoCycling ? (isRTL ? "أوقف التنقل" : "Stop cycling") : isRTL ? "جرّب كل السمات" : "Try all themes"}
        </button>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
        {isRTL
          ? "عندما تكون تحت ضغط أو سرعة، ارفع التباين أولاً. وللقراءة الطويلة اختر Light Academic أو Terracotta. وللتحقق الليلي القوي اختر Steel Azure أو Icy Gunmetal."
          : "Under speed or stress, raise contrast first. For long reading, use Light Academic or Terracotta. For hard verification work at night, use Steel Azure or Icy Gunmetal."}
      </p>
    </div>
  );
}
