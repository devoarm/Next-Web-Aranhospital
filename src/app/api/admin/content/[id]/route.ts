import { NextResponse } from "next/server"
import { z } from "zod";
import { ContentSchema } from "@/types/content.type";
import { validateToken } from "@/actions/token/validateToken";




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

// export const PATCH = async (request: Request, context: any) => {
//     try {
//         const jsonData = await request.json()
//         const jsonValidated: any = validateSchema(jsonData)

//         let contentResult
//         if (tokenValidated) {
//             contentResult = await updateAdminContent(Number(context.params.id), jsonValidated)
//         }

//         return NextResponse.json({ "content": contentResult }, { status: 200 })

//     } catch (error: any) {
//         var errorMessage;
//         try {
//             errorMessage = JSON.parse(error.message)
//         } catch (parseError) {
//             errorMessage = error.message
//         }
//         return NextResponse.json({ error: errorMessage }, { status: 500 })
//     }

// }

export const GET = async (request: Request, context: any) => {
    try {

        const token = request.headers.get('Authorization');
        const tokenValidated: any = await validateToken(token)

        const url = new URL(request.url)

        let published: any = url.searchParams.get('published');
        if (published === 'true') {
            published = true;
        } else {
            published = false;
        }

        let contentResult;
        if (tokenValidated) {
            contentResult = await getAdminContent()

        }
        return NextResponse.json({ "content": contentResult }, { status: 200 });

    } catch (error: any) {
        let errorMessage
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError: any) {
            errorMessage = error.message
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}

// export const DELETE = async (request: Request, context: any) => {
//     try {
//         const token = request.headers.get('Authorization')
//         const tokenValidated: any = await validateToken(token)

//         let contentResult
//         if (tokenValidated) {
//             contentResult = await deleteAdminContent(Number(context.params.id))
//         }

//         return NextResponse.json({ "content": contentResult }, { status: 200 })

//     } catch (error: any) {
//         let errorMessage;
//         try {
//             errorMessage = JSON.parse(error.message)
//         } catch (parseError) {
//             errorMessage = error.message
//         }
//         return NextResponse.json({ error: errorMessage }, { status: 500 })
//     }

// }

function getAdminContent(): any {
    throw new Error("Function not implemented.");
}
