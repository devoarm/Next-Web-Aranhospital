import React from "react";
import FaqAccordion from "./_components/FaqAccordion";
import Container from "@/components/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { genPageMetadata } from "@/app/seo";

export const metadata = genPageMetadata({ title: "คำถามที่พบบ่อย" });

export default function FaqPage() {
  return (
    <Container>
      <Card className="w-full min-h-screen max-w-4xl shadow-xl mx-auto my-7">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">
            คำถามที่พบบ่อย
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            FAQ
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full flex-1 flex-col">
          <FaqAccordion />
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription className="text-muted-foreground"></CardDescription>
        </CardFooter>
      </Card>
    </Container>
  );
}
