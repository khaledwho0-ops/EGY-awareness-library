# Observation

- **File `src/app/api/defense/angry-debunkers/route.ts`:**
  - `SynthesisOutputSchema` defines 5 fields: `confidence_score`, `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
  - The API prompt asks the LLM to populate this schema but passes conflicting references.
- **File `src/types/god-system.ts`:**
  - `GodSystemAuditSchema` defines a 7-layer audit, including a field exactly named `truth_sandwich` mapped to `GodSystemLayerSchema`.
- **File `src/app/angry-debunkers/page.tsx`:**
  - Line 262 and 268 explicitly expect `result.data.confidence_score` to render the UI confidence circle.

# Logic Chain

1. **The Collision:** The exact key `truth_sandwich` exists both at the root of `SynthesisOutputSchema` (as `{ fact_1, myth, fact_2 }`) and inside `GodSystemAuditSchema` (as `{ layer_name, audit_result, confidence, passed }`). This duplicate key with conflicting types severely degrades LLM strict-JSON generation, causing Zod parse errors.
2. **The 4-Field Requirement:** The user explicitly requires `SynthesisOutputSchema` to have exactly 4 fields (`egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`), suggesting `confidence_score` must be removed from the LLM schema.
3. **The UI Dependency:** Because the UI (`page.tsx`) explicitly references `result.data.confidence_score`, completely omitting it from the API response will break the visual percentage display.
4. **The Resolution:**
   - To fix the collision, the nested `truth_sandwich` inside `GodSystemAuditSchema` must be renamed to `truth_sandwich_layer`.
   - To enforce exactly 4 fields, `confidence_score` must be removed from `SynthesisOutputSchema`.
   - To prevent breaking the UI, `confidence_score` must be calculated dynamically on the server from the average of the 7 audit layers' `.confidence` values before sending the JSON response.

# Caveats

- Renaming the layer inside `GodSystemAuditSchema` implies the LLM might need a small prompt hint to realize the 6th layer is now `truth_sandwich_layer` while the root object is the actual `truth_sandwich`.

# Conclusion

**Implementation Strategy for the Worker:**

1. **In `src/types/god-system.ts`:**
   Rename the `truth_sandwich` key to `truth_sandwich_layer`:
   ```typescript
   export const GodSystemAuditSchema = z.object({
     emotion_strip: GodSystemLayerSchema,
     provenance_audit: GodSystemLayerSchema,
     incentive_map: GodSystemLayerSchema,
     methodological_destruction: GodSystemLayerSchema,
     fallacy_execution: GodSystemLayerSchema,
     truth_sandwich_layer: GodSystemLayerSchema, // renamed
     forward_defense: GodSystemLayerSchema
   });
   ```

2. **In `src/app/api/defense/angry-debunkers/route.ts`:**
   - Remove `confidence_score` from `SynthesisOutputSchema`. The schema should only have 4 fields: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.
   - Update the prompt to clarify the naming: `"Perform a rigorous 7-Layer God-System Audit (where the 6th layer is 'truth_sandwich_layer'). Provide the actual truth sandwich in Arabic in the root 'truth_sandwich' object."`
   - Calculate the confidence score in the `POST` function before returning:
   ```typescript
   const auditLayers = Object.values(synthesisResult.god_system_7_layer_audit);
   const calculatedConfidence = auditLayers.length > 0 
     ? Math.round(auditLayers.reduce((acc, layer) => acc + layer.confidence, 0) / auditLayers.length) 
     : 0;

   return NextResponse.json({
     type: "SYNTHESIS_COMPLETE",
     data: {
       ...synthesisResult,
       confidence_score: calculatedConfidence,
       citations: workerData.map(w => ({ title: w.title, url: w.citationUrl }))
     }
   });
   ```

# Verification Method

- Run `npm run build` or the local dev server.
- Submit a query to the `angry-debunkers` API endpoint.
- Verify that Zod correctly parses the 4-field response from the LLM.
- Verify that the frontend UI still displays the confidence percentage properly because the API injected `confidence_score` into the response data.
