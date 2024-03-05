
import { NextResponse } from "next/server"
import { getContentPagination } from "@/actions/content/content"

export const GET = async (request: Request) => {
    try {
        const contentResult = await getContentPagination(request)

        return NextResponse.json({ status: 200 , results: contentResult });

    } catch (error: any) {
        let errorMessage
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError: any) {
            errorMessage = error.message
        }
        return NextResponse.json({ status: 500 , results: errorMessage })
    }
}
