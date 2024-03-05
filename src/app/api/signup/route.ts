import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { z } from "zod"
import { SignUpSchema } from "@/types/user.type"
import nodemailer from "nodemailer"
import { signUp } from '@/actions/signup/signup';

type SignupSchemaT = z.infer<typeof SignUpSchema>

function validateUserSchema(data: SignupSchemaT) {
    try {
        const parseData = SignUpSchema.parse(data);
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

export async function POST(request: Request) {
    
    try {
        const jsonData = await request.json()
        const jsonValidated = validateUserSchema(jsonData);
        const createUserResult = await signUp(jsonValidated);

        // console.log(createUserResult)
        return NextResponse.json({ status: 200, results: createUserResult });

    } catch (error: any) {
        let errorMessage;
        try {
            errorMessage = JSON.parse(error.message)
        } catch (parseError) {
            errorMessage = error.message
        }
        // console.log(errorMessage)
        return NextResponse.json({ status: 500, results: errorMessage })
    }
}