import path from "path";
import { DatabaseSync } from "node:sqlite";
import { SCIENCE_SIGNALS } from "@/data/research/scientific-intelligence";
import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import type { ModuleId } from "@/data/research/module-briefings";

export type EvidenceRegion = "global" | "egypt" | "mena";
export type EvidenceValueKind = "numeric" | "rank" | "text";
export type EvidenceSyncStatus = "seeded" | "live" | "stale" | "failed";

export interface EvidenceSource {
  id: string;
  moduleId: ModuleId | "shared";
  sourceName: string;
  url: string;
  year: number | null;
  region: EvidenceRegion;
  method: string;
  retrievedAt: string;
  confidence: number;
  syncStatus: EvidenceSyncStatus;
  httpStatus: number | null;
  lastError: string;
  lastTitle: string;
}

export interface EvidenceClaim {
  id: string;
  moduleId: ModuleId;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  priority: number;
}

export interface EvidenceMetric {
  id: string;
  claimId: string;
  label: { en: string; ar: string };
  unit: string;
  sortOrder: number;
}

export interface EvidenceSnapshot {
  id: string;
  metricId: string;
  sourceId: string;
  region: EvidenceRegion;
  valueKind: EvidenceValueKind;
  valueNumeric: number | null;
  valueText: string;
  year: number | null;
  method: string;
  retrievedAt: string;
  confidence: number;
}

export interface EvidenceMetricView extends EvidenceMetric {
  snapshots: Array<
    EvidenceSnapshot & {
      source: EvidenceSource;
    }
  >;
}

export interface EvidenceClaimView extends EvidenceClaim {
  metrics: EvidenceMetricView[];
}

export interface EvidenceOverview {
  generatedAt: string;
  moduleId: ModuleId;
  claims: EvidenceClaimView[];
  sourceHealth: {
    total: number;
    live: number;
    failed: number;
    seeded: number;
    stale: number;
  };
  sources: EvidenceSource[];
}

const SQLITE_PATH = path.join(process.cwd(), ".runtime", "science.db");

let database: DatabaseSync | null = null;
let databaseUnavailable = false;

type SourceRow = {
  id: string;
  module_id: ModuleId | "shared";
  source_name: string;
  url: string;
  year: number | null;
  region: EvidenceRegion;
  method: string;
  retrieved_at: string;
  confidence: number;
  sync_status: EvidenceSyncStatus;
  http_status: number | null;
  last_error: string;
  last_title: string;
};

type ClaimRow = {
  id: string;
  module_id: ModuleId;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  priority: number;
};

type MetricRow = {
  id: string;
  claim_id: string;
  label_en: string;
  label_ar: string;
  unit: string;
  sort_order: number;
};

type SnapshotRow = {
  id: string;
  metric_id: string;
  source_id: string;
  region: EvidenceRegion;
  value_kind: EvidenceValueKind;
  value_numeric: number | null;
  value_text: string;
  year: number | null;
  method: string;
  retrieved_at: string;
  confidence: number;
};

