# Handoff Report: Angry Debunkers Route Upgrade

## 1. Observation
- The target file `src/app/api/defense/angry-debunkers/route.ts` currently defines `SynthesisOutputSchema` as:
  ```typescript
  const SynthesisOutputSchema = z.object({
    confidence_score: z.number().min(0).max(100),
    logical_fallacy_detected: z.string(),
    egyptian_contextual_mapping: z.string(),
    truth_sandwich_ar: z.object({
      fact_1: z.string(),
      myth: z.string(),
      fact_2: z.string(),
    })
  });
  ```
- The prompt sent to `gpt-4o-mini` is mild (`"You are the Egyptian Scientist. Maintain the 12-point synthesis constraints. Use Truth Sandwich."`) and lacks the required No-Mercy Protocol and explicit category cross-referencing.
- The project already defines strict domain types in:
  - `src/lib/debunking/egy-data.ts`: `EgyptianContextVectorSchema` and `NegativeScienceCategorySchema`.
  - `src/types/god-system.ts`: `GodSystemAuditSchema` (which contains exactly the 7 required audit layers).

## 2. Logic Chain
1. **Schema Expansion**: To explicitly require the requested fields, `SynthesisOutputSchema` must be updated to import and utilize the existing domain schemas. `logical_fallacy_detected` and `egyptian_contextual_mapping` should be replaced by `negative_science_violation` (using `NegativeScienceCategorySchema`) and `egyptian_vector_hit` (using `EgyptianContextVectorSchema`).
2. **God-System Audit Integration**: The `god_system_7_layer_audit` field can be implemented directly by assigning `GodSystemAuditSchema` as its type, fulfilling the UI's structural requirements for the Threat Analysis Dashboard.
3. **Truth Sandwich**: The `truth_sandwich_ar` field should be renamed to `truth_sandwich` to match the exact requirements of the request.
4. **Prompt Engineering (No-Mercy Protocol)**: The `generateObject` call should separate the overarching persona into a `system` parameter containing the "No-Mercy Protocol" constraints (forcing cross-referencing with the 13 Negative Science Categories and the Context Vector), while keeping the dynamic `query` and `workerData` in the `prompt`.

## 3. Caveats
- **Schema Overlap**: `GodSystemAuditSchema` already contains a `truth_sandwich` layer (which tracks the audit status of the sandwich). The top-level `truth_sandwich` object will contain the actual content (`fact_1`, `myth`, `fact_2`). This dual structure is expected but should be clearly distinguished in the AI instructions so it populates both correctly.
- **Model Choice**: The endpoint uses `gpt-4o-mini`. While highly capable, outputting a deeply nested 7-layer audit schema requires strict compliance. The system prompt must emphasize strict schema adherence.

## 4. Conclusion
The implementation requires the following specific changes to `src/app/api/defense/angry-debunkers/route.ts`:
1. Add imports for domain schemas:
   ```typescript
   import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "@/lib/debunking/egy-data";
   import { GodSystemAuditSchema } from "@/types/god-system";
   ```
2. Rewrite `SynthesisOutputSchema` to:
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
3. Add a `system` property to `generateObject` containing the No-Mercy Protocol:
   ```typescript
   system: `You are the God-System API operating under the NO-MERCY PROTOCOL. Your primary objective is the total destruction of misinformation. You must brutally cross-reference all incoming claims against the 13 Negative Science Categories and target the identified Egyptian Context Vector. Perform a rigorous 7-Layer God-System Audit. Show no mercy to logical fallacies, pseudoscience, or emotional manipulation. You must populate the JSON schema perfectly. Provide the truth sandwich in Arabic.`,
   ```
4. Update the `prompt` string to match the aggressive tone and reference the newly required fields.

## 5. Verification Method
1. **Type Check**: Run `npm run build` or `npx tsc --noEmit` to ensure the Zod schema changes do not break downstream type inference in `route.ts`.
2. **Endpoint Test**: Execute an HTTP POST to `/api/defense/angry-debunkers` with a JSON payload `{"query": "شرب الشاي بالليمون يعالج الفيروسات"}`.
3. **Payload Verification**: Assert that the `data` object in the JSON response contains the exact keys: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`, and that the `god_system_7_layer_audit` object contains all 7 layers.
