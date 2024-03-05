
import { NextResponse } from "next/server"
import { createContents, getAllContent, getIndexContent } from "@/actions/content/content";
import { getCurrentUser, getUserId } from "@/lib/session";
import { z } from "zod";
import { ContentSchema } from "@/types/content.type";

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
    let userId = await getUserId()
    try {
        if (!session?.user.username) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        }

        const jsonData = await request.json()
        const jsonValidated: any = validateSchema(jsonData)
        const contentResult = await createContents(userId, jsonValidated)

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

export const GET = async (request: Request) => {
    try {
        const contentResult = await getAllContent()

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


// export const GET = async (request: Request) => {
//     try {
//         const url = new URL(request.url)
//         let published: any = url.searchParams.get('published');
//         if (published === 'true') {
//             published = true;
//         } else {
//             published = false;
//         }

//         const contentResult = await getIndexContent()

//         return NextResponse.json({ status: 200, results: contentResult });

//     } catch (error: any) {
//         let errorMessage
//         try {
//             errorMessage = JSON.parse(error.message)
//         } catch (parseError: any) {
//             errorMessage = error.message
//         }
//         return NextResponse.json({ status: 500 , results: errorMessage })
//     }
// }
