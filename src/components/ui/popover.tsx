"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Popover Primitive — Jules Halls (T16)
 * Interactive content popup triggered by click. Unlike Tooltip, Popover
 * supports interactive content (forms, links, buttons).
 */

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}>({ open: false, onOpenChange: () => {}, triggerRef: { current: null } });

function Popover({ open: controlledOpen, onOpenChange, children }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = controlledOpen !== undefined;
  const isOpen = controlled ? controlledOpen : internalOpen;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange, triggerRef }}>
      <div className="relative inline-flex">{children}</div>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, onOpenChange, triggerRef } = React.useContext(PopoverContext);
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-haspopup="dialog"
      data-slot="popover-trigger"
      onClick={() => onOpenChange(!open)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  children,
  ...props
}: PopoverContentProps) {
  const { open, onOpenChange } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const SIDE_MAP: Record<string, string> = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const ALIGN_MAP: Record<string, string> = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      ref={contentRef}
      role="dialog"
      data-slot="popover-content"
      data-state="open"
      className={cn(
        "absolute z-50 min-w-[12rem] rounded-lg border border-border bg-popover p-4 shadow-lg",
        "animate-in fade-in zoom-in-95 duration-150",
        SIDE_MAP[side],
        ALIGN_MAP[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
export type { PopoverProps, PopoverContentProps };
