---
name: fix-compliance
description: Fix compliance findings reported by the automated compliance checker. Use when addressing CON-* rule violations in the compliance report, or when the user mentions compliance issues.
---

# Fix Compliance Findings

## Report Location

The compliance report is at `.compliance/report.md`.
Configuration is at `.compliance/config.yaml`.

## Workflow

1. **Read the report**: Check `.compliance/report.md` for current findings
2. **Identify the rule**: Each finding has a rule ID (e.g. `CON-PFM-009`)
3. **Determine action**:
   - **Fix**: Update the code to comply with the rule
   - **Suppress**: Add to `suppressions` in `.compliance/config.yaml` with justification

## Common Rules

| Rule          | Domain   | What it checks                                                  |
| ------------- | -------- | --------------------------------------------------------------- |
| `CON-DVO-002` | DevOps   | Database role separation, MFA for admin                         |
| `CON-PFM-001` | Platform | Tenant isolation in DB queries                                  |
| `CON-PFM-009` | Platform | Standard API response format `{ success, data, correlationId }` |
| `CON-PFM-010` | Platform | Third-party dependency approval documentation                   |

## Suppression Format

In `.compliance/config.yaml`:

```yaml
suppressions:
  - rule: CON-DVO-002
    paths:
      - "packages/showcase/src/database/**"
    reason: "Showcase DB is for testing/demo only"
```

## API Response Format (CON-PFM-009)

Standard format:

```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  correlationId: string;
}
```

Use `pageSize` (not `limit`), `sort`/`order` (not `sortBy`/`sortOrder`).

## Dependency Approval (CON-PFM-010)

Maintain the register at `docs/dependency-approval.md`.
Add new dependencies with version, license, purpose, and "Approved" status.
