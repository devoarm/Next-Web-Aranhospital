"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { CreateUserDialog } from "./CreateUserDialog";
import { UpdateUserDialog } from "./UpdateUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { urole } from "./data-table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CreateUser } from "./createuser";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <section className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search"
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[180px]"
        />
         {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="สถานะ"
            options={urole}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <CreateUserDialog />
      </div>
    </section>
  );
}
