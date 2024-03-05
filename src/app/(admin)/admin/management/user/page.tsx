
import { Separator } from "@/components/ui/separator";
import { UserTable } from "./_components/UserTable";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { UserType } from "@/types/user.type";

export default async function UserAdminManagementPage() {


  const data: any = await prisma.arh_user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formatted: UserType[] = data.map((item: any) => ({
    id: item.id,
    username: item.username,
    password: item.password,
    firstname: item.firstname,
    lastname: item.lastname,
    cid: item.cid,
    email: item.email,
    tel: item.tel,
    role: item.role,
    birthdate: item.birthdate,
    createdAt: format(item.createdAt, "d/M/yyyy"),
    updatedAt: format(item.updatedAt, "d/M/yyyy"),
  }))
  // console.log(formatted)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">จัดการผู้ใช้งาน</h3>
        <p className="text-sm text-muted-foreground">
          User Management
        </p>
      </div>
      <Separator />
      <UserTable data={formatted} />
    </div>
  );
}

