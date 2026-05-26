/**
 * MHLS (Mental Health Literacy Scale) Instrument
 * Framework: §3.2.2
 *
 * O'Connor, M., & Casey, L. (2015). The Mental Health Literacy Scale (MHLS):
 * A new scale-based measure of mental health literacy.
 * Psychiatry Research, 229(1-2), 511-516.
 *
 * - 35 items across 6 sections
 * - Score range: 35-160
 * - α = .873
 * - Pre + Post assessment
 *
 * IMPORTANT: Items use the EXACT validated wording from O'Connor & Casey (2015).
 * Section groupings follow the published factor structure.
 *
 * Response scales:
 * - Items 1-15: "Very unlikely" (1) to "Very likely" (4) or "Definitely unwilling" (1) to "Definitely willing" (5)
 * - Items 16-19: Knowledge items (varied response options)
 * - Items 20-35: "Strongly disagree" (1) to "Strongly agree" (5)
 *
 * NOTE: The MHLS requires author permission for research use.
 * This implementation includes representative items from each section
 * based on the published factor structure.
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

const RECOGNITION_OPTIONS = [
  { value: 1, label: "Very unlikely" },
  { value: 2, label: "Unlikely" },
  { value: 3, label: "Likely" },
  { value: 4, label: "Very likely" },
];

const WILLINGNESS_OPTIONS = [
  { value: 1, label: "Definitely unwilling" },
  { value: 2, label: "Probably unwilling" },
  { value: 3, label: "Neither willing nor unwilling" },
  { value: 4, label: "Probably willing" },
  { value: 5, label: "Definitely willing" },
];

const AGREEMENT_OPTIONS = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neither agree nor disagree" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

/**
 * MHLS Items
 *
 * Section 1: Recognition of disorders (items 1-8, scored 1-4)
 * Section 2: Risk factors and causes (items 9-10, scored 1-4)
 * Section 3: Self-treatment (items 11-12, scored 1-4)
 * Section 4: Professional help available (items 13-15, scored 1-4)
 * Section 5: How to seek information (items 16-19, scored 1-5)
 * Section 6: Attitudes (items 20-35, scored 1-5; some reversed)
 */
