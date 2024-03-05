"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/lib/url";
import { DataType } from "@/types/data.type";
import { ContentType } from "@/types/content.type";
import moment from "moment";
import { Card } from "@/components/ui/card";
import BreadcrumbComponent from "../../_components/Breadcrumbs";
import CardContentCategory from "../../_components/CardContentCategory";

export default function ViewContentCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contentcategory, setContentcategory] = useState<ContentType[]>([]);

  const fetchContentCategorybyid = async () => {
    try {
      const resCon: DataType = await axios.get(
        `${API_URL}/content/category/${params.id}`
      );
      console.log(resCon);
      if (resCon.data.status == 200) {
        setContentcategory(resCon.data.results);
      }
    } catch (error: any) {
      return null;
    }
  };

  useEffect(() => {
    fetchContentCategorybyid();
  }, []);

  return (
    <section className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8 gap-3">
      <BreadcrumbComponent />
      <Card className="flex flex-col mx-auto w-full h-fit min-h-screen shadow-xl px-3">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-1 my-4">
          {contentcategory.map((item: ContentType) => (
            <div key={item.id}>
              <CardContentCategory contentcategory={item} />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
