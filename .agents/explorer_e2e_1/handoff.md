# Handoff Report: E2E Test Suite Plan for The Angry Debunkers

## 1. Observation
- **Playwright Installation**: Playwright is already installed in `package.json` (`"@playwright/test": "^1.59.1"`).
- **Playwright Config**: `playwright.config.ts` exists at the project root, configured with `testDir: "./tests/e2e"`, a `30_000` ms timeout, and `baseURL: "http://127.0.0.1:3000"`.
- **Existing Tests**: There is an existing test file (`tests/e2e/critical-flows.spec.ts`), but no specific test suite for `The Angry Debunkers`.
- **Requirements**: `TEST_INFRA.md` defines a 4-Tier coverage strategy (Tier 1: Base, Tier 2: Boundary, Tier 3: Pairwise, Tier 4: Real-world Scenarios). `ORIGINAL_REQUEST.md` defines 4 specific feature targets: API/Submission, 7-Layer Visualizer, Threat Analysis Dashboard, and Citations UI.

## 2. Logic Chain
Since the Playwright infrastructure is already present and fully configured, we do not need to modify `package.json` or `playwright.config.ts`. The implementation phase only requires writing the actual test scripts.

To meet the requirement-driven, opaque-box philosophy, the tests must focus strictly on input/output and DOM validation, mocking the API using Playwright's `page.route()` where necessary to ensure consistent boundary testing and avoid breaking external APIs.

### Proposed Architecture & File Structure
Create a new file: `tests/e2e/angry-debunkers.spec.ts`. The file will use nested `test.describe()` blocks mapped to the Tiers and Features.

### Test Case Design (Tiers 1-4)

**Tier 1: Base Functionality (>= 5 per feature)**
- *F1 (Claim Submission)*
  1. Submit valid text -> UI shows loading state.
  2. Submit valid text -> API call is made to `/api/defense/angry-debunkers`.
  3. Submit valid text -> Renders success state.
  4. Validate `egyptian_vector_hit` exists in mocked API response.
  5. Form resets/allows subsequent submissions after completion.
- *F2 (Loading Visualizer)*
  1. 7-Layer Visualizer mounts immediately upon form submission.
  2. Visualizer text updates/sequences correctly (e.g., "1. Stripping Emotion...").
  3. Visualizer contains framer-motion elements.
  4. Visualizer unmounts cleanly once API responds.
  5. Visualizer is centered on the screen.
- *F3 (Threat Analysis Dashboard)*
  1. Dashboard renders only after a successful API response.
  2. Dashboard displays the localized `egyptian_vector_hit` tag.
  3. Dashboard displays the `negative_science_violation` warning.
  4. Glassmorphism styling classes are applied to the dashboard container.
  5. UI Copy explicitly shows "The Angry Debunkers" and subtitle text.
- *F4 (Citations UI)*
  1. Citations render as interactive pills.
  2. Pill count matches the number of citations in the API response.
  3. Hover state triggers a visible interaction/change.
  4. Clicking a pill opens the reference.
  5. Citations render correctly within or alongside the `truth_sandwich`.

**Tier 2: Boundary & Edge Cases (>= 5 per feature)**
- *F1 (Submission)*: Submit empty claim -> expect validation error; Submit >5000 chars -> truncation or graceful handling; Special character injection -> safe execution.
- *F2 (Visualizer)*: High network latency -> Visualizer continues to animate without breaking; Immediate network failure -> Visualizer aborts and shows error.
- *F3 (Threat Dashboard)*: Very long `egyptian_vector_hit` string -> text wraps cleanly; Null violation -> handles empty state gracefully.
- *F4 (Citations)*: 0 citations returned -> container hides or shows empty state; 20+ citations -> proper flex wrapping; Broken URL -> graceful fallback.

**Tier 3: Pairwise Interactions**
1. *Large Payload (F1) + High Latency (F2)*: Visualizer sustains animation for >8000ms.
2. *Edge-Case Category (F1) + Threat Dashboard (F3)*: Verifies the UI dynamically injects rare `NEGATIVE_SCIENCE_CATEGORIES` tags correctly.
3. *Threat Dashboard (F3) + Citations (F4)*: Verifies layout responsiveness on small viewports so they do not overlap.
4. *API Error (F1) + Visualizer (F2)*: Verifies visualizer aborts and dashboard does NOT render.

**Tier 4: Real-World Scenarios**
*(As strictly defined in `TEST_INFRA.md`)*
1. Submit widely circulated medical rumor -> Verify 7-layer animation -> Verify full Threat Analysis and citations render.
2. Submit empty claim -> Expect validation error or graceful rejection (No API call).
3. Submit very long text (copypasta) -> Verify boundary limits and vertical UI scrolling.
4. Submit claim triggering specific Edge-case Negative Science Category -> Verify UI renders tags properly.
5. Mock API timeout/failure -> Verify application gracefully handles failure during the debunking process.

## 3. Caveats
- Since the visualizer relies on Framer Motion animations, exact DOM assertions on intermediate animation frames may be flaky in Playwright. We recommend asserting on visibility and text content changes, or disabling animations in the test context if flakiness occurs.
- The 8000ms API SLA should ideally be tested via a direct API request (`request.post`) rather than relying purely on UI latency.

## 4. Conclusion
Playwright is fully installed and ready to go. No infrastructure setup is required. The implementation should focus entirely on writing `tests/e2e/angry-debunkers.spec.ts` using the detailed case plan above, mocking the backend with `page.route` to ensure robust Tier 1-4 coverage. 

## 5. Verification Method
- **To Verify**: The implementer will write the test file.
- **Command**: Run `npx playwright test tests/e2e/angry-debunkers.spec.ts` to execute the suite. Exit code 0 confirms all tiers pass.
