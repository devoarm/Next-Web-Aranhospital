"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { UserType } from "@/types/user.type";
import { urole } from "./data-table";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "username",
    header: "ชื่อผู้ใช้งาน",
  },
  {
    accessorKey: "cid",
    header: "เลขบัตรประชาชน",
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "firstname",
    header: "ชื่อ",
  },
  // {
  //   accessorKey: "lastname",
  //   header: "นามสกุล",
  // },
  {
    accessorKey: "lastname",
    header: "นามสกุล",
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[300px] items-center ">
           <span className="max-w-[350px] truncate">
            {row.getValue("lastname")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: "สถานะ",
    cell: ({ row }) => {
      const urolee: any = urole.find(
        (urole) => urole.value === row.getValue("role")
      );

      if (!urolee) {
        return (
          <div className="flex max-w-[300px] items-center ">
            <span className="font-medium">-</span>
          </div>
        );
      }

      return (
        <div className="flex max-w-[300px] items-center ">
          {urolee.value === "ADMIN" ? (
            <span className="text-yellow-200 bg-violet-500 font-medium rounded-xl p-2">
              {urolee.label}
            </span>
          ) : (
            <span className="text-white bg-green-400 font-medium rounded-xl p-2">
              {urolee.label}
            </span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row } : any) => <DataTableRowActions row={row.getValue('id')} />,
  },
];
