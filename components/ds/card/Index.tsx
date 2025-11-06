import React from "react";

interface CardProps {
  label: string;
  value: number;
  subtitle: string;
  showTrend?: boolean;
  trendUp?: boolean;
}

const Card: React.FC<CardProps> = ({
  label,
  value,
  subtitle,
  showTrend = true,
  trendUp = true,
}) => {
  return (
    <div className="bg-gray-950 rounded-lg px-6 py-4 min-w-[220px] border border-gray-700">
      <span className="text-gray-400 text-sm block mb-2">{label}</span>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-white text-3xl font-semibold">{value}</span>

        {showTrend && (
          <svg
            className={`w-4 h-4 ${
              trendUp ? "text-green-500" : "text-red-500"
            } ${!trendUp && "rotate-180"}`}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M8 3L12 8H4L8 3Z" fill="currentColor" />
          </svg>
        )}
      </div>

      <span className="text-gray-500 text-xs">{subtitle}</span>
    </div>
  );
};

export default Card;
