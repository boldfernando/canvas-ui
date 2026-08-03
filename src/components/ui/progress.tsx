"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Progress Primitive — Jules Halls (T15)
 * Determinate and indeterminate progress bars with ARIA attributes.
 */

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value 0-100. Omit for indeterminate. */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Visual variant */
  variant?: "default" | "jules" | "stitch" | "success" | "warning" | "error";
  /** Size */
  size?: "sm" | "default" | "lg";
  /** Show percentage label */
  showLabel?: boolean;
}

const VARIANT_COLORS: Record<string, string> = {
  default: "bg-primary",
  jules: "bg-[var(--jules-electric-violet)]",
  stitch: "bg-[var(--stitch-spectral-cyan)]",
  success: "bg-[var(--operational-green)]",
  warning: "bg-[var(--luminous-amber)]",
  error: "bg-[var(--thermal-red)]",
};

const SIZE_CLASSES: Record<string, string> = {
  sm: "h-1",
  default: "h-2",
  lg: "h-3",
};

function Progress({
  className,
  value,
  max = 100,
  variant = "default",
  size = "default",
  showLabel = false,
  ...props
}: ProgressProps) {
  const indeterminate = value === undefined;
  const percentage = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && !indeterminate && (
        <span className="self-end text-xs font-mono text-muted-foreground tabular-nums">
          {Math.round(percentage)}%
        </span>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        data-slot="progress"
        data-state={indeterminate ? "indeterminate" : "determinate"}
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          SIZE_CLASSES[size],
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            VARIANT_COLORS[variant],
            indeterminate && "animate-pulse w-1/2",
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { Progress };
export type { ProgressProps };
