"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DataType } from "@/types/data.type";
import { ContentType } from "@/types/content.type";
import { API_URL } from "@/lib/url";
import { Card } from "@/components/ui/card";
import CardAllContent from "./_components/CardAllContent";
import CardContent from "./_components/CardContent";
import BreadcrumbComponent from "./_components/Breadcrumbs";
import PaginationComponent from "./_components/Pagination";

export default function ContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState<ContentType[]>([]);

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
    fetchContent();
  }, []);

  return (
    <section className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8 gap-3">
      <BreadcrumbComponent />
      <Card className="flex flex-col mx-auto w-full h-fit min-h-screen shadow-xl px-3">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-1 my-4">
          {contents.map((item: ContentType) => (
            <div key={item.id}>
              <CardContent contents={item} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <PaginationComponent />
        </div>
      </Card>
    </section>
  );
}
