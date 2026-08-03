import React, { useState } from "react";
import { Key, Eye, EyeOff, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export interface APIKeyRecord {
  id: string;
  name: string;
  prefix: string;
  fullKey: string;
  createdDate: string;
  expiresInDays: number;
  scopes: string[];
  status: "active" | "expiring_soon" | "revoked";
}

export interface APIKeyManagerProps {
  keys?: APIKeyRecord[];
  onRotateKey?: (keyId: string) => void;
  onRevokeKey?: (keyId: string) => void;
  className?: string;
}

export function APIKeyManager({
  keys = [
    {
      id: "KEY-01",
      name: "Stitch SDK Production Key",
      prefix: "st_live_...",
      fullKey: "st_live_9f83a7c10b2e3d4f5a6b7c8d9e0f1a2b",
      createdDate: "2026-06-15",
      expiresInDays: 85,
      scopes: ["stitch:read", "stitch:write", "stitch:deploy"],
      status: "active",
    },
    {
      id: "KEY-02",
      name: "Jules Task Queue Token",
      prefix: "jul_tq_...",
      fullKey: "jul_tq_88f91a2c3d4e5f6a7b8c9d0e1f2a3b4c",
      createdDate: "2026-07-01",
      expiresInDays: 14,
      scopes: ["queue:dispatch", "queue:monitor"],
      status: "expiring_soon",
    },
  ],
  onRotateKey,
  onRevokeKey,
  className,
}: APIKeyManagerProps) {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      aria-label="API Key Manager"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">API Key & Credentials Manager</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Manage encrypted provider tokens, scopes, and automated rotation policies.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> AES-256 Vault Encrypted
          </span>
        </div>
      </div>

      {/* Key List */}
      <div className="space-y-3">
        {keys.map((k) => {
          const isVisible = !!visibleKeys[k.id];
          const maskedDisplay = isVisible ? k.fullKey : `${k.prefix}••••••••••••••••`;

          return (
            <div
              key={k.id}
              className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-zinc-200">{k.name}</h4>
                    {k.status === "active" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        Active
                      </span>
                    )}
                    {k.status === "expiring_soon" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Expires in {k.expiresInDays}d
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">Created: {k.createdDate}</div>
                </div>

                <div className="flex items-center gap-2">
                  {onRotateKey && (
                    <button
                      onClick={() => onRotateKey(k.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" /> Rotate Key
                    </button>
                  )}
                  {onRevokeKey && (
                    <button
                      onClick={() => onRevokeKey(k.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>

              {/* Key Value & Scopes */}
              <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded border border-zinc-800/80 text-xs font-mono mb-2">
                <span className="text-zinc-300 truncate max-w-sm sm:max-w-md">{maskedDisplay}</span>
                <button
                  onClick={() => toggleKeyVisibility(k.id)}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {k.scopes.map((scope) => (
                  <span
                    key={scope}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-800"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
