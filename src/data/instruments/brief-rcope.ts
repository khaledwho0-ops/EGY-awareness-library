/**
 * Brief RCOPE Instrument
 * Framework: §3.2.3
 *
 * Pargament, K.I., Feuille, M., & Burdzy, D. (2011).
 * The Brief RCOPE: Current psychometric status of a short measure
 * of religious coping. Religions, 2(1), 51-76.
 *
 * Original: Pargament, K.I., Smith, B.W., Koenig, H.G., & Perez, L. (1998).
 * Patterns of positive and negative religious coping with major life stressors.
 * Journal for the Scientific Study of Religion, 37(4), 710-724.
 *
 * - 14 items total: 7 Positive + 7 Negative
 * - Likert 1-4: "Not at all" to "A great deal"
 * - Positive subscale α = .90
 * - Negative subscale α = .81
 * - Validated in Muslim populations including Arabic versions
 * - Pre + Post assessment
 *
 * EXACT items from the published instrument.
 * Stem: "When you face a problem or difficulty in life, how much do you..."
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

const RCOPE_OPTIONS = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Somewhat" },
  { value: 3, label: "Quite a bit" },
  { value: 4, label: "A great deal" },
];

/**
 * Brief RCOPE Items
 *
 * Positive Religious Coping (items 1-7):
 * Associated with better psychological adjustment (r = 0.3-0.5)
 *
 * Negative Religious Coping (items 8-14):
 * Associated with poorer psychological adjustment
 * CRITICAL: Monitor negative subscale — increase may indicate harm (§4.5)
 */
const BRIEF_RCOPE_QUESTIONS: AssessmentQuestion[] = [
  // POSITIVE RELIGIOUS COPING (7 items)
  {
    id: "rcope-p01",
    text: "Looked for a stronger connection with God.",
    textAr: "بحثت عن صلة أقوى مع الله.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p02",
    text: "Sought God's love and care.",
    textAr: "طلبت محبة الله ورعايته.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p03",
    text: "Sought help from God in letting go of my anger.",
    textAr: "طلبت مساعدة الله في التخلص من غضبي.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p04",
    text: "Tried to put my plans into action together with God.",
    textAr: "حاولت تنفيذ خططي بالتعاون مع الله.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p05",
    text: "Tried to see how God might be trying to strengthen me in this situation.",
    textAr: "حاولت أن أرى كيف قد يحاول الله تقويتي في هذا الموقف.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p06",
    text: "Asked forgiveness for my sins.",
    textAr: "طلبت المغفرة عن ذنوبي.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },
  {
    id: "rcope-p07",
    text: "Focused on religion to stop worrying about my problems.",
    textAr: "ركزت على الدين لأتوقف عن القلق بشأن مشاكلي.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "positive",
  },

  // NEGATIVE RELIGIOUS COPING (7 items)
  {
    id: "rcope-n08",
    text: "Wondered whether God had abandoned me.",
    textAr: "تساءلت هل تخلى الله عني.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n09",
    text: "Felt punished by God for my lack of devotion.",
    textAr: "شعرت أن الله يعاقبني لقلة تديني.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n10",
    text: "Wondered what I did for God to punish me.",
    textAr: "تساءلت ماذا فعلت حتى يعاقبني الله.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n11",
    text: "Questioned God's love for me.",
    textAr: "شككت في محبة الله لي.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n12",
    text: "Wondered whether my church had abandoned me.",
    textAr: "تساءلت هل تخلت عني جماعتي الدينية.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n13",
    text: "Decided the devil made this happen.",
    textAr: "قررت أن الشيطان هو الذي سبب ذلك.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
  {
    id: "rcope-n14",
    text: "Questioned the power of God.",
    textAr: "شككت في قدرة الله.",
    type: "likert",
    options: RCOPE_OPTIONS,
    subscale: "negative",
  },
];

/**
 * Brief RCOPE Scoring Algorithm (Pargament et al., 2011):
 * - Positive subscale: Sum of items 1-7 (range 7-28)
 * - Negative subscale: Sum of items 8-14 (range 7-28)
 * - Items are NOT summed into a single total — subscales must remain separate
 * - Higher Positive = better coping
 * - Higher Negative = worse coping (MONITOR FOR HARM per §4.5)
 *
 * Success criteria (§4.5):
 * - RCOPE+ increase: significant at p<0.05
 * - RCOPE- NO increase: p >= 0.05 (non-significant)
 * - If RCOPE- increases significantly: CRITICAL — investigate for harm
 */
function scoreBriefRCOPE(answers: Record<string, number>): Record<string, number> {
  let positiveSum = 0;
  let negativeSum = 0;

  BRIEF_RCOPE_QUESTIONS.forEach((q) => {
    const response = answers[q.id] || 1;
    if (q.subscale === "positive") {
      positiveSum += response;
    } else if (q.subscale === "negative") {
      negativeSum += response;
    }
  });

  return {
    positive_coping: positiveSum,
    negative_coping: negativeSum,
    positive_mean: Math.round((positiveSum / 7) * 100) / 100,
    negative_mean: Math.round((negativeSum / 7) * 100) / 100,
  };
}

export function createBriefRCOPEConfig(phase: "pre" | "post"): AssessmentConfig {
  return {
    id: `brief-rcope-${phase}`,
    name: "Brief RCOPE (Religious Coping)",
    shortName: "Brief RCOPE",
    description:
      "When you face a problem or difficulty in life, how much do you do each of the following? Rate each item on a scale from \"Not at all\" to \"A great deal.\"",
    phase,
    questions: BRIEF_RCOPE_QUESTIONS,
    scoring: scoreBriefRCOPE,
  };
}
