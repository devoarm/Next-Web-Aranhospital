"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/actions/recaptcha/reCAPTCHA";
import Swal from "sweetalert2";
import { API_URL } from "@/lib/url";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";

export default function SendEmail() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tel, setTel] = useState("");

  async function sendEmail(e: any) {
    e.preventDefault();
    delay(500)
    Swal.fire({
      title: "ต้องการส่งคำร้องหรือไม่ ?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonColor: "#8b5cf6",
      denyButtonColor: "#a78bfa",
      cancelButtonColor: "#f3e8ff",
      confirmButtonText: `ตกลง`,
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        emailjs
          .sendForm(
            "service_7ell403",
            "template_qosg3pe",
            e.target,
            "JYgscLNp9Ip-ZaWgs"
          )
          .then(
            async (result) => {
              if (name && subject && email && tel && message) {
                try {
                  const res = await axios.post(`${API_URL}/sendcontact`, {
                    name,
                    subject,
                    email,
                    tel,
                    message,
                  });
                  setName("");
                  setSubject("");
                  setEmail("");
                  setTel("");
                  setMessage("");
                  router.push("/contact");
                } catch (errorMessage: any) {
                  console.log("Error send to database");
                }
              } else {
                Swal.fire({
                  title: "ข้อมูลไม่ครบ!",
                  icon: "error",
                  timer: 1500,
                });
                return;
              }
              console.log(result.text);
              Swal.fire({
                title: "ส่งคำร้องเรียนเรียบร้อยแล้ว!",
                text: "คำร้องเรียนของท่านจะถูกส่งไปยังอีเมลของเรา",
                icon: "success",
                timer: 1500,
              });
            },
            (error) => {
              console.log(error.text);
              Swal.fire({
                title: "ส่งคำร้องเรียนไม่สำเร็จ!",
                icon: "error",
                timer: 1500,
              });
            }
          );
        console.log(e.target);
      } else if (result.isDenied) {
        Swal.fire({
          title: "ลองอีกครั้ง",
          icon: "info",
          timer: 1000,
        });
      }
    });
  }

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  return (
    <form
      onSubmit={sendEmail}
      autoComplete="off"
      className="mx-auto mt-4 max-w-lg lg:mt-4"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="flex flex-col">
            <Label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-violet-700"
            >
              ชื่อ - นามสกุล
            </Label>
            <Input
              required
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex flex-col">
            <Label
              htmlFor="subject"
              className="block text-sm font-semibold leading-6 text-violet-700"
            >
              เรื่อง
            </Label>
            <Input
              required
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex flex-col">
            <Label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-violet-700"
            >
              อีเมล
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <Input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex flex-col">
            <Label
              htmlFor="tel"
              className="block text-sm font-semibold leading-6 text-violet-700"
            >
              เบอร์โทรศัพท์
            </Label>
            <Input
              required
              type="text"
              name="tel"
              size={10}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="block w-full px-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex flex-col">
            <Label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-violet-700"
            >
              รายละเอียด
            </Label>
            <Textarea
              required
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={255}
              rows={4}
              className="block w-full px-2 rounded-md border-1 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <ReCAPTCHA
            sitekey="6LdsTf4nAAAAAP9S-PoEM4wJcyhRm0CJnOH24W9s"
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
        </div>
      </div>
      <div className="mt-7">
        <Button
          type="submit"
          disabled={!isVerified}
          className="block w-full rounded-md bg-violet-600 mt-4 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
}
