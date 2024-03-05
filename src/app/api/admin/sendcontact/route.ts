
import { NextResponse } from 'next/server';
import { getSendcontact } from '@/actions/sendcontact/sendcontact';

export const GET = async () => {
    try {
        const getResult = await getSendcontact()
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
