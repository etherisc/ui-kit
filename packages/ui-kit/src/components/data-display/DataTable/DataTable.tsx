import React, { useState, useCallback, useMemo } from "react";
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
} from "@tanstack/react-table";
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

    // Memoize columns to prevent re-renders when parent re-renders
    const memoizedColumns = useMemo(() => columns, [columns]);

    // Smart pagination defaults based on data size
    const smartPaginationConfig = useMemo((): PaginationConfig | false => {
      if (pagination === false) return false;
      if (pagination) return pagination;

      // Auto-detect pagination strategy
      if (data.length <= 15) {
        return false; // No pagination for small datasets
      }

      return {
        pageSize: pageSize,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100],
        enableFastNavigation: data.length > 100,
        enableJumpToPage: data.length > 200,
      };
    }, [pagination, data.length, pageSize]);

    // Initialize pagination state
    const [internalPaginationState, setInternalPaginationState] =
      useState<PaginationState>(() => ({
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize:
          initialState?.pagination?.pageSize ??
          (smartPaginationConfig !== false
            ? smartPaginationConfig.pageSize
            : undefined) ??
          pageSize,
      }));

    // Use controlled pagination state if provided, otherwise use internal state
    const paginationState = state?.pagination ?? internalPaginationState;

    // Handle pagination change
    const handlePaginationChange = useCallback(
      (
        updaterOrValue:
          | PaginationState
          | ((old: PaginationState) => PaginationState),
      ) => {
        const newPaginationState =
          typeof updaterOrValue === "function"
            ? updaterOrValue(paginationState)
            : updaterOrValue;

        // Update internal state if not controlled
        if (!state?.pagination) {
          setInternalPaginationState(newPaginationState);
        }

        // Call external callback if provided
        onPaginationChange?.(newPaginationState);
      },
      [paginationState, state?.pagination, onPaginationChange],
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

      // State management
      state: {
        sorting,
        pagination:
          smartPaginationConfig !== false ? paginationState : undefined,
      },

      // Callbacks
      onPaginationChange:
        smartPaginationConfig !== false ? handlePaginationChange : undefined,

      // Feature flags
      enableSorting,
      enableColumnResizing: enableResizing,
      columnResizeMode,
    });

    // Don't render pagination if disabled
    const shouldShowPagination = smartPaginationConfig !== false;

    // Memoize the table rows to prevent unnecessary re-renders
    const tableRows = useMemo(() => {
      const rows = table.getRowModel().rows;

      if (!rows.length) {
        return (
          <tr>
            <td colSpan={memoizedColumns.length} className="h-24 text-center">
              No results.
            </td>
          </tr>
        );
      }

      return rows.map((row) => (
        <tr
          key={row.id}
          className="border-b transition-colors hover:bg-base-100/50"
        >
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="p-4">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ));
    }, [table.getRowModel().rows, memoizedColumns.length]);

    // Memoize header groups to prevent unnecessary re-renders
    const headerGroups = useMemo(() => {
      return table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{
                width: header.getSize(),
                position: "relative",
              }}
              className="h-12 px-4 text-left align-middle font-medium text-base-content"
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
                  {{
                    asc: <ArrowUpIcon className="h-4 w-4" />,
                    desc: <ArrowDownIcon className="h-4 w-4" />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
              {enableResizing && header.column.getCanResize() && (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={cn(
                    "absolute right-0 top-0 h-full w-1 cursor-col-resize",
                    header.column.getIsResizing()
                      ? "bg-primary"
                      : "bg-base-300",
                  )}
                />
              )}
            </th>
          ))}
        </tr>
      ));
    }, [table.getHeaderGroups(), enableResizing]);

    return (
      <div className="w-full flex flex-col gap-4">
        <div className="rounded-md border overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className={cn("w-full caption-bottom text-sm", className)}>
              <thead className="border-b bg-base-200">{headerGroups}</thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>

        {shouldShowPagination && (
          <DataTablePagination
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

// Icons for the table
function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
