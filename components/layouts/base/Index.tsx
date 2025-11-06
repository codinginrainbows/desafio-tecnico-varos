"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.svg";

interface BaseLayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  width?: string;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  headerContent,
  width,
  className = "",
}) => {
  const maxWidth = width || "1400px";
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-950">
      <header className="w-full bg-primary-cBlack border-b border-greyscale-700">
        <div className="px-8 py-8 flex justify-between items-center">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Image src={Logo} alt="Logo" width={120} height={40} />
          </div>
          {headerContent && <div>{headerContent}</div>}
        </div>
      </header>

      <div className="w-full flex items-center justify-center py-8">
        <div
          style={{ maxWidth }}
          className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
