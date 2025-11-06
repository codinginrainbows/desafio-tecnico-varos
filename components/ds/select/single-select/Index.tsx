"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChevronDownIcon from "@/assets/icons/chevron_down.svg";

export interface SingleSelectOption {
  value: string;
  label: string;
}

interface SingleSelectProps {
  label?: string;
  placeholder?: string;
  options: SingleSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  placeholder = "Placeholder",
  options,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-greyscale-400 text-base font-medium">
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full min-w-[180px] bg-greyscale-800 border border-greyscale-800 rounded-lg px-4 py-3 flex items-center justify-between hover:border-greyscale-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-greyscale-400 text-sm">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <div
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <Image
              src={ChevronDownIcon}
              alt="chevron"
              width={16}
              height={16}
              className="text-greyscale-500"
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-greyscale-900 border border-greyscale-800 rounded-lg shadow-xl overflow-hidden">
            <div className="max-h-[240px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                    selectedValue === option.value
                      ? "bg-greyscale-800 text-greyscale-300"
                      : "text-greyscale-400 hover:bg-greyscale-800"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { SingleSelect };
