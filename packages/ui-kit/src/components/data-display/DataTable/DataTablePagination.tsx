import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/Pagination/Pagination";
import { cn } from "../../../utils";
import { PaginationConfig } from "./DataTable";

export interface DataTablePaginationProps<TData = unknown> {
  /**
   * The TanStack Table instance
   */
  table: Table<TData>;

  /**
   * Pagination configuration
   */
  config: PaginationConfig;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Total number of rows (for server-side pagination info display)
   */
  rowCount?: number;

  /**
   * Additional class names
   */
  className?: string;

  /**
   * Enable keyboard shortcuts
   * @default true
   */
  enableKeyboardShortcuts?: boolean;
}

/**
 * Enhanced pagination component for DataTable with rich navigation controls and keyboard shortcuts
 */
export const DataTablePagination = <TData = unknown,>({
  table,
  config,
  loading = false,
  rowCount,
  className,
  enableKeyboardShortcuts = true,
}: DataTablePaginationProps<TData>) => {
  const [jumpToPage, setJumpToPage] = useState("");
  const jumpInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  // Extract values for stable dependencies
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRowCount = table.getRowCount();

  // Ensure current pageSize is always available in options
  const availableOptions = useMemo(() => {
    const baseOptions = config.pageSizeOptions || [10, 25, 50, 100];
    const uniqueOptions = [...new Set([...baseOptions, pageSize])];
    const sortedOptions = uniqueOptions.sort((a, b) => a - b);

    return sortedOptions;
  }, [config.pageSizeOptions, pageSize]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const totalRows = rowCount ?? totalRowCount;
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
    return { totalRows, startRow, endRow };
  }, [rowCount, totalRowCount, pageIndex, pageSize]);

  // Generate visible page numbers
  const getVisiblePageNumbers = useCallback(() => {
    const totalPages = pageCount;
    const current = currentPage;
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current <= 4) {
        // Near the beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // Near the end
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("ellipsis");
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, pageCount]);

  // Memoize the visible page numbers to prevent recalculation on every render
  const visiblePageNumbers = useMemo(
    () => getVisiblePageNumbers(),
    [getVisiblePageNumbers],
  );

  // Handle jump to page
  const handleJumpToPage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const pageNumber = parseInt(jumpToPage, 10);
      if (pageNumber >= 1 && pageNumber <= pageCount) {
        table.setPageIndex(pageNumber - 1);
        setJumpToPage("");
        // Blur the input after successful navigation
        if (jumpInputRef.current) {
          jumpInputRef.current.blur();
        }
      }
    },
    [jumpToPage, pageCount, table],
  );

  // Handle fast navigation (±5 pages)
  const handleFastPrevious = useCallback(() => {
    const targetPage = Math.max(0, table.getState().pagination.pageIndex - 5);
    table.setPageIndex(targetPage);
  }, [table]);

  const handleFastNext = useCallback(() => {
    const targetPage = Math.min(
      pageCount - 1,
      table.getState().pagination.pageIndex + 5,
    );
    table.setPageIndex(targetPage);
  }, [table, pageCount]);

  // Keyboard shortcuts
  useEffect(
    function setupKeyboardShortcuts() {
      if (!enableKeyboardShortcuts || loading) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        // Don't interfere with form inputs (except our jump input when specifically handling Ctrl+G)
        const isFormElement =
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement;

        // Handle Ctrl+G for jump-to-page focus
        if (event.ctrlKey && event.key.toLowerCase() === "g") {
          event.preventDefault();
          if (config.enableJumpToPage && jumpInputRef.current) {
            jumpInputRef.current.focus();
            jumpInputRef.current.select();
          }
          return;
        }

        // Skip other shortcuts if user is typing in a form field (except our jump input)
        if (isFormElement && event.target !== jumpInputRef.current) {
          return;
        }

        // Handle Enter in jump-to-page input
        if (event.key === "Enter" && event.target === jumpInputRef.current) {
          event.preventDefault();
          const pageNumber = parseInt(jumpToPage, 10);
          if (pageNumber >= 1 && pageNumber <= pageCount) {
            table.setPageIndex(pageNumber - 1);
            setJumpToPage("");
            // Blur the input after successful navigation
            if (jumpInputRef.current) {
              jumpInputRef.current.blur();
            }
          }
          return;
        }

        // Handle escape in jump-to-page input
        if (event.key === "Escape" && event.target === jumpInputRef.current) {
          setJumpToPage("");
          jumpInputRef.current?.blur();
          return;
        }

        // Navigation shortcuts
        switch (event.key) {
          case "ArrowLeft":
            if (canPreviousPage) {
              event.preventDefault();
              table.previousPage();
            }
            break;
          case "ArrowRight":
            if (canNextPage) {
              event.preventDefault();
              table.nextPage();
            }
            break;
          case "Home":
            if (canPreviousPage) {
              event.preventDefault();
              table.setPageIndex(0);
            }
            break;
          case "End":
            if (canNextPage) {
              event.preventDefault();
              table.setPageIndex(pageCount - 1);
            }
            break;
          case "PageUp":
            if (config.enableFastNavigation && currentPage > 5) {
              event.preventDefault();
              handleFastPrevious();
            }
            break;
          case "PageDown":
            if (config.enableFastNavigation && currentPage <= pageCount - 5) {
              event.preventDefault();
              handleFastNext();
            }
            break;
        }
      };

      // Add event listener to document for global shortcuts
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [
      enableKeyboardShortcuts,
      loading,
      canPreviousPage,
      canNextPage,
      currentPage,
      pageCount,
      config.enableFastNavigation,
      config.enableJumpToPage,
      table,
      jumpToPage,
      handleFastPrevious,
      handleFastNext,
    ],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {/* Keyboard shortcuts info (hidden but available for screen readers) */}
      {enableKeyboardShortcuts && (
        <div className="sr-only" aria-live="polite">
          Keyboard shortcuts: Left/Right arrows for navigation, Home/End for
          first/last page,
          {config.enableFastNavigation &&
            " PageUp/PageDown for fast navigation,"}
          {config.enableJumpToPage && " Ctrl+G to focus page input,"}
          Enter to submit, Escape to cancel.
        </div>
      )}

      {/* Left side: Page size selector */}
      {config.showSizeSelector && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" id="rows-per-page-label">
            Rows per page:
          </span>
          <select
            key={`pagesize-select-${pageSize}`}
            value={pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-8 w-20 rounded-md border border-base-300 bg-base-100 px-2 text-sm"
            aria-labelledby="rows-per-page-label"
            disabled={loading}
          >
            {availableOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Center: Navigation controls */}
      {config.showNavigation && pageCount > 1 && (
        <div className="flex items-center gap-2">
          <Pagination>
            <PaginationContent>
              {/* First page */}
              <PaginationItem>
                <PaginationLink
                  onClick={() => table.setPageIndex(0)}
                  className={cn(
                    "cursor-pointer",
                    !canPreviousPage && "pointer-events-none opacity-50",
                  )}
                  aria-disabled={!canPreviousPage}
                  title={
                    enableKeyboardShortcuts ? "First page (Home)" : "First page"
                  }
                >
                  First
                </PaginationLink>
              </PaginationItem>

              {/* Fast previous (if enabled) */}
              {config.enableFastNavigation && currentPage > 5 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={handleFastPrevious}
                    className="cursor-pointer"
                    aria-label="Go back 5 pages"
                    title={
                      enableKeyboardShortcuts
                        ? "Go back 5 pages (PageUp)"
                        : "Go back 5 pages"
                    }
                  >
                    &laquo;
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={cn(
                    "cursor-pointer",
                    !canPreviousPage && "pointer-events-none opacity-50",
                  )}
                  aria-disabled={!canPreviousPage}
                  title={
                    enableKeyboardShortcuts
                      ? "Previous page (←)"
                      : "Previous page"
                  }
                />
              </PaginationItem>

              {/* Page numbers */}
              {visiblePageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => table.setPageIndex(page - 1)}
                      isActive={page === currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={cn(
                    "cursor-pointer",
                    !canNextPage && "pointer-events-none opacity-50",
                  )}
                  aria-disabled={!canNextPage}
                  title={
                    enableKeyboardShortcuts ? "Next page (→)" : "Next page"
                  }
                />
              </PaginationItem>

              {/* Fast next (if enabled) */}
              {config.enableFastNavigation && currentPage <= pageCount - 5 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={handleFastNext}
                    className="cursor-pointer"
                    aria-label="Go forward 5 pages"
                    title={
                      enableKeyboardShortcuts
                        ? "Go forward 5 pages (PageDown)"
                        : "Go forward 5 pages"
                    }
                  >
                    &raquo;
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Last page */}
              <PaginationItem>
                <PaginationLink
                  onClick={() => table.setPageIndex(pageCount - 1)}
                  className={cn(
                    "cursor-pointer",
                    !canNextPage && "pointer-events-none opacity-50",
                  )}
                  aria-disabled={!canNextPage}
                  title={
                    enableKeyboardShortcuts ? "Last page (End)" : "Last page"
                  }
                >
                  Last
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Right side: Page info and jump-to-page */}
      <div className="flex items-center gap-4">
        {/* Page info */}
        {config.showPageInfo && (
          <div className="text-sm text-base-content">
            Showing {paginationInfo.totalRows > 0 ? paginationInfo.startRow : 0}
            -{paginationInfo.endRow} of {paginationInfo.totalRows} entries
          </div>
        )}

        {/* Jump to page */}
        {config.enableJumpToPage && pageCount > 10 && (
          <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
            <span className="text-sm">Go to:</span>
            <input
              ref={jumpInputRef}
              type="number"
              min="1"
              max={pageCount}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              className="h-8 w-16 rounded-md border border-base-300 bg-base-100 px-2 text-sm text-center"
              placeholder={currentPage.toString()}
              disabled={loading}
              title={
                enableKeyboardShortcuts
                  ? "Jump to page (Ctrl+G to focus)"
                  : "Jump to page"
              }
              aria-label="Jump to page number"
            />
            <button
              type="submit"
              className="h-8 px-3 rounded-md border border-base-300 bg-base-100 text-sm hover:bg-base-200 disabled:opacity-50"
              disabled={loading || !jumpToPage}
            >
              Go
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
