# ❌ Compliance Report

**Last scan:** 2026-03-06T03:35:48+00:00  
**Baseline commit:** `8076a329acfd`

## Summary

| Verdict | Count |
|---------|------:|
| ✅ Pass | 118 |
| ❌ Fail | 38 |
| ⚠️ Warning | 5 |
| ⚠️ Error | 741 |
| ⏭️ Skipped | 590 |
| 🔇 Suppressed | 0 |
| **Total** | **1492** |

## Findings

| Rule ID | Location | Criticality | Tier |
|---------|----------|:-----------:|:----:|
| `CON-DVO-002` | [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/queries.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/types/Auth.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/Auth.ts#L2) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-GOV-001` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-001` | [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-001` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-001` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-005` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![static](https://img.shields.io/badge/-static-blue?style=flat-square) |
| `CON-GOV-005` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![static](https://img.shields.io/badge/-static-blue?style=flat-square) |
| `CON-GOV-005` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![static](https://img.shields.io/badge/-static-blue?style=flat-square) |
| `CON-GOV-008` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-008` | [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-008` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-008` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-013` | [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-013` | [`packages/eslint-plugin-ui-kit-rules/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-013` | [`packages/ui-kit/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-013` | [`packages/ui-kit/src/components/ui/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/components/ui/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-013` | [`packages/ui-kit/src/i18n/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/i18n/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-014` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-014` | [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-014` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-014` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-016` | [`.nvmrc`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/.nvmrc) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/eslint-plugin-ui-kit-rules/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/ui-kit/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/ui-kit/src/components/ui/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/components/ui/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-017` | [`packages/ui-kit/src/i18n/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/i18n/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-GOV-019` | [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![structural](https://img.shields.io/badge/-structural-blueviolet?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts#L11) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/queries.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts#L24) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/types/ui-kit.d.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/ui-kit.d.ts#L4) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/types/Customer.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/Customer.ts) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |

<details>
<summary><strong>Evidence details (43 findings)</strong></summary>

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts)

> The database connection provides unrestricted access with no role separation. All functions (runQuery, getAllQuery, getQuery) can execute any SQL operations including INSERT, UPDATE, DELETE without any access controls. There are no separate database roles (app, migration, audit, admin) and no MFA requirements for administrative access. The connection allows superuser-level operations through direct SQL execution.

**Suggested fix:** Implement separate database connection functions for different roles (app operations, migrations, audit, admin). Create role-based access control where app operations can only execute limited queries, while admin operations require separate authentication. Add MFA verification for administrative database operations. Consider using connection pooling with role-based connections and restrict direct SQL execution based on the calling context.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/queries.ts)

> The file shows a single database connection layer (runQuery, getAllQuery, getQuery) used for all operations without role separation. There are no distinct database roles for app operations vs admin operations. The UserQueries class performs both user creation and authentication using the same database connection, and getAllUsers() appears to be an admin function using the same connection as regular operations. No evidence of MFA requirements for administrative access.

**Suggested fix:** Implement separate database connection classes with distinct roles: AppQueries (read-only app operations), AdminQueries (user management with MFA verification), MigrationQueries (schema changes), and AuditQueries (audit log access). Add MFA verification methods for administrative operations like getAllUsers() and createUser(). Consider implementing a role-based access control system that enforces different database connection privileges based on operation type.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts)

> Line [24](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts#L24): User interface defines only basic roles ('admin' | 'user') which may be insufficient for separation of duties. Line [49](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts#L49): CreateUserInput uses same simplified role structure. Line [103](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts#L103): AuthenticatedUser maintains the basic two-role system.

**Suggested fix:** Expand the role system to support granular permissions and separation of duties. Consider implementing role-based access control (RBAC) with specific roles like 'payment_creator', 'payment_approver', 'db_admin', 'key_admin', 'auditor', etc. Add MFA-related fields to user types and ensure administrative operations require separate approval workflows.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/types/Auth.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/Auth.ts)

> Lines [2-6](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/Auth.ts#L2-L6): User interface only defines two roles ('admin' | 'user') which is insufficient for separation of duties. No distinction between security-critical operations like payment creation vs approval, no separate database roles (app, migration, audit, admin), and no MFA enforcement in auth types.

**Suggested fix:** Expand role definitions to enforce separation of duties. Create specific roles like 'payment_creator', 'payment_approver', 'db_app', 'db_migration', 'db_audit', 'db_admin'. Add MFA requirement fields to User interface for administrative roles. Consider role-based permissions matrix instead of simple admin/user dichotomy.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/types/ui-kit.d.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/ui-kit.d.ts)

> Line [4-8](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/ui-kit.d.ts#L4-L8): User interface defines only basic roles 'admin' | 'user' without proper separation of duties for security-critical operations. This overly broad role definition could lead to insufficient access control granularity.

**Suggested fix:** Refine the User role type to support more granular role-based access control with distinct roles for different operations (e.g., 'payment_creator', 'payment_approver', 'db_admin', 'app_user', 'auditor'). Consider using a roles array or more specific role enums that align with separation of duties requirements.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-001` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Missing required root file: tsconfig.json
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-001` — [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json)

> Missing required root file: tsconfig.json
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-001` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Missing required root file: tsconfig.json
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-001` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Missing required root file: tsconfig.json
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-005` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Dependencies not in allowlist: @changesets/cli, @commitlint/cli, @commitlint/config-conventional, @eslint/js, @radix-ui/react-alert-dialog, @radix-ui/react-checkbox, @radix-ui/react-hover-card, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-switch, @radix-ui/react-tabs, @radix-ui/react-toggle, @radix-ui/react-toggle-group, @radix-ui/react-tooltip, @storybook/addon-a11y, @storybook/addon-docs, @storybook/addon-toolbars, @storybook/builder-vite, @storybook/react, @storybook/react-vite, @storybook/types, @tailwindcss/vite, @tanstack/react-table, @types/node, @types/react, @types/react-dom, @vitejs/plugin-react, @vitest/coverage-c8, commitlint, eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, husky, lint-staged, lucide-react, nanoid, postcss, prettier, tailwindcss, tsup, tw-animate-css, typescript-eslint, vite, vitest

**Suggested fix:** Remove or replace with an allowlisted package.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-005` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Dependencies not in allowlist: @eslint/js, @etherisc/ui-kit, @faker-js/faker, @hookform/resolvers, @playwright/test, @tailwindcss/vite, @testing-library/jest-dom, @testing-library/react, @types/bcryptjs, @types/react, @types/react-dom, @types/sql.js, @vitejs/plugin-react, bcryptjs, eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, jsdom, postcss, react-hook-form, react-router, react-router-dom, sql.js, tailwindcss, tsx, tw-animate-css, typescript-eslint, vite, vitest, zustand

**Suggested fix:** Remove or replace with an allowlisted package.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-005` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Dependencies not in allowlist: @chromatic-com/storybook, @codemirror/commands, @codemirror/lang-css, @codemirror/lang-html, @codemirror/lang-javascript, @codemirror/lang-json, @codemirror/lang-markdown, @codemirror/search, @codemirror/state, @codemirror/theme-one-dark, @codemirror/view, @eslint/js, @hookform/resolvers, @playwright/test, @radix-ui/react-accordion, @radix-ui/react-alert-dialog, @radix-ui/react-aspect-ratio, @radix-ui/react-avatar, @radix-ui/react-checkbox, @radix-ui/react-collapsible, @radix-ui/react-context-menu, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-hover-card, @radix-ui/react-label, @radix-ui/react-menubar, @radix-ui/react-navigation-menu, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slider, @radix-ui/react-slot, @radix-ui/react-switch, @radix-ui/react-tabs, @radix-ui/react-toggle, @radix-ui/react-toggle-group, @radix-ui/react-tooltip, @sentry/browser, @sentry/react, @size-limit/preset-small-lib, @storybook/addon-a11y, @storybook/addon-docs, @storybook/addon-essentials, @storybook/addon-interactions, @storybook/addon-links, @storybook/addon-onboarding, @storybook/blocks, @storybook/builder-vite, @storybook/cli, @storybook/react, @storybook/react-vite, @storybook/test, @storybook/test-runner, @storybook/theming, @storybook/types, @tailwindcss/vite, @tanstack/react-table, @testing-library/dom, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/dompurify, @types/jest, @types/marked, @types/react, @types/react-dom, @types/testing-library__jest-dom, @types/testing-library__react, @vitejs/plugin-react, @vitest/coverage-v8, axe-playwright, class-variance-authority, clsx, cmdk, codemirror, concurrently, cypress, cypress-visual-regression, date-fns, dompurify, embla-carousel-react, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, glob, i18next, i18next-browser-languagedetector, input-otp, jsdom, lucide-react, marked, postcss, prop-types, react-day-picker, react-hook-form, react-i18next, react-resizable-panels, size-limit, sonner, storybook, tailwind-merge, tailwindcss, tslog, tw-animate-css, typescript-eslint, vaul, vite, vite-plugin-dts, vitest, wait-on, zustand

**Suggested fix:** Remove or replace with an allowlisted package.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-008` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-008` — [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-008` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-008` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-013` — [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md)

> Missing required paths: entities, schemas

**Suggested fix:** Add the missing workflow or config files.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-013` — [`packages/eslint-plugin-ui-kit-rules/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/README.md)

> Missing required paths: entities, schemas

**Suggested fix:** Add the missing workflow or config files.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-013` — [`packages/ui-kit/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/README.md)

> Missing required paths: entities, schemas

**Suggested fix:** Add the missing workflow or config files.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-013` — [`packages/ui-kit/src/components/ui/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/components/ui/README.md)

> Missing required paths: entities, schemas

**Suggested fix:** Add the missing workflow or config files.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-013` — [`packages/ui-kit/src/i18n/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/i18n/README.md)

> Missing required paths: entities, schemas

**Suggested fix:** Add the missing workflow or config files.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-014` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-014` — [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-014` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-014` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Missing required root file: tsconfig.json

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-016` — [`.nvmrc`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/.nvmrc)

> Missing required line(s) from template: 20

**Suggested fix:** Add the missing lines to this file (see template REFERENCE block).

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/eslint-plugin-ui-kit-rules/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/README.md)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/eslint-plugin-ui-kit-rules/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/eslint-plugin-ui-kit-rules/package.json)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/ui-kit/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/README.md)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/ui-kit/src/components/ui/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/components/ui/README.md)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-017` — [`packages/ui-kit/src/i18n/README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/src/i18n/README.md)

> Missing required root file: tsconfig.json
> Missing required root file: .prettierrc
> Missing required root subfolder: src

**Suggested fix:** Add the missing required files and subfolders at repo root.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-GOV-019` — [`README.md`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/README.md)

> Missing required README sections: "overview", "development", "architecture", "related repos"

**Suggested fix:** Add the missing section headings. See entities/templates/docs/README.skeleton.md for the expected structure.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts)

> Lines [11-12](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts#L11-L12): Single shared database file path 'DB_PATH = join(__dirname, '../../database.sqlite')' and global singleton database connection 'let db: Database | null = null;'. Lines [21-45](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts#L21-L45): initializeDatabase() creates a single shared database instance. Lines [50-55](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/connection.ts#L50-L55): getDatabase() returns the same shared database connection for all tenants. All query functions (runQuery, getAllQuery, getQuery) operate on the same shared database without any tenant isolation.

**Suggested fix:** Implement tenant-specific database connections by: 1) Accept tenant_id parameter in database functions, 2) Create separate database files per tenant (e.g., `database_${tenantId}.sqlite`), 3) Maintain a Map<tenantId, Database> for tenant-specific connections, 4) Ensure all queries include tenant_id scoping, 5) Replace global singleton pattern with tenant-aware connection management

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/queries.ts)

