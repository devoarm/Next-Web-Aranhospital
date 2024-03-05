import { NextResponse } from "next/server"
import { deleteUser, getUserbyId, updateUser } from "@/actions/user/user";
import { UserType, UserSchema } from "@/types/user.type";
import { getCurrentUser } from "@/lib/session";

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
            throw new Error(JSON.stringify(validationErrors, null, 2))
        } else {
            throw new Error("Invalid Schema")
        }
    }
}

export const GET = async (request: Request, context: any) => {
    try {
        const positionResult = await getUserbyId(Number(context.params.id))

        return NextResponse.json({ status: 200, results: positionResult })

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

export const PATCH = async (request: Request, context: any) => {
    const session = await getCurrentUser()
    try {
        if (session?.user.role === "ADMIN") {
            const jsonData = await request.json()
            const jsonValidated: any = validateUserSchema(jsonData)
            const positionResult = await updateUser(Number(context.params.id), jsonValidated)

            return NextResponse.json({ status: 200, results: positionResult })
        }
        return NextResponse.json({ status: 401, results: 'Not Admin!' })

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

export const DELETE = async (request: Request, context: any) => {
    const session = await getCurrentUser()
    try {
        if (session?.user.role === "ADMIN") {
            const positionResult = await deleteUser(Number(context.params.id))

            return NextResponse.json({ status: 200, results: positionResult })
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
