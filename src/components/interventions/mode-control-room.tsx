"use client";

import {
  Activity,
  Brain,
  Clock3,
  Compass,
  Layers3,
  ListChecks,
  Microscope,
  Route,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  DAY_SCHEDULE,
  getModesForDay,
  INTERVENTION_MODES,
} from "@/data/interventions/intervention-schedule";
import { useRTL } from "@/components/shared/rtl-provider";

type MVP = "deepreal" | "mental-health" | "religion-hub";

const ICONS: Record<number, React.ReactNode> = {
  1: <Compass size={16} />,
  2: <ShieldAlert size={16} />,
  3: <Activity size={16} />,
  4: <ListChecks size={16} />,
  5: <Layers3 size={16} />,
  6: <Microscope size={16} />,
  7: <Route size={16} />,
  8: <Brain size={16} />,
  9: <Sparkles size={16} />,
  10: <Route size={16} />,
  11: <Compass size={16} />,
  12: <Brain size={16} />,
  13: <Sparkles size={16} />,
  14: <ListChecks size={16} />,
  15: <Activity size={16} />,
  16: <ShieldAlert size={16} />,
  17: <Clock3 size={16} />,
};

const ACCENTS: Record<MVP, string> = {
  deepreal: "var(--accent-deepreal)",
  "mental-health": "var(--accent-mentalhealth)",
  "religion-hub": "var(--accent-religionhub)",
};

interface ModeControlRoomProps {
  mvp?: MVP;
  currentDay?: number;
  title?: string;
  compact?: boolean;
}

export function ModeControlRoom({
  mvp,
  currentDay = 1,
  title = "Intervention Control Room",
  compact = false,
}: ModeControlRoomProps) {
  const activeModes = getModesForDay(currentDay, mvp).slice(0, compact ? 4 : 8);
  const accent = mvp ? ACCENTS[mvp] : "var(--accent-cta)";
  const visibleRegistry = INTERVENTION_MODES.filter((mode) =>
    mvp ? mode.mvps.includes(mvp) : true,
  );
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <section
      className="glass-card"
      style={{
        padding: compact ? "var(--space-lg)" : "var(--space-xl)",
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-caption)",
              marginBottom: 4,
            }}
          >
            Framework §18 in live UI
          </div>
          <h3 style={{ fontSize: "var(--font-h4)", marginBottom: 8 }}>{title}</h3>
          <p style={{ maxWidth: 640, fontSize: 14, color: "var(--text-muted)", fontFamily: ff }}>
            {t({ en: "The project does not rely on exercises alone. These supporting modes shape pause, source exposure, reflection, boundaries, and follow-through across the 14-day journey.", ar: "المشروع لا يعتمد على التمارين وحدها. هذه الأوضاع الداعمة تشكل التوقف والتعرض للمصادر والتأمل عبر رحلة الـ 14 يوماً.", arEG: "المشروع لا يعتمد على التمارين وحدها. هذه الأوضاع الداعمة تشكل التوقف والتعرض للمصادر والتأمل عبر رحلة الـ 14 يوماً." })}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 6,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {t({ en: "Day", ar: "اليوم", arEG: "اليوم" })} <strong style={{ color: "var(--text-primary)" }}>{currentDay}</strong> {t({ en: "active stack", ar: "المكدس النشط", arEG: "المكدس النشط" })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {activeModes.map((mode) => (
              <span
                key={mode.id}
                className="badge"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                {mode.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 18,
        }}
      >
        {activeModes.map((mode) => (
          <article
            key={mode.id}
            style={{
              padding: "14px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
                color: accent,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: `${accent}15`,
                }}
              >
                {ICONS[mode.id] ?? <Layers3 size={16} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                  {mode.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-caption)" }}>
                  {mode.duration} • {mode.cadence}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              {mode.description}
            </p>
          </article>
        ))}
      </div>

      {!compact && (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in srgb, var(--accent-cta) 6%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent-cta) 22%, transparent)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-caption)",
              marginBottom: 8,
            }}
          >
            {t({ en: "Cadence map", ar: "خريطة الإيقاع", arEG: "خريطة الإيقاع" })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 10,
            }}
          >
            {Object.entries(DAY_SCHEDULE).map(([range, summary]) => (
              <div key={range}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>
                  {a ? `الأيام ${range}` : `Days ${range}`}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>
                  {summary}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-caption)", marginTop: 12 }}>
            {a ? `${visibleRegistry.length} وضع إطار متابع لهذا النطاق.` : `${visibleRegistry.length} framework modes tracked for this scope.`}
          </div>
        </div>
      )}
    </section>
  );
}
