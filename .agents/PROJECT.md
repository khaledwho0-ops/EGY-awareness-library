# Project: The Angry Debunkers

## Architecture
- `src/lib/debunking/egy-data.ts`: Domain data for EGYPTIAN_CONTEXT_VECTORS, NEGATIVE_SCIENCE_CATEGORIES, VERBAL_SCIENCE_LAYERS, and DEFENSE_METHODS.
- `src/types/keyhunter.ts`, `src/types/god-system.ts`: Strong typing (Zod schemas and TS types) for the domain data.
- `src/lib/debunking/classifier.ts`: Maps claims to Context Vectors.
- `src/lib/debunking/workers/`: Worker Swarm logic using `Promise.allSettled`.
- `src/app/api/defense/angry-debunkers/route.ts`: API endpoint applying God-System No-Mercy Protocol.
- `src/app/angry-debunkers/page.tsx`: UI with Framer Motion, 7-Layer visualizer, Threat Analysis Dashboard.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Domain Data | `egy-data.ts`, `keyhunter.ts`, `god-system.ts` | none | DONE |
| 2 | Backend Orchestrator | Upgrade classifier.ts, api-swarm.ts, preflight.ts, route.ts | M1 | DONE |
| 3 | God-System API | `route.ts` | M1, M2 | IN_PROGRESS |
| 4 | UI/UX Visionary | `page.tsx` | M3 | DONE |

## Interface Contracts
### API ↔ UI
- `route.ts` responds with JSON containing `egyptian_vector_hit`, `negative_science_violation`, `god_system_7_layer_audit`, and `truth_sandwich`.

## Code Layout
- Follows Next.js App Router conventions.
