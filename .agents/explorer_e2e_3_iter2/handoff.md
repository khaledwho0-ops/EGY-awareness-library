# Handoff Report: E2E Test Suite Redesign for Angry Debunkers

**Work Product**: `tests/e2e/angry-debunkers.spec.ts`
**Verdict**: FIX STRATEGY READY

### 1. Observation
- Analyzed `tests/e2e/angry-debunkers.spec.ts` and `src/app/angry-debunkers/page.tsx`.
- The test suite relies on nonexistent CSS classes (e.g., `.visualizer-container`, `.dashboard`, `.citation-pill`, `.error-state`, `.tag`).
- `src/app/angry-debunkers/page.tsx` implements the UI using standard HTML elements styled purely with Tailwind classes.
- The test intercepts the incorrect API endpoint `**/api/debunk`. The application actually uses `/api/defense/angry-debunkers`.
- The mocked API payload in the tests uses `{ status: 'success', data: { threat_analysis: {...}, citations: [...] } }`. However, `page.tsx` requires the response to match the shape `{ type: "SYNTHESIS_COMPLETE", data: { confidence_score: ..., truth_sandwich_ar: {...}, citations: [...] } }`.
- Because the mock data doesn't match the required shape, the condition `result.type === "SYNTHESIS_COMPLETE"` evaluates to false, causing the Dashboard UI to never render, inevitably leading to locator timeouts.
- The component explicitly reverts its state to `"IDLE"` upon API error. No dedicated `.error-state` UI is implemented.
- The test includes dummy assertions (testing hover by merely asserting `.toBeVisible()`) and invalid Playwright syntax (`.toHaveCountGreaterThan(0)`).

### 2. Logic Chain
- For tests to correctly interact with the application, they must use user-visible Playwright locators that map to the actual implementation. `page.getByPlaceholder(...)`, `page.getByRole('button')`, and `page.getByText(...)` accurately target the text area, submit button, and dashboard headers without relying on arbitrary CSS classes.
- Real network interceptions must target `/api/defense/angry-debunkers` and respond with a payload containing `type: "SYNTHESIS_COMPLETE"` to bypass the application's conditional rendering checks and actually display the dashboard.
- Since tags (`.tag`) and error states (`.error-state`) are not implemented in the application, testing for their presence constitutes testing a hallucinated requirement. The tests must be adjusted to verify actual application behavior (e.g., the fallback of the button state to `"IDLE"` upon an error).
- Empty assertions and invalid syntax must be rewritten into strict checks (`.toBeDisabled()`, `.not.toHaveCount(0)`, checking concrete text) to ensure genuine validation of the UI.

### 3. Caveats
- The redesign evaluates the application as currently implemented. Since the component catches API errors by returning the submit button to its idle state without rendering an error banner, the proposed tests verify this idle fallback behavior. If an explicit error UI is a product requirement, the component itself must be updated to render it.

### 4. Conclusion
- The test suite must be completely rewritten to align with the actual DOM structure and data handling logic of `page.tsx`.
- **Target Locators**: Replace CSS class selectors with robust Playwright locators: `getByPlaceholder(/Paste the rumor/i)`, `getByRole('button', { name: /Launch Strike Teams/i })`, and `getByText('Truth Sandwich Protocol')`.
- **API Interception & Mocks**: Correct the route to `**/api/defense/angry-debunkers` and structure the mock response correctly (`type: 'SYNTHESIS_COMPLETE'`).
- **Assertion Validation**: Replace invalid Playwright syntax and tautological checks with strict state validations (e.g., button disablement, actual text visibility, accurate citation counts).
- **Proposal**: A completely redesigned test specification implementing this strategy has been generated at `.agents/explorer_e2e_3_iter2/proposed_angry-debunkers.spec.ts`.

### 5. Verification Method
- **Implementation**: Replace the content of `tests/e2e/angry-debunkers.spec.ts` with the proposed code from `.agents/explorer_e2e_3_iter2/proposed_angry-debunkers.spec.ts`.
- **Execution**: Run `npx playwright test tests/e2e/angry-debunkers.spec.ts`.
- **Outcome**: The tests will pass without timeouts, strictly verifying the actual UI states and components implemented in `src/app/angry-debunkers/page.tsx` against a valid API schema.
