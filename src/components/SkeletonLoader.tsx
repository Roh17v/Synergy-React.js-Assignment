import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonLoader;
