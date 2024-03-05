import { NextResponse } from 'next/server';
import { getInternalphone } from '@/actions/internalphone/internalphone';

export const GET = async () => {
    try {
        const getResult = await getInternalphone()
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
