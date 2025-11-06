"use client";

import React, { useState } from "react";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      <div className="relative border-b border-greyscale-800">
        <div className="flex gap-2 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 cursor-pointer mb-2
                ${
                  activeTab === tab.id
                    ? "bg-greyscale-700 text-white"
                    : "bg-transparent text-greyscale-400 hover:bg-greyscale-800/50"
                }
                `}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-greyscale-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>{activeContent}</div>
    </div>
  );
};

export { Tabs };
