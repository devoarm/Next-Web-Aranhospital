import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const root = "Hello API 🌻🌍"
        return NextResponse.json({ status: 200, results: root });

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
