import React, { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  PaginationState,
  Updater,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../../../utils";
import { DataTablePagination } from "./DataTablePagination";

// Enhanced pagination configuration interface
export interface PaginationConfig {
  pageSize?: number;
  showSizeSelector?: boolean;
  showPageInfo?: boolean;
  showNavigation?: boolean;
  pageSizeOptions?: number[];
  enableFastNavigation?: boolean;
  enableJumpToPage?: boolean;
}

// Extended meta interface for column definitions
interface ColumnMeta {
  className?: string;
}

export interface DataTableProps<TData extends object, TValue = unknown> {
  /**
   * The data to display in the table
   */
  data: TData[];

  /**
   * The columns configuration for the table
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Additional class names to apply to the table
   */
  className?: string;

  /**
   * The number of rows to display per page
   * @default 10
   * @deprecated Use pagination.pageSize instead
   */
  pageSize?: number;

  /**
   * Whether to enable column resizing
   * @default true
   */
  enableResizing?: boolean;

  /**
   * The resize mode for the columns
   * @default 'onChange'
   */
  columnResizeMode?: ColumnResizeMode;

  /**
   * Whether to enable sorting
   * @default true
   */
  enableSorting?: boolean;

  // TanStack Table server-side pagination props
  /**
   * Enable manual pagination for server-side pagination
   * When true, the table will not automatically paginate rows using getPaginationRowModel()
   * and instead will expect you to manually paginate in your data fetching process
   * @default false
   */
  manualPagination?: boolean;

  /**
   * The total number of pages available (for server-side pagination)
   * Use -1 to indicate unknown page count
   */
  pageCount?: number;

  /**
   * The total number of rows available (for server-side pagination)
   */
  rowCount?: number;

  /**
   * Callback fired when pagination state changes
   * Use this to fetch new data based on the current page and page size
   */
  onPaginationChange?: (pagination: PaginationState) => void;

  /**
   * Controlled pagination state
   * When provided, the table pagination will be controlled by this state
   */
  state?: {
    pagination?: PaginationState;
  };

  /**
   * Initial pagination state
   * Only used when pagination state is not controlled
   */
  initialState?: {
    pagination?: Partial<PaginationState>;
  };

  /**
   * Enhanced pagination configuration
   * Set to false to disable pagination completely
   * @default Smart defaults based on data size
   */
  pagination?: PaginationConfig | false;

  /**
   * Loading state for the table
   * When true, shows loading indicators in pagination controls
   * @default false
   */
  loading?: boolean;

  /**
   * Enable keyboard shortcuts for pagination navigation
   * @default true
   */
  enableKeyboardShortcuts?: boolean;
}

/**
 * A data table component with enhanced pagination and TanStack Table v8 compatibility
 * Supports both client-side and server-side pagination with rich navigation controls
 */
export const DataTable = React.memo(
  <TData extends object, TValue = unknown>({
    data,
    columns,
    className,
    pageSize = 10,
    enableResizing = true,
    columnResizeMode = "onChange",
    enableSorting = true,
    manualPagination = false,
    pageCount,
    rowCount, // TODO: Will be used for pagination info display in Phase 2
    onPaginationChange,
    state,
    initialState,
    pagination,
    loading = false, // TODO: Will be used for loading states in Phase 3
    enableKeyboardShortcuts = true,
  }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnSizing, setColumnSizing] = useState({});

    // Memoize columns to prevent re-renders when parent re-renders
    const memoizedColumns = useMemo(() => columns, [columns]);

    // Smart pagination defaults based on data size
    const smartPaginationConfig = useMemo((): PaginationConfig | false => {
      if (pagination === false) return false;
      if (pagination) {
        // Ensure pageSize is in pageSizeOptions to prevent dropdown sync issues
        const configPageSize = pagination.pageSize ?? pageSize;
        const defaultOptions = [10, 25, 50, 100];
        const options = pagination.pageSizeOptions ?? defaultOptions;

        // Deduplicate and ensure pageSize is in options
        const uniqueOptions = [...new Set([...options, configPageSize])];
        const pageSizeOptions = uniqueOptions.sort((a, b) => a - b);

        return {
          ...pagination,
          pageSize: configPageSize,
          pageSizeOptions,
        };
      }

      // Auto-detect pagination strategy
      if (data.length <= 15) {
        return false; // No pagination for small datasets
      }

      // Ensure default pageSize is in options and deduplicate
      const defaultOptions = [10, 25, 50, 100];
      const uniqueOptions = [...new Set([...defaultOptions, pageSize])];
      const pageSizeOptions = uniqueOptions.sort((a, b) => a - b);

      return {
        pageSize: pageSize,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions,
        enableFastNavigation: data.length > 100,
        enableJumpToPage: data.length > 200,
      };
    }, [pagination, data.length, pageSize]);

    // Follow TanStack Table's proper patterns for controlled vs uncontrolled state
    const isControlledPagination = !!state?.pagination;

    // Build proper initialState for TanStack Table
    const tableInitialState = useMemo(
      () => ({
        ...initialState,
        pagination: {
          pageIndex: initialState?.pagination?.pageIndex ?? 0,
          pageSize:
            initialState?.pagination?.pageSize ??
            (smartPaginationConfig !== false
              ? smartPaginationConfig.pageSize
              : undefined) ??
            pageSize,
        },
      }),
      [initialState, pageSize, smartPaginationConfig],
    );

    // Extract config pageSize for dependency array
    const configPageSize =
      smartPaginationConfig !== false ? smartPaginationConfig.pageSize : null;

    // Create table key for forcing recreation when essential config changes
    const tableKey = useMemo(() => {
      if (isControlledPagination) return "controlled";

      // For uncontrolled tables, only include pageSize in key (not full config)
      const keyPageSize = configPageSize ?? pageSize;
      return `uncontrolled-${keyPageSize}`;
    }, [isControlledPagination, configPageSize, pageSize]);

    // For controlled pagination, use the provided state and change handler
    // For uncontrolled pagination, let TanStack Table manage it with initialState
    const paginationState = isControlledPagination
      ? state.pagination
      : undefined;

    // Create proper change handler that works with TanStack Table's updater pattern
    const handlePaginationChange = useCallback(
      (updaterOrValue: Updater<PaginationState>) => {
        if (!isControlledPagination || !onPaginationChange) return;

        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(paginationState!)
            : updaterOrValue;
        onPaginationChange(newValue);
      },
      [isControlledPagination, onPaginationChange, paginationState],
    );

    // TanStack Table configuration
    const table = useReactTable({
      data,
      columns: memoizedColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel:
        smartPaginationConfig !== false ? getPaginationRowModel() : undefined,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),

      // Enhanced pagination configuration
      manualPagination,
      pageCount: pageCount ?? (manualPagination ? -1 : undefined),

      // Initial state (used for uncontrolled state)
      initialState: tableInitialState,

      // State management (used for controlled state)
      state: {
        sorting,
        columnSizing,
        ...(isControlledPagination && smartPaginationConfig !== false
          ? { pagination: paginationState }
          : {}),
      },

      // Column sizing callbacks
      onColumnSizingChange: setColumnSizing,

      // Callbacks
      ...(isControlledPagination && smartPaginationConfig !== false
        ? { onPaginationChange: handlePaginationChange }
        : {}),

      // Feature flags
      enableSorting,
      enableColumnResizing: enableResizing,
      columnResizeMode,
    });

    // Note: Removed sync effect that was causing state conflicts
    // For uncontrolled pagination, let TanStack Table manage its own state

    // Don't render pagination if disabled
    const shouldShowPagination = smartPaginationConfig !== false;

    // Extract values that should trigger row re-renders
    const currentRows = table.getRowModel().rows;

    // Memoize the table rows to prevent unnecessary re-renders
    const tableRows = useMemo(() => {
      if (!currentRows.length) {
        return (
          <tr>
            <td colSpan={memoizedColumns.length} className="h-24 text-center">
              No results.
            </td>
          </tr>
        );
      }

      return currentRows.map((row) => (
        <tr
          key={row.id}
          className="border-b transition-colors hover:bg-muted/50"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={cn(
                "p-4",
                (cell.column.columnDef.meta as ColumnMeta)?.className,
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ));
    }, [currentRows, memoizedColumns.length]);

    // Generate header groups (not memoized to ensure sorting indicators update)
    const headerGroups = table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            style={{
              width: header.getSize(),
              position: "relative",
            }}
            className="h-12 px-4 text-left align-middle font-medium text-foreground"
          >
            {header.isPlaceholder ? null : (
              <div
                className={cn(
                  "flex items-center gap-2",
                  header.column.getCanSort() && "cursor-pointer select-none",
                )}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() && (
                  <>
                    {{
                      asc: <ChevronUp className="h-4 w-4" />,
                      desc: <ChevronDown className="h-4 w-4" />,
                    }[header.column.getIsSorted() as string] ?? (
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    )}
                  </>
                )}
              </div>
            )}
            {enableResizing && header.column.getCanResize() && (
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={cn(
                  "absolute right-0 top-0 h-full w-2 cursor-col-resize select-none",
                  "bg-muted-foreground/20 hover:bg-primary/70 active:bg-primary transition-colors",
                  header.column.getIsResizing() && "bg-primary",
                )}
                style={{ userSelect: "none" }}
              />
            )}
          </th>
        ))}
      </tr>
    ));

    return (
      <div key={tableKey} className="w-full flex flex-col gap-4">
        <div className="rounded-md border overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className={cn("w-full caption-bottom text-sm", className)}>
              <thead className="border-b bg-muted">{headerGroups}</thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>

        {shouldShowPagination && (
          <DataTablePagination
            key={`pagination-${smartPaginationConfig.pageSize}-${table.getState().pagination.pageSize}`}
            table={table as Table<unknown>}
            config={smartPaginationConfig}
            loading={loading}
            rowCount={rowCount}
            enableKeyboardShortcuts={enableKeyboardShortcuts}
          />
        )}
      </div>
    );
  },
) as <TData extends object, TValue = unknown>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<HTMLDivElement> },
) => React.JSX.Element;
