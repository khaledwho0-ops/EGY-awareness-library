# Observation
1. **DOM Selectors**: `src/app/angry-debunkers/page.tsx` renders "Negative Science Violation" (line 283) and "Egyptian Vector Hit" (line 298) as the static headers for the Threat Dashboard. The actual dynamic values (`result.data.logical_fallacy_detected` and `result.data.egyptian_contextual_mapping`) are rendered as paragraph content below these headers. However, `tests/e2e/angry-debunkers.spec.ts` incorrectly asserts `.getByText('Logical Fallacy Detected')` (line 203) and `.getByText('Egyptian Contextual Mapping')` (line 209).
2. **Visualizer Layers**: `src/app/angry-debunkers/page.tsx` defines `GOD_SYSTEM_LAYERS` (lines 8-16) consisting of specific numbered strings like "1. Stripping Emotion...", "2. Identifying Claim...", etc. `tests/e2e/angry-debunkers.spec.ts` hallucinated layers like "PINGING GLOBAL DATABASES..." and "ALIGNING ARABERT SYNTHESIS LAYER..." (lines 154-160).
3. **API Mock Schema**: `src/app/angry-debunkers/page.tsx` accesses the fact-checking response via `result.data.truth_sandwich` (lines 326, 332, 338). `tests/e2e/angry-debunkers.spec.ts` defines all mock objects using `truth_sandwich_ar` (lines 10, 28, 48, 66, 81), which causes a crash.

# Logic Chain
- To fix the **DOM Selectors**, we must update `tests/e2e/angry-debunkers.spec.ts` to assert the correct UI headers. The assertions in the "Threat Dashboard" test block must check for "Negative Science Violation" and "Egyptian Vector Hit".
- To fix the **Visualizer Layers**, the `expectedLayers` array in `tests/e2e/angry-debunkers.spec.ts` (line 153) needs to be replaced with the exact `GOD_SYSTEM_LAYERS` strings from `page.tsx`. Additionally, instances of `.getByText('PINGING GLOBAL DATABASES...')` (lines 143, 171, 188, 191) and `.getByText('ALIGNING ARABERT SYNTHESIS LAYER...')` (line 172) must be replaced with one of the real strings, e.g., "4. Cross-Referencing 10 Global Databases...".
- To fix the **API Mock Schema**, all instances of `truth_sandwich_ar` across the mock payloads in `tests/e2e/angry-debunkers.spec.ts` must be renamed to `truth_sandwich`. Additionally, the assertion `successResponse.data.truth_sandwich_ar.fact_1` (line 217) must be updated to `successResponse.data.truth_sandwich.fact_1`.

# Caveats
No caveats. The integrity violations can be resolved entirely by aligning the E2E test file with the existing source code of `page.tsx`.

# Conclusion
The E2E test implementation in `tests/e2e/angry-debunkers.spec.ts` must be updated with three precise fixes:
1. Rename `truth_sandwich_ar` to `truth_sandwich` in all mocks.
2. Update the `expectedLayers` and `.getByText` assertions to use the real strings from `GOD_SYSTEM_LAYERS`.
3. Update `.getByText('Logical Fallacy Detected')` and `.getByText('Egyptian Contextual Mapping')` to `.getByText('Negative Science Violation')` and `.getByText('Egyptian Vector Hit')` respectively.

# Verification Method
After applying the changes to `tests/e2e/angry-debunkers.spec.ts`, run the Playwright test command:
`npx playwright test tests/e2e/angry-debunkers.spec.ts`
All tests should pass, confirming that the DOM selectors, visualizer texts, and mock API schema are fully aligned with the frontend component.
