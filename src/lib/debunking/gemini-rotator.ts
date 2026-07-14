import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateObject, generateText } from "ai";

/**
 * ██████╗  MEGA-ROTATOR v9 — GLM-FIRST (when configured), else GEMINI-FIRST ██████╗
 *
 * Priority order (fast & reliable first, slow last):
 *   ⓪ GLM (via Cloudflare) — LEAD when GLM_CF_BASE_URL is set; one slot per account
 *                            token (GLM_CF_KEYS), auto-rotating to the next account on quota.
 *   ① Gemini   (up to 7 keys) — fast, best structured output
 *   ② Groq     (up to 5 keys) — very fast, good JSON
 *   ③ OpenRouter (2) · ④ Cerebras (2) · ⑤ Together (1) · ⑥ SambaNova (1)
 *   ⑦ NVIDIA NIM (LAST)       — Nemotron-3 550B is strongest but SLOW (~20s+),
 *                               so it is the last-resort slot, never the lead.
 *
 * Powers BOTH rotatingGenerateObject (structured) AND rotatingGenerateText
 * (plain text → every chatbot, via nvidiaFirstGenerate). Real multi-key
 * failover with cooldowns — no mock, no single-key fallback.
 */

interface ProviderSlot {
  provider: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build: () => any;
}

function env(name: string): string | undefined {
  const val = process.env[name];
  return val && val.trim().length > 0 ? val.trim() : undefined;
}

/**
 * Collect ALL keys for a provider from three sources, de-duped, in order:
 *   BASE, BASE_2 … BASE_{maxNumbered}   (legacy numbered slots), then
 *   BASE+"S"  — an UNLIMITED comma-separated list (e.g. GEMINI_API_KEYS="k1,k2,k3,…").
 * The comma list removes the old fixed cap so "add more keys → deeper fallback,
 * quota never dies" just works: drop any number of keys into <PROVIDER>_API_KEYS.
 */
function multiKeys(base: string, maxNumbered: number): string[] {
  const out: string[] = [];
  const add = (v?: string) => { if (v && !out.includes(v)) out.push(v); };
  add(env(base));
  for (let i = 2; i <= maxNumbered; i++) add(env(`${base}_${i}`));
  const list = env(`${base}S`);
  if (list) for (const k of list.split(",").map((s) => s.trim()).filter(Boolean)) add(k);
  return out;
}

