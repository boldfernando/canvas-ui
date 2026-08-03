import React from "react";
import { cn } from "../../lib/utils";

export interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 font-sans text-xs leading-relaxed overflow-x-auto", className)}>
      <div className="prose prose-invert max-w-none space-y-2">
        {content.split("\n\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
