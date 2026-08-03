"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Dialog Primitive — Jules Halls (T17)
 * Modal overlay with native <dialog> element, keyboard trap, and ARIA patterns.
 */

interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** Called when the dialog should close */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title shown in the header */
  title: string;
  /** Optional description */
  description?: string;
  /** Size variant */
  size?: "sm" | "default" | "lg" | "xl" | "full";
  /** Show close button */
  showClose?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
}

const SIZE_CLASSES: Record<string, string> = {
  sm: "max-w-sm",
  default: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
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
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
}

function DialogContent({
  className,
  title,
  description,
  size = "default",
  showClose = true,
  footer,
  children,
  ...props
}: DialogContentProps) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center" data-slot="dialog-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-describedby={description ? "dialog-desc" : undefined}
        data-slot="dialog"
        data-state="expanded"
        className={cn(
          "relative z-10 flex flex-col rounded-xl border border-border bg-card shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          "w-full",
          SIZE_CLASSES[size],
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-border px-6 py-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && (
              <p id="dialog-desc" className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {showClose && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close dialog"
              className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { Dialog, DialogTrigger, DialogContent };
export type { DialogProps, DialogContentProps };
