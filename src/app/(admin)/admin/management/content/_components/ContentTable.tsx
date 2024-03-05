import { DataTable } from "./data-table";
import { columns } from "./columns";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { DataType } from "@/types/data.type";
import { getAllContent } from "@/actions/content/content";

async function getContentTable() {
  try {
    const response = await getAllContent();

    if (!response) {
      return null;
    }
    return response;
  } catch (error: any) {
    return error.message;
  }

  // try {
  //   const res: DataType = await axios.get(`${API_URL}/admin/content`);

  //   console.log(res.data.results);
  //   if (res.data.status == 200) {
  //     return res.data.results;
  //   }
  //   if (res.data.status == 500) {
  //     return res.data.results;
  //   }
  // } catch (error: any) {
  //   return error.results;
  // }
}

export async function ContentTable() {
  const data = await getContentTable();
  return <DataTable data={data} columns={columns} />;
}
