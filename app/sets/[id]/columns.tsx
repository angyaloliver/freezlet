"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/types/zod";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Pencil1Icon,
  TrashIcon,
  CheckIcon,
  Cross1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";

// TODO: fix types
const TableCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};

// TODO: fix types
const EditCell = ({ row, table }: { row: any; table: any }) => {
  const meta = table.options.meta;

  const setEditedRows = (e: any) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return meta?.editedRows[row.id] ? (
    <>
      <Button variant={"outline"} onClick={setEditedRows} name="cancel">
        <Cross1Icon />
      </Button>{" "}
      <Button onClick={setEditedRows} name="done">
        <CheckIcon />
      </Button>
    </>
  ) : (
    <>
      <Button variant={"outline"} onClick={setEditedRows} name="edit">
        <Pencil1Icon />
      </Button>
      <Button variant={"destructive"} onClick={removeRow} name="remove">
        <TrashIcon />
      </Button>
    </>
  );
};

// TODO: fix types and export
export const FooterCell = ({ table }: { table: any }) => {
  const meta = table.options.meta;
  return (
    <div className="footer-buttons">
      <Button onClick={meta?.addRow}>
        <PlusIcon />
      </Button>
    </div>
  );
};

const columnHelper = createColumnHelper<Card>();

export const columns: ColumnDef<Card, string>[] = [
  columnHelper.accessor("front", {
    header: () => <div className="text-center">front</div>,
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("back", {
    header: () => <div className="text-center">back</div>,
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

// export const columns: ColumnDef<Card, string>[] = [
//   {
//     accessorKey: "front",
//     header: () => <div className="text-center">front</div>,
//     // cell: ({ row }) => (
//     //   <div className="text-center">{row.getValue("front")}</div>
//     // ),
//     cell: TableCell,
//     meta: {
//       type: "text",
//     },
//   },
//   {
//     accessorKey: "back",
//     header: () => <div className="text-center">back</div>,
//     // cell: ({ row }) => (
//     //   <div className="text-center">{row.getValue("back")}</div>
//     // ),
//     cell: TableCell,
//     meta: {
//       type: "text",
//     },
//   },
//   // {
//   //   id: "gender",
//   //   accessorFn: (row) => {
//   //     const splits = row.back.split(" ");
//   //     if (
//   //       splits[0] === "a" ||
//   //       splits[0] === "o" ||
//   //       splits[0] === "as" ||
//   //       splits[0] === "os"
//   //     ) {
//   //       return splits[0];
//   //     }
//   //     return "";
//   //   },
//   //   header: () => <div className="text-center">gender</div>,
//   //   cell: ({ row }) => (
//   //     <div className="text-center">
//   //       {String(row.getValue("gender")) && (
//   //         <svg
//   //           xmlns="http://www.w3.org/2000/svg"
//   //           className={`h-4 w-4 ${
//   //             row.getValue("gender") === "a" ? "text-red-500" : "text-blue-500"
//   //           }`}
//   //           viewBox="0 0 24 24"
//   //           fill="currentColor"
//   //         >
//   //           <circle cx="12" cy="12" r="6" />
//   //         </svg>
//   //       )}
//   //     </div>
//   //   ),
//   // },
//   {
//     // display({id: "edit", cell: EditCell})
//   },
//   // columnHelper.display({
//   //   id: "edit",
//   //   cell: EditCell,
//   // }),
// ];
