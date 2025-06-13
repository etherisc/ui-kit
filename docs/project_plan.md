# UI‑Kit — Iteration Roadmap

A pragmatic breakdown into **four one‑week sprints** plus a preparatory **Sprint 0**. Each task lists an **objective** and a **Definition of Done (DoD)** expressed as automated checks the AI coding agent must satisfy.

---

## Sprint 0 — Scaffold, CI & DevOps plumbing

| #    | Task                                                                                                               | DoD (checked by CI bot)                                                                            | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------ |
| 0.1a | Initialise `ui-kit` repo with Vite library template, TS, Tailwind.                                                 | Project structure exists with basic dependencies.                                                  | ✓      |
| 0.1b | Configure DaisyUI and verify build process.                                                                        | `pnpm build` exits 0; generated `dist/index.js` exists.                                            | ✓      |
| 0.2  | Add `ui-kit.mdc` rule file and baseline ESLint + Prettier config.                                                  | `npm run lint` passes with zero errors on fresh repo.                                              | ✓      |
| 0.3  | Configure GitHub Actions pipeline skeleton (lint → test → build).                                                  | Workflow completes green on `main`.                                                                | ✓      |
| 0.4  | Commit Husky hooks (commitlint, lint‑staged).                                                                      | Attempting to commit code with ESLint errors is blocked locally.                                   | ✓      |
| 0.5  | Seed Changesets & automatic versioning.                                                                            | Merging PR increments `package.json version` and creates a changelog file.                         | ✓      |
| 0.6  | **Docker/Dokku infra** – Add multi‑stage `Dockerfile`, `Procfile`; CI job builds image & pushes to test Dokku app. | `gh workflow run docker-test` builds & deploys; Dokku reports container running, health‑check 200. | ✓      |
| 0.7  | **Update GitHub Actions** – Configure CI workflows to run on develop branch and PRs.                               | CI workflows run on both main and develop branches, as well as PRs targeting these branches.       | ✓      |

---

## Sprint 1 — Core primitives & docs foundation

| #    | Task                                                                                                  | DoD                                                                      | Status |
| ---- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------ |
| 1.0a | **Folder restructure** – adopt `src/components/primitives`, `layout`, `hooks`, `providers` hierarchy. | `pnpm build` & `pnpm test` pass after move; no unresolved imports in TS. | ✓      |
| 1.0b | Migrate **Button** files into `components/primitives/Button/`; delete legacy `core/Button`.           | Storybook & unit tests green at the new path.                            | ✓      |
| 1.0c | Update barrels (`src/components/index.ts`, root `src/index.ts`) and **adjust all imports**.           | `pnpm lint` shows 0 errors; grep finds no `from "./core"`.               | ✓      |
| 1.1a | Create basic **Button** component structure.                                                          | Component file exists with basic props and types.                        | ✓      |
| 1.1b | Complete **Button** implementation with tests and stories.                                            | Vitest basic unit tests, Storybook MDX story with ArgsTable.             | ✓      |
| 1.1c | Implement **TextInput** wrapper in `src/components/primitives`.                                       | Vitest basic unit tests, Storybook docs (autodocs) & unit tests.         | ✓      |
| 1.2a | Set up basic Storybook configuration.                                                                 | `npm run storybook` starts successfully.                                 | ✓      |
| 1.2b | Install and configure Storybook addon‑docs.                                                           | Documentation tab shows component documentation.                         | ✓      |
| 1.2c | Configure and verify Storybook addon‑a11y.                                                            | axe‑a11y addon shows zero violations.                                    | ✓      |
| 1.3  | Add global theme bridging (`theme.css` ↔ DaisyUI).                                                   | Cypress visual diff (light/dark) matches golden images.                  | ✓      |
| 1.4  | Create first **AuthShell** layout with logo slot.                                                     | Rendered via Storybook; Playwright snapshot approved.                    | ✓      |
| 1.5  | Document design tokens (`DESIGN_TOKENS.md`).                                                          | File exists; CI step `tokens-check` verifies presence of each CSS var.   | ✓      |

---

## Sprint 2 — Form primitives & State tooling

