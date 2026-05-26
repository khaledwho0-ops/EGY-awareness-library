"use client";

import {
  ALL_KEYHUNTER_ENTRIES,
} from "@/data/keyhunter";
import { ALL_PROMPTS } from "@/data/prompts";
import {
  PROJECT_SCOPE_COVERAGE,
  RESEARCH_TASKS_COVERAGE,
} from "@/data/research";
import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import { INTERVENTION_MODES } from "@/data/interventions/intervention-schedule";
import { THEORY_CONNECTIONS } from "@/data/theory/theory-connections";
import { COMB_MAPPING } from "@/data/theory/comb-mapping";
import { useRTL } from "./rtl-provider";

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--border-primary)", borderRadius: "12px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
        <thead>
          <tr style={{ background: "color-mix(in srgb, var(--text-primary) 6%, transparent)" }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  padding: "0.75rem 0.65rem",
                  textAlign: "left",
                  borderBottom: "1px solid var(--border-primary)",
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  opacity: 0.75,
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
                <td key={`${cellIndex}-${cell.slice(0, 18)}`} style={{ padding: "0.75rem 0.65rem", verticalAlign: "top", lineHeight: 1.55 }}>
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

export function FrameworkCoverage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const implementedCount = PROJECT_SCOPE_COVERAGE.filter((item) => item.status === "implemented").length;
  const mappedCount = PROJECT_SCOPE_COVERAGE.filter((item) => item.status === "mapped").length;
  const partialCount = PROJECT_SCOPE_COVERAGE.filter((item) => item.status === "partial").length;

  return (
    <div style={{ display: "grid", gap: "1rem", direction: dir, fontFamily: ff }}>
      <div
        style={{
          padding: "1.25rem",
          borderRadius: "14px",
          background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-emerald) 10%, transparent), var(--glass-bg))",
          border: "1px solid color-mix(in srgb, var(--accent-emerald) 24%, transparent)",
        }}
      >
        <div style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.45rem" }}>
          {t({ en: "Master Framework Coverage", ar: "خريطة تغطية الإطار الكامل", arEG: "خريطة تغطية الإطار الكامل" })}
        </div>
        <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.65, opacity: 0.82 }}>
          {t({ en: "This surface maps PROJECT_SCOPE, RESSEARCH TASK, and TEMPLATE requirements onto the live app so the documents are operational rather than external only.", ar: "هذه الواجهة تربط كل أقسام PROJECT_SCOPE وRESSEARCH TASK وTEMPLATE بطبقات التطبيق الحالية حتى لا تبقى الوثائق خارج النظام.", arEG: "هذه الواجهة تربط كل أقسام PROJECT_SCOPE وRESSEARCH TASK وTEMPLATE بطبقات التطبيق الحالية حتى لا تبقى الوثائق خارج النظام." })}
        </p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
        {[
          { label: "Scope sections", value: PROJECT_SCOPE_COVERAGE.length, sub: "1-29 tracked" },
          { label: "Implemented", value: implementedCount, sub: "first-class app/data coverage" },
          { label: "Mapped", value: mappedCount, sub: "represented through existing modules" },
          { label: "Partial", value: partialCount, sub: "appendix/reference style coverage" },
          { label: "Trusted sources", value: TRUSTED_SOURCES.length, sub: "target registry" },
          { label: "KeyHunter entries", value: ALL_KEYHUNTER_ENTRIES.length, sub: "42 total" },
          { label: "Prompt library", value: ALL_PROMPTS.length, sub: "42 prompts" },
          { label: "Intervention modes", value: INTERVENTION_MODES.length, sub: "17 defined" },
          { label: "Theory entries", value: THEORY_CONNECTIONS.length, sub: "cross-MVP frameworks" },
          { label: "COM-B entries", value: COMB_MAPPING.length, sub: "behavior barriers mapped" },
        ].map((card) => (
          <div key={card.label} className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: "30px", fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>{card.value}</div>
            <div style={{ fontSize: "11px", color: "var(--text-caption)" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{t({ en: "PROJECT_SCOPE section coverage", ar: "تغطية أقسام PROJECT_SCOPE", arEG: "تغطية أقسام PROJECT_SCOPE" })}</h2>
        <Table
          headers={["Section", "Status", "Summary", "App Mapping"]}
          rows={PROJECT_SCOPE_COVERAGE.map((item) => [
            `${item.id}. ${item.title}`,
            item.status,
            item.summary,
            item.appMapping,
          ])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{t({ en: "RESSEARCH TASK coverage", ar: "تغطية مهام RESSEARCH TASK", arEG: "تغطية مهام RESSEARCH TASK" })}</h2>
        <Table
          headers={["Task", "Status", "Implementation"]}
          rows={RESEARCH_TASKS_COVERAGE.map((item) => [item.task, item.status, item.implementation])}
        />
      </section>
    </div>
  );
}
