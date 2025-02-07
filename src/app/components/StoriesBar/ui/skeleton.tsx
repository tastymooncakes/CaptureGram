import React from "react";

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${className}`} />;
};

export { Skeleton };
