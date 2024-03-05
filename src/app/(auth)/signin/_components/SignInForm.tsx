"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInSchema, SignInType, defaultSignIn } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LogIn, Loader2, EyeIcon, EyeOffIcon } from "lucide-react";

interface AuthProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignInForm({ className, ...props }: AuthProps) {
  const router = useRouter();
  const { data: Session, status } = useSession();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pending, setPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: defaultSignIn,
  });

  async function onSubmit(values: SignInType) {
    try {
      setLoading(true);
      const login = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (login?.ok) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Authenticated", {
            description: "ยินดีเข้าสู่ระบบ",
          });
        }, 500);
        router.push("/");
        router.refresh();
      } else if (!login?.ok) {
        setTimeout(() => {
          setLoading(false);
          toast.warning("Unauthenticated", {
            description: login?.error,
          });
        }, 300);
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.error(login?.error);
        }, 300);
      }
      router.refresh();
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
        toast.error("เกิดข้อผิดพลาด", {
          description: error,
        });
      }, 300);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (status === "authenticated") {
        router.push("/");
        router.refresh();
      }
    }, 200);
  }, [router, status]);

  return (
    <section className="mt-0 max-w-[1280px] mx-auto" {...props}>
      <div className="px-0 py-7 max-w-[280px] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
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

            <div className="flex justify-between text-xs px-1">
              <div className="flex gap-1">
                <Checkbox
                  id="remember"
                  name="remember"
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                />
                <Label htmlFor="remember" className="text-xs text-gray-500">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgotpassword"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot password
              </Link>
            </div>

            <Button className="w-full" variant="default" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              Sign In
            </Button>

            <p className="text-center text-xs text-gray-500">
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