function buildSlots(): ProviderSlot[] {
  const slots: ProviderSlot[] = [];

  // ⓪ GLM (via Cloudflare) — LEAD priority when configured (user's primary free engine).
  //    Account-rotation built in: each token below becomes its own slot, so the existing
  //    rotate()+cooldown logic automatically switches to the next account on 429/quota —
  //    i.e. "as soon as one account's quota is spent, the next is used" with no code change.
  //    Configure via env (any/all may be set):
  //      GLM_CF_BASE_URL — OpenAI-compatible base URL of the GLM-via-Cloudflare endpoint.
  //                        If it contains "{ACCOUNT_ID}", an entry may be "accountId:token"
  //                        and the id is substituted per account (Workers-AI-style per-account URLs).
  //      GLM_CF_MODEL    — model id (default "glm-4.6"; set to your GLM 5.2 id when live).
  //      GLM_CF_KEYS     — comma-separated tokens (or "accountId:token" entries), one per account.
  //      GLM_CF_KEY / _2 / _3 — single-key convenience.
  //    Reliability note: rotating many free accounts can trip provider abuse-detection / ToS,
  //    so keep at least one stable provider (Gemini/Groq below) configured as a fallback.
  const glmBaseTmpl = env("GLM_CF_BASE_URL");
  if (glmBaseTmpl) {
    const glmModel = env("GLM_CF_MODEL") || "glm-4.6";
    const glmEntries = [
      ...(env("GLM_CF_KEYS")?.split(",").map((s) => s.trim()).filter(Boolean) ?? []),
      env("GLM_CF_KEY"), env("GLM_CF_KEY_2"), env("GLM_CF_KEY_3"),
    ].filter(Boolean) as string[];
    for (const entry of glmEntries) {
      // "accountId:token" only when the base URL is per-account; otherwise the whole entry is the token.
      const perAccount = glmBaseTmpl.includes("{ACCOUNT_ID}") && entry.includes(":");
      const accountId = perAccount ? entry.slice(0, entry.indexOf(":")) : "";
      const token = perAccount ? entry.slice(entry.indexOf(":") + 1) : entry;
      const baseURL = glmBaseTmpl.replace("{ACCOUNT_ID}", accountId);
      slots.push({
        provider: "GLM-CF",
        build: () => createOpenAICompatible({
          name: "glm-cloudflare",
          baseURL,
          headers: { Authorization: `Bearer ${token}` },
        })(glmModel),
      });
    }
  }

  // ① GEMINI — lead priority (fast + best structured output)
  const gemKeys = multiKeys("GEMINI_API_KEY", 7); // + unlimited via GEMINI_API_KEYS="k1,k2,…"
  for (const key of gemKeys) {
    slots.push({ provider: "Gemini", build: () => createGoogleGenerativeAI({ apiKey: key })("gemini-2.5-flash") });
  }

  // ② GROQ — very fast, good JSON
  const groqKeys = multiKeys("GROQ_API_KEY", 5); // + unlimited via GROQ_API_KEYS="k1,k2,…"
  for (const key of groqKeys) {
    slots.push({ provider: "Groq", build: () => createGroq({ apiKey: key })("llama-3.3-70b-versatile") });
  }

  // KIMI (Moonshot) — DISABLED 2026-06-24: key suspended (insufficient balance).
  // Re-enable when the account is funded:
  // const kimiKey = env("MOONSHOT_API_KEY") || env("KIMI_API_KEY");
  // if (kimiKey) slots.push({ provider: "Kimi", build: () => createOpenAICompatible({ name: "moonshot", baseURL: "https://api.moonshot.ai/v1", headers: { Authorization: `Bearer ${kimiKey}` } })("kimi-k2-0905-preview") });

  // ③ OPENROUTER — free models
  const orKeys = multiKeys("OPENROUTER_API_KEY", 2); // + unlimited via OPENROUTER_API_KEYS="k1,k2,…"
  for (const key of orKeys) {
    slots.push({ provider: "OpenRouter", build: () => createOpenAICompatible({ name: "openrouter", baseURL: "https://openrouter.ai/api/v1", headers: { Authorization: `Bearer ${key}` } })("meta-llama/llama-3.3-70b-instruct:free") });
  }

  // ④ CEREBRAS
  const cereKeys = multiKeys("CEREBRAS_API_KEY", 2); // + unlimited via CEREBRAS_API_KEYS="k1,k2,…"
  for (const key of cereKeys) {
    slots.push({ provider: "Cerebras", build: () => createOpenAICompatible({ name: "cerebras", baseURL: "https://api.cerebras.ai/v1", headers: { Authorization: `Bearer ${key}` } })("llama-3.3-70b") });
  }

  // ⑤ TOGETHER
  const togKey = env("TOGETHER_API_KEY");
  if (togKey) slots.push({ provider: "Together", build: () => createOpenAICompatible({ name: "together", baseURL: "https://api.together.xyz/v1", headers: { Authorization: `Bearer ${togKey}` } })("meta-llama/Llama-3.3-70B-Instruct-Turbo") });

  // ⑥ SAMBANOVA
  const samKey = env("SAMBANOVA_API_KEY");
  if (samKey) slots.push({ provider: "SambaNova", build: () => createOpenAICompatible({ name: "sambanova", baseURL: "https://api.sambanova.ai/v1", headers: { Authorization: `Bearer ${samKey}` } })("Meta-Llama-3.3-70B-Instruct") });

  // ── EXTRA FREE OpenAI-compatible providers (from freellm.net) ─────────────
  // Each activates ONLY when its env key is set → more free capacity so the
  // rotator stops falling back to the graceful placeholder under load. Every
  // slot is fail-safe: a bad/rate-limited one is just cooled down and skipped.

  // ⑦ MISTRAL — console.mistral.ai (free tier, no card; phone verify). Key: MISTRAL_API_KEY
  const mistralKey = env("MISTRAL_API_KEY");
  if (mistralKey) slots.push({ provider: "Mistral", build: () => createOpenAICompatible({ name: "mistral", baseURL: "https://api.mistral.ai/v1", headers: { Authorization: `Bearer ${mistralKey}` } })(env("MISTRAL_MODEL") || "mistral-small-latest") });

  // ⑧ COHERE (chat) — REUSES the COHERE_API_KEY already set for reranking, so this
  //    one adds capacity immediately with no new signup. cohere.com
  const cohereChatKey = env("COHERE_API_KEY");
  if (cohereChatKey) slots.push({ provider: "Cohere", build: () => createOpenAICompatible({ name: "cohere", baseURL: "https://api.cohere.ai/compatibility/v1", headers: { Authorization: `Bearer ${cohereChatKey}` } })(env("COHERE_CHAT_MODEL") || "command-r-08-2024") });

  // ⑧½ ZENMUX — zenmux.ai OpenAI-compatible gateway (<provider>/<model>). UNLIMITED keys via
  //     ZENMUX_API_KEYS="k1,k2,…". Intentionally NOT in SPEED_PRIORITY ⇒ default weight 50 ⇒ it
  //     runs only AFTER every free provider, so it's a deep last-resort that won't burn credits
  //     until free quota is truly exhausted. Set ZENMUX_MODEL to pick the routed model.
  const zenmuxKeys = multiKeys("ZENMUX_API_KEY", 4);
  for (const key of zenmuxKeys) {
    slots.push({ provider: "ZenMux", build: () => createOpenAICompatible({ name: "zenmux", baseURL: "https://zenmux.ai/api/v1", headers: { Authorization: `Bearer ${key}` } })(env("ZENMUX_MODEL") || "openai/gpt-4o-mini") });
  }

  // ⑧¾ NARAROUTER — router.bynara.id OpenAI-compatible gateway. VERIFIED live: only the free-tier
  //      model `kimi-k2.7-code-free` runs at balance 0 (a strong 262K-ctx reasoning model) — the
  //      premium ones (claude-opus-4.8 / sonnet-5 / fable-5 / gpt-5.5 / glm-5.2) return 402 without
  //      paid credits. So NARA_MODEL defaults to the free model; change it only if you top up.
  //      Keyed via NARA_API_KEYS="k1,k2,…" (one fresh key per email = more free daily quota).
  //      Mid priority (SPEED_PRIORITY below) ⇒ real free fallback capacity; fails over on 402/403/429.
  const naraKeys = multiKeys("NARA_API_KEY", 4);
  for (const key of naraKeys) {
    slots.push({ provider: "NaraRouter", build: () => createOpenAICompatible({ name: "nara", baseURL: "https://router.bynara.id/v1", headers: { Authorization: `Bearer ${key}` } })(env("NARA_MODEL") || "kimi-k2.7-code-free") });
  }

  // ⑨ GITHUB MODELS — github.com/marketplace/models (uses a GitHub PAT). Key: GITHUB_MODELS_KEY or GITHUB_TOKEN
  const ghModelsKey = env("GITHUB_MODELS_KEY") || env("GITHUB_TOKEN");
  if (ghModelsKey) slots.push({ provider: "GitHubModels", build: () => createOpenAICompatible({ name: "github-models", baseURL: "https://models.inference.ai.azure.com", headers: { Authorization: `Bearer ${ghModelsKey}` } })(env("GITHUB_MODEL") || "gpt-4o-mini") });

  // ⑩ CLOUDFLARE WORKERS AI — needs both CF_WORKERS_AI_TOKEN and CF_ACCOUNT_ID. cloudflare.com
  const cfToken = env("CF_WORKERS_AI_TOKEN"); const cfAccount = env("CF_ACCOUNT_ID");
  if (cfToken && cfAccount) slots.push({ provider: "CloudflareAI", build: () => createOpenAICompatible({ name: "cloudflare-workers-ai", baseURL: `https://api.cloudflare.com/client/v4/accounts/${cfAccount}/ai/v1`, headers: { Authorization: `Bearer ${cfToken}` } })(env("CF_WORKERS_AI_MODEL") || "@cf/meta/llama-3.3-70b-instruct-fp8-fast") });

  // ⑪ OVHcloud AI Endpoints — free, low RPM. Key: OVH_AI_TOKEN
  const ovhKey = env("OVH_AI_TOKEN");
  if (ovhKey) slots.push({ provider: "OVHcloud", build: () => createOpenAICompatible({ name: "ovhcloud", baseURL: env("OVH_AI_BASE_URL") || "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1", headers: { Authorization: `Bearer ${ovhKey}` } })(env("OVH_AI_MODEL") || "Meta-Llama-3_3-70B-Instruct") });

  // ⑦ NVIDIA NIM — WIPED OUT of the rotator pool.
  // The Nemotron-3 550B is the strongest reasoner but is FAR too slow for
  // serverless: a single attempt can run ~50s and 504 the route (this is what
  // broke /api/blackbox and slowed /api/agents/investigate to 52s). It is
  // intentionally NOT a rotator slot — the fast providers above serve every call
  // in 2-8s. (Routes that explicitly want 550B streaming can still use the direct
  // getActiveNvidiaModel() path, which builds from env keys, not from SLOTS.)
  // To re-enable as a true last-resort, uncomment:
  // const nvidiaKeys = [env("NVIDIA_API_KEY"), env("NVIDIA_API_KEY_2"), env("NVIDIA_API_KEY_3"), env("NVIDIA_API_KEY_4"), env("NVIDIA_API_KEY_5")].filter(Boolean) as string[];
  // for (const key of nvidiaKeys) slots.push({ provider: "NVIDIA", build: () => createOpenAICompatible({ name: "nvidia-nim", baseURL: "https://integrate.api.nvidia.com/v1", headers: { Authorization: `Bearer ${key}` } })("nvidia/nemotron-3-ultra-550b-a55b") });

  // ── Demo-speed ordering ──────────────────────────────────────────────
  // Lead with the FASTEST proven providers so every rotator-backed AI endpoint
  // (blackbox, agents, islamic/*, sovo, nlp/arabic, live-deception, …) answers
  // in ~2-5s instead of waiting on a slow big-JSON first hop. Groq (llama-3.3-70b)
  // is the fastest + most reliable here; Cerebras is also very fast. GLM stays
  // near the lead (the user's preferred provider); Gemini + the rest trail as
  // quality/quota fallbacks. Array.sort is stable, so multi-key order within a
  // single provider is preserved.
  const SPEED_PRIORITY: Record<string, number> = {
    Groq: 0, Cerebras: 1, "GLM-CF": 2, Gemini: 3, Mistral: 4, Cohere: 5, NaraRouter: 6, SambaNova: 7, Together: 8, GitHubModels: 9, CloudflareAI: 10, OpenRouter: 11, OVHcloud: 12,
  };
  slots.sort((a, b) => (SPEED_PRIORITY[a.provider] ?? 50) - (SPEED_PRIORITY[b.provider] ?? 50));

  return slots;
}

