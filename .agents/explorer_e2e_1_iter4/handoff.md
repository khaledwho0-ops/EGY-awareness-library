# Handoff Report: E2E Test Suite Redesign Strategy

## Observation
A forensic audit identified four integrity violations in the current implementation of `tests/e2e/angry-debunkers.spec.ts`:
1. **Facade Boundary Value Analysis (BVA)**: The test expects success for a payload exceeding the maximum limit (`MAX_CHARS + 1`).
2. **Fake Timeout Injection**: The test uses `route.abort('timedout')` instead of properly delaying the network response to test application-level timeout handling.
3. **Bypassing the "7-Layer" Visualizer Requirement**: The test only checks for 2 layers instead of the 7 layers explicitly mandated by `TEST_INFRA.md`.
4. **Misplaced Feature Assertions**: The Threat Dashboard test asserts the presence of a static global header (`'العلم يقاتل'`) rather than dynamic dashboard content.

## Logic Chain
To correct these violations and adhere to strict TDD principles, the test suite must be redesigned as follows:
1. **BVA Strategy**: The test must submit a payload of `MAX_CHARS + 1` and assert that the UI explicitly rejects the input (e.g., via a validation error message) or truncates it. Expecting a success condition for invalid boundaries undermines BVA. If the application does not enforce this constraint, the test must fail to highlight the bug.
2. **Timeout Handling Strategy**: Instead of aborting the connection via Playwright, the test must simulate a delayed server response using `route.fulfill({ delay: 8500, status: 200, body: '...' })`. The test should then assert that the frontend application correctly implements an internal timeout mechanism (e.g., via `AbortController`) and displays an appropriate timeout error to the user after 8000ms.
3. **7-Layer Visualizer Strategy**: The test must assert the sequential appearance of all 7 distinct loading layers. It should expect the full sequence as defined in the requirements. If the frontend currently only implements 2 layers, the test must fail, correctly flagging the incomplete frontend implementation.
4. **Threat Dashboard Strategy**: The test must look for dynamic elements specific to the Threat Dashboard component that render only after a successful analysis (e.g., threat score, specific debunks, or dynamically loaded charts), rather than relying on a static page title.

## Caveats
- Implementing these strict tests will likely cause the E2E suite to fail against the current frontend application, as the audit suggests the app lacks these implementations. This is expected and desired in TDD.
- We assume the exact 7 layers are documented in `TEST_INFRA.md` or related documentation, which the implementer will need to reference.
- The maximum character limit (`MAX_CHARS`) must be defined and shared between the test and application to accurately test the boundary.

## Conclusion
The E2E test `tests/e2e/angry-debunkers.spec.ts` must be rewritten to strictly enforce application requirements rather than matching the current incomplete implementation. The fix strategy involves updating assertions to expect proper validation errors for BVA, using delayed responses to test internal timeouts, strictly asserting all 7 loading layers, and verifying dynamic dashboard content.

## Verification Method
- **To Verify BVA**: Run the updated test. If the app allows `MAX_CHARS + 1` without error/truncation, the test must fail.
- **To Verify Timeout**: Run the test with the network delay. It must fail if the app hangs indefinitely or doesn't show a timeout error.
- **To Verify Visualizer**: Run the test. It must fail on the 3rd missing layer if the app only has 2.
- **To Verify Dashboard**: Inspect the test code to ensure assertions target elements inside the dashboard container (e.g., `.threat-dashboard-content`) rather than static global headers.
