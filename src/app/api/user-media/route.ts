import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
        return NextResponse.json({ error: 'Authentication token missing' }, { status: 401 });
    }

    try {
        const response = await fetch('https://dia-backend.numbersprotocol.io/api/v3/assets/', {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch user assets' }, { status: 500 });
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'No assets found for the user' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'User assets fetched successfully',
            assets: data,
        });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching user assets' }, { status: 500 });
    }
}
