"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Checkbox Primitive — Jules Halls (T14)
 * Accessible checkbox with indeterminate state, keyboard support, and data-state mapping.
 */

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visual label for the checkbox */
  label?: string;
  /** Indeterminate visual state (neither checked nor unchecked) */
  indeterminate?: boolean;
  /** Visual description shown below the label */
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, indeterminate, id, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      const el = inputRef.current;
      if (el) el.indeterminate = !!indeterminate;
    }, [indeterminate]);

    const checkboxId = id ?? React.useId();

    return (
      <div className={cn("flex items-start gap-2", className)} data-slot="checkbox">
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="checkbox"
          id={checkboxId}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-transparent accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          data-state={props.checked ? "checked" : indeterminate ? "indeterminate" : "unchecked"}
          {...props}
        />
        {(label || description) && (
          <div className="grid gap-0.5 leading-none">
            {label && (
              <label htmlFor={checkboxId} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
