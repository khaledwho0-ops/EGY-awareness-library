## 2026-05-24T21:09:01Z
Workspace: C:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library
Working directory: C:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\.agents\explorer_e2e_2_iter2
You are tasked with redesigning the E2E test suite plan for The Angry Debunkers.
The previous iteration failed a FORENSIC AUDIT. 

Here is the Forensic Auditor's full evidence report:
<BEGIN AUDIT REPORT>
## Forensic Audit Report

**Work Product**: tests/e2e/angry-debunkers.spec.ts
**Verdict**: INTEGRITY VIOLATION

### Phase Results
- [Source Code Analysis]: FAIL — The tests are written against a hallucinated DOM and contain dummy/empty assertions, constituting a facade test suite.

### 1. Observation
- Analyzed tests/e2e/angry-debunkers.spec.ts and the application source code src/app/angry-debunkers/page.tsx.
- The tests rely on CSS selectors that do not exist anywhere in the source code. For example: page.locator('.visualizer-container, .dashboard-container, .dashboard, .visualizer'), page.locator('.citation-pill'), page.locator('.tag'), and page.locator('.error-state').
- Searching the source tree reveals none of these classes are used in the Angry Debunkers page component (src/app/angry-debunkers/page.tsx), which exclusively uses Tailwind utility classes.
- Several tests contain empty/dummy assertions. For instance, F4: Citations UI test '2. Hover states trigger visually' executes await pill.hover(); followed merely by await expect(pill).toBeVisible();. This is a tautology that does not verify any visual hover state changes.
- Test F2 Boundary test 'Animation steps lagging behind API response' claims to test animation lag, but only verifies await expect(page.locator('.dashboard')).toBeVisible();.

### 2. Logic Chain
- Playwright's locator() queries the DOM for elements.
- Because classes like .dashboard and .citation-pill are entirely absent from the React implementation, the target elements will never be found on the page.
- Consequently, tests will timeout and fail.
- Since the tests are disconnected from actual implementation, they fail to cover requirements in TEST_INFRA.md.
- The presence of dummy assertions constitutes 'cheating'.
<END AUDIT REPORT>

Additionally, Reviewers reported compilation errors (`await expect(locator).toHaveCountGreaterThan(0)` is invalid Playwright syntax) and facade tests (conditional logic testing, hardcoded mocks inside scenarios instead of actual scenario logic).

Your task: Propose a fix strategy to correct the implementation of `tests/e2e/angry-debunkers.spec.ts`.
You MUST address the specific integrity violations identified by the auditor. Do NOT recommend strategies that circumvent the audit.
- You must read `src/app/angry-debunkers/page.tsx` to find the correct DOM selectors. Playwright recommends testing by visible text or ARIA roles (e.g. `getByRole`, `getByText`). If those are difficult, you must recommend the exact Tailwind classes used in the source or recommend using standard selectors.
- Re-design tests to be genuine and strict. Fix invalid Playwright assertions (e.g. use `.toHaveCount(n)` or logic to wait for elements).
Write your report in handoff.md in your working directory and notify me when done via send_message.
