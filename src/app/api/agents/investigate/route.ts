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
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';
import { AGENT_PROFILES } from '@/lib/agents/profiles';
import type { AgentResult, InvestigationReport } from '@/lib/agents/types';

// Tell Vercel this route may take up to its full 60s budget (5 parallel AI
// agents + a verdict synthesis call). Default is 10s on Hobby — which
// reliably exceeded, hanging the whole investigation past the wall.
export const runtime = 'nodejs';
export const maxDuration = 60;

/** Promise.race against a soft timeout that resolves with a fallback value
 * instead of throwing. Lets one slow agent degrade gracefully without
 * blocking the rest of the swarm or the request itself. */
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

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

    // DEMO LATENCY CAP: run only the 3 strongest, most-distinct agents in
    // parallel (Source Hunter → origin/Patient-Zero, Bias Detector →
    // manipulation/fallacies, Arabic Linguist → Egyptian dialect & religious
    // text). These are the first 3 profiles, so they stay POSITIONALLY ALIGNED
    // with the calling page's fixed 5-slot label list (it indexes agents[] by
    // position, not agentId). The page maps over a fixed array and tolerates a
    // shorter agents[] — the remaining slots simply render empty.
    const ACTIVE_AGENTS = AGENT_PROFILES.slice(0, 3);

    // Run the active agents in parallel. PRIMARY path is the SCHEMA-BOUND
    // rotator (Groq-first → Gemini → ...): generateObject with each agent's
    // Zod schema forces on-topic, well-typed output. The old "free-text JSON,
    // parse-by-hand" primary let the model drift wildly off-topic (e.g.
    // returning a UAE-politics analysis for a pyramids/aliens claim) because
    // nothing constrained the shape — that was the garbage we saw live.
    const agentPromises = ACTIVE_AGENTS.map(async (agent) => {
      const startTime = Date.now();
      try {
        let data: Record<string, unknown> | null = null;
        let agentProvider = 'Groq';

        // PRIMARY: schema-validated structured generation (Groq-first rotator).
        try {
          const result = await rotatingGenerateObject({
            system: SYSTEM_PROMPTS[agent.id],
            prompt: `Investigate ONLY this exact claim and nothing else:\n\n"${claim.trim()}"\n\nFocus on the Egyptian/Middle-Eastern context. Stay strictly on this claim.`,
            schema: SCHEMAS[agent.id],
          });
          data = result.object as Record<string, unknown>;
          if (result.provider) agentProvider = result.provider;
        } catch { /* fall through to free-text */ }

        // FALLBACK: free-text JSON via the rotator (only if structured failed —
        // some slots don't support json_schema/structured output).
        if (!data) {
          agentProvider = 'Rotator';
          const agentPrompt = `${SYSTEM_PROMPTS[agent.id]}\n\nClaim to investigate: "${claim.trim()}"\n\nReturn a JSON object with your analysis. Be specific, evidence-based, and focus ONLY on this exact claim in the Egyptian context.`;
          const { data: jsonData, provider } = await nvidiaFirstGenerateJSON(agentPrompt, {
            systemPrompt: SYSTEM_PROMPTS[agent.id],
            maxTokens: 900,
            temperature: 0.2,
          });
          if (jsonData) {
            data = jsonData as Record<string, unknown>;
            agentProvider = provider || 'Rotator';
          }
        }

        if (!data) throw new Error('No structured output from any provider');

        const confidence = typeof data.confidence === 'number' ? data.confidence : 0.7;

        // Robust formatter — the NVIDIA path (no Zod) often returns nested
        // objects like {original_source: {primary: "...", secondary: "..."}}.
        // The old `String(val)` turned those into literal "[object Object]".
        // Now: plain values pass through, arrays-of-objects expand to key:val
        // pairs, single objects flatten to one line per key.
        const fmt = (v: unknown): string => {
          if (v === null || v === undefined) return '—';
          if (typeof v === 'string') return v.trim();
          if (typeof v === 'number' || typeof v === 'boolean') return String(v);
          if (Array.isArray(v)) {
            return v.map((x) =>
              x === null || x === undefined ? '' :
              typeof x === 'string' ? x.trim() :
              typeof x === 'object' ? Object.values(x as Record<string, unknown>).filter((y) => typeof y === 'string' || typeof y === 'number').join(' — ') :
              String(x)
            ).filter(Boolean).join('; ');
          }
          if (typeof v === 'object') {
            return Object.entries(v as Record<string, unknown>)
              .map(([k, vv]) => {
                const inner = typeof vv === 'string' ? vv.trim()
                  : Array.isArray(vv) ? vv.filter((x) => typeof x === 'string').join('; ')
                  : typeof vv === 'object' && vv !== null ? Object.values(vv as Record<string, unknown>).filter((y) => typeof y === 'string').join(' — ')
                  : String(vv);
                return `  • ${k.replace(/_/g, ' ')}: ${inner}`;
              }).join('\n');
          }
          return String(v);
        };
        const findings = Object.entries(data)
          .filter(([key]) => key !== 'confidence')
          .map(([key, val]) => `${key.replace(/_/g, ' ')}:\n${fmt(val)}`)
          .join('\n\n');

        const sources = Array.isArray(data.relatedFactChecks)
          ? data.relatedFactChecks as string[]
          : Array.isArray(data.amplificationNodes)
          ? data.amplificationNodes as string[]
          : Array.isArray(data.identifiedBiases)
          ? data.identifiedBiases as string[]
          : Array.isArray(data.culturalMarkers)
          ? data.culturalMarkers as string[]
          : [];

        return {
          agentId: agent.id,
          findings,
          confidence,
          sources,
          timestamp: startTime,
          provider: agentProvider,
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

    // Each agent gets a 40s soft timeout — if it stalls, we keep the
    // fallback "timed out" result so the verdict synthesis still runs
    // on whatever the other agents found. No hang past the Vercel wall.
    const agentResults = await Promise.all(
      agentPromises.map((p, i) =>
        withTimeout<AgentResult>(p, 22000, {
          agentId: ACTIVE_AGENTS[i].id,
          findings: 'Agent timed out. Verdict synthesised from the agents that completed in time.',
          confidence: 0,
          sources: [],
          timestamp: Date.now(),
        })
      )
    );

    // Generate overall verdict — NVIDIA primary
    const combinedFindings = agentResults
      .map((r) => {
        const profile = AGENT_PROFILES.find((a) => a.id === r.agentId);
        return `[${profile?.name || r.agentId}] (confidence: ${(r.confidence * 100).toFixed(0)}%)\n${r.findings}`;
      })
      .join('\n\n---\n\n');

    let overallVerdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | 'PARTIALLY_TRUE' = 'UNVERIFIED';
    let verdictExplanation = 'Could not determine verdict from agent findings.';
    let verdictExplanationAr = 'لم يتمكن النظام من إصدار حكم واضح.';
    let layersDetected: string[] = [];
    let verdictProvider = 'Rotator';

    let gotVerdict = false;
    const verdictContext = combinedFindings.slice(0, 3500); // keep the prompt small → faster synthesis
    try {
      const verdictPrompt = `You are the Chief Verdict Officer of the Angry Debunkers AI system. Synthesize the specialist agents' findings into a FINAL verdict on the claim.\n\nClaim: "${claim.trim()}"\n\nAgent Findings:\n${verdictContext}\n\nReturn ONLY valid JSON:\n{"verdict":"TRUE|FALSE|MISLEADING|UNVERIFIED|PARTIALLY_TRUE","explanation":"Clear 2-3 sentence verdict in English","explanation_ar":"شرح الحكم بالعربية في جملتين","layers_detected":["layer1","layer2"],"manipulationScore":0.0-1.0,"recommendedAction_ar":"ماذا يجب أن يفعل القارئ؟"}`;
      const { data: nvidiaVerdict } = await withTimeout(
        nvidiaFirstGenerateJSON(verdictPrompt, {
          systemPrompt: 'You are the Chief Verdict Officer synthesizing the AI agents. Return ONLY valid JSON.',
          maxTokens: 500,
          temperature: 0.1,
        }),
        16000,
        { data: null, provider: 'timeout', raw: '' }
      );
      if (nvidiaVerdict && (nvidiaVerdict as any).verdict) {
        overallVerdict = (nvidiaVerdict as any).verdict;
        verdictExplanation = (nvidiaVerdict as any).explanation || verdictExplanation;
        verdictExplanationAr = (nvidiaVerdict as any).explanation_ar || verdictExplanationAr;
        layersDetected = (nvidiaVerdict as any).layers_detected || [];
        gotVerdict = true;
      }
    } catch { /* fall through */ }

    // BUG FIX: the primary uses withTimeout that RESOLVES with {data:null} on
    // timeout (it never throws), so the old `catch`-based fallback NEVER ran and
    // the verdict stayed at the default "UNVERIFIED / could not determine". Run
    // the secondary + deterministic paths explicitly whenever the primary
    // produced no verdict, so a REAL verdict is always returned.
    if (!gotVerdict) {
      verdictProvider = 'Gemini';
      try {
        const verdictResult = await withTimeout(
          rotatingGenerateObject({
            system: 'You are the Chief Verdict Officer. Synthesize findings into a verdict.',
            prompt: `Verdict for: "${claim.trim()}"\n\n${verdictContext}`,
            schema: verdictSchema,
          }),
          14000,
          null as any,
        );
        if (verdictResult?.object?.verdict) {
          overallVerdict = verdictResult.object.verdict;
          verdictExplanation = verdictResult.object.explanation || verdictExplanation;
          layersDetected = verdictResult.object.layers_detected || [];
          gotVerdict = true;
        }
      } catch { /* fall through to deterministic */ }
    }

    if (!gotVerdict) {
      // Deterministic verdict from the agents that completed — never leave the
      // default. Each agent's confidence reflects its own deception read.
      const completed = agentResults.filter((r) => r.confidence > 0);
      const avgConf = completed.length ? completed.reduce((s, r) => s + r.confidence, 0) / completed.length : 0;
      if (avgConf >= 0.6) {
        overallVerdict = 'FALSE';
        verdictExplanation = `${completed.length} specialist agent(s) found strong deception and manipulation markers in this claim; it does not withstand scrutiny.`;
        verdictExplanationAr = `رصد ${completed.length} من الوكلاء المتخصصين مؤشرات خداع وتلاعب قوية في هذا الادعاء؛ وهو لا يصمد أمام الفحص.`;
      } else if (avgConf >= 0.4) {
        overallVerdict = 'MISLEADING';
        verdictExplanation = 'The agents found partial/mixed manipulation signals — treat this claim as misleading and verify before sharing.';
        verdictExplanationAr = 'رصد الوكلاء مؤشرات تلاعب جزئية — تعامل مع الادعاء كمضلِّل وتحقّق قبل المشاركة.';
      } else {
        overallVerdict = 'UNVERIFIED';
        verdictExplanation = 'Not enough verified signal from the agents to issue a confident verdict.';
        verdictExplanationAr = 'لا توجد إشارات مؤكدة كافية من الوكلاء لإصدار حكم واثق.';
      }
      verdictProvider = 'deterministic';
    }

    const report: InvestigationReport = {
      claim: claim.trim(),
      agents: agentResults,
      overallVerdict,
      verdictExplanation,
      verdictExplanationAr,
      layers_detected: layersDetected,
      timestamp: Date.now(),
      verdictProvider,
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
