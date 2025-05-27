# Task 4.3: Size‑limit CI check (< 250 KB gz for core bundle)

## Overview

Implement bundle size monitoring to ensure the core UI kit bundle stays under 250 KB gzipped. This involves setting up size-limit tooling and CI integration to prevent bundle bloat.

## Task Breakdown

| Task Description                                 | DoD (Definition of Done)                                                     | Status   |
| ------------------------------------------------ | ---------------------------------------------------------------------------- | -------- |
| Install and configure size-limit package         | Package installed with appropriate configuration for bundle size checking    | Complete |
| Configure size-limit for core bundle measurement | Configuration targets the main bundle output and measures gzipped size       | Complete |
| Set up size-limit CI integration                 | CI pipeline includes size-limit check that fails if bundle exceeds 250 KB gz | Complete |
| Add npm script for local size checking           | `pnpm run size-limit` command available for local development                | Complete |
| Verify current bundle size is under limit        | Current build passes size-limit check with margin for growth                 | Complete |
| Document size-limit usage in README/docs         | Documentation explains how to check bundle size and what the limits are      | Complete |

## Definition of Done

- `npm run size-limit` passes
- CI pipeline includes size-limit check
- Bundle size is under 250 KB gzipped
- Documentation updated with size monitoring information

## Technical Notes

- Will use `size-limit` package for bundle analysis
- Need to configure for Vite build output
- Should measure the main entry point bundle
- Consider excluding dev dependencies and test files from measurement
