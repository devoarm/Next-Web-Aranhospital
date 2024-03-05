import React from "react";
import CreateContentForm from "./_components/createcontent";

type Props = {};

export default function testPage({}: Props) {
  return (
    <div className="px-16 py-16 bg-slate-50 min-h-screen">
      <h2 className="text-2xl py-6 font-bold text-center">Content</h2>
      <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <CreateContentForm />
      </div>
    </div>
  );
}