const SLOTS = buildSlots();

// Defer the no-keys check to the first runtime call. Throwing at module-load
// time crashes `next build` on Vercel when env vars aren't set yet (the build
// only collects page data; it never actually calls the rotator).
// The runtime path below still fails LOUD per the One-Law when actually used.
if (SLOTS.length > 0) {
  console.log(`[MegaRotator v9] ✅ ${SLOTS.length} fast slots (NVIDIA-550B removed — too slow for serverless): ${SLOTS.map((s) => s.provider).join(", ")}`);
} else {
  console.warn("[MegaRotator v8] ⚠️ No API keys configured — calls will fail at request time with UNVERIFIED (One-Law: never fabricate). Set GEMINI_API_KEY / GROQ_API_KEY / etc. in Vercel env vars to enable AI features.");
}

// ── STATE ──
const cooldowns: Map<number, number> = new Map();
let activeSlot = 0;

function isRetryable(err: unknown): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msg = String((err as any)?.message ?? "") + JSON.stringify((err as any)?.data ?? "");
  return /429|503|RESOURCE_EXHAUSTED|quota|rate.limit|too many|high demand|try again|overloaded|capacity|exceeded|fetch failed|ECONNREF|timeout|unavailable/i.test(msg);
}

function extractWaitMs(err: unknown): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msg = String((err as any)?.message ?? "");
  const m = msg.match(/retry in ([\d.]+)s/i);
  if (m) return Math.ceil(parseFloat(m[1])) * 1000 + 1500;
  const h = msg.match(/retry-after:\s*(\d+)/i);
  if (h) return parseInt(h[1]) * 1000 + 1000;
  return 22_000;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function isAvailable(idx: number): boolean {
  return Date.now() >= (cooldowns.get(idx) ?? 0);
}

