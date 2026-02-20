# ❌ Compliance Report

**Last scan:** 2026-02-20T08:01:26+00:00  
**Baseline commit:** `ed20f2183dc3`

## Summary

| Verdict | Count |
|---------|------:|
| ✅ Pass | 87 |
| ❌ Fail | 6 |
| ⚠️ Warning | 8 |
| ⚠️ Error | 0 |
| ⏭️ Skipped | 472 |
| 🔇 Suppressed | 0 |
| **Total** | **573** |

## Findings

| Rule ID | Location | Criticality | Tier |
|---------|----------|:-----------:|:----:|
| `CON-DVO-002` | [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/types/Auth.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/Auth.ts#L2) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts#L11) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L40) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L7) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-009` | [`packages/showcase/src/data/mockCustomers.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/data/mockCustomers.ts) | ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L22) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-DVO-002` | [`packages/showcase/src/types/ui-kit.d.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/ui-kit.d.ts#L4) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-001` | [`packages/showcase/src/types/Customer.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/Customer.ts) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-009` | [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L67) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/package.json) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/package.json) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |
| `CON-PFM-010` | [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/ui-kit/package.json) | ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) | ![semantic](https://img.shields.io/badge/-semantic-purple?style=flat-square) |

<details>
<summary><strong>Evidence details (14 findings)</strong></summary>

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts)

> The database connection provides unrestricted access with no role separation. All functions (runQuery, getAllQuery, getQuery) can execute any SQL operations including INSERT, UPDATE, DELETE without any access controls. There are no separate database roles (app, migration, audit, admin) and no MFA requirements for administrative access. The connection allows superuser-level operations through direct SQL execution.

**Suggested fix:** Implement separate database connection functions for different roles (app operations, migrations, audit, admin). Create role-based access control where app operations can only execute limited queries, while admin operations require separate authentication. Add MFA verification for administrative database operations. Consider using connection pooling with role-based connections and restrict direct SQL execution based on the calling context.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts)

> The file contains database queries but lacks evidence of proper role separation. All operations (CRUD for customers and users, authentication, admin functions like getAllUsers) appear to use the same database connection without distinct DB roles. No MFA enforcement visible for administrative operations like getAllUsers(). The rule requires separate DB roles: app, migration, audit, admin - but this implementation shows no role differentiation at the database level.

**Suggested fix:** Implement separate database connection pools/users for different operation types: use 'app' role for regular CRUD operations, 'admin' role for getAllUsers(), and ensure MFA is required before executing administrative queries. Consider separating administrative operations into different classes with explicit role checks and MFA validation.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts)

> User role type definition only includes 'admin' | 'user' (lines [22](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L22), [41](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L41), [71](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L71), [79](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L79)) - overly simplistic role model that may not support proper separation of duties for security-critical operations

**Suggested fix:** Expand role model to support separation of duties with more granular roles such as 'payment_creator', 'payment_approver', 'db_app_user', 'db_migration_user', 'db_audit_user', 'db_admin', 'key_admin', etc. Consider implementing a permission-based system instead of simple role enumeration.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/types/Auth.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/Auth.ts)

> Lines [2-6](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/Auth.ts#L2-L6): User interface only defines two roles ('admin' | 'user') which is insufficient for separation of duties. No distinction between security-critical operations like payment creation vs approval, no separate database roles (app, migration, audit, admin), and no MFA enforcement in auth types.

**Suggested fix:** Expand role definitions to enforce separation of duties. Create specific roles like 'payment_creator', 'payment_approver', 'db_app', 'db_migration', 'db_audit', 'db_admin'. Add MFA requirement fields to User interface for administrative roles. Consider role-based permissions matrix instead of simple admin/user dichotomy.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-DVO-002` — [`packages/showcase/src/types/ui-kit.d.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/ui-kit.d.ts)

> Line [4-8](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/ui-kit.d.ts#L4-L8): User interface defines only basic roles 'admin' | 'user' without proper separation of duties for security-critical operations. This overly broad role definition could lead to insufficient access control granularity.

**Suggested fix:** Refine the User role type to support more granular role-based access control with distinct roles for different operations (e.g., 'payment_creator', 'payment_approver', 'db_admin', 'app_user', 'auditor'). Consider using a roles array or more specific role enums that align with separation of duties requirements.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/connection.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts)

> Lines [11-12](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts#L11-L12): Single shared database file path 'DB_PATH = join(__dirname, '../../database.sqlite')' and global singleton database connection 'let db: Database | null = null;'. Lines [21-45](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts#L21-L45): initializeDatabase() creates a single shared database instance. Lines [50-55](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/connection.ts#L50-L55): getDatabase() returns the same shared database connection for all tenants. All query functions (runQuery, getAllQuery, getQuery) operate on the same shared database without any tenant isolation.

**Suggested fix:** Implement tenant-specific database connections by: 1) Accept tenant_id parameter in database functions, 2) Create separate database files per tenant (e.g., `database_${tenantId}.sqlite`), 3) Maintain a Map<tenantId, Database> for tenant-specific connections, 4) Ensure all queries include tenant_id scoping, 5) Replace global singleton pattern with tenant-aware connection management

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/queries.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts)

