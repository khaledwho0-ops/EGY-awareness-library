# Investigation Report: Schema Collision & 4-Field Requirement

## 1. Observation
- `src/app/api/defense/angry-debunkers/route.ts` defines `SynthesisOutputSchema` (Lines 17-27) with **5 root fields**: `confidence_score`, `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
- `src/types/god-system.ts` defines `GodSystemAuditSchema` (Lines 12-20) which contains a layer named `truth_sandwich`. This causes a **schema naming collision** with the root-level `truth_sandwich` field.
- The prompt explicitly requires "EXACTLY 4 fields" at the root of `SynthesisOutputSchema`.
- `src/app/angry-debunkers/page.tsx` (Lines 262, 268) depends on `result.data.confidence_score` from the API response to render the confidence UI.
- `src/app/angry-debunkers/page.tsx` (Lines 326, 332, 338) depends on `result.data.truth_sandwich` containing `fact_1`, `myth`, and `fact_2` for the truth sandwich UI.

## 2. Logic Chain
1. To satisfy the prompt's strict 4-field constraint, we must remove `confidence_score` from the `SynthesisOutputSchema` root, leaving exactly: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
2. Removing `confidence_score` from the LLM output schema means we must compute it on the server side to avoid breaking the frontend UI in `page.tsx`.
3. We can compute `confidence_score` in `route.ts` by averaging the `confidence` scores of the 7 layers returned within `god_system_7_layer_audit` before sending the `NextResponse`.
4. To fix the naming collision that confuses the LLM (where `truth_sandwich` is both an object at the root and a GodSystemLayer), we must rename `truth_sandwich` inside `GodSystemAuditSchema` to something distinct, such as `truth_sandwich_layer`. This requires updating `src/types/god-system.ts`.
5. The frontend `GOD_SYSTEM_LAYERS` in `page.tsx` is just a list of static strings and does not depend on the exact JSON keys of the audit schema, so renaming the key in `god-system.ts` is perfectly safe.

## 3. Caveats
- No caveats. The proposed changes fully resolve the schema collision and strict 4-field requirement without requiring modifications to `page.tsx` (the frontend contract is preserved).

## 4. Conclusion
**Recommended Implementation Strategy for the Worker:**

1. **Update `src/types/god-system.ts`**:
   - Rename the `truth_sandwich` field to `truth_sandwich_layer` inside `GodSystemAuditSchema` to remove the naming collision.

2. **Update `src/app/api/defense/angry-debunkers/route.ts`**:
   - Remove `confidence_score` from `SynthesisOutputSchema`. Ensure only the exact 4 required fields are listed: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
   - After `generateObject` successfully returns `synthesisResult`, calculate the `confidence_score` dynamically by averaging the `confidence` values from `synthesisResult.god_system_7_layer_audit`.
   - Add the calculated `confidence_score` to the `data` object in `NextResponse.json` so the frontend continues to receive it.
   - (Optional but recommended) Update the system prompt string slightly to refer to "the truth_sandwich_layer" instead of "truth_sandwich" when mentioning the 7 layers, to further guide the LLM.

## 5. Verification Method
- **Static Schema Check**: Open `src/app/api/defense/angry-debunkers/route.ts` and count the root fields in `SynthesisOutputSchema`. There must be exactly 4.
- **Collision Check**: Open `src/types/god-system.ts` and verify `truth_sandwich` is NO LONGER a field name inside `GodSystemAuditSchema`.
- **Frontend Contract Check**: Confirm that `NextResponse.json` in `route.ts` still includes `confidence_score: <calculated_number>` in its `data` payload.
- **Build/Test**: Run `npm run build` or the local dev server and trigger the API endpoint to verify it does not error and successfully returns the calculated `confidence_score` and `truth_sandwich`.
