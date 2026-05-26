/**
 * INTERVENTION SCHEDULE — §18.1
 * Defines which of the 17 non-exercise intervention modes appear on which days.
 * Also defines the complete mode registry.
 */

export interface InterventionMode {
  id: number;
  name: string;
  description: string;
  duration: string;
  cadence: string;
  mvps: ("deepreal" | "mental-health" | "religion-hub")[];
  activeDays: number[];
  component: string;
  implemented: boolean;
}

export const INTERVENTION_MODES: InterventionMode[] = [
  { id: 1, name: "Source-of-the-Day Brief", description: "One trusted source spotlight: what it is, what it's good for, what NOT to use it for, with one real example.", duration: "2 min", cadence: "daily", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], component: "SourceOfDay", implemented: true },
  { id: 2, name: "Verification Checklist Overlay", description: "Persistent mini-checklist that appears before claim acceptance or content bookmarking. Creates friction before belief.", duration: "20-40 sec/use", cadence: "per interaction", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], component: "VerificationChecklist", implemented: true },
  { id: 3, name: "Confidence Logging", description: "User records confidence before and after checking. App shows how often certainty drops or improves correctly.", duration: "15 sec/interaction", cadence: "per exercise", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], component: "ConfidenceLogging", implemented: true },
  { id: 4, name: "Correction Ledger", description: "Personal record of corrected beliefs. User can see claims they got wrong and what fixed them. Makes correction normal.", duration: "3 min review", cadence: "every 3 days", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [3,6,9,12,14], component: "CorrectionLedger", implemented: true },
  { id: 5, name: "Evidence Ladder Card", description: "Visual ranking: opinion → anecdote → single study → review → official guidance → archive proof.", duration: "1 min", cadence: "before selected content", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [4,5,6,7,8,9,10,11,12,13,14], component: "EvidenceLadder", implemented: true },
  { id: 6, name: "Source Compare Mode", description: "Side-by-side source panel: same topic from two or three trusted sources. Teaches triangulation.", duration: "4-6 min", cadence: "twice weekly", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [4,5,6,7,8,9,10,11,12,13,14], component: "SourceCompare", implemented: true },
  { id: 7, name: "Archive Replay", description: "Past version viewer: compare a page now vs archived version. Trains historical verification.", duration: "5 min", cadence: "on selected claims", mvps: ["deepreal"], activeDays: [7,8,9,10,11,12,13,14], component: "ArchiveReplay", implemented: false },
  { id: 8, name: "Myth Autopsy Board", description: "Guided breakdown: claim → emotional hook → missing evidence → corrective source. Pattern recognition.", duration: "5 min", cadence: "3 times weekly", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [7,8,9,10,11,12,13,14], component: "MythAutopsy", implemented: true },
  { id: 9, name: "Expert Voice Capsule", description: "60-90 sec text explanation by a domain expert on one key concept in plain language.", duration: "2 min", cadence: "daily/alternate", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [10,11,12,13,14], component: "ExpertCapsule", implemented: true },
  { id: 10, name: "Decision Tree Navigator", description: "If/then action routing. Example: distressed → stop → ground → read disclaimer → seek help.", duration: "1-2 min", cadence: "when triggered", mvps: ["mental-health", "religion-hub"], activeDays: [7,8,9,10,11,12,13,14], component: "DecisionTree", implemented: true },
  { id: 11, name: "Trusted Directory Quick Access", description: "Search by need: fact-check, mental-health info, religious moderation, crisis help.", duration: "always available", cadence: "always", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], component: "TrustedDirectory", implemented: true },
  { id: 12, name: "Bias Reflection Minute", description: "Prompt to notice internal bias: 'Did I want this claim to be true?' Trains metacognition.", duration: "1 min", cadence: "after difficult tasks", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [4,5,6,7,8,9,10,11,12,13,14], component: "BiasReflection", implemented: true },
  { id: 13, name: "Prompt Lab", description: "Ready-made prompts to query external models safely. User chooses template instead of typing vague requests.", duration: "3-8 min", cadence: "as needed", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [7,8,9,10,11,12,13,14], component: "PromptLab", implemented: true },
  { id: 14, name: "Peer Pair Review", description: "Solo alternative: review a claim, then compare your reasoning with an expert model answer.", duration: "10 min", cadence: "weekly", mvps: ["deepreal", "mental-health"], activeDays: [13,14], component: "PeerReview", implemented: false },
  { id: 15, name: "Micro-Scenario Feed", description: "Short scenario cards without scoring. User reads during idle time to extend learning.", duration: "1-2 min", cadence: "optional", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [10,11,12,13,14], component: "MicroScenario", implemented: true },
  { id: 16, name: "Boundary Warning Layer", description: "Safety boundary reminders: 'Education only, not diagnosis' or 'Reflection only, not fatwa.'", duration: "5-10 sec", cadence: "on relevant screens", mvps: ["mental-health", "religion-hub"], activeDays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], component: "BoundaryWarning", implemented: true },
  { id: 17, name: "Weekly After-Action Review", description: "Shows what fooled the user, what improved, which sources they actually used. Consolidates behavior change.", duration: "10-12 min", cadence: "weekly", mvps: ["deepreal", "mental-health", "religion-hub"], activeDays: [7,14], component: "AfterActionReview", implemented: true },
];

/**
 * Get intervention modes active on a specific day (§18.1 schedule)
 */
export function getModesForDay(day: number, mvp?: "deepreal" | "mental-health" | "religion-hub"): InterventionMode[] {
  return INTERVENTION_MODES.filter((m) => {
    const dayMatch = m.activeDays.includes(day);
    const mvpMatch = mvp ? m.mvps.includes(mvp) : true;
    return dayMatch && mvpMatch && m.implemented;
  });
}

/**
 * Get the §18.1 schedule grouping
 */
export const DAY_SCHEDULE = {
  "1-3": "Source-of-the-Day, Verification Checklist, Confidence Logging, Boundary Warning Layer",
  "4-6": "Add Evidence Ladder Card, Source Compare Mode, Bias Reflection Minute",
  "7-9": "Add Myth Autopsy Board, Prompt Lab, Decision Tree Navigator",
  "10-12": "Add Expert Voice Capsule, Trusted Directory, Micro-Scenario Feed",
  "13-14": "Add Peer Pair Review (solo), Weekly After-Action Review, Correction Ledger summary",
} as const;
