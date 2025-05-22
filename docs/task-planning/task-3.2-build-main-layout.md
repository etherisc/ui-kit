# Task 3.2: Build MainLayout with TopBar + LeftNav + Breadcrumb

## 🗺️ AI-Agent Planning Document — _Integrate New Layout System into `@etherisc/ui-kit`_

> **Purpose:** give an autonomous coding agent everything it needs—scope, specs, rules, and an actionable task board—to add full-featured screen layouts (App Shell, MinimalShell, WizardShell) plus supporting building-blocks to the UI-kit package.

---

### 1 High-level Plan

1. **Add-only integration** – extend `packages/ui-kit/src` without touching existing paths; primitives remain in `components/primitives`, current `AuthShell` stays intact.
2. **Deliver three new page shells** that cover the whole product:

   - **AppShell** – default admin chrome (TopBar + SideNav + ContentWrapper).
   - **MinimalShell** – bare page for 404/500 or maintenance.
   - **WizardShell** – multi-step onboarding / setup.

3. **Create reusable layout atoms/molecules** (TopBar, SideNav, Breadcrumbs, etc.) under `components/layout`.
4. **Expose a clean API** so downstream apps can import both primitives and shells:

   ```ts
   import { AppShell, MinimalShell } from "@etherisc/ui-kit/layout";
   ```

---

### 2 Design Requirements & Rules

| Category               | Spec & Hints                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsiveness**     | Breakpoints: `≥1440 px` wide-desktop, `1024–1439 px` desktop, `768–1023 px` tablet, `<768 px` mobile. On tablet mobile, SideNav transforms into a modal drawer.                                                                                                                                                                                                                  |
| **Top Navigation Bar** | Height: 64 / 56 / 48 px (desktop/tablet/mobile). Fixed width logo block **220–260 px** (use existing `Logo` component if present or create with shadcn `<Avatar>`). Horizontal menu uses shadcn `DropdownMenu`; action-icons are 40 px buttons (reuse existing `Button` primitive). User-widget: shadcn `DropdownMenu` + `Avatar` + embedded theme toggle (reuse `ThemeToggle`). |
| **Left SideNav**       | Width mirrors logo (220–260 px). Collapsible to 64 px icon-only rail; state persisted in localStorage. Tree depth ≤ 3; implement with TanStack `useVirtualizer` or custom recursive list. Use shadcn `Collapsible` for nested groups.                                                                                                                                            |
| **Content Wrapper**    | Slot under top-bar next to SideNav. 100 % height scroll-container. Apply `.container--960` class (`max-w-[960px] mx-auto px-6`) when `fixed={true}` prop is set (for settings pages). Breadcrumb bar (40 px) above main content.                                                                                                                                                 |
| **Utility Screens**    | _Login / Reset_: two-column on ≥1024 px, collapses on mobile; hooks into existing `AuthShell`. _404 / 500_: centered illustration + CTA buttons.                                                                                                                                                                                                                                 |
| **Accessibility**      | WCAG 2.2 AA: contrast ≥ 4.5:1, keyboard nav, `aria-current`, `role="navigation"`, “Skip to main content” link.                                                                                                                                                                                                                                                                   |
| **Theming & Tokens**   | Consume existing Tailwind design-tokens from `theme/`; no duplicates. Use Tailwind spacing scale (2–64 px) via CSS variables.                                                                                                                                                                                                                                                    |
| **Performance**        | All shells lazily import heavy parts (`React.lazy`) and ship skeleton loaders to mitigate CLS.                                                                                                                                                                                                                                                                                   |
| **Testing**            | Storybook stories + Vitest unit tests + Playwright visual tests parallel existing DataTable coverage.                                                                                                                                                                                                                                                                            |
| **Dependencies**       | React 18, shadcn/ui, TanStack Table v8 (already present), Tailwind CSS; no new external libs unless justified.                                                                                                                                                                                                                                                                   |
| **CI**                 | Must pass `pnpm test`, `pnpm build`, Cypress a11y test, and Storybook snapshot on PR.                                                                                                                                                                                                                                                                                            |

---

### 3 Folder Blueprint (target inside `packages/ui-kit/src`)

