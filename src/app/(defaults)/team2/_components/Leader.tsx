"use client";

import React from "react";
import { Avatar } from "@radix-ui/themes";

const boss = [
  {
    name: "นพ.ราเชษฎ เชิงพนม",
    role: "ผู้อำนวยการโรงพยาบาลอรัญประเทศ",
    imageUrl: "/images/team/boss.jpg",
  },
];

const people = [
  {
    name: "นพ.สรวิศ ชลาลัย",
    role: "รองผู้อำนวยการฝ่ายการแพทย์",
    imageUrl: "/images/team/soravit.jpg",
  },
  {
    name: "นางสาวขนิษฐา ประดุจพรม",
    role: "รองผู้อำนวยการฝ่ายการพยาบาล",
    imageUrl: "/images/team/auy.jpg",
  },
  {
    name: "นางสาวพยอมไพร ลือชา",
    role: "รองผู้อำนวยการฝ่ายบริหาร",
    imageUrl: "/images/team/air.jpg",
  },
  {
    name: "นายเชิดชัย ศิริมหา",
    role: "หัวหน้ากลุ่มภารกิจด้านพัฒนาและสนับสนุนระบบบริการสุขภาพ (พรส.)",
    imageUrl: "/images/team/aef.jpg",
  },
];

const it = [
  {
    name: "นายยงยุธ หารจันทร์",
    role: "นักวิชาการคอมพิวเตอร์",
    imageUrl: "/images/team/it-yut.jpg",
  },
  {
    name: "นายณัฐพงศ์ เงางาม",
    role: "นักวิชาการคอมพิวเตอร์",
    imageUrl: "/images/team/it-arm.jpg",
  },
  {
    name: "นายภาณุพงศ์ นามดา",
    role: "นักวิชาการคอมพิวเตอร์",
    imageUrl: "/images/team/it-golf.jpg",
  },
  {
    name: "นายจักภานุ ทองเลิศ",
    role: "เจ้าพนักงานเครื่องคอมพิวเตอร์",
    imageUrl: "/images/team/it-sak.jpg",
  },
  {
    name: "นายปัญญา จันทร์สีนวล",
    role: "เจ้าพนักงานเครื่องคอมพิวเตอร์",
    imageUrl: "/images/team/it-keng.jpg",
  },
];

export default function TeamLeader() {
  return (
    <section className="px-4 pt-7 lg:px-4 lg:pt-7">
      <ul
        role="list"
        className=""
      >
        {boss.map((person) => (
          <li key={person.name}>
            <div className="flex flex-col justify-center items-center gap-x-6 mb-14">
              <Avatar
                size="8"
                src={person.imageUrl}
                fallback={person.name.substring(0, 2)}
              />
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  {person.name}
                </h3>
                <p className="text-md font-light text-primary">{person.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ul
        role="list"
        className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2"
      >
        {people.map((person) => (
          <li key={person.name}>
            <div className="flex flex-col justify-center items-center gap-x-6 mb-14">
              <Avatar
                size="8"
                src={person.imageUrl}
                fallback={person.name.substring(0, 2)}
              />
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  {person.name}
                </h3>
                <p className="text-md font-light text-primary">{person.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
