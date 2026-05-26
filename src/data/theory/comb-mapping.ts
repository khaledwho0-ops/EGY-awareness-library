/**
 * COM-B BEHAVIOR CHANGE MAPPING — §15.1
 * Full COM-B barrier analysis (18 barriers × 3 MVPs) as structured data.
 * Michie, S. et al. (2011). The behaviour change wheel. Implementation Science.
 */

export interface COMBEntry {
  id: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  component: "capability-psychological" | "capability-physical" | "opportunity-physical" | "opportunity-social" | "motivation-reflective" | "motivation-automatic";
  componentLabel: string;
  barrier: string;
  intervention: string;
  exerciseDays: number[];
  measuredBy?: string;
}

export const COMB_MAPPING: COMBEntry[] = [
  // ═══════════════════════════════════════
  // DeepReal COM-B (§15.1 - 6 entries)
  // ═══════════════════════════════════════
  {
    id: "comb-dr-01", mvp: "deepreal",
    component: "capability-psychological", componentLabel: "Capability (Psychological)",
    barrier: "Users lack knowledge of misinformation tactics",
    intervention: "SIFT tutorials + deepfake identification exercises",
    exerciseDays: [1, 2, 3, 4, 5],
    measuredBy: "MIST-20 knowledge subscore",
  },
  {
    id: "comb-dr-02", mvp: "deepreal",
    component: "capability-physical", componentLabel: "Capability (Physical)",
    barrier: "Users don't know HOW to fact-check",
    intervention: "Step-by-step lateral reading exercises",
    exerciseDays: [2, 6, 9, 12],
    measuredBy: "Verification Path Replay (AFS)",
  },
  {
    id: "comb-dr-03", mvp: "deepreal",
    component: "opportunity-physical", componentLabel: "Opportunity (Physical)",
    barrier: "No easy-access tools for source verification",
    intervention: "Trusted source directory + prompt gallery",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    measuredBy: "Source registry usage count",
  },
  {
    id: "comb-dr-04", mvp: "deepreal",
    component: "opportunity-social", componentLabel: "Opportunity (Social)",
    barrier: "Social norms encourage sharing without checking",
    intervention: "Exercises include 'before you share' scenarios",
    exerciseDays: [5, 8, 11, 14],
    measuredBy: "Sharing behavior self-report",
  },
  {
    id: "comb-dr-05", mvp: "deepreal",
    component: "motivation-reflective", componentLabel: "Motivation (Reflective)",
    barrier: "Users believe they can already detect fakes",
    intervention: "MIST-20 pre-test creates awareness of gaps (calibration)",
    exerciseDays: [1],
    measuredBy: "TCE (Trust Calibration Error)",
  },
  {
    id: "comb-dr-06", mvp: "deepreal",
    component: "motivation-automatic", componentLabel: "Motivation (Automatic)",
    barrier: "Emotional reaction overrides analytical thinking",
    intervention: "Exercises practice the 'Stop' step of SIFT (emotional regulation)",
    exerciseDays: [1, 3, 5, 8, 11],
    measuredBy: "ETS (Emotional Trigger Susceptibility)",
  },

  // ═══════════════════════════════════════
  // Mental Health COM-B (§15.1 - 6 entries)
  // ═══════════════════════════════════════
  {
    id: "comb-mh-01", mvp: "mental-health",
    component: "capability-psychological", componentLabel: "Capability (Psychological)",
    barrier: "Users cannot recognize mental health conditions",
    intervention: "Terminology module + recognition exercises",
    exerciseDays: [1, 2, 3, 4],
    measuredBy: "MHLS recognition subscore",
  },
  {
    id: "comb-mh-02", mvp: "mental-health",
    component: "capability-physical", componentLabel: "Capability (Physical)",
    barrier: "Users don't know how to access help",
    intervention: "Help-seeking guide with specific resources",
    exerciseDays: [5, 9, 14],
    measuredBy: "GHSQ help-seeking intention score",
  },
  {
    id: "comb-mh-03", mvp: "mental-health",
    component: "opportunity-physical", componentLabel: "Opportunity (Physical)",
    barrier: "Limited awareness of available services",
    intervention: "Crisis Resource Panel + local service directory",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    measuredBy: "Directory interaction count",
  },
  {
    id: "comb-mh-04", mvp: "mental-health",
    component: "opportunity-social", componentLabel: "Opportunity (Social)",
    barrier: "Stigma prevents help-seeking",
    intervention: "Stigma reduction scenarios",
    exerciseDays: [4, 8, 12],
    measuredBy: "Stigma attitude change (MHLS items)",
  },
  {
    id: "comb-mh-05", mvp: "mental-health",
    component: "motivation-reflective", componentLabel: "Motivation (Reflective)",
    barrier: "Users believe mental health = 'crazy'",
    intervention: "Educational content normalizing mental health",
    exerciseDays: [1, 3, 6, 10],
    measuredBy: "MHLS attitudes subscore",
  },
  {
    id: "comb-mh-06", mvp: "mental-health",
    component: "motivation-automatic", componentLabel: "Motivation (Automatic)",
    barrier: "Fear of judgment",
    intervention: "Emotional awareness exercises reduce fear response",
    exerciseDays: [1, 3, 6, 10],
    measuredBy: "Affect labeling accuracy",
  },

  // ═══════════════════════════════════════
  // Religion Hub COM-B (§15.1 - 6 entries)
  // ═══════════════════════════════════════
  {
    id: "comb-rh-01", mvp: "religion-hub",
    component: "capability-psychological", componentLabel: "Capability (Psychological)",
    barrier: "Users cannot distinguish positive from negative coping",
    intervention: "Brief RCOPE-based exercises + threat awareness",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7],
    measuredBy: "Brief RCOPE positive/negative subscale gap",
  },
  {
    id: "comb-rh-02", mvp: "religion-hub",
    component: "capability-physical", componentLabel: "Capability (Physical)",
    barrier: "Users lack reflection skills",
    intervention: "Guided contemplative exercises",
    exerciseDays: [2, 5, 8, 10, 13],
    measuredBy: "Reflection quality self-report",
  },
  {
    id: "comb-rh-03", mvp: "religion-hub",
    component: "opportunity-physical", componentLabel: "Opportunity (Physical)",
    barrier: "Limited access to healthy religious communities",
    intervention: "Community directory",
    exerciseDays: [7, 14],
    measuredBy: "Directory access count",
  },
  {
    id: "comb-rh-04", mvp: "religion-hub",
    component: "opportunity-social", componentLabel: "Opportunity (Social)",
    barrier: "Social pressure toward extreme interpretations",
    intervention: "Boundaries guide + healthy engagement models",
    exerciseDays: [4, 8, 11],
    measuredBy: "Boundary recognition accuracy",
  },
  {
    id: "comb-rh-05", mvp: "religion-hub",
    component: "motivation-reflective", componentLabel: "Motivation (Reflective)",
    barrier: "Users may not see religion as a 'skill' to develop",
    intervention: "Reframing through psychology of religion lens",
    exerciseDays: [1, 3, 6, 9],
    measuredBy: "Pre/post attitude shift",
  },
  {
    id: "comb-rh-06", mvp: "religion-hub",
    component: "motivation-automatic", componentLabel: "Motivation (Automatic)",
    barrier: "Guilt, fear, or habitual patterns",
    intervention: "Exercises address these explicitly with alternatives",
    exerciseDays: [6, 10, 14],
    measuredBy: "CTCS (Comfort-Truth Confusion Score)",
  },
];

/**
 * Get COM-B entries for a specific MVP
 */
export function getCOMBByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): COMBEntry[] {
  return COMB_MAPPING.filter((e) => e.mvp === mvp);
}

/**
 * Get COM-B entries relevant to a specific day in an MVP
 */
export function getCOMBForDay(mvp: "deepreal" | "mental-health" | "religion-hub", day: number): COMBEntry[] {
  return COMB_MAPPING.filter((e) => e.mvp === mvp && e.exerciseDays.includes(day));
}

/**
 * Get unique COM-B components addressed across all MVPs
 */
export function getCOMBComponentSummary(): Record<string, number> {
  const summary: Record<string, number> = {};
  COMB_MAPPING.forEach((e) => {
    summary[e.componentLabel] = (summary[e.componentLabel] || 0) + 1;
  });
  return summary;
}
