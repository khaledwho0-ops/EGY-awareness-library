/**
 * SUPPORT MEDIA REGISTRY
 * Chunk 1E — Curated Books, Podcasts, Films, TV Shows, Quotes
 *
 * Purpose: Structured media recommendations for exercise "Further Learning"
 * Framework: RESSEARCH TASK.txt Task 11
 * Template: Support with Real Books, Podcasts, Films, Quotes
 */

export type MediaType = "book" | "podcast" | "film" | "documentary" | "tv_show" | "quote";

export interface SupportMedia {
  id: string;
  type: MediaType;
  title: string;
  titleAr: string;
  creator: string;
  year: number;
  platform?: string;
  mvpRelevance: ("deepreal" | "mental-health" | "religion-hub")[];
  exerciseDayLink?: string;
  description: string;
  descriptionAr: string;
  whyIncluded: string;
  url?: string;
}

export const SUPPORT_MEDIA_REGISTRY: SupportMedia[] = [
  // ─── Books ─────────────────────────────────────────────────────
  {
    id: "sm-book-01",
    type: "book",
    title: "Foolproof: Why Misinformation Infects Our Minds and How to Build Immunity",
    titleAr: "محصن: لماذا تصيب المعلومات المضللة عقولنا وكيف نبني المناعة",
    creator: "Sander van der Linden",
    year: 2023,
    mvpRelevance: ["deepreal"],
    exerciseDayLink: "dr-day-01",
    description: "The definitive book on Inoculation Theory by the lead researcher. Explains why prebunking works better than debunking.",
    descriptionAr: "الكتاب المرجعي في نظرية التلقيح من الباحث الرئيسي. يشرح لماذا التحصين المسبق أفضل من التفنيد.",
    whyIncluded: "Primary theoretical reference for DeepReal MVP. Van der Linden's research underpins the entire 14-day exercise structure.",
  },
  {
    id: "sm-book-02",
    type: "book",
    title: "Thinking, Fast and Slow",
    titleAr: "التفكير، السريع والبطيء",
    creator: "Daniel Kahneman",
    year: 2011,
    mvpRelevance: ["deepreal", "mental-health"],
    exerciseDayLink: "dr-day-03",
    description: "Foundational text on Dual Process Theory — System 1 (automatic) vs System 2 (analytical) thinking.",
    descriptionAr: "النص الأساسي في نظرية العملية المزدوجة — النظام 1 (التلقائي) مقابل النظام 2 (التحليلي).",
    whyIncluded: "Theoretical foundation for why misinformation exploits System 1 and exercises train System 2.",
  },
  {
    id: "sm-book-03",
    type: "book",
    title: "The Misinformation Age: How False Beliefs Spread",
    titleAr: "عصر المعلومات المضللة: كيف تنتشر المعتقدات الخاطئة",
    creator: "Cailin O'Connor & James Owen Weatherall",
    year: 2019,
    mvpRelevance: ["deepreal"],
    exerciseDayLink: "dr-day-10",
    description: "Explores the epistemology of misinformation — how social networks and trust dynamics create fertile ground for false beliefs.",
    descriptionAr: "يستكشف نظرية المعرفة للمعلومات المضللة — كيف تخلق الشبكات الاجتماعية وديناميكيات الثقة أرضًا خصبة للمعتقدات الخاطئة.",
    whyIncluded: "Provides social/network science perspective complementing individual cognitive approach.",
  },
  {
    id: "sm-book-04",
    type: "book",
    title: "Spiritually Integrated Psychotherapy: Understanding and Addressing the Sacred",
    titleAr: "العلاج النفسي المتكامل روحيًا: فهم ومعالجة المقدس",
    creator: "Kenneth I. Pargament",
    year: 2007,
    mvpRelevance: ["religion-hub", "mental-health"],
    exerciseDayLink: "rh-day-01",
    description: "The definitive work on integrating religious/spiritual concerns into psychological treatment and wellbeing.",
    descriptionAr: "العمل المرجعي في دمج الاهتمامات الدينية والروحية في العلاج النفسي والرفاهية.",
    whyIncluded: "Primary theoretical reference for Religion Hub MVP. Brief RCOPE creator's comprehensive framework.",
  },
  // ─── Podcasts ──────────────────────────────────────────────────
  {
    id: "sm-pod-01",
    type: "podcast",
    title: "Science Vs",
    titleAr: "العلم ضد",
    creator: "Gimlet / Spotify",
    year: 2023,
    platform: "Spotify",
    mvpRelevance: ["deepreal"],
    description: "Evidence-based podcast examining popular claims. Misinformation episodes provide real-world exercise content inspiration.",
    descriptionAr: "بودكاست قائم على الأدلة يفحص الادعاءات الشائعة. حلقات المعلومات المضللة تلهم محتوى التمارين.",
    whyIncluded: "Model for how to present evidence vs claims in accessible language. Content inspiration for DeepReal.",
  },
  {
    id: "sm-pod-02",
    type: "podcast",
    title: "The Psychology Podcast",
    titleAr: "بودكاست علم النفس",
    creator: "Scott Barry Kaufman",
    year: 2023,
    platform: "Multiple",
    mvpRelevance: ["mental-health", "religion-hub"],
    description: "Covers psychological science including intelligence, creativity, wellbeing — aligns with Multiple Intelligences and PERMA frameworks.",
    descriptionAr: "يغطي العلوم النفسية بما في ذلك الذكاء والإبداع والرفاهية.",
    whyIncluded: "Grounding for Mental Health module's psychological frameworks.",
  },
  {
    id: "sm-pod-03",
    type: "podcast",
    title: "BBC Trending",
    titleAr: "بي بي سي ترندينغ",
    creator: "BBC World Service",
    year: 2024,
    platform: "BBC Sounds",
    mvpRelevance: ["deepreal"],
    description: "Investigates viral trends and misinformation. Provides Egypt/Global viral case studies for exercise scenarios.",
    descriptionAr: "يحقق في الاتجاهات الفيروسية والمعلومات المضللة.",
    whyIncluded: "Source for real-world viral cases used in DeepReal exercise scenarios.",
  },
  // ─── Films & Documentaries ────────────────────────────────────
  {
    id: "sm-film-01",
    type: "documentary",
    title: "The Social Dilemma",
    titleAr: "المعضلة الاجتماعية",
    creator: "Jeff Orlowski",
    year: 2020,
    platform: "Netflix",
    mvpRelevance: ["deepreal", "mental-health"],
    description: "Exposes algorithmic manipulation, attention economics, and social media's impact on mental health and democracy.",
    descriptionAr: "يكشف التلاعب الخوارزمي واقتصاد الانتباه وتأثير وسائل التواصل الاجتماعي على الصحة النفسية.",
    whyIncluded: "Connects DeepReal (algorithmic amplification of misinfo) with Mental Health (social media anxiety).",
  },
  {
    id: "sm-film-02",
    type: "documentary",
    title: "Coded Bias",
    titleAr: "التحيز المبرمج",
    creator: "Shalini Kantayya",
    year: 2020,
    platform: "Netflix",
    mvpRelevance: ["deepreal"],
    description: "Documents AI bias in facial recognition and algorithmic decision-making systems.",
    descriptionAr: "يوثق تحيز الذكاء الاصطناعي في التعرف على الوجوه وأنظمة اتخاذ القرار الخوارزمية.",
    whyIncluded: "Demonstrates real-world AI bias — critical context for deepfake detection training.",
  },
  // ─── TV Shows ──────────────────────────────────────────────────
  {
    id: "sm-tv-01",
    type: "tv_show",
    title: "The Newsroom — Season 1, Episode 1",
    titleAr: "غرفة الأخبار — الموسم 1، الحلقة 1",
    creator: "Aaron Sorkin",
    year: 2012,
    platform: "HBO",
    mvpRelevance: ["deepreal"],
    description: "Opening speech on information integrity and the gap between entertainment news and journalism.",
    descriptionAr: "خطاب الافتتاح حول نزاهة المعلومات والفجوة بين أخبار الترفيه والصحافة.",
    whyIncluded: "Powerful narrative about source vs platform distinction — used in exercises.",
  },
  // ─── Quotes ────────────────────────────────────────────────────
  {
    id: "sm-quote-01",
    type: "quote",
    title: "The greatest enemy of knowledge is not ignorance; it is the illusion of knowledge.",
    titleAr: "أعظم عدو للمعرفة ليس الجهل؛ بل وهم المعرفة.",
    creator: "Stephen Hawking",
    year: 2000,
    mvpRelevance: ["deepreal"],
    exerciseDayLink: "dr-day-06",
    description: "Used in Confidence Logging exercise to illustrate Trust Calibration Error (TCE).",
    descriptionAr: "يُستخدم في تمرين تسجيل الثقة لتوضيح خطأ معايرة الثقة.",
    whyIncluded: "Directly maps to TCE metric — the gap between confidence and actual knowledge.",
  },
  {
    id: "sm-quote-02",
    type: "quote",
    title: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
    titleAr: "علامة العقل المتعلم هي القدرة على تأمل فكرة دون قبولها.",
    creator: "Aristotle",
    year: -350,
    mvpRelevance: ["deepreal", "religion-hub"],
    exerciseDayLink: "dr-day-14",
    description: "Used in DeepReal Bias Reflection capstone exercise.",
    descriptionAr: "يُستخدم في تمرين انعكاس التحيز الختامي في ديب ريل.",
    whyIncluded: "Encapsulates the core skill: evaluate without accepting. Perfect capstone reflection.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────

export function getMediaByType(type: MediaType): SupportMedia[] {
  return SUPPORT_MEDIA_REGISTRY.filter(m => m.type === type);
}

export function getMediaByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): SupportMedia[] {
  return SUPPORT_MEDIA_REGISTRY.filter(m => m.mvpRelevance.includes(mvp));
}

export function getMediaForExercise(exerciseDayLink: string): SupportMedia[] {
  return SUPPORT_MEDIA_REGISTRY.filter(m => m.exerciseDayLink === exerciseDayLink);
}
