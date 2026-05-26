/**
 * EAL Multi-Provider AI Engine
 * 
 * Smart fallback system: Gemini → Groq → GitHub → HuggingFace
 * Each provider has a specific strength, and the system
 * automatically falls to the next if one fails or rate-limits.
 */

import { EAL_KNOWLEDGE_SHORT } from './eal-knowledge';

// ── Provider Interfaces ──
interface AIResponse {
  text: string;
  provider: string;
  model: string;
  latencyMs: number;
}

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// ── Provider 1: Google Gemini (Best quality, 1500 req/day) ──
async function callGemini(messages: AIMessage[]): Promise<AIResponse> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");

  const start = Date.now();
  const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return { text, provider: "Google Gemini", model: "gemini-2.0-flash", latencyMs: Date.now() - start };
}

// ── Provider 2: Groq (Fastest inference, 14400 req/day) ──
async function callGroq(messages: AIMessage[]): Promise<AIResponse> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY not set");

  const start = Date.now();
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();

  return {
    text: data.choices?.[0]?.message?.content || "",
    provider: "Groq",
    model: "llama-3.3-70b",
    latencyMs: Date.now() - start,
  };
}

// ── Provider 3: GitHub Models (150 req/day, GPT-4o-mini) ──
async function callGitHub(messages: AIMessage[]): Promise<AIResponse> {
  const key = process.env.GITHUB_TOKEN;
  if (!key) throw new Error("GITHUB_TOKEN not set");

  const start = Date.now();
  const res = await fetch("https://models.inference.ai.azure.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens: 2048 }),
  });

  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  const data = await res.json();

  return {
    text: data.choices?.[0]?.message?.content || "",
    provider: "GitHub Models",
    model: "gpt-4o-mini",
    latencyMs: Date.now() - start,
  };
}

// ── Provider 4: HuggingFace (Sentiment specialization) ──
async function callHuggingFace(messages: AIMessage[]): Promise<AIResponse> {
  const key = process.env.HF_TOKEN;
  if (!key) throw new Error("HF_TOKEN not set");

  const start = Date.now();
  const prompt = messages.map(m => m.content).join("\n");

  const res = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 512 } }),
    }
  );

  if (!res.ok) throw new Error(`HF ${res.status}: ${await res.text()}`);
  const data = await res.json();

  return {
    text: Array.isArray(data) ? data[0]?.generated_text || "" : String(data),
    provider: "HuggingFace",
    model: "Mistral-7B",
    latencyMs: Date.now() - start,
  };
}

// ── Sentiment Analysis (HuggingFace specialized) ──
export async function analyzeSentiment(text: string): Promise<{ label: string; score: number } | null> {
  const key = process.env.HF_TOKEN;
  if (!key) return null;

  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: text }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const top = data?.[0]?.[0];
    return top ? { label: top.label, score: top.score } : null;
  } catch {
    return null;
  }
}

// ── Translation AR↔EN (HuggingFace specialized) ──
export async function translateText(text: string, direction: "en-ar" | "ar-en"): Promise<string | null> {
  const key = process.env.HF_TOKEN;
  if (!key) return null;

  const model = direction === "en-ar"
    ? "Helsinki-NLP/opus-mt-en-ar"
    : "Helsinki-NLP/opus-mt-ar-en";

  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: text }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.translation_text || null;
  } catch {
    return null;
  }
}

// ── MAIN: Smart Multi-Provider Generation with Fallback ──
export async function aiGenerate(
  prompt: string,
  systemPrompt?: string,
): Promise<AIResponse> {
  const messages: AIMessage[] = [];

  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  // Ordered by quality → speed → availability
  const providers = [
    { name: "Gemini", fn: () => callGemini(messages) },
    { name: "Groq", fn: () => callGroq(messages) },
    { name: "GitHub", fn: () => callGitHub(messages) },
    { name: "HuggingFace", fn: () => callHuggingFace(messages) },
  ];

  const errors: string[] = [];

  for (const provider of providers) {
    try {
      const result = await provider.fn();
      if (result.text.trim()) return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${provider.name}: ${msg}`);
      console.warn(`[AI] ${provider.name} failed:`, msg);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join("\n")}`);
}

// ── EAL-Specific: Claim Analysis ──
export async function analyzeClaimWithAI(claim: string): Promise<AIResponse> {
  return aiGenerate(claim, `You are a misinformation analyst for the Egyptian Awareness Library (EAL).

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

Analyze the following claim and respond in a CLEAR, READABLE format (NOT JSON). Use this structure:

## 🔍 Verdict: [TRUE / FALSE / MISLEADING / UNVERIFIED]
**Confidence:** [0-100]%

### 📋 Analysis
[Explain why this claim is true, false, or misleading. Be specific and cite evidence.]

### 🚩 Red Flags Detected
- [List any manipulation techniques, logical fallacies, or deceptive patterns found]

### 🧠 Cognitive Biases at Play
- [List cognitive biases that make people believe this claim, e.g., confirmation bias, appeal to authority]

### ✅ Recommended Action
[What should the user do? Verify with specific sources, cross-check, etc.]

RULES:
1. Respond in the SAME LANGUAGE as the claim (Arabic → Arabic, English → English).
2. For Egyptian Arabic claims, respond in Egyptian Arabic.
3. Be specific — don't give vague answers.
4. When relevant, reference Egyptian context, local institutions, or regional fact-checkers.
5. If the claim is about health, reference WHO or Egyptian Ministry of Health.
6. If the claim is about religion, be respectful and reference scholarly consensus.
7. Always encourage critical thinking using SIFT method (Stop, Investigate, Find, Trace).`);
}

// ── EAL-Specific: Mental Health Response ──
export async function mentalHealthAI(userMessage: string): Promise<AIResponse> {
  return aiGenerate(userMessage, `You are a compassionate mental health literacy assistant for the Egyptian Awareness Library (EAL).

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

IMPORTANT BOUNDARIES:
- You are NOT a therapist, psychiatrist, or counselor.
- You provide psychoeducation (تثقيف نفسي) and encourage professional help-seeking.
- NEVER diagnose, prescribe, or provide clinical advice.

CRISIS RESOURCES (include when user seems distressed):
- Egyptian Mental Health Hotline: 08008880700 (free, 24/7)
- Befrienders Egypt: 0220816831
- Ain Shams University Psychological Clinic
- Egyptian Association for Psychological Studies

RESPONSE GUIDELINES:
1. Respond in the SAME LANGUAGE as the user (Arabic → Arabic, English → English).
2. For Egyptian Arabic, respond in warm, accessible Egyptian dialect.
3. Always validate feelings first before providing information.
4. Structure responses clearly:
   - 💚 Acknowledgment of the user's feelings
   - 📖 Educational information about the topic
   - 🛠️ Practical coping techniques (evidence-based)
   - 📞 Professional resources when appropriate
5. Reference evidence-based frameworks:
   - CBT-based coping strategies
   - Mindfulness and grounding techniques
   - The Mental Health Literacy Scale (MHLS) framework
   - Stress-vulnerability model
6. Be culturally sensitive to Egyptian/Arab context:
   - Acknowledge the role of family and community support
   - Be respectful of religious coping (both positive and negative)
   - Address stigma around mental health in Egyptian society
7. For self-harm or suicidal ideation: IMMEDIATELY provide crisis hotline numbers and encourage calling.
8. Keep responses warm, structured, and actionable — not clinical or cold.`);
}
