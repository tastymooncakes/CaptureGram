"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const StoriesBar = () => {
  const [followedUsers, setFollowedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const { data } = await axios.get("/api/following");
        setFollowedUsers(data.results);
      } catch (err) {
        setError("Failed to load stories");
        console.error("Error fetching followed users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedUsers();
  }, []);

  if (error) return null; // Or display error message

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex space-x-4 p-3 overflow-x-auto scrollbar-hide no-scrollbar">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={`skeleton-${i}`} className="flex flex-col items-center space-y-2 flex-shrink-0">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-12 h-3 rounded" />
            </div>
          ))
        ) : (
          followedUsers.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.username}`}
              className="flex flex-col items-center space-y-2 flex-shrink-0 group"
            >
              <div className="relative">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt={user.username}
                  className="w-16 h-16 rounded-full ring-2 ring-blue-500 p-0.5 object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-avatar.png";
                  }}
                />
                {user.hasUnseenStory && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium max-w-[72px] truncate">
                {user.username}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StoriesBar;