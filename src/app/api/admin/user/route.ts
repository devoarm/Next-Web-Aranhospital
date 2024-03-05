import { NextResponse } from "next/server"
import { createUser, getUser } from "@/actions/user/user";
import { UserSchema, UserType } from "@/types/user.type";

function validateSchema(data: UserType) {
    try {
        const parseData = UserSchema.parse(data);
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

export async function POST (request: Request){
    try {
        const jsonData = await request.json()
        const jsonValidated: any = validateSchema(jsonData)

        const Result = await createUser(jsonValidated)

        return NextResponse.json({ status: 200, results: Result})

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

export async function GET () {
    try {
        const Result = await getUser()

        return NextResponse.json({ status: 200, results: Result  });

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