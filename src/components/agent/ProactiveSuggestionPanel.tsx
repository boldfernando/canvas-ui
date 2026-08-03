"use client";

import React from "react";
import { Button } from "../ui/button";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: "refactor" | "security" | "performance" | "general";
}

export interface ProactiveSuggestionPanelProps {
  suggestions: Suggestion[];
  onApply?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export const ProactiveSuggestionPanel: React.FC<ProactiveSuggestionPanelProps> = ({
  suggestions,
  onApply,
  onDismiss,
  className = ""
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Proactive Insights
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="p-3 bg-gray-950 border border-gray-800 rounded flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-200">{suggestion.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{suggestion.description}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                suggestion.type === "security" ? "bg-red-900/30 text-red-400" :
                suggestion.type === "performance" ? "bg-amber-900/30 text-amber-400" :
                "bg-blue-900/30 text-blue-400"
              }`}>
                {suggestion.type}
              </span>
            </div>
            <div className="flex justify-end gap-2 mt-1">
              <Button variant="ghost" size="sm" onClick={() => onDismiss?.(suggestion.id)} className="text-gray-500 hover:text-gray-300">
                Dismiss
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onApply?.(suggestion.id)} className="bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50 hover:text-indigo-200">
                Apply Suggestion
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
