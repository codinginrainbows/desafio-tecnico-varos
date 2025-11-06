import React from "react";
import Image from "next/image";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  icon?: any; // Aceita import de SVG
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  icon,
  rounded = false,
  onClick,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-200 border disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer";

  const variantStyles = {
    primary:
      "bg-green-800 border-primary-philodendron text-primary-sGreen hover:brightness-110 active:brightness-95",
    secondary:
      "bg-greyscale-800 border-greyscale-600 text-greyscale-400 hover:bg-greyscale-900 hover:text-greyscale-300 active:bg-greyscale-900",
  };

  const roundedStyles = rounded ? "rounded-full" : "rounded-lg";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${roundedStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="flex-shrink-0"
        />
      )}
    </button>
  );
};

export default Button;
