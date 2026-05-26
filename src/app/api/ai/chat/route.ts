import { NextRequest, NextResponse } from "next/server";
import { analyzeClaimWithAI, mentalHealthAI, analyzeSentiment, aiGenerate } from "@/lib/ai/providers";
import { EAL_KNOWLEDGE, EAL_KNOWLEDGE_SHORT } from "@/lib/ai/eal-knowledge";

interface HistoryMsg {
  role: "user" | "assistant";
  content: string;
}

const VALID_MODES = new Set(["claim", "mental-health", "sentiment", "general", "translation", "academic"]);

function errorResponse(
  status: number,
  errorCode: string,
  messageAr: string,
  messageEn: string
) {
  return NextResponse.json(
    { ok: false, errorCode, message: messageAr, messageEn },
    { status }
  );
}

/**
 * Detect whether text is primarily Arabic, English, or mixed
 */
function detectLanguage(text: string): "ar" | "en" | "mixed" {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
  const total = arabicChars + latinChars;
  if (total === 0) return "en";
  if (arabicChars / total > 0.7) return "ar";
  if (latinChars / total > 0.7) return "en";
  return "mixed";
}

/**
 * POST /api/ai/chat
 * 
 * Universal AI endpoint for EAL.
 * Supports modes: "claim", "mental-health", "sentiment", "general", "translation", "academic"
 * Automatically falls through Gemini → Groq → GitHub → HuggingFace.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, mode = "general", history = [] } = body as {
      message: string;
      mode?: string;
      history?: HistoryMsg[];
    };

    // Build conversation context string from history
    const contextStr = history.length > 0
      ? history.map(h => `${h.role === "user" ? "User" : "Assistant"}: ${h.content}`).join("\n\n") + "\n\nUser: " + message
      : message;

    if (!message?.trim()) {
      return errorResponse(
        400,
        "MISSING_MESSAGE",
        "الرسالة مطلوبة. اكتب سؤالك أو الادعاء اللي عايز تتحقق منه.",
        "Message is required. Type your question or claim."
      );
    }

    if (!VALID_MODES.has(mode)) {
      return errorResponse(
        400,
        "INVALID_MODE",
        "وضع غير صالح. الأوضاع المتاحة: claim، mental-health، sentiment، general، translation، academic.",
        "Invalid mode. Available: claim, mental-health, sentiment, general, translation, academic."
      );
    }

    const lang = detectLanguage(message);
    let result;
    let sources: { title: string; url?: string; type?: string }[] | undefined;

    switch (mode) {
      case "claim":
        result = await analyzeClaimWithAI(message);
        sources = [
          { title: "EAL Fact-Check Engine", type: "engine" },
          { title: lang === "ar" || lang === "mixed" ? "محرك التحقق من الحقائق" : "Fact Verification Engine", type: "system" },
        ];
        break;

      case "mental-health":
        result = await mentalHealthAI(message);
        sources = [
          { title: "EAL Mental Health Literacy", url: "/mental-health", type: "module" },
          { title: "WHO Mental Health Resources", url: "https://www.who.int/health-topics/mental-health", type: "external" },
        ];
        break;

      case "sentiment": {
        const sentiment = await analyzeSentiment(message);
        return NextResponse.json({
          ok: true,
          sentiment,
          provider: "HuggingFace",
          model: "twitter-roberta-base-sentiment",
        });
      }

      case "translation":
        result = await aiGenerate(contextStr,
          `You are a professional Arabic↔English translator for the Egyptian Awareness Library.

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

CRITICAL RULES:
1. Detect the source language automatically.
2. If the user writes in Arabic (فصحى أو عامية مصرية), translate to natural, fluent English.
3. If the user writes in English, translate to natural, fluent Arabic (Modern Standard Arabic by default).
4. If mixed Arabic-English input: translate the ENTIRE message to whichever language the user requests. If no specific request, translate to Arabic.
5. NEVER do literal word-by-word translation. Always preserve:
   - Original meaning and intent
   - Tone (formal, casual, academic, emotional)
   - Context and cultural nuances
   - Egyptian Arabic expressions should be translated to their English equivalents, not transliterated
6. For technical/academic terms, provide BOTH:
   - The natural translation
   - The original term in parentheses, e.g.: "التنافر المعرفي (Cognitive Dissonance)"
7. Support Egyptian Arabic (العامية المصرية) — understand expressions like "عايز", "مش", "ده", "بتاع"
8. Format output clearly:
   - Translation first
   - Then any notes about terminology or cultural context
   - If the source text contains idioms, explain the idiomatic meaning
9. Handle common mixed-language patterns:
   - "عايز أعمل fact-check" → Understand as requesting fact-checking
   - "The wellness بتاعي" → Understand mixing
   - Technical terms in English within Arabic text → Preserve and translate context
10. Quality standard: The translation should read as if a native speaker wrote it originally.`
        );
        sources = [{ title: "EAL Translation Engine", type: "engine" }];
        break;

      case "academic":
        result = await aiGenerate(contextStr,
          `You are an academic research assistant for the Egyptian Awareness Library (EAL).

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

CRITICAL RULES:
1. Provide research-grade answers with proper citations and original sources.
2. ALWAYS cite the original source for EVERY claim:
   - Author(s), year, title, journal/publisher
   - DOI or URL when available
   - Use APA 7th Edition format
3. Distinguish clearly between:
   - Peer-reviewed evidence (mark with ✓)
   - General knowledge (mark with ℹ️)
   - EAL-specific frameworks (mark with 🔬)
4. If the topic relates to misinformation, mental health, or religious coping, reference EAL's frameworks:
   - Inoculation Theory (McGuire, 1964; Roozenbeek & van der Linden, 2019)
   - COM-B Model (Michie et al., 2011)
   - MHLS (O'Connor & Casey, 2015)
   - Brief RCOPE (Pargament et al., 2011)
   - MIST-20 (Maertens et al., 2023)
5. Support both Arabic and English queries — respond in the language of the query.
6. For mixed Arabic-English queries, understand terms like "wellness", "fact-check" within Arabic text.
7. END every answer with a clearly formatted "📚 Sources / المصادر" section listing ALL references used.
8. If you are uncertain about a fact, say so explicitly with: "⚠️ Unverified" rather than fabricating.
9. For each source, when possible include:
   - Full citation
   - Relevance to the question
   - Whether it's from the EAL knowledge base or external
10. Structure long answers with clear headings and numbered points.`
        );
        // Parse sources from the response if present
        sources = [
          { title: "Academic Sources — see answer", url: "/sources", type: "academic" },
          { title: "EAL Research Library", url: "/evidence", type: "internal" },
        ];
        break;

      default:
        result = await aiGenerate(contextStr,
          `You are the AI assistant for the Egyptian Awareness Library (EAL), a cognitive defense platform.

COMPLETE PLATFORM KNOWLEDGE:
${EAL_KNOWLEDGE}

RULES:
1. Be concise, helpful, and scientifically grounded.
2. Language handling:
   - If the user writes in Arabic, respond in Arabic.
   - If the user writes in English, respond in English.
   - If the message mixes Arabic and English, respond in whichever language dominates.
   - ALWAYS understand mixed Arabic-English input correctly, including terms like:
     wellness, fact-check, chatbot, new line, copy, source, academic, translation
3. For Egyptian Arabic (عامية): Understand expressions like "عايز", "مش", "ده", "بتاع", "إزاي"
4. Always be culturally aware of Egyptian context when relevant.
5. If asked about EAL features, explain them clearly:
   - General AI: Ask anything about the platform
   - Wellness: Mental health literacy and psychoeducation
   - Fact-Check: Verify claims and detect misinformation
   - Translation: Arabic↔English professional translation
   - Academic: Research-grade answers with citations
6. Keep responses well-structured with clear formatting.
7. If the user asks about sources or references, direct them to the Academic mode or Sources Library.`
        );
        break;
    }

    return NextResponse.json({
      ok: true,
      text: result.text,
      provider: result.provider,
      model: result.model,
      latencyMs: result.latencyMs,
      sources,
    });
  } catch (err) {
    console.error("[AI Chat Error]", err);
    const isRateLimit = err instanceof Error && err.message.includes("rate");
    return errorResponse(
      isRateLimit ? 429 : 500,
      isRateLimit ? "RATE_LIMITED" : "AI_GENERATION_FAILED",
      isRateLimit
        ? "تم تجاوز حد الطلبات. حاول تاني بعد شوية."
        : "حصل خطأ أثناء معالجة طلبك. حاول تاني.",
      isRateLimit
        ? "Rate limit exceeded. Try again shortly."
        : "An error occurred processing your request. Please try again."
    );
  }
}
