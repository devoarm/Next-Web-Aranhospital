import { NextResponse } from "next/server"
import { validateToken } from "@/actions/token/validateToken";
import {  ViewCount, deleteContent, getContentbyId, updateContent  } from "@/actions/content/content";
import { ContentSchema } from "@/types/content.type";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

function validateContentSchema(data: z.infer<typeof ContentSchema>) {
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

export const PATCH = async (request: Request, context: any) => {
    const session = await getCurrentUser()
    // let userId = 1
    let userId = session?.user.id
     console.log(userId)
    try {
        // if (!session?.user.username) {
        //         return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        //     }

        const jsonData = await request.json()
        const jsonValidated: any = validateContentSchema(jsonData)
        const contentResult = await updateContent(Number(context.params.id), userId, jsonValidated)

        return NextResponse.json({ status: 200, results: contentResult })

    } catch (error: any) {
        var errorMessage;
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError) {
            errorMessage = error.message
        }
        return NextResponse.json({ status: 500, results: errorMessage })
    }

}

export const GET = async (request: Request, context: any) => {
    try {
        const contentResult: any = await getContentbyId(Number(context.params.id))
        await ViewCount(Number(context.params.id))

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

export const DELETE = async (request: Request, context: any) => {
    const session = await getCurrentUser()
    let userId: any = session?.user.id
    // let userId = 1
    try {
        if (!session?.user.username) {
                return NextResponse.json({ status: 401, results: 'Not Authenticated!' })
            }

        const contentResult = await deleteContent(Number(context.params.id), userId)

        return NextResponse.json({ status: 200, results: contentResult })

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