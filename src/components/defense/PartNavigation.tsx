"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const PARTS = [
  { id: 1, title: "Powerful Pages", short: "Pages" },
  { id: 2, title: "Stress Tests", short: "Tests" },
  { id: 3, title: "Doctor Scenarios", short: "Doctor" },
  { id: 4, title: "Live Scenarios", short: "Live" },
  { id: 5, title: "5-Min Powerhouse", short: "5-Min" },
  { id: 6, title: "Emergency Scripts", short: "Emergency" },
  { id: 7, title: "Failure Recovery", short: "Recovery" },
  { id: 8, title: "Do-Not-Show", short: "Blocked" },
  { id: 9, title: "Never-Say + Memorize", short: "Lines" },
  { id: 10, title: "Brutal Honesty", short: "Final" },
];

export function PartNavigation() {
  const pathname = usePathname();
  const currentPart = parseInt(pathname?.split("/part-")[1] ?? "0", 10);

  return (
    <nav className="sticky top-[var(--navbar-height,64px)] z-40 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
      <div className="container flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
        <Link
          href="/defense-main-plan"
          className={cn(
            "flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 no-underline",
            currentPart === 0
              ? "border-[color:color-mix(in_srgb,var(--accent-cta)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]"
              : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cta)] hover:border-[color:color-mix(in_srgb,var(--accent-cta)_25%,transparent)]"
          )}
        >
          <LayoutGrid size={14} />
          Hub
        </Link>

        <div className="h-4 w-px bg-[var(--border-primary)] flex-shrink-0" />

        {PARTS.map((part) => (
          <Link
            key={part.id}
            href={`/defense-main-plan/part-${part.id}`}
            className={cn(
              "flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all duration-200 no-underline",
              currentPart === part.id
                ? "border-[color:color-mix(in_srgb,var(--accent-cta)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)] shadow-[0_0_12px_color-mix(in_srgb,var(--accent-cta)_15%,transparent)]"
                : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cta)] hover:border-[color:color-mix(in_srgb,var(--accent-cta)_25%,transparent)]"
            )}
          >
            <span className="text-[10px] font-black opacity-50">{part.id}</span>
            <span className="hidden sm:inline">{part.title}</span>
            <span className="sm:hidden">{part.short}</span>
          </Link>
        ))}
      </div>

      {currentPart > 0 && (
        <div className="container flex items-center justify-between pb-2">
          {currentPart > 1 ? (
            <Link
              href={`/defense-main-plan/part-${currentPart - 1}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-cta)] no-underline transition-colors"
            >
              <ChevronLeft size={14} />
              Part {currentPart - 1}: {PARTS[currentPart - 2]?.title}
            </Link>
          ) : (
            <div />
          )}
          {currentPart < 10 ? (
            <Link
              href={`/defense-main-plan/part-${currentPart + 1}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-cta)] no-underline transition-colors"
            >
              Part {currentPart + 1}: {PARTS[currentPart]?.title}
              <ChevronRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </nav>
  );
}
