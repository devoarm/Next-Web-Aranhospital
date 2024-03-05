import React from "react";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
