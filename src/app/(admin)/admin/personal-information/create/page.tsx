import React from "react";
import { CreateUser } from "../_components/createuser";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">เพิ่มบัญชีผู้ใช้</h3>
        <p className="text-sm text-muted-foreground">Create User</p>
      </div>
      <Separator />
      <CreateUser />
    </div>
  );
}
