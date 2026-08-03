"use client";

import React from "react";
import { CanonicalState } from "@/lib/design-tokens";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  state: CanonicalState;
  label?: string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
}

const stateStyles: Record<string, { bg: string; text: string; dot: string }> = {
  executing: { bg: "bg-indigo-950/60 border-indigo-500/30", text: "text-indigo-300", dot: "bg-indigo-400 animate-pulse" },
  running: { bg: "bg-indigo-950/60 border-indigo-500/30", text: "text-indigo-300", dot: "bg-indigo-400 animate-pulse" },
  completed: { bg: "bg-emerald-950/60 border-emerald-500/30", text: "text-emerald-300", dot: "bg-emerald-400" },
  success: { bg: "bg-emerald-950/60 border-emerald-500/30", text: "text-emerald-300", dot: "bg-emerald-400" },
  failed: { bg: "bg-rose-950/60 border-rose-500/30", text: "text-rose-300", dot: "bg-rose-500" },
  validation_error: { bg: "bg-rose-950/60 border-rose-500/30", text: "text-rose-300", dot: "bg-rose-500" },
  paused: { bg: "bg-amber-950/60 border-amber-500/30", text: "text-amber-300", dot: "bg-amber-400" },
  awaiting_user: { bg: "bg-amber-950/60 border-amber-500/30", text: "text-amber-300", dot: "bg-amber-400 animate-ping" },
  awaiting_approval: { bg: "bg-amber-950/60 border-amber-500/30", text: "text-amber-300", dot: "bg-amber-400" },
  queued: { bg: "bg-cyan-950/60 border-cyan-500/30", text: "text-cyan-300", dot: "bg-cyan-400" },
  scheduled: { bg: "bg-cyan-950/60 border-cyan-500/30", text: "text-cyan-300", dot: "bg-cyan-400" },
  default: { bg: "bg-gray-800/60 border-gray-700/40", text: "text-gray-400", dot: "bg-gray-500" }
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  state,
  label,
  showDot = true,
  size = "md",
  className = "",
  ...props
}) => {
  const config = stateStyles[state] || stateStyles.default;
  const displayLabel = label || state.replace(/_/g, " ");

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-2.5 py-1 text-xs font-medium gap-2",
    lg: "px-3 py-1.5 text-sm font-medium gap-2.5"
  }[size];

  return (
    <div
      data-state={state}
      role="status"
      aria-label={`Status: ${displayLabel}`}
      className={`inline-flex items-center rounded-full border transition-colors ${config.bg} ${config.text} ${sizeClasses} ${className}`}
      {...props}
    >
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden="true" />}
      <span className="capitalize">{displayLabel}</span>
    </div>
  );
};
