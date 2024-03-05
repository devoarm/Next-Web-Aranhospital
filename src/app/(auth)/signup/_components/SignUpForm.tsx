"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/lib/url";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { DataType } from "@/types/data.type";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmpassword: "",
      cid: "",
      email: ""
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      setLoading(true);
      const response: DataType = await axios.post(`${API_URL}/signup`, values);
      console.log(response);

      // if (response.data.status == 200) {
      //   toast.success("Success", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 201) {
      //   toast.success("Created", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 400) {
      //   toast.warning("Bad Request", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 401) {
      //   toast.warning("Unauthorized", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 403) {
      //   toast.warning("Forbidden", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 404) {
      //   toast.warning("Not Found", {
      //     description: response.data.results,
      //   });
      // } else if (response.data.status == 500) {
      //   toast.error("Internal Server Error", {
      //     description: response.data.results,
      //   });
      // } else {
      //   toast.error("Error", {
      //     description: response.data.results,
      //   });
      // }
      // router.refresh()

    } catch (error: any) {
      toast.error("ไม่สำเร็จ", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    // <section className="flex flex-col items-center bg-gray-50 px-4 py-7 sm:px-10 space-y-4">
    //   <p className="text-center font-medium text-violet-500">
    //     หากยังไม่มีบัญชีเข้าใช้งาน <br />
    //     ติดต่อศูนย์คอมพิวเตอร์ ชั้น 4 <br />
    //     อาคารเจ้าพระยาบดินทรเดชา (สิงห์ สิงหเสนี) <br />
    //     โรงพยาบาลอรัญประเทศ
    //   </p>
    //   <Button className="bg-violet-500 w-fit">
    //     <Link href="/" className="text-center font-medium text-white">
    //       Back to Homepage
    //     </Link>
    //   </Button>
    // </section>

    <section className="mt-0 max-w-[1280px] mx-auto">
      <div className="px-0 py-7 max-w-[280px] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>ชื่อผู้ใช้งาน</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <Label>ยืนยันรหัสผ่าน</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-violet-600 w-fit">
              <p className="text-center font-medium text-white">Submit</p>
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