function setCooldown(idx: number, ms: number) {
  cooldowns.set(idx, Date.now() + ms);
}

// ── GENERIC ROTATION CORE — shared by object + text generation ──
// Per-attempt hard ceiling: abandon a single stalled slot instead of letting it
// hang the whole call. 15s comfortably covers a legitimate slow Gemini/Groq
// big-JSON answer (typically 3-8s) while dropping a truly-stuck slot fast so the
// rotator advances. (Lowered from 28s now that the deliberately-slow NVIDIA-550B
// slot is removed — there is no longer a slow slot worth waiting 28s for.)
const ATTEMPT_TIMEOUT_MS = 15_000;
// Hard wall-clock cap on an ENTIRE rotate() call (across every slot attempt AND
// the cooldown waits between them). Guarantees no rotator-backed endpoint can
// hang past ~22s even when many slots are simultaneously cooling down under
// load — the caller's catch/fallback then handles it fast instead of the route
// stalling toward a 45-60s 504.
const ROTATE_TOTAL_BUDGET_MS = 22_000;

async function rotate<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (model: any, slot: ProviderSlot) => Promise<T>,
  isUnsupported: (msg: string) => boolean = () => false,
): Promise<{ value: T; provider: string }> {
  const errors: string[] = [];
  let attempts = 0;
  const maxAttempts = SLOTS.length * 2;
  const startedAt = Date.now();

  while (attempts < maxAttempts) {
    if (Date.now() - startedAt > ROTATE_TOTAL_BUDGET_MS) {
      throw new Error(`[MegaRotator] total budget ${ROTATE_TOTAL_BUDGET_MS}ms exceeded. Errors: ${errors.join(" | ").slice(0, 400)}`);
    }
    attempts++;
    let nextIdx = -1;
    let shortestWait = Infinity;

    for (let i = 0; i < SLOTS.length; i++) {
      const idx = (activeSlot + i) % SLOTS.length;
      const remaining = (cooldowns.get(idx) ?? 0) - Date.now();
      if (remaining <= 0) { nextIdx = idx; shortestWait = 0; break; }
      if (remaining < shortestWait) { shortestWait = remaining; nextIdx = idx; }
    }

    if (nextIdx === -1) throw new Error("[MegaRotator] No slots available.");

    if (shortestWait > 0) {
      const budgetLeft = ROTATE_TOTAL_BUDGET_MS - (Date.now() - startedAt);
      if (shortestWait > budgetLeft) {
        throw new Error(`[MegaRotator] all slots cooling beyond the ${Math.ceil(ROTATE_TOTAL_BUDGET_MS / 1000)}s budget. Errors: ${errors.join(" | ").slice(0, 400)}`);
      }
      console.warn(`[MegaRotator] 🔄 waiting ${Math.ceil(shortestWait / 1000)}s for ${SLOTS[nextIdx].provider}...`);
      await sleep(shortestWait);
    }

    const slot = SLOTS[nextIdx];
    try {
      console.log(`[MegaRotator] → ${slot.provider} #${nextIdx + 1}/${SLOTS.length}`);
      const value = await run(slot.build(), slot);
      activeSlot = nextIdx;
      cooldowns.delete(nextIdx);
      console.log(`[MegaRotator] ✅ ${slot.provider} #${nextIdx + 1}`);
      return { value, provider: slot.provider };
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = String((err as any)?.message ?? "").slice(0, 200);
      errors.push(`${slot.provider}#${nextIdx + 1}: ${msg}`);
      if (isRetryable(err)) {
        setCooldown(nextIdx, extractWaitMs(err));
        console.warn(`[MegaRotator] ⚠️ ${slot.provider} #${nextIdx + 1} rate-limited`);
      } else if (isUnsupported(msg)) {
        // A slot failing STRUCTURED output (generateObject) still works fine for
        // TEXT (generateText). The old 10-min blanket cooldown poisoned the whole
        // rotator (e.g. a couple of whatsapp/paper-auditor structured calls cooled
        // Groq+Cerebras for 10 min, breaking every endpoint). 45s is enough to
        // skip it for the current structured burst without crippling text calls.
        setCooldown(nextIdx, 45_000);
        console.warn(`[MegaRotator] ⛔ ${slot.provider} #${nextIdx + 1} unsupported (structured) → 45s`);
      } else {
        setCooldown(nextIdx, 30_000);
        console.error(`[MegaRotator] ❌ ${slot.provider} #${nextIdx + 1}: ${msg}`);
      }
    }
  }

  throw new Error(`[MegaRotator] All ${SLOTS.length} slots failed. Errors: ${errors.join(" | ").slice(0, 500)}`);
}