```
layout/
├─ AuthShell/             ← existing
├─ AppShell/
│   ├─ AppShell.tsx
│   ├─ TopBar.tsx
│   ├─ SideNav.tsx
│   ├─ Breadcrumbs.tsx
│   ├─ ContentWrapper.tsx
│   ├─ constants.ts
│   ├─ types.ts
│   └─ index.ts
├─ MinimalShell/
│   └─ MinimalShell.tsx
├─ WizardShell/
│   └─ WizardShell.tsx
└─ index.ts               ← re-exports all shells
components/
└─ layout/                ← new reusable atoms/molecules
    ├─ Logo.tsx           (shadcn Avatar + text)
    ├─ HeaderActionIcon.tsx
    └─ NavItem.tsx
```

---

### 4 Task Board

> **Statuses:** `open` → `working` → `checking` → `done`

| #        | Task description                                                                                                 | Definition of Done                                                                        | Status |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------ |
| **T-1**  | **Create folder scaffold** under `src/layout` and `components/layout`.                                           | Folders & empty stubs pushed; CI green.                                                   | done   |
| **T-2**  | **Implement building-block components**: `Logo`, `HeaderActionIcon`, `NavItem`, `Breadcrumbs`, `ContentWrapper`. | Unit tests & Storybook stories pass; uses existing shadcn primitives.                     | done   |
| **T-3**  | **Implement `TopBar.tsx`** (logo slot, horizontal menu, action icons, user widget).                              | Renders correctly in Storybook with mock props; keyboard nav works.                       | open   |
| **T-4**  | **Implement `SideNav.tsx`** with collapsible tree + persistence.                                                 | Collapses to 64 px, state stored in localStorage; a11y roles set.                         | open   |
| **T-5**  | **Implement `AppShell.tsx`** wiring TopBar + SideNav + ContentWrapper.                                           | Demo page renders nested routes via `children`; responsive tiers verified.                | open   |
| **T-6**  | **Implement `MinimalShell.tsx`** (404/500).                                                                      | Accepts `title`, `message`, `actions` props; visual snapshot baseline stored.             | open   |
| **T-7**  | **Implement `WizardShell.tsx`** with step bar & exit link.                                                       | Progress updates via `currentStep`, `totalSteps` props; Storybook interaction test green. | open   |
| **T-8**  | **Barrel exports** (`layout/index.ts`, root `src/index.ts`).                                                     | `import { AppShell } from "@etherisc/ui-kit/layout"` compiles.                            | open   |
| **T-9**  | **Storybook integration** – add new glob and stories.                                                            | `pnpm storybook` shows shells under “Layouts”.                                            | open   |
| **T-10** | **Vitest unit tests** for shells & blocks (coverage ≥ 90 %).                                                     | `pnpm test` passes locally & CI.                                                          | open   |
| **T-11** | **Playwright visual tests** for AppShell desktop & mobile.                                                       | Baseline screenshots committed; diff threshold ≤ 0.1 %.                                   | open   |
| **T-12** | **Update docs & changelog** (`CHANGELOG.md`, `/docs/layouts.md`).                                                | Explains import paths, props, and responsive behaviour.                                   | open   |
| **T-13** | **CI & build check** – ensure new files are part of bundle.                                                      | GitHub Actions “build & test” workflow green.                                             | open   |
| **T-14** | **Version bump & publish prep**.                                                                                 | `package.json` version incremented; `dist/` contains layout entry; `pnpm pack` succeeds.  | open   |

---

### 5 Component-Creation Hints

| Element             | Use existing?                                    | Implementation tip                                                              |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| **Buttons / Icons** | ✔ `components/primitives/Button`, `ThemeToggle` | Wrap icon buttons with `HeaderActionIcon` for badge support.                    |
| **Dropdown menus**  | ✔ shadcn `<DropdownMenu>`                       | For user widget & top-nav menu; supply `aria-labelledby`.                       |
| **Avatar**          | ✔ shadcn `<Avatar>`                             | Combine with `sessionStore` for initials.                                       |
| **Tree menu**       | ➖ (new)                                         | Start with shadcn `<Accordion>` for groups; add recursion + collapse animation. |
| **Breadcrumbs**     | ➖ (new)                                         | Simple ordered list; truncate middle items (`…`) when length > 3.               |
| **Data tables**     | ✔ existing TanStack DataTable component         | Embed inside ContentWrapper; pass adaptive height via flex grow.                |

---

### 6 Acceptance Criteria

- **No breaking changes** for current consumers of `@etherisc/ui-kit`.
- **Type-safe & doc-commented** public APIs.
- **Visual & functional parity** with spec on desktop, tablet, and mobile.
- **All tasks** reach **done**, CI is green, npm package builds & publishes.
