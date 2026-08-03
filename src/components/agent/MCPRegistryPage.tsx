import React from "react";
import { Server, CheckCircle2, Shield } from "lucide-react";
import { cn } from "../../lib/utils";

export interface MCPServerRecord {
  name: string;
  toolsCount: number;
  status: "active" | "offline";
  transport: string;
}

export interface MCPRegistryPageProps {
  servers?: MCPServerRecord[];
  className?: string;
}

export function MCPRegistryPage({
  servers = [
    { name: "StitchMCP", toolsCount: 14, status: "active", transport: "stdio" },
    { name: "chrome-devtools-mcp", toolsCount: 28, status: "active", transport: "stdio" },
    { name: "genkit-mcp-server", toolsCount: 8, status: "active", transport: "http" },
  ],
  className,
}: MCPRegistryPageProps) {
  return (
    <div className={cn("p-5 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-100 font-sans space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">MCP Server Registry</h3>
            <p className="text-xs text-zinc-400">Registered Model Context Protocol servers & tools.</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          <Shield className="w-3.5 h-3.5" /> ACL Validated
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {servers.map((s) => (
          <div key={s.name} className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-zinc-200">{s.name}</h4>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {s.status}
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-mono">{s.toolsCount} Tools exposed</div>
            <div className="text-[11px] text-zinc-500">Transport: {s.transport}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
