"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/lib/url";
import { DataType } from "@/types/data.type";
import { ContentType } from "@/types/content.type";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, CalendarDays, Eye, PenSquareIcon } from "lucide-react";
import BreadcrumbComponent from "../_components/Breadcrumbs";
import Progress from "../_components/Progress";

export default function ViewContentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [viewcontents, setViewContents] = useState<ContentType | undefined>();

  const fetchContentbyid = async () => {
    try {
      const resCon: DataType = await axios.get(
        `${API_URL}/content/${params.id}`
      );
      if (resCon.data.status == 200) {
        setViewContents(resCon.data.results[0]);
      }
    } catch (error: any) {
      return null;
    }
  };

  useEffect(() => {
    fetchContentbyid();
  }, []);

  return (
    <section className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8 gap-3">
      <BreadcrumbComponent />
      <Card className="flex flex-col mx-auto w-full h-full shadow-xl">
        <CardHeader className="w-full h-full gap-1">
          <CardTitle className=" font-normal text-lg">
            {viewcontents?.title}
          </CardTitle>
          <CardDescription className="flex flex-row gap-1">
            <Bookmark className="w-5 h-5" /> {viewcontents?.category.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full min-h-52">
          {viewcontents?.description ? (
            <CardDescription>{viewcontents?.description}</CardDescription>
          ) : (
            <CardDescription></CardDescription>
          )}
          {viewcontents?.images ? (
            <CardDescription>{viewcontents?.images}</CardDescription>
          ) : (
            <CardDescription></CardDescription>
          )}
          {viewcontents?.files ? (
            <CardDescription>{viewcontents?.files}</CardDescription>
          ) : (
            <CardDescription></CardDescription>
          )}
        </CardContent>

        <CardFooter className="w-full min-h-fit py-3 gap-3">
          <CardDescription className="flex flex-row gap-1">
            <PenSquareIcon className="w-5 h-5" /> {viewcontents?.user.firstname}{" "}
            {viewcontents?.user.lastname}
          </CardDescription>
          <CardDescription className="flex flex-row gap-1">
            <CalendarDays className="w-5 h-5" />{" "}
            {moment(viewcontents?.createdAt).format("DD/MM/YYYY")}
          </CardDescription>
          <CardDescription className="flex flex-row gap-1">
            <Eye className="w-5 h-5" /> {viewcontents?.viewCount}
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}
