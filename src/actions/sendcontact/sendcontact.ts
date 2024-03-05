'use server';

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { SendcontactSchema, SendcontactType } from '@/types/sendcontact.type';
import { z } from 'zod';

type SendcontactSchemaType = z.infer<typeof SendcontactSchema>

export const createSendcontact = async (data: SendcontactSchemaType) => {
    try {
        const result = await prisma.arh_sendcontact.create({
            data: {
                "name": data.name,
                "subject": data.subject,
                "email": data.email,
                "tel": data.tel,
                "message": data.message,
            }
        })
        return result;
    } catch (error: any) {
        throw new Error(error.message)
        // return NextResponse.json({ status: 500, results: error.message })
    }
}

export const getSendcontact = async () => {
    try {
        const result = await prisma.arh_sendcontact.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return result
    } catch (error: any) {
        throw new Error(error.message)
        // return NextResponse.json({ status: 500, results: error.message })
    }
}
