import React, { useState } from "react";
import { Server, Lock, Eye, EyeOff, CheckCircle, RefreshCw, Cpu, Database } from "lucide-react";
import { cn } from "../../lib/utils";

export interface EnvVariable {
  key: string;
  value: string;
  isSecret?: boolean;
}

export interface EnvironmentPanelProps {
  environmentName?: string;
  nodeVersion?: string;
  pnpmVersion?: string;
  provider?: string;
  variables?: EnvVariable[];
  onRefresh?: () => void;
  className?: string;
}

export function EnvironmentPanel({
  environmentName = "Production / Main Control Plane",
  nodeVersion = "v22.14.0",
  pnpmVersion = "v9.15.0",
  provider = "Cloudflare Pages + Turbo Monorepo",
  variables = [
    { key: "NODE_ENV", value: "production", isSecret: false },
    { key: "PORT", value: "3000", isSecret: false },
    { key: "DATABASE_URL", value: "postgresql://jules:••••••••@localhost:5432/cockpit", isSecret: true },
    { key: "STITCH_API_KEY", value: "st_live_9f83a7c10b2e3d4f5a6b", isSecret: true },
    { key: "JULES_SESSION_SECRET", value: "jul_sec_88f91a2c3d4e5f6a", isSecret: true },
  ],
  onRefresh,
  className,
}: EnvironmentPanelProps) {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const toggleSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      aria-label="Environment Panel"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">{environmentName}</h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{provider}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
            </button>
          )}
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <CheckCircle className="w-3 h-3" /> Healthy
          </span>
        </div>
      </div>

      {/* Runtime Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Node.js Runtime
          </div>
          <div className="text-sm font-mono font-semibold text-zinc-200">{nodeVersion}</div>
        </div>
        <div className="p-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <Database className="w-3.5 h-3.5 text-emerald-400" /> Package Manager
          </div>
          <div className="text-sm font-mono font-semibold text-zinc-200">pnpm {pnpmVersion}</div>
        </div>
        <div className="p-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> Active Secrets
          </div>
          <div className="text-sm font-mono font-semibold text-emerald-400">
            {variables.filter((v) => v.isSecret).length} Encrypted
          </div>
        </div>
        <div className="p-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <Server className="w-3.5 h-3.5 text-emerald-400" /> Workspace Units
          </div>
          <div className="text-sm font-mono font-semibold text-zinc-200">22 Registered</div>
        </div>
      </div>

      {/* Environment Variables Table */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2 flex items-center justify-between">
          <span>Environment Variables</span>
          <span className="text-[11px] font-mono text-zinc-500 font-normal">Count: {variables.length}</span>
        </h4>
        <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/20">
          <div className="divide-y divide-zinc-800/60">
            {variables.map((env) => {
              const isVisible = !!showSecrets[env.key];
              const maskedValue = env.isSecret && !isVisible ? "••••••••••••••••" : env.value;

              return (
                <div key={env.key} className="flex items-center justify-between p-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-medium">{env.key}</span>
                    {env.isSecret && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        SECRET
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-zinc-300 max-w-[240px] sm:max-w-xs truncate">
                      {maskedValue}
                    </span>
                    {env.isSecret && (
                      <button
                        onClick={() => toggleSecret(env.key)}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                        title={isVisible ? "Hide secret" : "Show secret"}
                      >
                        {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
