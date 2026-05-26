import { AlertTriangle, Ban, CheckCircle2, Clock3, DatabaseZap, ShieldAlert, ShieldCheck, Siren, TriangleAlert } from "lucide-react";
import {
  BRUTAL_HONESTY,
  DEMO_SEGMENTS,
  DOCTOR_ATTACKS,
  DO_NOT_SHOW,
  EMERGENCY_SCRIPTS,
  EXECUTIVE_LOCK,
  LIVE_SCENARIOS,
  POWERFUL_PAGES,
  RECOVERY_LINES,
  STRESS_TESTS,
  WHAT_NOT_TO_SAY,
} from "@/data/defense/defense-main-plan";
import { DefenseCard } from "@/components/defense/DefenseCard";
import { DefenseSection } from "@/components/defense/DefenseSection";
import { CopyButton } from "@/components/defense/CopyButton";
import { cn } from "@/lib/utils";
import type { StressTestStatus } from "@/types/defense";

const stressStatusTone: Record<StressTestStatus, "good" | "warn" | "info"> = {
  PASS: "good",
  PARTIAL: "warn",
  PREPARED: "info",
};

function StatusLabel({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const className = normalized.includes("must") || normalized === "pass"
    ? "bg-[color:color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)] border-[color:color-mix(in_srgb,var(--color-success)_28%,transparent)]"
    : normalized.includes("show if time") || normalized === "partial" || normalized.includes("pilot")
      ? "bg-[color:color-mix(in_srgb,var(--color-warning)_10%,transparent)] text-[var(--color-warning)] border-[color:color-mix(in_srgb,var(--color-warning)_28%,transparent)]"
      : normalized.includes("backup") || normalized === "prepared"
        ? "bg-[color:color-mix(in_srgb,var(--accent-cta)_10%,transparent)] text-[var(--accent-cta)] border-[color:color-mix(in_srgb,var(--accent-cta)_25%,transparent)]"
        : normalized === "risk" || normalized.includes("do not show") || normalized === "fail"
          ? "bg-[color:color-mix(in_srgb,var(--color-danger)_10%,transparent)] text-[var(--color-danger)] border-[color:color-mix(in_srgb,var(--color-danger)_28%,transparent)]"
          : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-primary)]";

  return (
    <span className={cn("badge border text-[11px] font-semibold uppercase tracking-[0.08em]", className)}>
      {value}
    </span>
  );
}

