"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { DataType } from "@/types/data.type";
import { ContentType } from "@/types/content.type";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_URL } from "@/lib/url";
import CardContents from "@/app/(defaults)/content/_components/CardContent";

export default function ContentComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState<ContentType[]>([]);

  const fetchContent = async () => {
    try {
      const resCon: DataType = await axios.get(`${API_URL}/content/index?limit=3`);

      if (resCon.data.status == 200) {
        setContents(resCon.data.results);
      }
    } catch (error: any) {
      return null;
    }
  };

  useEffect(() => {
    AOS.init();
    fetchContent();
  }, []);
  return (
    <section
      className="w-full mx-auto px-4 py-4 lg:px-10 lg:py-7 "
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="100"
    >
      <Link
        href="/content"
        className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary hover:underline"
      >
        ประชาสัมพันธ์
      </Link>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-1 my-4">
        {contents.map((item: ContentType) => (
          <div key={item.id}>
            <CardContents contents={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
