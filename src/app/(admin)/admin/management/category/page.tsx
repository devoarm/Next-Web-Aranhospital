import { Separator } from "@/components/ui/separator";
import { CategoryTable } from "./_components/CategoryTable";

export default function CategoryManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการประเภทข่าว</h3>
        <p className="text-sm text-muted-foreground">Category Management</p>
      </div>
      <Separator />
      <CategoryTable />
    </div>
  );
}
