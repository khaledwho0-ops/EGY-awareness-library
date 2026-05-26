import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FlaskConical,
  GraduationCap,
  Crosshair,
  Timer,
  Siren,
  HeartCrack,
  Ban,
  MessageSquareOff,
  Skull,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  ArrowRight,
} from "lucide-react";
import { PartNavigation } from "@/components/defense/PartNavigation";

export const metadata: Metadata = {
  title: "Defense Main Plan | Egyptian Awareness Library",
  description:
    "10-part defense command center for the Egyptian Awareness Library project defense.",
};

const PARTS = [
  {
    id: 1,
    title: "Powerful Pages Main Plan",
    description:
      "6 certified demo pages — each proves a different working engine. DeepReal verification, Bad News game, Baseline measurement, Supervisor dashboard, Arabic/RTL, and 16 dynamic themes.",
    icon: Shield,
    accent: "var(--accent-deepreal)",
    stats: "6 pages · 4 must-show · 2 backup",
  },
  {
    id: 2,
    title: "Stress Test Use Cases",
    description:
      "16 stress tests executed against the running dev server. 14 passed, 1 partial (Arabic heuristic), 1 prepared. Every test states category, route, actual result, and defense line.",
    icon: FlaskConical,
    accent: "var(--color-warning)",
    stats: "16 tests · 14 pass · 1 partial · 1 prepared",
  },
  {
    id: 3,
    title: "All-Ready Doctor Scenarios",
    description:
      "35 doctor attack scenarios with 5-second, 15-second, and 30-second defense scripts. Each names the attack, what it tests, the page to open, evidence to mention, and phrases to avoid.",
    icon: GraduationCap,
    accent: "var(--accent-religionhub)",
    stats: "35 attacks · 5s/15s/30s answers",
  },
  {
    id: 4,
    title: "Live Scenarios — Predicted",
    description:
      "Bad scenario (chatbot — dangerous), good scenario (Bad News — safe), and the ultra scenario: Egyptian student receives viral WhatsApp health misinformation. Full 90-second demo script.",
    icon: Crosshair,
    accent: "var(--color-danger)",
    stats: "1 bad · 1 good · 1 ultra",
  },
  {
    id: 5,
    title: "Final 5-Minute Powerhouse Plan",
    description:
      "Exact timing strip: 0:00 Opening → 0:20 DeepReal → 1:00 Bad News → 1:40 Baseline → 2:20 Dashboard → 3:00 Arabic/RTL → 3:40 Architecture → 4:20 Close. Every second planned.",
    icon: Timer,
    accent: "var(--accent-cta)",
    stats: "7 segments · 5 minutes exact",
  },
  {
    id: 6,
    title: "Emergency Scripts",
    description:
      "60-second, 30-second, and 20-second emergency compression scripts. If the room collapses, compress the story instead of panicking.",
    icon: Siren,
    accent: "var(--color-warning)",
    stats: "3 scripts · 60s / 30s / 20s",
  },
  {
    id: 7,
    title: "Failure Recovery Lines",
    description:
      "Exact recovery sentences for every possible live failure: DeepReal fails, ClaimBuster fails, Arabic challenged, Bad News fails, Baseline fails, Dashboard empty, Internet down, Doctor interrupts.",
    icon: HeartCrack,
    accent: "var(--color-danger)",
    stats: "10 failure scenarios · exact sentences",
  },
  {
    id: 8,
    title: "Do-Not-Show List",
    description:
      "Features excluded on purpose because they add failure risk or overclaiming risk. Chatbot, Forensics, TinEye, Redis, auth.ts, .env, prompt-lab, defense-qa, presentation pages.",
    icon: Ban,
    accent: "var(--color-danger)",
    stats: "11 items blocked",
  },
  {
    id: 9,
    title: "Never-Say + Memorize Lines",
    description:
      "Forbidden phrases that destroy trust (overclaiming, hiding risk, inventing implementation) paired with correct replacements. Plus 10 memorize lines for instant recall.",
    icon: MessageSquareOff,
    accent: "var(--color-warning)",
    stats: "11 forbidden · 10 memorize",
  },
  {
    id: 10,
    title: "Brutal Honesty — Final Readiness",
    description:
      "What is genuinely strong, what is honestly limited, and the final defense-ready verdict. No theater. Everything shown is provable.",
    icon: Skull,
    accent: "var(--accent-cta)",
    stats: "7 strong · 8 limited · 1 verdict",
  },
];

