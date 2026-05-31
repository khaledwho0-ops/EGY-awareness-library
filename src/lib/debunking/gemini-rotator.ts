import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateObject } from "ai";

/**
 * ██████╗  MEGA-ROTATOR v6 — BULLETPROOF ██████╗
 *
 * Provider cascade (structured output priority):
 *   ① Gemini (5 keys)     — best for structured output
 *   ② Groq (3 keys)       — fast, good JSON support
 *   ③ OpenRouter (2 keys)  — free models, JSON support varies
 *   ④ Cerebras (2 keys)    — fast, may not support JSON schema
 *   ⑤ Together AI (1 key)  — may not support JSON schema
 *   ⑥ SambaNova (1 key)    — may not support JSON schema
 */

interface ProviderSlot {
  provider: string;
  build: () => any;
}

function env(name: string): string | undefined {
  const val = process.env[name];
  return val && val.trim().length > 0 ? val.trim() : undefined;
}

function buildSlots(): ProviderSlot[] {
  const slots: ProviderSlot[] = [];

  // ① GEMINI — best structured output support
  const gemKeys = [env("GEMINI_API_KEY"), env("GEMINI_API_KEY_2"), env("GEMINI_API_KEY_3"), env("GEMINI_API_KEY_4"), env("GEMINI_API_KEY_5")].filter(Boolean) as string[];
  for (const key of gemKeys) {
    slots.push({
      provider: "Gemini",
      build: () => createGoogleGenerativeAI({ apiKey: key })("gemini-2.5-flash"),
    });
  }

  // ② GROQ — fast, good JSON
  const groqKeys = [env("GROQ_API_KEY"), env("GROQ_API_KEY_2"), env("GROQ_API_KEY_3")].filter(Boolean) as string[];
  for (const key of groqKeys) {
    slots.push({
      provider: "Groq",
      build: () => createGroq({ apiKey: key })("llama-3.3-70b-versatile"),
    });
  }

  // ③ OPENROUTER — free models
  const orKeys = [env("OPENROUTER_API_KEY"), env("OPENROUTER_API_KEY_2")].filter(Boolean) as string[];
  for (const key of orKeys) {
    slots.push({
      provider: "OpenRouter",
      build: () => createOpenAICompatible({
        name: "openrouter",
        baseURL: "https://openrouter.ai/api/v1",
        headers: { Authorization: `Bearer ${key}` },
      })("meta-llama/llama-3.3-70b-instruct:free"),
    });
  }

  // ④ CEREBRAS
  const cereKeys = [env("CEREBRAS_API_KEY"), env("CEREBRAS_API_KEY_2")].filter(Boolean) as string[];
  for (const key of cereKeys) {
    slots.push({
      provider: "Cerebras",
      build: () => createOpenAICompatible({
        name: "cerebras",
        baseURL: "https://api.cerebras.ai/v1",
        headers: { Authorization: `Bearer ${key}` },
      })("llama-3.3-70b"),
    });
  }

  // ⑤ TOGETHER AI
  const togKey = env("TOGETHER_API_KEY");
  if (togKey) {
    slots.push({
      provider: "Together",
      build: () => createOpenAICompatible({
        name: "together",
        baseURL: "https://api.together.xyz/v1",
        headers: { Authorization: `Bearer ${togKey}` },
      })("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
    });
  }

  // ⑥ SAMBANOVA
  const samKey = env("SAMBANOVA_API_KEY");
  if (samKey) {
    slots.push({
      provider: "SambaNova",
      build: () => createOpenAICompatible({
        name: "sambanova",
        baseURL: "https://api.sambanova.ai/v1",
        headers: { Authorization: `Bearer ${samKey}` },
      })("Meta-Llama-3.3-70B-Instruct"),
    });
  }

  return slots;
}

const SLOTS = buildSlots();

if (SLOTS.length === 0) {
  throw new Error("[MegaRotator] No API keys found in .env.local!");
}

console.log(`[MegaRotator] ✅ Loaded ${SLOTS.length} API key slots across providers`);

// ── STATE ──
const cooldowns: Map<number, number> = new Map();
let activeSlot = 0;

function isRetryable(err: unknown): boolean {
  const msg = String((err as any)?.message ?? "") + JSON.stringify((err as any)?.data ?? "");
  return /429|503|RESOURCE_EXHAUSTED|quota|rate.limit|too many|high demand|try again|overloaded|capacity|exceeded|fetch failed|ECONNREF|timeout|unavailable/i.test(msg);
}

function extractWaitMs(err: unknown): number {
  const msg = String((err as any)?.message ?? "");
  const m = msg.match(/retry in ([\d.]+)s/i);
  if (m) return Math.ceil(parseFloat(m[1])) * 1000 + 1500;
  const h = msg.match(/retry-after:\s*(\d+)/i);
  if (h) return parseInt(h[1]) * 1000 + 1000;
  return 22_000;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

function isAvailable(idx: number): boolean {
  return Date.now() >= (cooldowns.get(idx) ?? 0);
}

function setCooldown(idx: number, ms: number) {
  cooldowns.set(idx, Date.now() + ms);
}

// ── MAIN ROTATOR ──
export async function rotatingGenerateObject(args: Record<string, any>): Promise<any> {
  const { modelName, ...rest } = args;
  const errors: string[] = [];

  // PHASE 1: Try ALL available slots
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (!isAvailable(idx)) {
      const remain = Math.ceil(((cooldowns.get(idx) ?? 0) - Date.now()) / 1000);
      console.log(`[MegaRotator] Skip ${SLOTS[idx].provider} #${idx} (${remain}s cooldown)`);
      continue;
    }

    const slot = SLOTS[idx];
    try {
      console.log(`[MegaRotator] Trying ${slot.provider} slot #${idx + 1}/${SLOTS.length}...`);
      const model = slot.build();
      const result = await (generateObject as any)({ ...rest, model, maxRetries: 0 });
      activeSlot = idx;
      console.log(`[MegaRotator] ✅ SUCCESS: ${slot.provider} slot #${idx + 1}/${SLOTS.length}`);
      return result;
    } catch (err: any) {
      const msg = String(err?.message ?? "").slice(0, 200);
      errors.push(`${slot.provider}#${idx + 1}: ${msg}`);

      if (isRetryable(err)) {
        const waitMs = extractWaitMs(err);
        setCooldown(idx, waitMs);
        console.warn(`[MegaRotator] ⚠️ ${slot.provider} #${idx + 1} rate-limited → ${Math.ceil(waitMs / 1000)}s cooldown`);
        continue;
      }

      // Non-retryable but known incompatibility — skip with long cooldown
      if (/not support|json_schema|response_format|Unsupported|structured|tool_use|function/i.test(msg)) {
        setCooldown(idx, 600_000); // 10 min cooldown for unsupported features
        console.warn(`[MegaRotator] ⛔ ${slot.provider} #${idx + 1} doesn't support structured output. Skipping for 10min.`);
        continue;
      }

      // Unknown error — still continue to next provider instead of throwing
      setCooldown(idx, 30_000);
      console.error(`[MegaRotator] ❌ ${slot.provider} #${idx + 1} error: ${msg}`);
      continue; // DON'T throw — try next provider
    }
  }

  // PHASE 2: ALL slots exhausted — wait for shortest cooldown
  let shortestWait = Infinity;
  let shortestIdx = 0;

  for (let i = 0; i < SLOTS.length; i++) {
    const until = cooldowns.get(i) ?? 0;
    const remaining = until - Date.now();
    if (remaining > 0 && remaining < shortestWait) {
      shortestWait = remaining;
      shortestIdx = i;
    }
  }

  if (shortestWait <= 0 || shortestWait === Infinity) shortestWait = 15_000;
  shortestWait = Math.min(shortestWait, 65_000);

  console.warn(
    `[MegaRotator] 🔄 All ${SLOTS.length} slots exhausted. ` +
    `Waiting ${Math.ceil(shortestWait / 1000)}s for ${SLOTS[shortestIdx].provider}...`
  );
  await sleep(shortestWait);

  // PHASE 3: Retry after wait — try ALL again
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (shortestIdx + i) % SLOTS.length;
    try {
      console.log(`[MegaRotator] 🔄 Retry ${SLOTS[idx].provider} slot #${idx + 1}...`);
      const model = SLOTS[idx].build();
      const result = await (generateObject as any)({ ...rest, model, maxRetries: 0 });
      activeSlot = idx;
      console.log(`[MegaRotator] ✅ Recovered: ${SLOTS[idx].provider} #${idx + 1} after wait`);
      cooldowns.delete(idx);
      return result;
    } catch (retryErr: any) {
      const msg = String(retryErr?.message ?? "").slice(0, 100);
      console.warn(`[MegaRotator] Retry failed for ${SLOTS[idx].provider}: ${msg}`);
      continue;
    }
  }

  // PHASE 4: Complete failure
  const errorSummary = errors.join(' | ').slice(0, 500);
  throw new Error(
    `[MegaRotator] All ${SLOTS.length} API key slots failed across ` +
    `${new Set(SLOTS.map(s => s.provider)).size} providers. ` +
    `Wait 60s and try again. Errors: ${errorSummary}`
  );
}

// ── STREAMING MODEL ──
export function getActiveGeminiModel(modelName = "gemini-2.5-flash") {
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (isAvailable(idx)) {
      try { return SLOTS[idx].build(); } catch { continue; }
    }
  }
  return SLOTS[0].build();
}

export const TOTAL_KEY_COUNT = SLOTS.length;
