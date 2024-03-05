import { getCurrentUser } from '@/lib/session';
import { createPosition, getAllPosition, getPosition } from '@/actions/position/position';
import { positionSchema, PositionType } from '@/types/position.type';
import { NextResponse } from 'next/server';

function validateSchema(data: PositionType) {
    try {
        const parseData = positionSchema.parse(data);
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
     
        const json = await request.json();
        const jsonValidated = validateSchema(json);
        const createInternalphoneResult = await createPosition(jsonValidated);

        return NextResponse.json({ status: 200, results: createInternalphoneResult });
        
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

// export const POST = async (request: Request) => {
//     const session = await getCurrentUser()
//     try {
//         if (session?.user.role === "ADMIN" ) {
//         const json = await request.json();
//         const jsonValidated = validateSchema(json);
//         const createInternalphoneResult = await createPosition(jsonValidated);

//         return NextResponse.json({ status: 200, results: createInternalphoneResult });
//         }
//         return NextResponse.json({ status: 401, results: 'Not Admin!' })
        
//     } catch (error: any) {
//         let errorMessage;
//         try {
//             errorMessage = JSON.parse(error.message)
//         } catch (parseError) {
//             errorMessage = error.message
//         }
//         return NextResponse.json({ status: 500, results: errorMessage })
//     }
// }

export const GET = async (request: Request) => {
    try {
        const getResult = await getAllPosition()
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
