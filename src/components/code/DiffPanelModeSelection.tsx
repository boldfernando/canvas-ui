import React from "react";
import { Columns, AlignJustify } from "lucide-react";
import { cn } from "../../lib/utils";

export type DiffMode = "split" | "unified";

export interface DiffPanelModeSelectionProps {
  mode?: DiffMode;
  onModeChange?: (mode: DiffMode) => void;
  className?: string;
}

export function DiffPanelModeSelection({
  mode = "split",
  onModeChange,
  className,
}: DiffPanelModeSelectionProps) {
  return (
    <div className={cn("flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg font-sans", className)}>
      <button
        onClick={() => onModeChange?.("split")}
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors font-medium",
          mode === "split" ? "bg-zinc-800 text-white border border-zinc-700" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <Columns className="w-3.5 h-3.5" /> Side-by-Side
      </button>
      <button
        onClick={() => onModeChange?.("unified")}
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors font-medium",
          mode === "unified" ? "bg-zinc-800 text-white border border-zinc-700" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <AlignJustify className="w-3.5 h-3.5" /> Unified
      </button>
    </div>
  );
}
