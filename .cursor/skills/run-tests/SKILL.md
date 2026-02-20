---
name: run-tests
description: Run the project test suite, lint checks, and build verification. Use when the user asks to test, verify, or check if everything works after changes.
---

# Run Tests

## Quick Commands

From workspace root (`/workspace`):

```bash
pnpm lint          # ESLint across all packages
pnpm test          # Vitest unit tests across all packages
pnpm build         # TypeScript + Vite build for ui-kit and showcase
```

## Full Verification (before commit/PR)

```bash
pnpm lint && pnpm test && pnpm build
```

## Package-Specific

```bash
pnpm --filter @etherisc/ui-kit test     # ui-kit tests only
pnpm --filter @etherisc/ui-kit build    # ui-kit build only
pnpm --filter showcase test             # showcase tests only
```

## Test Framework

- **Runner**: Vitest v3
- **DOM**: jsdom environment
- **Assertions**: `@testing-library/react`, `vitest` expect
- **Accessibility**: axe-core via `@axe-core/react` or `vitest-axe`

## Common Issues

- **Lint warnings about `react-refresh/only-export-components`**: Pre-existing, safe to ignore
- **Peer dependency warnings**: Known for `react-day-picker` (expects React 18), safe to ignore
- **Build chunk size warning**: Showcase bundle exceeds 500KB, expected for demo app

## After Fixing Issues

1. Re-run the failing command to confirm the fix
2. Run the full verification suite before committing
3. Check `pnpm lint` output for 0 errors (warnings are acceptable)
