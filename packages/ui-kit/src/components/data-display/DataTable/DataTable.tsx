import React, { useState } from 'react';
import {
    ColumnDef,
    ColumnResizeMode,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { cn } from '../../../utils';

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
}

/**
 * A data table component with pagination and column resizing
 */
export function DataTable<TData extends object, TValue = unknown>({
    data,
    columns,
    className,
    pageSize = 10,
    enableResizing = true,
    columnResizeMode = 'onChange',
    enableSorting = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination: {
                pageIndex: 0,
                pageSize,
            }
        },
        enableSorting,
        enableColumnResizing: enableResizing,
        columnResizeMode,
    });

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="rounded-md border overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className={cn("w-full caption-bottom text-sm", className)}>
                        <thead className="border-b bg-base-200">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            style={{
                                                width: header.getSize(),
                                                position: 'relative',
                                            }}
                                            className="h-12 px-4 text-left align-middle font-medium text-base-content"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={cn(
                                                        "flex items-center gap-2",
                                                        header.column.getCanSort() && "cursor-pointer select-none"
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
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
                                                        header.column.getIsResizing() ? "bg-primary" : "bg-base-300"
                                                    )}
                                                />
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b transition-colors hover:bg-base-100/50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="p-4"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" id="rows-per-page-label">
                        Rows per page:
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="h-8 w-16 rounded-md border border-base-300 bg-base-100 px-2"
                        aria-labelledby="rows-per-page-label"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <div className="text-sm text-base-content">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 rounded-md border border-base-300 disabled:opacity-50 flex items-center justify-center"
                            aria-label="First page"
                        >
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 rounded-md border border-base-300 disabled:opacity-50 flex items-center justify-center"
                            aria-label="Previous page"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 rounded-md border border-base-300 disabled:opacity-50 flex items-center justify-center"
                            aria-label="Next page"
                        >
                            <ArrowRightIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 rounded-md border border-base-300 disabled:opacity-50 flex items-center justify-center"
                            aria-label="Last page"
                        >
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function DoubleArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="m11 17-5-5 5-5" />
            <path d="m18 17-5-5 5-5" />
        </svg>
    );
}

function DoubleArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
        </svg>
    );
} 