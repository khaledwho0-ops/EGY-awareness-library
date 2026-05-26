import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface DefenseCardProps {
  title: string;
  route?: string;
  status?: string;
  tone?: "neutral" | "good" | "warn" | "danger" | "info";
  badge?: string;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<NonNullable<DefenseCardProps["tone"]>, string> = {
  neutral: "border-[var(--border-primary)]",
  good: "border-[color:color-mix(in_srgb,var(--color-success)_35%,transparent)]",
  warn: "border-[color:color-mix(in_srgb,var(--color-warning)_38%,transparent)]",
  danger: "border-[color:color-mix(in_srgb,var(--color-danger)_38%,transparent)]",
  info: "border-[color:color-mix(in_srgb,var(--accent-cta)_35%,transparent)]",
};

export function DefenseCard({
  title,
  route,
  status,
  tone = "neutral",
  badge,
  children,
  className,
}: DefenseCardProps) {
  const isRoute =
    typeof route === "string" && route.startsWith("/") && route !== "/defense-main-plan";

  return (
    <article
      className={cn(
        "glass-card h-full border p-5 shadow-[var(--shadow-md)]",
        toneClasses[tone],
        className,
      )}
    >
      <header className="mb-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              {status ? (
                <span className="badge border border-[var(--border-primary)] bg-[var(--bg-elevated)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  {status}
                </span>
              ) : null}
              {badge ? (
                <span className="badge border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  {badge}
                </span>
              ) : null}
            </div>
          </div>
          {route ? (
            isRoute ? (
              <Link
                href={route}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--accent-cta)] no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                {route}
                <ArrowRight size={14} />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                {route}
                <ExternalLink size={14} />
              </span>
            )
          ) : null}
        </div>
      </header>
      <div className="space-y-4 text-sm leading-7 text-[var(--text-secondary)]">{children}</div>
    </article>
  );
}
