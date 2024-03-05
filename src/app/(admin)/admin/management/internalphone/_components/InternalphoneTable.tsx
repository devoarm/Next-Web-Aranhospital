import { DataTable } from "./data-table";
import { columns } from "./columns";
import { internalphoneType } from "@/types/internalphone.type";

interface PhoneboardProps {
  data: internalphoneType[];
}

export const InternalphoneTable: React.FC<PhoneboardProps> = ({ data }) => {
  return (
      <DataTable data={data} columns={columns} />
  );
};
