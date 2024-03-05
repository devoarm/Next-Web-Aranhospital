import { Separator } from "@/components/ui/separator"
import { PrefixTable } from "./_components/PrefixTable"

export default async function PrefixManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการคำนำหน้า</h3>
        <p className="text-sm text-muted-foreground">
          Prefix Management
        </p>
      </div>
      <Separator />
      <PrefixTable />
    </div>
  )
}
