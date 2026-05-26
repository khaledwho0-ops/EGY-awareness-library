"use client";

import { Grid3X3, ListFilter, Printer, RotateCcw, Search, Table2 } from "lucide-react";
import { CopyButton } from "@/components/defense/CopyButton";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
}

interface PagesMapToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "cards" | "table";
  onViewModeChange: (value: "cards" | "table") => void;
  onClearTested: () => void;
  onClearFilters: () => void;
  routeReportMarkdown: string;
  presenterChecklistMarkdown: string;
}

export function PagesMapToolbar({
  query,
  onQueryChange,
  filters,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearTested,
  onClearFilters,
  routeReportMarkdown,
  presenterChecklistMarkdown,
}: PagesMapToolbarProps) {
  return (
    <div className="sticky top-[calc(var(--navbar-height)+8px)] z-30 space-y-4 rounded-[28px] border border-[var(--border-primary)] bg-[color:color-mix(in_srgb,var(--bg-primary)_88%,transparent)] p-4 shadow-[var(--shadow-lg)] backdrop-blur">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-caption)]"
          />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by route, title, risk, backend, logic, storage, Arabic, dashboard..."
            className="w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-cta)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            <ListFilter size={14} />
            Sort
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="bg-transparent text-[var(--text-primary)] outline-none"
            >
              <option value="priority">Demo priority</option>
              <option value="route">Route</option>
              <option value="risk">Risk</option>
              <option value="category">Category</option>
            </select>
          </label>

          <div className="inline-flex overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)]">
            <button
              type="button"
              onClick={() => onViewModeChange("cards")}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]",
                viewMode === "cards"
                  ? "bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]"
                  : "text-[var(--text-secondary)]",
              )}
            >
              <Grid3X3 size={14} />
              Cards
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]",
                viewMode === "table"
                  ? "bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]"
                  : "text-[var(--text-secondary)]",
              )}
            >
              <Table2 size={14} />
              Table
            </button>
          </div>

          <CopyButton text={routeReportMarkdown} label="Copy route report" />
          <CopyButton text={presenterChecklistMarkdown} label="Copy presenter checklist" />

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-cta)]"
          >
            <Printer size={14} />
            Print
          </button>
          <button
            type="button"
            onClick={onClearTested}
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors hover:text-[var(--color-warning)]"
          >
            <RotateCcw size={14} />
            Clear tested
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors",
              activeFilter === filter.id
                ? "border-[color:color-mix(in_srgb,var(--accent-cta)_32%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]"
                : "border-[var(--border-primary)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
            )}
          >
            {filter.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-full border border-dashed border-[var(--border-primary)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-cta)]"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
