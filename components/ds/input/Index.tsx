"use client";

import React, { useState } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "tel";
  disabled?: boolean;
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  disabled = false,
  className = "",
  error,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-greyscale-400 text-base font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full min-w-[180px] bg-greyscale-800 border ${
          error ? "border-red-500" : "border-greyscale-800"
        } rounded-lg px-4 py-3 text-sm text-greyscale-400 placeholder:text-greyscale-500 hover:border-greyscale-700 focus:outline-none focus:border-greyscale-600 transition-colors cursor-text disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export { Input };
