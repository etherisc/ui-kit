# DataTable Migration Guide v0.5.0

This guide shows how to migrate from the basic DataTable component to the new comprehensive pagination architecture.

## Overview

The new DataTable component introduces enterprise-grade pagination features while maintaining 100% backward compatibility. All existing implementations will continue to work without changes.

## Breaking Changes

**None.** This is a completely backward-compatible update.

## New Features

### 1. Smart Pagination Defaults

The component now automatically determines the best pagination strategy:

- **≤15 items**: No pagination (unchanged behavior)
- **>15 items**: Automatic pagination with smart defaults
- **>100 items**: Enables fast navigation (±5 pages)
- **>200 items**: Enables jump-to-page functionality

### 2. Server-Side Pagination Support

Full TanStack Table compatibility for server-side pagination:

```tsx
// NEW: Server-side pagination
<DataTable
  data={currentPageData}
  columns={columns}
  manualPagination={true}
  pageCount={totalPages}
  rowCount={totalRows}
  onPaginationChange={handlePaginationChange}
  loading={isLoading}
/>
```

### 3. Keyboard Navigation

Built-in keyboard shortcuts for power users:

- **Arrow keys**: Previous/Next page
- **Home/End**: First/Last page
- **PageUp/PageDown**: Fast navigation (±5 pages)
- **Ctrl+G**: Focus jump-to-page input
- **Enter/Escape**: Submit/Cancel in jump input

### 4. Rich Pagination Controls

Comprehensive navigation options:

```tsx
// NEW: Rich pagination configuration
<DataTable
  data={data}
  columns={columns}
  pagination={{
    pageSize: 25,
    showSizeSelector: true,
    showPageInfo: true,
    showNavigation: true,
    enableFastNavigation: true,
    enableJumpToPage: true,
    pageSizeOptions: [10, 25, 50, 100],
  }}
  enableKeyboardShortcuts={true}
/>
```

## Migration Examples

### Before (v0.4.x)

```tsx
// Basic usage - still works exactly the same
<DataTable data={users} columns={columns} />

// With page size - still works
<DataTable data={users} columns={columns} pageSize={20} />
```

### After (v0.5.0)

```tsx
// Same basic usage - now with smart pagination
<DataTable data={users} columns={columns} />
// Automatically enables pagination for >15 items

// Enhanced configuration
<DataTable
  data={users}
  columns={columns}
  pagination={{
    pageSize: 20,
    showSizeSelector: true,
    showPageInfo: true,
    enableFastNavigation: true,
    enableJumpToPage: true,
  }}
/>

// Server-side pagination
<DataTable
  data={currentPageUsers}
  columns={columns}
  manualPagination={true}
  pageCount={Math.ceil(totalUsers / pageSize)}
  rowCount={totalUsers}
  onPaginationChange={({ pageIndex, pageSize }) => {
    fetchUsers({ page: pageIndex + 1, limit: pageSize });
  }}
  loading={isLoading}
/>

// Disable pagination entirely
<DataTable
  data={users}
  columns={columns}
  pagination={false}
/>
```

## Configuration Options

### PaginationConfig Interface

```tsx
interface PaginationConfig {
  pageSize?: number; // Items per page
  showSizeSelector?: boolean; // Show rows per page selector
  showPageInfo?: boolean; // Show "Showing X-Y of Z"
  showNavigation?: boolean; // Show pagination controls
  pageSizeOptions?: number[]; // Options for size selector
  enableFastNavigation?: boolean; // ±5 page buttons
  enableJumpToPage?: boolean; // Jump to page input
}
```

### DataTable Props (New/Updated)

```tsx
interface DataTableProps<TData> {
  // Existing props (unchanged)
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number; // DEPRECATED: Use pagination.pageSize
  enableSorting?: boolean;
  enableResizing?: boolean;

  // NEW: Enhanced pagination
  pagination?: PaginationConfig | false;

  // NEW: Server-side pagination (TanStack Table compatibility)
  manualPagination?: boolean;
  pageCount?: number;
  rowCount?: number;
  onPaginationChange?: (state: PaginationState) => void;

  // NEW: UI enhancements
  loading?: boolean;
  enableKeyboardShortcuts?: boolean;
}
```

## Common Migration Patterns

### 1. Basic Client-Side Pagination

```tsx
// Before
<DataTable data={largeDataset} columns={columns} pageSize={25} />

// After (automatic smart defaults)
<DataTable data={largeDataset} columns={columns} />
// Automatically uses pageSize=25 for datasets this size

// After (explicit configuration)
<DataTable
  data={largeDataset}
  columns={columns}
  pagination={{
    pageSize: 25,
    showSizeSelector: true,
    showPageInfo: true,
  }}
/>
```

