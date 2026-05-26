import type { CSSProperties } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  ClipboardCheck,
  FlaskConical,
  Languages,
  ShieldAlert,
} from "lucide-react";
import { INSTRUMENT_READINESS } from "@/data/research/instrument-readiness";
import {
  EVALUATION_PROTOCOL,
  FALSIFIABLE_HYPOTHESES,
  MEASUREMENT_SCHEDULE,
  RESEARCH_PROTOCOL,
  SAMPLING_STRATEGY,
  SUCCESS_CRITERIA,
} from "@/data/research/protocol-spec";
import {
  SELF_TEST_PILLARS,
  SELF_TEST_RISKS,
  SELF_TEST_ROUTE_STEPS,
} from "@/data/protocol/self-test-framework";

const cardStyle: CSSProperties = {
  border: "1px solid color-mix(in srgb, var(--border-primary) 82%, transparent)",
  borderRadius: 24,
  padding: 24,
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 92%, white 8%) 0%, color-mix(in srgb, var(--bg-card) 96%, transparent) 100%)",
  boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
};

const readinessBadge = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized === "ready" || normalized === "clear") {
    return { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.24)", color: "var(--color-success)" };
  }
  if (normalized === "blocked" || normalized === "not_confirmed") {
    return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.24)", color: "var(--color-danger)" };
  }
  return { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.24)", color: "var(--color-warning)" };
};

