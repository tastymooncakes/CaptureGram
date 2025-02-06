"use client";

import Image from "next/image";
import { Post } from "./types";

/*
<div className="mt-4 flex items-center space-x-6">
<div className="flex items-center text-gray-600">
  <button className="flex items-center hover:text-red-500 transition-colors">
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
    <span className="text-sm">{post.likes}</span>
  </button>
</div>

<div className="flex items-center text-gray-600">
  <button className="flex items-center hover:text-blue-500 transition-colors">
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
    <span className="text-sm">{post.comments.length}</span>
  </button>
</div>
</div>
*/

interface StoreFeedItemProps {
  post: Post;
}

const StoreFeedItem = ({ post }: StoreFeedItemProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.jpg";
    target.onerror = null; // Prevent infinite loop if placeholder also fails
  };

  return (
    <article className="mb-6 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      {/* User Info Section */}
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="rounded-full object-cover"
            onError={handleImageError}
          />
        </div>
        <h3 className="ml-3 font-medium text-gray-900">{post.user.name}</h3>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={post.imageUrl}
          alt="Post content"
          fill
          className="rounded-lg object-cover"
          onError={handleImageError}
          sizes="(max-width: 768px) 100vw, 500px"
          priority={false}
        />
      </div>

      {/* Caption Section */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-3">
        {post.caption}
      </p>
    </article>
  );
};

export default StoreFeedItem;