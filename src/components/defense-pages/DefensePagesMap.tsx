"use client";

import { useState, useSyncExternalStore } from "react";
import { AlertTriangle, Ban, LayoutDashboard, Route, ShieldCheck } from "lucide-react";
import { BackendFocusPanel } from "@/components/defense-pages/BackendFocusPanel";
import { PageMapCard } from "@/components/defense-pages/PageMapCard";
import { PageMapTable } from "@/components/defense-pages/PageMapTable";
import { PagesMapToolbar } from "@/components/defense-pages/PagesMapToolbar";
import { PresenterModePanel } from "@/components/defense-pages/PresenterModePanel";
import {
  backendFocusStats,
  doNotShowWarnings,
  pageMapEntries,
  presenterRouteOrder,
} from "@/data/defense/pages-map";
import type { DemoStatus, PageMapEntry } from "@/types/defense-pages";

const STORAGE_KEY = "eal-defense-page-test-status";

const demoPriority: Record<DemoStatus, number> = {
  "Must show live": 0,
  "Backup demo": 1,
  "Explain only": 2,
  "Needs caution": 3,
  "Static/context only": 4,
  "Needs valid token": 5,
  "Needs API key": 6,
  "Needs backend": 7,
  "Do not show live": 8,
};

const riskPriority: Record<PageMapEntry["risk"], number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const filterOptions = [
  { id: "all", label: "All" },
  { id: "must-show", label: "Must show" },
  { id: "backup", label: "Backup" },
  { id: "explain-only", label: "Explain only" },
  { id: "do-not-show", label: "Do not show" },
  { id: "ui-only", label: "UI only" },
  { id: "api-backed", label: "API-backed" },
  { id: "local-logic", label: "Local logic" },
  { id: "backend-dependent", label: "Backend-dependent" },
  { id: "storage", label: "Storage" },
  { id: "risky", label: "Risky" },
  { id: "arabic-rtl", label: "Arabic/RTL" },
  { id: "dashboard", label: "Dashboard" },
  { id: "exercise", label: "Exercise" },
  { id: "static-context", label: "Static/context" },
] as const;

const STORAGE_EVENT = "eal-defense-page-test-status-change";
let cachedTestedRoutesRaw = "";
let cachedTestedRoutesValue: Record<string, boolean> = {};

function readTestedRoutes(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
    if (raw === cachedTestedRoutesRaw) {
      return cachedTestedRoutesValue;
    }

    cachedTestedRoutesRaw = raw;
    cachedTestedRoutesValue = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    return cachedTestedRoutesValue;
  } catch {
    cachedTestedRoutesRaw = "";
    cachedTestedRoutesValue = {};
    return {};
  }
}

