/**
 * PROMPT TEMPLATE INTERPOLATION — Q81
 * String interpolation for 42 prompts with dynamic variables
 * Variables: {claim}, {source_name}, {topic}, {language}, {evidence_type}, etc.
 * 
 * Framework: §20 — Prompt Operations Library
 */

export interface PromptTemplate {
  id: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  title: string;
  template: string;
  variables: PromptVariable[];
  category: string;
  guardrails: string[];
}

export interface PromptVariable {
  name: string;
  label: string;
  type: "text" | "select" | "source";
  options?: string[];
  required: boolean;
  placeholder?: string;
}

/**
 * Q81: Interpolate user data into prompt template before sending to LLM
 * Replaces {variable_name} with actual values
 */
export function interpolatePrompt(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{${key}\\}`, "g");
    result = result.replace(regex, value || `[${key}]`);
  }
  return result;
}

/**
 * Q84-85: PROMPT GUARDRAILS
 * Prevents diagnosis (MH-P02) and fatwa generation (RH-P04)
 * Returns null if safe, error message if blocked
 */
const BLOCKED_PATTERNS = {
  diagnosis: [
    /diagnos(e|is|ing)/i,
    /you (have|suffer from|are diagnosed)/i,
    /prescri(be|ption)/i,
    /\b(SSRI|antidepressant|medication)\b.*\brecommend\b/i,
    /\byou should take\b/i,
  ],
  fatwa: [
    /\bfatwa\b/i,
    /\bharam\b.*\bdefinitive/i,
    /\bhalal\b.*\bdefinitive/i,
    /\breligious ruling\b/i,
    /\byou must\b.*\b(pray|fast|worship)\b/i,
    /\bsin(ful|ning)?\b.*\byou\b/i,
  ],
  selfHarm: [
    /\b(suicide|kill yourself|end your life)\b/i,
    /\bself.?harm\b/i,
    /\bhow to (die|hurt yourself)\b/i,
  ],
};

export function checkGuardrails(
  input: string,
  mvp: "deepreal" | "mental-health" | "religion-hub"
): { safe: boolean; violation?: string; redirect?: string } {
  // Always check self-harm
  for (const pattern of BLOCKED_PATTERNS.selfHarm) {
    if (pattern.test(input)) {
      return {
        safe: false,
        violation: "⚠️ Crisis content detected. This is not the right tool. Please contact emergency support immediately.",
        redirect: "crisis",
      };
    }
  }

  // MH-specific: no diagnosis
  if (mvp === "mental-health") {
    for (const pattern of BLOCKED_PATTERNS.diagnosis) {
      if (pattern.test(input)) {
        return {
          safe: false,
          violation: "🛡️ Diagnosis Boundary (MH-P02): This prompt appears to request medical diagnosis. The platform provides education only, not professional diagnosis or treatment.",
        };
      }
    }
  }

  // Religion-specific: no fatwa
  if (mvp === "religion-hub") {
    for (const pattern of BLOCKED_PATTERNS.fatwa) {
      if (pattern.test(input)) {
        return {
          safe: false,
          violation: "🛡️ Non-Fatwa Guardrail (RH-P04): This prompt appears to request a religious ruling. The platform explores religion through psychology of religion research only.",
        };
      }
    }
  }

  return { safe: true };
}

/**
 * Q86: EMOTIONAL TRIGGER ANALYSIS
 * Identifies anger/fear/sadness words and returns spans with CSS classes
 */
const EMOTION_LEXICON: Record<string, string> = {
  // Anger words
  "outrage": "emotion-anger", "furious": "emotion-anger", "angry": "emotion-anger",
  "disgusting": "emotion-anger", "infuriating": "emotion-anger", "hate": "emotion-anger",
  "destroying": "emotion-anger", "exposed": "emotion-anger", "corrupt": "emotion-anger",
  "lying": "emotion-anger", "betrayed": "emotion-anger", "unacceptable": "emotion-anger",
  // Fear words
  "urgent": "emotion-fear", "warning": "emotion-fear", "danger": "emotion-fear",
  "threat": "emotion-fear", "crisis": "emotion-fear", "alarming": "emotion-fear",
  "terrifying": "emotion-fear", "shocking": "emotion-fear", "deadly": "emotion-fear",
  "harmful": "emotion-fear", "panic": "emotion-fear", "emergency": "emotion-fear",
  // Sadness words
  "suffering": "emotion-sadness", "tragic": "emotion-sadness", "heartbreaking": "emotion-sadness",
  "devastating": "emotion-sadness", "painful": "emotion-sadness", "hopeless": "emotion-sadness",
  "lonely": "emotion-sadness", "depressing": "emotion-sadness", "grief": "emotion-sadness",
  // Disgust words
  "revolting": "emotion-disgust", "vile": "emotion-disgust",
  "sickening": "emotion-disgust", "repulsive": "emotion-disgust",
};

export interface EmotionSpan {
  text: string;
  emotion: string | null;
  className: string | null;
}

export function analyzeEmotionalTriggers(text: string): EmotionSpan[] {
  const words = text.split(/(\s+)/);
  return words.map(word => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    const emotionClass = EMOTION_LEXICON[clean] || null;
    return {
      text: word,
      emotion: emotionClass ? emotionClass.replace("emotion-", "") : null,
      className: emotionClass,
    };
  });
}

/**
 * Pre-built prompt templates (§20) — sample for each MVP
 */
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "DR-P01",
    mvp: "deepreal",
    title: "SIFT Verification",
    template: "Apply the SIFT method to verify this claim: \"{claim}\". For each step (Stop, Investigate source, Find better coverage, Trace claims), explain what you would do and what you find. Focus on {source_name} as the primary source. Language: {language}.",
    variables: [
      { name: "claim", label: "The claim to verify", type: "text", required: true, placeholder: "Paste the claim here..." },
      { name: "source_name", label: "Source to investigate", type: "text", required: true, placeholder: "e.g., BBC, Al Jazeera" },
      { name: "language", label: "Response language", type: "select", options: ["English", "Arabic", "Both"], required: true },
    ],
    category: "verification",
    guardrails: ["Education only", "No political bias", "Cite sources"],
  },
  {
    id: "DR-P04",
    mvp: "deepreal",
    title: "Lateral Reading Plan",
    template: "Create a 5-step lateral reading plan to verify: \"{claim}\". For each step: 1) What to search, 2) Which sources to check, 3) What to compare, 4) What would confirm or deny. Use {evidence_type} as the evidence standard.",
    variables: [
      { name: "claim", label: "Claim to investigate", type: "text", required: true },
      { name: "evidence_type", label: "Evidence standard", type: "select", options: ["Systematic Review", "RCT", "Expert Consensus", "Any peer-reviewed"], required: true },
    ],
    category: "lateral_reading",
    guardrails: ["5 specific searches", "Name real sources", "No speculation"],
  },
  {
    id: "MH-P01",
    mvp: "mental-health",
    title: "Term Explainer",
    template: "Explain the mental health concept \"{topic}\" in simple, non-clinical language suitable for Egyptian university students. Include: 1) What it actually means, 2) What it does NOT mean, 3) When to seek professional help. Language: {language}. IMPORTANT: This is educational content only — do NOT diagnose.",
    variables: [
      { name: "topic", label: "Mental health topic", type: "text", required: true, placeholder: "e.g., anxiety, depression, PTSD" },
      { name: "language", label: "Response language", type: "select", options: ["English", "Arabic", "Both"], required: true },
    ],
    category: "education",
    guardrails: ["Education ONLY", "No diagnosis", "Include disclaimer", "Suggest professional help"],
  },
  {
    id: "RH-P01",
    mvp: "religion-hub",
    title: "Positive Coping Reflection",
    template: "From a psychology of religion perspective, explain how \"{topic}\" can serve as a positive coping mechanism. Reference Pargament's framework. Distinguish this from spiritual bypassing. Language: {language}. IMPORTANT: This is psychology of religion — NOT a fatwa or religious ruling.",
    variables: [
      { name: "topic", label: "Religious practice/concept", type: "text", required: true, placeholder: "e.g., prayer, gratitude, community" },
      { name: "language", label: "Response language", type: "select", options: ["English", "Arabic", "Both"], required: true },
    ],
    category: "reflection",
    guardrails: ["Psychology only", "No fatwa", "No religious rulings", "Reference academic sources"],
  },
];
