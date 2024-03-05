"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export type ExecutiveType = {
  id: number;
  name: string;
  position: string;
};

export const columns: ColumnDef<ExecutiveType>[] = [
  // {
  //   accessorKey: "id",
  //   header: "รหัส",
  // },
  {
    accessorKey: "name",
    header: "ชื่อ-นามสกุล",
  },
  {
    accessorKey: "position",
    header: "",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