function writeTestedRoutes(value: Record<string, boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  const nextRaw = JSON.stringify(value);
  cachedTestedRoutesRaw = nextRaw;
  cachedTestedRoutesValue = value;
  window.localStorage.setItem(STORAGE_KEY, nextRaw);
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function subscribeToTestedRoutes(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function includesAny(value: string, needles: string[]) {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function matchesFilter(entry: PageMapEntry, filter: string) {
  if (filter === "all") return true;
  if (filter === "must-show") return entry.demoStatus === "Must show live";
  if (filter === "backup") return entry.demoStatus === "Backup demo";
  if (filter === "explain-only") return entry.demoStatus === "Explain only";
  if (filter === "do-not-show") return entry.demoStatus === "Do not show live";
  if (filter === "ui-only") return entry.backendKind === "none" && entry.category === "Static/context";
  if (filter === "api-backed") return entry.backendKind === "api-backed" || entry.backendKind === "needs-api-key";
  if (filter === "local-logic") return entry.tags.includes("local logic") || entry.backendKind === "local-only";
  if (filter === "backend-dependent") return entry.backendKind === "needs-api-key" || entry.backendKind === "needs-backend";
  if (filter === "storage") return entry.tags.includes("storage");
  if (filter === "risky") return entry.risk === "High" || entry.risk === "Critical" || entry.demoStatus === "Needs caution";
  if (filter === "arabic-rtl") return entry.tags.includes("arabic/rtl");
  if (filter === "dashboard") return entry.category === "Dashboard";
  if (filter === "exercise") return entry.tags.includes("exercise") || entry.category === "Exercise";
  if (filter === "static-context") return entry.category === "Static/context";
  return true;
}

function buildSearchText(entry: PageMapEntry) {
  return [
    entry.route,
    entry.title,
    entry.pageFile,
    entry.category,
    entry.demoStatus,
    entry.risk,
    entry.backendKind,
    entry.uiUxFocus,
    entry.logicFocus,
    entry.backendFocus,
    entry.storageFocus,
    ...entry.evidence,
    ...entry.testSteps,
    ...entry.doctorAttackAnswered,
    ...entry.warnings,
    ...entry.tags,
  ]
    .join(" ")
    .toLowerCase();
}

function buildRouteReport(entries: PageMapEntry[]) {
  return entries
    .map((entry) =>
      [
        `## ${entry.title}`,
        `- Route: ${entry.route}`,
        `- Status: ${entry.demoStatus}`,
        `- Risk: ${entry.risk}`,
        `- Category: ${entry.category}`,
        `- Page file: ${entry.pageFile}`,
        `- UI/UX: ${entry.uiUxFocus}`,
        `- Logic: ${entry.logicFocus}`,
        `- Backend/API: ${entry.backendFocus}`,
        `- Storage: ${entry.storageFocus}`,
        `- Warnings: ${entry.warnings.join(" | ")}`,
      ].join("\n"),
    )
    .join("\n\n");
}

export function DefensePagesMap() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const testedRoutes = useSyncExternalStore<Record<string, boolean>>(
    subscribeToTestedRoutes,
    readTestedRoutes,
    () => ({}),
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredEntries = [...pageMapEntries]
    .filter((entry) => matchesFilter(entry, activeFilter))
    .filter((entry) => !normalizedQuery || includesAny(buildSearchText(entry), [normalizedQuery]))
    .sort((left, right) => {
      if (sortBy === "route") return left.route.localeCompare(right.route);
      if (sortBy === "risk") return riskPriority[left.risk] - riskPriority[right.risk];
      if (sortBy === "category") return left.category.localeCompare(right.category);
      return demoPriority[left.demoStatus] - demoPriority[right.demoStatus];
    });

  const testedCount = Object.values(testedRoutes).filter(Boolean).length;
  const mustShowCount = pageMapEntries.filter((entry) => entry.demoStatus === "Must show live").length;
  const riskyCount = pageMapEntries.filter((entry) => entry.risk === "High" || entry.risk === "Critical").length;

  const presenterItems = presenterRouteOrder.map((route) => {
    if (route === "/language-select") {
      return {
        title: "Arabic / RTL control",
        route,
        proof: "UI supports en, ar, and ar-EG with persisted direction and Noto Kufi Arabic rendering.",
        risk: "Low",
        action: "Switch English to Arabic, confirm the direction change, then switch back.",
      };
    }

    if (route === "/defense-pages-map#theme-control") {
      return {
        title: "Theme switching",
        route,
        proof: "ThemeProvider exposes 16 dynamic themes including Terracotta Sunset.",
        risk: "Low",
        action: "Use the navbar theme picker and switch to Terracotta Sunset in under 10 seconds.",
      };
    }

    const entry = pageMapEntries.find((item) => item.route === route);
    return {
      title: entry?.title ?? route,
      route,
      proof: entry?.logicFocus ?? "Presenter control route.",
      risk: entry?.risk ?? "Low",
      action:
        entry?.testSteps[0] ??
        "Open the route and use it only for focused presenter control.",
    };
  });

  const routeReportMarkdown = buildRouteReport(filteredEntries);
  const presenterChecklistMarkdown = presenterItems
    .map(
      (item) =>
        `- ${item.title} (${item.route})\n  Proof: ${item.proof}\n  Risk: ${item.risk}\n  Action: ${item.action}`,
    )
    .join("\n");

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] pb-20 text-[var(--text-primary)]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--accent-cta) 10%, transparent), transparent 26%), radial-gradient(circle at top right, color-mix(in srgb, var(--accent-deepreal) 12%, transparent), transparent 32%)",
      }}
    >
      <div className="container space-y-8 px-4 pb-16 pt-[calc(var(--navbar-height)+24px)] sm:px-6">
        <header className="grid gap-4 xl:grid-cols-[1.4fr,0.6fr]">
          <section className="glass-card border border-[color:color-mix(in_srgb,var(--accent-cta)_24%,transparent)] p-6 shadow-[var(--shadow-lg)]">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-cta)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cta)_10%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-cta)]">
                Defense pages map
              </span>
              <span className="rounded-full border border-[color:color-mix(in_srgb,var(--color-warning)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--color-warning)_8%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-warning)]">
                Functional command center
              </span>
            </div>
            <h1 className="text-3xl font-black sm:text-4xl">Egyptian Awareness Library route control</h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
              This page is not the defense speech. It is the route-control dashboard that lets you search, filter, sort,
              open, copy, and mark every verified page route before the live presentation.
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                <Route size={14} />
                Verified routes
              </div>
              <div className="mt-2 text-3xl font-black">{pageMapEntries.length}</div>
            </div>
            <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                <ShieldCheck size={14} />
                Must-show routes
              </div>
              <div className="mt-2 text-3xl font-black">{mustShowCount}</div>
            </div>
            <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
                <AlertTriangle size={14} />
                Risky routes
              </div>
              <div className="mt-2 text-3xl font-black">{riskyCount}</div>
            </div>
          </section>
        </header>

        <div id="theme-control">
          <PagesMapToolbar
            query={query}
            onQueryChange={setQuery}
            filters={filterOptions.map((filter) => ({ id: filter.id, label: filter.label }))}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onClearTested={() => writeTestedRoutes({})}
            onClearFilters={() => {
              setQuery("");
              setActiveFilter("all");
              setSortBy("priority");
            }}
            routeReportMarkdown={routeReportMarkdown}
            presenterChecklistMarkdown={presenterChecklistMarkdown}
          />
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              Tested routes
            </div>
            <div className="mt-2 text-3xl font-black">{testedCount}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">Persisted in localStorage.</div>
          </div>
          <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              Filtered routes
            </div>
            <div className="mt-2 text-3xl font-black">{filteredEntries.length}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">Current query and filter result.</div>
          </div>
          <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              API routes
            </div>
            <div className="mt-2 text-3xl font-black">{backendFocusStats.totalApiRoutes}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">Locked verified fact.</div>
          </div>
          <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-md)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
              Demo-relevant APIs
            </div>
            <div className="mt-2 text-3xl font-black">{backendFocusStats.connectedDemoRelevantRoutes}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">Connected or mapped for demo relevance.</div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <PresenterModePanel items={presenterItems} />
          <BackendFocusPanel stats={backendFocusStats} />
        </section>

        <section className="glass-card space-y-4 border border-[color:color-mix(in_srgb,var(--color-danger)_18%,transparent)] p-5 shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--color-danger)_12%,transparent)] text-[var(--color-danger)]">
              <Ban size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Do-not-show warning panel</h2>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Keep these routes, features, and claims out of the live presentation unless the required runtime proof already exists.
              </p>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {doNotShowWarnings.map((warning) => (
              <div
                key={warning}
                className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-4 py-3 text-sm leading-6 text-[var(--text-secondary)]"
              >
                {warning}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold">All route entries</h2>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Every verified page route is listed here with logic proof, backend truth, storage truth, risk, and checklist control.
              </p>
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[var(--border-primary)] bg-[var(--bg-elevated)] px-6 py-12 text-center shadow-[var(--shadow-md)]">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">No routes match the current filters</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Clear the search or switch filters to recover the full route map.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                  setSortBy("priority");
                }}
                className="mt-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-semibold text-[var(--accent-cta)]"
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === "table" ? (
            <PageMapTable
              entries={filteredEntries}
              testedRoutes={testedRoutes}
              onToggleTested={(route) => {
                const current = readTestedRoutes();
                writeTestedRoutes({ ...current, [route]: !current[route] });
              }}
            />
          ) : (
            <div className="grid gap-5">
              {filteredEntries.map((entry) => (
                <PageMapCard
                  key={entry.route}
                  entry={entry}
                  tested={Boolean(testedRoutes[entry.route])}
                  onToggleTested={(route) => {
                    const current = readTestedRoutes();
                    writeTestedRoutes({ ...current, [route]: !current[route] });
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
