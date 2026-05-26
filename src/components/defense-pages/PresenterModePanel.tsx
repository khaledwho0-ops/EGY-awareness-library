import Link from "next/link";
import { ExternalLink, Mic2 } from "lucide-react";

interface PresenterItem {
  title: string;
  route: string;
  proof: string;
  risk: string;
  action: string;
}

export function PresenterModePanel({ items }: { items: PresenterItem[] }) {
  return (
    <section className="glass-card space-y-5 border border-[color:color-mix(in_srgb,var(--color-success)_24%,transparent)] p-5 shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]">
          <Mic2 size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Presenter Mode</h2>
          <p className="text-sm leading-6 text-[var(--text-muted)]">
            This is the compact route strip for the live defense. Open only what matters.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.route}`}
            className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</div>
                <div className="text-xs uppercase tracking-[0.08em] text-[var(--text-caption)]">
                  {item.route}
                </div>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.proof}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  Risk: {item.risk}
                </span>
                <Link
                  href={item.route}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-cta)]"
                >
                  Open
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Exact action:</span> {item.action}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
