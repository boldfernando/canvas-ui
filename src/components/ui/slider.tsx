"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Slider Primitive — Jules Halls (T14)
 * Accessible range input with data-state, min/max labels, and visual track fill.
 */

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Called when value changes */
  onValueChange?: (value: number) => void;
  /** Show value label */
  showValue?: boolean;
  /** Format the displayed value */
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      showValue = false,
      formatValue = (v) => String(v),
      disabled,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const controlled = controlledValue !== undefined;
    const currentValue = controlled ? controlledValue : internalValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = Number(e.target.value);
        if (!controlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [controlled, onValueChange],
    );

    return (
      <div className={cn("flex flex-col gap-1.5", className)} data-slot="slider">
        {showValue && (
          <output className="text-xs font-mono text-muted-foreground tabular-nums">
            {formatValue(currentValue)}
          </output>
        )}
        <div className="relative flex items-center">
          <div className="absolute h-1.5 w-full rounded-full bg-muted" />
          <div
            className="absolute h-1.5 rounded-full bg-primary transition-all"
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            className="relative z-10 h-1.5 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            aria-valuenow={currentValue}
            aria-valuemin={min}
            aria-valuemax={max}
            data-state={disabled ? "disabled" : "default"}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
export type { SliderProps };
