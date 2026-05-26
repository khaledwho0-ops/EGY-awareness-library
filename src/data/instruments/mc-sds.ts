/**
 * MC-SDS (Marlowe-Crowne Social Desirability Scale — Short Form C)
 * Framework: §3.2.6
 *
 * Reynolds, W.M. (1982). Development of reliable and valid short forms
 * of the Marlowe-Crowne Social Desirability Scale.
 * Journal of Clinical Psychology, 38(1), 119-125.
 *
 * Original: Crowne, D.P., & Marlowe, D. (1960).
 * A new scale of social desirability independent of psychopathology.
 * Journal of Consulting Psychology, 24(4), 349-354.
 *
 * - 13 items, True/False format
 * - Score range: 0-13
 * - α = .76
 * - Pre-only assessment (used as covariate per §5.2)
 * - Public domain instrument
 *
 * Scoring key:
 * - Items 1, 2, 3, 4, 6, 8, 11, 12: TRUE = 1 (socially desirable)
 * - Items 5, 7, 9, 10, 13: FALSE = 1 (reverse-scored; TRUE = 0)
 *
 * Higher scores = greater tendency to give socially desirable responses
 * Used as covariate in ANCOVA to control for response bias
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

/**
 * MC-SDS Form C — 13 items
 * Items from Reynolds (1982) Short Form C
 *
 * Reverse-scored items: 5, 7, 9, 10, 13
 * (These describe socially UNdesirable behaviors;
 *  answering FALSE = socially desirable = 1 point)
 */
const MCSDS_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "mcsds-01",
    text: "It is sometimes hard for me to go on with my work if I am not encouraged.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-02",
    text: "I sometimes feel resentful when I don't get my way.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-03",
    text: "On a few occasions, I have given up doing something because I thought too little of my ability.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-04",
    text: "There have been times when I felt like rebelling against people in authority even though I knew they were right.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-05",
    text: "No matter who I'm talking to, I'm always a good listener.",
    type: "binary",
    reversed: false,
    subscale: "sd",
  },
  {
    id: "mcsds-06",
    text: "There have been occasions when I took advantage of someone.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-07",
    text: "I'm always willing to admit it when I make a mistake.",
    type: "binary",
    reversed: false,
    subscale: "sd",
  },
  {
    id: "mcsds-08",
    text: "I sometimes try to get even rather than forgive and forget.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-09",
    text: "I am always courteous, even to people who are disagreeable.",
    type: "binary",
    reversed: false,
    subscale: "sd",
  },
  {
    id: "mcsds-10",
    text: "I have never been irked when people expressed ideas very different from my own.",
    type: "binary",
    reversed: false,
    subscale: "sd",
  },
  {
    id: "mcsds-11",
    text: "There have been times when I was quite jealous of the good fortune of others.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-12",
    text: "I am sometimes irritated by people who ask favours of me.",
    type: "binary",
    reversed: true,
    subscale: "sd",
  },
  {
    id: "mcsds-13",
    text: "I have never deliberately said something that hurt someone's feelings.",
    type: "binary",
    reversed: false,
    subscale: "sd",
  },
];

/**
 * MC-SDS Scoring Algorithm (Reynolds, 1982):
 * - Items describing socially UNdesirable behavior:
 *   Answer FALSE (0) = 1 point (socially desirable)
 *   → Items 1, 2, 3, 4, 6, 8, 11, 12 (reversed=true → FALSE=1)
 *
 * - Items describing socially DESIRABLE behavior:
 *   Answer TRUE (1) = 1 point (socially desirable)
 *   → Items 5, 7, 9, 10, 13 (reversed=false → TRUE=1)
 *
 * Total range: 0-13
 * Higher = more social desirability bias
 * Interpretation: Use as covariate, not clinical cutoff
 */
function scoreMCSDS(answers: Record<string, number>): Record<string, number> {
  let totalScore = 0;

  MCSDS_QUESTIONS.forEach((q) => {
    const response = answers[q.id]; // 1 = True, 0 = False
    if (response === undefined) return;

    if (q.reversed) {
      // Socially undesirable items: FALSE (0) = socially desirable = 1 point
      totalScore += response === 0 ? 1 : 0;
    } else {
      // Socially desirable items: TRUE (1) = socially desirable = 1 point
      totalScore += response === 1 ? 1 : 0;
    }
  });

  return {
    total_score: totalScore,
    percentile: totalScore <= 3 ? 10 : totalScore <= 6 ? 30 : totalScore <= 9 ? 60 : 90,
  };
}

export function createMCSDSConfig(): AssessmentConfig {
  return {
    id: "mc-sds-pre",
    name: "Marlowe-Crowne Social Desirability Scale (Short Form)",
    shortName: "MC-SDS",
    description:
      "Read each statement and indicate whether it is TRUE or FALSE for you. Answer honestly — there are no right or wrong answers.",
    phase: "pre",
    questions: MCSDS_QUESTIONS,
    scoring: scoreMCSDS,
  };
}
