## Consensus
- `src/lib/debunking/egy-data.ts` currently exists but is missing the 130 `DEFENSE_METHODS`.
- The God-System validation schemas inside `egy-data.ts` have only 5 layers, while the actual system has 7.
- `src/types/god-system.ts` needs to be created to hold the 7-layer strict Zod schemas and their TS types.
- `src/types/keyhunter.ts` is already fully typed.

## Implementation Plan
1. **Modify `src/lib/debunking/egy-data.ts`**:
   - Keep existing `EGYPTIAN_CONTEXT_VECTORS`, `NEGATIVE_SCIENCE_CATEGORIES`, and `VERBAL_SCIENCE_LAYERS`.
   - Remove `GodSystemLayerSchema` and `GodSystemAuditSchema` (move to `src/types/god-system.ts`).
   - Define categories (Medical, DeepReal, Demographic) and create/export a `DEFENSE_METHODS` array populated with exactly 130 structured defense tactics.
2. **Create `src/types/god-system.ts`**:
   - Define strict Zod validation schemas for the API boundaries.
   - Expand `GodSystemAuditSchema` to 7 layers (Emotion Strip, Provenance Audit, Incentive Map, Methodological Destruction, Fallacy Execution, Truth Sandwich, Forward Defense).
   - Export inferred TS types.
3. **Verify `src/types/keyhunter.ts`**:
   - Ensure it exports its types correctly.
