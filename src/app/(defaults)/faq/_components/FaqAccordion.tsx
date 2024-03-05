"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion() {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            สถานที่ตั้งของโรงพยาบาลตั้งอยู่ที่ใด?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              ที่อยู่: 4 ถนนมหาดไทย ต.อรัญประเทศ <br />
              อ.อรัญประเทศ จ.สระแก้ว 27120
            </p>
            <div className="flex justify-center items-center px-0 py-2 lg:px-0 lg:py-3">
              <div className="max-w-fit w-full rounded-xl shadow-md bg-white px-4 py-4 lg:px-4 lg:py-4">
                <div className="flex justify-center items-center lg:px-0">
                  <iframe
                    width="500"
                    height="300"
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1152.4775375623476!2d102.50311659920263!3d13.6907488833378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311b138a34403e1d%3A0xfc9018d029084e59!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4Lit4Lij4Lix4LiN4Lib4Lij4Liw4LmA4LiX4Lio!5e0!3m2!1sth!2sth!4v1686458227633!5m2!1sth!2sth"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            การพิมพ์ใบรับรองวัคซีน ( โควิด-19 )
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              1. เข้าแอพหมอพร้อม <br />
              2. ไปที่เมนูใบรับรองโควิด 19 <br />
              3. เลือก ดูเอกสารรับรองฉีดวัคซีน <br />
              4. กดดาวน์โหลด <br />
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>การบริจาคโลหิตที่โรงพยาบาล</AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              สามารถบริจาคโลหิตได้ที่ <br />
              ธนาคารเลือด ชั้น 2 อาคารเจ้าพระยาบดินทรเดชา (สิงห์ สิงหเสนี)
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
