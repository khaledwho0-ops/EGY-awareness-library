# Handoff Report: E2E Test Suite Redesign

## 1. Observation
- **Hydration Timeout**: `tests/e2e/angry-debunkers.spec.ts` heavily utilizes `await page.locator('textarea').fill(...)`. Because Playwright can interact before Next.js fully hydrates, the typed value gets cleared upon hydration. The submit button remains disabled, causing timeouts.
- **Facade Tests**: 
  - Line 180 ("Hover states trigger visually"): Currently only checks the `href` attribute (`expect(link).toHaveAttribute('href', 'https://who.int')`) instead of simulating hover.
  - Line 258 ("Double-click submission deduplication"): Calls `await page.getByRole('button', ...).click()` exactly once, rather than double-clicking.
- **XSS Vulnerability**: Line 364 ("Citation without a valid URL") asserts `expect(href).toBe('javascript:alert(1)')`.
- **Brittle Selectors**: The file uses `page.locator('textarea')` in 23+ places.
- **Tier 4 Mocks**: Tier 4 scenarios (S1, S3, S4, S5) at Line 443 repeatedly utilize the identical static `successResponse` without varying the payloads to match the unique scenarios.

## 2. Logic Chain
- **Hydration**: To fix the hydration timeout, we must use a robust retry mechanism. Wrapping the `fill` and validation inside an `expect.toPass()` block ensures Playwright will retry typing and checking the button state until the DOM settles and hydration completes.
- **Facade Tests**: The tests must genuinely trigger the stated interactions. Using `link.hover()` combined with checking visual/CSS states will fulfill the hover test. Using `button.dblclick()` will accurately trigger two fast clicks, validating whether the network request counter (`reqCount`) stays at `1`.
- **XSS**: An assertion checking for the explicit rendering of a `javascript:` payload enforces insecure behavior. The test must verify the URL is sanitized by asserting `expect(href).not.toContain('javascript:')` or `expect(href).toBe('#')`.
- **Selectors**: Replacing `page.locator('textarea')` with semantic locators like `page.getByRole('textbox')` will improve robustness and align with Playwright best practices.
- **Mocks**: We need custom response objects (e.g., `s1MedicalResponse`, `s4EdgeCaseResponse`) to replace `successResponse` in Tier 4 so that the assertions align with realistic unique responses.

## 3. Caveats
- The hover test fix assumes the link changes a CSS property on hover. If the implementation relies on specific classes, the assertion must be adjusted (e.g., `toHaveCSS('text-decoration', /underline/)`).
- The XSS fix assumes Next.js or the implementation sanitizes `javascript:` to something else. We may need to verify the exact fallback value (`#`, `about:blank`, or removed attribute entirely).

## 4. Conclusion
Refactor `tests/e2e/angry-debunkers.spec.ts` using the proposed strategies:
1. Wrap textarea interactions in hydration-aware `expect(async () => { ... }).toPass()`.
2. Convert facade tests to use `hover()` and `dblclick()`.
3. Assert that malicious URLs are stripped/sanitized.
4. Use `getByRole('textbox')` globally.
5. Create and inject tailored JSON mocks for Tier 4 scenarios.

## 5. Verification Method
After implementation, run:
`npx playwright test tests/e2e/angry-debunkers.spec.ts`
All 45 tests should pass without timeouts, validating that hydration and interaction behaviors are stable and secure.
