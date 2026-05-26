import type { ParticipantSnapshot } from "@/lib/research/research-ops";

export interface AwarenessDimension {
  key: "health" | "religion" | "politics" | "economy" | "science" | "social";
  labelEn: string;
  labelAr: string;
  vulnerability: number;
}

export interface AwarenessReport {
  reportId: string;
  participantId: string;
  displayName: string;
  language: "ar" | "en";
  generatedAt: string;
  expiresAt: string;
  completionRate: number;
  exercisesCompleted: number;
  totalExercises: number;
  totalTimeMinutes: number;
  streakDays: number;
  confidenceShift: number | null;
  compositeImprovement: number | null;
  strongestSkillEn: string;
  strongestSkillAr: string;
  focusAreaEn: string;
  focusAreaAr: string;
  estimatedBiasEn: string;
  estimatedBiasAr: string;
  badgeEn: string;
  badgeAr: string;
  scoreSummary: {
    mistPre: number | null;
    mistPost: number | null;
    mhlsPre: number | null;
    mhlsPost: number | null;
    ghsqPre: number | null;
    ghsqPost: number | null;
    susPost: number | null;
  };
  dimensions: AwarenessDimension[];
  summaryEn: string[];
  summaryAr: string[];
  privacy: {
    storedEn: string[];
    storedAr: string[];
    retentionEn: string[];
    retentionAr: string[];
  };
}

export interface ReportCheckpoint {
  id: string;
  trigger: "manual" | "checkpoint" | "session_end";
  savedAt: string;
  report: AwarenessReport;
}

