# Analysis and Implementation Plan: Milestone 1 (Domain Data)

**Core Objective:** Complete Milestone 1 by extracting domain data and Zod schemas into their respective files (`egy-data.ts`, `keyhunter.ts`, `god-system.ts`) and defining the 130 `DEFENSE_METHODS`.

## 1. Observation
- `src/lib/debunking/egy-data.ts` currently exists and defines exactly 23 `EGYPTIAN_CONTEXT_VECTORS`, 13 `NEGATIVE_SCIENCE_CATEGORIES`, and 5 `VERBAL_SCIENCE_LAYERS`. However, it mixes Zod schemas (`EgyptianContextVectorSchema`, `GodSystemAuditSchema`, etc.) directly with the data. It entirely lacks the 130 `DEFENSE_METHODS`.
- `src/types/god-system.ts` does NOT exist. Instead, God-System types (like `Layer1Result`, `GODSystemResult`, etc.) are heavily entangled with business logic in `src/lib/debunking/god-system.ts`.
- `src/types/keyhunter.ts` exists and currently defines `KeyHunterEntrySchema` and `KEYHUNTER_LAYERS`, which appear reasonably well-typed, but its integration with the overarching God-System domain typing can be polished.

## 2. Logic Chain
1. **Separation of Concerns:** To align with `PROJECT.md`'s architecture, we must separate pure domain data from TypeScript/Zod schema definitions. `egy-data.ts` should ONLY export constant data arrays (`as const`).
2. **Missing Domain Data:** The 130 `DEFENSE_METHODS` must be added to `egy-data.ts`. Since this specific 130-item list doesn't currently exist in the repository, the implementer will need to generate or stub 130 valid methods, categorizing them into Medical, DeepReal, and Demographic types (approx. 43 per category).
3. **Typing Architecture:** `src/types/god-system.ts` needs to be created. It should import the `as const` arrays from `egy-data.ts` to define dynamic Zod enums (e.g., `z.enum(EGYPTIAN_CONTEXT_VECTORS)`). Furthermore, God-System related interfaces (`Layer1Result`, `ThreatDomain`, `EmotionalTrigger`) must be extracted from `src/lib/debunking/god-system.ts` and moved into `src/types/god-system.ts`.
4. **Integration:** `src/types/keyhunter.ts` should be validated against the new God-System types to ensure that data structures do not overlap or conflict.

## 3. Caveats
- **Content of Defense Methods:** The precise text for all 130 `DEFENSE_METHODS` is missing. The implementer must generate domain-accurate stubs (e.g., using AI generation) or extract them from an external specification if one is provided later.
- **Refactoring Scope:** Moving types out of `src/lib/debunking/god-system.ts` will break imports in files currently referencing them (e.g., `classifier.ts`, `workers/`, and API routes). The implementation plan must include updating these imports.

## 4. Conclusion
Milestone 1 is partially established but structurally flawed according to the strict typing requirements. The implementation strategy is:
1. **Refactor `src/lib/debunking/egy-data.ts`** to strip out all `zod` schemas and append the `DEFENSE_METHODS` array.
2. **Create `src/types/god-system.ts`**, define the Zod schemas utilizing the data from `egy-data.ts`, and migrate all runtime types from `src/lib/debunking/god-system.ts` to this new file.
3. **Update imports** across the application (specifically within `god-system.ts` logic and API routes) to point to the new type definition locations.

## 5. Verification Method
- **File Output:** Inspect `src/lib/debunking/egy-data.ts` to confirm it ONLY exports arrays and `DEFENSE_METHODS.length === 130`. Inspect `src/types/god-system.ts` for the Zod schemas.
- **Build/Type Check:** Run `npx tsc --noEmit` from the project root. The build must pass without any missing type or schema errors, confirming that all dependencies on `src/lib/debunking/god-system.ts`'s types have been successfully updated.
