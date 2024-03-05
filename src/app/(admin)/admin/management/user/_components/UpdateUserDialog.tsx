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
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Lock,
  Mail,
  Phone,
  Binary,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { DataType } from "@/types/data.type";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, defaultUser } from "@/types/user.type";
import Link from "next/link";


const role = [
  { label: "USER", value: "USER" },
  { label: "ADMIN", value: "ADMIN" },
] as const;

export function UpdateUserDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultUser,
  });

  async function onSubmit(data: z.infer<typeof UserSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-auto w-36">แก้ไขผู้ใช้งาน</Button>
        {/* <Link className="mx-auto w-36" href={} onClick={() => UpdateUserDialog()}>แก้ไขผู้ใช้งาน</Link> */}
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>แก้ไขผู้ใช้งาน</DialogTitle>
          <DialogDescription>Edit user here.</DialogDescription>
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
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="password" className="text-primary">
                      รหัสผ่าน
                    </Label>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="password"
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
                name="firstname"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="firstname" className="text-primary">
                      ชื่อ
                    </Label>
                    <FormControl>
                      <Input type="text" className="" {...field} />
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
                      <Input type="text" className="" {...field} />
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
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-6 sm:col-span-6 lg:col-span-6">
                    <Label htmlFor="role" className="text-primary">
                      สิทธิการใช้งาน
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? role.find(
                                  (item) => item.value === field.value
                                )?.label
                              : "Select item"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No found.</CommandEmpty>
                          <CommandGroup>
                            {role.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("role", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
              <Button type="submit" variant="default" className="w-24">
                บันทึก
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
