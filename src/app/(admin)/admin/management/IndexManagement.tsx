"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "../dashboard/_components/overview";

export function IndexManagement() {
  return (
    <div className="grid gap-4 grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
      <Card className="col-span-12 md:col-span-12 lg:col-span-12 ">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
    </div>
  );
}
