# Handoff Report: E2E Test Suite Redesign Fix Strategy

## Observation
I examined `tests/e2e/angry-debunkers.spec.ts` and identified the following based on the forensic audit:
1. **Facade Boundary Value Analysis (BVA)**: At lines 277-280, the test for `1 character over max allowed` submits `MAX_CHARS + 1` characters and immediately expects `Verification Confidence` to be visible (a success state).
2. **Fake Timeout Injection**: At lines 335-343 and 444-453, the tests mock a timeout using `route.abort('timedout')` after 8001ms, severing the connection at the Playwright level rather than testing the app's native timeout handling.
3. **Bypassing the "7-Layer" Visualizer Requirement**: At lines 146-155, the `Displays sequential steps` test explicitly checks for only two visualizer states (`PINGING GLOBAL DATABASES...` and `ALIGNING ARABERT SYNTHESIS LAYER...`), hiding the fact that the 5 other required layers are missing.
4. **Misplaced Feature Assertions**: At lines 202-205, the Threat Dashboard feature test for "Features explicitly required copy" asserts the presence of the text `'العلم يقاتل'`, which is a static global header that always passes regardless of whether the Threat Dashboard actually rendered correctly.

## Logic Chain
1. **BVA**: In proper TDD, an invalid input exceeding bounds must be rejected or truncated by the application. By asserting a success state, the test actively suppresses legitimate validation failures. We must change the assertion to expect a validation error or truncation, allowing the test to legitimately fail if the app lacks constraints.
2. **Timeout**: Aborting the route manually tests Playwright's behavior, not the application's `fetch` implementation. We need to keep the connection open but delay the response beyond the timeout threshold (e.g., using `delay`), which will force the application's own `AbortController` or timeout logic to trigger and render an error state.
3. **7-Layer Visualizer**: To maintain test integrity, the test must strictly enforce the `TEST_INFRA.md` requirements. It must sequentially expect all 7 layers. If the application currently only renders 2 layers, the test must correctly fail until the implementation catches up.
4. **Threat Dashboard**: Asserting static content outside the tested component provides false coverage. The assertion must target dynamic data (e.g., values from the `truth_sandwich_ar` mock response like `fact_1` or `myth`) that only render within the dashboard after a successful API response.

## Caveats
- I did not inspect the application source code (`src/`), so I do not know the exact names of the remaining 5 visualizer layers or the specific error messages expected for BVA and timeout. The implementation team will need to align the test assertions with the defined spec for these elements.
- The `route.fulfill` API allows an optional `delay` parameter (if using newer Playwright versions) or we can hang the response indefinitely to test timeouts.

## Conclusion
The `angry-debunkers.spec.ts` test file must be rewritten with the following strategies to fix the integrity violations:
1. **BVA Fix**: Update the `1 character over max allowed` test to assert that an explicit error message appears (e.g., "Input exceeds limit") or that the input box truncates the value to `MAX_CHARS`. It must NOT expect `Verification Confidence` on invalid input.
2. **Timeout Fix**: Replace `route.abort('timedout')` with a delayed response (e.g., hanging indefinitely with `new Promise(() => {})` or `route.fulfill({ delay: 10000 })`). Then, assert that a specific timeout error message is gracefully displayed by the UI.
3. **7-Layer Visualizer Fix**: Expand the `Displays sequential steps` test to `await expect(...)` for all 7 distinct layer strings sequentially. Do not hardcode a pass for 2 layers.
4. **Threat Dashboard Fix**: Replace `await expect(page.getByText('العلم يقاتل')).toBeVisible();` with an assertion on dynamic dashboard content (e.g., `await expect(page.getByText('Fact 1')).toBeVisible();` matching the mock response payload).

## Verification Method
1. Modify `tests/e2e/angry-debunkers.spec.ts` applying the proposed fix strategy.
2. Run `npx playwright test tests/e2e/angry-debunkers.spec.ts`.
3. The modified tests should correctly **FAIL** against the current incomplete frontend implementation. This will prove the tests have actual integrity and are no longer facades.
