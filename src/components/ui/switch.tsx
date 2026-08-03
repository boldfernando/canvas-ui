"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Switch Primitive — Jules Halls (T14)
 * Accessible toggle switch with ARIA role, label support, and state data-attributes.
 */

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Whether the switch is on */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Called when the switch is toggled */
  onCheckedChange?: (checked: boolean) => void;
  /** Visual label */
  label?: string;
  /** Size variant */
  size?: "sm" | "default" | "lg";
}

const SIZE_CLASSES = {
  sm: "h-4 w-7",
  default: "h-5 w-9",
  lg: "h-6 w-11",
} as const;

const THUMB_CLASSES = {
  sm: "size-3 data-[state=checked]:translate-x-3",
  default: "size-4 data-[state=checked]:translate-x-4",
  lg: "size-5 data-[state=checked]:translate-x-5",
} as const;

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked, onCheckedChange, label, size = "default", disabled, id, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const controlled = checked !== undefined;
    const active = controlled ? checked : isChecked;
    const switchId = id ?? React.useId();

    const toggle = React.useCallback(() => {
      if (disabled) return;
      const next = !active;
      if (!controlled) setIsChecked(next);
      onCheckedChange?.(next);
    }, [active, controlled, disabled, onCheckedChange]);

    return (
      <div className="flex items-center gap-2">
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={label}
          data-slot="switch"
          data-state={active ? "checked" : "unchecked"}
          disabled={disabled}
          className={cn(
            "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            active ? "bg-primary" : "bg-input",
            SIZE_CLASSES[size],
            className,
          )}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          {...props}
        >
          <span
            data-state={active ? "checked" : "unchecked"}
            className={cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
              THUMB_CLASSES[size],
            )}
          />
        </button>
        {label && (
          <label htmlFor={switchId} className="cursor-pointer text-sm font-medium leading-none">
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