const SOURCE_SEEDS: EvidenceSource[] = [
  {
    id: "src-wef-2024",
    moduleId: "deepreal",
    sourceName: "World Economic Forum, Global Risks Report 2024",
    url: "https://www.weforum.org/press/2024/01/global-risks-report-2024-press-release/",
    year: 2024,
    region: "global",
    method: "Comparative global risk survey",
    retrievedAt: "",
    confidence: 0.94,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-who-disinfo-2024",
    moduleId: "shared",
    sourceName: "WHO Q&A: Disinformation and public health",
    url: "https://www.who.int/news-room/questions-and-answers/item/disinformation-and-public-health",
    year: 2024,
    region: "global",
    method: "WHO public-health guidance",
    retrievedAt: "",
    confidence: 0.96,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-who-review-2022",
    moduleId: "shared",
    sourceName: "WHO Europe infodemic review",
    url: "https://www.who.int/europe/news/item/01-09-2022-infodemics-and-misinformation-negatively-affect-people-s-health-behaviours--new-who-review-finds",
    year: 2022,
    region: "global",
    method: "Review of 31 evidence reviews",
    retrievedAt: "",
    confidence: 0.93,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-science-advances-2022",
    moduleId: "deepreal",
    sourceName: "Science Advances prebunking study",
    url: "https://www.science.org/doi/10.1126/sciadv.abo6254",
    year: 2022,
    region: "global",
    method: "Experimental prebunking / inoculation study",
    retrievedAt: "",
    confidence: 0.92,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-who-mh-2023",
    moduleId: "mental-health",
    sourceName: "WHO EMRO: World Mental Health Day 2023",
    url: "https://www.emro.who.int/media/news/world-mental-health-day-2023-mental-health-is-a-basic-human-right.html",
    year: 2023,
    region: "global",
    method: "WHO regional public-health statement",
    retrievedAt: "",
    confidence: 0.94,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-who-emro-gap-2024",
    moduleId: "mental-health",
    sourceName: "WHO Results Report 2024-2025, Egypt / EMRO overview",
    url: "https://www.who.int/about/accountability/results/who-results-report-2024-2025/region-EMRO/2024/egypt",
    year: 2024,
    region: "mena",
    method: "Regional service-gap and implementation report",
    retrievedAt: "",
    confidence: 0.91,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-unicef-egypt-child-protection",
    moduleId: "mental-health",
    sourceName: "UNICEF Egypt child protection page",
    url: "https://www.unicef.org/egypt/child-protection",
    year: 2014,
    region: "egypt",
    method: "DHS-linked child protection data summary",
    retrievedAt: "",
    confidence: 0.9,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-unicef-egypt-cyber",
    moduleId: "shared",
    sourceName: "UNICEF Egypt cyberbullying and internet safety",
    url: "https://www.unicef.org/egypt/protecting-children-cyberbullying",
    year: 2024,
    region: "egypt",
    method: "Official child and caregiver safety guidance",
    retrievedAt: "",
    confidence: 0.89,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-pew-religion-2024",
    moduleId: "religion-hub",
    sourceName: "Pew Research Center religion restrictions report",
    url: "https://www.pewresearch.org/religion/2024/03/05/restrictions-on-religion-in-the-worlds-25-most-populous-countries-in-2021/",
    year: 2024,
    region: "egypt",
    method: "Comparative restrictions and hostilities report",
    retrievedAt: "",
    confidence: 0.9,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-uscirf-egypt-2025",
    moduleId: "religion-hub",
    sourceName: "USCIRF Egypt religious freedom update",
    url: "https://www.uscirf.gov/news-room/releases-statements/uscirf-releases-report-religious-freedom-egypt",
    year: 2025,
    region: "egypt",
    method: "Country freedom-monitoring report",
    retrievedAt: "",
    confidence: 0.85,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-arab-barometer-religion",
    moduleId: "religion-hub",
    sourceName: "Arab Barometer religion topic and methodology",
    url: "https://www.arabbarometer.org/topics/religion/",
    year: 2026,
    region: "mena",
    method: "Regionally representative public-opinion polling",
    retrievedAt: "",
    confidence: 0.89,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-ifcn-principles",
    moduleId: "deepreal",
    sourceName: "IFCN Code of Principles",
    url: "https://ifcncodeofprinciples.poynter.org/",
    year: 2026,
    region: "global",
    method: "Auditable trust-standard framework",
    retrievedAt: "",
    confidence: 0.95,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-al-azhar",
    moduleId: "religion-hub",
    sourceName: "Al-Azhar",
    url: "https://www.azhar.eg/",
    year: 2026,
    region: "egypt",
    method: "Official Egyptian religious authority",
    retrievedAt: "",
    confidence: 0.9,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-dar-al-ifta",
    moduleId: "religion-hub",
    sourceName: "Dar al-Ifta Egypt",
    url: "https://www.dar-alifta.org/en",
    year: 2026,
    region: "egypt",
    method: "Official Egyptian guidance institution",
    retrievedAt: "",
    confidence: 0.9,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
  {
    id: "src-mohp-egypt",
    moduleId: "mental-health",
    sourceName: "Egypt Ministry of Health and Population",
    url: "https://www.mohp.gov.eg/",
    year: 2026,
    region: "egypt",
    method: "Official Egyptian health-system source",
    retrievedAt: "",
    confidence: 0.93,
    syncStatus: "seeded",
    httpStatus: null,
    lastError: "",
    lastTitle: "",
  },
];

const CLAIM_SEEDS: EvidenceClaim[] = [
  {
    id: "claim-dr-risk",
    moduleId: "deepreal",
    title: {
      en: "Misinformation is a system risk, not a side topic.",
      ar: "المعلومات المضللة خطر منظومي وليست موضوعاً جانبياً.",
    },
    summary: {
      en: "Use this claim to explain why DeepReal must route behavior, not just display tips.",
      ar: "استخدم هذه الدعوى لشرح لماذا يجب أن يوجّه ديب ريل السلوك لا أن يكتفي بعرض النصائح.",
    },
    priority: 1,
  },
  {
    id: "claim-dr-training",
    moduleId: "deepreal",
    title: {
      en: "Prebunking and evidence review change user susceptibility.",
      ar: "التحصين المسبق ومراجعة الأدلة يغيران قابلية المستخدم للتلاعب.",
    },
    summary: {
      en: "This claim anchors the exercise-first and logic-first design of DeepReal.",
      ar: "هذه الدعوى تثبت تصميم ديب ريل القائم على التمرين أولاً والمنطق أولاً.",
    },
    priority: 2,
  },
  {
    id: "claim-mh-scale",
    moduleId: "mental-health",
    title: {
      en: "Mental-health literacy is public-health infrastructure.",
      ar: "التوعية بالصحة النفسية بنية تحتية للصحة العامة.",
    },
    summary: {
      en: "The module must route users safely because the need is large and service access is uneven.",
      ar: "يجب أن يوجّه هذا المحور المستخدمين بأمان لأن الحاجة كبيرة والوصول إلى الخدمات غير متكافئ.",
    },
    priority: 1,
  },
  {
    id: "claim-mh-egypt",
    moduleId: "mental-health",
    title: {
      en: "Egypt-facing mental-health content must be youth-safe and stigma-aware.",
      ar: "محتوى الصحة النفسية الموجه لمصر يجب أن يكون آمناً للشباب وواعياً بالوصمة.",
    },
    summary: {
      en: "Egypt-specific child protection and cyberbullying signals make generic self-help language insufficient.",
      ar: "مؤشرات حماية الطفل والتنمر الإلكتروني في مصر تجعل لغة المساعدة الذاتية العامة غير كافية.",
    },
    priority: 2,
  },
  {
    id: "claim-rh-moderation",
    moduleId: "religion-hub",
    title: {
      en: "Religion Hub must be moderation-first in the Egyptian context.",
      ar: "يجب أن يكون محور الدين قائماً على الاعتدال أولاً في السياق المصري.",
    },
    summary: {
      en: "This claim justifies de-escalation, anti-sectarian framing, and verified official routing.",
      ar: "هذه الدعوى تبرر التهدئة، ومقاومة الطائفية، والتوجيه إلى الجهات الرسمية الموثقة.",
    },
    priority: 1,
  },
  {
    id: "claim-rh-boundaries",
    moduleId: "religion-hub",
    title: {
      en: "Safe religious support must preserve boundaries with mental-health care.",
      ar: "الدعم الديني الآمن يجب أن يحافظ على الحدود مع رعاية الصحة النفسية.",
    },
    summary: {
      en: "The module must keep official guidance and mental-health handoff visible together.",
      ar: "يجب أن يُبقي هذا المحور على التوجيه الرسمي والإحالة إلى الصحة النفسية ظاهرين معاً.",
    },
    priority: 2,
  },
];

const METRIC_SEEDS: EvidenceMetric[] = [
  { id: "metric-dr-risk-rank", claimId: "claim-dr-risk", label: { en: "Short-term global risk rank", ar: "ترتيب الخطر العالمي قصير المدى" }, unit: "rank", sortOrder: 1 },
  { id: "metric-dr-harm-scope", claimId: "claim-dr-risk", label: { en: "Public-health harm scope", ar: "نطاق الضرر على الصحة العامة" }, unit: "signal", sortOrder: 2 },
  { id: "metric-dr-egypt-safety", claimId: "claim-dr-risk", label: { en: "Egypt child and caregiver safety signal", ar: "إشارة أمان الطفل ومقدم الرعاية في مصر" }, unit: "signal", sortOrder: 3 },
  { id: "metric-dr-prebunk", claimId: "claim-dr-training", label: { en: "Reduction in susceptibility", ar: "انخفاض القابلية للتلاعب" }, unit: "%", sortOrder: 1 },
  { id: "metric-dr-reviews", claimId: "claim-dr-training", label: { en: "Evidence reviews synthesized", ar: "عدد المراجعات المجمعة" }, unit: "reviews", sortOrder: 2 },
  { id: "metric-mh-global-burden", claimId: "claim-mh-scale", label: { en: "People living with mental conditions", ar: "أشخاص يعيشون مع حالات نفسية" }, unit: "millions", sortOrder: 1 },
  { id: "metric-mh-treatment-gap", claimId: "claim-mh-scale", label: { en: "Regional treatment gap", ar: "فجوة العلاج الإقليمية" }, unit: "%", sortOrder: 2 },
  { id: "metric-mh-child-discipline", claimId: "claim-mh-egypt", label: { en: "Children exposed to violent discipline", ar: "أطفال تعرضوا لعنف تربوي" }, unit: "%", sortOrder: 1 },
  { id: "metric-mh-cyber-safety", claimId: "claim-mh-egypt", label: { en: "Egypt online youth safety signal", ar: "إشارة أمان الشباب على الإنترنت في مصر" }, unit: "signal", sortOrder: 2 },
  { id: "metric-rh-restrictions", claimId: "claim-rh-moderation", label: { en: "Religion restrictions signal", ar: "إشارة قيود الدين" }, unit: "signal", sortOrder: 1 },
  { id: "metric-rh-uscirf", claimId: "claim-rh-moderation", label: { en: "Egypt pressure update", ar: "تحديث الضغط في مصر" }, unit: "signal", sortOrder: 2 },
  { id: "metric-rh-barometer", claimId: "claim-rh-moderation", label: { en: "Regional opinion anchor", ar: "مرتكز الرأي العام الإقليمي" }, unit: "signal", sortOrder: 3 },
  { id: "metric-rh-official-routing", claimId: "claim-rh-boundaries", label: { en: "Official moderation routes", ar: "مسارات الاعتدال الرسمية" }, unit: "institutions", sortOrder: 1 },
  { id: "metric-rh-care-boundary", claimId: "claim-rh-boundaries", label: { en: "Care boundary requirement", ar: "متطلب حدود الرعاية" }, unit: "signal", sortOrder: 2 },
];

const SNAPSHOT_SEEDS: EvidenceSnapshot[] = [
  {
    id: "snapshot-dr-risk-rank",
    metricId: "metric-dr-risk-rank",
    sourceId: "src-wef-2024",
    region: "global",
    valueKind: "rank",
    valueNumeric: 1,
    valueText: "#1 short-term global risk",
    year: 2024,
    method: "Comparative risk ranking",
    retrievedAt: "",
    confidence: 0.94,
  },
  {
    id: "snapshot-dr-harm-scope",
    metricId: "metric-dr-harm-scope",
    sourceId: "src-who-disinfo-2024",
    region: "global",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Health, security, and decision-making harm",
    year: 2024,
    method: "WHO guidance framing",
    retrievedAt: "",
    confidence: 0.96,
  },
  {
    id: "snapshot-dr-egypt-safety",
    metricId: "metric-dr-egypt-safety",
    sourceId: "src-unicef-egypt-cyber",
    region: "egypt",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Rumors, scams, cyberbullying, and caregiver-facing digital safety guidance",
    year: 2024,
    method: "Official Egypt child safety guidance",
    retrievedAt: "",
    confidence: 0.89,
  },
  {
    id: "snapshot-dr-prebunk",
    metricId: "metric-dr-prebunk",
    sourceId: "src-science-advances-2022",
    region: "global",
    valueKind: "numeric",
    valueNumeric: 23,
    valueText: "21-25% reduction in susceptibility",
    year: 2022,
    method: "Experimental inoculation / prebunking",
    retrievedAt: "",
    confidence: 0.92,
  },
  {
    id: "snapshot-dr-reviews",
    metricId: "metric-dr-reviews",
    sourceId: "src-who-review-2022",
    region: "global",
    valueKind: "numeric",
    valueNumeric: 31,
    valueText: "31 reviews synthesized",
    year: 2022,
    method: "Review-of-reviews summary",
    retrievedAt: "",
    confidence: 0.93,
  },
  {
    id: "snapshot-mh-global-burden",
    metricId: "metric-mh-global-burden",
    sourceId: "src-who-mh-2023",
    region: "global",
    valueKind: "numeric",
    valueNumeric: 1000,
    valueText: "More than 1 billion people",
    year: 2023,
    method: "WHO burden estimate",
    retrievedAt: "",
    confidence: 0.94,
  },
  {
    id: "snapshot-mh-treatment-gap",
    metricId: "metric-mh-treatment-gap",
    sourceId: "src-who-emro-gap-2024",
    region: "mena",
    valueKind: "numeric",
    valueNumeric: 90,
    valueText: "Treatment gap can reach 90%",
    year: 2024,
    method: "Regional service-gap report",
    retrievedAt: "",
    confidence: 0.91,
  },
  {
    id: "snapshot-mh-child-discipline",
    metricId: "metric-mh-child-discipline",
    sourceId: "src-unicef-egypt-child-protection",
    region: "egypt",
    valueKind: "numeric",
    valueNumeric: 93,
    valueText: "93% of children aged 1-14",
    year: 2014,
    method: "DHS-linked child protection data",
    retrievedAt: "",
    confidence: 0.9,
  },
  {
    id: "snapshot-mh-cyber-safety",
    metricId: "metric-mh-cyber-safety",
    sourceId: "src-unicef-egypt-cyber",
    region: "egypt",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Everyday caregiver and child digital safety guidance",
    year: 2024,
    method: "Official child safety guidance",
    retrievedAt: "",
    confidence: 0.89,
  },
  {
    id: "snapshot-rh-restrictions",
    metricId: "metric-rh-restrictions",
    sourceId: "src-pew-religion-2024",
    region: "egypt",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Egypt appears among the most restrictive environments in Pew's 25-country comparison",
    year: 2024,
    method: "Comparative restrictions tracking",
    retrievedAt: "",
    confidence: 0.9,
  },
  {
    id: "snapshot-rh-uscirf",
    metricId: "metric-rh-uscirf",
    sourceId: "src-uscirf-egypt-2025",
    region: "egypt",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Continuing pressure, restrictions, and selective tolerance",
    year: 2025,
    method: "Country monitoring update",
    retrievedAt: "",
    confidence: 0.85,
  },
  {
    id: "snapshot-rh-barometer",
    metricId: "metric-rh-barometer",
    sourceId: "src-arab-barometer-religion",
    region: "mena",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Ongoing nationally representative religion and public-life polling",
    year: 2026,
    method: "Regional public-opinion polling",
    retrievedAt: "",
    confidence: 0.89,
  },
  {
    id: "snapshot-rh-official-routing-azhar",
    metricId: "metric-rh-official-routing",
    sourceId: "src-al-azhar",
    region: "egypt",
    valueKind: "text",
    valueNumeric: 1,
    valueText: "Official moderation authority available",
    year: 2026,
    method: "Institutional route",
    retrievedAt: "",
    confidence: 0.9,
  },
  {
    id: "snapshot-rh-official-routing-ifta",
    metricId: "metric-rh-official-routing",
    sourceId: "src-dar-al-ifta",
    region: "egypt",
    valueKind: "text",
    valueNumeric: 2,
    valueText: "Official guidance authority available",
    year: 2026,
    method: "Institutional route",
    retrievedAt: "",
    confidence: 0.9,
  },
  {
    id: "snapshot-rh-care-boundary",
    metricId: "metric-rh-care-boundary",
    sourceId: "src-who-disinfo-2024",
    region: "global",
    valueKind: "text",
    valueNumeric: null,
    valueText: "Health misinformation changes decisions and can intensify harm when guidance replaces care",
    year: 2024,
    method: "WHO harm framing",
    retrievedAt: "",
    confidence: 0.96,
  },
];

function getDatabase() {
  if (databaseUnavailable) {
    return null;
  }

  if (database) {
    return database;
  }

  try {
    database = new DatabaseSync(SQLITE_PATH);
    database.exec(`
      CREATE TABLE IF NOT EXISTS evidence_sources (
        id TEXT PRIMARY KEY,
        module_id TEXT NOT NULL,
        source_name TEXT NOT NULL,
        url TEXT NOT NULL,
        year INTEGER,
        region TEXT NOT NULL,
        method TEXT NOT NULL,
        retrieved_at TEXT NOT NULL DEFAULT '',
        confidence REAL NOT NULL DEFAULT 0.5,
        sync_status TEXT NOT NULL DEFAULT 'seeded',
        http_status INTEGER,
        last_error TEXT NOT NULL DEFAULT '',
        last_title TEXT NOT NULL DEFAULT ''
      );

      CREATE TABLE IF NOT EXISTS evidence_claims (
        id TEXT PRIMARY KEY,
        module_id TEXT NOT NULL,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        summary_en TEXT NOT NULL,
        summary_ar TEXT NOT NULL,
        priority INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS evidence_metrics (
        id TEXT PRIMARY KEY,
        claim_id TEXT NOT NULL,
        label_en TEXT NOT NULL,
        label_ar TEXT NOT NULL,
        unit TEXT NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS evidence_snapshots (
        id TEXT PRIMARY KEY,
        metric_id TEXT NOT NULL,
        source_id TEXT NOT NULL,
        region TEXT NOT NULL,
        value_kind TEXT NOT NULL,
        value_numeric REAL,
        value_text TEXT NOT NULL,
        year INTEGER,
        method TEXT NOT NULL,
        retrieved_at TEXT NOT NULL DEFAULT '',
        confidence REAL NOT NULL DEFAULT 0.5
      );
    `);

    seedEvidenceDatabase(database);
    return database;
  } catch {
    databaseUnavailable = true;
    database = null;
    return null;
  }
}

function seedEvidenceDatabase(db: DatabaseSync) {
  const sourceStatement = db.prepare(`
    INSERT INTO evidence_sources (
      id,
      module_id,
      source_name,
      url,
      year,
      region,
      method,
      retrieved_at,
      confidence,
      sync_status,
      http_status,
      last_error,
      last_title
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `);

  for (const source of SOURCE_SEEDS) {
    sourceStatement.run(
      source.id,
      source.moduleId,
      source.sourceName,
      source.url,
      source.year,
      source.region,
      source.method,
      source.retrievedAt,
      source.confidence,
      source.syncStatus,
      source.httpStatus,
      source.lastError,
      source.lastTitle
    );
  }

  const claimStatement = db.prepare(`
    INSERT INTO evidence_claims (
      id,
      module_id,
      title_en,
      title_ar,
      summary_en,
      summary_ar,
      priority
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `);

  for (const claim of CLAIM_SEEDS) {
    claimStatement.run(
      claim.id,
      claim.moduleId,
      claim.title.en,
      claim.title.ar,
      claim.summary.en,
      claim.summary.ar,
      claim.priority
    );
  }

  const metricStatement = db.prepare(`
    INSERT INTO evidence_metrics (
      id,
      claim_id,
      label_en,
      label_ar,
      unit,
      sort_order
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `);

  for (const metric of METRIC_SEEDS) {
    metricStatement.run(metric.id, metric.claimId, metric.label.en, metric.label.ar, metric.unit, metric.sortOrder);
  }

  const snapshotStatement = db.prepare(`
    INSERT INTO evidence_snapshots (
      id,
      metric_id,
      source_id,
      region,
      value_kind,
      value_numeric,
      value_text,
      year,
      method,
      retrieved_at,
      confidence
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `);

  for (const snapshot of SNAPSHOT_SEEDS) {
    snapshotStatement.run(
      snapshot.id,
      snapshot.metricId,
      snapshot.sourceId,
      snapshot.region,
      snapshot.valueKind,
      snapshot.valueNumeric,
      snapshot.valueText,
      snapshot.year,
      snapshot.method,
      snapshot.retrievedAt,
      snapshot.confidence
    );
  }
}

function toSource(row: SourceRow): EvidenceSource {
  return {
    id: row.id,
    moduleId: row.module_id,
    sourceName: row.source_name,
    url: row.url,
    year: row.year,
    region: row.region,
    method: row.method,
    retrievedAt: row.retrieved_at,
    confidence: row.confidence,
    syncStatus: row.sync_status,
    httpStatus: row.http_status,
    lastError: row.last_error,
    lastTitle: row.last_title,
  };
}

function getFallbackOverview(moduleId: ModuleId): EvidenceOverview {
  const sources = SOURCE_SEEDS.filter((source) => source.moduleId === moduleId || source.moduleId === "shared");
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const claims = CLAIM_SEEDS.filter((claim) => claim.moduleId === moduleId)
    .sort((left, right) => left.priority - right.priority)
    .map((claim) => ({
      ...claim,
      metrics: METRIC_SEEDS.filter((metric) => metric.claimId === claim.id)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((metric) => ({
          ...metric,
          snapshots: SNAPSHOT_SEEDS.filter((snapshot) => snapshot.metricId === metric.id)
            .map((snapshot) => ({
              ...snapshot,
              source: sourceMap.get(snapshot.sourceId) ?? SOURCE_SEEDS[0],
            }))
            .filter((snapshot) => snapshot.source.moduleId === moduleId || snapshot.source.moduleId === "shared"),
        })),
    }));

  return {
    generatedAt: new Date().toISOString(),
    moduleId,
    claims,
    sourceHealth: {
      total: sources.length,
      live: 0,
      failed: 0,
      seeded: sources.length,
      stale: 0,
    },
    sources,
  };
}

export async function getEvidenceOverview(moduleId: ModuleId): Promise<EvidenceOverview> {
  const db = getDatabase();
  if (!db) {
    return getFallbackOverview(moduleId);
  }

  const sourceRows = db
    .prepare(
      `
      SELECT *
      FROM evidence_sources
      WHERE module_id = ? OR module_id = 'shared'
      ORDER BY year DESC, source_name ASC
    `
    )
    .all(moduleId) as SourceRow[];

  const claimRows = db
    .prepare(
      `
      SELECT *
      FROM evidence_claims
      WHERE module_id = ?
      ORDER BY priority ASC, id ASC
    `
    )
    .all(moduleId) as ClaimRow[];

  const sourceMap = new Map(sourceRows.map((row) => [row.id, toSource(row)]));
  const metricsByClaim = new Map<string, EvidenceMetricView[]>();
  const metricRows = db.prepare("SELECT * FROM evidence_metrics ORDER BY sort_order ASC, id ASC").all() as MetricRow[];
  const snapshotRows = db.prepare("SELECT * FROM evidence_snapshots").all() as SnapshotRow[];

  for (const metric of metricRows) {
    const snapshots = snapshotRows
      .filter((snapshot) => snapshot.metric_id === metric.id)
      .map((snapshot) => ({
        id: snapshot.id,
        metricId: snapshot.metric_id,
        sourceId: snapshot.source_id,
        region: snapshot.region,
        valueKind: snapshot.value_kind,
        valueNumeric: snapshot.value_numeric,
        valueText: snapshot.value_text,
        year: snapshot.year,
        method: snapshot.method,
        retrievedAt: snapshot.retrieved_at,
        confidence: snapshot.confidence,
        source: sourceMap.get(snapshot.source_id),
      }))
      .filter(
        (
          snapshot
        ): snapshot is EvidenceSnapshot & {
          source: EvidenceSource;
        } => Boolean(snapshot.source)
      );

    if (snapshots.length === 0) {
      continue;
    }

    const nextMetric: EvidenceMetricView = {
      id: metric.id,
      claimId: metric.claim_id,
      label: { en: metric.label_en, ar: metric.label_ar },
      unit: metric.unit,
      sortOrder: metric.sort_order,
      snapshots,
    };

    const current = metricsByClaim.get(metric.claim_id) ?? [];
    current.push(nextMetric);
    metricsByClaim.set(metric.claim_id, current);
  }

  const claims = claimRows.map((claim) => ({
    id: claim.id,
    moduleId: claim.module_id,
    title: { en: claim.title_en, ar: claim.title_ar },
    summary: { en: claim.summary_en, ar: claim.summary_ar },
    priority: claim.priority,
    metrics: (metricsByClaim.get(claim.id) ?? []).sort((left, right) => left.sortOrder - right.sortOrder),
  }));

  return {
    generatedAt: new Date().toISOString(),
    moduleId,
    claims,
    sourceHealth: {
      total: sourceRows.length,
      live: sourceRows.filter((source) => source.sync_status === "live").length,
      failed: sourceRows.filter((source) => source.sync_status === "failed").length,
      seeded: sourceRows.filter((source) => source.sync_status === "seeded").length,
      stale: sourceRows.filter((source) => source.sync_status === "stale").length,
    },
    sources: sourceRows.map(toSource),
  };
}

export async function getAllEvidenceOverviews(): Promise<EvidenceOverview[]> {
  return Promise.all<Promise<EvidenceOverview>>([
    getEvidenceOverview("deepreal"),
    getEvidenceOverview("mental-health"),
    getEvidenceOverview("religion-hub"),
  ]);
}

async function syncSingleSource(source: EvidenceSource) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(source.url, {
      method: "GET",
      headers: {
        "User-Agent": "EgyptianAwarenessLibrary/1.0 (scientific sync)",
      },
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });
    const body = await response.text();
    const titleMatch = body.match(/<title>(.*?)<\/title>/i);
    clearTimeout(timeoutId);

    return {
      syncStatus: response.ok ? ("live" as const) : ("failed" as const),
      httpStatus: response.status,
      lastError: response.ok ? "" : `HTTP ${response.status}`,
      lastTitle: titleMatch?.[1]?.trim().slice(0, 180) ?? "",
      retrievedAt: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      syncStatus: "failed" as const,
      httpStatus: null,
      lastError: error instanceof Error ? error.message : "Unknown sync error",
      lastTitle: "",
      retrievedAt: new Date().toISOString(),
    };
  }
}

