import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./_components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Container from "@/components/Container"


export const metadata: Metadata = {
  title: "แก้ไขข้อมูลส่วนตัว",
  description: "",
}

const sidebarNavItems = [
  {
    title: "ข้อมูลบัญชี",
    href: "/admin/personal-information",
  },
  {
    title: "เพิ่มบัญชีผู้ใช้งาน",
    href: "/admin/personal-information/create",
  },
]

interface PersonalInformationLayoutProps {
  children: React.ReactNode
}

export default function PersonalInformationLayout({ children }: PersonalInformationLayoutProps) {
  return (
    <Container>
      <Card className="space-y-6 px-7 mx-0 my-0">
        <CardHeader className="space-y-0.5">
          <CardTitle className="text-2xl font-bold tracking-tight">แก้ไขข้อมูลส่วนตัว</CardTitle>
          <CardDescription className="text-muted-foreground">Personal Information.</CardDescription>
        </CardHeader>
        <CardContent>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-[200px]">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-full">{children}</div>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
