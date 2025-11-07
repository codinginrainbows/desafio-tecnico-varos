import React from "react";
import Image from "next/image";
import ArrowGrowIcon from "@/assets/icons/arrow_grow.svg";

interface CardProps {
  label: string;
  value: number;
  subtitle: string;
  showTrend?: boolean;
}

const Card: React.FC<CardProps> = ({
  label,
  value,
  subtitle,
  showTrend = true,
}) => {
  return (
    <div className="bg-gray-950 rounded-lg px-6 py-4 min-w-[220px] border border-gray-700">
      <span className="text-gray-400 text-sm block mb-2">{label}</span>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-white text-3xl font-semibold">{value}</span>

        {showTrend && (
          <Image src={ArrowGrowIcon} alt="trend" width={16} height={16} />
        )}
      </div>

      <span className="text-gray-500 text-xs">{subtitle}</span>
    </div>
  );
};

export default Card;
