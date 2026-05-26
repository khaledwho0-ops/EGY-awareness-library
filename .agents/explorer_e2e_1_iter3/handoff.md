# Redesign Strategy for The Angry Debunkers E2E Test Suite

## Observation
1. **Hydration Timeout**: `tests/e2e/angry-debunkers.spec.ts` relies on `await page.locator('textarea').fill(...)` or `.pressSequentially(...)` immediately after page load. Next.js hydration often clears the value, keeping the submit button disabled, resulting in timeout errors.
2. **Facade Tests**:
   - The "Hover states" test (line 180) checks the `href` attribute rather than verifying visual changes upon hover.
   - The "Double-click" deduplication test (line 258) calls `.click()` once, failing to emulate an actual double-click.
3. **XSS Vulnerability Enforcement**: The "Citation without a valid URL" test (line 364) explicitly asserts `expect(href).toBe('javascript:alert(1)')`. This confirms vulnerable behavior. (Note: `src/app/angry-debunkers/page.tsx` renders `href={cit.url || "#"}` natively, which means the component is actually vulnerable to XSS).
4. **Brittle Selectors**: The entire suite depends on `page.locator('textarea')` for user input targeting.
5. **Tier 4 Mocks**: Tier 4 scenario tests (e.g., S1, S3) use the generic `successResponse` which isn't tailored to the specific edge cases their descriptions imply.

## Logic Chain
1. **Hydration fix**: Replace bare `fill` with an auto-retrying action block utilizing Playwright's `expect(async () => {...}).toPass()`. This guarantees that if hydration clears the input, Playwright re-fills the input until the "Launch Strike Teams" button correctly registers as enabled.
2. **Facade fix**: 
   - **Hover**: Simulate hover via `await link.hover()`, then verify a computed CSS property or class (e.g., asserting `transform: scale(1.05)` or checking background color changes driven by `hover:scale-105` / `hover:bg-white/[0.08]`).
   - **Double-click**: Replace `.click()` with `.dblclick()` to rigorously test request deduplication.
3. **XSS Security**: The test MUST assert that the payload is neutralized. Change the expectation to `expect(href).not.toContain('javascript:')` or `expect(href).toBe('#')`. *(Crucial: This will require a corresponding patch in `src/app/angry-debunkers/page.tsx` to sanitize `cit.url` before rendering).*
4. **Selector Resilience**: Swap `page.locator('textarea')` for semantic locators like `page.getByRole('textbox')` or `page.getByPlaceholder(/Paste the rumor/i)` across all 30+ instances.
5. **Scenario Fidelity (Tier 4)**: Implement distinct `route.fulfill` mock overrides for each Tier 4 scenario. For example, S1 (medical rumor) should strictly mock a `logical_fallacy_detected: "Appeal to Emotion"` response, and S3 (copypasta) should return a customized `confidence_score` and `truth_sandwich_ar`.

## Caveats
- Implementing the XSS test fix will cause the test to fail *until* the UI component (`src/app/angry-debunkers/page.tsx`) is also updated to sanitize citation URLs.
- Using `toPass()` for typing large payloads (`A`.repeat(1000)) via `pressSequentially` might take excessive time if it retries. Using `fill()` instead of `pressSequentially()` inside the retry block is recommended for speed.

## Conclusion
The `angry-debunkers.spec.ts` suite must be refactored to:
1. Wrap all input filling in a `fillAndVerify` hydration-aware helper.
2. Use `.hover()` and `.dblclick()` to authentically represent the test names.
3. Assert XSS sanitization (and update the target component accordingly).
4. Use `getByRole('textbox')` uniformly.
5. Inject bespoke mock JSON for Tier 4 scenarios instead of recycling Tier 1 mocks.

## Verification Method
1. Apply the test refactor.
2. Fix the XSS vulnerability in `src/app/angry-debunkers/page.tsx` (`url: cit.url.startsWith('http') ? cit.url : '#'`).
3. Run `npx playwright test tests/e2e/angry-debunkers.spec.ts`.
4. The test suite should pass reliably without hydration-induced timeouts, properly validate the XSS mitigation, and correctly enforce double-click boundaries.