function EvidenceList({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
        {label}
      </div>
      <ul className="space-y-1 text-sm leading-6 text-[var(--text-secondary)]">
        {values.map((value) => (
          <li key={`${label}-${value}`} className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DefenseCommandCenter() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--accent-cta) 12%, transparent), transparent 28%), radial-gradient(circle at top right, color-mix(in srgb, var(--accent-deepreal) 12%, transparent), transparent 28%)",
      }}
    >
      <section className="section-padding relative overflow-hidden">
        <div className="container space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr,0.9fr]">
            <div className="glass-card border border-[color:color-mix(in_srgb,var(--accent-cta)_24%,transparent)] p-8 shadow-[var(--shadow-lg)]">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="badge border border-[color:color-mix(in_srgb,var(--accent-cta)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_10%,transparent)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-cta)]">
                  Executive Lock
                </span>
                <span className="badge border border-[color:color-mix(in_srgb,var(--color-warning)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_8%,transparent)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warning)]">
                  Honest Risk Mode
                </span>
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
                {EXECUTIVE_LOCK.projectName}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                {EXECUTIVE_LOCK.identity}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Status
                  </div>
                  <div className="mt-2 text-lg font-bold text-[var(--text-primary)]">
                    {EXECUTIVE_LOCK.status}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Core Strategy
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {EXECUTIVE_LOCK.strategy}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Final Framing
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    Pilot-ready, not production-ready.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <DefenseCard title="Locked Numbers" tone="info" badge="Architecture">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["35", "page routes"],
                    ["34", "total API routes"],
                    ["28", "connected/demo-relevant routes"],
                    ["67", "static pages generated"],
                    ["14/15", "stress tests passed"],
                    ["1", "partial stress test"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-4 py-3"
                    >
                      <div className="text-xl font-black text-[var(--text-primary)]">{value}</div>
                      <div className="text-xs uppercase tracking-[0.08em] text-[var(--text-caption)]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </DefenseCard>

              <DefenseCard title="Live-Proof Identity" tone="warn" badge="Doctor Line">
                <ul className="space-y-2">
                  <li className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2">
                    This is a pilot-ready cognitive defense system.
                  </li>
                  <li className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2">
                    It is not a normal awareness website.
                  </li>
                  <li className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2">
                    One vulnerability, three lenses, one measurement system.
                  </li>
                </ul>
              </DefenseCard>
            </div>
          </div>
        </div>
      </section>

      <main className="container space-y-16 pb-20">
        <DefenseSection
          eyebrow="Section 2"
          title="Powerful Pages"
          description="These are the only pages that deserve doctor time. The point is not route count. The point is that each selected page proves a different engine."
        >
          <div className="grid gap-5 xl:grid-cols-2">
            {POWERFUL_PAGES.map((page) => (
              <DefenseCard
                key={page.id}
                title={page.title}
                route={page.route}
                status={page.demoStatus}
                tone={
                  page.demoStatus === "Must show live"
                    ? "good"
                    : page.demoStatus === "Show if time"
                      ? "warn"
                      : "info"
                }
                badge={page.timeLimit}
              >
                <div className="flex flex-wrap gap-2">
                  <StatusLabel value={page.demoStatus} />
                  {page.input ? (
                    <div className="flex items-center gap-2">
                      <span className="badge border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                        Live Input: {page.input}
                      </span>
                      <CopyButton text={page.input} />
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Expected Output
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {page.expectedOutput}
                  </div>
                </div>

                {page.warning ? (
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-warning)_32%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_8%,transparent)] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-warning)]">
                      <AlertTriangle size={14} />
                      Warning
                    </div>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">{page.warning}</p>
                  </div>
                ) : null}

                <div>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Why This Page Matters
                  </div>
                  <ul className="space-y-2">
                    {page.proof.map((point) => (
                      <li
                        key={point}
                        className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2 text-sm leading-6"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <EvidenceList
                    label="Evidence: Files and routes"
                    values={[
                      `Page: ${page.evidence.pageFile}`,
                      `Main component: ${page.evidence.mainComponent}`,
                      `Supporting component: ${page.evidence.supportingComponent}`,
                      ...page.evidence.apiRoutes.map((route) => `API: ${route}`),
                    ]}
                  />
                  <EvidenceList
                    label="Evidence: Logic and runtime"
                    values={[
                      ...page.evidence.localLogic,
                      ...page.evidence.dataFiles,
                      ...page.evidence.storage,
                    ]}
                  />
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <EvidenceList
                    label="Doctor attacks answered"
                    values={page.doctorAttackAnswered}
                  />
                  <EvidenceList label="Live test evidence" values={page.evidence.liveEvidence} />
                </div>

                <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-danger)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-danger)_6%,transparent)] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">
                    <ShieldAlert size={14} />
                    Demo Risk
                  </div>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">{page.risk}</p>
                </div>
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 3"
          title="Stress Test Use Cases"
          description="Every test card states the category, route or API, actual result, and the exact defense line. Pass, partial, and prepared are separated on purpose."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STRESS_TESTS.map((test) => (
              <DefenseCard
                key={test.id}
                title={`${test.id}. ${test.name}`}
                route={test.routeOrApi}
                status={test.status}
                tone={stressStatusTone[test.status]}
                badge={test.category}
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Input / action
                  </div>
                  <p>{test.inputAction}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Actual result
                  </div>
                  <p>{test.actualResult}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    Defense line
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {test.defenseLine}
                  </p>
                </div>
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 4"
          title="All-Ready Doctor Scenarios"
          description="These cards are not generic Q&A. Each card names the attack, what it is really testing, the best short answer, the page to open, the evidence to mention, and the phrase to avoid."
        >
          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {DOCTOR_ATTACKS.map((attack) => (
              <DefenseCard
                key={attack.id}
                title={`${attack.id}. ${attack.doctorSays}`}
                route={attack.pageToOpen}
                tone="neutral"
                badge="Doctor attack"
              >
                <div>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    What they are testing
                  </div>
                  <p>{attack.testing}</p>
                </div>
                <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cta)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_8%,transparent)] p-4">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-cta)]">
                    Best 5-second answer
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {attack.bestAnswer}
                  </p>
                </div>
                <EvidenceList label="Evidence to mention" values={attack.evidenceToMention} />
                <EvidenceList label="What not to say" values={attack.whatNotToSay} />
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 5"
          title="One Live Scenario But Also Predicted"
          description="This section forces the defense into scenario logic. The wrong scenario is labeled dangerous. The good scenario is safe. The ultra scenario combines local Egyptian context with the live-safe English scoring proof."
        >
          <div className="grid gap-5 xl:grid-cols-3">
            {LIVE_SCENARIOS.map((scenario, index) => (
              <DefenseCard
                key={scenario.title}
                title={scenario.title}
                route={scenario.route}
                tone={index === 0 ? "danger" : index === 1 ? "good" : "info"}
                badge={index === 0 ? "Do not use" : index === 1 ? "Safe live" : "Best scenario"}
              >
                <p className="font-semibold text-[var(--text-primary)]">{scenario.summary}</p>
                <ul className="space-y-2">
                  {scenario.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2 text-sm leading-6"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 6"
          title="Final 5-Minute Powerhouse Plan"
          description="This is the exact timing strip. Each segment names the route, the actions, and the sentence to say."
        >
          <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cta)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_5%,transparent)] p-4 shadow-[var(--shadow-md)]">
            <div className="w-full text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-cta)] mb-3">5-Minute Compact Mode</div>
            <div className="flex w-full flex-wrap gap-2 lg:flex-nowrap">
              {[
                { time: "0:00", label: "Opening" },
                { time: "0:20", label: "DeepReal" },
                { time: "1:00", label: "Bad News" },
                { time: "2:00", label: "Baseline" },
                { time: "3:00", label: "Supervisor" },
                { time: "4:00", label: "Architecture" },
                { time: "4:40", label: "Closing" }
              ].map(step => (
                <div key={step.label} className="flex flex-col items-center flex-1 min-w-[80px] p-2 rounded-lg bg-[var(--bg-secondary)] border border-[color:color-mix(in_srgb,var(--accent-cta)_15%,transparent)] shadow-sm">
                  <span className="text-sm font-black text-[var(--text-primary)]">{step.time}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mt-1 text-center">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {DEMO_SEGMENTS.map((segment) => (
              <div
                key={segment.window}
                className="glass-card grid gap-5 border border-[var(--border-primary)] p-5 lg:grid-cols-[180px,1fr]"
              >
                <div className="space-y-3">
                  <span className="badge border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    {segment.window}
                  </span>
                  <div className="text-lg font-bold text-[var(--text-primary)]">{segment.title}</div>
                  <div className="text-sm text-[var(--accent-cta)]">{segment.route}</div>
                </div>
                <div className="grid gap-4 lg:grid-cols-[1fr,1fr]">
                  <div>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                      Actions
                    </div>
                    <ul className="space-y-2">
                      {segment.actions.map((action) => (
                        <li
                          key={action}
                          className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]"
                        >
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                      Exact line
                    </div>
                    <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-deepreal)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-deepreal)_8%,transparent)] p-4 text-sm font-semibold leading-7 text-[var(--text-primary)]">
                      {segment.say}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 7"
          title="Emergency Scripts"
          description="If the room collapses into interruption, time loss, or demo failure, compress the story instead of panicking."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {EMERGENCY_SCRIPTS.map((script) => (
              <DefenseCard
                key={script.duration}
                title={script.duration}
                tone="warn"
                badge="Emergency"
              >
                <ul className="space-y-2">
                  {script.script.map((line) => (
                    <li
                      key={line}
                      className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2 text-sm leading-6"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <DefenseSection
          eyebrow="Section 8"
          title="If Something Fails Live"
          description="These are exact recovery lines, not vague fallback ideas."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {RECOVERY_LINES.map((recovery) => (
              <DefenseCard
                key={recovery.id}
                title={`${recovery.id}. ${recovery.trigger}`}
                tone="danger"
                badge="Recovery"
              >
                <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-danger)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--color-danger)_6%,transparent)] p-4 text-sm font-semibold leading-7 text-[var(--text-primary)]">
                  {recovery.line}
                </div>
              </DefenseCard>
            ))}
          </div>
        </DefenseSection>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <DefenseSection
            eyebrow="Section 9"
            title="Do-Not-Show List"
            description="These items are excluded on purpose because they add failure risk or overclaiming risk."
          >
            <div className="grid gap-4">
              {DO_NOT_SHOW.map((item) => (
                <DefenseCard
                  key={item.target}
                  title={item.target}
                  tone="danger"
                  badge="Do not show live"
                >
                  <p>{item.why}</p>
                </DefenseCard>
              ))}
            </div>
          </DefenseSection>

          <div className="space-y-6">
            <DefenseSection
              eyebrow="Section 10"
              title="What-Not-To-Say List"
              description="These phrases destroy trust because they overclaim, hide risk, or invent implementation."
            >
              <DefenseCard title="Forbidden lines" tone="warn" badge="No overclaim">
                <ul className="space-y-2">
                  {WHAT_NOT_TO_SAY.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl bg-[var(--bg-elevated)] px-3 py-2 text-sm leading-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </DefenseCard>
            </DefenseSection>

            <DefenseSection
              eyebrow="Section 11"
              title="Brutal Honesty / Final Readiness"
              description="This section states the strongest proof, the weakest risk, what to avoid, and the closing status line without theater."
            >
              <DefenseCard title="Final honesty block" tone="info" badge="Final readiness">
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                      <ShieldCheck size={14} />
                      Strongest proof
                    </div>
                    <p>{BRUTAL_HONESTY.strongestProof}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-warning)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_6%,transparent)] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-warning)]">
                      <TriangleAlert size={14} />
                      Weakest risk
                    </div>
                    <p>{BRUTAL_HONESTY.weakestRisk}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-danger)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-danger)_6%,transparent)] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">
                      <Ban size={14} />
                      What not to show
                    </div>
                    <p>{BRUTAL_HONESTY.whatNotToShow}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cta)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_6%,transparent)] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-cta)]">
                      <Siren size={14} />
                      What to say if challenged
                    </div>
                    <p>{BRUTAL_HONESTY.challengeLine}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-success)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--color-success)_8%,transparent)] p-4 text-base font-black text-[var(--color-success)]">
                    {BRUTAL_HONESTY.finalStatus}
                  </div>
                </div>
              </DefenseCard>
            </DefenseSection>
          </div>
        </div>

        <section className="grid gap-4 rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 shadow-[var(--shadow-lg)] lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              label: "Build status",
              value: "npm run build passed",
            },
            {
              icon: CheckCircle2,
              label: "TypeScript",
              value: "0 errors",
            },
            {
              icon: Clock3,
              label: "Boundary files",
              value: "error.tsx, loading.tsx, not-found.tsx",
            },
            {
              icon: DatabaseZap,
              label: "Pilot storage",
              value: "localStorage/sessionStorage + assessment export files",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]">
                <item.icon size={18} />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                {item.label}
              </div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                {item.value}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