export async function syncEvidenceSources() {
  const db = getDatabase();
  if (!db) {
    return {
      checkedAt: new Date().toISOString(),
      sourceCount: SOURCE_SEEDS.length,
      liveCount: 0,
      failedCount: 0,
      failedSources: SOURCE_SEEDS.map((source) => ({
        id: source.id,
        sourceName: source.sourceName,
        error: "SQLite unavailable",
      })),
    };
  }

  const sourceRows = db.prepare("SELECT * FROM evidence_sources ORDER BY year DESC, source_name ASC").all() as SourceRow[];
  const sources = sourceRows.map(toSource);
  const updateStatement = db.prepare(`
    UPDATE evidence_sources
    SET
      retrieved_at = ?,
      sync_status = ?,
      http_status = ?,
      last_error = ?,
      last_title = ?
    WHERE id = ?
  `);

  const results = await Promise.all(
    sources.map(async (source) => {
      const synced = await syncSingleSource(source);
      updateStatement.run(
        synced.retrievedAt,
        synced.syncStatus,
        synced.httpStatus,
        synced.lastError,
        synced.lastTitle,
        source.id
      );
      return {
        id: source.id,
        sourceName: source.sourceName,
        ...synced,
      };
    })
  );

  return {
    checkedAt: new Date().toISOString(),
    sourceCount: sources.length,
    liveCount: results.filter((result) => result.syncStatus === "live").length,
    failedCount: results.filter((result) => result.syncStatus === "failed").length,
    failedSources: results
      .filter((result) => result.syncStatus === "failed")
      .map((result) => ({
        id: result.id,
        sourceName: result.sourceName,
        error: result.lastError,
      })),
  };
}

