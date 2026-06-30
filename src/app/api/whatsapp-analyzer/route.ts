import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";
export const maxDuration = 60;

const WhatsappSchema = z.object({
  score: z.number().min(0).max(100).describe("Total manipulation probability (0-100)."),
  botPatterns: z.array(z.string()).describe("List of detected bot patterns or chain-message syntax styles."),
  emotionalFraming: z.array(z.string()).describe("List of emotional hooks used (outrage, fear, conspiratorial)."),
  urgencyIndicators: z.array(z.string()).describe("List of time pressure markers (urgent, share now, forward)."),
  summary: z.object({
    en: z.string().describe("English diagnostic report summary."),
    ar: z.string().describe("Arabic diagnostic report summary.")
  })
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text payload" }, { status: 400 });
    }

    // ═══ NVIDIA NIM — ADVANCED WHATSAPP ANALYSIS ═══
    const systemPrompt = `You are an expert NLP forensics engine specializing in WhatsApp rumor transmission, bot pattern detection, and Arabic disinformation analysis. Always respond with valid JSON only, no markdown.`;

    // LATENCY: only request the fields the UI actually consumes. Generated
    // output tokens dominate latency on this route, so we keep the required
    // JSON to score + the three indicator arrays + bilingual summary. Each
    // array is capped to ≤3 concise items to bound output length.
    const nvidiaPrompt = `Analyze this WhatsApp message for manipulation, disinformation, and emotional triggers:

"${text}"

Return ONLY this JSON structure (max 3 short items per array, no extra keys):
{
  "score": 0-100,
  "botPatterns": ["pattern1", "pattern2"],
  "emotionalFraming": ["hook1", "hook2"],
  "urgencyIndicators": ["indicator1", "indicator2"],
  "summary": {
    "en": "English diagnostic summary (1-2 sentences)",
    "ar": "ملخص تشخيصي بالعربية (جملة أو جملتان)"
  }
}`;

    const { data: nvidiaResult, provider } = await nvidiaFirstGenerateJSON(nvidiaPrompt, {
      systemPrompt,
      maxTokens: 600,
      temperature: 0.2,
    });

    if (nvidiaResult) {
      return NextResponse.json({
        ...nvidiaResult,
        provider,
      });
    }

    // ── GEMINI (FALLBACK) ──────────────────────────────────────────
    console.warn("[WhatsApp Analyzer] NVIDIA failed, falling back to Gemini");

    const geminiPrompt = `You are an expert NLP forensics engine specializing in WhatsApp rumor transmission and bot pattern detection.
Analyze the following message for manipulation, coordinated spam patterns, emotional framing, and artificial urgency:

"${text}"

AUDIT REQUIREMENTS:
1. Identify bot patterns: Check for standard forward headers, signature chain-letter templates, copy-paste artifacts, tracking URLs, and coordination.
2. Identify emotional framing: Analyze for fear-mongering, moral outrage, spiritual gaslighting, or conspiratorial "secret truth" hooks.
3. Identify urgency indicators: Analyze for artificial time constraints ("share within 5 minutes", "forward before it is deleted").
4. Compute a total manipulation probability score (0-100).
5. Conform strictly to the JSON schema.`;

    const { object: result } = await rotatingGenerateObject({
      schema: WhatsappSchema,
      prompt: geminiPrompt,
      maxOutputTokens: 600,
    });

    return NextResponse.json({
      ...result,
      claims: [],
      emotionalManipulationTriggers: [],
      arabicRebuttal: "يرجى التحقق من المصادر الموثوقة قبل المشاركة.",
      englishRebuttal: "Please verify from reliable sources before sharing.",
      overallVerdict: result.score > 70 ? "DANGEROUS" : result.score > 40 ? "SUSPICIOUS" : "SAFE",
      provider: "Gemini",
    });

  } catch (error: any) {
    console.error("[WhatsApp Analyzer API Error]", error);
    // Graceful degradation — NEVER 500. If every AI provider is momentarily
    // busy/exhausted, return a neutral, honest result so the UI still renders
    // (the page reads score/botPatterns/emotionalFraming/urgencyIndicators/summary).
    return NextResponse.json({
      score: 50,
      botPatterns: [],
      emotionalFraming: [],
      urgencyIndicators: [],
      summary: {
        en: "Automated analysis is temporarily unavailable (AI providers are busy). Treat forwarded health or urgent claims with caution and verify from a trusted source before sharing.",
        ar: "التحليل الآلي غير متاح مؤقتًا (مزوّدو الذكاء الاصطناعي مشغولون). تعامل بحذر مع الرسائل الصحية أو العاجلة المُعاد توجيهها، وتحقّق من مصدر موثوق قبل المشاركة.",
      },
      provider: "fallback",
      note: "ai_unavailable",
    });
  }
}
