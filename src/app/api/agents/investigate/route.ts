/**
 * ══════════════════════════════════════════════════════════
 *  AI AGENTS INVESTIGATION ENDPOINT
 *  POST /api/agents/investigate
 *
 *  Runs 5 AI agents in parallel to investigate a claim,
 *  each with its own system prompt and Zod schema.
 * ══════════════════════════════════════════════════════════
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';
import { AGENT_PROFILES } from '@/lib/agents/profiles';
import type { AgentResult, InvestigationReport } from '@/lib/agents/types';

// ── Zod Schemas for each agent ─────────────────────────────

const sourceHunterSchema = z.object({
  originalSource: z.string().describe('The earliest identifiable origin of this claim'),
  propagationChain: z.string().describe('How the claim spread from origin to current state'),
  patientZero: z.string().describe('The first known entity or platform to publish this claim'),
  credibilityAssessment: z.string().describe('Assessment of the original source credibility'),
  relatedFactChecks: z.array(z.string()).describe('Links or references to existing fact-checks on this claim'),
  confidence: z.number().min(0).max(1).describe('Confidence in findings 0-1'),
});

const biasDetectorSchema = z.object({
  identifiedBiases: z.array(z.string()).describe('List of cognitive biases exploited by this claim'),
  logicalFallacies: z.array(z.string()).describe('Logical fallacies present in the claim'),
  manipulationTactics: z.string().describe('Rhetorical or emotional manipulation tactics used'),
  perspectiveAnalysis: z.string().describe('Multi-perspective analysis showing different viewpoints'),
  deceptionScore: z.number().min(0).max(1).describe('How deceptive this claim is 0-1'),
  confidence: z.number().min(0).max(1).describe('Confidence in findings 0-1'),
});

const arabicLinguistSchema = z.object({
  dialectAnalysis: z.string().describe('Analysis of Egyptian Arabic dialect patterns in the claim'),
  linguisticManipulation: z.string().describe('Linguistic manipulation techniques detected'),
  culturalMarkers: z.array(z.string()).describe('Culture-specific misinformation markers found'),
  translationIssues: z.string().describe('Any translation distortions or mistranslations identified'),
  religiousTextMisuse: z.string().describe('Any misuse or misquoting of religious texts'),
  confidence: z.number().min(0).max(1).describe('Confidence in findings 0-1'),
});

const timelineBuilderSchema = z.object({
  firstAppearance: z.string().describe('When and where the claim first appeared'),
  spreadPattern: z.string().describe('Pattern of how the claim spread over time'),
  amplificationNodes: z.array(z.string()).describe('Key accounts or platforms that amplified the claim'),
  viralityFactors: z.string().describe('Factors that contributed to the claim going viral'),
  currentStatus: z.string().describe('Current status of the claim spread — growing, declining, or stable'),
  confidence: z.number().min(0).max(1).describe('Confidence in findings 0-1'),
});

const counterNarrativeSchema = z.object({
  truthSandwich: z.string().describe('A truth sandwich response: Truth → Myth → Truth structure'),
  egyptianContext: z.string().describe('Culturally appropriate response for Egyptian audience'),
  inoculationMessage: z.string().describe('Preventive inoculation message to build resistance'),
  shareableRebuttal: z.string().describe('Short, shareable rebuttal for social media'),
  communityAction: z.string().describe('Recommended community-level response actions'),
  confidence: z.number().min(0).max(1).describe('Confidence in findings 0-1'),
});

// ── System prompts ─────────────────────────────────────────

const SYSTEM_PROMPTS: Record<string, string> = {
  'source-hunter': `You are the Source Hunter (صياد المصادر), an elite investigative agent specializing in tracing the origins of claims and misinformation. Your mission:
- Trace the claim back to its ORIGINAL source (Patient Zero)
- Map the propagation chain showing how it spread
- Cross-reference global fact-checking databases (IFCN, Snopes, AFP Fact Check)
- Assess the credibility of the original source
- Identify any existing fact-checks on this claim
Focus specifically on Egyptian and Middle Eastern information ecosystems. Be precise and evidence-based.`,

  'bias-detector': `You are the Bias Detector (كاشف التحيز), a cognitive science expert who identifies hidden biases and manipulation tactics. Your mission:
- Identify ALL cognitive biases being exploited (confirmation bias, anchoring, availability heuristic, etc.)
- Detect logical fallacies (ad hominem, straw man, appeal to authority, etc.)
- Analyze rhetorical manipulation techniques (emotional appeals, false urgency, etc.)
- Provide multi-perspective analysis showing how different groups interpret this claim
- Calculate a deception score based on manipulation density
Be thorough and academically rigorous in your analysis.`,

  'arabic-linguist': `You are the Arabic Linguist (اللغوي العربي), an expert in Egyptian Arabic dialect and linguistic manipulation detection. Your mission:
- Analyze the claim for Egyptian dialect-specific patterns and colloquialisms
- Detect linguistic manipulation techniques (loaded language, euphemisms, dog whistles)
- Identify culture-specific misinformation markers unique to Egyptian society
- Check for translation distortions if the claim originated in another language
- Verify any religious text citations for accuracy and context
You must consider Egyptian cultural nuances, local idioms, and sociolinguistic factors.`,

  'timeline-builder': `You are the Timeline Builder (باني الجدول الزمني), a digital forensics expert who tracks the chronological spread of misinformation. Your mission:
- Establish the FIRST known appearance of this claim (date, platform, account)
- Map the temporal spread pattern (slow build vs. sudden viral spike)
- Identify amplification nodes (influencer accounts, coordinated networks, bot patterns)
- Analyze what virality factors made this claim spread
- Assess the current trajectory — is it growing, declining, or stable?
Focus on Egyptian social media platforms, WhatsApp groups, and Arabic-language channels.`,

  'counter-narrative': `You are the Counter-Narrative Expert (خبير الرد المضاد), a strategic communications specialist for the Egyptian audience. Your mission:
- Create a TRUTH SANDWICH response (Lead with truth → Acknowledge the myth → Reinforce truth)
- Craft responses that resonate with Egyptian cultural values and communication styles
- Design an inoculation message that builds psychological resistance to similar claims
- Write a short, shareable rebuttal suitable for Egyptian social media (Facebook, WhatsApp)
- Recommend community-level response actions appropriate for Egyptian civil society
All responses must be culturally sensitive, respect local values, and be actionable.`,
};

const SCHEMAS: Record<string, z.ZodType> = {
  'source-hunter': sourceHunterSchema,
  'bias-detector': biasDetectorSchema,
  'arabic-linguist': arabicLinguistSchema,
  'timeline-builder': timelineBuilderSchema,
  'counter-narrative': counterNarrativeSchema,
};

// ── Verdict schema ─────────────────────────────────────────

const verdictSchema = z.object({
  verdict: z.enum(['TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED', 'PARTIALLY_TRUE']),
  explanation: z.string().describe('Clear explanation of the overall verdict'),
  layers_detected: z.array(z.string()).describe('Misinformation layers detected in this claim'),
});

// ── POST handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claim } = body;

    if (!claim || typeof claim !== 'string' || claim.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty "claim" field' },
        { status: 400 }
      );
    }

    // Run all 5 agents in parallel
    const agentPromises = AGENT_PROFILES.map(async (agent) => {
      const startTime = Date.now();
      try {
        const result = await rotatingGenerateObject({
          system: SYSTEM_PROMPTS[agent.id],
          prompt: `Investigate this claim:\n\n"${claim.trim()}"`,
          schema: SCHEMAS[agent.id],
        });

        const data = result.object;
        const confidence = typeof data.confidence === 'number' ? data.confidence : 0.5;

        // Build findings summary
        const findings = Object.entries(data)
          .filter(([key]) => key !== 'confidence')
          .map(([key, val]) => {
            if (Array.isArray(val)) return `${key}: ${val.join('; ')}`;
            return `${key}: ${String(val)}`;
          })
          .join('\n');

        const sources = Array.isArray(data.relatedFactChecks)
          ? data.relatedFactChecks
          : Array.isArray(data.amplificationNodes)
          ? data.amplificationNodes
          : Array.isArray(data.identifiedBiases)
          ? data.identifiedBiases
          : Array.isArray(data.culturalMarkers)
          ? data.culturalMarkers
          : [];

        return {
          agentId: agent.id,
          findings,
          confidence,
          sources,
          timestamp: startTime,
        } as AgentResult;
      } catch (err) {
        console.error(`[Agent ${agent.id}] Error:`, (err as Error).message?.slice(0, 200));
        return {
          agentId: agent.id,
          findings: `Agent encountered an error during investigation: ${(err as Error).message?.slice(0, 100) || 'Unknown error'}`,
          confidence: 0,
          sources: [],
          timestamp: startTime,
        } as AgentResult;
      }
    });

    const agentResults = await Promise.all(agentPromises);

    // Generate overall verdict using agent findings
    const combinedFindings = agentResults
      .map((r) => {
        const profile = AGENT_PROFILES.find((a) => a.id === r.agentId);
        return `[${profile?.name || r.agentId}] (confidence: ${(r.confidence * 100).toFixed(0)}%)\n${r.findings}`;
      })
      .join('\n\n---\n\n');

    let overallVerdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | 'PARTIALLY_TRUE' = 'UNVERIFIED';
    let verdictExplanation = 'Could not determine verdict from agent findings.';
    let layersDetected: string[] = [];

    try {
      const verdictResult = await rotatingGenerateObject({
        system: `You are the Chief Verdict Officer of the Angry Debunkers AI system. You receive findings from 5 specialized agents and must synthesize them into a final verdict. Be decisive and clear. Consider the Egyptian context.`,
        prompt: `Based on these agent investigation findings, determine the overall verdict for the claim: "${claim.trim()}"\n\n${combinedFindings}`,
        schema: verdictSchema,
      });

      overallVerdict = verdictResult.object.verdict;
      verdictExplanation = verdictResult.object.explanation;
      layersDetected = verdictResult.object.layers_detected;
    } catch (verdictErr) {
      console.error('[Verdict] Error:', (verdictErr as Error).message?.slice(0, 200));
      // Fallback verdict based on average confidence
      const avgConf = agentResults.reduce((s, r) => s + r.confidence, 0) / agentResults.length;
      if (avgConf > 0.7) overallVerdict = 'FALSE';
      else if (avgConf > 0.5) overallVerdict = 'MISLEADING';
      else overallVerdict = 'UNVERIFIED';
    }

    const report: InvestigationReport = {
      claim: claim.trim(),
      agents: agentResults,
      overallVerdict,
      verdictExplanation,
      layers_detected: layersDetected,
      timestamp: Date.now(),
    };

    return NextResponse.json(report);
  } catch (err) {
    console.error('[Investigate API] Fatal error:', err);
    return NextResponse.json(
      { error: 'Investigation failed. Please try again.' },
      { status: 500 }
    );
  }
}
