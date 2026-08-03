import React from "react";
import { Terminal, CheckCircle2, Play } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ContinuousIntegrationFixerViewProps {
  pipelineName?: string;
  failedStep?: string;
  stackTrace?: string;
  autoFixAvailable?: boolean;
  onDispatchFix?: () => void;
  className?: string;
}

export function ContinuousIntegrationFixerView({
  pipelineName = "AI Workbench Governance Pipeline",
  failedStep = "pnpm validate:boundaries",
  stackTrace = "Error: Boundary violation in apps/web-cockpit/src/App.tsx",
  autoFixAvailable = true,
  onDispatchFix,
  className,
}: ContinuousIntegrationFixerViewProps) {
  return (
    <div className={cn("p-4 rounded-xl border border-rose-500/30 bg-zinc-950 text-zinc-100 font-sans text-xs space-y-3", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div>
          <h4 className="font-semibold text-sm text-zinc-100">{pipelineName}</h4>
          <span className="text-rose-400 font-mono text-[11px] flex items-center gap-1 mt-0.5">
            <Terminal className="w-3.5 h-3.5" /> Failed Step: {failedStep}
          </span>
        </div>

        {autoFixAvailable && (
          <button
            onClick={onDispatchFix}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Auto-Fix Issue
          </button>
        )}
      </div>

      <pre className="p-3 rounded bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-rose-300 overflow-x-auto">
        {stackTrace}
      </pre>
    </div>
  );
}
