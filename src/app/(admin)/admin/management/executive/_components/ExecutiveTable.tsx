
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getExecutiveTable(): Promise<[]> {
  return [

  ];
}

export async function ExecutiveTable() {
  const data = await getExecutiveTable();
  return (
    <DataTable data={data} columns={columns} />
  );
}