export async function getEvidenceSourceDirectory() {
  const db = getDatabase();
  if (!db) {
    return SOURCE_SEEDS;
  }

  const rows = db.prepare("SELECT * FROM evidence_sources ORDER BY year DESC, source_name ASC").all() as SourceRow[];
  return rows.map(toSource);
}

export function getEvidenceClaimIds(moduleId: ModuleId) {
  return CLAIM_SEEDS.filter((claim) => claim.moduleId === moduleId).map((claim) => claim.id);
}

export function getEgyptOfficialAuthoritySources(moduleId: ModuleId) {
  if (moduleId === "religion-hub") {
    return SOURCE_SEEDS.filter((source) => source.id === "src-al-azhar" || source.id === "src-dar-al-ifta");
  }

  if (moduleId === "mental-health") {
    return SOURCE_SEEDS.filter((source) => source.id === "src-mohp-egypt");
  }

  return SOURCE_SEEDS.filter((source) => source.id === "src-ifcn-principles" || source.id === "src-unicef-egypt-cyber");
}

export function getEvidenceSeedStats() {
  return {
    signals: SCIENCE_SIGNALS.length,
    trustedSources: TRUSTED_SOURCES.length,
    seededEvidenceSources: SOURCE_SEEDS.length,
    seededClaims: CLAIM_SEEDS.length,
  };
}
