"use client";

import {
  AUTHORITY_OUTREACH,
  CORE_PROJECT_KEYWORDS,
  CURATED_BOOKS,
  CURATED_MEDIA,
  CURATED_PODCASTS,
  DATA_SCIENTIST_STRATEGIES,
  DEFENSE_ANTI_PATTERNS,
  DEFENSE_CHECKLIST,
  FOUNDATIONAL_QUOTES,
  IAL_MODEL_COMPONENTS,
  INTELLIGENCE_KEYWORDS,
  MENTAL_HEALTH_SYNTHESIS,
  NEGATIVE_SCIENCE_THREATS,
  PARALYSIS_STRATEGIES,
  PRESENTATION_CONFIDENCE_GUIDELINES,
  PROMPT_ENGINEERING_STRATEGIES,
  RELIGION_SYNTHESIS,
  SCIENCE_DOMAIN_KEYWORDS,
  SOURCE_STANDARD_KEYWORDS,
  STANDARDS_SYNTHESIS,
  UNIVERSAL_RESEARCH_STANDARDS,
  UNIVERSITY_STANDARDS,
  APPLIED_SCIENCE_PRINCIPLES,
  type KeywordMatrixEntry,
} from "@/data/research";
import { useRTL } from "./rtl-provider";

function sectionTitle(en: string, ar: string, isRTL: boolean) {
  return isRTL ? ar : en;
}

