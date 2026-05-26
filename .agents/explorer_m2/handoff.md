# Handoff Report: M2 Backend Orchestrator Analysis

## 1. Observation
- `src/lib/debunking/classifier.ts` does NOT exist.
- `src/lib/debunking/workers/api-swarm.ts` does NOT exist.
- `src/lib/debunking/workers/hive-mind.ts` exists and implements `Promise.allSettled` with an 8000ms timeout wrapper (`withTimeout`), but it uses `NodeJS.Timeout` which is incompatible with the Edge runtime.
- Domain data in `src/lib/debunking/egy-data.ts` defines `EGYPTIAN_CONTEXT_VECTORS` containing 23 specific vectors (e.g., `"WhatsApp Family Medical Panic"`, `"Religious/Fatwa Manipulation"`).
- Current threat classification logic (`classifyThreat` in `src/lib/debunking/preflight.ts`) maps only to generic domains (`MEDICAL`, `RELIGIOUS`, `OSINT_PANIC`, `MEDIA_DEEPFAKE`), rather than the required granular vectors.

## 2. Logic Chain
1. Since `classifier.ts` does not exist, it must be created. The implementation must include a function (e.g., `classifyEgyptianContext(claim: string): EgyptianContextVector`) that matches the user's claim against the 23 exact `EGYPTIAN_CONTEXT_VECTORS` from `egy-data.ts`.
2. Since `api-swarm.ts` does not exist, it must be created inside `src/lib/debunking/workers/`.
3. To meet the "Worker Swarm" requirement, `api-swarm.ts` must export a swarm orchestrator function that utilizes `Promise.allSettled` to run parallel fetcher clusters (e.g., Medical Team, OSINT Team).
4. The requested 8000ms timeouts must be implemented using `Promise.race`, but to retain "Edge runtime" compatibility, the timeout ID must be typed as `ReturnType<typeof setTimeout>` or simply `number` instead of `NodeJS.Timeout` (which breaks in Edge environments).
5. The prompt instructs not to overwrite existing fetchers. As `api-swarm.ts` is new, we will stub out the swarm architecture and fetchers, leaving the implementation open to migrate from `hive-mind.ts` or add new logic without overriding existing API fetch logics elsewhere.

## 3. Caveats
- No existing `api-swarm.ts` fetchers were found to "not overwrite" because the file was absent. New fetchers should be added or migrated from `hive-mind.ts` without destructive writes.
- The precise mechanism for `classifier.ts` (whether keyword-based regex or an LLM API call) is deferred to the implementer; it only needs to return a valid `EgyptianContextVector`.
- Edge runtime enforcement requires adding `export const runtime = 'edge';` if this logic is moved into a Next.js Route Handler (`route.ts`), or just ensuring Edge-compatible primitives are used in the library files.

## 4. Conclusion
- **Implement `src/lib/debunking/classifier.ts`**: Create the `classifyEgyptianContext` function. Import `EgyptianContextVector` and `EGYPTIAN_CONTEXT_VECTORS` from `egy-data.ts` and return exact vector matches based on claim heuristics.
- **Implement `src/lib/debunking/workers/api-swarm.ts`**: Create the parallel cluster orchestrator. Implement `Promise.allSettled([...fetchers])`. Add an Edge-safe timeout wrapper (`ms = 8000`). Integrate fetchers cleanly.

## 5. Verification Method
- **Verify Classifier**: Run `npx tsc` to ensure `classifier.ts` correctly types its return value as `EgyptianContextVector`. Inspect the code to ensure it imports from `egy-data.ts`.
- **Verify Swarm**: Inspect `api-swarm.ts` for the presence of `Promise.allSettled`. Ensure no `NodeJS.Timeout` typing is used in the timeout wrapper to guarantee Edge runtime safety. Run the Next.js dev server or test suite (e.g. `npm run build`) to ensure there are no compilation errors in the Edge environment.
