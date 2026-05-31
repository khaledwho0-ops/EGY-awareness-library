import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';

/* ═══════════════════════════════════════════════════════════════
 * POST /api/defense/hadith-check
 * 
 * AI-powered Hadith authenticity checker using the mega-rotator.
 * Accepts a hadith text and returns classification, source,
 * narrator chain analysis, and scholar opinions.
 * ═══════════════════════════════════════════════════════════════ */

const HadithCheckSchema = z.object({
  classification: z.enum(['Sahih', 'Hasan', 'Da\'if', 'Mawdu\'']).describe(
    'The authenticity classification of the hadith: Sahih (authentic), Hasan (good), Da\'if (weak), or Mawdu\' (fabricated)'
  ),
  confidencePercent: z.number().describe(
    'Confidence percentage (0-100) in the classification'
  ),
  sourceBook: z.string().describe(
    'The primary hadith collection where this narration appears (e.g., Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, etc.). Say "Not found in major collections" if not identifiable.'
  ),
  hadithNumber: z.string().describe(
    'The hadith reference number in the source book, if known. Say "Unknown" if not identifiable.'
  ),
  narratorChainAnalysis: z.object({
    chainSummary: z.string().describe(
      'A summary of the narrator chain (isnad) and its reliability'
    ),
    weakLinks: z.array(z.string()).describe(
      'Names of any weak or problematic narrators in the chain'
    ),
    chainGrade: z.string().describe(
      'Overall grade of the narrator chain: Connected, Broken, Fabricated, Unknown'
    ),
  }).describe('Analysis of the narrator chain (isnad)'),
  scholarOpinions: z.array(
    z.object({
      scholar: z.string().describe('Name of the Islamic scholar'),
      opinion: z.string().describe('Their ruling on this hadith'),
      era: z.string().describe('Historical era of the scholar (e.g., "Classical", "Medieval", "Modern")'),
    })
  ).describe('Opinions from recognized Islamic scholars about this hadith'),
  textAnalysis: z.string().describe(
    'Brief analysis of the hadith text (matn) for any contradictions with the Quran, established Sunnah, or reason'
  ),
  arabicClassification: z.string().describe(
    'The classification in Arabic: صحيح، حسن، ضعيف، أو موضوع'
  ),
  recommendation: z.string().describe(
    'A practical recommendation for the user about how to treat this hadith'
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hadithText } = body;

    if (!hadithText || typeof hadithText !== 'string' || hadithText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a hadith text to check (hadithText field required)' },
        { status: 400 }
      );
    }

    if (hadithText.length > 5000) {
      return NextResponse.json(
        { error: 'Hadith text is too long. Maximum 5000 characters.' },
        { status: 400 }
      );
    }

    const result = await rotatingGenerateObject({
      system: `You are an expert Islamic hadith scholar (Muhaddith) with deep knowledge of:
- The six canonical hadith collections (Kutub al-Sittah)
- The science of hadith authentication (Ulum al-Hadith)
- Narrator criticism and evaluation (Ilm al-Rijal)
- Classical and modern scholarly opinions

Your task is to analyze a given hadith text and determine its authenticity classification.
Be honest and rigorous. If you're uncertain, say so. Never fabricate scholar opinions.
If the text is not a recognized hadith, state that clearly.
Respond in a balanced way, giving both the classification and the reasoning.`,
      prompt: `Analyze the following hadith text for authenticity:

"""
${hadithText.trim()}
"""

Provide a detailed authenticity analysis including classification, source book, narrator chain analysis, and scholar opinions.`,
      schema: HadithCheckSchema,
    });

    return NextResponse.json({
      success: true,
      analysis: result.object,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Hadith Check API] Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
