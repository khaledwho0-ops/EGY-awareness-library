# E2E Test Suite Plan for The Angry Debunkers

## 1. Observation
- `TEST_INFRA.md` specifies 4 key features to test: Claim Submission, Loading Visualizer, Threat Analysis Dashboard, and Citations UI. Coverage is required across 4 Tiers (Tier 1: >=5 per feature, Tier 2: >=5 boundary cases, Tier 3: pairwise interactions, Tier 4: >=5 real-world scenarios).
- `package.json` contains `@playwright/test` (v1.59.1) in `devDependencies`.
- `playwright.config.ts` exists in the root directory and is properly configured to run tests from `./tests/e2e` with a `baseURL` of `http://127.0.0.1:3000`.

## 2. Logic Chain
- Since Playwright is already installed and configured, no setup changes are required in `package.json` or `playwright.config.ts`.
- The test design follows an opaque-box, requirement-driven methodology utilizing Category-Partition, BVA, Pairwise, and Workload Testing.

### Proposed Test Cases Plan:

**Tier 1: Core Functional Testing (5 cases per feature)**
- *F1 (Claim Submission)*: 1. Valid standard claim. 2. Valid short claim. 3. Empty claim validation. 4. Valid long claim. 5. Mixed language/special characters claim.
- *F2 (Visualizer)*: 1. Appears immediately on submit. 2. Displays sequential steps. 3. Hides completely upon API completion. 4. Handles extremely fast API response cleanly. 5. Replaced by error UI on API failure.
- *F3 (Threat Dashboard)*: 1. Dashboard appears post-response. 2. Displays `egyptian_vector_hit` tag. 3. Displays `negative_science_violation` tag. 4. Features explicitly required copy (e.g. "العلم يقاتل — Science Fights Back"). 5. Responsive layout does not overflow horizontally.
- *F4 (Citations UI)*: 1. Rendered as pill elements. 2. Hover states trigger visually. 3. Click interaction verified (if applicable). 4. Wraps correctly for multiple pills. 5. Gracefully handles responses with zero citations.

**Tier 2: Boundary Value Analysis (5 cases per feature)**
- *F1*: Exactly max allowed characters, 1 character over max allowed (expect error/truncation), 1 character total, whitespace-only submission, double-click submission deduplication.
- *F2*: 0ms API response time, exactly 8000ms response time, 8001ms (timeout error expected), network disconnect mid-animation, animation steps lagging behind API response.
- *F3*: Extremely long vector tag (100+ chars wrapping), missing optional API fields (`truth_sandwich`), empty tag strings, tags with HTML/XSS payloads, 320px mobile viewport width.
- *F4*: Exactly 1 citation, max expected citations (e.g., 20) rendering cleanly, extremely long citation URL string, malformed citation API object, citation without a valid URL.

**Tier 3: Pairwise Interaction Testing**
- *P1*: Arabic Medical Claim / Desktop / Success (End-to-End visualizer to dashboard)
- *P2*: Arabic Demographic Claim / Mobile / API Error (Visualizer to error state on small screen)
- *P3*: English Demographic Claim / Mobile / Success (Responsive dashboard checks)
- *P4*: English Medical Claim / Desktop / Timeout Error (8000ms boundary interaction)
- *P5*: Cross-interaction: Resizing viewport (Desktop <-> Mobile) while visualizer is actively running.

**Tier 4: Real-World Scenarios**
- *S1*: User submits a widely circulated medical rumor, sees 7-layer animation, and receives detailed Threat Analysis and citations.
- *S2*: User submits empty claim, expecting validation error or graceful rejection.
- *S3*: User submits very long text (copypasta), testing boundary limits and UI scrolling.
- *S4*: User submits claim triggering specific Edge-case Negative Science Category and verifies UI renders tags properly.
- *S5*: Application gracefully handles API timeout or API failure during debunking process.

## 3. Caveats
- No caveats regarding Playwright installation as it is fully set up.
- API requests in E2E tests may need to be mocked (`page.route()`) to reliably test Tier 2 boundary conditions (like exactly 8000ms timeouts or malformed JSON) without relying on live LLM responses.

## 4. Conclusion
Playwright is fully installed and configured. A comprehensive 4-tier test plan has been mapped out based strictly on the opaque-box requirements in `TEST_INFRA.md`. E2E development can immediately proceed by writing these specific Playwright `.spec.ts` files in the `tests/e2e/` directory.

## 5. Verification Method
- **Check Playwright Setup**: View `package.json` for `@playwright/test` and view `playwright.config.ts`.
- **Verify Test Plan Validity**: Cross-reference the proposed scenarios with `TEST_INFRA.md` Feature Inventory and Coverage Thresholds.
