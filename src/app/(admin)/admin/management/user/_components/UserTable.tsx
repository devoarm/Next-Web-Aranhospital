
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserType } from "@/types/user.type";


interface UserboardProps {
  data: UserType[]
}

export const UserTable: React.FC<UserboardProps> = ({
  data
}) => {
  return (
    <DataTable data={data} columns={columns} />
    ) 
  }

