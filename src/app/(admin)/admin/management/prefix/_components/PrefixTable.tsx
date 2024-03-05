import { DataTable } from "./data-table";
import { columns } from "./columns";
import { API_URL } from "@/lib/url";
import { DataType } from "@/types/data.type";
import axios from "axios";

async function getPrefixTable() {
  try {
    const res: DataType = await axios.get(`${API_URL}/admin/prefix`);

    if (res.data.status == 200) {
      return res.data.results;
    }
    if (res.data.status == 500) {
      return res.data.results;
    }
  } catch (error: any) {
    return error.results;
  }
}

export async function PrefixTable() {
  const data = await getPrefixTable();
  return <DataTable data={data} columns={columns} />;
}
