"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * MCPServerPanel — Jules Halls (T32)
 * Shows MCP (Model Context Protocol) server connections, tools, and health.
 * Maps to the Jules Settings > MCP Servers real surface.
 */

export interface MCPTool {
  name: string;
  description?: string;
  inputSchema?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  transport: "stdio" | "sse" | "http";
  status: "connected" | "disconnected" | "error" | "connecting";
  url?: string;
  command?: string;
  tools: MCPTool[];
  lastPing?: string;
  latencyMs?: number;
}

interface MCPServerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  servers: MCPServer[];
  onConnect?: (server: MCPServer) => void;
  onDisconnect?: (server: MCPServer) => void;
  onRefresh?: (server: MCPServer) => void;
}

const STATUS_CONFIG: Record<MCPServer["status"], { dot: string; label: string }> = {
  connected: { dot: "bg-[var(--operational-green)]", label: "Connected" },
  disconnected: { dot: "bg-muted-foreground/40", label: "Disconnected" },
  error: { dot: "bg-[var(--thermal-red)]", label: "Error" },
  connecting: { dot: "bg-[var(--luminous-amber)] animate-pulse", label: "Connecting…" },
};

function MCPServerPanel({
  servers,
  onConnect,
  onDisconnect,
  onRefresh,
  className,
  ...props
}: MCPServerPanelProps) {
  const [expandedServer, setExpandedServer] = React.useState<string | null>(null);

  return (
    <div
      data-slot="mcp-server-panel"
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          MCP Servers ({servers.length})
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Model Context Protocol server connections and available tools
        </p>
      </div>

      <div className="divide-y divide-border/50">
        {servers.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No MCP servers configured.
          </div>
        ) : (
          servers.map((server) => {
            const status = STATUS_CONFIG[server.status];
            const isExpanded = expandedServer === server.id;

            return (
              <div key={server.id} data-state={server.status}>
                {/* Server Row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Status */}
                  <span className={cn("size-2 shrink-0 rounded-full", status.dot)} />

                  {/* Info */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => setExpandedServer(isExpanded ? null : server.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{server.name}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                        {server.transport}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {server.tools.length} tool{server.tools.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {server.url && (
                      <div className="mt-0.5 text-xs font-mono text-muted-foreground truncate">
                        {server.url}
                      </div>
                    )}
                    {server.command && (
                      <div className="mt-0.5 text-xs font-mono text-muted-foreground truncate">
                        $ {server.command}
                      </div>
                    )}
                  </div>

                  {/* Latency */}
                  {server.latencyMs !== undefined && server.status === "connected" && (
                    <span className={cn(
                      "text-[10px] tabular-nums",
                      server.latencyMs < 100 ? "text-[var(--operational-green)]"
                        : server.latencyMs < 500 ? "text-[var(--luminous-amber)]"
                        : "text-[var(--thermal-red)]",
                    )}>
                      {server.latencyMs}ms
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {server.status === "connected" && onRefresh && (
                      <button
                        type="button"
                        onClick={() => onRefresh(server)}
                        aria-label={`Refresh ${server.name}`}
                        className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        🔄
                      </button>
                    )}
                    {server.status === "disconnected" && onConnect && (
                      <button
                        type="button"
                        onClick={() => onConnect(server)}
                        className="rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Connect
                      </button>
                    )}
                    {server.status === "connected" && onDisconnect && (
                      <button
                        type="button"
                        onClick={() => onDisconnect(server)}
                        className="rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-[var(--thermal-red)]"
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                </div>

                {/* Tools List (expanded) */}
                {isExpanded && server.tools.length > 0 && (
                  <div className="border-t border-border/30 bg-muted/20 px-4 py-3">
                    <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Available Tools
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {server.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="rounded-md border border-border/50 bg-card px-3 py-2"
                        >
                          <div className="text-xs font-mono font-medium text-foreground">
                            {tool.name}
                          </div>
                          {tool.description && (
                            <div className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2">
                              {tool.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export { MCPServerPanel };
export type { MCPServerPanelProps };
