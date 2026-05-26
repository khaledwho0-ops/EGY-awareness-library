import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/defense/CopyButton";
import { cn } from "@/lib/utils";
import type { PageMapEntry } from "@/types/defense-pages";

const riskTone: Record<PageMapEntry["risk"], string> = {
  Low: "text-[var(--color-success)]",
  Medium: "text-[var(--color-warning)]",
  High: "text-[var(--color-danger)]",
  Critical: "text-[var(--color-danger)]",
};

export function PageMapTable({
  entries,
  testedRoutes,
  onToggleTested,
}: {
  entries: PageMapEntry[];
  testedRoutes: Record<string, boolean>;
  onToggleTested: (route: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-elevated)] shadow-[var(--shadow-md)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--bg-secondary)] text-[11px] uppercase tracking-[0.08em] text-[var(--text-caption)]">
            <tr>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Backend</th>
              <th className="px-4 py-3">Logic proof</th>
              <th className="px-4 py-3">Tested</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const isOpenable = entry.route.startsWith("/") && !entry.route.includes("[");
              return (
                <tr key={entry.route} className="border-t border-[var(--border-primary)] align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-[var(--text-primary)]">{entry.route}</div>
                    <div className="mt-1 text-xs text-[var(--text-muted)]">{entry.pageFile}</div>
                  </td>
                  <td className="px-4 py-4 text-[var(--text-secondary)]">{entry.demoStatus}</td>
                  <td className={cn("px-4 py-4 font-semibold", riskTone[entry.risk])}>{entry.risk}</td>
                  <td className="px-4 py-4 text-[var(--text-secondary)]">{entry.category}</td>
                  <td className="px-4 py-4 text-[var(--text-secondary)]">{entry.backendKind}</td>
                  <td className="max-w-[320px] px-4 py-4 text-[var(--text-secondary)]">{entry.logicFocus}</td>
                  <td className="px-4 py-4">
                    <label className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                      <input
                        type="checkbox"
                        checked={Boolean(testedRoutes[entry.route])}
                        onChange={() => onToggleTested(entry.route)}
                        className="h-4 w-4 accent-[var(--accent-cta)]"
                      />
                      {testedRoutes[entry.route] ? "Yes" : "No"}
                    </label>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {isOpenable ? (
                        <Link
                          href={entry.route}
                          className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-cta)]"
                        >
                          Open
                          <ExternalLink size={12} />
                        </Link>
                      ) : (
                        <span className="inline-flex rounded-xl border border-dashed border-[var(--border-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-caption)]">
                          Token needed
                        </span>
                      )}
                      <CopyButton text={entry.testSteps.join("\n")} label="Copy" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
