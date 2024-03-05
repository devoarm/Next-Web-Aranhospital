"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DataType } from "@/types/data.type";
import { ContentType } from "@/types/content.type";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_URL } from "@/lib/url";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Bookmark, CalendarDays, Eye } from "lucide-react";
import moment from "moment";

type Props = {
  contentall: ContentType;
};

export default function CardAllContent({ contentall }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState<ContentType[]>([]);

  type Props = {
    contentall: ContentType;
  };

  const fetchContent = async () => {
    try {
      const resCon: DataType = await axios.get(`${API_URL}/content`);

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
    <Card className="max-w-fit shadow-lg hover:shadow-lg hover:shadow-violet-200 space-y-3">
      <Link href={`/content/${contentall.id}`}>
        <Image
          src="/images/home/bg_news.jpg"
          width={1000}
          height={800}
          alt={contentall?.title}
          className="h-full border border-violet-500 border-opacity-50 rounded-lg overflow-hidden"
        />
        <CardContent className="px-4 py-3 min-h-24 h-24">
          <CardTitle className="text-md font-medium text-primary">
            {contentall?.title.substring(0, 130)}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-row items-end justify-end px-3 py-1 gap-1 space-x-1 text-gray-600">
        <p className="flex flex-row gap-1">
          <Bookmark className="w-5 h-5" /> {contentall?.category.name}
        </p>
        <p className="flex flex-row gap-1">
          <CalendarDays className="w-5 h-5" />{" "}
          {moment(contentall?.createdAt).format("DD/MM/YYYY")}
        </p>
        <p>
          <Eye className="w-5 h-5" /> {contentall?.viewCount}
        </p>
      </CardFooter>
    </Card>
  );
}
