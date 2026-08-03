import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({ trigger, items, align = "left", className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block text-left font-sans", className)}>
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 w-48 rounded-lg border border-zinc-800 bg-zinc-950 p-1 shadow-xl backdrop-blur-md",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-2.5 py-1.5 rounded text-xs transition-colors text-left font-medium",
                item.destructive
                  ? "text-rose-400 hover:bg-rose-500/10"
                  : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
