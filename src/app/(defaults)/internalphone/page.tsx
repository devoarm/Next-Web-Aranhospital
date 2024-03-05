import React from "react";
import Container from "@/components/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import prisma from "@/lib/prisma";
import { toast } from "sonner";
import { internalphoneType } from "@/types/internalphone.type";
import { DataType } from "@/types/data.type";
import { format } from "date-fns";

export default async function InternalphonePage() {
  const data: any = await prisma.arh_internalphone.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedPhone: internalphoneType[] = data.map((item: any) => ({
    id: item.id,
    department: item.department,
    phone: item.phone,
    building: item.building,
    floor: item.floor,
    // createdAt: format(item.createdAt, "d/M/yyyy"),
    // updatedAt: format(item.updatedAt, "d/M/yyyy"),
  }))

  return (
        <Container>
          <Card className="w-full max-w-full shadow-xl mx-auto my-7">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">เบอร์โทรศัพท์ภายใน</CardTitle>
              <CardDescription className="text-md text-muted-foreground">Internalphone</CardDescription>
            </CardHeader>
            <CardContent className="h-full flex-1 flex-col">
                <DataTable data={formattedPhone} columns={columns} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription className="text-muted-foreground"></CardDescription>
            </CardFooter>
          </Card>
        </Container>
  );
}
