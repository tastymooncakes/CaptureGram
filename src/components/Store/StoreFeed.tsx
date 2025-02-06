"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StoreFeedList from "./StoreFeedList";
import PostSkeleton from "./PostSkeleton";
import { Post } from "./types";
import StoriesBar from "../StoriesBar/StoriesBar";
import FooterBar from "../Footer/Footer";

const StoreFeed = () => {
  // State management
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const limit = 10; // Set your desired page size

  // Fetch posts function
  const fetchPosts = useCallback(
    async (currentOffset : number, isInitialLoad = false) => {
      try {
        isInitialLoad ? setInitialLoading(true) : setIsLoadingMore(true);
        
        const endpoint = "/api/products";

        const response = await axios.get(endpoint, {
          params: {
            limit: limit,
            offset: currentOffset
          }
        });

        const { results, pagination } = response.data;

        const transformedPosts = results.map((post: any): Post => ({
          id: post.id,
          user: {
            name: post.user.name,
            avatar: post.user.avatar,
          },
          imageUrl: post.imageUrl,
          caption: post.caption,
          likes: post.likes,
          comments: post.comments,
        }));

        setPosts(prev => isInitialLoad ? transformedPosts : [...prev, ...transformedPosts]);
        setHasMore(pagination.hasMore);
        setOffset(currentOffset + limit);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        isInitialLoad ? setInitialLoading(false) : setIsLoadingMore(false);
      }
    },
    [limit]
  );

  // Initial load and filter change handler
  useEffect(() => {
    setOffset(0);
    fetchPosts(0, true);
  }, [fetchPosts]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500; // pixels from bottom
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      
      if (
        scrollTop + clientHeight >= scrollHeight - scrollThreshold &&
        hasMore &&
        !isLoadingMore &&
        !initialLoading
      ) {
        // setPage(prev => prev + 1);
        fetchPosts(offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoadingMore, offset, initialLoading, fetchPosts]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Content area */}
      {initialLoading ? (
        <div className="space-y-6">
          {Array(3).fill(0).map((_, i) => <PostSkeleton key={`skeleton-${i}`} />)}
        </div>
      ) : (
        <>
          <StoreFeedList 
            posts={posts}
            isLoading={initialLoading}
            isLoadingMore={isLoadingMore}
          />
          
          {!hasMore && !initialLoading && (
            <p className="text-center text-gray-500 mt-6">
              You've reached the end of the feed
            </p>
          )}
        </>
      )}
      {/* Footer Bar */}
      <FooterBar />
    </div>
  );
};

export default StoreFeed;