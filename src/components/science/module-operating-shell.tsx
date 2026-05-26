"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import type { ModuleId } from "@/data/research/module-briefings";
import { ModuleCommandCenter } from "./module-command-center";
import { useRTL } from "@/components/shared/rtl-provider";

interface ShellLink {
  href: string;
  title: string;
  description: string;
}

interface ModuleOperatingShellProps {
  module: ModuleId;
  accent: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  disclaimer: string;
  coreQuestion: string;
  coreQuestionSub: string;
  links: ShellLink[];
}

export function ModuleOperatingShell({
  module,
  accent,
  icon,
  title,
  subtitle,
  disclaimer,
  coreQuestion,
  coreQuestionSub,
  links,
}: ModuleOperatingShellProps) {
  const { isRTL, t } = useRTL();
  return (
    <div style={{ paddingTop: "var(--navbar-height)", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="disclaimer-bar" style={{ margin: "0 var(--space-md)", marginTop: "var(--space-md)", display: "flex", alignItems: "flex-start", gap: "var(--space-sm)" }}>
        <AlertTriangle size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontSize: "12px" }}>{disclaimer}</span>
      </div>

      <div className="container" style={{ padding: "var(--space-xl) var(--space-md)" }}>
        <div className="flex items-center gap-3 mb-2" style={{ flexWrap: "wrap" }}>
          <div className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: `${accent}15`, flexShrink: 0 }}>
            {icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: "var(--font-h2)", lineHeight: 1.2 }}>{title}</h1>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{subtitle}</p>
          </div>
        </div>

        <div className="glass-card mb-8" style={{ padding: "var(--space-md) var(--space-lg)", borderLeft: `3px solid ${accent}`, marginTop: "var(--space-lg)" }}>
          <p style={{ fontSize: "clamp(16px, 3.5vw, 18px)", fontWeight: 600, color: "var(--text-primary)", fontStyle: "italic" }}>
            &ldquo;{coreQuestion}&rdquo;
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: 4 }}>{coreQuestionSub}</p>
        </div>
        <ModuleCommandCenter module={module} />

        <section className="glass-card" style={{ padding: "var(--space-lg)" }}>
          <h2 style={{ marginTop: 0 }}>{t({ en: "Next routes", ar: "المسارات التالية", arEG: "المسارات الجاية" })}</h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="glass-card no-underline" style={{ padding: "var(--space-md) var(--space-lg)", color: "inherit", display: "block" }}>
                <strong style={{ display: "block", marginBottom: 6 }}>{link.title}</strong>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{link.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
