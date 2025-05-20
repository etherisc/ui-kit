# Agent Instructions – UI Kit Repository

This file combines all development guidelines from `docs/*.md` and `.cursor/rules/*.mdc`.
These rules apply to the entire repository unless a subdirectory defines its own
`AGENTS.md`.

## Required Checks
- Run `pnpm lint`, `pnpm test` and `pnpm build` before each commit.
- If new CSS variables are introduced, run the `tokens-check` script (see Sprint 1.5).

## Git Workflow
- Follow **GitFlow**. Work on feature branches, open PRs, and never commit
directly to `main`.
- Commits and PR titles use **Conventional Commit** format.
- Reference the relevant task ID from `docs/project_plan.md` in the PR
  description. CI must pass before merge.

## Component and Layout Implementation
- Implement all components under `packages/ui-kit/src` as described in
  `.cursor/rules/components.mdc` and the planning documents.
  - One component = one directory containing `index.ts`, `<Component>.tsx`,
    `<Component>.test.tsx` and `<Component>.stories.mdx`.
  - Use wrappers around Shadcn UI primitives and expose your own prop API.
  - No default exports. Export from `src/index.ts` only.
  - Tailwind classes may be used **only inside ui-kit**; never expose raw
    classes via the public API.
  - Colors and spacing use CSS variables mapped to DaisyUI tokens via
    `theme/theme.css`. Avoid inline colors.
  - Storybook stories include a Canvas demo and ArgsTable.
  - Provide unit tests with Vitest and axe-core accessibility checks.
  - Update `theme/TOKENS.md` when adding new CSS variables.
  - Add a Changeset entry for every public change.

## Styling, State and TypeScript Guidelines
- Apply the Tailwind, styling and DaisyUI rules from
  `.cursor/rules/styling_rules.mdc` and `.cursor/rules/components.mdc`.
- Local UI state uses `useState`/`useReducer`. Global session state uses
  **Zustand**. Remote data fetching uses **TanStack Query**. Forms use
  **React Hook Form** + **Zod**. No direct fetch calls in components.
- React hooks must clean up side effects and be named; avoid unnamed
  `useEffect`. Use `useMemo` for expensive calculations.
- Follow TypeScript strict-mode practices: no `any` unless justified, prefer
  type aliases and generics, and use `import type` for type-only imports.

## React Router and Vite
- Use React Router v7 with loaders and actions where appropriate. Routes should
  rely on `<Outlet />` for nesting.
- Configure imports via the `@` alias in `vite.config.ts` and avoid deep relative
  paths. Keep `index.html` minimal and let Vite inject scripts.

## Documentation
- The `docs/` folder contains the planning documents for the project. Keep these
  files up to date when architectural or workflow changes occur. Storybook and
  design-token documentation are mandatory for new components.