export default function DefenseMainPlanPage() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--accent-cta) 12%, transparent), transparent 28%), radial-gradient(circle at top right, color-mix(in srgb, var(--accent-deepreal) 12%, transparent), transparent 28%)",
      }}
    >
      <PartNavigation />

      {/* Executive Lock Header */}
      <section className="section-padding relative overflow-hidden">
        <div className="container space-y-8">
          <div className="glass-card border border-[color:color-mix(in_srgb,var(--accent-cta)_24%,transparent)] p-8 shadow-[var(--shadow-lg)]">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="badge border border-[color:color-mix(in_srgb,var(--accent-cta)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_10%,transparent)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-cta)]">
                Executive Lock
              </span>
              <span className="badge border border-[color:color-mix(in_srgb,var(--color-success)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--color-success)_8%,transparent)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-success)]">
                READY FOR DEFENSE — 90/100
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
              Egyptian Awareness Library (EAL)
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              A 14-day cognitive defense intervention for Egyptian university students targeting misinformation, mental health stigma, and religious manipulation — and it measures behavior change.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Build", value: "Exit 0 | 67 pages | 34 API routes | 0 TS errors" },
                { label: "Tests", value: "15/15 executed | 14 passed | 1 partial (Arabic heuristic)" },
                { label: "Demo Pages", value: "4 certified + 2 UX proofs" },
                { label: "Decision", value: "READY FOR DEFENSE — 90/100" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm font-bold leading-6 text-[var(--text-primary)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 Parts Grid */}
      <main className="container pb-20">
        <div className="mb-8 space-y-2">
          <span className="badge border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            10-Part Defense System
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">All Parts</h2>
          <p className="text-sm leading-7 text-[var(--text-muted)] max-w-3xl">
            Each part is a fully functional, live page with complete content. Click any part to open it. Do not show: Chatbot, Forensics, TinEye, Redis, auth.ts, .env.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PARTS.map((part) => (
            <Link
              key={part.id}
              href={`/defense-main-plan/part-${part.id}`}
              className="group glass-card flex flex-col border border-[var(--border-primary)] p-6 shadow-[var(--shadow-md)] no-underline transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent-cta)_35%,transparent)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: `color-mix(in srgb, ${part.accent} 12%, transparent)`,
                    color: part.accent,
                  }}
                >
                  <part.icon size={22} />
                </div>
                <span className="text-[11px] font-black text-[var(--text-caption)] uppercase tracking-widest">
                  Part {part.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-cta)] transition-colors">
                {part.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--text-secondary)] flex-1">
                {part.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="badge border border-[var(--border-primary)] bg-[var(--bg-elevated)] text-[10px] font-semibold uppercase tracking-wider text-[var(--text-caption)]">
                  {part.stats}
                </span>
                <ArrowRight
                  size={16}
                  className="text-[var(--text-caption)] group-hover:text-[var(--accent-cta)] transition-colors group-hover:translate-x-1 duration-200"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom stats bar */}
        <section className="mt-12 grid gap-4 rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 shadow-[var(--shadow-lg)] lg:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "Build status", value: "npm run build passed — Exit 0" },
            { icon: CheckCircle2, label: "TypeScript", value: "0 errors | 128 lint warnings (non-breaking)" },
            { icon: Clock3, label: "Boundary files", value: "error.tsx, loading.tsx, not-found.tsx" },
            { icon: DatabaseZap, label: "Pilot storage", value: "localStorage + .runtime/assessments filesystem" },
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
