# UI‑Kit & Admin App — Planning Document

## 1  Purpose

Define architecture, conventions, and workflows for a reusable React UI‑Kit and demo showcase that back multiple insurance‑admin SPAs.

## 2  High‑Level Stack

| Layer         | Tech                                                                                   | Notes                     |
| ------------- | -------------------------------------------------------------------------------------- | ------------------------- |
| Design System | Shadcn UI (wrappers) + DaisyUI/Tailwind                                                | exported as `@org/ui-kit` |
| Data‑table    | TanStack Table v8                                                                      | headless                  |
| State         | React local, **Zustand** (session), **TanStack Query** (remote), **RHF + Zod** (forms) | clearly separated         |
| Routing       | React Router v7                                                                        | SPA                       |
| API           | Fastify REST + OpenAPI + Prisma                                                        | PostgreSQL                |
| Build         | Vite + pnpm                                                                            | no Next.js                |
| Deployment    | Docker → Dokku                                                                         | TLS via letsencrypt       |
| Docs          | Storybook v7                                                                           | serves as style‑guide     |
| Tests         | Vitest, Playwright, axe‑core                                                           | gates in CI               |

## 3  Repo Model

```
root/
  ui-kit/              # design‑system lib
  showcase/            # demo SPA
  api-server/          # mock backend
  docs/                # planning + spec
```

## 4  UI‑Kit Workflow

- **ui-kit.mdc** rule file – coding commandments
- Changesets for semver, Husky for commit hooks
- Lint/format/test gates in CI.

## 5  CI/CD Pipeline (GitHub Actions)

Lint → Test → Build → Size‑limit → Docker build & Dokku deploy → Playwright E2E → Storybook publish.

## 6  State‑Management Rules

### 6.1 Principles

Minimal state; effects only for side‑effects; libraries > ad‑hoc code.

### 6.2 Tool Matrix

| Concern | Tool |
| Local UI | `useState` |
| Session | Zustand |
| Remote | TanStack Query |
| Forms | RHF + Zod |

### 6.3‑6.6 Best‑/Worst‑Practice tables for `useState` / `useEffect`, lint rules, SSR caveat.

## 7  Styling & Theme Bridging

Shadcn CSS vars mapped to DaisyUI tokens in `theme.css`; Tailwind preset exported.

## 8  Docker & Dokku

One Dokku app for FE and API per client; dokku‑postgres plugin; config secrets.

## 9  Risk & Caveats

Tailwind build dependency, peer‑dep drift, provider duplication; mitigations listed.

## 10  Next Steps Checklist

(see project_plan.md)

## 11 Packaging Strategy

Single package now; **fine-grained source tree**:

```
src/
  components/
    primitives/          # Shadcn-wrapped building blocks (Button, Input…)
    form/                # Field wrappers & RHF bridges (TextField, SelectField…)
    data-display/        # Read-only widgets (Badge, Stat…)
    feedback/            # Toast, Alert, Progress…
    navigation/          # Tabs, Breadcrumb, Pagination…

  layout/                # Page-level shells (AuthShell, MainLayout…)
  hooks/                 # Reusable logic hooks
  providers/             # React context providers (ThemeProvider, ToastProvider…)
  theme/                 # CSS vars, Tailwind preset, DaisyUI bridge
  utils/                 # Non-UI helpers (cn, classMerge, debounce…)
  styles/                # Global CSS / reset
```

Trigger metrics for later workspace split remain unchanged (size / component count).

## 12  Layout Catalog

AuthShell · ErrorShell · MainLayout · MainFixed · DataDense (table of zones and notes).

## 13  Component Catalog

Extensive table of form inputs, helpers, grid, buttons, badges, toast, breadcrumb.

## 14  Documentation Standards

Storybook MDX for every component; ArgsTable, a11y addon, tokens doc; CI blocks missing docs.

## 15  Testing Strategy

| Layer | Tool | Coverage |
| Unit | Vitest | ≥90 % |
| a11y | Storybook axe | 100 % |
| Visual | Playwright | ≤0.1 % diff |
| E2E | Playwright | happy path |

## 16  Sample Showcase App

Vite SPA + Fastify stub + SQLite DB (100 customers, 2 users). Routes: login, dashboard, customers list/detail, components gallery, 404.

## 17  i18n

react‑i18next, `/locales`, Storybook locale knob.

## 18  Security Guidelines

XSS‑sanitised Markdown, CSP, CSRF, JWT, dependabot gates.

## 19  Contribution Workflow

GitFlow, Conventional Commits, PR template, CODEOWNERS.

## 20  Release Process

Changesets auto‑version, publish to GH Packages, Storybook to Pages.

## 21  Observability & Logging

Sentry error boundary, tslog, pino request logs, optional Prometheus.

## 22  Future Package Split

Automated script once bundle >300 KB or >30 components; verify‑workspaces CI.
