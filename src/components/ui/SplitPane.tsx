import React from "react";
import { cn } from "../../lib/utils";

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplitPct?: number;
  className?: string;
}

export function SplitPane({ left, right, defaultSplitPct = 50, className }: SplitPaneProps) {
  return (
    <div className={cn("flex w-full h-full font-sans overflow-hidden border border-zinc-800 rounded-lg", className)}>
      <div style={{ width: `${defaultSplitPct}%` }} className="h-full overflow-auto border-r border-zinc-800 p-3">
        {left}
      </div>
      <div style={{ width: `${100 - defaultSplitPct}%` }} className="h-full overflow-auto p-3">
        {right}
      </div>
    </div>
  );
}
