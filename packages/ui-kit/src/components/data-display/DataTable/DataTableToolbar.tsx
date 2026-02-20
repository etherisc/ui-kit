import React, { useState, useCallback } from "react";
import type { Table, Column } from "@tanstack/react-table";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../../../utils";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /** Column ID to use for global-style text filtering */
  filterColumn?: string;
  /** Placeholder text for the filter input */
  filterPlaceholder?: string;
  /** Show the column visibility dropdown */
  showColumnVisibility?: boolean;
  /** Extra toolbar content (buttons, dropdowns, etc.) */
  children?: React.ReactNode;
  className?: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
  showColumnVisibility = true,
  children,
  className,
}: DataTableToolbarProps<TData>) {
  const [colVisOpen, setColVisOpen] = useState(false);

  const filterValue =
    filterColumn != null
      ? (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
      : "";

  const handleFilterChange = useCallback(
    (value: string) => {
      if (filterColumn != null) {
        table.getColumn(filterColumn)?.setFilterValue(value || undefined);
      }
    },
    [table, filterColumn],
  );

  const allColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        col.getCanHide() && col.id !== "select" && col.id !== "expand",
    );

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="flex items-center gap-2 flex-1">
        {filterColumn != null && (
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={filterPlaceholder}
              value={filterValue}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-8 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {filterValue && (
              <button
                type="button"
                onClick={() => handleFilterChange("")}
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        {children}
      </div>

      {showColumnVisibility && allColumns.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setColVisOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle columns"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Columns
          </button>
          {colVisOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setColVisOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[150px] rounded-md border bg-popover p-2 shadow-md">
                {allColumns.map((col: Column<TData, unknown>) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-accent rounded"
                  >
                    <input
                      type="checkbox"
                      checked={col.getIsVisible()}
                      onChange={col.getToggleVisibilityHandler()}
                      className="h-4 w-4 rounded border-input"
                    />
                    {typeof col.columnDef.header === "string"
                      ? col.columnDef.header
                      : col.id}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

DataTableToolbar.displayName = "DataTableToolbar";
