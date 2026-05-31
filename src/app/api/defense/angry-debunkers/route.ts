import { NextResponse } from "next/server";
import { runPreflight } from "@/lib/debunking/preflight";
import { executeApiSwarm } from "@/lib/debunking/workers/api-swarm";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "@/lib/debunking/egy-data";
import { GodSystemAuditSchema, LayerAwareAnalysisSchema } from "@/types/god-system";

export const runtime = 'nodejs';

/* ══════════════════════════════════════════════════════════
   QUICK MODE SCHEMA (1 API call — Truth Sandwich only)
   Bilingual: Arabic + English  |  Religion-Aware
══════════════════════════════════════════════════════════ */
const QuickSchema = z.object({
  egyptian_vector_hit: EgyptianContextVectorSchema,
  negative_science_violation: NegativeScienceCategorySchema,
  truth_sandwich: z.object({
    fact_1_ar: z.string().describe('First fact in Arabic (Egyptian dialect preferred). If religious claim, cite the actual hadith/verse with correct scholarly context'),
    fact_1_en: z.string().describe('First fact in English'),
    myth_ar: z.string().describe('The myth/lie being debunked in Arabic'),
    myth_en: z.string().describe('The myth/lie being debunked in English'),
    fact_2_ar: z.string().describe('Second reinforcing fact in Arabic. If religious, cite scholars (e.g. Ibn Hajar, Al-Nawawi) and their actual positions'),
    fact_2_en: z.string().describe('Second reinforcing fact in English'),
  }),
  verdict: z.enum(['DEBUNKED', 'MISLEADING', 'PARTIALLY_TRUE', 'UNVERIFIED', 'TRUE']).describe('Overall verdict on the claim'),
  verdict_explanation_ar: z.string().describe('1-2 paragraph explanation of verdict in Arabic, detailed and educational'),
  verdict_explanation_en: z.string().describe('1-2 paragraph explanation of verdict in English, detailed and educational'),
  is_religious_claim: z.boolean().describe('true if the claim involves religion, hadith, Quran, fatwa, or Islamic content'),
  religious_context: z.object({
    hadith_status: z.string().optional().describe('If hadith is cited: Sahih/Hasan/Da\'if/Mawdu\'/Not a hadith'),
    correct_interpretation: z.string().optional().describe('The scholarly consensus interpretation of the religious text cited'),
    scholars_cited: z.string().optional().describe('Which Islamic scholars have addressed this topic (e.g. Al-Albani, Ibn Baz)'),
  }).optional().describe('Only populated if is_religious_claim is true'),
  confidence_score: z.number().min(0).max(100).describe('How confident is this analysis (0-100)'),
});

/* ══════════════════════════════════════════════════════════
   DEEP MODE SCHEMA (2nd API call — full forensic analysis)
══════════════════════════════════════════════════════════ */
const DeepSchema = z.object({
  god_system_7_layer_audit: GodSystemAuditSchema,
  patient_zero_tracing: z.object({
    origin_year: z.string().describe('The approximate year this myth first emerged'),
    origin_platform: z.string().describe('The platform or context where this myth originated'),
    transmission_vector: z.string().describe('HOW the lie spread specifically into Egyptian/Arab context'),
    why_trending_now: z.string().describe('Why this myth is circulating right now in 2025/2026 Egypt'),
    named_instigator: z.string().optional().describe('The primary spreader if identifiable'),
  }),
  layer_aware_analysis: LayerAwareAnalysisSchema,
});

