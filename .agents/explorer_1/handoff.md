# Handoff Report: Backend Orchestrator Implementation Plan

## Observation
- Read `src/lib/debunking/egy-data.ts`, `src/types/keyhunter.ts`, and `src/types/god-system.ts` to understand domain types (`EgyptianContextVector`).
- Read `src/lib/debunking/preflight.ts`, which currently classifies threats into 4 generic categories (`MEDICAL`, `RELIGIOUS`, `MEDIA_DEEPFAKE`, `OSINT_PANIC`) via `classifyThreat`.
- Verified that `src/lib/debunking/classifier.ts` does not currently exist.
- Verified that `src/lib/debunking/workers/api-swarm.ts` does not currently exist. 
- Found `src/lib/debunking/workers/hive-mind.ts`, which already uses `Promise.allSettled` and an 8000ms timeout wrap.
- Found `src/app/api/defense/angry-debunkers/route.ts` which orchestrates `preflight` and `hive-mind`.

## Logic Chain
1. **Upgrading classification (`classifier.ts`)**: Since `preflight.ts` uses generic domains, we must create `src/lib/debunking/classifier.ts`. This file will import `EGYPTIAN_CONTEXT_VECTORS` and `EgyptianContextVector` from `egy-data.ts`. It will export a new function (e.g., `classifyContextVector(claim: string)`) that utilizes keyword heuristics and/or an LLM call to accurately map a user's claim directly to one of the 23 specific vectors (e.g., `"WhatsApp Family Medical Panic"`).
2. **Wiring the Worker Swarm (`api-swarm.ts`)**: Since `api-swarm.ts` doesn't exist, we must create it inside `src/lib/debunking/workers/`. To fulfill the requirements without overwriting existing fetchers, we will define it as the new parallel orchestration module. It must:
   - Declare the Edge runtime: `export const runtime = 'edge';`
   - Implement an 8000ms timeout wrapper (e.g., `Promise.race` with a setTimeout).
   - Group fetchers (like open source APIs) into parallel clusters utilizing `Promise.allSettled` to prevent sequential bottlenecks.
   - It will serve as the upgraded swarm executor alongside or replacing `hive-mind.ts` usages.

## Caveats
- `api-swarm.ts` fetchers will need to be stubbed or migrated from `hive-mind.ts` without destructive overwriting.
- The `classifier.ts` logic will need to gracefully fallback if an LLM is not available in the edge runtime, likely relying on a robust regex or keyword matching map covering all 23 domains.
- We have not investigated the UI integration of this new context vector, which is part of M4 (UI/UX Visionary).

## Conclusion
- Create `src/lib/debunking/classifier.ts` with a function that maps raw strings to `EgyptianContextVector` using a heuristic/keyword lookup based on `EGYPTIAN_CONTEXT_VECTORS`.
- Create `src/lib/debunking/workers/api-swarm.ts` containing `export const runtime = "edge";`, an 8000ms `withTimeout` utility, and a `runSwarmClusters` function that triggers fetch calls wrapped in `Promise.allSettled`. 

## Verification Method
1. Create both files.
2. Run the Next.js build or `tsc --noEmit` to ensure type safety with `EgyptianContextVector`.
3. Verify the 8000ms timeout and `Promise.allSettled` usage by running `grep "Promise.allSettled" src/lib/debunking/workers/api-swarm.ts` and `grep "runtime" src/lib/debunking/workers/api-swarm.ts`.