const REPORT_CHECKPOINTS_KEY = "eal_report_checkpoints_v1";
const MAX_CHECKPOINTS = 20;
const SHARE_EXPIRY_DAYS = 90;

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function encodeBase64Url(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value, "utf8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  return btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);

  if (typeof window === "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }

  return decodeURIComponent(escape(atob(padded)));
}

function inferStrongestSkill(snapshot: ParticipantSnapshot) {
  const candidates = [
    {
      score:
        (snapshot.assessments.mistShift ?? 0) +
        snapshot.exerciseCounts.deepreal * 2 +
        snapshot.verificationCompleted,
      en: "Reverse source verification",
      ar: "التحقق العكسي من المصادر",
    },
    {
      score:
        (snapshot.assessments.mhlsShift ?? 0) +
        snapshot.exerciseCounts["mental-health"] * 2 +
        snapshot.promptUses,
      en: "Mental-health help seeking",
      ar: "طلب المساندة للصحة النفسية",
    },
    {
      score:
        (snapshot.assessments.rcopePositiveShift ?? 0) -
        (snapshot.assessments.rcopeNegativeShift ?? 0) +
        snapshot.exerciseCounts["religion-hub"] * 2,
      en: "Balanced religious reasoning",
      ar: "الاستدلال الديني المتزن",
    },
  ].sort((left, right) => right.score - left.score);

  return candidates[0];
}

function inferFocusArea(snapshot: ParticipantSnapshot) {
  const dimensions = buildVulnerabilityDimensions(snapshot);
  const focus = dimensions.sort((left, right) => right.vulnerability - left.vulnerability)[0];
  return {
    en: focus.labelEn,
    ar: focus.labelAr,
  };
}

function inferEstimatedBias(snapshot: ParticipantSnapshot) {
  if (snapshot.verificationSkipped > snapshot.verificationCompleted) {
    return {
      en: "Urgency bias",
      ar: "تحيز الاستعجال",
    };
  }

  if ((snapshot.trustCalibration.latestEts ?? 0) >= (snapshot.trustCalibration.latestTce ?? 0)) {
    return {
      en: "Emotional trust bias",
      ar: "تحيز الثقة العاطفية",
    };
  }

  return {
    en: "Authority bias",
    ar: "تحيز السلطة",
  };
}

function inferBadge(improvement: number | null) {
  if (improvement === null) {
    return {
      en: "Awareness in progress",
      ar: "الوعي قيد البناء",
    };
  }
  if (improvement >= 85) {
    return {
      en: "Egyptian Awareness Ambassador",
      ar: "سفير الوعي المصري",
    };
  }
  if (improvement >= 70) {
    return {
      en: "Intermediate Fact-Checker",
      ar: "مدقق معلومات محترف",
    };
  }
  if (improvement >= 50) {
    return {
      en: "Beginner Fact-Checker",
      ar: "مدقق معلومات مبتدئ",
    };
  }

  return {
    en: "Awareness in progress",
    ar: "الوعي قيد البناء",
  };
}

function buildVulnerabilityDimensions(
  snapshot: ParticipantSnapshot,
): AwarenessDimension[] {
  const deeprealRatio = snapshot.exerciseCounts.deepreal / 14;
  const mentalRatio = snapshot.exerciseCounts["mental-health"] / 14;
  const religionRatio = snapshot.exerciseCounts["religion-hub"] / 14;
  const verificationRatio =
    snapshot.verificationCompleted + snapshot.verificationSkipped > 0
      ? snapshot.verificationCompleted /
        (snapshot.verificationCompleted + snapshot.verificationSkipped)
      : 0;

  const health =
    100 -
    clamp(mentalRatio * 45 + (snapshot.assessments.mhlsShift ?? 0) * 1.8, 0, 85);
  const religion =
    100 -
    clamp(
      religionRatio * 45 +
        (snapshot.assessments.rcopePositiveShift ?? 0) * 2 -
        (snapshot.assessments.rcopeNegativeShift ?? 0) * 1.5,
      0,
      85,
    );
  const science =
    100 -
    clamp(
      deeprealRatio * 45 +
        (snapshot.assessments.mistShift ?? 0) * 3 +
        verificationRatio * 20,
      0,
      90,
    );
  const social =
    100 -
    clamp(snapshot.sourceOpens * 3 + verificationRatio * 35, 0, 80);
  const politics =
    100 -
    clamp(
      deeprealRatio * 25 +
        religionRatio * 10 +
        (snapshot.trustCalibration.latestCtcs ?? 0) * 0.5,
      0,
      80,
    );
  const economy =
    100 -
    clamp(
      snapshot.promptUses * 4 +
        snapshot.correctionEntries * 5 +
        (snapshot.confidenceShift ?? 0) * 1.2,
      0,
      78,
    );

  return [
    { key: "health", labelEn: "Health", labelAr: "الصحة", vulnerability: round(clamp(health, 12, 92)) },
    { key: "religion", labelEn: "Religion", labelAr: "الدين", vulnerability: round(clamp(religion, 12, 92)) },
    { key: "politics", labelEn: "Politics", labelAr: "السياسة", vulnerability: round(clamp(politics, 12, 92)) },
    { key: "economy", labelEn: "Economy", labelAr: "الاقتصاد", vulnerability: round(clamp(economy, 12, 92)) },
    { key: "science", labelEn: "Science", labelAr: "العلوم", vulnerability: round(clamp(science, 12, 92)) },
    { key: "social", labelEn: "Social", labelAr: "المجتمع", vulnerability: round(clamp(social, 12, 92)) },
  ];
}

export function buildAwarenessReport(options: {
  snapshot: ParticipantSnapshot;
  displayName?: string;
  language?: "ar" | "en";
}): AwarenessReport {
  const { snapshot } = options;
  const language =
    options.language ??
    (snapshot.languageProfile === "english" ? "en" : "ar");
  const strongest = inferStrongestSkill(snapshot);
  const focusArea = inferFocusArea(snapshot);
  const bias = inferEstimatedBias(snapshot);
  const badge = inferBadge(snapshot.assessments.compositeImprovement);
  const dimensions = buildVulnerabilityDimensions(snapshot);
  const generatedAt = new Date().toISOString();
  const expiresAt = new Date(
    Date.now() + SHARE_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  return {
    reportId: `report-${snapshot.participantId}-${Date.now()}`,
    participantId: snapshot.participantId,
    displayName: options.displayName?.trim() || "Awareness Builder",
    language,
    generatedAt,
    expiresAt,
    completionRate: round((snapshot.exercisesCompleted / 42) * 100),
    exercisesCompleted: snapshot.exercisesCompleted,
    totalExercises: 42,
    totalTimeMinutes: snapshot.totalTimeMinutes,
    streakDays: snapshot.streakDays,
    confidenceShift: snapshot.confidenceShift,
    compositeImprovement: snapshot.assessments.compositeImprovement,
    strongestSkillEn: strongest.en,
    strongestSkillAr: strongest.ar,
    focusAreaEn: focusArea.en,
    focusAreaAr: focusArea.ar,
    estimatedBiasEn: bias.en,
    estimatedBiasAr: bias.ar,
    badgeEn: badge.en,
    badgeAr: badge.ar,
    scoreSummary: {
      mistPre: snapshot.assessments.mistPre,
      mistPost: snapshot.assessments.mistPost,
      mhlsPre: snapshot.assessments.mhlsPre,
      mhlsPost: snapshot.assessments.mhlsPost,
      ghsqPre: snapshot.assessments.ghsqPre,
      ghsqPost: snapshot.assessments.ghsqPost,
      susPost: snapshot.assessments.susPost,
    },
    dimensions,
    summaryEn: [
      `You completed ${snapshot.exercisesCompleted} of 42 awareness drills with a ${round((snapshot.exercisesCompleted / 42) * 100)}% completion rate.`,
      `Your strongest skill right now is ${strongest.en}, while your main development area is ${focusArea.en}.`,
      `Estimated bias tendency: ${bias.en}. Composite improvement: ${snapshot.assessments.compositeImprovement ?? 0}%.`,
    ],
    summaryAr: [
      `أنهيت ${snapshot.exercisesCompleted} من أصل 42 تدريباً بنسبة إكمال ${round((snapshot.exercisesCompleted / 42) * 100)}٪.`,
      `أقوى مهارة لديك الآن هي ${strongest.ar}، بينما نقطة التطوير الأساسية هي ${focusArea.ar}.`,
      `النزعة التقديرية الأوضح لديك هي ${bias.ar}. نسبة التحسن المركبة الحالية ${snapshot.assessments.compositeImprovement ?? 0}٪.`,
    ],
    privacy: {
      storedEn: [
        "Progress, assessments, and report checkpoints are stored on this device in browser localStorage.",
        "Supervisor assessment exports are written to the app runtime folder when submitted to the assessment API.",
      ],
      storedAr: [
        "يتم حفظ التقدم والتقييمات ونقاط حفظ التقرير على هذا الجهاز داخل localStorage في المتصفح.",
        "تُكتب صادرات التقييم الخاصة بالمشرف إلى مجلد التشغيل الخاص بالتطبيق عند إرسالها عبر واجهة تقييمات النظام.",
      ],
      retentionEn: [
        "Share links expire after 90 days.",
        "Pilot reset codes expire after 1 hour.",
        "Report checkpoints keep the latest 20 saves unless the browser data is cleared.",
      ],
      retentionAr: [
        "تنتهي صلاحية روابط المشاركة بعد 90 يوماً.",
        "تنتهي صلاحية رموز إعادة التعيين التجريبية بعد ساعة واحدة.",
        "يحتفظ النظام بآخر 20 نقطة حفظ للتقارير ما لم يتم مسح بيانات المتصفح.",
      ],
    },
  };
}

export function serializeAwarenessReport(report: AwarenessReport) {
  return encodeBase64Url(JSON.stringify(report));
}

export function deserializeAwarenessReport(token: string) {
  try {
    const report = JSON.parse(decodeBase64Url(token)) as AwarenessReport;
    const expired = new Date(report.expiresAt).getTime() < Date.now();
    return { ok: !expired, expired, report };
  } catch {
    return { ok: false, expired: false, report: null };
  }
}

export function createShareableReportLink(report: AwarenessReport, origin: string) {
  return `${origin.replace(/\/$/, "")}/report/${serializeAwarenessReport(report)}`;
}

export function getReportCheckpoints(): ReportCheckpoint[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REPORT_CHECKPOINTS_KEY);
    return raw ? (JSON.parse(raw) as ReportCheckpoint[]) : [];
  } catch {
    return [];
  }
}

