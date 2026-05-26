/**
 * MIST-20 Instrument Configuration
 * Framework: §3.2.1, §28.1
 *
 * Misinformation Susceptibility Test (Maertens et al., 2024)
 * Published in: Behavior Research Methods, 56, 1863–1899.
 * DOI: 10.3758/s13428-023-02124-2
 * OSF Repository: https://osf.io/r7phc/
 * Interactive Demo: https://yourmist.streamlit.app/
 *
 * - 20 items: 10 real headlines + 10 fake headlines
 * - Binary response: Real / Fake
 * - Score: 0-20 (correct classifications)
 * - Subscores: real detection (r), fake detection (f),
 *   naïvité (n), distrust (d), veracity discernment (V)
 * - McDonald's ω general = .79, ωF1 = .78, ωF2 = .75
 * - Used in: DeepReal MVP (pre + post)
 *
 * IMPORTANT: These are the EXACT validated items from the official MIST-20.
 * Real headlines sourced from Pew Research, Gallup, Associated Press, Reuters,
 * Africa Check, and JStor Daily (MBFC-verified least-biased, highest-factual sources).
 * Fake headlines generated via GPT-2 and expert-filtered through 4-phase protocol.
 *
 * NOTE (§28.1): The MIST-20 is validated in English (US/UK). Arabic deployment
 * requires a full cultural adaptation process — NOT simple translation — because
 * headline items are culturally and contextually specific.
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

const MIST_20_QUESTIONS: AssessmentQuestion[] = [
  // ═══════════════════════════════════════════════════════════════
  // 10 REAL HEADLINES (correct answer = 1 = "Real")
  // Source: Pew Research, Gallup, AP, Reuters, Africa Check, JStor Daily
  // Verified via MBFC as least-biased, very-high factual reporting
  // ═══════════════════════════════════════════════════════════════
  {
    id: "mist-r01",
    text: "Hyatt Will Remove Small Bottles from Hotel Bathrooms by 2021",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r02",
    text: "Reflecting a Demographic Shift, 109 US Counties Have Become Majority Nonwhite Since 2000",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r03",
    text: "International Relations Experts and US Public Agree: America Is Less Respected Globally",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r04",
    text: "Attitudes Toward EU Are Largely Positive, Both Within Europe and Outside It",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r05",
    text: "Democrats More Supportive than Republicans of Federal Spending for Scientific Research",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r06",
    text: "Republicans Divided in Views of Trump's Conduct, Democrats Are Broadly Critical",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r07",
    text: "US Support for Legal Marijuana Steady in Past Year",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r08",
    text: "Morocco's King Appoints Committee Chief to Fight Poverty and Inequality",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r09",
    text: "One-in-Three Worldwide Lack Confidence in Non-Governmental Organizations",
    type: "real_fake",
    subscale: "real",
  },
  {
    id: "mist-r10",
    text: "Global Warming Age Gap: Younger Americans Most Worried",
    type: "real_fake",
    subscale: "real",
  },

  // ═══════════════════════════════════════════════════════════════
  // 10 FAKE HEADLINES (correct answer = 0 = "Fake")
  // Generated via GPT-2 neural network, expert-filtered (4-phase protocol),
  // psychometrically validated via EFA, IRT, and EGA (Study 1, N=409)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "mist-f01",
    text: "Government Officials Have Manipulated Stock Prices to Hide Scandals",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f02",
    text: "The Government Is Knowingly Spreading Disease Through the Airwaves and Food Supply",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f03",
    text: "The Government Is Manipulating the Public's Perception of Genetic Engineering in Order to Make People More Accepting of Such Techniques",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f04",
    text: "Left-Wing Extremism Causes 'More Damage' to World Than Terrorism, Says UN Report",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f05",
    text: "Ebola Virus 'Caused by US Nuclear Weapons Testing', New Study Says",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f06",
    text: "New Study: Clear Relationship Between Eye Color and Intelligence",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f07",
    text: "New Study: Left-Wingers Are More Likely to Lie to Get a Higher Salary",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f08",
    text: "Certain Vaccines Are Loaded with Dangerous Chemicals and Toxins",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f09",
    text: "Government Officials Have Illegally Manipulated the Weather to Cause Devastating Storms",
    type: "real_fake",
    subscale: "fake",
  },
  {
    id: "mist-f10",
    text: "The Corporate Media Is Controlled by the Military-Industrial Complex: The Major Oil Companies Own the Media and Control Their Agenda",
    type: "real_fake",
    subscale: "fake",
  },
];

/**
 * MIST-20 Scoring Algorithm
 * Implements the Vrf_dn (Verification done) framework from the paper.
 *
 * V = Veracity discernment (general factor, signal detection d')
 * r = Real news detection ability (correctly identified real)
 * f = Fake news detection ability (correctly identified fake)
 * d = Distrust (negative judgment bias — rejecting real as fake)
 * n = Naïvité (positive judgment bias — accepting fake as real)
 *
 * Scoring reference: Supplement S17 at https://osf.io/r7phc/
 *
 * Signal detection calculation:
 *   Hit rate = proportion of real news correctly classified as real
 *   False alarm rate = proportion of fake news incorrectly classified as real
 *   d' = z(hit rate) - z(false alarm rate)
 *
 * Boundary correction: rates clamped to [0.01, 0.99] to avoid infinite z-scores
 */
