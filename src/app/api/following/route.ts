import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); // Ensure `cookies()` is awaited
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      "https://dia-backend.numbersprotocol.io/api/v3/follows/",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch followed users" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      results: data.results.map((follow: any) => ({
        id: follow.id,
        username: follow.following_profile_display_name,
        profilePicture: follow.following_profile_picture_thumbnail,
        hasUnseenStory: follow.has_unseen_story
      }))
    });
    
  } catch (error) {
    console.error("Error fetching followed users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}