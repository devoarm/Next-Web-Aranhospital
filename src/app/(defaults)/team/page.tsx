import React from "react";
import Container from "@/components/Container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TeamComponents from "./_components/Team";
import { genPageMetadata } from "@/app/seo";


export const metadata = genPageMetadata({ title: 'โครงสร้างหน่วยงาน' })

export default function TeamPage() {
  return (
    <Container>
      <Card className="w-full max-w-full shadow-xl mx-auto px-7 my-7">
        <CardHeader className="text-center py-10">
          <CardTitle className="text-3xl text-primary">
            โครงสร้างหน่วยงาน
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Meet our leadership
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full flex-1 flex-col">
          <TeamComponents />
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription className="text-muted-foreground"></CardDescription>
        </CardFooter>
      </Card>
    </Container>
  );
}
