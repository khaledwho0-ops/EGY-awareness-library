/**
 * Religion Hub Prompt Library — 9 prompts
 * Source: Egyptian Awareness Library Master Framework §20.5 (lines 1363-1376)
 * These are the EXACT prompts specified in the framework. DO NOT MODIFY.
 *
 * All prompts enforce §20.1 rules:
 * - Forbid fatwa/theological verdict behavior
 * - Ask for evidence, not opinion
 * - Ask for alternative explanations
 */

import type { PromptEntry } from "./deepreal-prompts";

export const RELIGION_HUB_PROMPTS: PromptEntry[] = [
  {
    id: "RH-P01",
    useCase: "positive coping explanation",
    prompt: "Explain this religious coping practice in a psychologically grounded way. Focus on meaning, support, gratitude, patience, or hope, not doctrine enforcement: {topic}",
    mvp: "religion-hub",
    variables: ["topic"],
    strategy: "claim_decomposition",
    bloomLevel: "understand",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "RH-P02",
    useCase: "boundary detection",
    prompt: "Identify whether this statement reflects positive coping, negative coping, spiritual bypassing, guilt amplification, or healthy uncertainty: {claim}",
    mvp: "religion-hub",
    variables: ["claim"],
    strategy: "emotional_lever_analysis",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "RH-P03",
    useCase: "moderation lens",
    prompt: "Rewrite this emotionally intense religious advice into a calm, moderate, wellbeing-oriented reflection without losing its ethical concern.",
    mvp: "religion-hub",
    variables: [],
    strategy: "confidence_calibration",
    bloomLevel: "create",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "RH-P04",
    useCase: "non-fatwa guardrail",
    prompt: "Help me answer this question in a way that supports reflection and wellbeing but clearly does not issue a fatwa or theological ruling: {topic}",
    mvp: "religion-hub",
    variables: ["topic"],
    strategy: "claim_decomposition",
    bloomLevel: "apply",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "RH-P05",
    useCase: "source safety",
    prompt: "If a user asks about this religious-wellbeing topic, which source types are safer: official moderate institution, psychology-of-religion research, anonymous clip, or peer opinion? Explain why.",
    mvp: "religion-hub",
    variables: [],
    strategy: "source_triage",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "RH-P06",
    useCase: "meaning-making map",
    prompt: "Turn this stressful life event into a meaning-making reflection plan with questions, not conclusions: {topic}",
    mvp: "religion-hub",
    variables: ["topic"],
    strategy: "evidence_laddering",
    bloomLevel: "create",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "RH-P07",
    useCase: "guilt reduction",
    prompt: "This content may trigger guilt or scrupulosity. Rewrite it to preserve care, humility, and responsibility without fear escalation.",
    mvp: "religion-hub",
    variables: [],
    strategy: "emotional_lever_analysis",
    bloomLevel: "create",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "RH-P08",
    useCase: "community routing",
    prompt: "For this issue, what is the safest escalation path between private reflection, trusted family support, official religious guidance, and mental-health support?",
    mvp: "religion-hub",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "apply",
    comBTarget: "Opportunity/Social",
  },
  {
    id: "RH-P09",
    useCase: "balanced note",
    prompt: "Write a balanced note for students explaining that religion can be a source of resilience, but should not be used to deny distress, avoid treatment, or shame the self.",
    mvp: "religion-hub",
    variables: [],
    strategy: "confidence_calibration",
    bloomLevel: "create",
    comBTarget: "Motivation/Reflective",
  },
];
