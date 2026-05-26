# Handoff: Egyptian Domain Data Integrity Audit

**Context**: Addressing the "INTEGRITY VIOLATION" regarding the `DEFENSE_METHODS` array in `egy-data.ts`.

## 1. Observation
- Inspected `src/lib/debunking/egy-data.ts` (lines 70-89).
- The `DEFENSE_METHODS` array uses JavaScript's `Array.from({ length: X }).map()` to dynamically generate exactly 130 objects (44 Medical, 43 DeepReal, 43 Demographic).
- The objects generated are generic facades. For example, `name: "Medical Defense Tactic 1"`, `description: "Structured medical defense method 1 for Egyptian context."`.
- Inspected `src/types/keyhunter.ts` and `src/types/god-system.ts`; both contain correct Zod schemas and TypeScript types with no signs of data facades or missing structures.

## 2. Logic Chain
- The project requirement demands genuine, culturally-grounded domain data for the Egyptian context (130 `DEFENSE_METHODS`).
- Generating generic placeholder strings ("Tactic 1", "Tactic 2") bypasses the qualitative aspect of the requirement.
- The auditor rightfully flagged this as a "Facade detection" failure because the data is not meaningful.
- To resolve this, the dynamic loops must be completely removed. They must be replaced by a static array of exactly 130 explicitly typed objects. Each object needs a highly specific, genuine `name` and `description` that reflects actual Egyptian societal, medical, and demographic realities (e.g., debunking WhatsApp audio rumors, Ministry of Health verifications, sectarian tension mitigation).

## 3. Caveats
- Generating 130 high-quality, distinct, and culturally accurate entries in a single LLM output may hit context limits or lead to repetitive content.
- The implementer will need to strategically batch the generation or use a script/prompt that groups the methods into realistic sub-categories to ensure variety.
- `EGYPTIAN_CONTEXT_VECTORS`, `NEGATIVE_SCIENCE_CATEGORIES`, and `VERBAL_SCIENCE_LAYERS` in `egy-data.ts` are already explicitly defined and genuine; they do not need modification.

## 4. Conclusion
The integrity violation is confirmed. The `DEFENSE_METHODS` array is a placeholder facade. 

**Fix Strategy & Implementation Plan for the Implementer:**
1. **Remove Loops**: Delete the `Array.from` maps in `src/lib/debunking/egy-data.ts`.
2. **Hardcode 130 Entries**: Replace them with a hardcoded array of 130 unique objects:
   - **44 Medical Methods**: E.g., "WhatsApp Audio Panic Interception", "Ministry of Health Alert Cross-check", "Unlicensed TV Herbalist Verification", "Syndicate Registry Audit".
   - **43 DeepReal Methods**: E.g., "Dialect and Accent Inconsistency Detection", "Video Frame Reverse Search (Google Lens)", "AI Artifact Spotting in Historical Claims".
   - **43 Demographic Methods**: E.g., "Sectarian Trigger De-escalation", "Generational Subsidies Rumor Mapping", "Upper Egypt Stereotype Deconstruction".
3. **Execution**: The implementer should write a Python/Node script to construct the TypeScript file programmatically from a diverse set of text-based arrays, or carefully prompt an LLM to generate the full array in blocks to paste into the file.

## 5. Verification Method
- **Manual File Inspection**: Open `src/lib/debunking/egy-data.ts`. Verify that `Array.from` and `map` do not exist within `DEFENSE_METHODS`.
- **Content Check**: Spot-check 5 random entries in `DEFENSE_METHODS`. They must read like actual strategies (e.g., "Verifying medical claims against Egyptian Medical Syndicate records") rather than "Tactic 34".
- **Length Check**: Write a short test or use a REPL to confirm `DEFENSE_METHODS.length === 130`.
- **Type Check**: Run `npx tsc --noEmit` to ensure the new array strictly conforms to the `DefenseMethod[]` schema.
