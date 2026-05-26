/**
 * CROSS-MVP INTELLIGENCE ROUTER — §25.4
 * 
 * Smart handoff engine implementing all 5 scenarios from §25.4.
 * Routes users between the 3 engines based on content interaction.
 * 
 * §25.5 System Identity:
 * - DeepReal = truth-checking engine
 * - Mental Health = understanding-and-support engine
 * - Religion Hub = meaning-and-moderation engine
 */

export interface HandoffScenario {
  id: string;
  trigger: string;
  firstMVP: "deepreal" | "mental-health" | "religion-hub";
  secondMVP: "deepreal" | "mental-health" | "religion-hub";
  reason: string;
  userPrompt: string;
  suggestedExerciseDay?: number;
  keywords: string[];
}

export const HANDOFF_SCENARIOS: HandoffScenario[] = [
  {
    id: "ho-01",
    trigger: "User sees a viral post about depression cures",
    firstMVP: "deepreal",
    secondMVP: "mental-health",
    reason: "Verify claim first, then explain health truth safely",
    userPrompt: "This claim involves health information. After checking the source, would you like to learn what evidence-based treatment actually looks like?",
    suggestedExerciseDay: 5,
    keywords: ["cure", "depression", "mental health", "treatment", "medication", "therapy", "hack"],
  },
  {
    id: "ho-02",
    trigger: "User feels guilty and interprets distress as moral failure",
    firstMVP: "religion-hub",
    secondMVP: "mental-health",
    reason: "Distinguish coping issue from mental-health need",
    userPrompt: "You explored religious coping for this concern. Would you also like to understand this from a mental health perspective? Both perspectives can work together.",
    suggestedExerciseDay: 3,
    keywords: ["guilt", "punishment", "sin", "weak faith", "moral", "failure", "deserve"],
  },
  {
    id: "ho-03",
    trigger: "User sees alarming religious content online",
    firstMVP: "deepreal",
    secondMVP: "religion-hub",
    reason: "Verify the source and manipulation pattern, then route to moderation/coping",
    userPrompt: "You've verified the source of this religious content. Would you like to explore how to evaluate religious guidance safely and identify moderate sources?",
    suggestedExerciseDay: 4,
    keywords: ["haram", "fatwa", "extremist", "punishment", "fear", "religious", "preacher", "clip"],
  },
  {
    id: "ho-04",
    trigger: "User reads a 'self-diagnosis' thread on social media",
    firstMVP: "deepreal",
    secondMVP: "mental-health",
    reason: "Verify misinformation pattern, then provide bounded literacy",
    userPrompt: "You've analyzed the source of this health claim. Would you like to understand the difference between educational information and diagnosis?",
    suggestedExerciseDay: 2,
    keywords: ["diagnose", "symptoms", "self-diagnosis", "I have", "disorder", "condition", "test"],
  },
  {
    id: "ho-05",
    trigger: "User asks whether a clip is religious guidance or manipulative fear content",
    firstMVP: "deepreal",
    secondMVP: "religion-hub",
    reason: "Source and rhetoric first, coping and moderation second",
    userPrompt: "You've examined the source and rhetoric of this clip. Would you like to explore what healthy religious guidance looks like compared to fear-based manipulation?",
    suggestedExerciseDay: 6,
    keywords: ["guidance", "manipulation", "fear", "emotional", "preacher", "authority", "moderate"],
  },
];

/**
 * Detect if a user's exercise content matches a handoff scenario.
 * Returns suggested handoffs based on keyword matching.
 */
export function detectHandoff(
  currentMVP: "deepreal" | "mental-health" | "religion-hub",
  exerciseContent: string,
  userResponses?: string[],
): HandoffScenario[] {
  const contentLower = exerciseContent.toLowerCase();
  const responsesLower = (userResponses || []).map((r) => r.toLowerCase()).join(" ");
  const searchText = `${contentLower} ${responsesLower}`;

  return HANDOFF_SCENARIOS.filter((scenario) => {
    // Only suggest handoffs FROM the current MVP
    if (scenario.firstMVP !== currentMVP) return false;

    // Check keyword matches (at least 2 keywords should match)
    const matchCount = scenario.keywords.filter((kw) => searchText.includes(kw)).length;
    return matchCount >= 2;
  });
}

/**
 * MVP metadata for display purposes (§25.1-25.2)
 */
export const MVP_IDENTITY = {
  deepreal: {
    role: "Verification and misinformation resistance engine",
    coreQuestion: "Should I believe, doubt, check, or reject this claim or media item?",
    transformation: "From automatic acceptance → structured verification",
    icon: "🔍",
  },
  "mental-health": {
    role: "Mental-health literacy and support-navigation engine",
    coreQuestion: "What is this mental-health concept, what is it not, and what is the safest next step?",
    transformation: "From fear/confusion/stigma → informed and bounded understanding",
    icon: "💚",
  },
  "religion-hub": {
    role: "Positive religious coping, moderation, and meaning-making engine",
    coreQuestion: "How can religion support wellbeing safely, moderately, and without harm?",
    transformation: "From vague or harmful reactions → healthy, moderate, constructive coping",
    icon: "🕊️",
  },
} as const;
