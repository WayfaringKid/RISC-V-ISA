"use client"
import React from 'react'

export interface Instruction {
  syntax: string;
  function: string;
  description: string;
  // 根据需要添加更多字段
}

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
  } from "@tanstack/react-table"
   
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import Pagination from '@/components/paginator'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    
  })
 
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter instructions..."
          value={(table.getColumn("mnemonic")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("mnemonic")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:ring-0"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table}/>
    </div>
    
  )
}
