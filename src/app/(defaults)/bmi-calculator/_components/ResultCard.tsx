import React from "react";
import { Button } from "@/components/ui/button";

export default function ResultCard(props: {
  bmi: any;
  category: any;
  reset: any;
}) {
  const { bmi, category, reset } = props;

  const data = [
    {
      label: "ค่า BMI ของคุณเท่ากับ",
      value: bmi,
    },
    {
      label: "ผลลัพธ์ :",
      value: category,
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-xl bg-violet-400 text-violet-100 p-5 lg:py-10">
      <div className="flex flex-col gap-y-8">
        {data.map((item, i) => (
          <div key={i} className="flex items-end justify-between">
            <div>
              <p className=" text-lg font-bold">{item.label}</p>
            </div>
            <div className="flex items-baseline gap-x-2">
              <span className="text-lg font-bold ">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="mt-14 w-full rounded-md bg-violet-50 px-3.5 
py-2.5 text-lg font-semibold uppercase text-violet-500 shadow-sm 
hover:bg-violet-100 hover:text-violet-600 focus-visible:outline focus-visible:outline-2 
focus-visible:outline-offset-4 focus-visible:outline-white"
        onClick={(e) => reset(e)}
      >
        รีเซ็ต BMI
      </Button>
    </div>
  );
}
