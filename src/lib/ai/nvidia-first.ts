/**
 * Text-generation helper — NOW ROTATOR-BACKED (MegaRotator v8).
 * ════════════════════════════════════════════════════════════
 * Delegates to the MegaRotator: Gemini → Groq → OpenRouter → Cerebras →
 * Together → SambaNova → NVIDIA (LAST). This replaces the old NVIDIA-first /
 * single-Gemini-fallback path that timed out (550B ~22s) and ignored the
 * 12+ healthy keys. The export names are unchanged for caller compatibility
 * (chat, debunker via nvidiaFirstGenerateJSON, etc.).
 *
 * Real multi-key failover — no mock, no single-key fallback.
 */

import { rotatingGenerateText } from "@/lib/debunking/gemini-rotator";

interface NvidiaFirstResult {
  text: string;
  provider: string; // actual rotator slot that answered: "Gemini" | "Groq" | ... | "none"
  model: string;
}

/**
 * Generate text via the rotator (Gemini-first, NVIDIA-last). Never throws —
 * returns provider:"none" with empty text only if EVERY slot failed, so callers
 * can decide their own fallback.
 */
export async function nvidiaFirstGenerate(
  prompt: string,
  options: {
    systemPrompt?: string;
    nvidiaModel?: string; // ignored — rotator picks the model
    geminiModel?: string; // ignored — rotator picks the model
    maxTokens?: number;
    temperature?: number;
  } = {},
): Promise<NvidiaFirstResult> {
  try {
    const { text, provider, model } = await rotatingGenerateText({
      prompt,
      system: options.systemPrompt,
      temperature: options.temperature ?? 0.3,
      // Default 1500 (> rotator's internal 1200) so bilingual Arabic+English JSON
      // doesn't truncate; truncation → JSON.parse fails → null data → empty/fallback.
      maxTokens: options.maxTokens ?? 1500,
    });
    return { text, provider, model };
  } catch (e) {
    console.warn("[nvidiaFirstGenerate] rotator exhausted all slots:", e);
    return { text: "", provider: "none", model: "none" };
  }
}

/**
 * JSON generation via the rotator. Attempts to parse the response as JSON.
 */
export async function nvidiaFirstGenerateJSON<T = unknown>(
  prompt: string,
  options: Parameters<typeof nvidiaFirstGenerate>[1] = {},
): Promise<{ data: T | null; provider: string; raw: string }> {
  const result = await nvidiaFirstGenerate(prompt, {
    ...options,
    temperature: options?.temperature ?? 0.3,
  });

  // 1) Direct parse after stripping code fences.
  const cleaned = result.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  try {
    return { data: JSON.parse(cleaned) as T, provider: result.provider, raw: result.text };
  } catch { /* try recovery below */ }
  // 2) Recovery: pull the first complete JSON value out of prose/markdown-wrapped
  //    output. This is the #1 failure mode — the model answers with valid JSON but
  //    surrounds it with a sentence, so strict JSON.parse threw and the whole
  //    result dropped to null → empty/fallback/500 in callers (whatsapp,
  //    paper-auditor, toxicity, etc.). Now we recover the real JSON.
  const extracted = extractFirstJson(cleaned) ?? extractFirstJson(result.text);
  if (extracted) {
    try { return { data: JSON.parse(extracted) as T, provider: result.provider, raw: result.text }; } catch { /* give up */ }
  }
  return { data: null, provider: result.provider, raw: result.text };
}

/** Extract the first complete brace/bracket-balanced JSON value from a string,
 *  ignoring braces inside string literals. Recovers JSON wrapped in prose. */
function extractFirstJson(s: string): string | null {
  if (!s) return null;
  const start = s.search(/[{[]/);
  if (start < 0) return null;
  const open = s[start];
  const close = open === "{" ? "}" : "]";
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return s.slice(start, i + 1); }
  }
  return null;
}
