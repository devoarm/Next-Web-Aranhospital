import { getCurrentUser } from '@/lib/session';
import { createCategory, getCategory } from '@/actions/category/category';
import { CategorySchema } from '@/types/category.type';
import { NextResponse } from 'next/server';
import { z } from 'zod';

function validateSchema(data: z.infer<typeof CategorySchema>) {
    try {
        const parseData = CategorySchema.parse(data);
        return parseData;
    } catch (error: any) {
        if (error.issues && error.issues.length > 0) {
            const validationErrors = error.issues.map((issue: any) => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
            throw new Error(JSON.stringify(validationErrors))
        }
        throw new Error(error.message)
    }
}

export const POST = async (request: Request) => {
    const session = await getCurrentUser()
    try {
        if (session?.user.role === "ADMIN" ) {
        const json = await request.json();
        const jsonValidated = validateSchema(json);
        const createInternalphoneResult = await createCategory(jsonValidated);

        return NextResponse.json({ status: 200, results: createInternalphoneResult });
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

export const GET = async () => {
    try {
        const getResult = await getCategory()
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
