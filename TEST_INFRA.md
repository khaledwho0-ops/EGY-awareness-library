# E2E Test Infra: The Angry Debunkers

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Claim Submission & API Response | ORIGINAL_REQUEST R3 | 5      | 5      | ?      |
| 2 | Loading Visualizer (7-Layer) | ORIGINAL_REQUEST R4 | 5      | 5      | ?      |
| 3 | Threat Analysis Dashboard UI | ORIGINAL_REQUEST R4 | 5      | 5      | ?      |
| 4 | Citations (Reference Pills) UI | ORIGINAL_REQUEST R4 | 5      | 5      | ?      |

## Test Architecture
- Test runner: Playwright (for Next.js frontend/backend E2E testing).
- Invocation: `npx playwright test`
- Pass/Fail semantics: Exit code 0 means all tests passed.
- Directory layout: `tests/e2e/` at the root of the project.
- Test case format: Playwright `.spec.ts` files interacting with the frontend and mocking/intercepting APIs where necessary for predictable testing, though true E2E should test the full stack if possible.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | User submits a widely circulated medical rumor, sees 7-layer animation, and receives detailed Threat Analysis and citations. | F1, F2, F3, F4 | High |
| 2 | User submits empty claim, expecting validation error or graceful rejection. | F1 | Low |
| 3 | User submits very long text (copypasta), testing boundary limits and UI scrolling. | F1, F3 | Medium |
| 4 | User submits claim triggering specific Edge-case Negative Science Category and verifies UI renders tags properly. | F1, F3, F4 | Medium |
| 5 | Application gracefully handles API timeout or API failure during debunking process. | F1, F2 | Medium |

## Coverage Thresholds
- Tier 1: >=5 per feature
- Tier 2: >=5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: >=5 realistic application scenarios

