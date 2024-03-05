"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { build , floorType} from "./data-table";
import { internalphoneType } from "@/types/internalphone.type";

export const columns: ColumnDef<internalphoneType>[] = [
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="แผนก" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[350px] truncate font-medium">
            {row.getValue("department")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "เบอร์ติดต่อ",
  },
  {
    accessorKey: "building",
    header: "อาคาร",
    cell: ({ row }) => {
      const building = build.find(
        (build) => build.value === row.getValue("building")
      )

      if (!building) {
        return null
      }

      return (
        <div className="flex max-w-[300px] items-center">
          <span>{building.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "floor",
    header: "ชั้น",
    cell: ({ row }) => {
      const floor = floorType.find(
        (floorType) => floorType.value === row.getValue("floor")
      )

      if (!floor) {
        return null
      }

      return (
        <div className="flex max-w-[300px] items-center">
          <span>{floor.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
