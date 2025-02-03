import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const MAX_AGE = 3600; // 1 hour
  const cookieStore = await cookies(); // Ensure `cookies()` is awaited
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'No session found' },
      { status: 401 }
    );
  }

  try {
    // Call your refresh endpoint or re-validate existing token
    const response = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      const headers = new Headers();
      const expiration = new Date(Date.now() + MAX_AGE * 1000);

      headers.append(
        'Set-Cookie',
        `token=${data.auth_token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`
      );

      return NextResponse.json({
        message: 'Token refreshed',
        expires_at: expiration.toISOString()
      }, { headers });
    }

    return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error refreshing token' },
      { status: 500 }
    );
  }
}