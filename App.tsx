"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Loading from "@/app/loading";

function App({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : children}
    </>
  );
}

export default App;
