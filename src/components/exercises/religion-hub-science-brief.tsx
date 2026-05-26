"use client";

import {
  BookMarked,
  ExternalLink,
  Shield,
  Sparkles,
  Target,
  Waypoints,
} from "lucide-react";

const RESEARCH_PILLARS = [
  {
    title: "What this module is measuring",
    icon: <Target size={18} />,
    body:
      "Religion Hub measures coping style, boundaries, and meaning-making patterns. It is not ranking religiosity and it is not issuing theology. The framework target is healthier coping, especially higher positive coping without driving harmful guilt or avoidance.",
    detail:
      "That is why the page keeps repeating reflection-only scope and separates psychological support from formal religious guidance.",
    accent: "var(--accent-religionhub)",
  },
  {
    title: "Why positive coping can help",
    icon: <Sparkles size={18} />,
    body:
      "Positive religious coping can support resilience through meaning, support, gratitude, benevolent reappraisal, and connection. The app operationalizes those paths as structured reflection instead of vague inspiration.",
    detail:
      "At the same time, it treats negative coping, scrupulosity pressure, and spiritual bypassing as patterns to notice early rather than as proof of moral failure.",
    accent: "var(--accent-cta)",
  },
  {
    title: "Why moderation and boundaries matter",
    icon: <Shield size={18} />,
    body:
      "A strong Religion Hub must route users to the right authority. The app now distinguishes moderation reference, formal guidance, and psychological care so users do not confuse the product with a fatwa engine or a therapy replacement.",
    detail:
      "That boundary is a core ethics and safety requirement from the framework, not a cosmetic disclaimer.",
    accent: "var(--accent-indigo)",
  },
  {
    title: "What the site applies in practice",
    icon: <Waypoints size={18} />,
    body:
      "Religion Hub now applies real decision support: Source-of-the-Day reference memory, official moderation routes, intervention cadence, expert voice, scenario-based boundary training, and decision-tree routing for distress, guilt, and formal-guidance needs.",
    detail:
      "The result is a safer, more defensible psychology-of-religion product instead of a generic reflection page.",
    accent: "var(--accent-blue)",
  },
];

const OFFICIAL_SOURCES = [
  {
    label: "Dar al-Ifta Egypt",
    url: "https://www.dar-alifta.org/en/about/history-of-dar-alifta",
    stat: "Official guidance institution",
    description:
      "Official Dar al-Ifta page confirming the institution’s governmental, non-profit role, moderation mission, and contact route including 107 inside Egypt.",
  },
  {
    label: "Al-Azhar Observatory",
    url: "https://azhar.eg/en/Articles/Observatory",
    stat: "Moderation and anti-extremism reference",
    description:
      "Official Al-Azhar Observatory hub used here as a moderation and anti-extremism reference body, not as a replacement for personal counseling.",
  },
  {
    label: "APA: Belief systems and religion",
    url: "https://www.apa.org/topics/belief-systems-religion/index",
    stat: "Psychology framing",
    description:
      "APA psychology-facing resource grounding the app’s religion-and-wellbeing framing in psychological study rather than sectarian instruction.",
  },
  {
    label: "NIH/PMC: Religion and mental health",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3705681/",
    stat: "Primary literature mirror",
    description:
      "Peer-reviewed review article mirrored on NIH’s PMC describing possible mental-health benefits and risks, including positive and negative coping pathways.",
  },
];

const TRUSTED_ROUTES = [
  {
    title: "I need formal religious guidance",
    action: "Dar al-Ifta 107",
    detail:
      "Use this route when the question is a formal religious ruling or official consultation need beyond the scope of reflection exercises.",
    href: "tel:107",
  },
  {
    title: "I need moderation or anti-extremism context",
    action: "Open Al-Azhar Observatory",
    detail:
      "Use Al-Azhar’s moderation and anti-extremism material when the issue is manipulation, hate framing, or pressure dressed up as religion.",
    href: "https://azhar.eg/en/Articles/Observatory",
  },
  {
    title: "I need psychological support too",
    action: "Keep faith and care together",
    detail:
      "The framework explicitly rejects spiritual bypassing. If distress is clinical or persistent, combine spiritual support with mental-health care.",
    href: "/mental-health",
  },
];

export function ReligionHubScienceBrief() {
  return (
    <section
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        borderTop: "3px solid var(--accent-religionhub)",
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
        <h3 style={{ marginBottom: 10 }}>How this module supports wellbeing without crossing its scope</h3>
        <p style={{ maxWidth: 780, fontSize: 15, color: "var(--text-muted)" }}>
          Religion Hub now explains the coping science and the safety boundaries directly in the
          interface. Users can see when the page is for reflection, when official moderation sources
          matter, and when formal guidance or mental-health support should take over.
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
          background: "color-mix(in srgb, var(--accent-religionhub) 8%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent-religionhub) 22%, transparent)",
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
          Scope and route logic
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
                  background: "var(--accent-religionhub-surface)",
                  color: "var(--accent-religionhub)",
                  border: "1px solid rgba(139,92,246,0.2)",
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
          {OFFICIAL_SOURCES.map((source) => (
            <a
              key={source.label}
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
                  background: "var(--accent-religionhub-surface)",
                  color: "var(--accent-religionhub)",
                  border: "1px solid rgba(139,92,246,0.2)",
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
        <BookMarked size={14} style={{ color: "var(--accent-religionhub)" }} />
        This page now treats moderation, formal guidance, and psychological care as distinct user
        routes instead of one generic religious-wellbeing block.
      </div>
    </section>
  );
}