### 2. Migrating to Server-Side Pagination

```tsx
// Before: Client-side with all data loaded
const AllUsersTable = () => {
  const { data: allUsers } = useQuery(["users"], fetchAllUsers);

  return <DataTable data={allUsers || []} columns={columns} pageSize={20} />;
};

// After: Efficient server-side pagination
const UsersTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isLoading } = useQuery(["users", pagination], () =>
    fetchUsers({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }),
  );

  return (
    <DataTable
      data={data?.users || []}
      columns={columns}
      manualPagination={true}
      pageCount={data?.totalPages}
      rowCount={data?.totalCount}
      onPaginationChange={setPagination}
      loading={isLoading}
      pagination={{
        pageSize: pagination.pageSize,
        showSizeSelector: true,
        showPageInfo: true,
        enableFastNavigation: true,
        enableJumpToPage: true,
      }}
    />
  );
};
```

### 3. Custom Pagination Configuration

```tsx
// Small admin tables - disable pagination
<DataTable
  data={settings}
  columns={settingsColumns}
  pagination={false}
/>

// Large datasets - full features
<DataTable
  data={reports}
  columns={reportColumns}
  pagination={{
    pageSize: 50,
    showSizeSelector: true,
    showPageInfo: true,
    enableFastNavigation: true,
    enableJumpToPage: true,
    pageSizeOptions: [25, 50, 100, 200],
  }}
  enableKeyboardShortcuts={true}
/>

// Mobile-friendly - simplified controls
<DataTable
  data={mobileData}
  columns={mobileColumns}
  pagination={{
    pageSize: 10,
    showNavigation: true,
    showPageInfo: false,
    enableFastNavigation: false,
    enableJumpToPage: false,
  }}
/>
```

## Performance Considerations

### Smart Defaults Strategy

The component uses intelligent defaults based on data size:

| Data Size | Pagination | Page Size | Fast Nav | Jump To Page |
| --------- | ---------- | --------- | -------- | ------------ |
| ≤15 items | Disabled   | N/A       | No       | No           |
| 16-100    | Enabled    | 25        | No       | No           |
| 101-200   | Enabled    | 25        | Yes      | No           |
| >200      | Enabled    | 25        | Yes      | Yes          |

### Optimization Tips

1. **Use server-side pagination** for datasets >1000 items
2. **Enable smart defaults** for most use cases
3. **Disable pagination** for small reference tables
4. **Customize page sizes** based on your content density

## Accessibility Improvements

The new pagination includes comprehensive accessibility features:

- **ARIA labels** for all pagination controls
- **Keyboard navigation** with visual focus indicators
- **Screen reader announcements** for page changes
- **High contrast** support for all interactive elements

## Troubleshooting

### Common Issues

**Q: My table doesn't show pagination anymore**
A: Tables with ≤15 items automatically disable pagination. Use `pagination={{ pageSize: 10 }}` to force enable.

**Q: Keyboard shortcuts aren't working**
A: Set `enableKeyboardShortcuts={true}` or check for conflicting event handlers.

**Q: Server-side pagination isn't loading**
A: Ensure `manualPagination={true}` and implement `onPaginationChange` handler.

**Q: Page size selector shows wrong options**
A: Customize with `pagination={{ pageSizeOptions: [10, 25, 50] }}`.

### Debug Mode

Enable debug logging to troubleshoot pagination issues:

```tsx
<DataTable
  data={data}
  columns={columns}
  pagination={
    {
      // ... your config
    }
  }
  // Add this for debugging
  debugTable={process.env.NODE_ENV === "development"}
/>
```

## TypeScript Support

All new features include full TypeScript support:

```tsx
import type {
  PaginationConfig,
  PaginationState,
  DataTableProps,
} from "@etherisc/ui-kit";

// Type-safe pagination handler
const handlePaginationChange = (state: PaginationState) => {
  // state.pageIndex and state.pageSize are properly typed
  console.log(`Page ${state.pageIndex + 1}, Size ${state.pageSize}`);
};

// Type-safe configuration
const paginationConfig: PaginationConfig = {
  pageSize: 25,
  showSizeSelector: true,
  enableFastNavigation: true,
};
```

## Support

For questions or issues:

1. Check the [DataTable Storybook examples](/.storybook)
2. Review this migration guide
3. Open an issue in the UI Kit repository

---

_This migration guide covers DataTable v0.5.0. For the latest documentation, see the component's Storybook stories._
