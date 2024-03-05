"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ContentType } from "@/types/content.type";



export const columns: ColumnDef<ContentType>[] = [
  {
    accessorKey: "id",
    header: "รหัส",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เรื่อง" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <a href={`/content/${row.getValue("id")}`} className="w-[700px] max-w-2xl truncate font-medium">
            {row.getValue("title")}
          </a>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
