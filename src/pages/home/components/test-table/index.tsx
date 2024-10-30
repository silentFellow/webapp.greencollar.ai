import { UseQueryResult } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableStore } from "@/pages/home/zustand";
import { Order } from "@/pages/home/types";
import Pagination from "@/components/Pagination";
import { parseQuery } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const TestTable = ({
  scans,
}: {
  scans: UseQueryResult<{ total_count: number; scan_requests: Order[] }>;
}) => {
  const { query, setQuery, columns } = useTableStore();
  const data = scans.data?.scan_requests || [];

  // pagination
  const offset: number = typeof query.offset === "number" ? query.offset : 1;
  const limit: number = typeof query.limit === "number" ? query.limit : 1;
  const navigate = useNavigate();

  const handlePagination = (direction: "next" | "prev") => {
    const newOffset = direction === "next" ? offset + limit : Math.max(offset - limit, 0);
    setQuery({ ...query, offset: newOffset });
    navigate(`?${parseQuery(query)}`);
  };

  // Transform columns to match ColumnDef
  const transformedColumns: ColumnDef<Order, string>[] = columns.map(column => ({
    accessorKey: column.key,
    header: column.label,
    cell: info => {
      if (column.key === "scan_info" && column.function) return column.function(info.row.original); // for scan-info columns

      const value = info.getValue();
      if (column.function) return column.function(value); // for formatting

      return value.trim() || "-"; // default
    },
  }));

  // Transform columns array to columnVisibility object
  const columnVisibility = columns.reduce(
    (acc, col) => {
      acc[col.key] = col.visible;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const table = useReactTable({
    data,
    columns: transformedColumns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
  });

  if (scans.isLoading) return <h1 className="text-center mt-6">Loading...</h1>;
  if (scans.error) return <h1 className="text-center mt-6">Something went wrong...</h1>;
  if (scans.data?.scan_requests.length === 0)
    return <h1 className="text-center mt-6">No results...</h1>;

  return (
    <div className="my-3 col max-w-3xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className="font-black text-md uppercase text-center text-nowrap px-9"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="text-center"
            >
              <>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="p-3">
                    {cell.getValue() === ""
                      ? "-"
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        pageNumber={offset / limit + 1}
        hasNext={offset < (scans.data?.total_count || 0)}
        onNext={() => handlePagination("next")}
        onPrev={() => handlePagination("prev")}
      />
    </div>
  );
};

export default TestTable;
