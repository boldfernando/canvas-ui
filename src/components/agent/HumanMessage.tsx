import React from "react";
import { User } from "lucide-react";
import { cn } from "../../lib/utils";

export interface HumanMessageProps {
  author?: string;
  timestamp?: string;
  content: string;
  className?: string;
}

export function HumanMessage({
  author = "User Architect",
  timestamp = "10:42 AM",
  content,
  className,
}: HumanMessageProps) {
  return (
    <div className={cn("flex gap-3 p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-zinc-100 font-sans", className)}>
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 shrink-0">
        <User className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-semibold text-zinc-200">{author}</span>
          <span className="text-zinc-500 font-mono text-[11px]">{timestamp}</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
