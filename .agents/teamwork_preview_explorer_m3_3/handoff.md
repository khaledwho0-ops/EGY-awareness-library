# Handoff Report: God-System API Upgrade

## Observation
- `src/app/api/defense/angry-debunkers/route.ts` (lines 10-19): `SynthesisOutputSchema` currently outputs `confidence_score`, `logical_fallacy_detected`, `egyptian_contextual_mapping`, and `truth_sandwich_ar`.
- `src/app/api/defense/angry-debunkers/route.ts` (lines 53-60): The LLM `prompt` uses basic instructions: *"You are the Egyptian Scientist. Maintain the 12-point synthesis constraints. Use Truth Sandwich."*
- `src/lib/debunking/egy-data.ts` (lines 3-27, 29-43, 53-56): Defines the 13 Negative Science Categories in `NegativeScienceCategorySchema` and the Context Vectors in `EgyptianContextVectorSchema`.
- `src/types/god-system.ts` (lines 12-20): Defines the 7-layer structure in `GodSystemAuditSchema`.
- `.agents/PROJECT.md` (lines 19-21): Interface contract requires the API to respond with `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.

## Logic Chain
1. **Prompt Injection**: The objective requires injecting the "No-Mercy Protocol", cross-referencing against the "13 Negative Science Categories", and targeting the "Egyptian Context Vector". Modifying the LLM `prompt` text in `route.ts` to explicitly include these commands satisfies this.
2. **Schema Expansion**: The objective requires replacing the current schema keys with `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
3. **Type Safety**: To type these new fields robustly and enforce the constraint, we must import `EgyptianContextVectorSchema` and `NegativeScienceCategorySchema` from `@/lib/debunking/egy-data`, and `GodSystemAuditSchema` from `@/types/god-system`.
4. **Integration**: Updating `SynthesisOutputSchema` to incorporate these Zod schemas will enforce the exact God-System API output contract required by Milestone 3.

## Caveats
- The schema update renames/replaces old keys (e.g., `truth_sandwich_ar` to `truth_sandwich`, `logical_fallacy_detected` to `negative_science_violation`). The Worker must ensure the frontend UI (`src/app/angry-debunkers/page.tsx`) correctly anticipates these new keys or update it accordingly.
- The `gpt-4o-mini` model will generate a complex nested object for `god_system_7_layer_audit`. Ensure the prompt is explicit enough for the model to adhere to the nested structure, though `generateObject` and Zod normally handle this well.

## Conclusion
To fulfill the M3 API requirements, the Implementer should:

1. **Add Imports** in `src/app/api/defense/angry-debunkers/route.ts`:
   ```typescript
   import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "@/lib/debunking/egy-data";
   import { GodSystemAuditSchema } from "@/types/god-system";
   ```

2. **Update `SynthesisOutputSchema`**:
   ```typescript
   const SynthesisOutputSchema = z.object({
     confidence_score: z.number().min(0).max(100),
     egyptian_vector_hit: EgyptianContextVectorSchema,
     negative_science_violation: NegativeScienceCategorySchema,
     god_system_7_layer_audit: GodSystemAuditSchema,
     truth_sandwich: z.object({
       fact_1: z.string(),
       myth: z.string(),
       fact_2: z.string(),
     })
   });
   ```

3. **Update the Prompt**:
   Rewrite the prompt inside the `generateObject` call to:
   ```typescript
   prompt: \`You are the Egyptian Scientist executing the No-Mercy Protocol. Maintain the 12-point synthesis constraints.
   Cross-reference the provided data against the 13 Negative Science Categories to expose methodological flaws or fallacies.
   Target your output specifically to address the identified Egyptian Context Vector: "\${preflight.vector}".
   Perform a rigorous God-System 7-Layer Audit.
   Construct a Truth Sandwich (Fact, Myth, Fact) for the final output.

   Claim: "\${query}"
   Context Vector: "\${preflight.vector}"

   Worker Data (Citations & Evaluations):
   \${citationsText}

   Generate the synthesis response adhering strictly to the structured schema.\`
   ```

## Verification Method
1. **Compilation**: Run the Next.js build command to verify Zod typing correctly integrates without type errors.
2. **API Testing**: Send a test POST request to `/api/defense/angry-debunkers` with a JSON payload `{"query": "dummy claim"}`.
3. **Output Inspection**: Verify the JSON response strictly contains the newly defined fields: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit` (with its 7 nested properties), and `truth_sandwich`.
