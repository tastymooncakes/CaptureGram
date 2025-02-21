"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserStore } from "../localStorage/userStore";
import Image from "next/image";

interface MediaItem {
  asset_file_thumbnail: string | null; // We expect asset_file_thumbnail to be a string or null
}

const UserProfilePage = () => {
  const { username } = useParams(); // Now matches the folder name
  const { profilePicture, description, followCount, followingCount } = useUserStore();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const response = await fetch(`/api/user-media`);
        const data = await response.json();
        console.log(data.assets?.results); // Inspect the returned data

        // Filter out any items that don't have the asset_file_thumbnail
        const validMedia = data.assets?.results.filter((item: MediaItem) => item.asset_file_thumbnail);
        setMedia(validMedia || []); // Set valid media or an empty array
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      console.log("fetching");
      fetchUserMedia();
    }
  }, [username]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Image
          src={profilePicture || "/default-avatar.png"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">{username}</h1>
          <p className="text-gray-400">{description || "No description available"}</p>
          <div className="flex space-x-4 mt-1">
            <span>{followCount} Followers</span>
            <span>{followingCount} Following</span>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      <h2 className="mt-6 text-lg font-semibold">Media</h2>
      {loading ? (
        <p>Loading...</p>
      ) : media.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {media.map((item, index) => (
            item.asset_file_thumbnail ? (
              <Image
                key={index}
                src={item.asset_file_thumbnail}
                alt={`Media ${index}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            ) : null
          ))}
        </div>
      ) : (
        <p>No media found.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
