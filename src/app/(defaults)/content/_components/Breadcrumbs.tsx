import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function BreadcrumbComponent() {
  return (
    <Breadcrumbs
      underline="hover"
      classNames={{
        list: "bg-transparent shadow-small",
      }}
      itemClasses={{
        item: "text-gray-500 data-[current=true]:text-gray-500",
        separator: "text-gray-500",
      }}
      variant="solid"
    >
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/content">Content</BreadcrumbItem>
    </Breadcrumbs>
  );
}
