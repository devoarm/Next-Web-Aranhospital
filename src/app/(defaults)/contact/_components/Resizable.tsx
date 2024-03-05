"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SendEmail from "./SendEmail";
import { Hotel, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Resizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full mx-auto rounded-lg border"
    >
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <CardContent className="flex px-4 py-4 lg:px-4 lg:py-4">
              <div className="rounded-xl ring-gray-300 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-extrabold tracking-tight text-violet-600">
                    Get In Touch
                  </h3>
                  <div className="mt-4 text-md  text-gray-600">
                    <div className="flex flex-row ">
                      <Hotel
                        className="h-5 w-5  text-slate-600"
                        aria-hidden="true"
                      />
                      <p className="ml-1 mr-2 text-slate-600">
                        ที่อยู่: 4 ถนนมหาดไทย ต.อรัญประเทศ อ.อรัญประเทศ
                        จ.สระแก้ว 27120
                      </p>
                    </div>
                    <div className="flex flex-row ">
                      <Phone
                        className="h-5 w-5   text-slate-600"
                        aria-hidden="true"
                      />
                      <Link
                        href="tel:03723303337"
                        className="ml-1 mr-2  text-slate-600 hover:text-violet-500 "
                      >
                        037233033-37
                      </Link>
                    </div>
                    <div className="flex flex-row">
                      <Mail
                        className="h-5 w-5  text-slate-600"
                        aria-hidden="true"
                      />
                      <Link
                        href="mailto:aranhos.team@gmail.com"
                        className="ml-1 mr-2 text-slate-600 hover:text-violet-500 "
                      >
                        aranhos.team@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md ">
                  <Image
                    src={"/images/contact/getintouch.jpg"}
                    width={800}
                    height={600}
                    alt={"getintouch"}
                    className=" rounded-xl "
                  />
                </div>
              </div>
            </CardContent>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <CardContent className="flex w-fit h-fit mx-auto px-0 py-0 lg:px-0 lg:py-0">
              <iframe
                width="800"
                height="500"
                title="map"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1152.4775375623476!2d102.50311659920263!3d13.6907488833378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311b138a34403e1d%3A0xfc9018d029084e59!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4Lit4Lij4Lix4LiN4Lib4Lij4Liw4LmA4LiX4Lio!5e0!3m2!1sth!2sth!4v1686458227633!5m2!1sth!2sth"
              />
            </CardContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={40}>
        <CardHeader className="text-center py-10">
          <CardTitle className="text-3xl text-primary">Contact Us</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            เราพร้อมบริการด้วยแพทย์ชำนาญการ บริการด้วยน้ำใจ ห่วงใยดุจญาติมิตร
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full flex-1 flex-col">
          <SendEmail />
        </CardContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
