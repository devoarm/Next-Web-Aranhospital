"use client";

import React, { useState } from "react";
import { PasswordSchema, PasswordType } from "@/types/user.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { DataType } from "@/types/data.type";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type Props = {
  token: string;
};

export default function PasswordChangeForm({ token }: Props) {
  const router = useRouter();
  const { data: Session, status } = useSession();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const form = useForm<PasswordType>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newpassword: "",
    },
  });

  async function onSubmit(values: PasswordType) {
    try {
      setLoading(true);
      const response: DataType = await axios.patch("/api/passwordchange", {
        token,
        newpassword: values.newpassword,
      });

      if (response.data.status == 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Success", {
            description: response.data.results,
          });
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
      router.push("/forgotpassword");
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
    <section className="mt-0 max-w-[1280px] mx-auto">
      <div className="px-0 py-7 max-w-[280px] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 h-fit px-0 py-0 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeOffIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        type={confirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <div className="">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 h-fit px-0 py-0 hover:bg-transparent"
                onClick={() => setConfirmPassword((prev) => !prev)}
              >
                {confirmPassword ? (
                  <EyeIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeOffIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {confirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-muted-foreground"></span>
              </div>
            </div>

            <Button type="submit" variant="default" className="w-full">
              Reset Password
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/signin")}
            >
              ยกเลิก
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
