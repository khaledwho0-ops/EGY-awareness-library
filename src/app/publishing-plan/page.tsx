"use client";

import { ArrowUpRight, Rocket } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  PUBLISHING_GUARDRAILS_AR,
  PUBLISHING_GUARDRAILS_EN,
  PUBLISHING_PHASES,
} from "@/data/publishing/publishing-plan";

export default function PublishingPlanPage() {
  const { isRTL } = useRTL();
  const guardrails = isRTL ? PUBLISHING_GUARDRAILS_AR : PUBLISHING_GUARDRAILS_EN;

  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <section
          className="glass-card"
          style={{
            padding: "var(--space-2xl)",
            marginBottom: "var(--space-xl)",
            background:
              "radial-gradient(circle at top, rgba(16,185,129,0.16), rgba(7,12,24,0.98) 58%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Rocket size={28} style={{ color: "var(--accent-cta)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", marginBottom: 6 }}>
                <span className="text-gradient">
                  {isRTL ? "خطة النشر والإطلاق" : "Publishing Plan"}
                </span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: 0, maxWidth: 840, lineHeight: 1.8 }}>
                {isRTL
                  ? "هذا هو تنفيذ CHUNK 6 داخل المنصة: مسار نشر واضح بعد اكتمال دورة الـ14 يوماً، يبدأ من GitHub ثم PWA ثم Android ثم iOS ثم الشراكات المؤسسية."
                  : "This is the in-app implementation of CHUNK 6: a concrete post-program publishing path moving from GitHub to PWA to Android to iOS to institutional partnerships."}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            {PUBLISHING_PHASES.map((phase) => (
              <a
                key={phase.id}
                href={`#${phase.id}`}
                className="btn-secondary no-underline"
                style={{ padding: "10px 14px" }}
              >
                {isRTL ? phase.titleAr : phase.titleEn}
              </a>
            ))}
          </div>

          <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(239,68,68,0.08)" }}>
            <strong style={{ display: "block", marginBottom: 8 }}>
              {isRTL ? "ضوابط غير قابلة للتجاوز" : "Non-negotiable guardrails"}
            </strong>
            <div style={{ display: "grid", gap: 8, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              {guardrails.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gap: 16 }}>
          {PUBLISHING_PHASES.map((phase) => (
            <section
              id={phase.id}
              key={phase.id}
              className="glass-card"
              style={{ padding: "var(--space-xl)", scrollMarginTop: "calc(var(--navbar-height) + 20px)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
                <div>
                  <h2 style={{ marginBottom: 6 }}>
                    {isRTL ? phase.titleAr : phase.titleEn}
                  </h2>
                  <p style={{ color: "var(--text-muted)", margin: 0, lineHeight: 1.8, maxWidth: 760 }}>
                    {isRTL ? phase.summaryAr : phase.summaryEn}
                  </p>
                </div>
                <div
                  className="badge"
                  style={{
                    alignSelf: "flex-start",
                    background: "rgba(16,185,129,0.12)",
                    color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.22)",
                  }}
                >
                  {isRTL ? phase.timingAr : phase.timingEn}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(15,23,42,0.6)" }}>
                <div style={{ display: "grid", gap: 8, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  {(isRTL ? phase.actionsAr : phase.actionsEn).map((item) => (
                    <div key={item}>- {item}</div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section
          className="glass-card"
          style={{
            padding: "var(--space-xl)",
            marginTop: "var(--space-xl)",
            background: "rgba(59,130,246,0.08)",
          }}
        >
          <h2 style={{ marginBottom: 10 }}>
            {isRTL ? "اتصالات مرتبطة داخل المنصة" : "Connected routes"}
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>
            {isRTL
              ? "خطة النشر ترتبط مباشرة بالتقارير والنتائج والموارد: ما يُنشر يجب أن يظل متصلاً بالأدلة، بالمخرجات، وبالقدرة على التحقق."
              : "The publishing plan is tied directly to reporting, results, and source infrastructure: launch decisions stay anchored to evidence, outputs, and verification capacity."}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/presentation" className="btn-secondary no-underline" style={{ padding: "12px 16px" }}>
              <ArrowUpRight size={14} />
              {isRTL ? "مركز العروض" : "Presentation Center"}
            </Link>
            <Link href="/sources#resource-directory" className="btn-primary no-underline" style={{ padding: "12px 16px" }}>
              <ArrowUpRight size={14} />
              {isRTL ? "دليل الموارد" : "Resource Directory"}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
