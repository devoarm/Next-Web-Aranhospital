"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export type CategoryType = {
  id: number;
  name: string;
  root: string;
};

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "id",
    header: "รหัส",
  },
  {
    accessorKey: "name",
    header: "ประเภท",
  },
  // {
  //   accessorKey: "active",
  //   header: "Active",
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
