/**
 * DeepReal Prompt Library — 24 prompts
 * Source: Egyptian Awareness Library Master Framework §20.3 (lines 1320-1347)
 * These are the EXACT prompts specified in the framework. DO NOT MODIFY.
 *
 * Variable slots (§20.2): {claim}, {url}, {source_name}, {date},
 * {region}, {language}, {media_type}, {topic}
 *
 * All prompts enforce §20.1 rules:
 * - Force model to state uncertainty
 * - Ask for evidence, not opinion
 * - Ask for source types, not vibes
 * - Ask for alternative explanations
 * - Ask for missing data
 */

export type PromptStrategy =
  | "claim_decomposition"
  | "evidence_laddering"
  | "source_triage"
  | "lateral_reading"
  | "contradiction_scan"
  | "emotional_lever_analysis"
  | "motive_analysis"
  | "confidence_calibration"
  | "geographic_context"
  | "archive_comparison"
  | "cross_model_verification"
  | "watchlist_generation";

export interface PromptEntry {
  id: string;
  useCase: string;
  prompt: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  variables: string[];
  strategy: PromptStrategy;
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  comBTarget?: string;
}

export const DEEPREAL_PROMPTS: PromptEntry[] = [
  {
    id: "DR-P01",
    useCase: "claim decomposition",
    prompt: "Break this claim into its smallest factual parts. For each part, label it as checkable, opinion-based, prediction, or rhetorical framing: {claim}",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "claim_decomposition",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P02",
    useCase: "evidence request",
    prompt: "What evidence would be required to verify or falsify this claim properly? Do not answer whether it is true yet. Just list the evidence types needed: {claim}",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "evidence_laddering",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P03",
    useCase: "source triage",
    prompt: "I found this source: {url}. Tell me what kind of source it is, who appears responsible for it, what signals of editorial control exist, and what red flags I should check before trusting it.",
    mvp: "deepreal",
    variables: ["url"],
    strategy: "source_triage",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P04",
    useCase: "lateral reading",
    prompt: "Give me a lateral-reading plan for this claim: {claim}. I need 5 parallel checks I should run outside the original source.",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "lateral_reading",
    bloomLevel: "apply",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P05",
    useCase: "archive check",
    prompt: "I want to know whether this page or claim may have changed over time: {url}. Tell me exactly what to compare if I open archived versions.",
    mvp: "deepreal",
    variables: ["url"],
    strategy: "archive_comparison",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P06",
    useCase: "image verification",
    prompt: "I have an image attached to a claim. Give me a step-by-step image verification workflow using reverse search, metadata, context, and mismatch signals. Do not assume the image is real.",
    mvp: "deepreal",
    variables: [],
    strategy: "source_triage",
    bloomLevel: "apply",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P07",
    useCase: "video verification",
    prompt: "I have a video clip linked to this claim: {claim}. List the strongest signs of edit manipulation, context stripping, or deepfake indicators I should check first.",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "source_triage",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P08",
    useCase: "transcript audit",
    prompt: "Turn this spoken claim into a fact-check plan. Separate verifiable statements from emotional persuasion and suggest what should be checked first.",
    mvp: "deepreal",
    variables: [],
    strategy: "claim_decomposition",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P09",
    useCase: "contradiction scan",
    prompt: "What would be the strongest alternative explanation if this claim were misleading rather than false? Use multiple possibilities, not just one.",
    mvp: "deepreal",
    variables: [],
    strategy: "contradiction_scan",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P10",
    useCase: "claim history",
    prompt: "Help me find whether this claim is recycled from an older misinformation pattern. What keywords, phrases, or prior narratives should I search for?",
    mvp: "deepreal",
    variables: [],
    strategy: "archive_comparison",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P11",
    useCase: "geographic context",
    prompt: "This claim is about {region}. What local context, institutions, or official datasets are relevant before deciding whether to believe it?",
    mvp: "deepreal",
    variables: ["region"],
    strategy: "geographic_context",
    bloomLevel: "apply",
    comBTarget: "Opportunity/Social",
  },
  {
    id: "DR-P12",
    useCase: "Arabic verification",
    prompt: "Translate this claim into verification-ready Arabic and English keyword variants for searching fact checks, archives, and local reporting: {claim}",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "geographic_context",
    bloomLevel: "apply",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P13",
    useCase: "source comparison",
    prompt: "Compare how three source types would handle this claim: major wire service, independent fact-checker, and anonymous social post. What differences should I expect?",
    mvp: "deepreal",
    variables: [],
    strategy: "source_triage",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P14",
    useCase: "motive analysis",
    prompt: "Without assuming bad intent, what incentives might lead a person or page to post this claim? Separate financial, political, identity, and engagement incentives.",
    mvp: "deepreal",
    variables: [],
    strategy: "motive_analysis",
    bloomLevel: "evaluate",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "DR-P15",
    useCase: "headline stripping",
    prompt: "Rewrite this headline as a neutral research question: {claim}",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "claim_decomposition",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P16",
    useCase: "confidence reduction",
    prompt: "I feel highly convinced by this claim: {claim}. Give me the five strongest reasons I may still be wrong.",
    mvp: "deepreal",
    variables: ["claim"],
    strategy: "confidence_calibration",
    bloomLevel: "evaluate",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "DR-P17",
    useCase: "evidence laddering",
    prompt: "Place the available support for this claim on an evidence ladder from anecdote to systematic review or official record. Explain what is missing at each step.",
    mvp: "deepreal",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P18",
    useCase: "manipulated statistics",
    prompt: "Check whether this claim could be technically true but misleading through denominator tricks, cherry-picking, or timeframe manipulation.",
    mvp: "deepreal",
    variables: [],
    strategy: "contradiction_scan",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P19",
    useCase: "emotional trigger analysis",
    prompt: "Tell me which emotional levers this claim is using: fear, disgust, urgency, outrage, hope, identity, or moral panic. Explain why that matters for judgment.",
    mvp: "deepreal",
    variables: [],
    strategy: "emotional_lever_analysis",
    bloomLevel: "analyze",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "DR-P20",
    useCase: "expert search phrases",
    prompt: "Generate 12 high-value search strings for checking this claim using Google, Google Fact Check, Crossref, OpenAlex, and site-specific search.",
    mvp: "deepreal",
    variables: [],
    strategy: "lateral_reading",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P21",
    useCase: "model cross-check",
    prompt: "I want to use another AI model to evaluate this claim. Write a strict prompt that forces the model to cite uncertainty, separate fact from inference, and ask for missing evidence.",
    mvp: "deepreal",
    variables: [],
    strategy: "cross_model_verification",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P22",
    useCase: "platform provenance",
    prompt: "What should I check to determine whether this post is original reporting, reposted content, context theft, or recycled misinformation?",
    mvp: "deepreal",
    variables: [],
    strategy: "source_triage",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P23",
    useCase: "watchlist creation",
    prompt: "Build a red-flag watchlist for this claim type. I want repeated patterns that would make me pause before sharing.",
    mvp: "deepreal",
    variables: [],
    strategy: "watchlist_generation",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "DR-P24",
    useCase: "final verification memo",
    prompt: "Create a short verification memo with four sections only: claim, evidence found, evidence missing, provisional judgment. Use cautious language and do not overstate certainty.",
    mvp: "deepreal",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
];
