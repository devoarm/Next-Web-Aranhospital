"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { build, floorType } from "./data-table";
import { CreatePhoneDialog } from "./CreatePhoneDialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 lg:items-center lg:justify-between  lg:flex-row">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search"
          value={
            (table.getColumn("department")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("department")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("building") && (
          <DataTableFacetedFilter
            column={table.getColumn("building")}
            title="อาคาร"
            options={build}
          />
        )}
        {table.getColumn("floor") && (
          <DataTableFacetedFilter
            column={table.getColumn("floor")}
            title="ชั้น"
            options={floorType}
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
        <CreatePhoneDialog />
      </div>
    </div>
  );
}
