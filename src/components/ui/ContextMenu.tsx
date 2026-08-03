import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { MenuItem } from "./DropdownMenu";

export interface ContextMenuProps {
  children: React.ReactNode;
  items: MenuItem[];
  className?: string;
}

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  return (
    <div onContextMenu={handleContextMenu} className={cn("inline-block", className)}>
      {children}

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            style={{ left: position.x, top: position.y }}
            className="fixed z-50 w-48 rounded-lg border border-zinc-800 bg-zinc-950 p-1 shadow-2xl font-sans"
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
        </>
      )}
    </div>
  );
}