| #   | Task                                                                  | DoD                                                                                     | Status |
| --- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| 2.1 | Add NumberInput, Select, Checkbox, RadioGroup components.             | Unit & a11y tests pass; form story displays all.                                        | ✓      |
| 2.2 | Integrate **React Hook Form + Zod**; create `FormGrid` + `FormGroup`. | Story "Form Example" submits & reports validation errors in Storybook interaction test. | ✓      |
| 2.3 | Implement Zustand session store skeleton with dark‑mode flag.         | Vitest verifies default state + setter actions.                                         | ✓      |
| 2.4 | ESLint rule enforcing named `useEffect` & cleanup.                    | Failing example in test repo triggers lint error; real code passes.                     | ✓      |
| 2.5 | Extend CI to run axe‑core on all stories.                             | Pipeline fails if any new a11y violations introduced.                                   | ✓      |

---

## Sprint 3 — Data layer & Main layouts

| #   | Task                                                                                           | DoD                                                                                                                | Status |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| 3.1 | Wrap **TanStack Table** into `DataTable` with pagination, resize.                              | Story with 50 rows paginates; Playwright test clicks next page.                                                    | ✓      |
| 3.2 | Build **MainLayout** with TopBar + LeftNav + Breadcrumb.                                       | Storybook viewport test at 1280 & 1024 px shows responsive collapse.                                               | ✓      |
| 3.3 | Implement Toast system (`useToast`) + StatusBadge.                                             | Vitest renders Toast, axe-core passes.                                                                             | ✓      |
| 3.4 | Sample showcase: login page + dashboard + customers table route.                               | E2E Playwright run (login → dashboard) green in CI.                                                                | ✓      |
| 3.5 | Add i18n infrastructure (`react-i18next`) with `en`, `de` locales.                             | Storybook toolbar allows locale switch; renders German labels.                                                     | ✓      |
| 3.6 | **SQLite seed script** – generate 100 customers & 2 users; hook `pnpm run seed` in showcase.   | Script executes without error; Playwright test logs in with `admin` credentials, verifies 100 customers paginated. | ✓      |
| 3.7 | **DevContainer setup** – comprehensive development environment for consistent reproducibility. | Container builds successfully; all development commands work; VS Code extensions load; documentation complete.     | ✓      |

---

## Sprint 4 — Polish, security & release readiness

| #   | Task                                                                            | DoD                                                                                          | Status |
| --- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------ |
| 4.1 | Implement CSP & DOMPurify wrapper in MarkdownEditor.                            | Security unit test feeds XSS payload; output sanitised.                                      | ✓      |
| 4.2 | Add Sentry ErrorBoundary + tslog logger.                                        | Fake error in story captured by mocked Sentry client in test.                                | ✓      |
| 4.3 | Size‑limit CI check (< 500 KB gz for core bundle).                              | `npm run size-limit` passes.                                                                 | ✓      |
| 4.4 | Prepare **CONTRIBUTING.md**, PR template, CODEOWNERS.                           | Presence verified by doc‑lint script.                                                        | ✓      |
| 4.5 | Publish first `v0.1.0-beta` to GitHub Packages; deploy Storybook demo to Pages. | Tag `v0.1.0-beta` exists; npm info returns package; Pages URL accessible & shows build hash. | ✓      |

---

## Sprint 5 — Completeness Pass (remaining inputs, layouts & routes)

| #   | Task                                                                                                    | DoD                                                                                                                                                                       | Status |
| --- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 5.1 | **Form inputs batch 2** – DatePicker, DateRangePicker, SliderInput, SpinnerInput, ComboBox, TextArea    | Unit + a11y tests (≥90 % cov) & Storybook stories demonstrate disabled/error variants.                                                                                    | ✓      |
| 5.2 | **Editor widgets** – MarkdownEditor (already complete) & CodeEditor (CodeMirror 6)                      | MarkdownEditor verified complete with security & a11y. CodeEditor implemented with syntax highlighting, themes, mobile support; bundle size increase ≤ 500 KB gzip total. | ✓      |
| 5.3 | **Remaining layouts** – ErrorShell, MainFixedLayout, DataDenseLayout, Footer slot in MainLayout         | Storybook snapshots approved in light/dark; axe-core passes.                                                                                                              | ✓      |
| 5.4 | **Showcase routes extension** – `/settings` (MainFixedLayout), `/components` gallery, wildcard 404 page | Playwright E2E navigates: login → settings → gallery → invalid URL → 404; no console errors.                                                                              | ✓      |
| 5.5 | Add **Reset‑Password page** (AuthShell variant)                                                         | Route `/reset-password` renders form; Vitest form validation passes.                                                                                                      | ✓      |
| 5.6 | Update documentation index & Storybook sidebar grouping **PR**                                          | `npm run build-storybook` completes; new components appear under correct groups.                                                                                          | ✓      |

---

