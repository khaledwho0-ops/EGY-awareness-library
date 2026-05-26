"use client";

import {
  ExternalLink,
  HeartPulse,
  LifeBuoy,
  Microscope,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import {
  EGYPT_CRISIS_CONTACTS,
  MOHP_MENTAL_HEALTH_PLATFORM_URL,
  OFFICIAL_MENTAL_HEALTH_GUIDANCE,
} from "@/data/directory/official-support";

const RESEARCH_PILLARS = [
  {
    title: "What this module is measuring",
    icon: <Microscope size={18} />,
    body:
      "Mental Health does not try to diagnose the user. It trains literacy, recognition, safer language, and help-seeking judgment, then evaluates change through MHLS and help-seeking intent patterns rather than symptom labels alone.",
    detail:
      "That keeps the module academically aligned with the framework and ethically aligned with the boundary warning layer: education, not diagnosis.",
    accent: "var(--accent-mentalhealth)",
  },
  {
    title: "Why naming feelings helps",
    icon: <HeartPulse size={18} />,
    body:
      "The module starts with affect labeling because emotional vocabulary slows panic, separates sensation from story, and gives the user a safer first step than impulsive self-diagnosis or avoidance.",
    detail:
      "In practice, the app turns this into short exercises, reflection prompts, and explicit wording boundaries about what a feeling means and what it does not mean.",
    accent: "var(--accent-cta)",
  },
  {
    title: "Why literacy changes behavior",
    icon: <Stethoscope size={18} />,
    body:
      "Mental health literacy improves when users can distinguish signs from diagnoses, myths from evidence, and self-care from professional treatment. That distinction is what reduces stigma and makes help-seeking more realistic.",
    detail:
      "The page now routes users to crisis support, official education, and next-step care instead of leaving them with only awareness slogans.",
    accent: "var(--accent-emerald)",
  },
  {
    title: "What the site applies in practice",
    icon: <ShieldAlert size={18} />,
    body:
      "This MVP now applies the framework as behavior design: a persistent crisis rail, Source-of-the-Day memory, intervention-mode cadence, expert voice, decision-tree routing, and scenario-based boundary training.",
    detail:
      "The goal is repeatable support navigation behavior, not passive reading.",
    accent: "var(--accent-blue)",
  },
];

const TRUSTED_ROUTES = [
  {
    title: "I need urgent help in Egypt",
    action: `Call ${EGYPT_CRISIS_CONTACTS.mentalHealthShortCode}, ${EGYPT_CRISIS_CONTACTS.mentalHealthTollFree}, or ${EGYPT_CRISIS_CONTACTS.ambulance}`,
    detail:
      `${EGYPT_CRISIS_CONTACTS.mentalHealthShortCode} is the main Egyptian mental-health short code. ${EGYPT_CRISIS_CONTACTS.mentalHealthTollFree} is the published toll-free backup. Use ${EGYPT_CRISIS_CONTACTS.ambulance} for immediate medical emergency escalation.`,
    href: `tel:${EGYPT_CRISIS_CONTACTS.mentalHealthShortCode}`,
  },
  {
    title: "I want evidence-based mental-health guidance",
    action: "Open WHO / NIMH first",
    detail:
      "Use official guidance before social posts, influencer advice, or anonymous symptom lists.",
    href: OFFICIAL_MENTAL_HEALTH_GUIDANCE[0]?.url ?? "https://www.who.int/health-topics/mental-health",
  },
  {
    title: "I want the next safe step, not a diagnosis",
    action: "Use the MoHP platform",
    detail:
      "The platform is positioned here as the next-step route when literacy work turns into a real support need.",
    href: MOHP_MENTAL_HEALTH_PLATFORM_URL,
  },
];

export function MentalHealthScienceBrief() {
  return (
    <section
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        borderTop: "3px solid var(--accent-mentalhealth)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-caption)",
            marginBottom: 6,
          }}
        >
          Scientific explanation layer
        </div>
        <h3 style={{ marginBottom: 10 }}>What this module teaches, what it does not do, and why it works</h3>
        <p style={{ maxWidth: 780, fontSize: 15, color: "var(--text-muted)" }}>
          Mental Health now makes the mechanism visible inside the product. Users can see how
          literacy, stigma reduction, and support navigation fit together, then act on official
          routes instead of leaving with only general advice.
        </p>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: 18 }}
      >
        {RESEARCH_PILLARS.map((pillar) => (
          <article
            key={pillar.title}
            style={{
              padding: "16px 18px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: `${pillar.accent}15`,
                color: pillar.accent,
                marginBottom: 12,
              }}
            >
              {pillar.icon}
            </div>
            <h4 style={{ fontSize: 16, marginBottom: 8 }}>{pillar.title}</h4>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 8 }}>
              {pillar.body}
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
              {pillar.detail}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          padding: "16px 18px",
          borderRadius: "var(--radius-md)",
          background: "color-mix(in srgb, var(--accent-mentalhealth) 8%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent-mentalhealth) 22%, transparent)",
          marginBottom: 18,
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
          Trusted route logic
        </div>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {TRUSTED_ROUTES.map((route) => (
            <a
              key={route.title}
              href={route.href}
              target={route.href.startsWith("http") ? "_blank" : undefined}
              rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="no-underline"
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                {route.title}
              </div>
              <div
                className="badge"
                style={{
                  background: "var(--accent-mentalhealth-surface)",
                  color: "var(--accent-mentalhealth)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  marginBottom: 8,
                }}
              >
                {route.action}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {route.detail}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-caption)",
            marginBottom: 10,
          }}
        >
          Official and primary references
        </div>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {OFFICIAL_MENTAL_HEALTH_GUIDANCE.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-secondary)",
                color: "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                  {source.label}
                </div>
                <ExternalLink size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              </div>
              <div
                className="badge"
                style={{
                  background: "var(--accent-mentalhealth-surface)",
                  color: "var(--accent-mentalhealth)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  marginBottom: 8,
                }}
              >
                {source.stat}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {source.description}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: "var(--text-muted)",
        }}
      >
        <LifeBuoy size={14} style={{ color: "var(--accent-mentalhealth)" }} />
        This page now links literacy work to support action, which is the framework’s required move
        from explanation into safe application.
      </div>
    </section>
  );
}
