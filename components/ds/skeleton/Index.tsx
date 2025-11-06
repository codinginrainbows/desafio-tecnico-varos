import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
  variant?: "default" | "light" | "dark";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width,
  height,
  rounded = "md",
  variant = "default",
}) => {
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variantClasses = {
    default: "bg-gray-800",
    light: "bg-gray-700",
    dark: "bg-gray-900",
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`animate-pulse ${variantClasses[variant]} ${roundedClasses[rounded]} ${className}`}
      style={style}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <Skeleton
        key={i}
        height="1rem"
        width={i === lines - 1 ? "80%" : "100%"}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`bg-gray-950 rounded-lg p-6 space-y-4 ${className}`}>
    <Skeleton height="2rem" width="60%" />
    <Skeleton height="3rem" width="40%" />
    <Skeleton height="1rem" width="80%" />
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({
  rows = 5,
  className = "",
}) => (
  <div
    className={`bg-gray-950 rounded-lg border border-gray-700 overflow-hidden ${className}`}
  >
    <div className="p-6 border-b border-gray-700">
      <Skeleton height="3rem" rounded="md" />
    </div>
    <div className="p-6 space-y-4">
      {[...Array(rows)].map((_, i) => (
        <Skeleton key={i} height="4rem" rounded="md" />
      ))}
    </div>
  </div>
);

export const SkeletonInput: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    <Skeleton height="1.25rem" width="6rem" />
    <Skeleton height="2.5rem" rounded="lg" />
  </div>
);

export const SkeletonButton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <Skeleton
    height="2.5rem"
    width="10rem"
    rounded="full"
    className={className}
  />
);

export const SkeletonForm: React.FC<{
  fields?: number;
  className?: string;
}> = ({ fields = 4, className = "" }) => (
  <div className={`space-y-6 ${className}`}>
    <Skeleton height="2rem" width="12rem" />
    <div className="grid grid-cols-2 gap-6">
      {[...Array(fields)].map((_, i) => (
        <SkeletonInput key={i} />
      ))}
    </div>
  </div>
);
