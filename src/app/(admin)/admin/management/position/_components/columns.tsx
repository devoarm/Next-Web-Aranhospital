"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { PositionType } from "@/types/position.type";

export const columns: ColumnDef<PositionType>[] = [
  {
    accessorKey: "id",
    header: "รหัส",
  },
  {
    accessorKey: "name",
    header: "ตำแหน่ง",
  },
    {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
