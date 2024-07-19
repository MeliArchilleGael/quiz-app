// pages/api/session.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // Get the session cookie
    const session = request.cookies.get('session');

    if (!session) {
        // If there's no session, create a new one
        const newSession = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            data: {},
        };

        // Set the new session cookie
        const response = NextResponse.json(newSession);
        response.cookies.set('session', JSON.stringify(newSession));
        return response;
    } else {
        // Update the session data
        const existingSession = JSON.parse(session.value);
        return NextResponse.json(existingSession);
    }
}

export async function POST(request: NextRequest) {
    // Get the session cookie
    const session = request.cookies.get('session');

    if (!session) {
        // If there's no session, create a new one
        const newSession = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            data: {},
        };

        // Set the new session cookie
        const response = NextResponse.json(newSession);
        response.cookies.set('session', JSON.stringify(newSession));
        return response;
    } else {
        // Update the session data
        const existingSession = JSON.parse(session.value);
        const body = await request.json();
        existingSession.data = { ...existingSession.data, ...body };

        // Set the updated session cookie
        const updatedResponse = NextResponse.json(existingSession);
        updatedResponse.cookies.set('session', JSON.stringify(existingSession));
        return updatedResponse;
    }
}
