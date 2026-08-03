"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Toast Primitive — Jules Halls (T15)
 * Transient notification with auto-dismiss, manual close, and action support.
 */

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  default: "border-border bg-card text-card-foreground",
  success: "border-[var(--operational-green)]/30 bg-[var(--operational-green)]/10 text-foreground",
  error: "border-[var(--thermal-red)]/30 bg-[var(--thermal-red)]/10 text-foreground",
  warning: "border-[var(--luminous-amber)]/30 bg-[var(--luminous-amber)]/10 text-foreground",
  info: "border-[var(--stitch-spectral-cyan)]/30 bg-[var(--stitch-spectral-cyan)]/10 text-foreground",
};

let toastCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, "id">) => {
    const id = `toast-${++toastCounter}`;
    const entry: ToastData = { id, duration: 5000, variant: "default", ...data };
    setToasts((prev) => [...prev, entry]);

    if (entry.duration && entry.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, entry.duration);
    }

    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
      {/* Toast viewport */}
      <div
        role="region"
        aria-label="Notifications"
        data-slot="toast-viewport"
        className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            data-slot="toast"
            data-state="transient_toast"
            className={cn(
              "pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all",
              "animate-in slide-in-from-right-full fade-in duration-300",
              VARIANT_CLASSES[t.variant ?? "default"],
            )}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>}
            </div>
            {t.action && (
              <button
                type="button"
                onClick={t.action.onClick}
                className="shrink-0 rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-muted"
              >
                {t.action.label}
              </button>
            )}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Close notification"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
