import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getCurrentUser } from "@/lib/session";

export async function ProfileButton() {
  const session = await getCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-5 w-5 rounded-full hover:bg-transparent hover:ring-transparent"
        >
          <Avatar className="h-5 w-5 ">
            <AvatarImage src="/images/iconuser.png" width={5} height={5} alt="Logo" />
            <AvatarFallback>
              {session && session?.user.firstname ? (
                <>{session?.user.firstname.substring(0, 2)}</>
              ) : (
                <>H</>
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit px-1 py-1" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-normal leading-none">
              {session && session.user?.firstname ? (
                <>
                  {session.user?.firstname} {session.user?.lastname} (
                  {session.user?.role})
                </>
              ) : (
                <>Aranyaprathet Hospital</>
              )}
            </p>
            <p className="text-xs font-light leading-none text-muted-foreground">
              {session && session.user?.email ? (
                <>{session.user?.email}</>
              ) : (
                <>aranyaprathet@hospital.go.th</>
              )}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {session && session.user?.role === "ADMIN" ? (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href="/admin/dashboard"
                  className="hover:text-primary w-full"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href="/admin/management"
                  className="hover:text-primary w-full"
                >
                  จัดการข้อมูล
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href="/dashboard"
                  className="hover:text-primary w-full"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/content/" className="hover:text-primary w-full">
              สร้างข่าวสาร
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/admin/personal-information"
              className="hover:text-primary w-full"
            >
              แก้ไขข้อมูลส่วนตัว
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <Link href="/signout" className="hover:text-primary w-full">
            ออกจากระบบ
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
