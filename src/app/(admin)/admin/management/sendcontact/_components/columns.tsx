"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { SendcontactType } from "@/types/sendcontact.type";

export const columns: ColumnDef<SendcontactType>[] = [
  // {
  //   accessorKey: "name",
  //   header: "ชื่อ-นามสกุล",
  // },
  {
    accessorKey: "subject",
    header: "เรื่อง",
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "tel",
    header: "เบอร์",
  },
  // {
  //   accessorKey: "message",
  //   header: "รายละเอียด",
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
