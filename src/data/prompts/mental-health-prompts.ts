/**
 * Mental Health Prompt Library — 9 prompts
 * Source: Egyptian Awareness Library Master Framework §20.4 (lines 1349-1361)
 * These are the EXACT prompts specified in the framework. DO NOT MODIFY.
 *
 * All prompts enforce §20.1 rules:
 * - Forbid diagnosis in Mental Health mode
 * - Ask for evidence, not opinion
 * - Force model to state uncertainty
 */

import type { PromptEntry } from "./deepreal-prompts";

export const MENTAL_HEALTH_PROMPTS: PromptEntry[] = [
  {
    id: "MH-P01",
    useCase: "definition clarity",
    prompt: "Explain this mental-health term in simple educational language, then give one thing it is and one thing it is not: {topic}",
    mvp: "mental-health",
    variables: ["topic"],
    strategy: "claim_decomposition",
    bloomLevel: "understand",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P02",
    useCase: "diagnosis boundary",
    prompt: "Help me explain why this content is educational and not diagnostic. Use plain language suitable for university students.",
    mvp: "mental-health",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P03",
    useCase: "stigma audit",
    prompt: "Analyze this statement for stigmatizing language, hidden assumptions, and safer replacements: {claim}",
    mvp: "mental-health",
    variables: ["claim"],
    strategy: "emotional_lever_analysis",
    bloomLevel: "evaluate",
    comBTarget: "Motivation/Reflective",
  },
  {
    id: "MH-P04",
    useCase: "help-seeking route",
    prompt: "Given this scenario, what are safe next-step options for support without diagnosing the person? Order them from low intensity to urgent action.",
    mvp: "mental-health",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "apply",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P05",
    useCase: "evidence summary",
    prompt: "Summarize the best evidence-backed understanding of {topic} for a student audience. Use only information types that would normally come from trusted health authorities.",
    mvp: "mental-health",
    variables: ["topic"],
    strategy: "source_triage",
    bloomLevel: "evaluate",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P06",
    useCase: "myth correction",
    prompt: "Turn this harmful myth into a correction card with three parts: what people think, what evidence says, and what action is safer.",
    mvp: "mental-health",
    variables: [],
    strategy: "contradiction_scan",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P07",
    useCase: "coping boundary",
    prompt: "Which parts of this advice are general wellbeing tips and which parts would require professional care to address safely?",
    mvp: "mental-health",
    variables: [],
    strategy: "claim_decomposition",
    bloomLevel: "analyze",
    comBTarget: "Capability/Psychological",
  },
  {
    id: "MH-P08",
    useCase: "resource matching",
    prompt: "Map this problem description to three kinds of support: self-care, campus/community support, and professional help. Do not diagnose.",
    mvp: "mental-health",
    variables: [],
    strategy: "evidence_laddering",
    bloomLevel: "apply",
    comBTarget: "Opportunity/Social",
  },
  {
    id: "MH-P09",
    useCase: "plain-language rewrite",
    prompt: "Rewrite this clinical-sounding paragraph into warm, clear, non-alarmist educational Arabic and English.",
    mvp: "mental-health",
    variables: [],
    strategy: "geographic_context",
    bloomLevel: "create",
    comBTarget: "Capability/Psychological",
  },
];
