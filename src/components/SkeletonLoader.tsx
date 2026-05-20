import React from "react";

interface SkeletonLoaderProps {
  className?: string;
  isDarkMode: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = "h-4 w-full", 
  isDarkMode 
}) => {
  return (
    <div 
      className={`shimmer-bg ${isDarkMode ? "shimmer-bg-dark" : "shimmer-bg"} rounded animate-pulse ${className}`}
      style={{
        backgroundSize: "200% 100%"
      }}
    />
  );
};
