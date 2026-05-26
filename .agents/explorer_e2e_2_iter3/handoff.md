# E2E Test Suite Redesign Report

## Observation
1. **Hydration Timeout**: The tests used `page.locator('textarea').fill(...)` which executed before Next.js hydration completed. This caused the input to reset, the button to remain disabled, and the test to time out.
2. **Facade Tests**: The hover test explicitly mentioned "(Check href instead of dummy hover)" and only checked visibility instead of testing a hover effect. The double-click test did not forcefully test two rapid clicks before actionability disabled the button.
3. **XSS Vulnerability**: The citation test checked if `href` was `javascript:alert(1)`, enforcing a vulnerability. `src/app/angry-debunkers/page.tsx` had `href={cit.url || "#"}` directly injecting raw URLs.
4. **Brittle Selectors**: The tests used `page.locator('textarea')`.
5. **Tier 4 Mocks**: The Tier 4 tests were using the same `successResponse` as Tier 1, despite testing different scenarios.

## Logic Chain
1. To address the **Hydration Timeout**, a `fillAndSubmit` helper was implemented using `expect(async () => { ... }).toPass()`. This waits for `getByRole('textbox')` to maintain its filled state and the submit button to become enabled.
2. To fix the **Facade Tests**, the hover test was modified to capture `window.getComputedStyle(el).backgroundColor` before hover and expect it to change post-hover. The double-click test was modified to explicitly dispatch two clicks (`await btn.click(); await btn.click({ force: true });`).
3. To mitigate the **XSS Vulnerability**, the component `page.tsx` was patched: `cit.url?.startsWith("http") ? cit.url : "#"`. The test was adjusted to `expect(href).not.toContain('javascript:')`.
4. To fix **Brittle Selectors**, all instances of `page.locator('textarea')` were replaced with `page.getByRole('textbox')`.
5. For **Tier 4 Mocks**, dedicated tailored responses (`s1MedicalResponse`, `s3LongResponse`, `s4EdgeCaseResponse`) were created and applied to the respective tests, including specific assertions like `expect(page.getByText('Gish Gallop')).toBeVisible()`.

## Caveats
- Playwright's `expect.toPass()` loop is used to bypass the hydration race condition. It is reliable but may cause slight delays in test execution if the application takes longer to hydrate.
- The XSS mitigation logic only allows URLs starting with `http`. Any relative paths or custom protocol handlers (if needed later) will need explicit whitelisting.

## Conclusion
The test suite in `tests/e2e/angry-debunkers.spec.ts` has been fully redesigned and corrected to address all reviewer feedback. The tests are now hydration-aware, perform genuine interaction checks for hover/double-click, enforce strict XSS mitigation on citation URLs, use semantic locators, and employ scenario-specific mock data. The associated vulnerability in the Next.js frontend has also been patched.

## Verification Method
Run the Playwright test suite using:
`npx playwright test tests/e2e/angry-debunkers.spec.ts`
Verify that all tests, especially the Tier 4 scenarios, hover test, and double-click deduplication test pass successfully and that the tests do not timeout.
