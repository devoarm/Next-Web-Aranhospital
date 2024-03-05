"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const profileFormSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }).trim(),
  password: z
    .string()
    .min(6, { message: "กรุณากรอกรหัสผ่าน 6 ตัว" })
    .max(20, { message: "รหัสผ่านต้องไม่เกิน 20 ตัว" })
    .trim(),
  firstname: z.string().min(1, { message: "กรุณากรอกชื่อ" }).trim(),
  lastname: z.string().min(1, { message: "กรุณากรอกนามสกุล" }).trim(),
  cid: z
    .string()
    .min(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลัก" })
    .max(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
    .trim(),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง").trim().toLowerCase().max(50, { message: "กรุณากรอกอีเมล ไม่เกิน 50 ตัวอักษร" }),
  tel: z
  .string()
  .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน" })
  .max(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
  .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
  .trim(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  cid: "",
  email: "",
  tel: "",
};

export function IndexpersonalInformation() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                    <Input className="" disabled {...field} />
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
