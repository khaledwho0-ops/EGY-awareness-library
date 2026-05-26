"use client";

import Link from "next/link";
import { FileText, Shield, Brain, BookOpen, ArrowRight, Lock } from "lucide-react";

export default function ReportIndexPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "var(--navbar-height)",
        background:
          "radial-gradient(circle at top, rgba(56,189,248,0.14), rgba(2,6,23,1) 58%)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "var(--space-xl) var(--space-lg) var(--space-2xl)",
          maxWidth: 860,
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(56,189,248,0.12)",
              marginBottom: 20,
            }}
          >
            <FileText size={32} style={{ color: "var(--accent-cta)" }} />
          </div>
          <h1 style={{ marginBottom: 12 }}>
            تقرير الوعي{" "}
            <span className="text-gradient">Awareness Report</span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 620,
              margin: "0 auto",
              lineHeight: 1.9,
              fontSize: 15,
            }}
          >
            Your personalized awareness report is generated after completing
            exercises across all three modules. It tracks your growth in
            misinformation resilience, mental health literacy, and positive
            religious coping — with full privacy protection.
          </p>
        </div>

        {/* What's in a report */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginBottom: "var(--space-xl)",
          }}
        >
          <FeatureCard
            icon={<Shield size={22} style={{ color: "var(--accent-deepreal)" }} />}
            title="DeepReal Score"
            titleAr="درجة ديب ريال"
            description="MIST-20 pre/post comparison tracking your misinformation detection improvement."
          />
          <FeatureCard
            icon={<Brain size={22} style={{ color: "var(--accent-mentalhealth)" }} />}
            title="Mental Health Literacy"
            titleAr="محو الأمية الصحية"
            description="MHLS & GHSQ delta scores measuring knowledge growth and help-seeking attitudes."
          />
          <FeatureCard
            icon={<BookOpen size={22} style={{ color: "var(--accent-religionhub)" }} />}
            title="Religious Coping"
            titleAr="التأقلم الديني"
            description="Brief RCOPE positive/negative subscale tracking with spiritual bypass awareness."
          />
        </div>

        {/* Privacy notice */}
        <div
          className="glass-card"
          style={{
            padding: "var(--space-lg)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            marginBottom: "var(--space-xl)",
            border: "1px solid rgba(34,197,94,0.18)",
          }}
        >
          <Lock size={20} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>
              Privacy-first design · تصميم يحترم الخصوصية
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0, lineHeight: 1.8 }}>
              Reports are generated client-side and encoded into a shareable token.
              No personal data is stored on any server. Shared links expire
              automatically. Compliant with Egyptian Data Protection Law No. 151/2020.
            </p>
          </div>
        </div>

        {/* How to get your report */}
        <div
          className="glass-card"
          style={{
            padding: "var(--space-xl)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 10, fontSize: 20 }}>
            How to generate your report
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: 20,
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            Complete your pre-assessment, work through the 14-day exercise
            program, then take the post-assessment. Your report will be
            generated automatically from the dashboard.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/dashboard"
              className="btn-primary no-underline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Go to Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/assessment"
              className="btn-secondary no-underline"
            >
              Start Assessment
            </Link>
          </div>
        </div>

        {/* Shared report info */}
        <p
          style={{
            textAlign: "center",
            color: "var(--text-caption)",
            fontSize: 12,
            marginTop: "var(--space-lg)",
          }}
        >
          Have a shared report link? It should look like{" "}
          <code style={{ color: "var(--accent-cta)", fontSize: 11 }}>
            /report/eyJ...
          </code>
          . Paste the full URL in your browser to view it.
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  titleAr,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
}) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{title}</div>
      <div
        style={{
          fontSize: 12,
          color: "var(--accent-cta)",
          marginBottom: 10,
          fontFamily: "'Noto Kufi Arabic', sans-serif",
        }}
      >
        {titleAr}
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
        {description}
      </p>
    </div>
  );
}