export async function POST(req: Request) {
  try {
    const { query, pdfBase64, pdfMimeType, mode = 'quick' } = await req.json();
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    // PHASE 1: Pre-Flight & Routing
    const preflight = await runPreflight(query);

    // Red-Direct Panic Check
    if (preflight.isRedDirectPanic) {
      return NextResponse.json({
        type: "RED_DIRECT",
        message: "تم اكتشاف حالة طوارئ. يرجى الاتصال بالخط الساخن للأزمات فوراً: 16328",
        confidence_score: 100,
      });
    }

    // PHASE 2: API Swarm (free external APIs — no AI credits used)
    const workerData = await executeApiSwarm(preflight.normalizedText);

    const citationsText = workerData.map(w => `Title: ${w.title}\nAbstract: ${w.abstract}\nCredibility: ${w.credibilityScore}`).join('\n\n');

    let urlMetadataBlock = "";
    if (preflight.isUrlInput && preflight.sourceUrl) {
      urlMetadataBlock = `Source URL: ${preflight.sourceUrl}\nArticle Title: ${preflight.extractedTitle ?? "Unknown"}\n`;
    }

    /* ════════════════════════════════════════════════════
       QUICK MODE — Truth Sandwich + Verdict (1 API call)
    ════════════════════════════════════════════════════ */
    const quickPrompt = `You are the NO-MERCY Truth Sandwich Engine. Analyze this claim with ZERO tolerance for misinformation.

CLAIM: "${query}"
CONTEXT VECTOR: "${preflight.vector}"
${urlMetadataBlock}
WORKER DATA:
${citationsText}

CRITICAL INSTRUCTIONS:
1. Generate a BILINGUAL Truth Sandwich (Arabic + English). Arabic should use Egyptian dialect where appropriate.
2. RELIGIOUS AWARENESS: If this claim cites hadith, Quran, fatwa, or Islamic scholars:
   - Verify the hadith authenticity (Sahih/Hasan/Da'if/Mawdu')
   - Cite the actual scholars and their positions (Ibn Hajar, Al-Albani, Al-Nawawi, etc.)
   - Distinguish between the ACTUAL religious text and the MISUSE of it
   - Set is_religious_claim to true and populate religious_context
3. The Truth Sandwich format: FACT → MYTH → FACT. Lead with truth, expose the lie, reinforce with more truth.
4. Be specific with evidence. Do NOT be generic. Name sources, dates, studies.
5. The verdict explanation must be educational — teach the reader WHY this is false.

Generate the response adhering strictly to the schema.`;

    const pdfMessages = pdfBase64 ? [{
      role: 'user' as const,
      content: [
        { type: 'file' as const, data: pdfBase64, mimeType: (pdfMimeType || 'application/pdf') as string },
        { type: 'text' as const, text: quickPrompt }
      ] as any,
    }] as any[] : undefined;

    console.log(`[Angry Debunkers] Mode: ${mode} | Vector: ${preflight.vector}`);

    const { object: quickResult } = await rotatingGenerateObject({
      schema: QuickSchema,
      ...(pdfMessages ? { messages: pdfMessages as any } : { prompt: quickPrompt }),
    });

    const responseData: any = {
      ...quickResult,
      citations: workerData.map(w => ({ title: w.title, url: w.citationUrl })),
      isUrlInput: preflight.isUrlInput ?? false,
      extractedTitle: preflight.extractedTitle,
      sourceUrl: preflight.sourceUrl,
    };

    /* ════════════════════════════════════════════════════
       DEEP MODE — Full forensic analysis (2nd API call)
       Only triggered when user clicks "Go Deeper"
    ════════════════════════════════════════════════════ */
    if (mode === 'deep') {
      console.log(`[Angry Debunkers] DEEP MODE — Running full forensic analysis...`);

      const deepPrompt = `You are the God-System forensic engine. Perform DEEP ANALYSIS on this claim:

CLAIM: "${query}"
CONTEXT VECTOR: "${preflight.vector}"
QUICK VERDICT: ${quickResult.verdict}

${urlMetadataBlock}WORKER DATA:
${citationsText}

MISSIONS:
1. GOD-SYSTEM 7-LAYER AUDIT: Score each of the 7 audit layers with brutal honesty.
2. PATIENT ZERO TRACING: Trace origin year, platform, transmission vector, why trending now, named instigator.
3. 8-LAYER DECEPTION DETECTION: Identify which of the 8 Layers of Deception:
   Layer 1: THE ABSOLUTE FABRICATION (الكذب المطلق)
   Layer 2: THE BIASED LENS (العدسة المنحازة)
   Layer 3: DECONTEXTUALIZATION (اقتلاع السياق)
   Layer 4: WEAPONIZED TIMING (التوقيت المسلّح)
   Layer 5: THE EVIL APPLICATION (التطبيق الشرير)
   Layer 6: THE MATRIX OF MANIPULATION (مصفوفة التلاعب)
   Layer 7: THE MEGA-MACHINE (المهندسون)
   Layer 8: THE UNKNOWN (المجهول)
   Deploy 3-6 counter-weapons with Arabic names and effectiveness ratings.

Generate strictly per schema.`;

      const { object: deepResult } = await rotatingGenerateObject({
        schema: DeepSchema,
        prompt: deepPrompt,
      });

      const auditLayers = Object.values(deepResult.god_system_7_layer_audit);
      const deepConfidence = auditLayers.reduce((acc: number, layer: any) => acc + layer.confidence, 0) / auditLayers.length;

      responseData.deep = {
        ...deepResult,
        deep_confidence_score: deepConfidence,
      };
    }

    return NextResponse.json({
      type: "SYNTHESIS_COMPLETE",
      mode,
      hasPdfInput: Boolean(pdfBase64),
      data: responseData,
    });

  } catch (error: any) {
    console.error("[Angry Debunkers API] Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
