import type { ReactNode } from "react";

interface DefenseSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function DefenseSection({
  eyebrow,
  title,
  description,
  children,
}: DefenseSectionProps) {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <span className="badge border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          {eyebrow}
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{title}</h2>
          <p className="max-w-4xl text-sm leading-7 text-[var(--text-muted)] sm:text-[15px]">
            {description}
          </p>
        </div>
      </header>
      {children}
    </section>
  );
}
