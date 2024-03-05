"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SendcontactType } from "@/types/sendcontact.type";
import moment from "moment";

export const columns: ColumnDef<SendcontactType>[] = [
  {
    accessorKey: "subject",
    header: "เรื่อง",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px] max-w-[180px] truncate font-thin text-gray-500">
            {row.getValue("subject")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "วันที่",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[70px] truncate font-thin text-gray-400">
            {moment(row.getValue("createdAt")).format("DD/MM/YYYY")}
          </span>
        </div>
      );
    },
  },
];
