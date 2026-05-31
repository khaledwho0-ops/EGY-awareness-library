# Project: Egyptian Awareness Library
# Scope: Web Platform Build

## Architecture
- **Frontend**: Next.js App Router (`src/app`), React, Tailwind CSS. Dark Luxury / Bento Grid aesthetic.
- **Core Modules**: DeepReal (`src/app/deepreal`), Mental Health (`src/app/mental-health`), Religion Hub (`src/app/religion-hub`), Dashboard (`src/app/dashboard`), Assessments (`src/app/assessment`).
- **Backend Swarm Integration**: Connects frontend to `src/lib/debunking/workers/api-swarm.ts` and `src/lib/debunking/classifier.ts`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | UI and Navigation | Layouts, Bento Grid aesthetics, routing between DeepReal, Mental Health, Religion Hub, Dashboard, Assessments | none | IN_PROGRESS |
| 2 | KeyHunter UI | Dedicated UI component for KeyHunter 7-layer vocabulary system (`src/components/KeyHunterUI.tsx`) | none | IN_PROGRESS |
| 3 | MVP Core Modules | UI and state management for DeepReal, Mental Health, Religion Hub (daily exercises, scenarios) | M1 | PLANNED |
| 4 | API Swarm Integration | Update `api-swarm.ts` with AbortController `withTimeout`, update `classifier.ts` with try/catch. Hook up frontend to API, handle timeouts/fallback | none | IN_PROGRESS |
| 5 | Assessments & Dashboard | Implement MIST-20, MHLS, Brief RCOPE flows, 14-day completion dashboard | M1 | PLANNED |

## Interface Contracts
### Frontend ↔ API Swarm
- Frontend makes requests to an API route (e.g. `/api/debunking/swarm`) passing user input.
- API route calls `classifier.ts` and `api-swarm.ts`.
- Response handles timeouts, returning fallback `"State Stability & Economic Rumors"` if API fails or lacks keys.
- `withTimeout` must abort fetch if taking too long (e.g., 8000ms).

## Code Layout
- `src/app/*`: Next.js pages and routing.
- `src/components/*`: Reusable UI components.
- `src/lib/debunking/workers/api-swarm.ts`: Swarm logic.
- `src/lib/debunking/classifier.ts`: Classifier logic.
