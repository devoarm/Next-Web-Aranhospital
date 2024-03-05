import { NextResponse } from "next/server"
import { getIndexContent } from "@/actions/content/content";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url)
        let published: any = url.searchParams.get('published');
        let limit = url.searchParams.get('limit');
        if (published === 'true') {
            published = true;
        } else {
            published = false; 
        }

        const contentResult = await getIndexContent(limit)

        return NextResponse.json({ status: 200, results: contentResult });

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
