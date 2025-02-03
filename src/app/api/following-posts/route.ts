import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {

    // Get auth token from cookies
    const cookieStore = await cookies(); // Ensure `cookies()` is awaited
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    // Get pagination parameters with defaults
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    // Build the API URL with pagination parameters
    const apiUrl = new URL("https://dia-backend.numbersprotocol.io/api/v3/store/products/");
    apiUrl.searchParams.set("limit", limit.toString());
    apiUrl.searchParams.set("offset", offset.toString());
    apiUrl.searchParams.append("following_only", "true");

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch public assets" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the API response
    const transformedData = {
      results: data.results.map((item: any) => ({
        id: item.id,
        user: {
          name: item.owner_profile_display_name || "Unknown",
          avatar: item.owner_profile_picture_thumbnail || "/default-avatar.png",
        },
        imageUrl: item.cover_image_thumbnail || item.cover_image,
        caption: item.description || "No description available",
        likes: Math.floor(Math.random() * 1000),
        comments: [],
      }))
      .filter((post: { imageUrl?: string }) => post.imageUrl),
      pagination: {
        limit,
        offset,
        total: data.count || 0, // Assuming the API returns a total count
        hasMore: data.count ? offset + limit < data.count : false
      }
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching public assets:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}