> All SQL queries lack tenant_id scoping. Examples: 'SELECT * FROM customers WHERE id = ?' (line [40](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L40)), 'SELECT COUNT(*) as count FROM customers' (line [28](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L28)), 'INSERT INTO customers...' (line [48](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L48)), 'DELETE FROM customers WHERE id = ?' (line [97](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L97)), 'SELECT * FROM users WHERE id = ?' (line [142](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/queries.ts#L142)). No tenant isolation is implemented - queries access global tables without tenant filtering.

**Suggested fix:** Add tenant_id parameter to all query methods and include tenant_id in WHERE clauses. Example: 'SELECT * FROM customers WHERE id = ? AND tenant_id = ?'. Modify CREATE operations to include tenant_id. Add tenant_id foreign key constraints to database schema. Ensure connection pool is tenant-specific or queries are always tenant-scoped.

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts)

> Database entity interfaces Customer and User lack tenant_id fields. Lines [7-18](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L7-L18)(Customer interface) and lines [20-26](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L20-L26)(User interface) define database entities without tenant isolation fields. The rule requires 'All queries are tenant-scoped' and 'Foreign keys include tenant_id' but these core entities have no tenant identification.

**Suggested fix:** Add tenant_id field to all database entities. Update Customer interface to include 'tenant_id: string;' and User interface to include 'tenant_id: string;'. Also update all related input types (CreateCustomerInput, CreateUserInput, UpdateCustomerInput) to include tenant_id fields to ensure proper tenant isolation.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-001` — [`packages/showcase/src/types/Customer.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/types/Customer.ts)

> Customer interface lacks tenant_id field. The interface defines customer data structure without any tenant scoping mechanism.

**Suggested fix:** Add tenant_id field to Customer interface to ensure all customer records are properly scoped to their respective tenants: export interface Customer { id: string; tenant_id: string; name: string; ... }

#### ![fail](https://img.shields.io/badge/-FAIL-e05d44?style=flat-square) `CON-PFM-009` — [`packages/showcase/src/data/mockCustomers.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/data/mockCustomers.ts)

> MockCustomerQueries.getCustomers() returns non-standard response format: { customers, total, page, limit, totalPages }. This violates the required standard success format: { success: true, data, correlationId } and uses 'limit' instead of standard 'pageSize' parameter.

**Suggested fix:** Update getCustomers() to return standard format: { success: true, data: { customers: paginatedCustomers, total: mockCustomers.length, page, pageSize: limit, totalPages: Math.ceil(mockCustomers.length / limit) }, correlationId: 'generated-id' }. Also change 'limit' parameter to 'pageSize' to match API conventions.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-009` — [`packages/showcase/src/database/types.ts`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts)

> PaginationOptions uses 'limit' instead of 'pageSize' (line [67](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L67)), and 'sortBy/sortOrder' instead of 'sort/order' (lines [68-69](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L68-L69)). PaginatedResult uses 'limit' instead of 'pageSize' (lines [74](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L74), [76](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/src/database/types.ts#L76)). No API response format types following { success: true, data, correlationId } pattern.

**Suggested fix:** Rename 'limit' to 'pageSize' in PaginationOptions and PaginatedResult. Rename 'sortBy' to 'sort' and 'sortOrder' to 'order'. Add standard API response types like: interface ApiResponse<T> { success: true; data: T; correlationId: string; }

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-010` — [`package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/package.json)

> Multiple third-party dependencies detected in production dependencies: @radix-ui/* (12 packages), @tanstack/react-table, lucide-react, nanoid. These appear to be community/third-party extensions that would be included in SaaS builds without evidence of explicit approval process, security review, or compliance verification.

**Suggested fix:** Implement explicit approval tracking for third-party dependencies. Add documentation or metadata indicating which dependencies have undergone security review, compliance verification, and operational risk acceptance. Consider moving unreviewed third-party packages to a separate approval workflow before inclusion in SaaS builds.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-010` — [`packages/showcase/package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/showcase/package.json)

> Multiple third-party dependencies present: @faker-js/faker, @hookform/resolvers, bcryptjs, react-hook-form, react-router, react-router-dom, sql.js, zod, zustand, daisyui, tailwindcss-animate. These are community/third-party packages that require explicit approval for SaaS inclusion according to the allowlist model.

**Suggested fix:** Verify that all third-party dependencies have undergone the required approval process including: compliance with Core SDK contracts, security and quality review, controlled dependencies, version compatibility pinning, and operational risk acceptance. Document approval status for each third-party package or remove unapproved packages.

#### ![warn](https://img.shields.io/badge/-WARN-dfb317?style=flat-square) `CON-PFM-010` — [`packages/ui-kit/package.json`](https://github.com/etherisc/ui-kit/blob/ed20f2183dc3/packages/ui-kit/package.json)

> Multiple third-party extensions in dependencies and peerDependencies without explicit approval documentation: @radix-ui/* (26 UI components), @tanstack/react-table, @sentry/*, @codemirror/*, marked, dompurify, i18next, zustand, and others. No evidence of security review, compliance verification, or explicit allowlist approval in package.json.

**Suggested fix:** Add explicit approval documentation for all third-party dependencies, ensure security and quality review has been completed, verify Core SDK contract compliance, and maintain an approved allowlist. Consider adding metadata fields or comments indicating approval status and review dates for each third-party dependency.

</details>
