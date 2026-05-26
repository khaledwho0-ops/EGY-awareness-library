# Handoff Report: E2E Test Suite Plan for The Angry Debunkers

## 1. Observation
- `package.json` contains `"@playwright/test": "^1.59.1"` in `devDependencies`.
- `playwright.config.ts` exists in the root directory configured with `testDir: "./tests/e2e"` and a `baseURL` of `http://127.0.0.1:3000`.
- The `tests/e2e` directory exists and contains `critical-flows.spec.ts` (for other features like DeepReal).
- `TEST_INFRA.md` requires Opaque-box, requirement-driven tests covering 4 features (Claim Submission, Loading Visualizer, Threat Analysis Dashboard, Citations) across 4 Tiers.
- `ORIGINAL_REQUEST.md` specifies the feature requirements (7-layer visualizer, threat analysis dashboard tags, reference pills, parallel API response handling).

## 2. Logic Chain
- Since Playwright is already installed and configured, no new dependencies or root configuration files need to be created.
- The new test suite should be logically isolated. I propose creating a `tests/e2e/angry-debunkers/` directory.
- The tests must meet the exact coverage thresholds defined in `TEST_INFRA.md`: 5 per feature for Tier 1, 5 per feature for Tier 2, pairwise for Tier 3, and 5 scenarios for Tier 4.
- Because these are opaque-box tests, we will evaluate the system from the outside (UI rendering, DOM elements, mock API interactions using `page.route` to simulate backend behavior predictably without relying on internal implementation).

