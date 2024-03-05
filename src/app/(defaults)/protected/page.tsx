import { Button } from "@nextui-org/react";
import React from "react";

export default function ProtectedPage() {
  const test = async () => {
    "use server"
    console.log("Test2")
  }
  return (
    <section className="flex flex-col min-h-screen justify-center items-center">
      <div>ProtectedPage!</div>
      <form>
        <Button formAction={test}>Click</Button>
      </form>
    </section>
  );
}
