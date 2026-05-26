import type { ChatMessageData } from "./chat-message";

export interface ChatSession {
  id: string;
  title: string;
  mode: string;
  messages: ChatMessageData[];
  createdAt: number;
  updatedAt: number;
}

/* ── localStorage helpers ── */

const STORAGE_KEY = "eal-chat-sessions";

export function loadSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatSession[];
    // Sort newest-first
    return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    /* storage full — ignore */
  }
}

export function createSession(mode: string): ChatSession {
  const MODE_TITLES: Record<string, { en: string; ar: string }> = {
    general: { en: "New Chat", ar: "محادثة جديدة" },
    "mental-health": { en: "Wellness Chat", ar: "محادثة صحة نفسية" },
    claim: { en: "Fact-Check", ar: "تحقق من ادعاء" },
    translation: { en: "Translation", ar: "ترجمة" },
    academic: { en: "Academic Research", ar: "بحث أكاديمي" },
  };
  const t = MODE_TITLES[mode] || MODE_TITLES.general;
  return {
    id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: t.en,
    mode,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/* ── Example prompts per mode ── */

export interface ExamplePrompt {
  textEn: string;
  textAr: string;
  icon?: string;
}

export const MODE_EXAMPLES: Record<string, ExamplePrompt[]> = {
  general: [
    { textEn: "What is the SIFT method for verifying information?", textAr: "ما هي طريقة SIFT للتحقق من المعلومات؟", icon: "🔍" },
    { textEn: "Explain cognitive biases in simple terms", textAr: "اشرح التحيزات المعرفية بشكل بسيط", icon: "🧠" },
    { textEn: "How does media literacy help in daily life?", textAr: "كيف تساعد الثقافة الإعلامية في الحياة اليومية؟", icon: "📚" },
  ],
  "mental-health": [
    { textEn: "What are signs of burnout in students?", textAr: "ما هي علامات الاحتراق النفسي عند الطلاب؟", icon: "🔥" },
    { textEn: "Breathing exercises for anxiety", textAr: "تمارين تنفس لتخفيف القلق", icon: "🌬️" },
    { textEn: "How to support a friend with depression", textAr: "كيف أدعم صديق عنده اكتئاب؟", icon: "🤝" },
  ],
  claim: [
    { textEn: "Is it true that 5G causes health problems?", textAr: "هل صحيح إن الـ 5G بيسبب مشاكل صحية؟", icon: "📡" },
    { textEn: "Verify: drinking warm water cures COVID", textAr: "تحقق: شرب الماء الدافئ بيعالج كورونا", icon: "🦠" },
    { textEn: "Fact check this claim about vaccines", textAr: "تحقق من الادعاء ده عن اللقاحات", icon: "💉" },
  ],
  translation: [
    { textEn: "Translate to Arabic: Mental health is not a luxury", textAr: "ترجم للإنجليزي: الصحة النفسية مش رفاهية", icon: "🌐" },
    { textEn: "What does 'cognitive dissonance' mean in Arabic?", textAr: "يعني إيه cognitive dissonance بالعربي؟", icon: "🔄" },
    { textEn: "Translate: التفكير النقدي أساس مقاومة التضليل", textAr: "ترجم: Critical thinking is the foundation of misinformation resilience", icon: "📝" },
  ],
  academic: [
    { textEn: "Summarize inoculation theory with sources", textAr: "لخص نظرية التلقيح المعرفي مع المصادر", icon: "📄" },
    { textEn: "What is the COM-B model of behavior change?", textAr: "ما هو نموذج COM-B لتغيير السلوك؟", icon: "📊" },
    { textEn: "Evidence for digital literacy interventions", textAr: "أدلة على فعالية تدخلات الثقافة الرقمية", icon: "🎓" },
  ],
};

/* ── Mode metadata ── */

export interface ModeInfo {
  id: string;
  color: string;
  descEn: string;
  descAr: string;
  toolDescEn: string;
  toolDescAr: string;
  whenToUseEn: string;
  whenToUseAr: string;
  outputEn: string;
  outputAr: string;
}

export const MODE_INFO: Record<string, ModeInfo> = {
  general: {
    id: "general",
    color: "#3B82F6",
    descEn: "Ask anything about misinformation, digital literacy, or the EAL platform.",
    descAr: "اسأل أي سؤال عن التضليل، الثقافة الرقمية، أو منصة EAL.",
    toolDescEn: "General-purpose AI assistant that can answer questions about the platform, misinformation, and digital literacy topics.",
    toolDescAr: "مساعد ذكاء اصطناعي عام يجيب على الأسئلة المتعلقة بالمنصة والتضليل والثقافة الرقمية.",
    whenToUseEn: "When you need general information or have a question that doesn't fit other categories.",
    whenToUseAr: "عندما تحتاج معلومات عامة أو عندك سؤال مش ضمن الفئات التانية.",
    outputEn: "Clear, concise answers in your language with relevant context.",
    outputAr: "إجابات واضحة ومختصرة بلغتك مع سياق مناسب.",
  },
  "mental-health": {
    id: "mental-health",
    color: "#10B981",
    descEn: "Psychoeducation and mental health literacy. Not therapy — education and resource guidance.",
    descAr: "توعية نفسية وثقافة صحية. مش علاج — تعليم وتوجيه لمصادر المساعدة.",
    toolDescEn: "Mental health literacy assistant providing psychoeducation, coping techniques, and resource guidance.",
    toolDescAr: "مساعد ثقافة الصحة النفسية يقدم توعية نفسية وتقنيات تكيف وتوجيه لمصادر المساعدة.",
    whenToUseEn: "When you need information about mental health topics, coping strategies, or crisis resources.",
    whenToUseAr: "عندما تحتاج معلومات عن الصحة النفسية أو استراتيجيات التكيف أو موارد الأزمات.",
    outputEn: "Supportive, educational content with crisis hotline info when needed.",
    outputAr: "محتوى تعليمي داعم مع معلومات خطوط الأزمات عند الحاجة.",
  },
  claim: {
    id: "claim",
    color: "#EF4444",
    descEn: "Paste a claim and get a structured fact-check with verdict, red flags, and cognitive biases.",
    descAr: "الصق ادعاء واحصل على تحقق منظم مع الحكم والأعلام الحمراء والتحيزات.",
    toolDescEn: "Fact-checking engine that analyzes claims and provides structured verdicts with evidence.",
    toolDescAr: "محرك تحقق من الحقائق يحلل الادعاءات ويقدم أحكام منظمة مع الأدلة.",
    whenToUseEn: "When you encounter a suspicious claim and want to verify its accuracy.",
    whenToUseAr: "عندما تقابل ادعاء مشكوك فيه وعايز تتأكد من صحته.",
    outputEn: "Verdict (TRUE/FALSE/MISLEADING), confidence score, red flags, and recommended actions.",
    outputAr: "حكم (صحيح/خاطئ/مضلل)، درجة ثقة، أعلام حمراء، وإجراءات موصى بيها.",
  },
  translation: {
    id: "translation",
    color: "#F59E0B",
    descEn: "Accurate Arabic↔English translation preserving context, tone, and meaning.",
    descAr: "ترجمة دقيقة عربي↔إنجليزي مع الحفاظ على السياق والمعنى.",
    toolDescEn: "Professional translator supporting Arabic↔English with context-aware, natural output.",
    toolDescAr: "مترجم محترف يدعم العربية↔الإنجليزية مع ترجمة طبيعية واعية بالسياق.",
    whenToUseEn: "When you need accurate translation between Arabic and English.",
    whenToUseAr: "عندما تحتاج ترجمة دقيقة بين العربية والإنجليزية.",
    outputEn: "Natural translation with technical term notes and dialect support.",
    outputAr: "ترجمة طبيعية مع ملاحظات المصطلحات الفنية ودعم اللهجات.",
  },
  academic: {
    id: "academic",
    color: "#8B5CF6",
    descEn: "Research-grade answers with original sources, citations, and evidence.",
    descAr: "إجابات بمستوى أكاديمي مع المصادر الأصلية والاستشهادات والأدلة.",
    toolDescEn: "Academic research assistant providing cited, evidence-based answers with APA-style references.",
    toolDescAr: "مساعد بحث أكاديمي يقدم إجابات مدعومة بأدلة ومصادر بنمط APA.",
    whenToUseEn: "When you need research-grade information with proper citations and academic sources.",
    whenToUseAr: "عندما تحتاج معلومات بمستوى بحثي مع استشهادات ومصادر أكاديمية صحيحة.",
    outputEn: "Detailed answers with APA citations, source links, and evidence assessment.",
    outputAr: "إجابات تفصيلية مع استشهادات APA وروابط المصادر وتقييم الأدلة.",
  },
};
