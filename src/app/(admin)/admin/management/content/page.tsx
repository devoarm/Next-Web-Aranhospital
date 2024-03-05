import { Separator } from "@/components/ui/separator";
import { ContentTable } from "./_components/ContentTable";

export default function ContentManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการข่าวสาร</h3>
        <p className="text-sm text-muted-foreground">Content Management</p>
      </div>
      <Separator />
      <ContentTable />
    </div>
  );
}
