import { NextResponse } from "next/server"
import { z } from "zod";
import { ContentSchema } from "@/types/content.type";
import { createContents, getAllContent } from "@/actions/content/content";
import { getCurrentUser } from "@/lib/session";

function validateSchema(data: z.infer<typeof ContentSchema>) {
    try {
        const parseData = ContentSchema.parse(data);
        return parseData;
    } catch (error: any) {
        if (error.issues && error.issues.length > 0) {
            const validationErrors = error.issues.map((issue: any) => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
            throw new Error(JSON.stringify(validationErrors, null, 2))
        } else {
            throw new Error("Invalid Schema")
        }
    }
}

export const POST = async (request: Request) => {
    const session = await getCurrentUser()
    let userId = session?.user.id
    console.log(userId)
    try {
        if (session?.user.role === "ADMIN" ) {
        const jsonData = await request.json();
        const jsonValidated = validateSchema(jsonData);
        const Results = await createContents(userId ,jsonValidated);

        return NextResponse.json({ status: 200, results: Results });
        }
        return NextResponse.json({ status: 401, results: 'Not Admin!' })
        
    } catch (error: any) {
        let errorMessage;
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError) {
            errorMessage = error.message
        }
        return NextResponse.json({ status: 500, results: errorMessage })
    }
}


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
        const getResult = await getAllContent()
        return NextResponse.json({ status: 200, results: getResult });

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