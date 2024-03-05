import { Separator } from "@/components/ui/separator"
import { PositionTable } from "./_components/PositionTable"

export default function PositionManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการตำแหน่ง</h3>
        <p className="text-sm text-muted-foreground">
          Position Management
        </p>
      </div>
      <Separator />
      <PositionTable />
    </div>
  )
}
