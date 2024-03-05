"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { PrefixType } from "@/types/prefix.type";

export const columns: ColumnDef<PrefixType>[] = [
  {
    accessorKey: "id",
    header: "รหัส",
  },
  {
    accessorKey: "name",
    header: "คำนำหน้า",
  },
    {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
