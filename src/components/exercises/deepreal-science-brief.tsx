"use client";

import { ExternalLink, Microscope, ShieldCheck, Sparkles, Target } from "lucide-react";

const RESEARCH_PILLARS = [
  {
    title: "What DeepReal is measuring",
    icon: <Target size={18} />,
    body:
      "DeepReal is not only a set of exercises. It trains veracity discernment and then checks whether that discernment changes using the Misinformation Susceptibility Test (MIST), which Cambridge researchers validated across multiple studies and national samples.",
    detail:
      "The MIST framework separates real-news detection, fake-news detection, distrust, and naivete so the app can talk about calibration, not just a raw score.",
    accent: "var(--accent-deepreal)",
  },
  {
    title: "Why prebunking works",
    icon: <ShieldCheck size={18} />,
    body:
      "Cambridge's misinformation-inoculation work shows that exposing people to weakened versions of manipulation tactics can build resistance before a false claim fully lands. DeepReal applies that logic by teaching tactics, pause points, and source-check routines before belief or sharing.",
    detail:
      "This is why the project emphasizes friction, reflection, and tactic recognition instead of waiting until after someone has already accepted a claim.",
    accent: "var(--accent-cta)",
  },
  {
    title: "Why SIFT and lateral reading matter",
    icon: <Microscope size={18} />,
    body:
      "SIFT and lateral reading shift the user away from staring harder at a single post and toward checking who is behind it, what other sources say, and where the claim came from originally.",
    detail:
      "That move is central to the app's design: source compare, evidence ladder, and archive replay logic all reinforce external verification over surface-level trust.",
    accent: "var(--accent-religionhub)",
  },
  {
    title: "What the site does in practice",
    icon: <Sparkles size={18} />,
    body:
      "The website now applies the science as interaction design: theme-coded attention, confidence logging, evidence ladders, source comparison, bias reflection, and after-action review are all presented as part of the DeepReal training environment.",
    detail:
      "The goal is to turn the research logic into repeatable user behavior, not to leave it trapped in methodology notes.",
    accent: "var(--accent-mentalhealth)",
  },
];

const OFFICIAL_SOURCES = [
  {
    label: "Cambridge: Bad News game",
    url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation",
    stat: "21% average drop",
    description:
      "University of Cambridge summary of the Bad News inoculation study, reporting an average reduction in perceived reliability of fake news after gameplay.",
  },
  {
    label: "Cambridge: Go Viral!",
    url: "https://www.cam.ac.uk/stories/goviral",
    stat: "5-7 minute intervention",
    description:
      "Official Cambridge explainer for the follow-on game showing how prebunking was adapted into a shorter public intervention.",
  },
  {
    label: "Cambridge: MIST overview",
    url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test",
    stat: "8,000+ participants",
    description:
      "Official University of Cambridge story explaining the MIST, the validation work behind it, and how susceptibility differs across online behavior patterns.",
  },
  {
    label: "Cambridge repository: MIST paper",
    url: "https://www.repository.cam.ac.uk/handle/1810/366674",
    stat: "MIST-20 / MIST-16 / MIST-8",
    description:
      "Repository copy of the peer-reviewed article detailing the psychometric development and intended research uses of the MIST variants.",
  },
  {
    label: "Social Decision-Making Lab",
    url: "https://www.sdmlab.psychol.cam.ac.uk/research/bad-news-game",
    stat: "Theory-driven intervention",
    description:
      "Cambridge lab page connecting the Bad News game to psychological inoculation and linking to the open publication trail.",
  },
  {
    label: "Digital Inquiry Group",
    url: "https://www.digitalinquirygroup.org/sift/",
    stat: "SIFT workflow",
    description:
      "Primary source for the SIFT method and lateral reading teaching approach that underpins the DeepReal verification flow.",
  },
];

export function DeeprealScienceBrief() {
  return (
    <section
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        borderTop: "3px solid var(--accent-deepreal)",
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
        <h3 style={{ marginBottom: 10 }}>What this module is, why it works, and how it is tested</h3>
        <p style={{ maxWidth: 760, fontSize: 15, color: "var(--text-muted)" }}>
          DeepReal now explains the science of misinformation resistance directly in the UI. That
          means users can see the mechanism, the measurement model, and the official-source evidence
          behind the training flow instead of only seeing a test name or a generic claim.
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
          background: "color-mix(in srgb, var(--accent-cta) 7%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent-cta) 22%, transparent)",
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
          Application logic
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Measure</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Baseline batteries and confidence logging quantify how users are judging claims before and after training.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Teach</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Exercises teach tactics, not just verdicts, so the user learns how manipulation works across many claims.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Reinforce</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Intervention modes like evidence ladder, source compare, and after-action review convert insight into a repeatable habit.
            </div>
          </div>
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
                  background: "var(--accent-deepreal-surface)",
                  color: "var(--accent-deepreal)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  marginBottom: 8,
                }}
              >
                {source.stat}
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {source.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
