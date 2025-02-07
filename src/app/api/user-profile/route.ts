import { NextResponse } from 'next/server';
import { cookies } from "next/headers";


export async function GET(request: Request) {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    
    if (!token) {
        return NextResponse.json({ error: 'Authentication token missing' }, { status: 401 });
    }
    try {
        const response = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
            },
        });
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
    }

    const data = await response.json();
    
    return NextResponse.json({
      message: 'User profile fetched successfully',
      profile: data,
    });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching user profile' }, { status: 500 });
  }
}
