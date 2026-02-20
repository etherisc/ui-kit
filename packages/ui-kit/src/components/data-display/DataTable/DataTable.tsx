import React, { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  ExpandedState,
  ColumnPinningState,
  Table,
  useReactTable,
  PaginationState,
  Updater,
  Row,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronRight } from "lucide-react";
import { cn } from "../../../utils";
import { DataTablePagination } from "./DataTablePagination";

export interface PaginationConfig {
  pageSize?: number;
  showSizeSelector?: boolean;
  showPageInfo?: boolean;
  showNavigation?: boolean;
  pageSizeOptions?: number[];
  enableFastNavigation?: boolean;
  enableJumpToPage?: boolean;
}

interface ColumnMeta {
  className?: string;
}

export interface DataTableProps<TData extends object, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  className?: string;

  /** @deprecated Use pagination.pageSize instead */
  pageSize?: number;

  /** @default true */
  enableResizing?: boolean;
  /** @default 'onChange' */
  columnResizeMode?: ColumnResizeMode;
  /** @default true */
  enableSorting?: boolean;
  /** @default false */
  enableFiltering?: boolean;
  /** @default false */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /** @default false */
  enableExpanding?: boolean;
  /** @default false */
  enableColumnPinning?: boolean;

  manualPagination?: boolean;
  pageCount?: number;
  rowCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onExpandedChange?: (expanded: ExpandedState) => void;

  state?: {
    pagination?: PaginationState;
    rowSelection?: RowSelectionState;
    columnFilters?: ColumnFiltersState;
    columnVisibility?: VisibilityState;
    expanded?: ExpandedState;
    columnPinning?: ColumnPinningState;
  };

  initialState?: {
    pagination?: Partial<PaginationState>;
    columnVisibility?: VisibilityState;
    columnPinning?: ColumnPinningState;
    expanded?: ExpandedState;
  };

  pagination?: PaginationConfig | false;
  loading?: boolean;
  enableKeyboardShortcuts?: boolean;

  /** Accessor for sub-rows in tree data */
  getSubRows?: (row: TData) => TData[] | undefined;

  /** Custom empty state content */
  emptyContent?: React.ReactNode;

  /** Toolbar content rendered above the table */
  toolbar?: (table: Table<TData>) => React.ReactNode;
}