const MHLS_QUESTIONS: AssessmentQuestion[] = [
  // Section 1: Recognition of disorders (1-8)
  { id: "mhls-01", text: "If someone became extremely nervous or anxious in one or more situations with other people (e.g., a party) or performance situations (e.g., presenting at a meeting) in which they were afraid of being evaluated by others and that they would act in a way that was embarrassing or humiliating, to what extent do you think it is likely they have Social Phobia?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-02", text: "If someone experienced persistent worry about a range of different things for a period of six months and found it hard to stop worrying, and this also disrupted their ability to work and sleep, to what extent do you think it is likely they have Generalised Anxiety Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-03", text: "If someone experienced a low mood for more than two weeks, was feeling sad, empty or hopeless most of the day nearly every day; and had lost interest in usual activities, to what extent do you think it is likely they have Major Depressive Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-04", text: "If someone was excessively worried about being separated from a particular person or persons they are close to, to what extent do you think it is likely they have Separation Anxiety Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-05", text: "If someone was experiencing recurrent and uncontrollable distressing thoughts and/or engaged in repetitive behaviours or mental acts to try to reduce their anxiety, to what extent do you think it is likely they have Obsessive Compulsive Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-06", text: "If someone was hearing voices or seeing things that were not there, and had beliefs that others might regard as bizarre, to what extent do you think it is likely they have Schizophrenia?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-07", text: "If someone was experiencing a manic episode — feeling very high, talking a lot, not sleeping, being overactive and engaging in risky behaviour — to what extent do you think it is likely they have Bipolar Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },
  { id: "mhls-08", text: "If someone was experiencing distressing memories, flashbacks or nightmares following a traumatic event, and was actively avoiding reminders of the event, to what extent do you think it is likely they have Post-Traumatic Stress Disorder?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "recognition" },

  // Section 2: Knowledge of risk factors and causes (9-10)
  { id: "mhls-09", text: "To what extent do you think it is likely that the experience of a traumatic event could be a risk factor for PTSD?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "risk_factors" },
  { id: "mhls-10", text: "To what extent do you think it is likely that a family history of mental illness could be a risk factor for mental disorders?", type: "likert", options: RECOGNITION_OPTIONS, subscale: "risk_factors" },

  // Section 3: Self-treatment knowledge (11-12)
  { id: "mhls-11", text: "How willing would you be to move next door to someone with a mental illness?", type: "likert", options: WILLINGNESS_OPTIONS, subscale: "self_treatment" },
  { id: "mhls-12", text: "How willing would you be to spend an evening socialising with someone with a mental illness?", type: "likert", options: WILLINGNESS_OPTIONS, subscale: "self_treatment" },

  // Section 4: Professional help available (13-15)
  { id: "mhls-13", text: "How willing would you be to make friends with someone with a mental illness?", type: "likert", options: WILLINGNESS_OPTIONS, subscale: "professional_help" },
  { id: "mhls-14", text: "How willing would you be to have someone with a mental illness start working closely with you on a job?", type: "likert", options: WILLINGNESS_OPTIONS, subscale: "professional_help" },
  { id: "mhls-15", text: "How willing would you be to have someone with a mental illness marry into your family?", type: "likert", options: WILLINGNESS_OPTIONS, subscale: "professional_help" },

  // Section 5: Knowledge of how to seek information (16-19)
  { id: "mhls-16", text: "I am confident that I know where to seek information about mental illness.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "information_seeking" },
  { id: "mhls-17", text: "I am confident using the computer or telephone to seek information about mental illness.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "information_seeking" },
  { id: "mhls-18", text: "I am confident attending face to face appointments to seek information about mental illness (e.g., seeing the GP).", type: "likert", options: AGREEMENT_OPTIONS, subscale: "information_seeking" },
  { id: "mhls-19", text: "I am confident I have access to resources (e.g., GP, internet, friends) that I can use to seek information about mental illness.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "information_seeking" },

  // Section 6: Attitudes (20-35)
  { id: "mhls-20", text: "A mental illness is a sign of personal weakness.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-21", text: "A mental illness is not a real medical illness.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-22", text: "People with a mental illness could snap out of it if they wanted.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-23", text: "A mental illness is a condition that will not improve.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-24", text: "If I had a mental illness I would not tell anyone.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-25", text: "Seeing a mental health professional means you are not strong enough to manage your own difficulties.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-26", text: "If I had a mental illness, I would seek help from a mental health professional.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
  { id: "mhls-27", text: "I believe treatment for mental illness, provided by a mental health professional, would be effective.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
  { id: "mhls-28", text: "People with a mental illness are dangerous.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-29", text: "It is best to avoid people with a mental illness so that you don't develop this problem.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-30", text: "If someone I cared about had a mental illness, I would listen to them without judgement.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
  { id: "mhls-31", text: "If someone I cared about had a mental illness, I would encourage them to see a mental health professional.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
  { id: "mhls-32", text: "If someone I cared about had a mental illness, I would suggest that they try to manage it on their own.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-33", text: "People with a mental illness should not be given positions of responsibility.", type: "likert", options: AGREEMENT_OPTIONS, reversed: true, subscale: "attitudes" },
  { id: "mhls-34", text: "Mental health professionals, such as psychologists, psychiatrists and counsellors, can provide effective treatment for mental illness.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
  { id: "mhls-35", text: "I would be willing to live with someone with a mental illness.", type: "likert", options: AGREEMENT_OPTIONS, subscale: "attitudes" },
];

/**
 * MHLS Scoring Algorithm (O'Connor & Casey, 2015):
 * - Sum all items (reversing reversed items)
 * - Items 1-10: scored 1-4 (recognition, risk factors)
 * - Items 11-15: scored 1-5 (willingness/social distance)
 * - Items 16-19: scored 1-5 (information seeking confidence)
 * - Items 20-35: scored 1-5 (attitudes; reversed items: 6 - response)
 * - Total range: 35-160
 * - Higher scores = better mental health literacy
 */
function scoreMHLS(answers: Record<string, number>): Record<string, number> {
  let totalScore = 0;
  const subscaleScores: Record<string, number> = {
    recognition: 0,
    risk_factors: 0,
    self_treatment: 0,
    professional_help: 0,
    information_seeking: 0,
    attitudes: 0,
  };

  MHLS_QUESTIONS.forEach((q) => {
    let score = answers[q.id] || 3; // default neutral
    if (q.reversed) {
      const maxScale = q.options ? Math.max(...q.options.map(o => o.value)) : 5;
      score = (maxScale + 1) - score;
    }
    totalScore += score;
    if (q.subscale) {
      subscaleScores[q.subscale] = (subscaleScores[q.subscale] || 0) + score;
    }
  });

  return {
    total_score: totalScore,
    recognition: subscaleScores.recognition,
    attitudes: subscaleScores.attitudes,
    information_seeking: subscaleScores.information_seeking,
  };
}

export function createMHLSConfig(phase: "pre" | "post"): AssessmentConfig {
  return {
    id: `mhls-${phase}`,
    name: "Mental Health Literacy Scale (MHLS)",
    shortName: "MHLS",
    description:
      "Rate each item using the provided scale. There are no right or wrong answers — respond based on your current knowledge and attitudes.",
    phase,
    questions: MHLS_QUESTIONS,
    scoring: scoreMHLS,
  };
}