> All queries in CustomerQueries and UserQueries classes lack tenant_id scoping. Examples: 'SELECT * FROM customers WHERE id = ?' (line ~47), 'SELECT COUNT(*) as count FROM customers' (line ~28), 'INSERT INTO customers...' (line ~56), 'SELECT * FROM users WHERE id = ?' (line ~141). No tenant_id parameters are included in any WHERE clauses or INSERT statements, indicating shared database access across tenants.

**Suggested fix:** Add tenant_id parameter to all query methods and include tenant_id in all WHERE clauses and INSERT statements. Example: Change 'SELECT * FROM customers WHERE id = ?' to 'SELECT * FROM customers WHERE id = ? AND tenant_id = ?'. Ensure all foreign keys include tenant_id columns and all operations are scoped to the authenticated tenant.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/database/types.ts)

> Database entity interfaces Customer and User lack tenant_id fields. All entity types (Customer, User) and their corresponding input types (CreateCustomerInput, CreateUserInput, UpdateCustomerInput) are missing tenant isolation fields, which violates the requirement that all queries must be tenant-scoped and foreign keys must include tenant_id.

**Suggested fix:** Add tenant_id field to all entity interfaces (Customer, User) and their corresponding input/update types. For example: Customer interface should include 'tenant_id: string;', CreateCustomerInput should include 'tenant_id: string;', and UpdateCustomerInput should include 'tenant_id?: string;'. This ensures all database operations are properly scoped to individual tenants.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/types/Customer.ts`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/src/types/Customer.ts)

> Customer interface lacks tenant_id field. The interface defines customer data structure without any tenant scoping mechanism.

**Suggested fix:** Add tenant_id field to Customer interface to ensure all customer records are properly scoped to their respective tenants: export interface Customer { id: string; tenant_id: string; name: string; ... }

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-010` — [`package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/package.json)

> Multiple third-party dependencies present including @radix-ui components, @tanstack/react-table, lucide-react, and various development tools. No explicit approval documentation or security review artifacts visible in package.json.

**Suggested fix:** Add metadata fields to document approval status for third-party dependencies, maintain an allowlist of approved packages, and ensure all third-party packages have undergone required security and quality review before inclusion in SaaS builds.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-010` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/showcase/package.json)

> Multiple third-party dependencies without explicit approval documentation: @faker-js/faker, @hookform/resolvers, bcryptjs, react-hook-form, react-router, react-router-dom, sql.js, zod, zustand in dependencies section

**Suggested fix:** Document explicit approval for third-party dependencies through security and quality review process, or move non-essential third-party packages to devDependencies if they're not part of the SaaS runtime. Consider replacing third-party runtime dependencies with approved internal alternatives where possible.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-010` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/8076a329acfd/packages/ui-kit/package.json)

> Multiple third-party extensions included without evidence of explicit approval: @radix-ui/* components (25+ packages), @tanstack/react-table, @codemirror/*, @sentry/*, cmdk, embla-carousel-react, i18next, marked, react-day-picker, sonner, vaul, zustand. No approval documentation, security review evidence, or allowlist configuration found in package.json.

**Suggested fix:** Document explicit approval for all third-party dependencies through: 1) Add approval metadata to package.json indicating security review completion, 2) Pin exact versions instead of range versions (^), 3) Create allowlist configuration section with approval status and review dates, 4) Provide evidence of Core SDK contract compliance for each extension, 5) Document operational risk acceptance for each third-party component.

</details>
