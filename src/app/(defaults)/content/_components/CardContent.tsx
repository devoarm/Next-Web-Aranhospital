import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ContentType } from "@/types/content.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bookmark, CalendarDays, Eye, PenSquareIcon } from "lucide-react";
import moment from "moment";

type Props = {
  contents: ContentType;
};

export default function CardContents({ contents }: Props) {
  const router = useRouter();

  return (
    <Card className="max-w-fit shadow-lg hover:shadow-lg hover:shadow-violet-200 space-y-3">
      <Link href={`/content/${contents.id}`}>
        <Image
          src="/images/home/bg_news.jpg"
          width={1000}
          height={800}
          alt={contents?.title}
          className="h-full border border-violet-500 border-opacity-50 rounded-lg overflow-hidden"
        />
        <CardContent className="px-4 py-3 min-h-24">
          <CardTitle className="text-md font-medium text-primary">
            {contents?.title.substring(0, 140)}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-row items-end justify-end px-3 py-1 gap-1 space-x-1 text-gray-600">
        <Link
          href={`/content/category/${contents.category.id}`}
          className="flex flex-row hover:text-violet-500 hover:underline"
        >
          <Bookmark className="w-5 h-5" /> {contents?.category.name}
        </Link>
        <p className="flex flex-row gap-1">
          <CalendarDays className="w-5 h-5" />{" "}
          {moment(contents?.createdAt).format("DD/MM/YYYY")}
        </p>
        <p className="flex flex-row gap-1">
          <Eye className="w-5 h-5" /> {contents?.viewCount}
        </p>
      </CardFooter>
    </Card>
  );
}
