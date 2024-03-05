import { getCurrentUser } from '@/lib/session';
import { createUser } from '@/actions/user/user';
import { UserSchema, UserType } from '@/types/user.type';
import { NextResponse } from 'next/server';

function validateUserSchema(data: UserType) {
    try {
        const parseData = UserSchema.parse(data);
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
            const jsonData = await request.json();
            const jsonValidated = validateUserSchema(jsonData);
            const createUserResult = await createUser(jsonValidated);

            return NextResponse.json({ status: 200, results: createUserResult });
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
