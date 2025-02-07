import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const MAX_AGE = 360000; // 1 hour

  try {
    // Step 1: Authenticate and get the token
    const response = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/token/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Step 2: Use the token to get user information
      const authToken = data.auth_token;

      const profileResponse = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/users/profile/', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `token ${authToken}` // Include the token in the Authorization header
        },
      });

      const profileData = await profileResponse.json();

      if (profileResponse.ok) {
        const headers = new Headers();
        const expiration = new Date(Date.now() + MAX_AGE * 1000);
        
        headers.append(
          'Set-Cookie',
          `token=${authToken}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`
        );

        return NextResponse.json({ 
          message: 'Login successful',
          expires_at: expiration.toISOString(),
          user: profileData // Include user profile data in the response
        }, { headers });
      } else {
        return NextResponse.json({ error: 'Failed to fetch user profile.' }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: data.message || 'Invalid credentials' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
  }
}
