
import NotUser from "@/app/not-user";
import { getCurrentUser } from "@/lib/session";

interface ContentLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function ContentLayout({ children }: ContentLayoutProps) {
  const session = await getCurrentUser();
  const notUser = session?.user.role != "USER";

  // if (!session || notUser) {
  //   return <NotUser />;
  // }

  return <>{children}</>;
}
