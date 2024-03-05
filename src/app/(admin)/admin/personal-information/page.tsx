import React from "react";
import { IndexpersonalInformation } from "./_components/indexpersonalinformation";
import { Separator } from "@/components/ui/separator";

export default function PersonalInformationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">ข้อมูลส่วนตัว</h3>
        <p className="text-sm text-muted-foreground">
        Personal Information 
        </p>
      </div>
      <Separator />
      <IndexpersonalInformation />
    </div>
  );
}