## 3. Caveats
- Real API testing vs Mocking: While true E2E should test the full stack, relying on live external APIs (like LLMs and 10 parallel search databases) in automated tests will cause flakiness and high costs. The plan recommends using Playwright's `page.route()` to intercept backend calls (`/api/defense/angry-debunkers`) to return predictable JSON containing `egyptian_vector_hit` and `god_system_7_layer_audit` during Tiers 1-3. Tier 4 scenarios can be configured to hit the real endpoint if an integration environment variable is set.
- Visual testing: Validating "glassmorphism" and "geometric objects" might require visual regression testing (e.g., Playwright's `toHaveScreenshot`), but the plan currently focuses on DOM assertions (CSS classes, visibility, attributes) as standard.

## 4. Conclusion
The E2E Test Suite Plan is ready.

### Test Architecture
- **Directory Structure**:
  - `tests/e2e/angry-debunkers/tier1-happy-path.spec.ts`
  - `tests/e2e/angry-debunkers/tier2-boundaries.spec.ts`
  - `tests/e2e/angry-debunkers/tier3-pairwise.spec.ts`
  - `tests/e2e/angry-debunkers/tier4-scenarios.spec.ts`
- **Mocking Strategy**: Use `page.route('/api/defense/angry-debunkers', ...)` to mock the No-Mercy Protocol API responses to avoid LLM flakiness and ensure consistent test states.

### Detailed Test Cases Plan

#### Tier 1: Happy Paths (>=5 per feature)
**F1: Claim Submission & API Response**
1. Valid short claim submitted -> Success response received and rendered.
2. Valid long claim submitted -> Success response received and rendered.
3. Claim with Arabic script submitted -> Handled correctly (RTL rendering).
4. Claim with English script submitted -> Handled correctly (LTR rendering).
5. API response correctly parses and maps `egyptian_vector_hit` and `god_system_7_layer_audit` payload.

**F2: Loading Visualizer (7-Layer)**
1. Progress UI overlay appears immediately after submit button click.
2. 7 distinct animation layers are displayed in sequence on the screen.
3. The specific "1. Stripping Emotion..." text becomes visible during loading.
4. Visualizer completely unmounts/disappears once the mock API response resolves.
5. Visualizer retains structural aspect ratio (canvas/animations) on Desktop vs Mobile viewports.

**F3: Threat Analysis Dashboard UI**
1. Dashboard successfully renders the Context Vector tag (`egyptian_vector_hit`).
2. Dashboard successfully renders the Negative Science Violation warning tag.
3. The "Truth Sandwich" textual response is displayed prominently.
4. Dashboard background CSS attributes include glassmorphism properties (backdrop-filter).
5. The layout remains perfectly horizontally centered (no left-squash regression) upon results render.

**F4: Citations (Reference Pills) UI**
1. Citations appear dynamically as pill-shaped UI elements at the bottom.
2. Hovering over a citation pill triggers the expected CSS transition/interaction (opacity/transform).
3. Clicking/interacting with citation pills does not cause layout shifts in the dashboard.
4. Multiple citations wrap correctly on smaller viewport screens (flex-wrap).
5. Missing or empty citations list gracefully hides the section (no empty wrapper divs).

#### Tier 2: Boundary Value Analysis & Edge Cases (>=5 per feature)
**F1: Claim Submission & API Response**
1. Empty claim submission -> Validation error appears; API is not called.
2. Extremely large payload (10,000+ chars) -> UI gracefully truncates or handles the text limit.
3. Claim with heavy special characters, URLs, and emojis -> Backend payload parsed correctly without crash.
4. API response delay exceeds 8000ms -> Proper timeout/error boundary is shown to the user.
5. API response malformed (missing critical God-System fields) -> Frontend handles missing keys via Zod without white-screen crash.

**F2: Loading Visualizer (7-Layer)**
1. Fast network simulation: Visualizer skips/fast-forwards smoothly so it's not a flash of unstyled content.
2. Slow network simulation: Visualizer cycles smoothly without freezing indefinitely.
3. API failure mid-load: Visualizer aborts and transitions cleanly to an error state UI.
4. Repeated rapid submissions (spam-clicking): Visualizer resets cleanly or button disables.
5. Window resize during visualization: Visualizer re-renders correctly without clipping.

**F3: Threat Analysis Dashboard UI**
1. Unknown `egyptian_vector_hit` enum value -> Renders a generic fallback UI tag.
2. Extreme length in "Truth Sandwich" text -> Container shows scrollbar; no text overflows the glass container.
3. Missing Negative Science Violation in payload -> Warning section is hidden gracefully without empty space.
4. Mobile layout constraint (width < 375px) -> Dashboard elements stack vertically instead of side-by-side.
5. Contrast check -> Text remains legible on the glassmorphism background under both dark and light modes.

#### Tier 3: Pairwise Interactions
1. F1 (slow mock response) + F2 (visualizer cycle) -> ensure visualizer loops/holds gracefully when F1 is slow.
2. F3 (extremely long Truth Sandwich) + F4 (50+ citations) -> ensure combined layout doesn't break the parent container's constraints.
3. F1 (API Error/Timeout) + F3 (Dashboard) -> ensure Dashboard is replaced by an error boundary, not rendering empty tags.
4. F2 (Visualizer abort) + F4 (Citations) -> ensure no citations leak into the UI if visualization was aborted due to error.
5. F1 (Arabic vs English) + F3 (Threat Analysis layout) -> RTL/LTR direction changes interact correctly with Dashboard centering.

#### Tier 4: Real-World Application Scenarios (from TEST_INFRA.md)
1. **The Viral Rumor**: User submits a widely circulated medical rumor, sees 7-layer animation, and receives detailed Threat Analysis and citations.
2. **The Empty Threat**: User submits empty claim, expecting validation error or graceful rejection.
3. **The Copypasta**: User submits very long text (copypasta), testing boundary limits and UI scrolling.
4. **The Edge-Case Offender**: User submits claim triggering specific Edge-case Negative Science Category and verifies UI renders tags properly.
5. **The API Failure**: Application gracefully handles API timeout or API failure during debunking process.

## 5. Verification Method
- **Command**: `npx playwright test tests/e2e/angry-debunkers/`
- **Conditions**: All tests exit with code 0.
- **Files to Inspect**: Ensure the test files are created in `tests/e2e/angry-debunkers/` and follow the exact structure outlined above. Verify the usage of `page.route` to satisfy opaque-box requirements without incurring external API costs.
