
import React from "react";
import HeroComponent from "@/components/home/HeroComponent";
import ContentComponent from "@/components/home/ContentComponent";
import CompanyComponent from "@/components/home/CompanyComponent";
import { genPageMetadata } from "@/app/seo";

export const metadata = genPageMetadata({ title: 'โรงพยาบาลอรัญประเทศ' })

export default function Home() {
  return (
    <>
      <HeroComponent />
      <ContentComponent />
      <CompanyComponent />
    </>
  );
}




