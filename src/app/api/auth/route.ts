import { getServerSession } from "next-auth";
import { options } from "./[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(options);
    return NextResponse.json({ authenticated: !!session })
}