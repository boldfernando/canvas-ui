import React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
}: SheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex font-sans">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div
        className={cn(
          "relative z-50 flex flex-col w-full max-w-md bg-zinc-950 border-zinc-800 p-5 shadow-2xl transition-transform duration-200",
          side === "right" ? "ml-auto border-l" : "mr-auto border-r",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          {title && <h3 className="text-base font-semibold text-zinc-100">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-auto"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
