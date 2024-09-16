import { Table } from "@tanstack/react-table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps<TData> {
  table: Table<TData>;
}

function Paginator<TData>({ table }: PaginationProps<TData>) {
    return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
                {
                    table.getCanPreviousPage() ? (
                        <PaginationPrevious onClick={() => table.previousPage()}/>
                    ) : null
                }
            </PaginationItem>
            <PaginationItem>
                {
                    table.getState().pagination.pageIndex > 1 ? (
                        <PaginationLink onClick={() => table.firstPage()}>0</PaginationLink>                       
                    ) : null
                }
            </PaginationItem>
            <PaginationItem>
                {
                    table.getState().pagination.pageIndex > 1 ? (
                        <PaginationEllipsis/>
                    ) : null
                }
            </PaginationItem>
            <PaginationItem>
                {
                    table.getCanPreviousPage() ? (
                        <PaginationLink onClick={() => table.previousPage()}>{table.getState().pagination.pageIndex-1}</PaginationLink>                       
                    ) : null
                }
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>
                {table.getState().pagination.pageIndex}
              </PaginationLink>
            </PaginationItem>
            {table.getCanNextPage() ? (
            <PaginationItem>
              <PaginationLink onClick={() => table.nextPage()}>{table.getState().pagination.pageIndex+1}</PaginationLink>
            </PaginationItem>) : null
            }
            <PaginationItem>

            {table.getState().pagination.pageIndex  < table.getPageCount()-2 ? (
              <PaginationEllipsis />
            ) : null}

            </PaginationItem>
            <PaginationItem>
            { table.getState().pagination.pageIndex  < table.getPageCount()-2 ? (
                <PaginationLink onClick={() => table.setPageIndex(table.getPageCount()-1)}>
                {table.getPageCount()-1}
                </PaginationLink>
            ) : null}
            </PaginationItem>
            <PaginationItem>
                {
                    table.getCanNextPage() ? (
                        <PaginationNext onClick={() => table.nextPage()}/>
                    ) : null
                }
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    )
}

export default Paginator