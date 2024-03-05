
import { createSendcontact, getSendcontact } from '@/actions/sendcontact/sendcontact';
import { SendcontactSchema, SendcontactType } from '@/types/sendcontact.type';
import { NextResponse } from 'next/server';
import { z } from 'zod';

type SendcontactSchemaType = z.infer<typeof SendcontactSchema>

function validateSchema(data: SendcontactSchemaType) {
    try {
        const parseData = SendcontactSchema.parse(data);
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
        const json: SendcontactSchemaType = await request.json();
        const jsonValidated = validateSchema(json);
        const createSendcontactResult = await createSendcontact(jsonValidated);

        return NextResponse.json({ status: 200, results: createSendcontactResult });

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

export async function GET(request: Request) {
    try {
        const getSendcontactResult = await getSendcontact()
        return NextResponse.json({ status: 200, results: getSendcontactResult });

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
