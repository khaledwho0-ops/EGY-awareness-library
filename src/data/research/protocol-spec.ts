export interface SubResearchQuestion {
  id: string;
  question: string;
  mapsTo: string;
}

export interface HypothesisSpec {
  id: string;
  hypothesis: string;
  nullHypothesis: string;
  failureCondition: string;
}

export interface LabeledValue {
  label: string;
  value: string;
}

export interface MeasurementPhase {
  label: string;
  timing: string;
  items: string[];
}

export interface EvaluationMethod {
  evaluationType: string;
  method: string;
  tests: string;
  when: string;
  sample: string;
}

export interface SuccessCriterion {
  metric: string;
  minimumAcceptable: string;
  target: string;
  stretchGoal: string;
  ifNotMet: string;
}

export const RESEARCH_PROTOCOL = {
  title:
    "The Egyptian Awareness Library: An Integrated Digital Platform for Building Misinformation Resilience, Mental Health Literacy, and Positive Religious Coping Through Evidence-Based Daily Exercises",
  mainQuestion:
    "To what extent can a structured, evidence-based digital awareness platform - integrating misinformation resilience training, mental health literacy education, and positive religious coping exercises - improve Egyptian university students' information verification skills, mental health knowledge, and constructive religious engagement over a 14-day intervention period?",
};

export const SUB_RESEARCH_QUESTIONS: SubResearchQuestion[] = [
  {
    id: "SQ1",
    question:
      "Does completion of the DeepReal module's daily exercises significantly improve users' ability to detect misinformation, as measured by the MIST-20?",
    mapsTo: "MVP 1: DeepReal",
  },
  {
    id: "SQ2",
    question:
      "Does engagement with the Mental Health module significantly increase users' mental health literacy, as measured by the MHLS?",
    mapsTo: "MVP 2: Mental Health",
  },
  {
    id: "SQ3",
    question:
      "Does participation in the Religion Hub module significantly increase positive religious coping and decrease negative religious coping, as measured by the Brief RCOPE?",
    mapsTo: "MVP 3: Religion Hub",
  },
  {
    id: "SQ4",
    question:
      "What is the relationship between cross-module engagement (using all 3 MVPs) and overall awareness improvement compared to single-module use?",
    mapsTo: "Cross-MVP integration",
  },
  {
    id: "SQ5",
    question:
      "How do users perceive the usability and educational value of the platform, as measured by SUS and qualitative feedback?",
    mapsTo: "User experience",
  },
];

export const FALSIFIABLE_HYPOTHESES: HypothesisSpec[] = [
  {
    id: "H1",
    hypothesis:
      "Users completing 14 days of DeepReal exercises will score significantly higher on MIST-20 post-test vs. pre-test (p < 0.05)",
    nullHypothesis: "No significant difference between pre and post scores",
    failureCondition: "p >= 0.05 on paired t-test",
  },
  {
    id: "H2",
    hypothesis:
      "Users completing 14 days of Mental Health exercises will score significantly higher on MHLS post-test vs. pre-test (p < 0.05)",
    nullHypothesis: "No significant difference",
    failureCondition: "p >= 0.05 on paired t-test",
  },
  {
    id: "H3",
    hypothesis:
      "Users completing 14 days of Religion Hub exercises will show significantly higher Brief RCOPE Positive subscale AND no increase in Negative subscale",
    nullHypothesis: "No change or negative change",
    failureCondition: "p >= 0.05 on positive subscale OR significant increase on negative subscale",
  },
  {
    id: "H4",
    hypothesis:
      "Users using all 3 MVPs will show greater combined awareness improvement than users using only 1 MVP",
    nullHypothesis: "No difference between groups",
    failureCondition: "p >= 0.05 on between-groups comparison",
  },
  {
    id: "H5",
    hypothesis: "Platform usability score (SUS) will be >= 68 (above average)",
    nullHypothesis: "SUS < 68",
    failureCondition: "Mean SUS score < 68",
  },
];

