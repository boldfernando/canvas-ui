import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export interface AgentMessageProps {
  agentName?: string;
  modelUsed?: string;
  timestamp?: string;
  content: string;
  className?: string;
}

export function AgentMessage({
  agentName = "Jules Agent",
  modelUsed = "gemini-2.5-pro",
  timestamp = "10:42 AM",
  content,
  className,
}: AgentMessageProps) {
  return (
    <div className={cn("flex gap-3 p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-zinc-100 font-sans", className)}>
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
        <Bot className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400">{agentName}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> {modelUsed}
            </span>
          </div>
          <span className="text-zinc-500 font-mono text-[11px]">{timestamp}</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
