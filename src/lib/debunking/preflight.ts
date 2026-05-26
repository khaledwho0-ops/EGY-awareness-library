import { classifyEgyptianContext } from "./classifier";
import { EgyptianContextVector } from "./egy-data";
import { isUrl, extractUrlContent } from "./workers/url-extractor";

// Interfaces
export interface PreflightContext {
  originalText: string;
  normalizedText: string;
  vector: EgyptianContextVector;
  isRedDirectPanic: boolean;
  isUrlInput: boolean;
  extractedTitle?: string;
  sourceUrl?: string;
}

/**
 * 1. Arabic Normalization
 * Translates Egyptian slang to formal MSA/English for API searchability.
 */
function normalizeArabicSlang(text: string): string {
  // Replace common Egyptian slang with MSA equivalents
  const normalized = text
    .replace(/عشان/g, "لأن")
    .replace(/إزاي/g, "كيف")
    .replace(/فين/g, "أين")
    .replace(/إيه/g, "ماذا")
    .replace(/كدة/g, "هكذا")
    .replace(/دلوقتي/g, "الآن")
    .replace(/بكرة/g, "غداً");
    
  // Further NLP normalization would be hooked in here (e.g., AraBERT)
  return normalized;
}

/**
 * 2. Panic / Toxicity Check
 * Detects acute danger indicating immediate intervention (Red-Direct Protocol).
 */
function checkRedDirectPanic(text: string): boolean {
  const panicKeywords = ["أنتحر", "هموت نفسي", "انتحار", "سم", "قتل", "قنبلة", "تفجير"];
  return panicKeywords.some(keyword => text.includes(keyword));
}

/**
 * Main Pre-Flight Routing Pipeline
 */
export async function runPreflight(rawText: string): Promise<PreflightContext> {
  let textForProcessing = rawText;
  let isUrlInput = false;
  let extractedTitle: string | undefined;
  let sourceUrl: string | undefined;

  // URL detection and extraction branch
  if (isUrl(rawText)) {
    isUrlInput = true;
    const extracted = await extractUrlContent(rawText);
    textForProcessing = extracted.content;
    extractedTitle = extracted.title;
    sourceUrl = extracted.sourceUrl;
  }

  // Always run the Arabic normalizer on whatever text we ended up with
  const normalizedText = normalizeArabicSlang(textForProcessing);
  const isRedDirectPanic = checkRedDirectPanic(normalizedText);

  // Use the genuine classifier
  const vector = await classifyEgyptianContext(normalizedText);

  return {
    originalText: rawText,
    normalizedText,
    vector,
    isRedDirectPanic,
    isUrlInput,
    extractedTitle,
    sourceUrl,
  };
}
