import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/Container";

import { Metadata } from "next";
import TeamLeader from "./_components/Leader";
import TeamIt from "./_components/It";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardPage() {
  return (
    <Container>
      <Card className="flex flex-col w-full min-h-screen mx-auto px-7 py-7">
        <CardHeader className="mx-auto px-0 py-3">
          <CardTitle className="text-3xl font-bold tracking-tight">
            โครงสร้างหน่วยงาน
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Tabs defaultValue="leader" className="w-full mx-auto">
            <TabsList className="w-full bg-transparent mx-auto">
              <TabsTrigger value="leader" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">ผู้บริหาร</TabsTrigger>
              <TabsTrigger value="doctor" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">หมอ</TabsTrigger>
              <TabsTrigger value="nurse" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">พยาบาล</TabsTrigger>
              <TabsTrigger value="it" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">ดิจิตอล</TabsTrigger>
            </TabsList>
            <TabsContent value="leader" className="space-y-4">
              <TeamLeader />
            </TabsContent>
            <TabsContent value="doctor" className="space-y-4"></TabsContent>
            <TabsContent value="nurse" className="space-y-4"></TabsContent>
            <TabsContent value="it" className="space-y-4">
              <TeamIt />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Container>
  );
}