// ── Helpers for the structured→text RESILIENCE FALLBACK ──
// Tolerant JSON extractor: strips code fences and slices the first {…last }.
function extractJsonObject(text: string): unknown {
  let t = (text || "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s >= 0 && e > s) t = t.slice(s, e + 1);
  return JSON.parse(t);
}

// Best-effort compact shape description from a Zod schema, so the text-mode
// fallback knows which keys/types to emit. NEVER throws — returns "" on any issue.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function zodShapeHint(schema: any, depth = 0): string {
  try {
    if (!schema || depth > 4) return '"value"';
    const def = schema._def;
    const tn = def?.typeName;
    switch (tn) {
      case "ZodObject": {
        const shape = typeof def.shape === "function" ? def.shape() : def.shape;
        const parts = Object.keys(shape).map((k) => `"${k}": ${zodShapeHint(shape[k], depth + 1)}`);
        return `{ ${parts.join(", ")} }`;
      }
      case "ZodArray": return `[ ${zodShapeHint(def.type, depth + 1)} ]`;
      case "ZodString": return def?.description ? `"${def.description}"` : `"string"`;
      case "ZodNumber": return `0`;
      case "ZodBoolean": return `true|false`;
      case "ZodEnum": return `"${(def.values || []).join("|")}"`;
      case "ZodOptional":
      case "ZodNullable":
      case "ZodDefault": return zodShapeHint(def.innerType, depth);
      case "ZodUnion": return (def.options || []).map((o: unknown) => zodShapeHint(o, depth + 1)).join(" | ");
      default: return def?.description ? `"${def.description}"` : `"value"`;
    }
  } catch { return '"value"'; }
}

