import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";

export interface DataTableProps<TData extends object>
  extends Omit<TableOptions<TData>, "getCoreRowModel"> {
  className?: string;
}

export function DataTable<TData extends object>({
  className,
  ...tableOptions
}: DataTableProps<TData>) {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return (
    <div className="w-full">
      <table className={className}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