export const SAMPLING_STRATEGY: LabeledValue[] = [
  { label: "Target population", value: "Egyptian university students, age 18-30" },
  { label: "Sampling method", value: "Convenience sampling with demographic quotas" },
  {
    label: "Minimum sample size",
    value:
      "N = 84 (calculated via G*Power: paired t-test, medium effect d=0.5, alpha=0.05, power=0.80 -> N=34 per group; inflated to 84 for dropout and equal 42/42 allocation)",
  },
  { label: "Group allocation", value: "Group A: All 3 MVPs (n=42), Group B: Waitlist control (n=42)" },
  {
    label: "Inclusion criteria",
    value:
      "Enrolled university students, own a smartphone, Arabic or English literate, willing to commit 15 min/day for 14 days",
  },
  {
    label: "Exclusion criteria",
    value: "Currently receiving psychiatric treatment (safety), under 18, unable to commit to 14 days",
  },
  { label: "Recruitment", value: "University social media, classroom announcements, department partnerships" },
  { label: "Consent", value: "Written informed consent, right to withdraw at any time" },
];

export const MEASUREMENT_SCHEDULE: MeasurementPhase[] = [
  {
    label: "Week 0",
    timing: "Day 0",
    items: ["Demographics", "MIST-20 (pre)", "MHLS (pre)", "Brief RCOPE (pre)", "GHSQ (pre)", "MC-SDS"],
  },
  {
    label: "Week 1-2",
    timing: "Days 1-14",
    items: ["Daily exercises (15 min each)", "App tracks completion rate, time per exercise, and interaction logs"],
  },
  {
    label: "Week 2",
    timing: "Day 15",
    items: ["MIST-20 (post)", "MHLS (post)", "Brief RCOPE (post)", "GHSQ (post)", "SUS", "Qualitative feedback"],
  },
];

export const EVALUATION_PROTOCOL: EvaluationMethod[] = [
  {
    evaluationType: "Summative - Quantitative",
    method: "Pre/post quasi-experiment with waitlist control",
    tests: "Effectiveness of exercises",
    when: "Day 0 + Day 15",
    sample: "N=84",
  },
  {
    evaluationType: "Summative - Qualitative",
    method: "3 open-ended questions + optional 15-min interview",
    tests: "User experience, perceived value, suggestions",
    when: "Day 15",
    sample: "All + 10 volunteers",
  },
  {
    evaluationType: "Formative - Usability",
    method: "SUS questionnaire + 5-task usability test",
    tests: "Interface quality, navigation, learnability",
    when: "Day 15",
    sample: "All (SUS) + 5 think-aloud",
  },
  {
    evaluationType: "Expert - Heuristic",
    method: "3 domain experts review content against rubric",
    tests: "Content accuracy, safety, pedagogical quality",
    when: "Before participant launch",
    sample: "3 experts",
  },
  {
    evaluationType: "Technical - Functional",
    method: "Feature checklist testing",
    tests: "All features work as specified",
    when: "Before participant launch",
    sample: "Developer",
  },
];

export const SUCCESS_CRITERIA: SuccessCriterion[] = [
  {
    metric: "MIST-20 improvement",
    minimumAcceptable: ">0% (any improvement)",
    target: ">=15%",
    stretchGoal: ">=25%",
    ifNotMet: "Revise DeepReal exercise design",
  },
  {
    metric: "MHLS improvement",
    minimumAcceptable: "Significant at p<0.05",
    target: "d >= 0.5 (medium effect)",
    stretchGoal: "d >= 0.8 (large)",
    ifNotMet: "Revise MH exercise content",
  },
  {
    metric: "RCOPE+ increase",
    minimumAcceptable: "Significant at p<0.05",
    target: "d >= 0.3",
    stretchGoal: "d >= 0.5",
    ifNotMet: "Revise Religion Hub exercises",
  },
  {
    metric: "RCOPE- no increase",
    minimumAcceptable: "p >= 0.05 (non-significant)",
    target: "Decrease",
    stretchGoal: "Significant decrease",
    ifNotMet: "CRITICAL: investigate for harm",
  },
  {
    metric: "SUS score",
    minimumAcceptable: ">= 68 (above average)",
    target: ">= 75 (good)",
    stretchGoal: ">= 80 (excellent)",
    ifNotMet: "Redesign UI",
  },
  {
    metric: "Completion rate",
    minimumAcceptable: ">= 50%",
    target: ">= 65%",
    stretchGoal: ">= 80%",
    ifNotMet: "Simplify exercises, add reminders",
  },
  {
    metric: "Expert CVI",
    minimumAcceptable: ">= 0.78",
    target: ">= 0.85",
    stretchGoal: ">= 0.95",
    ifNotMet: "Revise flagged content",
  },
];
