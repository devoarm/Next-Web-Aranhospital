"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { API_URL } from "@/lib/url";
import { DataType } from "@/types/data.type";
import { useRouter } from "next/navigation";
import { genPageMetadata } from "@/app/seo";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import { KeyRound, Loader2 } from "lucide-react";
export const metadata = genPageMetadata({ title: "ลืมรหัสผ่าน" });

type Props = {};

const ForgetPasswordSchema = z.object({
  email: z
    .string()
    .email("กรุณากรอกอีเมล")
    .refine((value) => !!value, {
      message: "Email is mandatory and should be a valid email address",
    }),
});

type ForgetPasswordSchemaT = z.infer<typeof ForgetPasswordSchema>;

export default function ForgotPasswordForm(props: Props) {
  const router = useRouter();
  const { data: Session, status } = useSession();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgetPasswordSchemaT>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgetPasswordSchemaT) {
    try {
      setLoading(true);
      const response: DataType = await axios.post(`${API_URL}/passwordchange`, {
        email: values.email,
      });

      if (response.data.status == 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Success", {
            description: response.data.results,
          });
          router.push("/");
        }, 1000);
      } else if (response.data.status == 201) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Created", {
            description: response.data.results,
          });
        }, 1000);
      } else if (response.data.status == 400) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("No Found Data", {
            description: response.data.results,
          });
        }, 1000);
      } else if (response.data.status == 401) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Unauthorized", {
            description: response.data.results,
          });
        }, 1000);
      } else if (response.data.status == 403) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Forbidden", {
            description: response.data.results,
          });
        }, 1000);
      } else if (response.data.status == 404) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Not Found", {
            description: response.data.results,
          });
        }, 1000);
      } else if (response.data.status == 500) {
        setTimeout(() => {
          setLoading(false);
          toast.error("Internal Server Error", {
            description: response.data.results,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.error("Error", {
            description: response.data.results,
          });
        }, 1000);
      }
      router.refresh();
      // router.push("/forgotpassword");
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Error", {
          description: error.message,
        });
      }, 1000);
    }
  }

  return (
    <section className="mt-0 max-w-[1280px] mx-auto" {...props}>
      <div className="px-0 py-7 max-w-[280px] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-muted-foreground"></span>
              </div>
            </div>

            <Button className="w-full" variant="default" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="mr-2 h-4 w-4" />
              )}
              Forgot Password
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
