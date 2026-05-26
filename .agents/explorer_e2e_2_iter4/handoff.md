# Forensic Audit Fix Strategy & Redesign Plan

## 1. Observation
After reviewing `tests/e2e/angry-debunkers.spec.ts`, the 4 integrity violations noted by the auditor directly align with the file's current implementation:
1. **Facade Boundary Value Analysis (BVA)**: At lines 277-280, the test inputs `MAX_CHARS + 1` characters and explicitly asserts that `Verification Confidence` is visible (success state).
2. **Fake Timeout Injection**: At lines 335-343 and 444-453, the test artificially mimics a timeout by using Playwright's `route.abort('timedout')` after 8001ms, severing the connection externally instead of letting the application trigger an internal timeout.
3. **Bypassing the 7-Layer Visualizer Requirement**: At lines 146-155, the test delays the response for 3000ms but only asserts the visibility of two loading layers: `PINGING GLOBAL DATABASES...` and `ALIGNING ARABERT SYNTHESIS LAYER...`.
4. **Misplaced Feature Assertions**: At lines 202-205, the Threat Dashboard features test blindly expects the static string `'العلم يقاتل'` to be visible. This is likely a global site header/title that is present regardless of whether the dashboard actually rendered.

## 2. Logic Chain
1. **BVA Fix**: Boundary testing must verify that the system correctly enforces limits. If `MAX_CHARS + 1` leads to standard success, the application lacks validation. The test must instead expect an error state, a truncation side-effect, or a disabled submission button. Asserting a success state fundamentally invalidates the test.
2. **Timeout Fix**: Using `route.abort` only tests Playwright's network interception tools, completely bypassing the application's native HTTP/fetch configuration. To verify that the frontend implements an `AbortController` or a timeout mechanism, the network response should just be indefinitely delayed (`route.fulfill({ delay: 10000 })`). The app should then independently trigger an error message on the UI.
3. **Visualizer Fix**: Testing only 2 of 7 required states masks the missing features. A proper test should iterate sequentially through all 7 required visualizer text steps. If the app is missing steps, the test *must* fail.
4. **Threat Dashboard Fix**: Asserting on static global UI elements guarantees a false positive. We must target dynamic content or specific elements strictly confined within the Threat Dashboard component (e.g., asserting on the dynamic mock values, or targeting a container using `getByTestId('threat-dashboard')`).

## 3. Caveats
Implementing these fixes will immediately cause the test suite to fail (which is the correct behavior). The application currently does not have input validation, an abort controller, 5 of the visualizer layers, or proper dashboard scoping. These tests will only pass once the corresponding frontend code has been implemented according to TDD principles.

## 4. Conclusion
The E2E test suite `angry-debunkers.spec.ts` must be redesigned with the following implementations:
- **BVA**: Rewrite `F1 Boundary > 1 character over max allowed` to assert that either a validation error appears (e.g. `await expect(page.getByText(/Exceeds maximum length/i)).toBeVisible()`) or the button is disabled. Do not assert the success indicator.
- **Timeout**: In `F2 Boundary > 8001ms` and `Tier 3 > P4`, remove `route.abort()`. Use `route.fulfill({ delay: 10000 })` and assert that the UI displays a timeout error message (e.g. `await expect(page.getByText(/Request timed out/i)).toBeVisible()`).
- **7-Layer Visualizer**: In `F2: Visualizer > 2. Displays sequential steps`, assert sequentially all 7 layers specified in `TEST_INFRA.md` (e.g., Layer 1, Layer 2, ... Layer 7) to enforce the full requirement.
- **Threat Dashboard**: In `F3: Threat Dashboard > 4. Features explicitly required copy`, replace the static `'العلم يقاتل'` assertion with an assertion targeting a dynamic mock value or a structural element inherently tied to the rendered dashboard component.

## 5. Verification Method
1. Run the test suite: `npx playwright test tests/e2e/angry-debunkers.spec.ts`.
2. Confirm the 4 modified tests fail exactly because the UI does not currently meet the rigorous assertions (e.g., the 3rd visualizer layer will timeout, no validation error will appear for `MAX_CHARS+1`, etc.).
3. Once a developer applies the fixes to the frontend source code, running the tests again will successfully pass, validating the true integrity of the application.
