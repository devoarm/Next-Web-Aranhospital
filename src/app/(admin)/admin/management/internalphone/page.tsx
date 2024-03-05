import { Separator } from "@/components/ui/separator"
import { InternalphoneTable } from "./_components/InternalphoneTable";
import prisma from "@/lib/prisma";

import { format } from "date-fns";
import { internalphoneType } from "@/types/internalphone.type";
import { DataType } from "@/types/data.type";

export default async function InternalphoneManagementPage() {

const data: any = await prisma.arh_internalphone.findMany({
  orderBy: {
    createdAt: 'desc'
  }
})

  // const formattedphone: internalphoneType[] = data.map((item) => ({
  //   id: item.id,
  //   department: item.department,
  //   phone: item.phone,
  //   building: item.building,
  //   floor: item.floor,
  //   createdAt: item.createdAt,
  //   updatedAt: item.updatedAt,
  // }))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการเบอร์ติดต่อภายใน</h3>
        <p className="text-sm text-muted-foreground">
          Internalphone Management
        </p>
      </div>
      <Separator />
      <InternalphoneTable data={data}/>
    </div>
  );
}