export default function SelfTestProtocolPage() {
  const readinessEntries = Object.values(INSTRUMENT_READINESS);

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
            <ClipboardCheck size={30} style={{ color: "var(--accent-cta)" }} />
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
              Chunk 8
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)", marginBottom: 14 }}>
            <span className="text-gradient">Self-Test Protocol</span>
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 980, lineHeight: 1.8 }}>
            This page documents the project’s first-iteration self-test system as an actual protocol, not a loose
            promise: baseline battery, pre/post instruments, launch gates, failure conditions, and the parts that are
            still blocked or conditional.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 24,
            }}
          >
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>6</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Assessment instruments</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                The protocol uses separate instruments for misinformation, mental health, religious coping, help-seeking,
                usability, and social desirability.
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>3</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Measurement phases</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                Baseline, 14-day intervention, and post-test are already defined in the research schedule.
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>1</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Core honesty rule</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                Arabic participant deployment is not fully ready yet, and the route says that explicitly instead of hiding it.
              </div>
            </div>
          </div>
        </section>

        <section id="protocol-foundations" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <FlaskConical size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Protocol Foundations</h2>
          </div>

          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 10 }}>Research title</div>
            <p style={{ margin: 0, lineHeight: 1.8 }}>{RESEARCH_PROTOCOL.title}</p>
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid color-mix(in srgb, var(--border-primary) 78%, transparent)",
              }}
            >
              <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Main question</div>
              <p style={{ margin: 0, lineHeight: 1.8, color: "var(--text-secondary)" }}>{RESEARCH_PROTOCOL.mainQuestion}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {SELF_TEST_PILLARS.map((pillar) => (
              <article key={pillar.id} style={cardStyle}>
                <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 8 }}>{pillar.titleAr}</div>
                <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>{pillar.title}</h3>
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.8 }}>{pillar.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="self-test-flow" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <BadgeCheck size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Self-Test Flow</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {SELF_TEST_ROUTE_STEPS.map((step, index) => (
              <article key={step.id} style={cardStyle}>
                <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 8 }}>
                  {(index + 1).toString().padStart(2, "0")} • {step.titleAr}
                </div>
                <h3 style={{ marginBottom: 10, fontSize: "1.08rem" }}>{step.title}</h3>
                <div style={{ marginBottom: 10, color: "var(--text-muted)" }}>{step.timing}</div>
                <p style={{ margin: 0, lineHeight: 1.8 }}>{step.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="measurement-schedule" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <ClipboardCheck size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Measurement Schedule</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {MEASUREMENT_SCHEDULE.map((phase) => (
              <article key={phase.label} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: "1.08rem" }}>{phase.label}</h3>
                  <span
                    style={{
                      borderRadius: 999,
                      padding: "7px 12px",
                      background: "color-mix(in srgb, var(--accent-cta) 12%, transparent)",
                      color: "var(--accent-cta)",
                      fontWeight: 700,
                    }}
                  >
                    {phase.timing}
                  </span>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {phase.items.map((item) => (
                    <div key={item} style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="instrument-readiness" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Languages size={22} style={{ color: "var(--accent-cta)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Instrument Readiness Matrix</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {readinessEntries.map((instrument) => {
              const enBadge = readinessBadge(instrument.english);
              const arBadge = readinessBadge(instrument.arabic);
              const permission = readinessBadge(instrument.permissionStatus);

              return (
                <article key={instrument.instrumentId} id={`instrument-${instrument.instrumentId}`} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                    <div>
                      <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>{instrument.instrumentId}</div>
                      <h3 style={{ margin: 0, fontSize: "1.08rem" }}>{instrument.instrumentName}</h3>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ borderRadius: 999, padding: "6px 10px", background: enBadge.bg, border: `1px solid ${enBadge.border}`, color: enBadge.color, fontWeight: 700 }}>
                        EN: {instrument.english}
                      </span>
                      <span style={{ borderRadius: 999, padding: "6px 10px", background: arBadge.bg, border: `1px solid ${arBadge.border}`, color: arBadge.color, fontWeight: 700 }}>
                        AR: {instrument.arabic}
                      </span>
                      <span style={{ borderRadius: 999, padding: "6px 10px", background: permission.bg, border: `1px solid ${permission.border}`, color: permission.color, fontWeight: 700 }}>
                        permission: {instrument.permissionStatus}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Deployment rule</div>
                      <p style={{ margin: 0, lineHeight: 1.8 }}>{instrument.deploymentRule}</p>
                    </div>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Why</div>
                      <p style={{ margin: 0, lineHeight: 1.8 }}>{instrument.why}</p>
                    </div>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Next action</div>
                      <p style={{ margin: 0, lineHeight: 1.8 }}>{instrument.nextAction}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid color-mix(in srgb, var(--border-primary) 78%, transparent)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Reviewer needed: <strong style={{ color: "var(--text-primary)" }}>{instrument.reviewerNeeded}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="sampling-success" style={{ marginBottom: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 16 }}>
            <article style={cardStyle}>
              <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 14 }}>Sampling Strategy</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {SAMPLING_STRATEGY.map((item) => (
                  <div key={item.label}>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ lineHeight: 1.8 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </article>

            <article id="success-criteria" style={cardStyle}>
              <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 14 }}>Success Criteria</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {SUCCESS_CRITERIA.map((criterion) => (
                  <div key={criterion.metric} style={{ paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{criterion.metric}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Minimum: {criterion.minimumAcceptable}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Target: {criterion.target}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Stretch: {criterion.stretchGoal}</div>
                    <div style={{ color: "var(--text-muted)", lineHeight: 1.7, marginTop: 6 }}>If not met: {criterion.ifNotMet}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="hypotheses-evaluation" style={{ marginBottom: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <article style={cardStyle}>
              <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 14 }}>Falsifiable Hypotheses</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {FALSIFIABLE_HYPOTHESES.map((hypothesis) => (
                  <div key={hypothesis.id}>
                    <div style={{ color: "var(--accent-cta)", fontWeight: 700, marginBottom: 6 }}>{hypothesis.id}</div>
                    <div style={{ lineHeight: 1.8, marginBottom: 8 }}>{hypothesis.hypothesis}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Null: {hypothesis.nullHypothesis}</div>
                    <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>Failure: {hypothesis.failureCondition}</div>
                  </div>
                ))}
              </div>
            </article>

            <article style={cardStyle}>
              <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 14 }}>Evaluation Methods</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {EVALUATION_PROTOCOL.map((method) => (
                  <div key={method.evaluationType}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{method.evaluationType}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Method: {method.method}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>Tests: {method.tests}</div>
                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>When: {method.when}</div>
                    <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>Sample: {method.sample}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="honesty-check" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <ShieldAlert size={22} style={{ color: "var(--color-warning)" }} />
            <h2 style={{ fontSize: "var(--font-h3)", margin: 0 }}>Shockingly Honest Risks</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {SELF_TEST_RISKS.map((risk) => (
              <article key={risk.id} style={cardStyle}>
                <div style={{ color: "var(--color-warning)", fontWeight: 700, marginBottom: 8 }}>{risk.titleAr}</div>
                <h3 style={{ marginBottom: 10, fontSize: "1.08rem" }}>{risk.title}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Problem</div>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{risk.problem}</p>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 }}>Control</div>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{risk.control}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
            <AlertTriangle size={20} style={{ color: "var(--color-warning)", marginTop: 3 }} />
            <div>
              <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 10 }}>What this chunk says plainly</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
                The self-test system is real enough to inspect, but not honest enough to call universally launch-ready in Arabic yet.
                The protocol is strongest when treated as a gated research workflow tied to reviewer approval and language readiness,
                not as a finished public-measurement product.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/assessment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 18px",
                borderRadius: 999,
                background: "var(--accent-cta)",
                color: "var(--text-inverse)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Open assessment instruments
            </Link>
            <Link
              href="/baseline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 18px",
                borderRadius: 999,
                background: "transparent",
                color: "var(--text-primary)",
                textDecoration: "none",
                fontWeight: 700,
                border: "1px solid var(--border-primary)",
              }}
            >
              Open baseline battery
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
