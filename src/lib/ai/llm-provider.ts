/**
 * UNIFIED LLM PROVIDER — Q88
 * LiteLLM-style abstraction for rapid switching between Claude/OpenAI/Llama
 * Ensures site reliability if one provider crashes during defense
 * 
 * Framework: §23.1 — Unified LLM settings via LiteLLM
 */

export type LLMProvider = 'claude' | 'openai' | 'llama' | 'fallback';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiEndpoint: string;
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
  isAvailable: boolean;
}

// Provider configurations — switch by changing active provider
const PROVIDER_CONFIGS: Record<LLMProvider, LLMConfig> = {
  claude: {
    provider: 'claude',
    model: 'claude-sonnet-4-20250514',
    apiEndpoint: '/api/llm/claude',
    maxTokens: 4096,
    temperature: 0.3,
    systemPrompt: 'You are an educational assistant for the Egyptian Awareness Library. You provide evidence-based information only. Never diagnose, never issue fatwas, never provide medical advice.',
    isAvailable: true,
  },
  openai: {
    provider: 'openai',
    model: 'gpt-4o',
    apiEndpoint: '/api/llm/openai',
    maxTokens: 4096,
    temperature: 0.3,
    systemPrompt: 'You are an educational assistant for the Egyptian Awareness Library. You provide evidence-based information only. Never diagnose, never issue fatwas, never provide medical advice.',
    isAvailable: true,
  },
  llama: {
    provider: 'llama',
    model: 'llama-3.1-70b',
    apiEndpoint: '/api/llm/llama',
    maxTokens: 4096,
    temperature: 0.3,
    systemPrompt: 'You are an educational assistant for the Egyptian Awareness Library. You provide evidence-based information only. Never diagnose, never issue fatwas, never provide medical advice.',
    isAvailable: true,
  },
  fallback: {
    provider: 'fallback',
    model: 'static-responses',
    apiEndpoint: '',
    maxTokens: 0,
    temperature: 0,
    systemPrompt: '',
    isAvailable: true, // Always available — uses cached/static responses
  },
};

/**
 * Get the currently active provider
 * Falls back through the chain: primary → secondary → tertiary → static
 */
export function getActiveProvider(): LLMConfig {
  const priority: LLMProvider[] = ['claude', 'openai', 'llama', 'fallback'];

  // Check user preference
  try {
    const preferred = localStorage.getItem('llm_provider') as LLMProvider | null;
    if (preferred && PROVIDER_CONFIGS[preferred]?.isAvailable) {
      return PROVIDER_CONFIGS[preferred];
    }
  } catch { /* silent */ }

  // Auto-select first available
  for (const p of priority) {
    if (PROVIDER_CONFIGS[p].isAvailable) return PROVIDER_CONFIGS[p];
  }

  return PROVIDER_CONFIGS.fallback;
}

/**
 * Set the preferred provider
 */
export function setPreferredProvider(provider: LLMProvider): void {
  try {
    localStorage.setItem('llm_provider', provider);
  } catch { /* silent */ }
}

/**
 * Mark a provider as unavailable (auto-failover)
 */
export function markProviderUnavailable(provider: LLMProvider): void {
  PROVIDER_CONFIGS[provider].isAvailable = false;
  console.warn(`[LiteLLM] Provider ${provider} marked unavailable. Failover active.`);
}

/**
 * Send a prompt to the active provider
 * With automatic failover on error
 */
export async function sendPrompt(
  userMessage: string,
  mvp: 'deepreal' | 'mental-health' | 'religion-hub'
): Promise<{ response: string; provider: LLMProvider; model: string }> {
  const config = getActiveProvider();

  if (config.provider === 'fallback') {
    return {
      response: getStaticFallbackResponse(userMessage, mvp),
      provider: 'fallback',
      model: 'static-responses',
    };
  }

  try {
    const res = await fetch(config.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: config.systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      response: data.response || data.choices?.[0]?.message?.content || 'No response',
      provider: config.provider,
      model: config.model,
    };
  } catch (err) {
    console.error(`[LiteLLM] ${config.provider} failed:`, err);
    markProviderUnavailable(config.provider);
    // Recursive failover
    return sendPrompt(userMessage, mvp);
  }
}

/**
 * Static fallback responses when all APIs are down
 * Ensures defense-day reliability
 */
function getStaticFallbackResponse(message: string, mvp: string): string {
  const responses: Record<string, string> = {
    deepreal: 'This claim requires verification. Apply the SIFT method: Stop, Investigate the source, Find better coverage, and Trace the original claim. Check our Trusted Sources directory for reliable references.',
    'mental-health': 'Mental health awareness is about understanding, not diagnosis. If you or someone you know needs support in Egypt, use 16328 first, 08008880700 as the published hotline backup, or 123 for emergency escalation. This platform provides education only.',
    'religion-hub': 'This topic relates to the psychology of religion and positive coping strategies. For theological guidance, consult a qualified religious scholar. This platform focuses on evidence-based psychological perspectives only.',
  };
  return responses[mvp] || responses.deepreal;
}

/**
 * Get all provider statuses for admin dashboard
 */
export function getProviderStatuses(): Array<{
  provider: LLMProvider;
  model: string;
  available: boolean;
}> {
  return Object.values(PROVIDER_CONFIGS).map(c => ({
    provider: c.provider,
    model: c.model,
    available: c.isAvailable,
  }));
}
