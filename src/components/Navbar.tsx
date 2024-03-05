"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { ProfileButton } from "./ProfileButton";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./ui/input";

const content: { title: string; href: string }[] = [
  {
    title: "ประชาสัมพันธ์และกิจกรรมบริการ",
    href: "/content",
  },
  {
    title: "การดำเนินงาน",
    href: "/content",
  },
  {
    title: "คู่มือ/องค์ความรู้",
    href: "/content",
  },
  {
    title: "รับสมัครงาน",
    href: "/content",
  },
  {
    title: "จัดซื้อ-จัดจ้าง",
    href: "/content",
  },
];

const service: { title: string; href: string }[] = [
  {
    title: "ห้องผ่าตัด",
    href: "#",
  },
  {
    title: "คลินิคทันตกรรม",
    href: "#",
  },
  {
    title: "ศูนย์ไตเทียม",
    href: "#",
  },
  {
    title: "แพทย์แผนไทย",
    href: "#",
  },
];

const about: { title: string; href: string }[] = [
  {
    title: "ประวัติความเป็นมา",
    href: "/about",
  },
  {
    title: "โครงสร้างหน่วยงาน",
    href: "/team",
  },
];

const contact: { title: string; href: string }[] = [
  {
    title: "ติดต่อเรา",
    href: "/contact",
  },
  {
    title: "เบอร์โทรศัพท์ภายใน",
    href: "/internalphone",
  },
];

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="bg-secondary dark:bg-secondary">
      <div
        className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" rel="noreferrer">
            <Image
              height={170}
              width={170}
              loading="lazy"
              src="/images/logoaranhos.png"
              alt="Logo"
            />
          </Link>
        </div>
        <NavigationMenu className="hidden lg:flex lg:gap-x-4 ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  หน้าแรก
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>ข่าวประชาสัมพันธ์</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-1 w-[200px] md:grid-cols-1 md:w-[400px] lg:grid-cols-1 lg:w-[500px] gap-3 p-4 ">
                  {content.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>เกี่ยวกับเรา</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-1 w-[200px] md:grid-cols-1 md:w-[400px] lg:grid-cols-1 lg:w-[500px] gap-3 p-4 ">
                  {about.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>บริการสุขภาพ</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-1 w-[200px] md:grid-cols-1 md:w-[400px] lg:grid-cols-1 lg:w-[500px] gap-3 p-4 ">
                  {service.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://aranh.thai-nrls.org"
                target="_blank"
                rel="noopener noreferrer"
                locale="th_TH"
                passHref
                legacyBehavior
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  รายงานความเสี่ยง
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>ติดต่อเรา</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-1 w-[200px] md:grid-cols-1 md:w-[400px] lg:grid-cols-1 lg:w-[500px] gap-3 p-4 ">
                  {contact.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 lg:hidden" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[300px]">
              <nav className="flex flex-col py-7">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-primary-foreground dark:bg-primary hover:bg-violet-500 hover:text-white focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
