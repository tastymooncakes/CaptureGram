// api/user-media/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Authentication token missing" }, { status: 401 });
  }

  try {
    const response = await fetch("https://dia-backend.numbersprotocol.io/api/v3/assets/", {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return NextResponse.json({ error: "Failed to fetch user assets" }, { status: 500 });
    }

    const data = await response.json();
    // Check if data.assets?.results exists and is an array
    if (!data.assets?.results || !Array.isArray(data.assets.results)) {
        console.error('Invalid data structure:', data);
        return NextResponse.json({ error: 'Invalid data format from API' }, { status: 500 });
    }

    return NextResponse.json({
      message: "User assets fetched successfully",
      assets: data,
    });
  } catch (error) {
    console.error("An error occurred while fetching user assets", error);
    return NextResponse.json({ error: "An error occurred while fetching user assets" }, { status: 500 });
  }
}
