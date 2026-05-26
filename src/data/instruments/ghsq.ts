/**
 * GHSQ (General Help-Seeking Questionnaire) Instrument
 * Framework: §3.2.4
 *
 * Wilson, C.J., Deane, F.P., Ciarrochi, J., & Rickwood, D. (2005).
 * Measuring help-seeking intentions: Properties of the General Help-Seeking
 * Questionnaire. Canadian Journal of Counselling, 39(1), 15-28.
 *
 * - Flexible instrument adapted for Egyptian/Arab university student context
 * - Measures help-seeking INTENTIONS (not behavior)
 * - 7-point Likert: "Extremely unlikely" (1) to "Extremely likely" (7)
 * - Test-retest reliability r = .86
 * - Pre + Post assessment
 *
 * Adaptation notes for this study (§28.1):
 * - Help sources selected to match Egyptian university context
 * - "Religious leader" included per cultural relevance
 * - Crisis resources (16328) mentioned in instructions
 *
 * Two problem types assessed:
 * 1. Personal-emotional problems
 * 2. Suicidal thoughts (with safety disclaimer)
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

const GHSQ_OPTIONS = [
  { value: 1, label: "1 — Extremely unlikely" },
  { value: 2, label: "2 — Very unlikely" },
  { value: 3, label: "3 — Unlikely" },
  { value: 4, label: "4 — Neither likely nor unlikely" },
  { value: 5, label: "5 — Likely" },
  { value: 6, label: "6 — Very likely" },
  { value: 7, label: "7 — Extremely likely" },
];

/**
 * GHSQ Items — Personal/Emotional Problems
 *
 * Stem: "If you were having a personal or emotional problem,
 * how likely is it that you would seek help from the following people?"
 *
 * Help sources adapted for Egyptian university student population
 * following Wilson et al. (2005) guidelines for contextual adaptation.
 */
const GHSQ_QUESTIONS: AssessmentQuestion[] = [
  // Section A: Personal-Emotional Problems
  {
    id: "ghsq-pe-01",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from an intimate partner (e.g., boyfriend/girlfriend, husband/wife)?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من شريك حميم؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-02",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a friend (not related to you)?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من صديق؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-03",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a parent?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من أحد الوالدين؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-04",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from another relative or family member?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من قريب آخر؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-05",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a mental health professional (e.g., psychologist, counsellor, psychiatrist)?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من متخصص في الصحة النفسية؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-06",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a phone helpline (e.g., 16328)?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من خط مساعدة هاتفي (مثل 16328)؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-07",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a doctor or GP?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من طبيب عام؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-08",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a religious leader (e.g., imam, priest, sheikh)?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من رجل دين (مثل إمام، كاهن، شيخ)؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-09",
    text: "If you were having a personal or emotional problem, how likely is it that you would seek help from a university counselling service?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال أن تطلب المساعدة من خدمة الإرشاد الجامعي؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "personal_emotional",
  },
  {
    id: "ghsq-pe-10",
    text: "If you were having a personal or emotional problem, how likely is it that you would not seek help from anyone?",
    textAr: "إذا كنت تعاني من مشكلة شخصية أو عاطفية، ما مدى احتمال ألا تطلب المساعدة من أحد؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    reversed: true,
    subscale: "personal_emotional",
  },

  // Section B: Suicidal Ideation (with safety note)
  {
    id: "ghsq-si-01",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from an intimate partner (e.g., boyfriend/girlfriend, husband/wife)?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من شريك حميم؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-02",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from a friend (not related to you)?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من صديق؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-03",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from a parent?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من أحد الوالدين؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-04",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from a mental health professional (e.g., psychologist, counsellor, psychiatrist)?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من متخصص في الصحة النفسية؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-05",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from a phone helpline (e.g., 16328)?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من خط مساعدة هاتفي (مثل 16328)؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-06",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would seek help from a religious leader (e.g., imam, priest, sheikh)?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال أن تطلب المساعدة من رجل دين؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    subscale: "suicidal_ideation",
  },
  {
    id: "ghsq-si-07",
    text: "If you were experiencing thoughts of suicide, how likely is it that you would not seek help from anyone?",
    textAr: "إذا كنت تعاني من أفكار انتحارية، ما مدى احتمال ألا تطلب المساعدة من أحد؟",
    type: "likert",
    options: GHSQ_OPTIONS,
    reversed: true,
    subscale: "suicidal_ideation",
  },
];

/**
 * GHSQ Scoring Algorithm (Wilson et al., 2005):
 * - Compute mean across each section (personal-emotional, suicidal ideation)
 * - Item "would not seek help" is reversed
 * - Higher scores = greater help-seeking intentions
 * - No clinical cutoff — used for pre/post comparison
 */
function scoreGHSQ(answers: Record<string, number>): Record<string, number> {
  let peSum = 0;
  let peCount = 0;
  let siSum = 0;
  let siCount = 0;

  GHSQ_QUESTIONS.forEach((q) => {
    let response = answers[q.id] || 4; // default neutral
    if (q.reversed) {
      response = 8 - response; // reverse 7-point scale
    }
    if (q.subscale === "personal_emotional") {
      peSum += response;
      peCount++;
    } else if (q.subscale === "suicidal_ideation") {
      siSum += response;
      siCount++;
    }
  });

  const peMean = peCount > 0 ? Math.round((peSum / peCount) * 100) / 100 : 0;
  const siMean = siCount > 0 ? Math.round((siSum / siCount) * 100) / 100 : 0;

  return {
    personal_emotional_mean: peMean,
    suicidal_ideation_mean: siMean,
    overall_help_seeking: Math.round(((peMean + siMean) / 2) * 100) / 100,
  };
}

export function createGHSQConfig(phase: "pre" | "post"): AssessmentConfig {
  return {
    id: `ghsq-${phase}`,
    name: "General Help-Seeking Questionnaire (GHSQ)",
    shortName: "GHSQ",
    description:
      "Rate how likely you would be to seek help from each source. There are no right or wrong answers.\n\n⚠️ If you are currently experiencing thoughts of suicide, please contact the crisis line immediately: 16328.",
    phase,
    questions: GHSQ_QUESTIONS,
    scoring: scoreGHSQ,
  };
}
