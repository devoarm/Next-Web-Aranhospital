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

const Schema = z.object({
  username: z.string().min(3, { message: "กรุณากรอกชื่อผู้ใช้" }).trim(),
  password: z
    .string()
    .min(4, { message: "กรุณากรอกรหัสผ่าน 4 ตัว" })
    .max(50, { message: "รหัสผ่านต้องไม่เกิน 50 ตัว" })
    .trim(),
  firstname: z.string().min(1, { message: "กรุณากรอกชื่อ" }).trim(),
  lastname: z.string().min(1, { message: "กรุณากรอกนามสกุล" }).trim(),
  cid: z
    .string()
    .min(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลัก" })
    .max(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
    .trim(),
  email: z
    .string()
    .email("กรุณากรอกอีเมลให้ถูกต้อง")
    .trim()
    .toLowerCase()
    .max(50, { message: "กรุณากรอกอีเมล ไม่เกิน 50 ตัวอักษร" }),
  tel: z
    .string()
    .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน" })
    .max(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
    .trim(),
  role: z.string(),
});

type SchemaType = z.infer<typeof Schema>;

const defaultValues: Partial<SchemaType> = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  cid: "",
  email: "",
  tel: "",
  role: "",
};

export function CreateUser() {
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
      const response: DataType = await axios.post(
        `${API_URL}/auth/createuser`,
        values
      );
      if (response.data.status == 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("สำเร็จ", {
            description: "",
          });
        }, 500);
        router.push("/admin/personal-information");
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
          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>ชื่อผู้ใช้งาน</Label>
                  <FormControl>
                    <Input className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="cid"
              render={({ field }) => (
                <FormItem>
                  <Label>เลขบัตรประชาชน</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <Label>ชื่อ</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <Label>นามสกุล</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>อีเมล</Label>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <Label>เบอร์โทรศัพท์</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <Label>ตำแหน่ง</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกตำแหน่ง" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="นักวิชาการคอมพิวเตอร์">
                        นักวิชาการคอมพิวเตอร์
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>รหัสผ่าน</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-2">
            <Button className="" variant="default" type="submit">
              บันทึก
            </Button>
            <Button className="" variant="outline">
              ยกเลิก
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
