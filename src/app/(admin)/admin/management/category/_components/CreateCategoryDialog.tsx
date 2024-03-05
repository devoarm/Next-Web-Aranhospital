"use client";

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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Bookmark, Phone } from "lucide-react";
import { DataType } from "@/types/data.type";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CategoryType,
  CategorySchema,
  defaultCategory,
} from "@/types/category.type";

export function CreateCategoryDialog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: defaultCategory,
  });

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    console.log(data)
    try {
      setLoading(true);
      const response: DataType = await axios.post(
        `${API_URL}/admin/category`,
        data
      );

      console.log(data)
      if (response.data.status == 200) {
        toast.success("สำเร็จ", {
          description: "",
        });
      } else if (response.data.status == 401) {
        toast.warning("Warning", {
          description: "คุณไม่ใช่ผู้ดูแลระบบ",
        });
      } else if (response.data.status == 500) {
        toast.warning("Warning", {
          description: response.data.results,
        });
      } else {
        toast.error("Error", {
          description: "ไม่สำเร็จ",
        });
      }
      router.refresh();
    } catch (error: any) {
      toast.error("เกิดข้อผิดพลาด", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary w-fit gap-1 hover:bg-primary hover:text-white"
        >
          <Bookmark />
          เพิ่มประเภทข่าว
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>เพิ่มเบอร์ติดต่อภายใน</DialogTitle>
          <DialogDescription>Create internalphone here</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <CardContent className="grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-12 sm:col-span-12 lg:col-span-12">
                    <Label htmlFor="username" className="text-primary">
                      ประเภท
                    </Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder=""
                        type="text"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <DialogFooter className="flex flex-row justify-end items-end gap-2 ">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-24">
                  ย้อนกลับ
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="w-24"
              >
                บันทึก
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