// ── STRUCTURED OUTPUT (debunking classifier, etc.) ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function rotatingGenerateObject(args: Record<string, any>): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelName, ...rest } = args;
  try {
    const { value, provider } = await rotate(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (model) => (generateObject as any)({ ...rest, model, maxRetries: 0, abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) }),
      (msg) => /not support|json_schema|response_format|Unsupported|structured|tool_use|function|no object generated|did not match|match schema|invalid.*json/i.test(msg),
    );
    // Attach the answering slot's provider so callers can report it accurately
    // (the AI SDK's generateObject result object is extensible).
    if (value && typeof value === 'object') (value as Record<string, unknown>).provider = provider;
    return value;
  } catch (primaryErr) {
    // ── RESILIENCE FALLBACK ──
    // The structured slots are exhausted or can't do json_schema (e.g. only
    // Groq/llama left, or Gemini rate-limited). Re-run as PLAIN TEXT on ANY
    // provider and parse the JSON ourselves, so every structured endpoint
    // (8-layer-scan, firewall, council, sovo, decompose, blackbox, hadith, …)
    // stays up instead of 503-ing whenever the json_schema-capable slots are busy.
    try {
      const schema = rest.schema;
      const hint = zodShapeHint(schema);
      const sys =
        (rest.system ? rest.system + "\n\n" : "") +
        "OUTPUT FORMAT: return ONE valid JSON object and NOTHING else — no markdown, no code fences, no commentary." +
        (hint ? `\nThe JSON MUST match this exact shape:\n${hint}` : "");
      const prompt = String(rest.prompt ?? "") + "\n\nReturn the JSON object now.";
      const { text, provider } = await rotatingGenerateText({
        system: sys,
        prompt,
        temperature: typeof rest.temperature === "number" ? rest.temperature : 0.3,
        maxTokens: rest.maxTokens ?? rest.maxOutputTokens ?? 2000,
      });
      let parsed = extractJsonObject(text);
      if (schema && typeof schema.safeParse === "function") {
        const r = schema.safeParse(parsed);
        if (r.success) parsed = r.data; // else keep the lenient raw parse
      }
      return { object: parsed, provider: provider + "+text-fallback" };
    } catch {
      throw primaryErr; // preserve original failure semantics for the caller
    }
  }
}

