"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * CommandPalette Primitive — Jules Halls (T20)
 * Global search/command interface triggered by Ctrl+K / Cmd+K.
 * Supports fuzzy search, grouped items, keyboard navigation, and action dispatch.
 */

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
  keywords?: string[];
  shortcut?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
}

function CommandPalette({
  items,
  open: controlledOpen,
  onOpenChange,
  placeholder = "Type a command or search…",
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const controlled = controlledOpen !== undefined;
  const isOpen = controlled ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
      if (!next) {
        setQuery("");
        setActiveIndex(0);
      }
    },
    [controlled, onOpenChange],
  );

  // Global shortcut: Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Filter items
  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [items, query]);

  // Group items
  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const group = item.group ?? "";
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(item);
    }
    return map;
  }, [filtered]);

  const flatItems = React.useMemo(() => {
    const result: CommandItem[] = [];
    for (const items of grouped.values()) result.push(...items);
    return result;
  }, [grouped]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(1, flatItems.length));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatItems.length) % Math.max(1, flatItems.length));
        break;
      case "Enter":
        e.preventDefault();
        if (flatItems[activeIndex]) {
          flatItems[activeIndex].onSelect();
          setOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  if (!isOpen) return null;

  let itemCounter = 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]" data-slot="command-palette-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Palette */}
      <div
        role="combobox"
        aria-expanded={true}
        aria-haspopup="listbox"
        data-slot="command-palette"
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl",
          "animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200",
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            aria-label="Search commands"
          />
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div role="listbox" className="max-h-72 overflow-y-auto p-2">
          {flatItems.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, groupItems]) => (
              <div key={group}>
                {group && (
                  <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {group}
                  </div>
                )}
                {groupItems.map((item) => {
                  const idx = itemCounter++;
                  const isActive = idx === activeIndex;

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onClick={() => {
                        item.onSelect();
                        setOpen(false);
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {item.icon && <span className="shrink-0 text-base">{item.icon}</span>}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { CommandPalette };
export type { CommandPaletteProps };
