"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_URL } from "@/lib/url";
import { DataType } from "@/types/data.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import { createContents } from "@/actions/content/content";
import { getCurrentUser } from "@/lib/session";


const Schema = z
  .object({
    title: z.string().min(1, { message: "กรุณากรอกชื่อเรื่อง" }),
    description: z.string(),
    files: z.string(),
    images: z.string(),
    categoryId: z.number(),
    published: z.boolean(),
  })
  .strict();

type SchemaType = z.infer<typeof Schema>;

const defaultValues: Partial<SchemaType> = {
  title: "",
  description: "",
  files: "",
  images: "",
  categoryId: 1,
  published: true,
};

export function CreateContent() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(values: SchemaType) {
    // console.log(values)
    try {
      setLoading(true);
      const response: DataType = await axios.post(`${API_URL}/content`, values);

      // const response: any = await createContents(values)

      if (response.data.status == 200) {
      // if (response.success === true) {
        setTimeout(() => {
          setLoading(false);
          toast.success("สำเร็จ", {
            description: "",
          });
        }, 500);
        router.push("/admin/management/content");
      } else if (response.data.status == 401) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Warning", {
            description: "คุณไม่ใช่ผู้ดูแลระบบ",
          });
        }, 500);
      } else if (response.data.status == 500) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Warning", {
            description: response.data.results,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.error(response.data.results);
        }, 500);
      }
      router.refresh();
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
        toast.error("เกิดข้อผิดพลาด", {
          description: error.message,
        });
      }, 500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-8"
      >
        <div className="grid gap-4 grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>ชื่อเรื่อง</Label>
                  <FormControl>
                    <Input className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>รายละเอียด</Label>
                  <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <Label>ประเภทข่าว</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <Label>ไฟล์</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <Label>รูป</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              className="w-24"
            >
              บันทึก
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-24">
                ย้อนกลับ
              </Button>
            </DialogClose>
          </div>
        </div>
      </form>
    </Form>
  );
}
