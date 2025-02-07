const PostSkeleton = () => (
    <div className="mb-6 bg-white p-4 rounded-lg shadow animate-pulse">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="ml-2 h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="w-full h-96 bg-gray-200 rounded-md" />
      <div className="mt-2 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  );
  
  export default PostSkeleton;