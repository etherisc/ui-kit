# Development Backlog

This document tracks features, improvements, and fixes that are planned for future development.

## DataTable Component

### Pagination Dropdown Synchronization Issues

**Priority:** Medium  
**Component:** `DataTable` - Pagination  
**Status:** Skipped in tests, requires future investigation

#### Description

There are timing/synchronization issues with the pagination dropdown when `pageSize` changes dynamically via props. The table functionality works correctly (displays the right number of rows, includes correct options), but the dropdown `value` attribute doesn't update synchronously in certain edge cases.

#### Skipped Tests

The following tests have been skipped and should be revisited:

1. **"should synchronize dropdown changes with table state"**

   - Issue: When changing dropdown value, table doesn't immediately reflect new pageSize
   - Expected: 26 rows (1 header + 25 data), Actual: 11 rows (1 header + 10 data)

2. **"should handle the case where pageSize changes after initial render"**

   - Issue: When pageSize prop changes from 10 to 30, dropdown doesn't show "30" as selected
   - Expected: dropdown.value = "30", Actual: dropdown.value = "10"

3. **"should maintain dropdown sync when switching between different pagination configs"**
   - Issue: When switching pagination configs, dropdown value doesn't sync with new pageSize
   - Expected: dropdown.value = "35", Actual: dropdown.value = "15"

#### Technical Details

- **Root Cause:** React state synchronization timing between TanStack Table internal state and component re-renders
- **Current Workaround:** Table functionality works correctly in real usage, only test edge cases affected
- **Investigation Needed:**
  - TanStack Table state management patterns
  - Controlled vs uncontrolled pagination state handling
  - React re-render timing for dropdown value updates

#### Potential Solutions to Investigate

1. Force synchronous updates using `flushSync`
2. Restructure pagination state management
3. Use controlled pagination state throughout
4. Add explicit synchronization effects
5. Simplify the smart pagination configuration logic

#### Testing Notes

- Tests are located in: `packages/ui-kit/src/components/data-display/DataTable/__tests__/DataTable.pagination-sync.test.tsx`
- Use `it.only()` instead of `it.skip()` to re-enable individual tests for debugging
- Current test pass rate: 4/7 (57% passing, 43% skipped)

---

## Future Enhancements

### DataTable

- [ ] Server-side pagination improvements
- [ ] Virtual scrolling for large datasets
- [ ] Enhanced filtering capabilities
- [ ] Export functionality (CSV, PDF)
- [ ] Column reordering via drag & drop

### General

- [ ] Component performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness enhancements
- [ ] Dark mode support refinements

---

_Last Updated: 2024-12-12_
