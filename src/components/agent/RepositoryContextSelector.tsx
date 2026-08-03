"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

export interface RepositoryContextSelectorProps {
  currentRepo?: string;
  onSelectRepo?: (repo: string) => void;
  className?: string;
}

export const RepositoryContextSelector: React.FC<RepositoryContextSelectorProps> = ({
  currentRepo = "No repository selected",
  onSelectRepo,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const mockRepos = ["03-jules-halls", "canvas-ui", "web-cockpit", "stitch-sdk", "jules-action"];

  return (
    <div className={`relative ${className}`}>
      <Button 
        variant="outline" 
        className="w-full flex justify-between items-center bg-gray-900 border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 text-sm text-gray-200">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          {currentRepo}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 py-1">
          {mockRepos.map((repo) => (
            <button
              key={repo}
              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
              onClick={() => {
                onSelectRepo?.(repo);
                setIsOpen(false);
              }}
            >
              {repo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
