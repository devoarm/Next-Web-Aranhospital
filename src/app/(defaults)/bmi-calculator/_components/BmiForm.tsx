"use client";

import React, { useState, useEffect } from "react";
import Weight from "./Weight";
import Height from "./Height";
import ResultCard from "./ResultCard";

const BmiForm = () => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setHeight(0);
    setWeight(0);
    setBmi(0);
    setCategory("");
  };

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const calculatedBmi: any = (
        weight /
        ((height / 100) * (height / 100))
      ).toFixed(1);
      console.log("Calculated BMI:", calculatedBmi);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) {
        setCategory("น้ำหนักน้อยหรือผอม");
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 22.9) {
        setCategory("ปกติ");
      } else if (calculatedBmi >= 23 && calculatedBmi <= 24.9) {
        setCategory("โรคอ้วนระดับที่ 1");
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        setCategory("โรคอ้วนระดับที่ 2");
      } else if (calculatedBmi >= 30) {
        setCategory("โรคอ้วนระดับที่ 3");
      }
    } else {
      setBmi(0);
      setCategory("");
    }
  }, [height, weight]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <Height height={height} setHeight={setHeight} />
        <Weight weight={weight} setWeight={setWeight} />
      </div>

      <ResultCard bmi={bmi} category={category} reset={handleReset} />
    </form>
  );
};

export default BmiForm;
