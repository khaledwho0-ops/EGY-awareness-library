/**
 * Q81: PROMPT TEMPLATE INTERPOLATION — {claim}, {source_name}
 * Q84: MEDICAL GUARDRAIL — MH-P02 Diagnosis Boundary
 * Q85: FATWA GUARDRAIL — RH-P04 Non-fatwa
 * Q86: EMOTIONAL TRIGGER HIGHLIGHTING — NLP word coloring
 * Q87: MISUSE LOGGING — Jailbreak/self-harm detection
 *
 * AI safety layer for Prompt Lab operations.
 */

/** Q81: Template variable injection — replaces {claim}, {source_name} etc. */
export function interpolatePrompt(
  template: string,
  variables: Record<string, string>,
): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return result;
}

/** Q84: Medical guardrail keywords — prevents AI from acting as psychiatrist */
const MEDICAL_BLOCKED_PATTERNS = [
  /diagnos(e|is|ing)/i,
  /you (have|suffer from|are experiencing)/i,
  /prescri(be|ption)/i,
  /medication/i,
  /dosage/i,
  /treatment plan/i,
  /clinical assessment/i,
  /your condition/i,
];

/** Q85: Fatwa guardrail keywords — prevents religious rulings */
const FATWA_BLOCKED_PATTERNS = [
  /fatwa/i,
  /halal or haram/i,
  /religious ruling/i,
  /islamic verdict/i,
  /permissible or forbidden/i,
  /you (must|should) pray/i,
  /sin(ful|ning)/i,
  /kufr|kafir|shirk/i,
];

/** Q87: Self-harm / jailbreak detection patterns */
const HARM_PATTERNS = [
  /kill (myself|me)/i,
  /suicide/i,
  /self.?harm/i,
  /end (my|it|everything)/i,
  /want to die/i,
  /ignore (previous|all) instructions/i,
  /jailbreak/i,
  /pretend you are/i,
  /act as (a doctor|psychiatrist|imam|sheikh)/i,
  /DAN mode/i,
];

export interface GuardrailResult {
  safe: boolean;
  blocked: boolean;
  reason?: string;
  category?: "medical" | "fatwa" | "harm" | "jailbreak";
  crisisRedirect?: boolean;
}

/** Check prompt input against all guardrails */
export function checkGuardrails(
  input: string,
  mvp: "deepreal" | "mental-health" | "religion-hub",
): GuardrailResult {
  // Q87: Check for self-harm / crisis
  for (const pattern of HARM_PATTERNS) {
    if (pattern.test(input)) {
      return {
        safe: false,
        blocked: true,
        reason: "This input contains concerning content. If you are in crisis, please contact Mental Health Hotline: 16328 or Ambulance: 123.",
        category: "harm",
        crisisRedirect: true,
      };
    }
  }

  // Q84: Medical guardrail (Mental Health MVP)
  if (mvp === "mental-health") {
    for (const pattern of MEDICAL_BLOCKED_PATTERNS) {
      if (pattern.test(input)) {
        return {
          safe: false,
          blocked: true,
          reason: "This platform provides education only. It cannot diagnose, prescribe, or provide clinical treatment. Please consult a licensed professional.",
          category: "medical",
        };
      }
    }
  }

  // Q85: Fatwa guardrail (Religion Hub MVP)
  if (mvp === "religion-hub") {
    for (const pattern of FATWA_BLOCKED_PATTERNS) {
      if (pattern.test(input)) {
        return {
          safe: false,
          blocked: true,
          reason: "This platform focuses on the Psychology of Religion, not religious rulings. For fatwa questions, please consult Dar al-Ifta (107) or your local imam.",
          category: "fatwa",
        };
      }
    }
  }

  return { safe: true, blocked: false };
}

/** Q86: Emotional trigger word detection — returns word positions for highlighting */
export interface EmotionTag {
  word: string;
  emotion: "anger" | "fear" | "sadness" | "disgust";
  index: number;
}

const EMOTION_LEXICON: Record<string, "anger" | "fear" | "sadness" | "disgust"> = {
  outrage: "anger", fury: "anger", angry: "anger", furious: "anger",
  enraged: "anger", attack: "anger", destroy: "anger", hate: "anger",
  terrifying: "fear", alarming: "fear", danger: "fear", threat: "fear",
  panic: "fear", shocking: "fear", warning: "fear", urgent: "fear",
  devastating: "sadness", heartbreaking: "sadness", tragic: "sadness",
  loss: "sadness", grief: "sadness", suffering: "sadness",
  disgusting: "disgust", revolting: "disgust", repulsive: "disgust",
  sickening: "disgust", vile: "disgust", corrupt: "disgust",
};

export function detectEmotionalTriggers(text: string): EmotionTag[] {
  const words = text.split(/\s+/);
  const tags: EmotionTag[] = [];

  words.forEach((word, index) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    if (EMOTION_LEXICON[clean]) {
      tags.push({ word, emotion: EMOTION_LEXICON[clean], index });
    }
  });

  return tags;
}

/** Render text with emotional highlighting */
export function highlightEmotionalWords(text: string): string {
  const tags = detectEmotionalTriggers(text);
  if (tags.length === 0) return text;

  let result = text;
  // Replace from end to start to preserve indices
  for (const tag of tags.reverse()) {
    const cssClass = `emotion-${tag.emotion}`;
    result = result.replace(
      tag.word,
      `<span class="${cssClass}">${tag.word}</span>`
    );
  }
  return result;
}

/** Q87: Log misuse attempt (in production: sends to admin) */
export function logMisuseAttempt(
  input: string,
  category: string,
  timestamp: string = new Date().toISOString(),
): void {
  const log = { input: input.slice(0, 200), category, timestamp };
  // In production: POST to /api/admin/misuse-log
  console.warn("[GUARDRAIL] Misuse attempt logged:", log);

  // Store locally for supervisor review
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem("eal-misuse-log") || "[]");
    existing.push(log);
    localStorage.setItem("eal-misuse-log", JSON.stringify(existing));
  }
}
