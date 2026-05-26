import type { CSSProperties } from "react";
import Link from "next/link";
import { BrainCircuit, Quote, ShieldCheck, Target } from "lucide-react";
import { VERIFIED_QUOTES } from "@/data/research/verified-quotes";
import {
  COGNITION_BIAS_MAP,
  EGYPT_MISINFORMATION_PATTERNS,
  PROJECT_VISION_PILLARS,
  VISION_RESPONSE_LAYERS,
} from "@/data/vision/project-vision-framework";

const deeprealQuotes = VERIFIED_QUOTES.filter((quote) => quote.lens === "deepreal");

const cardStyle: CSSProperties = {
  border: "1px solid color-mix(in srgb, var(--border-primary) 82%, transparent)",
  borderRadius: 24,
  padding: 24,
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 92%, white 8%) 0%, color-mix(in srgb, var(--bg-card) 96%, transparent) 100%)",
  boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
};

export default function ProjectVisionPage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg) var(--space-2xl)" }}>
        <section
          style={{
            ...cardStyle,
            marginBottom: 28,
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-cta) 16%, transparent) 0%, transparent 34%), linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 96%, white 4%) 0%, color-mix(in srgb, var(--bg-card) 98%, transparent) 100%)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <BrainCircuit size={30} style={{ color: "var(--accent-cta)" }} />
            <span
              style={{
                borderRadius: 999,
                padding: "6px 12px",
                background: "color-mix(in srgb, var(--accent-cta) 14%, transparent)",
                color: "var(--accent-cta)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              Chunk 7
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)", marginBottom: 14 }}>
            <span className="text-gradient">Project Vision & Cognition Awareness Framework</span>
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 960, lineHeight: 1.8 }}>
            This route turns the project vision into a concrete cognitive-defense map: the exact biases the platform
            targets, the Egyptian misinformation patterns that activate them, and the product responses designed to
            interrupt harmful sharing behavior before it scales.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
              marginTop: 24,
            }}
          >
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>14</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Named bias targets</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                Each one is mapped to a specific Egyptian rumor behavior, not a generic media-literacy slogan.
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>8</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Verified expert quotes</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                The quote bank is reused directly from the verified DeepReal research set already carried in the app.
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>3</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Trust lenses</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                DeepReal, Mental Hub, and Religion Hub cooperate instead of treating every misinformation claim as a
                purely technical fact-check.
              </div>
            </div>
          </div>
        </section>

        <section id="vision-principles" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Target size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Vision Principles</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {PROJECT_VISION_PILLARS.map((pillar) => (
              <article key={pillar.id} style={cardStyle}>
                <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 8 }}>{pillar.titleAr}</div>
                <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>{pillar.title}</h3>
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.8 }}>{pillar.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="egypt-patterns" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <ShieldCheck size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Egyptian Pattern Map</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
            {EGYPT_MISINFORMATION_PATTERNS.map((pattern) => (
              <article key={pattern.id} style={cardStyle}>
                <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 8 }}>{pattern.titleAr}</div>
                <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>{pattern.title}</h3>
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.8 }}>{pattern.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="bias-map" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <BrainCircuit size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Cognitive Bias Map</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {COGNITION_BIAS_MAP.map((bias, index) => (
              <article key={bias.id} id={bias.id} style={cardStyle}>
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
                    <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>
                      {(index + 1).toString().padStart(2, "0")} • {bias.nameAr}
                    </div>
                    <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{bias.name}</h3>
                  </div>
                  <div
                    style={{
                      borderRadius: 999,
                      padding: "8px 12px",
                      background: "color-mix(in srgb, var(--surface-elevated) 88%, transparent)",
                      color: "var(--text-muted)",
                      maxWidth: 380,
                    }}
                  >
                    {bias.researcher}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Egyptian pattern</div>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{bias.egyptianPattern}</p>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Why it matters</div>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{bias.whyItMatters}</p>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Product response</div>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{bias.productResponse}</p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid color-mix(in srgb, var(--border-primary) 78%, transparent)",
                    color: "var(--text-muted)",
                    lineHeight: 1.8,
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>Research basis:</strong> {bias.citation}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="design-response" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <ShieldCheck size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Design Response Layers</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {VISION_RESPONSE_LAYERS.map((layer) => (
              <article key={layer.id} style={cardStyle}>
                <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 8 }}>{layer.titleAr}</div>
                <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>{layer.title}</h3>
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.8 }}>{layer.summary}</p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {layer.featureRefs.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        borderRadius: 999,
                        padding: "6px 10px",
                        background: "color-mix(in srgb, var(--accent-cta) 12%, transparent)",
                        color: "var(--accent-cta)",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="expert-quotes" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Quote size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Verified Expert Quotes</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {deeprealQuotes.map((quote) => (
              <article key={quote.id} style={cardStyle}>
                <p style={{ margin: 0, lineHeight: 1.8, fontWeight: 600 }}>{quote.quote}</p>
                <p style={{ margin: "12px 0 0", lineHeight: 1.8, color: "var(--text-secondary)" }}>{quote.quoteAr}</p>
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid color-mix(in srgb, var(--border-primary) 78%, transparent)",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {quote.author} / {quote.authorAr}
                  </div>
                  <div style={{ color: "var(--text-muted)", marginTop: 6, lineHeight: 1.7 }}>{quote.framing}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 12 }}>Why this route exists</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16 }}>
            The project stops being a vague awareness slogan when every manipulation path is named, localized, and tied
            to a visible response in the product. That is the operational vision: not “teach people to think,” but
            identify which shortcut was exploited and build the exact friction needed to stop the next harmful forward.
          </p>
          <Link
            href="/science"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              background: "var(--accent-cta)",
              color: "var(--background)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Return to Science Hub
          </Link>
        </section>
      </div>
    </div>
  );
}
