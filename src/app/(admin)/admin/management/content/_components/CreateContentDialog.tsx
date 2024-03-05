
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { CreateContent } from "./createcontent";

export async function CreateContentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary w-fit gap-1 hover:bg-primary hover:text-white"
        >
          <Bookmark />
          เพิ่ม
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>เพิ่ม</DialogTitle>
          <DialogDescription>Create here</DialogDescription>
        </DialogHeader>
        <CreateContent />
        <DialogFooter>
          <DialogDescription></DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
