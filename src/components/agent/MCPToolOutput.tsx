import React from "react";
import { Terminal, Shield, CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export interface MCPToolOutputProps {
  toolName?: string;
  serverName?: string;
  argumentsPassed?: Record<string, unknown>;
  outputResult?: string;
  executionMs?: number;
  className?: string;
}

export function MCPToolOutput({
  toolName = "ask_permission",
  serverName = "StitchMCP",
  argumentsPassed = { action: "command", target: "pnpm build" },
  outputResult = "Permission granted by user review policy. Execution allowed.",
  executionMs = 45,
  className,
}: MCPToolOutputProps) {
  return (
    <div className={cn("rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs font-mono text-zinc-300", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-emerald-400">{toolName}</span>
          <span className="text-[10px] text-zinc-500 font-sans">({serverName})</span>
        </div>
        <span className="text-[10px] text-zinc-500 flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-400" /> {executionMs}ms
        </span>
      </div>

      <div className="text-[11px] text-zinc-400 mb-1 flex items-center gap-1 font-sans">
        <Shield className="w-3 h-3 text-emerald-400" /> Arguments:
      </div>
      <pre className="p-2 rounded bg-zinc-900 text-zinc-300 text-[11px] mb-2 overflow-x-auto">
        {JSON.stringify(argumentsPassed, null, 2)}
      </pre>

      <div className="text-[11px] text-zinc-400 mb-1 font-sans">Output Result:</div>
      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800 text-emerald-300 text-[11px]">
        {outputResult}
      </div>
    </div>
  );
}