export function saveReportCheckpoint(
  report: AwarenessReport,
  trigger: ReportCheckpoint["trigger"],
) {
  if (typeof window === "undefined") return;
  const next: ReportCheckpoint = {
    id: `${report.reportId}-${trigger}`,
    trigger,
    savedAt: new Date().toISOString(),
    report,
  };
  const checkpoints = [next, ...getReportCheckpoints()].slice(0, MAX_CHECKPOINTS);
  localStorage.setItem(REPORT_CHECKPOINTS_KEY, JSON.stringify(checkpoints));
}

export function getLatestReportCheckpoint() {
  return getReportCheckpoints()[0] ?? null;
}

function renderDimensionBars(report: AwarenessReport) {
  return report.dimensions
    .map(
      (dimension) => `
        <div class="dimension-row">
          <div class="dimension-label">${report.language === "ar" ? dimension.labelAr : dimension.labelEn}</div>
          <div class="dimension-track"><span style="width:${dimension.vulnerability}%"></span></div>
          <div class="dimension-value">${dimension.vulnerability}%</div>
        </div>`,
    )
    .join("");
}

export function buildPrintableReportHtml(report: AwarenessReport) {
  const isArabic = report.language === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const title = isArabic ? "وعيك نما" : "Your Awareness Grew";
  const strongest = isArabic ? report.strongestSkillAr : report.strongestSkillEn;
  const focus = isArabic ? report.focusAreaAr : report.focusAreaEn;
  const bias = isArabic ? report.estimatedBiasAr : report.estimatedBiasEn;
  const badge = isArabic ? report.badgeAr : report.badgeEn;
  const summary = (isArabic ? report.summaryAr : report.summaryEn)
    .map((line) => `<li>${line}</li>`)
    .join("");
  const stored = (isArabic ? report.privacy.storedAr : report.privacy.storedEn)
    .map((line) => `<li>${line}</li>`)
    .join("");
  const retention = (
    isArabic ? report.privacy.retentionAr : report.privacy.retentionEn
  )
    .map((line) => `<li>${line}</li>`)
    .join("");

  return `<!doctype html>
<html lang="${isArabic ? "ar" : "en"}" dir="${direction}">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg: #06111f;
        --card: #0d1b2e;
        --panel: #142640;
        --text: #f8fafc;
        --muted: #cbd5e1;
        --line: rgba(148,163,184,.24);
        --accent: #38bdf8;
        --accent2: #22c55e;
        --danger: #fb7185;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: linear-gradient(180deg, #030712 0%, #081425 100%);
        color: var(--text);
        font-family: "Noto Sans Arabic", system-ui, sans-serif;
      }
      .page {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        padding: 18mm 16mm;
        background: linear-gradient(180deg, rgba(13,27,46,1) 0%, rgba(8,20,37,1) 100%);
      }
      .hero {
        border: 1px solid rgba(56,189,248,.24);
        background: radial-gradient(circle at top, rgba(56,189,248,.18), rgba(15,23,42,.92) 58%);
        border-radius: 24px;
        padding: 22px 24px;
        margin-bottom: 18px;
      }
      .eyebrow { color: var(--accent); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
      h1 { margin: 10px 0 8px; font-size: 34px; line-height: 1.15; }
      .subtitle { color: var(--muted); font-size: 15px; line-height: 1.8; }
      .hero-grid, .metric-grid, .two-col {
        display: grid;
        gap: 14px;
      }
      .hero-grid { grid-template-columns: 1.5fr 1fr; margin-top: 18px; }
      .metric-grid { grid-template-columns: repeat(4, 1fr); margin: 18px 0; }
      .two-col { grid-template-columns: 1fr 1fr; }
      .card {
        background: rgba(15,23,42,.72);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 16px;
      }
      .metric-value { font-size: 28px; font-weight: 800; margin-top: 6px; }
      .metric-label { color: var(--muted); font-size: 12px; }
      .tag {
        display: inline-flex;
        align-items: center;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(34,197,94,.14);
        color: #dcfce7;
        font-size: 12px;
        font-weight: 700;
      }
      .list { margin: 0; padding-inline-start: 18px; color: var(--muted); line-height: 1.8; font-size: 13px; }
      .panel-title { font-size: 15px; margin: 0 0 10px; color: var(--text); }
      .score-row, .dimension-row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 10px;
        align-items: center;
      }
      .score-row { padding: 10px 0; border-bottom: 1px solid rgba(148,163,184,.14); }
      .score-row:last-child { border-bottom: 0; }
      .dimension-row { margin-bottom: 12px; }
      .dimension-label, .score-label { color: var(--text); font-size: 13px; }
      .dimension-track {
        width: 100%;
        height: 10px;
        background: rgba(148,163,184,.16);
        border-radius: 999px;
        overflow: hidden;
      }
      .dimension-track span {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--accent2), var(--danger));
      }
      .dimension-value, .score-value { font-weight: 700; font-size: 12px; color: var(--muted); }
      .share-card {
        aspect-ratio: 9 / 16;
        border-radius: 28px;
        padding: 22px;
        border: 1px solid rgba(56,189,248,.28);
        background: linear-gradient(180deg, rgba(56,189,248,.14), rgba(15,23,42,.96));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .share-card h2 { font-size: 30px; margin: 0 0 10px; line-height: 1.2; }
      .share-foot { color: var(--muted); font-size: 12px; }
      @media print {
        body { background: #fff; }
        .page { margin: 0; width: 100%; min-height: auto; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <section class="hero">
        <div class="eyebrow">Egyptian Awareness Library</div>
        <h1>${title}</h1>
        <div class="subtitle">${isArabic ? report.summaryAr[0] : report.summaryEn[0]}</div>
        <div class="hero-grid">
          <div class="card">
            <div class="panel-title">${isArabic ? "ملخص سريع" : "Quick summary"}</div>
            <ul class="list">${summary}</ul>
          </div>
          <div class="card">
            <div class="panel-title">${isArabic ? "الشارة الحالية" : "Current badge"}</div>
            <div class="tag">${badge}</div>
            <div class="score-row"><div class="score-label">${isArabic ? "أقوى مهارة" : "Strongest skill"}</div><div class="score-value" style="grid-column: span 2;">${strongest}</div></div>
            <div class="score-row"><div class="score-label">${isArabic ? "نقطة التطوير" : "Focus area"}</div><div class="score-value" style="grid-column: span 2;">${focus}</div></div>
            <div class="score-row"><div class="score-label">${isArabic ? "التحيز التقديري" : "Estimated bias"}</div><div class="score-value" style="grid-column: span 2;">${bias}</div></div>
          </div>
        </div>
      </section>

      <section class="metric-grid">
        <div class="card"><div class="metric-label">${isArabic ? "نسبة الإكمال" : "Completion"}</div><div class="metric-value">${report.completionRate}%</div></div>
        <div class="card"><div class="metric-label">${isArabic ? "الدقائق الكلية" : "Total minutes"}</div><div class="metric-value">${report.totalTimeMinutes}</div></div>
        <div class="card"><div class="metric-label">${isArabic ? "سلسلة الأيام" : "Streak"}</div><div class="metric-value">${report.streakDays}</div></div>
        <div class="card"><div class="metric-label">${isArabic ? "التحسن المركب" : "Composite improvement"}</div><div class="metric-value">${report.compositeImprovement ?? 0}%</div></div>
      </section>

      <section class="two-col">
        <div class="card">
          <div class="panel-title">${isArabic ? "مؤشرات القياس" : "Score summary"}</div>
          <div class="score-row"><div class="score-label">MIST-20</div><div class="score-value">${report.scoreSummary.mistPre ?? "—"}</div><div class="score-value">${report.scoreSummary.mistPost ?? "—"}</div></div>
          <div class="score-row"><div class="score-label">MHLS</div><div class="score-value">${report.scoreSummary.mhlsPre ?? "—"}</div><div class="score-value">${report.scoreSummary.mhlsPost ?? "—"}</div></div>
          <div class="score-row"><div class="score-label">GHSQ</div><div class="score-value">${report.scoreSummary.ghsqPre ?? "—"}</div><div class="score-value">${report.scoreSummary.ghsqPost ?? "—"}</div></div>
          <div class="score-row"><div class="score-label">SUS</div><div class="score-value" style="grid-column: span 2;">${report.scoreSummary.susPost ?? "—"}</div></div>
        </div>
        <div class="card">
          <div class="panel-title">${isArabic ? "بصمة القابلية للتضليل" : "Vulnerability fingerprint"}</div>
          ${renderDimensionBars(report)}
        </div>
      </section>

      <section class="two-col" style="margin-top:14px;">
        <div class="card">
          <div class="panel-title">${isArabic ? "سياسة التخزين" : "Storage policy"}</div>
          <ul class="list">${stored}</ul>
        </div>
        <div class="card">
          <div class="panel-title">${isArabic ? "الاحتفاظ والصلاحية" : "Retention and expiry"}</div>
          <ul class="list">${retention}</ul>
        </div>
      </section>

      <section style="margin-top:14px;">
        <div class="share-card">
          <div>
            <div class="eyebrow">${isArabic ? "بطاقة مشاركة" : "Share card"}</div>
            <h2>${title}</h2>
            <div class="subtitle">${isArabic ? report.summaryAr[1] : report.summaryEn[1]}</div>
          </div>
          <div>
            <div class="metric-value">${report.compositeImprovement ?? 0}%</div>
            <div class="share-foot">${isArabic ? "تنتهي صلاحية رابط المشاركة في" : "Share link expires on"} ${new Date(report.expiresAt).toLocaleDateString(isArabic ? "ar-EG" : "en-US")}</div>
          </div>
        </div>
      </section>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => window.print(), 500);
      });
    </script>
  </body>
</html>`;
}
