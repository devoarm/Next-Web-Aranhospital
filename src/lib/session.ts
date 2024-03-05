import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function getCurrentUser() {
  const session = await getServerSession(options)
  return session
}

export async function getUserId() {
  const session = await getServerSession(options)
  const userId = session?.user?.id

  if (!userId) {
    throw new Error("You must be signed in to use this feature")
  }

  return userId
}


export async function getUserRole() {
  const session = await getServerSession(options)
  const userRole = session?.user?.role

  if (!userRole) {
    throw new Error("You must be signed in to use this feature")
  }

  return userRole
}