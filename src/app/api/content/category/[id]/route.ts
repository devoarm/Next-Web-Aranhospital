import { NextResponse } from "next/server"
import { getContentCategorybyId } from "@/actions/content/content"

export const GET = async (request: Request, context: any) => {
    try {
        const contentResult: any = await getContentCategorybyId(Number(context.params.id))

        return NextResponse.json({ status: 200, results: contentResult });

    } catch (error: any) {
        let errorMessage
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError: any) {
            errorMessage = error.message
        }
        return NextResponse.json({ status: 500, results: errorMessage })
    }
}