export const DataTable = React.memo(
  <TData extends object, TValue = unknown>({
    data,
    columns,
    className,
    pageSize = 10,
    enableResizing = true,
    columnResizeMode = "onChange",
    enableSorting = true,
    enableFiltering = false,
    enableRowSelection = false,
    enableExpanding = false,
    enableColumnPinning = false,
    manualPagination = false,
    pageCount,
    rowCount,
    onPaginationChange,
    onRowSelectionChange,
    onColumnFiltersChange,
    onExpandedChange,
    state,
    initialState,
    pagination,
    loading = false,
    enableKeyboardShortcuts = true,
    getSubRows,
    emptyContent,
    toolbar,
  }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnSizing, setColumnSizing] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
      state?.columnFilters ?? [],
    );
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      state?.columnVisibility ?? initialState?.columnVisibility ?? {},
    );
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(
      state?.rowSelection ?? {},
    );
    const [expanded, setExpanded] = useState<ExpandedState>(
      state?.expanded ?? initialState?.expanded ?? {},
    );
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
      state?.columnPinning ?? initialState?.columnPinning ?? {},
    );

    const memoizedColumns = useMemo(() => columns, [columns]);

    // Smart pagination defaults
    const smartPaginationConfig = useMemo((): PaginationConfig | false => {
      if (pagination === false) return false;
      if (pagination) {
        const configPageSize = pagination.pageSize ?? pageSize;
        const defaultOptions = [10, 25, 50, 100];
        const options = pagination.pageSizeOptions ?? defaultOptions;
        const uniqueOptions = [...new Set([...options, configPageSize])];
        const pageSizeOptions = uniqueOptions.sort((a, b) => a - b);
        return { ...pagination, pageSize: configPageSize, pageSizeOptions };
      }

      if (data.length <= 15) return false;

      const defaultOptions = [10, 25, 50, 100];
      const uniqueOptions = [...new Set([...defaultOptions, pageSize])];
      const pageSizeOptions = uniqueOptions.sort((a, b) => a - b);

      return {
        pageSize,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions,
        enableFastNavigation: data.length > 100,
        enableJumpToPage: data.length > 200,
      };
    }, [pagination, data.length, pageSize]);

    const isControlledPagination = !!state?.pagination;

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

    const configPageSize =
      smartPaginationConfig !== false ? smartPaginationConfig.pageSize : null;

    const tableKey = useMemo(() => {
      if (isControlledPagination) return "controlled";
      const keyPageSize = configPageSize ?? pageSize;
      return `uncontrolled-${keyPageSize}`;
    }, [isControlledPagination, configPageSize, pageSize]);

    const paginationState = isControlledPagination
      ? state.pagination
      : undefined;

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

    const handleRowSelectionChange = useCallback(
      (updaterOrValue: Updater<RowSelectionState>) => {
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(rowSelection)
            : updaterOrValue;
        setRowSelection(newValue);
        onRowSelectionChange?.(newValue);
      },
      [rowSelection, onRowSelectionChange],
    );

    const handleColumnFiltersChange = useCallback(
      (updaterOrValue: Updater<ColumnFiltersState>) => {
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(columnFilters)
            : updaterOrValue;
        setColumnFilters(newValue);
        onColumnFiltersChange?.(newValue);
      },
      [columnFilters, onColumnFiltersChange],
    );

    const handleExpandedChange = useCallback(
      (updaterOrValue: Updater<ExpandedState>) => {
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(expanded)
            : updaterOrValue;
        setExpanded(newValue);
        onExpandedChange?.(newValue);
      },
      [expanded, onExpandedChange],
    );

    const table = useReactTable({
      data,
      columns: memoizedColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel:
        smartPaginationConfig !== false ? getPaginationRowModel() : undefined,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      ...(enableFiltering
        ? {
            getFilteredRowModel: getFilteredRowModel(),
            onColumnFiltersChange: handleColumnFiltersChange,
          }
        : {}),
      ...(enableExpanding || getSubRows
        ? {
            getExpandedRowModel: getExpandedRowModel(),
            onExpandedChange: handleExpandedChange,
          }
        : {}),

      manualPagination,
      pageCount: pageCount ?? (manualPagination ? -1 : undefined),
      initialState: tableInitialState,

      state: {
        sorting,
        columnSizing,
        columnFilters,
        columnVisibility,
        rowSelection,
        expanded,
        columnPinning,
        ...(isControlledPagination && smartPaginationConfig !== false
          ? { pagination: paginationState }
          : {}),
      },

      onColumnSizingChange: setColumnSizing,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: handleRowSelectionChange,
      onColumnPinningChange: setColumnPinning,

      ...(isControlledPagination && smartPaginationConfig !== false
        ? { onPaginationChange: handlePaginationChange }
        : {}),

      enableSorting,
      enableColumnResizing: enableResizing,
      columnResizeMode,
      enableRowSelection,
      enableColumnPinning,
      getSubRows,
    });

    const shouldShowPagination = smartPaginationConfig !== false;
    const currentRows = table.getRowModel().rows;

    const tableRows = useMemo(() => {
      if (loading) {
        return (
          <tr>
            <td colSpan={memoizedColumns.length} className="h-24 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
                Loading...
              </div>
            </td>
          </tr>
        );
      }

      if (!currentRows.length) {
        return (
          <tr>
            <td colSpan={memoizedColumns.length} className="h-24 text-center">
              {emptyContent ?? (
                <span className="text-muted-foreground">No results.</span>
              )}
            </td>
          </tr>
        );
      }

      return currentRows.map((row) => (
        <tr
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
          className={cn(
            "border-b transition-colors hover:bg-muted/50",
            row.getIsSelected() && "bg-muted",
          )}
        >
          {row.getVisibleCells().map((cell) => {
            const isPinned = cell.column.getIsPinned();
            return (
              <td
                key={cell.id}
                className={cn(
                  "p-4",
                  isPinned && "sticky bg-background z-10",
                  isPinned === "left" && "left-0",
                  isPinned === "right" && "right-0",
                  (cell.column.columnDef.meta as ColumnMeta)?.className,
                )}
                style={
                  isPinned
                    ? {
                        left:
                          isPinned === "left"
                            ? cell.column.getStart("left")
                            : undefined,
                        right:
                          isPinned === "right"
                            ? cell.column.getAfter("right")
                            : undefined,
                      }
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ));
    }, [currentRows, memoizedColumns.length, loading, emptyContent]);

    const headerGroups = table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const isPinned = header.column.getIsPinned();
          return (
            <th
              key={header.id}
              style={{
                width: header.getSize(),
                position: "relative",
                ...(isPinned
                  ? {
                      position: "sticky",
                      zIndex: 20,
                      left:
                        isPinned === "left"
                          ? header.column.getStart("left")
                          : undefined,
                      right:
                        isPinned === "right"
                          ? header.column.getAfter("right")
                          : undefined,
                    }
                  : {}),
              }}
              className={cn(
                "h-12 px-4 text-left align-middle font-medium text-foreground",
                isPinned && "bg-muted",
              )}
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
                    "absolute right-0 top-0 h-full w-4 cursor-col-resize select-none group",
                    "flex items-center justify-center",
                  )}
                  style={{ userSelect: "none" }}
                >
                  <div
                    className={cn(
                      "h-full w-px transition-colors",
                      "bg-border group-hover:bg-primary group-active:bg-primary",
                      header.column.getIsResizing() && "bg-primary",
                    )}
                  />
                </div>
              )}
            </th>
          );
        })}
      </tr>
    ));

    return (
      <div key={tableKey} className="w-full flex flex-col gap-4">
        {toolbar && toolbar(table)}

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

/**
 * Helper to create a selection checkbox column.
 * Usage: add selectionColumn<MyType>() as the first column.
 */
export function selectionColumn<
  TData extends object,
>(): ColumnDef<TData, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        ref={(el) => {
          if (el) el.indeterminate = table.getIsSomePageRowsSelected();
        }}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all"
        className="h-4 w-4 rounded border-input"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
        className="h-4 w-4 rounded border-input"
      />
    ),
    size: 40,
    enableSorting: false,
    enableResizing: false,
  };
}

/**
 * Helper to create an expand/collapse column for tree data.
 * Usage: add expandColumn<MyType>() as the first column (or after selection).
 */
export function expandColumn<
  TData extends object,
>(): ColumnDef<TData, unknown> {
  return {
    id: "expand",
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button
          type="button"
          onClick={row.getToggleExpandedHandler()}
          className="p-1 rounded hover:bg-muted transition-colors"
          aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
          style={{ paddingLeft: `${row.depth * 16}px` }}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              row.getIsExpanded() && "rotate-90",
            )}
          />
        </button>
      ) : (
        <span style={{ paddingLeft: `${row.depth * 16 + 24}px` }} />
      ),
    size: 40,
    enableSorting: false,
    enableResizing: false,
  };
}
