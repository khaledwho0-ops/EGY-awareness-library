# Handoff Report: Angry Debunkers API Upgrade

## 1. Observation
- The file `src/app/api/defense/angry-debunkers/route.ts` currently uses a simple `prompt` for `generateObject` with an incomplete context definition.
- It does not instruct the AI about the "No-Mercy Protocol" or cross-referencing against the 13 Negative Science Categories, and it does not explicitly enforce outputs mapped to the Egyptian Context Vector.
- The `SynthesisOutputSchema` only requires `confidence_score`, `logical_fallacy_detected`, `egyptian_contextual_mapping`, and `truth_sandwich_ar`. 
- The 13 Negative Science Categories (`NEGATIVE_SCIENCE_CATEGORIES`) and Egyptian Context Vectors (`EGYPTIAN_CONTEXT_VECTORS`) are exported from `src/lib/debunking/egy-data.ts`.
- The 7-layer GOD-System audit layers are found in `src/lib/debunking/god-system.ts`.

## 2. Logic Chain
- To implement the No-Mercy Protocol and enforce cross-referencing against the 13 Negative Science Categories, the `generateObject` call must be updated to include a strong `system` prompt that specifically demands this behavior.
- The system prompt should explicitly require the LLM to output responses targeting the identified Egyptian Context Vector (which is passed in via `preflight.vector`).
- The Zod schema (`SynthesisOutputSchema`) must be expanded to include `egyptian_vector_hit` and `negative_science_violation`. Since these are defined as const arrays in `egy-data.ts`, we can import them and use `z.enum()`.
- The schema also needs `god_system_7_layer_audit` to capture the 7 layers of the GOD system.
- The schema must also be updated to require `truth_sandwich` as requested. We can keep `truth_sandwich_ar` as optional for backward compatibility.

## 3. Caveats
- Renaming or strictly replacing `truth_sandwich_ar` with `truth_sandwich` in the schema might break existing frontend components that expect `truth_sandwich_ar`. I suggest including both or making the old one optional.

## 4. Conclusion
The worker should:
1. Import `NEGATIVE_SCIENCE_CATEGORIES` and `EGYPTIAN_CONTEXT_VECTORS` from `@/lib/debunking/egy-data` in `route.ts`.
2. Expand `SynthesisOutputSchema` to explicitly require `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
3. Update the `generateObject` parameters in `route.ts` to include a `system` prompt injecting the "No-Mercy Protocol," demanding cross-referencing against the 13 Negative Science Categories, and targeting the Egyptian Context Vector.

## 5. Verification Method
- **Code Inspection:** Check that `route.ts` imports the correct enums and expands the Zod schema.
- **Build:** Run the build or typecheck command (e.g., `npm run build`) to ensure no TypeScript errors from the new Zod schema.
- **Execution:** Send a POST request to `/api/defense/angry-debunkers` with a dummy query and verify the JSON response contains the new keys (`egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, `truth_sandwich`).

---

## Recommended Implementation Strategy

### 1. Update Imports in `src/app/api/defense/angry-debunkers/route.ts`
```typescript
import { NextResponse } from "next/server";
import { runPreflight } from "@/lib/debunking/preflight";
import { executeApiSwarm } from "@/lib/debunking/workers/api-swarm";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { NEGATIVE_SCIENCE_CATEGORIES, EGYPTIAN_CONTEXT_VECTORS } from "@/lib/debunking/egy-data";
```

### 2. Expand `SynthesisOutputSchema`
```typescript
const SynthesisOutputSchema = z.object({
  confidence_score: z.number().min(0).max(100),
  logical_fallacy_detected: z.string(),
  egyptian_contextual_mapping: z.string(),
  egyptian_vector_hit: z.enum(EGYPTIAN_CONTEXT_VECTORS),
  negative_science_violation: z.enum(NEGATIVE_SCIENCE_CATEGORIES),
  god_system_7_layer_audit: z.object({
    layer_1_emotion_strip: z.string(),
    layer_2_provenance_audit: z.string(),
    layer_3_incentive_map: z.string(),
    layer_4_methodological_destruction: z.string(),
    layer_5_fallacy_execution: z.string(),
    layer_6_truth_sandwich: z.string(),
    layer_7_forward_defense: z.string()
  }),
  truth_sandwich: z.object({
    fact_1: z.string(),
    myth: z.string(),
    fact_2: z.string(),
  }),
  truth_sandwich_ar: z.object({
    fact_1: z.string(),
    myth: z.string(),
    fact_2: z.string(),
  }).optional()
});
```

### 3. Update the `generateObject` Call
Inject the No-Mercy Protocol and the 13 Negative Science Categories into the `system` instruction, and simplify the user `prompt`:

```typescript
    const { object: synthesisResult } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: SynthesisOutputSchema,
      system: \`You are "The Angry Debunker" (العلم يقاتل - Science Fights Back), an elite Egyptian scientist operating under the "No-Mercy Protocol."
Your mission is to crush misinformation using empirical data while maintaining deep empathy for the Egyptian public.
You must explicitly cross-reference the worker data against the 13 Negative Science Categories to detect scientific fraud.
Your output must target the identified Egyptian Context Vector to ensure cultural resonance.
Execute the GOD-System 7-Layer Audit to systematically dismantle the falsehood.\`,
      prompt: \`Claim: "\${query}"
Context Vector: "\${preflight.vector}"

Worker Data (Citations & Evaluations):
\${citationsText}

Generate the synthesis response adhering strictly to the expanded schema. Provide a detailed 7-Layer GOD-System Audit and a structured Truth Sandwich.\`
    });
```
