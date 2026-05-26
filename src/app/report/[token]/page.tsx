"use client";

import type { PropsWithChildren } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, CalendarClock, Share2 } from "lucide-react";
import { deserializeAwarenessReport } from "@/lib/export/reporting";

export default function SharedReportPage() {
  const params = useParams<{ token: string }>();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;
  const decoded = token ? deserializeAwarenessReport(token) : { ok: false, expired: false, report: null };

  if (!decoded.report) {
    return (
      <ReportShell
        titleEn="Invalid report link"
        titleAr="رابط التقرير غير صالح"
        bodyEn="This shared report token could not be decoded."
        bodyAr="تعذر قراءة رمز التقرير المشترك."
      />
    );
  }

  const report = decoded.report;
  const isArabic = report.language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const title = isArabic ? "وعيك نما" : "Your Awareness Grew";

  if (!decoded.ok) {
    return (
      <ReportShell
        titleEn="Shared report expired"
        titleAr="انتهت صلاحية التقرير المشترك"
        bodyEn={`This report expired on ${new Date(report.expiresAt).toLocaleDateString("en-US")}.`}
        bodyAr={`انتهت صلاحية هذا التقرير في ${new Date(report.expiresAt).toLocaleDateString("ar-EG")}.`}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "var(--navbar-height)",
        background:
          "radial-gradient(circle at top, rgba(56,189,248,0.16), rgba(2,6,23,1) 58%)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "var(--space-xl) var(--space-lg) var(--space-2xl)",
          direction: dir,
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "var(--space-2xl)",
            border: "1px solid rgba(56,189,248,0.18)",
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(8,20,37,0.96))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent-cta)",
                  marginBottom: 8,
                }}
              >
                Egyptian Awareness Library
              </div>
              <h1 style={{ marginBottom: 10 }}>
                {title} <span className="text-gradient">2026</span>
              </h1>
              <p
                style={{
                  color: "var(--text-muted)",
                  maxWidth: 720,
                  lineHeight: 1.8,
                }}
              >
                {isArabic ? report.summaryAr[0] : report.summaryEn[0]}
              </p>
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "rgba(34,197,94,0.14)",
                color: "#dcfce7",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {isArabic ? report.badgeAr : report.badgeEn}
            </div>
          </div>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginBottom: 20,
            }}
          >
            <MetricCard
              label={isArabic ? "نسبة الإكمال" : "Completion"}
              value={`${report.completionRate}%`}
            />
            <MetricCard
              label={isArabic ? "التحسن المركب" : "Composite improvement"}
              value={`${report.compositeImprovement ?? 0}%`}
            />
            <MetricCard
              label={isArabic ? "إجمالي الدقائق" : "Total minutes"}
              value={`${report.totalTimeMinutes}`}
            />
            <MetricCard
              label={isArabic ? "سلسلة الأيام" : "Streak"}
              value={`${report.streakDays}`}
            />
          </div>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            <Panel title={isArabic ? "ملخص شخصي" : "Personal summary"}>
              <ul style={{ margin: 0, paddingInlineStart: 18, color: "var(--text-muted)", lineHeight: 1.9 }}>
                {(isArabic ? report.summaryAr : report.summaryEn).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>

            <Panel title={isArabic ? "البصمة التقديرية" : "Estimated fingerprint"}>
              <DetailRow
                label={isArabic ? "أقوى مهارة" : "Strongest skill"}
                value={isArabic ? report.strongestSkillAr : report.strongestSkillEn}
              />
              <DetailRow
                label={isArabic ? "نقطة التطوير" : "Focus area"}
                value={isArabic ? report.focusAreaAr : report.focusAreaEn}
              />
              <DetailRow
                label={isArabic ? "التحيز التقديري" : "Estimated bias"}
                value={isArabic ? report.estimatedBiasAr : report.estimatedBiasEn}
              />
            </Panel>

            <Panel title={isArabic ? "درجات القياس" : "Score summary"}>
              <DetailRow label="MIST-20" value={`${report.scoreSummary.mistPre ?? "—"} → ${report.scoreSummary.mistPost ?? "—"}`} />
              <DetailRow label="MHLS" value={`${report.scoreSummary.mhlsPre ?? "—"} → ${report.scoreSummary.mhlsPost ?? "—"}`} />
              <DetailRow label="GHSQ" value={`${report.scoreSummary.ghsqPre ?? "—"} → ${report.scoreSummary.ghsqPost ?? "—"}`} />
              <DetailRow label="SUS" value={`${report.scoreSummary.susPost ?? "—"}`} />
            </Panel>

            <Panel title={isArabic ? "قابلية التضليل حسب المجال" : "Vulnerability by domain"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {report.dimensions.map((dimension) => (
                  <div key={dimension.key}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        marginBottom: 6,
                      }}
                    >
                      <span>{isArabic ? dimension.labelAr : dimension.labelEn}</span>
                      <span style={{ color: "var(--text-muted)" }}>{dimension.vulnerability}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: 10,
                        borderRadius: 999,
                        background: "rgba(148,163,184,0.14)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${dimension.vulnerability}%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg, var(--accent-mentalhealth), var(--color-danger))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              marginTop: 20,
            }}
          >
            <Panel title={isArabic ? "سياسة التخزين" : "Storage policy"}>
              <ul style={{ margin: 0, paddingInlineStart: 18, color: "var(--text-muted)", lineHeight: 1.9 }}>
                {(isArabic ? report.privacy.storedAr : report.privacy.storedEn).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>
            <Panel title={isArabic ? "الاحتفاظ والصلاحية" : "Retention and expiry"}>
              <ul style={{ margin: 0, paddingInlineStart: 18, color: "var(--text-muted)", lineHeight: 1.9 }}>
                {(isArabic ? report.privacy.retentionAr : report.privacy.retentionEn).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              color: "var(--text-caption)",
              fontSize: 12,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <CalendarClock size={14} />
              {isArabic ? "تاريخ الإنشاء" : "Generated"}{" "}
              {new Date(report.generatedAt).toLocaleDateString(
                isArabic ? "ar-EG" : "en-US",
              )}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Share2 size={14} />
              {isArabic ? "تنتهي الصلاحية" : "Expires"}{" "}
              {new Date(report.expiresAt).toLocaleDateString(
                isArabic ? "ar-EG" : "en-US",
              )}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Link href="/dashboard" className="btn-secondary no-underline">
            {isArabic ? "العودة إلى لوحة التحكم" : "Back to dashboard"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
      <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 6 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
      <h3 style={{ fontSize: 16, marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid rgba(148,163,184,0.12)",
        fontSize: 13,
      }}
    >
      <span>{label}</span>
      <span style={{ color: "var(--text-muted)", textAlign: "end" }}>{value}</span>
    </div>
  );
}

function ReportShell({
  titleEn,
  titleAr,
  bodyEn,
  bodyAr,
}: {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "var(--navbar-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, rgba(248,113,113,0.12), rgba(2,6,23,1) 58%)",
      }}
    >
      <div
        className="glass-card"
        style={{ maxWidth: 620, padding: "var(--space-2xl)", textAlign: "center" }}
      >
        <AlertTriangle size={32} style={{ color: "var(--color-warning)", marginBottom: 14 }} />
        <h1 style={{ marginBottom: 8 }}>{titleAr}</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 18 }}>{bodyAr}</p>
        <h2 style={{ marginBottom: 8, fontSize: 22 }}>{titleEn}</h2>
        <p style={{ color: "var(--text-muted)" }}>{bodyEn}</p>
      </div>
    </div>
  );
}
