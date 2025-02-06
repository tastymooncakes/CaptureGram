"use client";

import { Post } from "./types";
import PublicFeedItem from "./PublicFeedItem";
import PostSkeleton from "./PostSkeleton";

interface PublicFeedListProps {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
}

const PublicFeedList = ({ posts, isLoading, isLoadingMore }: PublicFeedListProps) => {
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
            <PublicFeedItem key={post.id} post={post} />
          ))}

          {/* Loading more indicator */}
          {isLoadingMore && <PostSkeleton />}
        </>
      )}
    </div>
  );
};

export default PublicFeedList;