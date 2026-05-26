import { CheckSquare2 } from "lucide-react";

export function PageTestChecklist({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-3 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
        <CheckSquare2 size={14} />
        Test Checklist
      </div>
      <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {steps.map((step) => (
          <li
            key={step}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-2"
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
