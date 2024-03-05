import { getCurrentUser } from '@/lib/session';
// import { createPrefix, getPrefix } from '@/actions/prefix/prefix';
import { PrefixSchema , PrefixType} from '@/types/prefix.type';
import { NextResponse } from 'next/server';
import { z } from 'zod';

function validateSchema(data: z.infer<typeof PrefixSchema>) {
    try {
        const parseData = PrefixSchema.parse(data);
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
        const createInternalphoneResult = await createPrefix(jsonValidated);

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

export const GET = async (request: Request) => {
    try {
        const getResult = await getPrefix()
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
function createPrefix(jsonValidated: { name: string; active: boolean; }) {
    throw new Error('Function not implemented.');
}

function getPrefix() {
    throw new Error('Function not implemented.');
}

