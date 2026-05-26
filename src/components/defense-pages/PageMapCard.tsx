import Link from "next/link";
import { AlertTriangle, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";
import { CopyButton } from "@/components/defense/CopyButton";
import { PageTestChecklist } from "@/components/defense-pages/PageTestChecklist";
import { cn } from "@/lib/utils";
import type { PageMapEntry } from "@/types/defense-pages";

const riskTone: Record<PageMapEntry["risk"], string> = {
  Low: "border-[color:color-mix(in_srgb,var(--color-success)_32%,transparent)] text-[var(--color-success)]",
  Medium: "border-[color:color-mix(in_srgb,var(--color-warning)_32%,transparent)] text-[var(--color-warning)]",
  High: "border-[color:color-mix(in_srgb,var(--color-danger)_28%,transparent)] text-[var(--color-danger)]",
  Critical: "border-[color:color-mix(in_srgb,var(--color-danger)_42%,transparent)] text-[var(--color-danger)]",
};

const statusTone = (status: string) => {
  if (status === "Must show live") {
    return "border-[color:color-mix(in_srgb,var(--color-success)_32%,transparent)] bg-[color:color-mix(in_srgb,var(--color-success)_10%,transparent)] text-[var(--color-success)]";
  }
  if (status === "Backup demo" || status === "Static/context only") {
    return "border-[color:color-mix(in_srgb,var(--accent-cta)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_10%,transparent)] text-[var(--accent-cta)]";
  }
  if (status === "Explain only" || status === "Needs caution" || status === "Needs backend") {
    return "border-[color:color-mix(in_srgb,var(--color-warning)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_10%,transparent)] text-[var(--color-warning)]";
  }
  return "border-[color:color-mix(in_srgb,var(--color-danger)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--color-danger)_10%,transparent)] text-[var(--color-danger)]";
};

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
        {label}
      </div>
      <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{value}</div>
    </div>
  );
}

export function PageMapCard({
  entry,
  tested,
  onToggleTested,
}: {
  entry: PageMapEntry;
  tested: boolean;
  onToggleTested: (route: string) => void;
}) {
  const isOpenable = entry.route.startsWith("/") && !entry.route.includes("[");
  const demoSteps = entry.testSteps.join("\n");

  return (
    <article className="glass-card space-y-4 border border-[var(--border-primary)] p-5 shadow-[var(--shadow-md)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", statusTone(entry.demoStatus))}>
              {entry.demoStatus}
            </span>
            <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", riskTone[entry.risk])}>
              Risk: {entry.risk}
            </span>
            <span className="rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              {entry.category}
            </span>
            <span className="rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              {entry.backendKind}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{entry.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{entry.route}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{entry.pageFile}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isOpenable ? (
            <Link
              href={entry.route}
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-cta)]"
            >
              Open route
              <ExternalLink size={14} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              Needs valid route data
              <ShieldAlert size={14} />
            </span>
          )}
          <CopyButton text={demoSteps} label="Copy demo steps" />
          <label className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={tested}
              onChange={() => onToggleTested(entry.route)}
              className="h-4 w-4 accent-[var(--accent-cta)]"
            />
            Mark tested
          </label>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <DetailBlock label="UI / UX purpose" value={entry.uiUxFocus} />
        <DetailBlock label="Logic proof" value={entry.logicFocus} />
        <DetailBlock label="Backend / API proof" value={entry.backendFocus} />
        <DetailBlock label="Storage proof" value={entry.storageFocus} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="space-y-2 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              Evidence
            </div>
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              {entry.evidence.map((item) => (
                <li key={item} className="rounded-2xl bg-[var(--bg-secondary)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              Doctor attacks answered
            </div>
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              {entry.doctorAttackAnswered.map((item) => (
                <li key={item} className="rounded-2xl bg-[var(--bg-secondary)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <PageTestChecklist steps={entry.testSteps} />

          <div className="space-y-2 rounded-3xl border border-[color:color-mix(in_srgb,var(--color-warning)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_8%,transparent)] p-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-warning)]">
              <AlertTriangle size={14} />
              Warnings
            </div>
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              {entry.warnings.map((warning) => (
                <li key={warning} className="rounded-2xl bg-[var(--bg-elevated)] px-3 py-2">
                  {warning}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">
            <CheckCircle2 size={16} className={tested ? "text-[var(--color-success)]" : "text-[var(--text-caption)]"} />
            {tested ? "Marked tested for defense." : "Not marked tested yet."}
          </div>
        </div>
      </div>
    </article>
  );
}
