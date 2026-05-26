# Forensic Audit Fix Strategy: The Angry Debunkers E2E Tests

## 1. Observation
- **Incorrect Route**: The test suite navigates to `/debunker`, but the actual component is implemented at `src/app/angry-debunkers/page.tsx` (accessible via route `/angry-debunkers`).
- **Hallucinated DOM Locators**: The test suite targets pseudo-classes like `.visualizer-container`, `.dashboard`, `.citation-pill`, `.tag`, `.error-state`, and `textarea[name="claim"]`. None of these exist in `src/app/angry-debunkers/page.tsx`.
- **Mismatched API Endpoint**: The test intercepts `**/api/debunk`, but the component makes actual POST requests to `/api/defense/angry-debunkers`.
- **Mismatched API Data Structure**: The mocked `successResponse` in the test suite provides `status` and `threat_analysis.tags`. However, the React component strictly expects the payload to match `{ type: "SYNTHESIS_COMPLETE", data: { confidence_score, logical_fallacy_detected, egyptian_contextual_mapping, truth_sandwich_ar: {...}, citations: [{ title, url }] } }`.
- **Missing Error UI**: The test suite expects an `.error-state` on API failure, but the `handleStrike` function in `page.tsx` simply logs the error and resets the internal state to `"IDLE"`.
- **Empty Validations**: The test suite expects an `.error-message` text when submitting an empty claim, but the component simply disables the submit button (`disabled={status !== "IDLE" || !query}`).
- **Invalid Syntax & Facade Assertions**: The test uses invalid Playwright syntax like `await expect(locator).toHaveCountGreaterThan(0)` and tautological logic (e.g. `pill.hover(); expect(pill).toBeVisible();` which tests nothing about the hover state).

## 2. Logic Chain
1. **Network Mocks**: The tests fail to intercept the correct endpoint, meaning tests either hit the real backend or timeout. The route interception must be updated to `**/api/defense/angry-debunkers`.
2. **Data Mocks**: Because the mocked data shape is entirely wrong, the component would crash or fail to render the Results area even if the locators were correct. The mock data must be rewritten to match `page.tsx`'s expectations.
3. **Locators**: Playwright must target real elements using resilient locators. 
   - *Textarea*: `page.getByPlaceholder(/Paste the rumor/i)`
   - *Submit Button*: `page.getByRole('button', { name: /Launch Strike Teams/i })`
   - *Results Container Indicators*: `page.getByText('Truth Sandwich Protocol')`, `page.getByText('Verification Confidence')`
   - *Citations*: `page.locator('a[target="_blank"]')`
4. **Behavioral Assertions**: 
   - Empty claim tests must verify `expect(submitButton).toBeDisabled()` instead of looking for an error message.
   - Error handling tests must verify that the UI returns to the "IDLE" state (the submit button returns to "Launch Strike Teams").
   - Invalid syntax must be replaced (e.g., `expect(await locator.count()).toBeGreaterThan(0)` or strict `toHaveCount(2)`).

## 3. Caveats
- The UI doesn't currently render a user-facing error message on API failure; it just silently reverts to IDLE. If the product requirements demand a visible error message, `page.tsx` itself will need an update. For this read-only investigation, the tests should assert the *current* behavior (reverting to IDLE).
- Hover state visual checks in Playwright without visual regression testing are inherently limited. The tests should focus on structural visibility or CSS computed styles instead of empty `toBeVisible` assertions.

## 4. Conclusion
The E2E test suite requires a complete rewrite to align with the actual implementation of `src/app/angry-debunkers/page.tsx` and stop functioning as a facade.

### Actionable Fix Strategy for Implementer:
1. **Update Route**: Change `page.goto('/debunker')` to `page.goto('/angry-debunkers')`.
2. **Update API Interception**: Change `page.route('**/api/debunk')` to `page.route('**/api/defense/angry-debunkers')`.
3. **Update Mock Data**: Replace `successResponse` with:
   ```typescript
   const successResponse = {
     type: 'SYNTHESIS_COMPLETE',
     data: {
       confidence_score: 95,
       logical_fallacy_detected: 'Appeal to Ignorance',
       egyptian_contextual_mapping: 'Egyptian Context Mapping...',
       truth_sandwich_ar: { fact_1: 'Fact 1', myth: 'Myth', fact_2: 'Fact 2' },
       citations: [{ title: 'WHO', url: 'https://who.int' }, { title: 'MOHP', url: 'https://mohp.gov.eg' }]
     }
   };
   ```
4. **Rewrite Locators**: Use ARIA and text-based locators:
   - `const textarea = page.getByPlaceholder(/Paste the rumor/i);`
   - `const submitBtn = page.getByRole('button', { name: /Launch Strike Teams/i });`
   - `const confidenceRing = page.getByText('Verification Confidence');`
5. **Fix Logic**: 
   - Remove dummy `.hover()` checks; test genuine state changes (e.g. check `toBeDisabled()`).
   - Fix invalid syntax: change `.toHaveCountGreaterThan(0)` to `expect(await locator.count()).toBeGreaterThan(0)`.
   - Remove testing for `.tag` entirely, as tags are not rendered by the component.

## 5. Verification Method
- **Run the tests**: After implementation, execute `npx playwright test tests/e2e/angry-debunkers.spec.ts`.
- **Validation**: All tests must pass, confirming they interact with the real component without relying on hallucinated classes or invalid API contracts.
