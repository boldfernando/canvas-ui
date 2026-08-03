"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Drawer (Sheet) Primitive — Jules Halls (T17)
 * Slide-in panel from any edge, supporting left/right/bottom.
 * Shares the same pattern as Dialog but with edge-anchored positioning.
 */

type DrawerSide = "left" | "right" | "bottom";

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  side?: DrawerSide;
  size?: "sm" | "default" | "lg";
  showClose?: boolean;
}

const SIDE_CLASSES: Record<DrawerSide, string> = {
  left: "inset-y-0 left-0 h-full border-r animate-in slide-in-from-left duration-300",
  right: "inset-y-0 right-0 h-full border-l animate-in slide-in-from-right duration-300",
  bottom: "inset-x-0 bottom-0 w-full border-t animate-in slide-in-from-bottom duration-300 rounded-t-xl",
};

const SIDE_SIZES: Record<DrawerSide, Record<string, string>> = {
  left: { sm: "w-64", default: "w-80", lg: "w-[28rem]" },
  right: { sm: "w-64", default: "w-80", lg: "w-[28rem]" },
  bottom: { sm: "max-h-[30vh]", default: "max-h-[50vh]", lg: "max-h-[75vh]" },
};

const DrawerContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

function Drawer({ open: controlledOpen, onOpenChange, children }: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = controlledOpen !== undefined;
  const isOpen = controlled ? controlledOpen : internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  return (
    <DrawerContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DrawerContext);
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
}

function DrawerContent({
  className,
  title,
  side = "right",
  size = "default",
  showClose = true,
  children,
  ...props
}: DrawerContentProps) {
  const { open, onOpenChange } = React.useContext(DrawerContext);

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" data-slot="drawer-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-slot="drawer"
        data-state="expanded"
        className={cn(
          "fixed z-10 flex flex-col border-border bg-card shadow-2xl",
          SIDE_CLASSES[side],
          SIDE_SIZES[side][size],
          className,
        )}
        {...props}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
            {showClose && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close drawer"
                className="rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
          </div>
        )}
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export { Drawer, DrawerTrigger, DrawerContent };
export type { DrawerProps, DrawerContentProps, DrawerSide };
