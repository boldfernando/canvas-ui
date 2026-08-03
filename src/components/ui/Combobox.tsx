import React, { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  className,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedOption = options.find((o) => o.value === value);
  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={cn("relative inline-block w-full text-left font-sans", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Combobox"
        className="flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 focus:outline-none focus:border-emerald-500/50"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronsUpDown className="w-4 h-4 ml-2 text-zinc-500" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl overflow-hidden font-sans">
          <div className="p-2 border-b border-zinc-800 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-zinc-200 focus:outline-none"
            />
          </div>

          <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-xs text-zinc-500 text-center">No options found</div>
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded text-xs cursor-pointer select-none transition-colors",
                    opt.value === value
                      ? "bg-emerald-500/10 text-emerald-400 font-medium"
                      : "text-zinc-300 hover:bg-zinc-800/60"
                  )}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
