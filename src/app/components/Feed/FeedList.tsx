"use client";

import { Post } from "./types";
import FeedItem from "./FeedItem";
import PostSkeleton from "./PostSkeleton";

interface FeedListProps {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
}

const FeedList = ({ posts, isLoading, isLoadingMore }: FeedListProps) => {
  return (
    <div className="space-y-6">
      {/* Initial loading state */}
      {isLoading ? (
        Array(3)
          .fill(0)
          .map((_, index) => <PostSkeleton key={`skeleton-${index}`} />)
      ) : (
        <>
          {/* Rendered posts */}
          {posts.map((post) => (
            <FeedItem key={post.id} post={post} />
          ))}

          {/* Loading more indicator */}
          {isLoadingMore && <PostSkeleton />}
        </>
      )}
    </div>
  );
};

export default FeedList;