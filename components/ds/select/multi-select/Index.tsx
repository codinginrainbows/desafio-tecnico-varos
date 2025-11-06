"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChevronDownIcon from "@/assets/icons/chevron_down.svg";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeholder = "Selecione opções",
  options,
  value = [],
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const selectRef = useRef<HTMLDivElement>(null);

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

  const handleToggle = (optionValue: string) => {
    let newValues: string[];

    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter((v) => v !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const isSelected = (optionValue: string) =>
    selectedValues.includes(optionValue);

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option?.label || placeholder;
    }
    return `${selectedValues.length} selecionado(s)`;
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
              {getDisplayText()}
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
                  onClick={() => handleToggle(option.value)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left text-sm transition-colors cursor-pointer ${
                    isSelected(option.value)
                      ? "bg-greyscale-800"
                      : "hover:bg-greyscale-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      isSelected(option.value)
                        ? "bg-primary-philodendron border-primary-philodendron"
                        : "border-greyscale-600"
                    }`}
                  >
                    {isSelected(option.value) && (
                      <svg
                        className="w-3 h-3 text-primary-sGreen"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  <span className="text-greyscale-400">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { MultiSelect };
export type { MultiSelectOption };