// ── PLAIN TEXT (powers every chatbot via nvidiaFirstGenerate) ──
export async function rotatingGenerateText(
  args: { prompt: string; system?: string; temperature?: number; maxTokens?: number },
): Promise<{ text: string; provider: string; model: string }> {
  const { prompt, system, temperature, maxTokens } = args;
  const { value, provider } = await rotate(async (model) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { text } = await (generateText as any)({ model, prompt, system, temperature: temperature ?? 0.4, maxOutputTokens: maxTokens ?? 1200, maxTokens: maxTokens ?? 1200, maxRetries: 0, abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) });
    if (!text || !String(text).trim()) throw new Error("empty completion");
    return String(text);
  });
  return { text: value, provider, model: "rotator" };
}

// ── STREAMING MODEL (Gemini) ──
export function getActiveGeminiModel(modelName = "gemini-2.5-flash") {
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (isAvailable(idx) && SLOTS[idx].provider === "Gemini") {
      try { return SLOTS[idx].build(); } catch { continue; }
    }
  }
  const geminiSlot = SLOTS.find((s) => s.provider === "Gemini") || SLOTS[0];
  return geminiSlot.build();
}

export const TOTAL_KEY_COUNT = SLOTS.length;

// ── NVIDIA DIRECT STREAMING MODEL (only for routes that explicitly want 550B) ──
export function getActiveNvidiaModel(modelId = "nvidia/nemotron-3-ultra-550b-a55b") {
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (isAvailable(idx) && SLOTS[idx].provider === "NVIDIA") {
      try {
        return createOpenAICompatible({
          name: "nvidia-nim",
          baseURL: "https://integrate.api.nvidia.com/v1",
          headers: { Authorization: `Bearer ${nvidiaKeysRuntime()[0]}` },
        })(modelId);
      } catch { continue; }
    }
  }
  return getActiveGeminiModel();
}

function nvidiaKeysRuntime(): string[] {
  return [
    env("NVIDIA_API_KEY"), env("NVIDIA_API_KEY_2"), env("NVIDIA_API_KEY_3"),
    env("NVIDIA_API_KEY_4"), env("NVIDIA_API_KEY_5"),
  ].filter(Boolean) as string[];
}

// ── NVIDIA CONTENT SAFETY MODEL ──
export function getNvidiaContentSafetyModel() {
  const key = env("NVIDIA_API_KEY");
  if (!key) return null;
  return createOpenAICompatible({
    name: "nvidia-safety",
    baseURL: "https://integrate.api.nvidia.com/v1",
    headers: { Authorization: `Bearer ${key}` },
  })("nvidia/nemotron-3.5-content-safety");
}

// ── NVIDIA DEEPSEEK V4 FLASH (fast inference) ──
export function getNvidiaFastModel() {
  const key = env("NVIDIA_API_KEY");
  if (!key) return null;
  return createOpenAICompatible({
    name: "nvidia-fast",
    baseURL: "https://integrate.api.nvidia.com/v1",
    headers: { Authorization: `Bearer ${key}` },
  })("deepseek-ai/deepseek-v4-flash");
}
