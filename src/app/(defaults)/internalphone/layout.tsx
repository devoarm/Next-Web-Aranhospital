import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เบอร์โทรศัพท์ภายใน",
};

interface InternalphoneProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function InternalphoneLayout({ children }: InternalphoneProps) {
  return (
    <>
      {children}
    </>
  ) 
}
