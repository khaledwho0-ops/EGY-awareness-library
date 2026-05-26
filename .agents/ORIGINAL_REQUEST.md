# Original User Request

## Initial Request — 2026-05-24T20:57:25Z

Build the ultimate version of "The Angry Debunkers" (العلم يقاتل), a No-Mercy Protocol fact-checking engine integrating a 7-Layer God-System, 13 Negative Science Categories, and 23 Egyptian Context Vectors, backed by parallel API execution and a premium Vercel-tier Egyptian-localized UI.

Working directory: C:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library
Integrity mode: development

## Requirements

### R1. The Domain Data Awakening (Micro-Data Injection)
Create `src/lib/debunking/egy-data.ts`, `src/types/keyhunter.ts`, and `src/types/god-system.ts`. Define strict Zod schemas and export TypeScript arrays for 23 `EGYPTIAN_CONTEXT_VECTORS`, 13 `NEGATIVE_SCIENCE_CATEGORIES`, 5 `VERBAL_SCIENCE_LAYERS`, and 130 `DEFENSE_METHODS` (Medical, DeepReal, Demographic). 

### R2. The Backend Orchestrator (Classifier & Hive-Mind)
Upgrade `src/lib/debunking/classifier.ts` to map the user's claim to an exact `EgyptianContextVector` instead of a generic category. Wire the Worker Swarm (`src/lib/debunking/workers/`) to use `Promise.allSettled` parallel clusters, retaining the 8000ms timeouts and Edge runtime. Do not overwrite existing `api-swarm.ts` fetchers.

### R3. The God-System Synthesizer
Upgrade `src/app/api/defense/angry-debunkers/route.ts`. Inject the No-Mercy Protocol into the LLM system instructions, forcing it to cross-reference data against the 13 Negative Science Categories and output targeting the identified Egyptian Context Vector. Expand the structured JSON output schema to explicitly require: `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.

### R4. The UI/UX Visionary
Upgrade `src/app/angry-debunkers/page.tsx` to include deep glassmorphism, background color grading, geometric objects, and micro-interactions. Implement a Framer Motion 7-Layer Visualizer that shows the God-System executing in real-time (e.g., "1. Stripping Emotion..."). Add a "Threat Analysis Dashboard" above the final output to display the localized `egyptian_vector_hit` tag and `negative_science_violation` warning. Convert citations into hoverable, interactive reference pills.
**UI Copy Override**: Ensure the UI explicitly features the title `The Angry Debunkers` and subtitle `العلم يقاتل — Science Fights Back`, along with the description: `Paste ANY claim. We'll hit 10 scientific databases simultaneously. PubMed. Hadith Verification. Fact-checkers. Arabic NLP. No claim survives real evidence.` Include 10 distinct UI/UX features, geometric background objects, and smooth animations.

## Acceptance Criteria

### Domain Data
- [ ] `egy-data.ts` exports valid arrays/Zod schemas for Context Vectors (23 items) and Negative Science Categories (13 items).
- [ ] `keyhunter.ts` and `god-system.ts` exist and contain no surface-level/generic `any` types.

### API Logic
- [ ] `classifier.ts` successfully resolves a rumor to a specific `EgyptianContextVector` string.
- [ ] `route.ts` successfully returns the expanded JSON schema containing `egyptian_vector_hit` and `god_system_7_layer_audit`.
- [ ] Swarm execution uses `Promise.allSettled` and completes within the 8000ms SLA without bottlenecking.

### UI/UX
- [ ] `angry-debunkers/page.tsx` renders the new 7-Layer Visualizer animation during the loading phase.
- [ ] The final results dashboard explicitly renders the Threat Analysis tags (Context Vector + Violation).
- [ ] Layout remains perfectly centered and responsive (no regression to the left-squashed layout).
