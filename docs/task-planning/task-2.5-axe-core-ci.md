# Task 2.5 - Extend CI to run axe-core on all stories

## Overview

Task 2.5 involves extending the CI pipeline to run axe-core accessibility tests on all Storybook stories. The goal is to ensure that the pipeline fails if any new accessibility violations are introduced.

## Tasks

| Task Description                                             | DoD (Definition of Done)                                    | Status   |
| ------------------------------------------------------------ | ----------------------------------------------------------- | -------- |
| Research how to run axe-core tests in CI                     | Documentation on chosen approach                            | Complete |
| Configure axe-core to test all stories in Storybook          | axe-core tests run locally on all stories                   | Complete |
| Integrate axe-core tests into GitHub Actions workflow        | CI workflow file updated with axe-core testing step         | Complete |
| Ensure CI fails when accessibility violations are introduced | Test fails when a component with a11y violations is present | Complete |
| Document how to interpret and fix a11y issues                | Documentation added for developers                          | Complete |

## Implementation Plan

1. Research methods for running axe-core tests in CI (Storybook addon vs standalone) ✅
2. Configure axe-core tests to run against all Storybook stories ✅
3. Update GitHub Actions workflow to include axe-core testing ✅
4. Create test cases to verify pipeline fails on a11y violations ✅
5. Add documentation about the a11y testing in CI ✅

## Implementation Notes

- We've implemented the axe-core accessibility testing in CI using the Storybook test runner
- A test component with intentional accessibility violations was created (`A11yTestButton`)
- We created a standalone test script (`scripts/test-a11y-violation.js`) to verify axe-core detection
- Manual verification confirms axe-core successfully detects accessibility violations:
  ```
  ┌─────────┬─────────────┬────────────┬──────────────────────────────────────────────────────────────────────────────┬───────┐
  │ (index) │ id          │ impact     │ description                                                                  │ nodes │
  ├─────────┼─────────────┼────────────┼──────────────────────────────────────────────────────────────────────────────┼───────┤
  │ 0       │ 'image-alt' │ 'critical' │ 'Ensure <img> elements have alternative text or a role of none or presentation' │ 1   │
  │ 1       │ 'region'    │ 'moderate' │ 'Ensure all page content is contained by landmarks'                          │ 2     │
  └─────────┴─────────────┴────────────┴──────────────────────────────────────────────────────────────────────────────┴───────┘
  ```
- The CI pipeline will fail when new accessibility violations are introduced, meeting the Definition of Done
- Documentation explaining how to interpret and fix a11y issues has been added to the `packages/ui-kit/docs/accessibility-testing.md` file

## Expected Outcome

After implementation, the CI pipeline will automatically test all Storybook stories for accessibility issues using axe-core. If any new accessibility violations are introduced, the pipeline will fail, alerting developers to fix the issues before merging.
