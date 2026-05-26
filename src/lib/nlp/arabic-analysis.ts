export interface ArabicEntity {
  text: string;
  type: "emotion" | "authority" | "health" | "religion" | "risk" | "person" | "location";
}

export interface ArabicAnalysisResult {
  language: "ar";
  dialectHint: "egyptian" | "msa" | "mixed";
  sentiment: {
    label: "negative" | "neutral" | "positive";
    confidence: number;
  };
  emotionalTriggers: string[];
  riskFlags: string[];
  entities: ArabicEntity[];
  provider: "microservice" | "fallback";
  disclaimer: string;
  processingTimeMs?: number;
}

const ARABIC_BACKEND_URL = process.env.ARABIC_NLP_BACKEND_URL;
const ARABIC_BACKEND_TOKEN = process.env.ARABIC_NLP_BACKEND_TOKEN;

const NEGATIVE_WORDS = ["خوف", "قلق", "اكتئاب", "كارثة", "مؤامرة", "خطر", "كراهية", "ذنب", "عار", "فضيحة"];
const POSITIVE_WORDS = ["أمل", "طمأنينة", "دعم", "رحمة", "سكينة", "تعافي", "ثقة", "صبر", "مساندة"];
const RISK_PATTERNS = ["عايز اموت", "أريد أن أموت", "مش عايز اعيش", "لا أريد الحياة", "إيذاء النفس", "انتحار"];
const AUTHORITY_TERMS = ["وزارة الصحة", "الأزهر", "دار الإفتاء", "منظمة الصحة العالمية", "WHO"];
const RELIGION_TERMS = ["الله", "القرآن", "حديث", "فتوى", "دعاء", "إيمان", "صبر"];

function detectDialect(text: string): ArabicAnalysisResult["dialectHint"] {
  const lower = text.toLowerCase();
  const egyptianHits = ["مش", "عايز", "إحنا", "ليه", "دلوقتي"].filter((term) => lower.includes(term)).length;
  const msaHits = ["أريد", "لماذا", "الآن", "نحن", "هذا"].filter((term) => lower.includes(term)).length;

  if (egyptianHits > msaHits) return "egyptian";
  if (msaHits > egyptianHits) return "msa";
  return "mixed";
}

function collectEntities(text: string): ArabicEntity[] {
  const entities: ArabicEntity[] = [];

  for (const term of AUTHORITY_TERMS) {
    if (text.includes(term)) {
      entities.push({ text: term, type: "authority" });
    }
  }
  for (const term of RELIGION_TERMS) {
    if (text.includes(term)) {
      entities.push({ text: term, type: "religion" });
    }
  }
  for (const term of NEGATIVE_WORDS.concat(POSITIVE_WORDS)) {
    if (text.includes(term)) {
      entities.push({ text: term, type: "emotion" });
    }
  }
  if (text.includes("صحة") || text.includes("مرض") || text.includes("علاج")) {
    entities.push({ text: "health-topic", type: "health" });
  }
  for (const term of RISK_PATTERNS) {
    if (text.includes(term)) {
      entities.push({ text: term, type: "risk" });
    }
  }

  return entities;
}

function fallbackArabicAnalysis(text: string): ArabicAnalysisResult {
  const negativeHits = NEGATIVE_WORDS.filter((term) => text.includes(term));
  const positiveHits = POSITIVE_WORDS.filter((term) => text.includes(term));
  const riskFlags = RISK_PATTERNS.filter((term) => text.includes(term));
  const emotionalTriggers = [...negativeHits, ...positiveHits].slice(0, 6);

  const label =
    negativeHits.length > positiveHits.length
      ? "negative"
      : positiveHits.length > negativeHits.length
        ? "positive"
        : "neutral";

  const confidenceBase = Math.min(0.45 + (negativeHits.length + positiveHits.length) * 0.08, 0.92);

  return {
    language: "ar",
    dialectHint: detectDialect(text),
    sentiment: {
      label,
      confidence: Number(confidenceBase.toFixed(2)),
    },
    emotionalTriggers,
    riskFlags,
    entities: collectEntities(text),
    provider: "fallback",
    disclaimer: ARABIC_BACKEND_URL
      ? "Fallback Arabic analysis was used because the configured CAMeL Tools backend did not return a valid payload."
      : "Fallback Arabic analysis is active. Set ARABIC_NLP_BACKEND_URL to connect to the analysis-backend Docker service running CAMeL Tools.",
  };
}

/** Normalize entity types from the Python backend to our TypeScript union */
function normalizeEntityType(type: string): ArabicEntity["type"] {
  const mapping: Record<string, ArabicEntity["type"]> = {
    emotion: "emotion",
    authority: "authority",
    health: "health",
    religion: "religion",
    risk: "risk",
    person: "person",
    location: "location",
    // CAMeL NER label mappings from the Python backend
    PER: "person",
    LOC: "location",
    ORG: "authority",
    MISC: "religion",
  };
  return mapping[type] ?? "emotion";
}

export async function analyzeArabicText(text: string): Promise<ArabicAnalysisResult> {
  if (!ARABIC_BACKEND_URL) {
    return fallbackArabicAnalysis(text);
  }

  try {
    const response = await fetch(ARABIC_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ARABIC_BACKEND_TOKEN ? { Authorization: `Bearer ${ARABIC_BACKEND_TOKEN}` } : {}),
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.error(`Arabic backend returned ${response.status}`);
      return fallbackArabicAnalysis(text);
    }

    const payload = (await response.json()) as Partial<ArabicAnalysisResult>;
    if (!payload.sentiment || !payload.language) {
      return fallbackArabicAnalysis(text);
    }

    // Normalize entity types from the backend
    const entities: ArabicEntity[] = Array.isArray(payload.entities)
      ? payload.entities.map((e) => ({ text: e.text, type: normalizeEntityType(e.type) }))
      : [];

    return {
      language: "ar",
      dialectHint: payload.dialectHint ?? detectDialect(text),
      sentiment: payload.sentiment,
      emotionalTriggers: payload.emotionalTriggers ?? [],
      riskFlags: payload.riskFlags ?? [],
      entities,
      provider: "microservice",
      disclaimer: payload.disclaimer ?? "Arabic NLP powered by CAMeL Tools (NYU Abu Dhabi).",
      processingTimeMs: payload.processingTimeMs,
    };
  } catch (error) {
    console.error("Arabic backend connection failed:", error);
    return fallbackArabicAnalysis(text);
  }
}
