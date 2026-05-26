# Observation

**Files Examined:**
1. `src/types/god-system.ts`
   - Defines `GodSystemLayerSchema` with fields `{ layer_name, audit_result, confidence, passed }`.
   - Defines `GodSystemAuditSchema` which includes 7 layers, one of them being `truth_sandwich: GodSystemLayerSchema` (line 18).

2. `src/app/api/defense/angry-debunkers/route.ts`
   - Defines `SynthesisOutputSchema` (lines 17-27) with 5 fields:
     1. `confidence_score`
     2. `egyptian_vector_hit`
     3. `negative_science_violation`
     4. `god_system_7_layer_audit`
     5. `truth_sandwich: z.object({ fact_1, myth, fact_2 })`

3. `src/app/angry-debunkers/page.tsx`
   - Uses `result.data.confidence_score` to render a confidence ring (lines 262-268).
   - Uses `result.data.truth_sandwich` to render facts and myth (lines 322-339).
   - The 7 layers are rendered statically via a `GOD_SYSTEM_LAYERS` string array, not from `god_system_7_layer_audit` backend data.

**The Error:**
The LLM schema `SynthesisOutputSchema` contains 5 fields instead of exactly 4. Additionally, `truth_sandwich` exists as a 3-property object at the root of `SynthesisOutputSchema` AND as a `GodSystemLayerSchema` object within `GodSystemAuditSchema`. This collision of the name `truth_sandwich` with completely different structures causes LLM confusion and Zod validation failures.

# Logic Chain

1. **Fixing the Schema Collision:**
   To maintain `truth_sandwich` at the root (as required by the prompt and frontend UI), we must rename the conflicting layer inside `GodSystemAuditSchema`.
   - **Action:** Rename `truth_sandwich` in `src/types/god-system.ts` to `semantic_replacement` (or `truth_sandwich_layer`). This completely removes the name collision while keeping the 7-layer audit intact.

2. **Reducing Root Fields to Exactly 4:**
   The root schema must contain exactly: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`. 
   - **Action:** Remove `confidence_score` from `SynthesisOutputSchema`.

3. **Preventing Frontend Breakage:**
   The frontend `page.tsx` directly relies on `result.data.confidence_score`. If we stop the LLM from generating it, the UI ring will break.
   - **Action:** Since every layer in `god_system_7_layer_audit` has a `confidence: number` property, we can dynamically compute `confidence_score` in `route.ts` by averaging the confidence of the 7 layers and injecting it into the response `data` object before sending it to the client.

# Caveats
- Renaming the layer to `semantic_replacement` means the LLM will generate that key instead of `truth_sandwich` for the 6th layer. This is safe because the UI does not dynamically read the keys of `god_system_7_layer_audit`.

# Conclusion
The Worker should implement the following strategy:
1. In `src/types/god-system.ts`, rename `truth_sandwich` to `semantic_replacement` within `GodSystemAuditSchema`.
2. In `src/app/api/defense/angry-debunkers/route.ts`, remove `confidence_score` from `SynthesisOutputSchema` so it has exactly 4 root fields.
3. In `src/app/api/defense/angry-debunkers/route.ts`, right after generating `synthesisResult`, calculate `confidence_score` as the mathematical average of the `confidence` from the 7 layers inside `synthesisResult.god_system_7_layer_audit` (using `Math.round`).
4. Inject this calculated `confidence_score` into the returned `NextResponse.json(...)` payload so the frontend continues to work seamlessly.

# Verification Method
- **Static Check:** Verify `SynthesisOutputSchema` in `route.ts` has exactly 4 fields.
- **Type Check:** Run `npm run type-check` or `tsc --noEmit` to ensure renaming `truth_sandwich` to `semantic_replacement` in `GodSystemAuditSchema` doesn't break any typings.
- **Runtime Check:** Make a POST request to `/api/defense/angry-debunkers` with a dummy payload and verify that `confidence_score` is present in the response and the LLM successfully parses exactly 4 root schema fields without collision errors.
