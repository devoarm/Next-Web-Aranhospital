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
import { Phone } from "lucide-react";
import { DataType } from "@/types/data.type";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import {
  defaultinternalphone,
  internalphoneSchema,
} from "@/types/internalphone.type";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { floorType } from "./data-table";

export function CreatePhoneDialog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const form = useForm<z.infer<typeof internalphoneSchema>>({
    resolver: zodResolver(internalphoneSchema),
    defaultValues: defaultinternalphone,
  });

  async function onSubmit(data: z.infer<typeof internalphoneSchema>) {
    try {
      setLoading(true);
      const response: DataType = await axios.post(
        `${API_URL}/admin/internalphone`,
        data
      );
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
          <Phone />
          เพิ่มเบอร์ติดต่อภายใน
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>เพิ่มเบอร์ติดต่อภายใน</DialogTitle>
          <DialogDescription>Create internalphone here</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <CardContent className="grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="username" className="text-primary">
                      แผนก
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

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="firstname" className="text-primary">
                      เบอร์ติดต่อ
                    </Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="text"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="building"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="lastname" className="text-primary">
                      ตึก
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a building" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="อาคารเจ้าพระยาบดินทรเดชา (สิงห์ สิงหเสนี)">
                          อาคารเจ้าพระยาบดินทรเดชา (สิงห์ สิงหเสนี)
                        </SelectItem>
                        <SelectItem value="อาคารลักษณลม้าย">
                          อาคารลักษณลม้าย
                        </SelectItem>
                        <SelectItem value="อาคารภาณุมาศรัศมี">
                          อาคารภาณุมาศรัศมี
                        </SelectItem>
                        <SelectItem value="อาคารอุบัติเหตุ">
                          อาคารอุบัติเหตุ
                        </SelectItem>
                        <SelectItem value="อาคารสนับสนุนบริการ">
                          อาคารสนับสนุนบริการ
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="lastname" className="text-primary">
                      ชั้น
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fllor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="G">G</SelectItem>
                      </SelectContent>
                    </Select>
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
