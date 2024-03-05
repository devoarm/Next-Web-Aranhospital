import { Separator } from "@/components/ui/separator";
import { SendcontactTable } from "./_components/SendcontactTable";


export default function SendcontactManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการคำร้องเรียน</h3>
        <p className="text-sm text-muted-foreground">Sendcontact Management</p>
      </div>
      <Separator />
      <SendcontactTable />
    </div>
  );
}
