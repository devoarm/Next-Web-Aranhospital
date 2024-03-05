"use client";

import React, { ReactNode, Suspense } from "react";
import App from "../../App";
import Loading from "@/app/loading";

interface IProps {
  children?: ReactNode;
}

const MainProvider = ({ children }: IProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <App>{children}</App>
    </Suspense>
  );
};

export default MainProvider;
