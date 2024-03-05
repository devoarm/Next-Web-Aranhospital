import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "จัดการข้อมูล",
  description: "Management",
};

const sidebarNavItems = [
  {
    title: "ภาพรวม",
    href: "/admin/management",
  },
  {
    title: "ผู้ใช้งาน",
    href: "/admin/management/user",
  },
  {
    title: "ข่าวสาร",
    href: "/admin/management/content",
  },
  {
    title: "ประเภทข่าวสาร",
    href: "/admin/management/category",
  },
  {
    title: "เบอร์ติดต่อภายใน",
    href: "/admin/management/internalphone",
  },
  {
    title: "คำร้องเรียน",
    href: "/admin/management/sendcontact",
  },
];

interface ManagementLayoutProps {
  children: React.ReactNode;
}

export default function ManagementLayout({ children }: ManagementLayoutProps) {
  return (
    <Container>
      <Card className="min-h-screen space-y-6 px-7 mx-0 my-0">
        <CardHeader className="space-y-0.5">
          <CardTitle className="text-2xl font-bold tracking-tight">
            จัดการข้อมูล
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-full">{children}</div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