## Sprint 5 Release — v0.2.0-beta Deployed ✅

**Release Date**: December 29, 2025  
**Version**: v0.2.0-beta  
**Status**: 🚀 **SUCCESSFULLY DEPLOYED**

### 📦 Release Summary

- **6 new form components** with full React Hook Form integration
- **4 enhanced layout components** for comprehensive application structures
- **Advanced editor components** with syntax highlighting and XSS protection
- **Complete WCAG 2.1 AA accessibility compliance** (257 tests passing)
- **3,500+ lines of AI agent documentation** for development acceleration
- **Production-ready builds** optimized to 481KB gzipped (within 500KB target)

### 🎯 Quality Metrics Achieved

- ✅ **393 total tests passing** (388 unit + 5 integration)
- ✅ **Zero accessibility violations** across all components
- ✅ **Bundle size compliance** (481KB < 500KB target)
- ✅ **TypeScript strict mode** with zero compilation errors
- ✅ **Comprehensive documentation** (Storybook + AI guides)

### 🔗 Release Assets

- **GitHub Release**: [v0.2.0-beta](https://github.com/etherisc/ui-kit/releases/tag/v0.2.0-beta)
- **Release PR**: [#35](https://github.com/etherisc/ui-kit/pull/35) - Successfully merged to main
- **Package Registry**: Available for installation via npm/pnpm workspace

---

## Critical Bug Fixes & Unplanned Tasks

| #    | Task                                                                     | DoD                                                                                    | Status |
| ---- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------ |
| BF.1 | **Issue #46**: Fix TypeScript module resolution for pnpm projects        | pnpm users can compile TypeScript without module resolution errors; peer deps resolved | ✓      |
| BF.2 | **Issues #50-53**: Fix critical toast system and theming issues          | Toast notifications work correctly, API consistency, proper DaisyUI theme integration  | ✓      |
| BF.3 | **Issue #55**: Replace AppShell custom components with UI-Kit components | AppShell uses proper UI-Kit components; tests pass; enhanced functionality maintained  | ✓      |

**BF.1 Details**: Moved all Radix UI packages from dependencies to peerDependencies to fix TypeScript compilation failures in pnpm projects due to symlink structure conflicts. Released as v0.4.4.

**BF.2 Details**: Fixed critical toast system rendering issues, unified toast API under useToast hook, replaced hardcoded colors with CSS variables for proper theme integration, and updated showcase to demonstrate best practices. Released as v0.4.6. See [PR #54](https://github.com/etherisc/ui-kit/pull/54) for full details.

**BF.3 Details**: Major refactor replacing custom AppShell implementations with proper UI-Kit components (AppShellBreadcrumbs, AppShellSidebar, AppShellTopBar). Fixed infinite loop causing test hangs, corrected import paths, added enhanced functionality while maintaining backward compatibility. See [PR #58](https://github.com/etherisc/ui-kit/pull/58) for full details.

| #    | Task                                                                      | DoD                                                                                           | Status   |
| ---- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| BF.4 | **Issues #70-72**: Fix DataTable UI issues - sorting, resizing, alignment | Sorting indicators work, column resizing functional, number alignment correct; all tests pass | ✓ **PR** |

**BF.4 Details**: Fixed three critical DataTable UI issues: missing sorting indicators (#70), non-functional column resizing (#71), and broken number column alignment (#72). Replaced custom SVG icons with lucide-react for consistency. Enhanced DataTable stories with comprehensive alignment examples. Released as v0.7.7. See [PR #73](https://github.com/etherisc/ui-kit/pull/73) for full details.

---

## Task 57 - Comprehensive Pagination Architecture ✅

| #    | Task                                                                           | DoD                                                                                                                                    | Status   |
| ---- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 57.1 | **Comprehensive DataTable Pagination** - Implement enterprise-grade pagination | Enhanced DataTable with TanStack Table compatibility, smart defaults, rich navigation, keyboard shortcuts, 100% backward compatibility | ✓ **PR** |

**Task 57 Details**: Implemented comprehensive pagination architecture for DataTable component providing enterprise-grade navigation features while maintaining 100% backward compatibility. Added TanStack Table server-side pagination support, smart pagination defaults, rich navigation controls, keyboard shortcuts, and comprehensive documentation. See [PR #59](https://github.com/etherisc/ui-kit/pull/59) for full details.

---

## Post‑MVP backlog (icebox)

- Add Prometheus metrics endpoint to API stub.
- Bundle‑size driven package split (`ui-core`, etc.) when trigger metrics crossed.

---
