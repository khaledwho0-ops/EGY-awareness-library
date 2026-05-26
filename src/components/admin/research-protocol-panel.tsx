"use client";

import {
  EVALUATION_PROTOCOL,
  FALSIFIABLE_HYPOTHESES,
  MEASUREMENT_SCHEDULE,
  RESEARCH_PROTOCOL,
  SAMPLING_STRATEGY,
  SUB_RESEARCH_QUESTIONS,
  SUCCESS_CRITERIA,
} from "@/data/research";

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "color-mix(in srgb, var(--text-primary) 6%, transparent)" }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px 14px",
                  textAlign: "left",
                  borderBottom: "1px solid var(--border-primary)",
                  textTransform: "uppercase",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--text-muted)",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`} style={{ borderBottom: index === rows.length - 1 ? "none" : "1px solid var(--border-primary)" }}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell.slice(0, 20)}`} style={{ padding: "12px 14px", verticalAlign: "top", lineHeight: 1.55 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ResearchProtocolPanel() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 8 }}>
          Project protocol
        </div>
        <h2 style={{ marginBottom: 12 }}>{RESEARCH_PROTOCOL.title}</h2>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in srgb, var(--accent-amber) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 22%, transparent)",
            lineHeight: 1.7,
            fontSize: 14,
          }}
        >
          <strong>Main research question:</strong> {RESEARCH_PROTOCOL.mainQuestion}
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Sub-research questions</h3>
        <Table
          headers={["ID", "Question", "Maps To"]}
          rows={SUB_RESEARCH_QUESTIONS.map((item) => [item.id, item.question, item.mapsTo])}
        />
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Falsifiable hypotheses</h3>
        <Table
          headers={["ID", "Hypothesis", "Null Hypothesis", "Failure Condition"]}
          rows={FALSIFIABLE_HYPOTHESES.map((item) => [
            item.id,
            item.hypothesis,
            item.nullHypothesis,
            item.failureCondition,
          ])}
        />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <h3 style={{ marginBottom: 12 }}>Sampling strategy</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {SAMPLING_STRATEGY.map((item) => (
              <div key={item.label} style={{ display: "grid", gap: 4 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <h3 style={{ marginBottom: 12 }}>Measurement schedule</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {MEASUREMENT_SCHEDULE.map((phase) => (
              <div
                key={phase.timing}
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <strong>{phase.label}</strong>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{phase.timing}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, fontSize: 13 }}>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Evaluation protocol</h3>
        <Table
          headers={["Evaluation Type", "Method", "What It Tests", "When", "Sample"]}
          rows={EVALUATION_PROTOCOL.map((item) => [
            item.evaluationType,
            item.method,
            item.tests,
            item.when,
            item.sample,
          ])}
        />
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Success criteria decision matrix</h3>
        <Table
          headers={["Metric", "Minimum Acceptable", "Target", "Stretch Goal", "If Not Met"]}
          rows={SUCCESS_CRITERIA.map((item) => [
            item.metric,
            item.minimumAcceptable,
            item.target,
            item.stretchGoal,
            item.ifNotMet,
          ])}
        />
      </div>
    </div>
  );
}
