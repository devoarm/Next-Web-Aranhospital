"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CheckIcon, UserPlus2 } from "lucide-react";
import { DataType } from "@/types/data.type";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { UserSchema, UserType, defaultUser } from "@/types/user.type";
import { toast } from "sonner";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { PrefixType } from "@/types/prefix.type";

export function CreateUserDialog() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [prefix, setPrefix] = useState<PrefixType[]>([]);

  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultUser,
  });

  // const fetchPrefix = async () => {
  //   try {
  //     const resCon: DataType = await axios.get(`${API_URL}/admin/prefix`);

  //     if (resCon.data.status == 200) {
  //       setPrefix(resCon.data.results);
  //     }
  //   } catch (error: any) {
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   fetchPrefix();
  // }, []);

  async function onSubmit(values: UserType) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary w-fit gap-1 hover:bg-primary hover:text-white"
        >
          <UserPlus2 />
          เพิ่มผู้ใช้งาน
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้ใช้งาน</DialogTitle>
          <DialogDescription>Create user here</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <CardContent className="grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="username" className="text-primary">
                      ชื่อผู้ใช้งาน
                    </Label>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder=""
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="password" className="text-primary">
                      รหัสผ่าน
                    </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
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

              {/* <FormField
                control={form.control}
                name="prefixId"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6 flex flex-col ">
                    <Label htmlFor="password" className="text-primary">
                      คำนำหน้า
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.name && "text-muted-foreground"
                            )}
                          >
                            {field.id
                              ? prefix.find(
                                  (pref: PrefixType) => pref.name === field.id
                                )?.name
                              : "เลือกคำนำหน้า"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="ค้นหา..." />
                          <CommandEmpty>No Prefix</CommandEmpty>
                          <CommandGroup>
                            {prefix.map((pref) => (
                              <CommandItem
                                value={pref.name}
                                key={pref.id}
                                onSelect={() => {
                                  form.setValue("prefixId", pref.id);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    pref.id === field.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {pref.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />            */}

              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="firstname" className="text-primary">
                      ชื่อ
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
                name="lastname"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="lastname" className="text-primary">
                      นามสกุล
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
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="email" className="text-primary">
                      อีเมล
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
                name="tel"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="tel" className="text-primary">
                      เบอร์โทรศัพท์
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
                name="cid"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="cid" className="text-primary">
                      เลขบัตรประชาชน
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
