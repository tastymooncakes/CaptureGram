import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const MAX_AGE = 3600; // 1 hour

  try {
    const response = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/token/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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
        message: 'Login successful',
        expires_at: expiration.toISOString()
      }, { headers });
    }
    
    return NextResponse.json({ error: data.message || 'Invalid credentials' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
  }
}