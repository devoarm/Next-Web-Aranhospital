import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "./ui/label";

export default function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="mx-auto w-full max-w-screen-xl py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logoaranhos.png"
                width={170}
                height={170}
                alt="Aranhos Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-3 sm:grid-cols-3">
            <section>
              <Label>
                <h3 className="text-[14px] font-bold mb-3 text-white">
                  สำหรับเจ้าหน้าที่
                </h3>
              </Label>
              <ul>
                <li>
                  <Link
                    href="/backoffice"
                    target="_blank"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    Backoffice
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.aranhos.go.th/payslip/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    ขอใบรับรองเงินเดือน
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://aranh.thai-nrls.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    รายงานความเสี่ยง
                  </Link>
                </li>
              </ul>
            </section>
            <section>
              <Label>
                <h3 className="text-[14px] font-bold mb-3 text-white">
                  เกี่ยวกับเรา
                </h3>
              </Label>
              <ul>
                <li>
                  <Link
                    href="/about"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block "
                  >
                    ประวัติความเป็นมา
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    โครงสร้างหน่วยงาน
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    คำถามที่พบบ่อย
                  </Link>
                </li>
              </ul>
            </section>
            <section>
              <Label>
                <h3 className="text-[14px] font-bold mb-3 text-white">
                  ติดต่อเรา
                </h3>
              </Label>
              <ul>
                <li>
                  <Link
                    href="/contact"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    ติดต่อสอบถาม
                  </Link>
                </li>
                <li>
                  <Link
                    href="/internalphone"
                    className="hover:underline text-[14px] leading-[1.3] text-gray-400 mb-1 block"
                  >
                    เบอร์โทรภายใน
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <hr className="border-gray-700 sm:mx-auto my-3 sm:my-4 lg:my-5" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <span className="text-sm text-gray-400 sm:text-center ">
              © Copyright 2024 All Rights Reserved.
            </span>
          </div>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a
              href="https://www.facebook.com/aran.hosp"
              target="_blank"
              className="text-white bg-blue-600 hover:text-blue-100 hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
