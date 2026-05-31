"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AlertTriangle, Info } from "lucide-react";
import type { ModuleId } from "@/data/research/module-briefings";
import { ModuleCommandCenter } from "./module-command-center";
import { useRTL } from "@/components/shared/rtl-provider";

interface ShellLink {
  href: string;
  title: string;
  description: string;
}

interface HeroCTA {
  href: string;
  label: string;
  accent?: string;
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
  /** Pattern overlay for the hero banner */
  heroPattern?: "topographic" | "geometric" | "waves";
  /** CSS gradient for the hero background */
  heroGradient?: string;
  /** Short tagline displayed below the title */
  tagline?: string;
  /** CTA buttons rendered in the hero */
  heroCTAs?: HeroCTA[];
  /** Text gradient CSS class for the title (e.g. "text-gradient-gold") */
  titleGradientClass?: string;
  /** Optional content rendered before the shell (e.g. emergency banner) */
  beforeShell?: ReactNode;
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
  heroPattern,
  heroGradient,
  tagline,
  heroCTAs,
  titleGradientClass,
  beforeShell,
}: ModuleOperatingShellProps) {
  const { isRTL, t } = useRTL();
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <div style={{ paddingTop: "var(--navbar-height)", direction: isRTL ? "rtl" : "ltr" }}>
      {/* Optional pre-shell content (e.g. emergency banner) */}
      {beforeShell ? (
        <div style={{ margin: "0 var(--space-md)", marginTop: "var(--space-md)" }}>
          {beforeShell}
        </div>
      ) : null}

      {/* ── Hero Banner ── */}
      {heroPattern || heroGradient ? (
        <div className="module-hero" style={{ position: "relative" }}>
          {/* Gradient layer */}
          {heroGradient ? (
            <div className="module-hero-gradient" style={{ background: heroGradient }} />
          ) : null}
          {/* Pattern layer */}
          {heroPattern ? (
            <div className={`module-hero-pattern module-hero-pattern-${heroPattern}`} />
          ) : null}

          {/* Hero content */}
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            {/* Collapsible disclaimer (icon-only by default) */}
            <div style={{ marginBottom: "var(--space-lg)" }}>
              <button
                type="button"
                onClick={() => setDisclaimerOpen((prev) => !prev)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: disclaimerOpen ? "var(--radius-md) var(--radius-md) 0 0" : "var(--radius-full)",
                  padding: disclaimerOpen ? "8px 14px" : "8px",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  transition: "all 0.2s ease",
                }}
                aria-expanded={disclaimerOpen}
                aria-label={t({ en: "Toggle disclaimer", ar: "تبديل إخلاء المسؤولية", arEG: "فتح/قفل الإخلاء" })}
              >
                <Info size={14} style={{ color: accent, flexShrink: 0 }} />
                {disclaimerOpen ? t({ en: "Disclaimer", ar: "إخلاء مسؤولية", arEG: "إخلاء مسؤولية" }) : null}
              </button>
              {disclaimerOpen ? (
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderTop: "none",
                    borderRadius: "0 var(--radius-md) var(--radius-md) var(--radius-md)",
                    padding: "10px 14px",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <AlertTriangle size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                  <span>{disclaimer}</span>
                </div>
              ) : null}
            </div>

            {/* Glowing icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: `${accent}15`,
                boxShadow: `0 0 32px ${accent}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "var(--space-md)",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            {/* Title with gradient */}
            <h1
              className={titleGradientClass}
              style={{
                fontSize: "var(--font-h1)",
                lineHeight: 1.1,
                marginBottom: tagline ? 8 : "var(--space-sm)",
                letterSpacing: "var(--heading-letter-spacing)",
              }}
            >
              {title}
            </h1>

            {/* Tagline */}
            {tagline ? (
              <p
                style={{
                  fontSize: "clamp(14px, 2.5vw, 17px)",
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-md)",
                  fontWeight: 500,
                }}
              >
                {tagline}
              </p>
            ) : null}

            {/* Subtitle */}
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                maxWidth: 600,
                marginBottom: heroCTAs && heroCTAs.length > 0 ? "var(--space-lg)" : 0,
              }}
            >
              {subtitle}
            </p>

            {/* CTA buttons */}
            {heroCTAs && heroCTAs.length > 0 ? (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {heroCTAs.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="btn-primary"
                    style={{
                      textDecoration: "none",
                      ...(cta.accent
                        ? { background: cta.accent }
                        : {}),
                    }}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* ── Fallback: legacy flat layout (no hero) ── */
        <>
          <div
            className="disclaimer-bar"
            style={{
              margin: "0 var(--space-md)",
              marginTop: "var(--space-md)",
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-sm)",
            }}
          >
            <AlertTriangle size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: "12px" }}>{disclaimer}</span>
          </div>

          <div className="container" style={{ padding: "var(--space-xl) var(--space-md)" }}>
            <div className="flex items-center gap-3 mb-2" style={{ flexWrap: "wrap" }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: `${accent}15`,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ fontSize: "var(--font-h2)", lineHeight: 1.2 }}>{title}</h1>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{subtitle}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Main content ── */}
      <div className="container" style={{ padding: "0 var(--space-md) var(--space-xl) var(--space-md)" }}>
        {/* Core question card */}
        <div
          className="glass-card mb-8"
          style={{
            padding: "var(--space-md) var(--space-lg)",
            borderLeft: `3px solid ${accent}`,
            marginTop: heroPattern || heroGradient ? 0 : "var(--space-lg)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 3.5vw, 18px)",
              fontWeight: 600,
              color: "var(--text-primary)",
              fontStyle: "italic",
            }}
          >
            &ldquo;{coreQuestion}&rdquo;
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: 4 }}>
            {coreQuestionSub}
          </p>
        </div>

        {/* Command center (data flow preserved) */}
        <ModuleCommandCenter module={module} />

        {/* ── Cross-Module CTA ── */}
        <div className="cross-module-cta" style={{ marginTop: "var(--space-xl)", marginBottom: "var(--space-xl)" }}>
          <h3 style={{ marginTop: 0 }}>🔥 {t({ en: "Ready to deploy your skills?", ar: "مستعد تستخدم مهاراتك؟", arEG: "مستعد تستخدم مهاراتك؟" })}</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
            {t({ en: "Test what you learned against REAL misinformation.", ar: "اختبر ما تعلمته ضد معلومات مضللة حقيقية.", arEG: "اختبر اللي اتعلمته ضد معلومات مضللة حقيقية." })}
          </p>
          <a
            href="/angry-debunkers"
            className="btn-primary"
            style={{
              background: "linear-gradient(135deg,#C2185B,#7B1FA2)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {t({ en: "Launch Angry Debunkers →", ar: "أطلق المفنّدين الغاضبين →", arEG: "شغّل المفنّدين الغاضبين →" })}
          </a>
        </div>

        {/* ── Next routes ── */}
        <section className="glass-card" style={{ padding: "var(--space-lg)" }}>
          <h2 style={{ marginTop: 0 }}>
            {t({ en: "Next routes", ar: "المسارات التالية", arEG: "المسارات الجاية" })}
          </h2>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card no-underline"
                style={{
                  padding: "var(--space-md) var(--space-lg)",
                  color: "inherit",
                  display: "block",
                }}
              >
                <strong style={{ display: "block", marginBottom: 6 }}>{link.title}</strong>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
