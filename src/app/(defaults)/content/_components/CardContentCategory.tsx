import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ContentType } from "@/types/content.type";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Bookmark, CalendarDays, Eye } from "lucide-react";
import moment from "moment";

type Props = {
  contentcategory: ContentType;
};

export default function CardContentCategory({ contentcategory }: Props) {
  const router = useRouter();

  return (
    <Card className="max-w-fit shadow-lg hover:shadow-lg hover:shadow-violet-200 space-y-3">
      <Link href={`/content/${contentcategory.id}`}>
        <Image
          src="/images/home/bg_news.jpg"
          width={1000}
          height={800}
          alt={contentcategory?.title}
          className="h-full border border-violet-500 border-opacity-50 rounded-lg overflow-hidden"
        />
        <CardContent className="px-4 py-3 min-h-24 h-24">
          <CardTitle className="text-md font-medium text-primary">
            {contentcategory?.title.substring(0, 130)}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-row items-end justify-end px-3 py-1 gap-1 space-x-1 text-gray-600">
        <p className="flex flex-row gap-1">
          <Bookmark className="w-5 h-5" /> {contentcategory?.category.name}
        </p>
        <p className="flex flex-row gap-1">
          <CalendarDays className="w-5 h-5" />{" "}
          {moment(contentcategory?.createdAt).format("DD/MM/YYYY")}
        </p>
        <p className="flex flex-row gap-1">
          <Eye className="w-5 h-5" /> {contentcategory?.viewCount}
        </p>
      </CardFooter>
    </Card>
  );
}