function DataTable({
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
                <td key={`${cellIndex}-${cell.slice(0, 16)}`} style={{ padding: "0.7rem 0.65rem", verticalAlign: "top", lineHeight: 1.55 }}>
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

function KeywordTable({ entries }: { entries: KeywordMatrixEntry[] }) {
  return (
    <DataTable
      headers={["Keyword", "L1 Core", "L2 Expert", "L3 Hidden", "Threat / Confusion / Prompt / App"]}
      rows={entries.map((entry) => [
        entry.keyword,
        entry.layer1,
        entry.layer2,
        entry.layer3,
        entry.layer7 ?? entry.layer6 ?? entry.layer5 ?? entry.application ?? "",
      ])}
    />
  );
}

export function DefenseLibrary() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const clusterLabels: Record<string, string> = {
    "data-decision": "Data & Decision Threats",
    "emotional-motivational": "Emotional & Motivational Threats",
    "planning-cognitive": "Planning & Cognitive Threats",
    "behavioral-social": "Behavioral & Social Threats",
  };

  return (
    <div style={{ display: "grid", gap: "1.25rem", direction: dir, fontFamily: ff }}>
      <div
        style={{
          padding: "1.25rem",
          borderRadius: "14px",
          background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-indigo) 10%, transparent), var(--glass-bg))",
          border: "1px solid color-mix(in srgb, var(--accent-indigo) 24%, transparent)",
        }}
      >
        <div style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          {sectionTitle("Defense Library (Chunks 7-12)", "مكتبة الدفاع (الأجزاء 7-12)", a)}
        </div>
        <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.65, opacity: 0.8 }}>
          {sectionTitle(
            "Structured planning, standards, synthesis, outreach, and defense-preparation content derived from the project framework.",
            "محتوى منظم للتخطيط والمعايير والتكامل والتواصل والاستعداد للمناقشة مستمد من إطار المشروع.",
            a,
          )}
        </p>
      </div>

      {(["data-decision", "emotional-motivational", "planning-cognitive", "behavioral-social"] as const).map((cluster) => (
        <section key={cluster} style={{ display: "grid", gap: "0.75rem" }}>
          <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>
            {sectionTitle(clusterLabels[cluster], clusterLabels[cluster], a)}
          </h2>
          <DataTable
            headers={["#", "Mental Block", "Strategy", "Implementation"]}
            rows={PARALYSIS_STRATEGIES.filter((item) => item.cluster === cluster).map((item) => [
              String(item.id),
              item.mentalBlock,
              item.strategy,
              item.implementation,
            ])}
          />
        </section>
      ))}

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("20 Universal Research Standards", "20 معياراً بحثياً عاماً", a)}</h2>
        <DataTable
          headers={["#", "Standard", "Application", "Why Reliable / Efficient"]}
          rows={UNIVERSAL_RESEARCH_STANDARDS.map((item) => [
            String(item.id),
            item.standard,
            item.application,
            item.whyReliable,
          ])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("20 Applied Science Principles", "20 مبدأ من مبادئ العلم التطبيقي", a)}</h2>
        <DataTable
          headers={["#", "Principle", "Non-Negotiable Implementation"]}
          rows={APPLIED_SCIENCE_PRINCIPLES.map((item) => [String(item.id), item.principle, item.implementation])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("20 Negative Science Threats", "20 تهديداً من تهديدات العلم السلبي", a)}</h2>
        <DataTable
          headers={["#", "Threat Category", "Failure Mode", "Mitigation Strategy"]}
          rows={NEGATIVE_SCIENCE_THREATS.map((item) => [
            String(item.id),
            item.threatCategory,
            item.failureMode,
            item.mitigationStrategy,
          ])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("12 Data Scientist Strategies", "12 استراتيجية عالم بيانات", a)}</h2>
        <DataTable
          headers={["#", "Strategy", "Implementation", "Justification"]}
          rows={DATA_SCIENTIST_STRATEGIES.map((item) => [String(item.id), item.strategy, item.implementation, item.justification])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("12 University Standards", "12 معياراً جامعياً", a)}</h2>
        <DataTable
          headers={["#", "Institution", "Application"]}
          rows={UNIVERSITY_STANDARDS.map((item) => [String(item.id), item.institution, item.application])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("KeyHunter 7-Layer Analysis", "تحليل KeyHunter ذو السبع طبقات", a)}</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Core Project Keywords</div>
            <KeywordTable entries={CORE_PROJECT_KEYWORDS} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Source & Standard Keywords</div>
            <KeywordTable entries={SOURCE_STANDARD_KEYWORDS} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Science Domain Keywords</div>
            <KeywordTable entries={SCIENCE_DOMAIN_KEYWORDS} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Intelligence Type Keywords</div>
            <KeywordTable entries={INTELLIGENCE_KEYWORDS} />
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>
          {sectionTitle("Mental Health, Religion & Standards Synthesis", "تكامل الصحة النفسية والدين والمعايير", a)}
        </h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Mental Health Crisis Research</div>
            <DataTable headers={["Data Point", "Source", "Application"]} rows={MENTAL_HEALTH_SYNTHESIS.map((item) => [item.label, item.source, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Religion Importance Research</div>
            <DataTable headers={["Data Point", "Source", "Application"]} rows={RELIGION_SYNTHESIS.map((item) => [item.label, item.source, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Worldwide & Local Standards Applied</div>
            <DataTable headers={["Level", "Standard", "Application"]} rows={STANDARDS_SYNTHESIS.map((item) => [item.label, item.source, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Integrated Awareness Literacy (IAL) Model</div>
            <DataTable headers={["Component", "Definition", "Metric"]} rows={IAL_MODEL_COMPONENTS.map((item) => [item.component, item.definition, item.metric])} />
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("Authority Outreach", "التواصل مع الجهات المرجعية", a)}</h2>
        <DataTable
          headers={["Entity", "Why Interested", "Outreach Method", "Pitch"]}
          rows={AUTHORITY_OUTREACH.map((item) => [item.entity, item.whyInterested, item.outreachMethod, item.pitch])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("12 Prompt Engineering Strategies", "12 استراتيجية لهندسة الأوامر", a)}</h2>
        <DataTable
          headers={["#", "Strategy", "Application in App"]}
          rows={PROMPT_ENGINEERING_STRATEGIES.map((item) => [String(item.id), item.strategy, item.application])}
        />
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>{sectionTitle("Support Resources & Defense Preparation", "المراجع الداعمة والاستعداد للمناقشة", a)}</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Curated Books</div>
            <DataTable headers={["Book", "Author", "Application"]} rows={CURATED_BOOKS.map((item) => [item.title, item.creator, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Curated Podcasts</div>
            <DataTable headers={["Podcast", "Focus", "Application"]} rows={CURATED_PODCASTS.map((item) => [item.title, item.creator, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Films, Documentaries & TV</div>
            <DataTable headers={["Title", "Platform", "Application"]} rows={CURATED_MEDIA.map((item) => [item.title, item.platform ?? item.creator, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Foundational Quotes</div>
            <DataTable headers={["Quote", "Author", "Exercise Application"]} rows={FOUNDATIONAL_QUOTES.map((item) => [item.title, item.creator, item.application])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>How to Present with Confidence</div>
            <DataTable headers={["Strategy", "Implementation"]} rows={PRESENTATION_CONFIDENCE_GUIDELINES.map((item) => [item.strategy, item.implementation])} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>What Not To Do</div>
            <DataTable headers={["Anti-Pattern", "Why Fatal", "Defense"]} rows={DEFENSE_ANTI_PATTERNS.map((item) => [item.antiPattern, item.whyFatal, item.defense])} />
          </div>
          <div
            style={{
              border: "1px solid var(--border-primary)",
              borderRadius: "12px",
              padding: "1rem 1rem 0.8rem",
              background: "color-mix(in srgb, var(--accent-amber) 8%, transparent)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.6rem" }}>Defense Ammunition Checklist</div>
            <ul style={{ margin: 0, paddingLeft: a ? 0 : "1.25rem", paddingRight: a ? "1.25rem" : 0, lineHeight: 1.8, fontSize: "0.84rem" }}>
              {DEFENSE_CHECKLIST.map((item) => (
                <li key={item} style={{ marginBottom: "0.15rem" }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
