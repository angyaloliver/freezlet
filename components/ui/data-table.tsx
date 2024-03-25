"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useTransition } from "react";
import { FooterCell } from "@/app/sets/[id]/columns";
import { createCard } from "@/app/actions";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  defaultData: TData[];
  // addRowAction: () => Promise<{ message: string }>;
  setId: string; // instead of addRowAction since it throws a super annoying error
  deleteRowAction: (card: unknown) => Promise<{
    message: string;
  }>;
  updateRowAction: (card: unknown) => Promise<{
    message: string;
  }>;
}

export function DataTable<TData extends object, TValue>({
  columns,
  defaultData = [],
  // addRowAction,
  setId,
  deleteRowAction,
  updateRowAction,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [data, setData] = useState<TData[]>(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});

  const [isPending, setPending] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const isMutating = isPending || isTransitionStarted;

  const handlePerformServerMutation = () => {
    setPending(true);
    // update server data here
    //
    // then, start a transition
    startTransition(router.refresh);
    setPending(false);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: async (rowIndex: number) => {
        console.log(data[rowIndex]);
        console.log(await updateRowAction(data[rowIndex]));
      },
      removeRow: async (rowIndex: number) => {
        console.log(await deleteRowAction(data[rowIndex]));
      },
      addRow: async () => {
        // console.log(await createEmptyCard(Number(setId))); // TODO: fix this hack
        handlePerformServerMutation();
      },
    },
  });

  return (
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
                );
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
                no results
              </TableCell>
            </TableRow>
          )}
          {/* <TableRow>
            {columns.map((column, _) => (
              <TableCell key={table.getRowModel().rows?.length + 1}>
                <input type="text" placeholder={`Enter ${column.id}`} />
              </TableCell>
            ))}
          </TableRow> */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={table.getCenterLeafColumns().length}
              align="right"
            >
              <FooterCell table={table} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default DataTable;
