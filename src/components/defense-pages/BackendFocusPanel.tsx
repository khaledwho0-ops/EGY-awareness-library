import { DatabaseZap, ShieldAlert, ShieldCheck } from "lucide-react";
import type { BackendFocusStats } from "@/types/defense-pages";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li
            key={`${title}-${item}`}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BackendFocusPanel({ stats }: { stats: BackendFocusStats }) {
  return (
    <section className="glass-card space-y-5 border border-[color:color-mix(in_srgb,var(--accent-cta)_26%,transparent)] p-5 shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--accent-cta)_12%,transparent)] text-[var(--accent-cta)]">
          <DatabaseZap size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Backend Focus Panel</h2>
          <p className="text-sm leading-6 text-[var(--text-muted)]">
            Show the backend honestly: safe fallbacks, risky routes, and the routes that should stay closed.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
            Total API Routes
          </div>
          <div className="mt-2 text-3xl font-black text-[var(--text-primary)]">
            {stats.totalApiRoutes}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-caption)]">
            Connected / Demo Relevant
          </div>
          <div className="mt-2 text-3xl font-black text-[var(--text-primary)]">
            {stats.connectedDemoRelevantRoutes}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]">
            <ShieldCheck size={16} />
            Safer paths
          </div>
          <ListBlock title="Safe / fallback routes" items={stats.safeFallbackRoutes} />
          <ListBlock title="Keyless public routes" items={stats.keylessPublicRoutes} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-warning)]">
            <ShieldAlert size={16} />
            Risky paths
          </div>
          <ListBlock title="Risky routes" items={stats.riskyRoutes} />
          <ListBlock title="Backend-dependent pages" items={stats.backendDependentRoutes} />
        </div>
      </div>
    </section>
  );
}
