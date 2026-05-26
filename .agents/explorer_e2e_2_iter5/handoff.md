# Handoff Report: E2E Test Suite Redesign for The Angry Debunkers

**Summary:** The `angry-debunkers.spec.ts` E2E test file contains hallucinated DOM selectors, visualizer layers, and a mismatched API mock schema. This causes tests to fail or crash the component due to `TypeError`s. This report outlines the precise fixes needed to align the test suite with `page.tsx`.

## 1. Observation

**1. Hallucinated DOM Selectors:**
- In `tests/e2e/angry-debunkers.spec.ts`, tests assert incorrect header text:
  - Line 203: `await expect(page.getByText('Logical Fallacy Detected')).toBeVisible();`
  - Line 209: `await expect(page.getByText('Egyptian Contextual Mapping')).toBeVisible();`
- In `src/app/angry-debunkers/page.tsx`, the actual text used is:
  - Line 283: `Negative Science Violation`
  - Line 298: `Egyptian Vector Hit`

**2. Hallucinated Visualizer Layers:**
- In `tests/e2e/angry-debunkers.spec.ts`, tests assert non-existent loading layers:
  - Lines 143, 171, 188, 191, 488: Assertions look for `PINGING GLOBAL DATABASES...` and `ALIGNING ARABERT SYNTHESIS LAYER...`.
  - Lines 153-161: The `expectedLayers` array contains hallucinated values like `'EMOTION STRIP'`, `'PROVENANCE AUDIT'`, etc.
- In `src/app/angry-debunkers/page.tsx` (Lines 8-16), the correct `GOD_SYSTEM_LAYERS` are:
  - "1. Stripping Emotion..."
  - "2. Identifying Claim..."
  - "3. Isolating Variables..."
  - "4. Cross-Referencing 10 Global Databases..."
  - "5. Verifying Context..."
  - "6. Detecting Fallacies..."
  - "7. Formatting Truth Sandwich..."

**3. Hallucinated API Mock Schema:**
- In `tests/e2e/angry-debunkers.spec.ts`:
  - Lines 10, 28, 48, 66, 81: All five mocked responses use the key `truth_sandwich_ar`.
  - Line 217: Uses `successResponse.data.truth_sandwich_ar.fact_1`.
- In `src/app/angry-debunkers/page.tsx` (Lines 326, 332, 338), the frontend attempts to read `result.data.truth_sandwich.fact_1`, `myth`, and `fact_2`. Injecting `truth_sandwich_ar` causes `result.data.truth_sandwich` to be undefined, leading to a fatal `TypeError` during the test.

## 2. Logic Chain
- **DOM Selectors:** To fix the F3 assertions, we must update lines 203 and 209 in the test to look for `Negative Science Violation` and `Egyptian Vector Hit` respectively, mapping to the actual React component.
- **Visualizer Layers:** The test uses string matching for the animation state. We must replace `'PINGING GLOBAL DATABASES...'` and other hallucinated strings with `'1. Stripping Emotion...'` and the exact strings from `GOD_SYSTEM_LAYERS`. The `expectedLayers` array must be updated to exactly match the 7 layers from `page.tsx`.
- **API Mock Schema:** To prevent the `TypeError` and perfectly match the application's interface, `truth_sandwich_ar` must be replaced with `truth_sandwich` across all 5 mock payloads. The assertion on line 217 must be updated to `successResponse.data.truth_sandwich.fact_1`. While the frontend falls back from `negative_science_violation` to `logical_fallacy_detected` (line 284), updating the mocks to provide `negative_science_violation` and `egyptian_vector_hit` directly would better align with the primary UI design.

## 3. Caveats
- The regex match for `layer` in `expectedLayers` is case-insensitive in the test (`new RegExp(layer, 'i')`), which is fine, but using exact substrings is safer.
- Updating `logical_fallacy_detected` -> `negative_science_violation` in mock data means you may also need to update line 204: `await expect(page.getByText('Appeal to Emotion')).toBeVisible();` if it's no longer mapped properly, but since the mock data value ("Appeal to Emotion") remains the same, it will still match.

## 4. Conclusion
Propose the following fix strategy for `tests/e2e/angry-debunkers.spec.ts`:
1. Rename all instances of `truth_sandwich_ar` to `truth_sandwich` in the mock constants and test assertions.
2. Update mock object keys `logical_fallacy_detected` -> `negative_science_violation` and `egyptian_contextual_mapping` -> `egyptian_vector_hit`.
3. Update the `expectedLayers` array in the "F2: Visualizer" test block to use the exact `GOD_SYSTEM_LAYERS` strings from `page.tsx`. Replace `PINGING GLOBAL DATABASES...` assertions with `1. Stripping Emotion...` and `ALIGNING ARABERT SYNTHESIS LAYER...` with `2. Identifying Claim...`.
4. Update the "F3: Threat Dashboard" assertions from `Logical Fallacy Detected` to `Negative Science Violation` and `Egyptian Contextual Mapping` to `Egyptian Vector Hit`.

## 5. Verification Method
1. Apply the changes to `tests/e2e/angry-debunkers.spec.ts`.
2. Run the test suite: `npx playwright test tests/e2e/angry-debunkers.spec.ts` (or the equivalent command in the project).
3. The tests should pass without timeouts (since correct DOM elements are found) and without component crashes (since `truth_sandwich` provides the required data).
