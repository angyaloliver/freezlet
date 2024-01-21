"use client";

import { Card } from "@/types/zod";
import { CellContext, ColumnDef, Row } from "@tanstack/react-table";

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "front",
    header: () => <div className="text-center">front</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("front")}</div>
    ),
  },
  {
    accessorKey: "back",
    header: () => <div className="text-center">back</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("back")}</div>
    ),
  },
  {
    id: "gender",
    accessorFn: (row) => {
      const splits = row.back.split(" ");
      if (
        splits[0] === "a" ||
        splits[0] === "o" ||
        splits[0] === "as" ||
        splits[0] === "os"
      ) {
        return splits[0];
      }
      return "";
    },
    header: () => <div className="text-center">gender</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {String(row.getValue("gender")) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              row.getValue("gender") === "a" ? "text-red-500" : "text-blue-500"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
        )}
      </div>
    ),
  },
];