function scoreMIST20(answers: Record<string, number>): Record<string, number> {
  let realCorrect = 0;
  let fakeCorrect = 0;
  let fakeAccepted = 0; // naïvité (n)
  let realRejected = 0; // distrust (d)

  MIST_20_QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined) return;

    if (q.subscale === "real") {
      if (answer === 1) realCorrect++;
      else realRejected++;
    } else {
      if (answer === 0) fakeCorrect++;
      else fakeAccepted++;
    }
  });

  const totalScore = realCorrect + fakeCorrect;
  const naivete = fakeAccepted / 10;
  const distrust = realRejected / 10;

  // Signal detection d' (veracity discernment)
  const hitRate = Math.max(0.01, Math.min(0.99, realCorrect / 10));
  const falseAlarmRate = Math.max(0.01, Math.min(0.99, fakeAccepted / 10));
  const zScore = (p: number) => Math.sqrt(2) * inverseErf(2 * p - 1);
  const veracityDiscernment = zScore(hitRate) - zScore(falseAlarmRate);

  return {
    total_score: totalScore,
    real_detection: realCorrect,
    fake_detection: fakeCorrect,
    naivete: Math.round(naivete * 100) / 100,
    distrust: Math.round(distrust * 100) / 100,
    veracity_discernment: Math.round(veracityDiscernment * 100) / 100,
  };
}

/**
 * Inverse error function approximation
 * Algorithm: Abramowitz & Stegun, Handbook of Mathematical Functions (1964)
 * Used for z-score conversion in signal detection theory
 */
function inverseErf(x: number): number {
  const a = 0.147;
  const ln1x2 = Math.log(1 - x * x);
  const t1 = 2 / (Math.PI * a) + ln1x2 / 2;
  const t2 = ln1x2 / a;
  return Math.sign(x) * Math.sqrt(Math.sqrt(t1 * t1 - t2) - t1);
}

/**
 * Fisher-Yates shuffle for randomized item presentation
 * Required by the MIST protocol to prevent order effects
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createMIST20Config(phase: "pre" | "post"): AssessmentConfig {
  return {
    id: `mist20-${phase}`,
    name: "Misinformation Susceptibility Test (MIST-20)",
    shortName: "MIST-20",
    description:
      "Rate whether each headline is REAL (from a legitimate news source) or FAKE (made up to mislead). Each headline has only one correct answer.",
    phase,
    questions: shuffle(MIST_20_QUESTIONS),
    scoring: scoreMIST20,
  };
}
