import React, { useState } from "react";
import { GitPullRequest, AlertOctagon, CheckCircle2, Play, Terminal, FileCode } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CIFailure {
  id: string;
  workflowName: string;
  jobName: string;
  failedStep: string;
  errorMessage: string;
  targetFile?: string;
  suggestedFix?: string;
}

export interface CIFixerPanelProps {
  failures?: CIFailure[];
  onApplyFix?: (failureId: string) => void;
  className?: string;
}

export function CIFixerPanel({
  failures = [
    {
      id: "CI-FAIL-01",
      workflowName: "AI Workbench Governance Gate",
      jobName: "validate-boundaries",
      failedStep: "Boundary Violation Check",
      errorMessage: "Import violation: canvas-ui/src/app/cockpit/page.tsx attempted forbidden import from apps/web-cockpit.",
      targetFile: "canvas-ui/src/app/cockpit/page.tsx",
      suggestedFix: "Refactor relative import to public barrel export @jules-halls/canvas-ui/agent.",
    },
    {
      id: "CI-FAIL-02",
      workflowName: "Monorepo Build & Export Resolution",
      jobName: "turbo-build",
      failedStep: "pnpm build (apps/web-cockpit)",
      errorMessage: "Rollup failed to resolve import '@jules-halls/adapter-jules-sdk': Named export JulesSdkAdapter not found.",
      targetFile: "packages/adapter-jules-sdk/package.json",
      suggestedFix: "Add 'type': 'module' and explicit 'exports' mapping to packages/adapter-jules-sdk/package.json.",
    },
  ],
  onApplyFix,
  className,
}: CIFixerPanelProps) {
  const [fixedFailures, setFixedFailures] = useState<Record<string, boolean>>({});

  const handleFix = (id: string) => {
    onApplyFix?.(id);
    setFixedFailures((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      aria-label="CI Fixer Panel"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">CI/CD Build Failure Analyzer & Auto-Fixer</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Parse stack traces, locate source files, and dispatch AI fix Pull Requests.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-medium">
            {failures.length - Object.keys(fixedFailures).length} Active Failures
          </span>
        </div>
      </div>

      {/* Failure List */}
      <div className="space-y-4">
        {failures.map((fail) => {
          const isFixed = !!fixedFailures[fail.id];

          return (
            <div
              key={fail.id}
              className={cn(
                "p-4 rounded-lg border transition-all",
                isFixed
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {fail.id}
                    </span>
                    <h4 className="text-sm font-semibold text-zinc-200">{fail.workflowName}</h4>
                    <span className="text-xs text-zinc-400 font-mono">({fail.jobName})</span>
                  </div>
                  <div className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" /> Step: {fail.failedStep}
                  </div>
                </div>

                <div>
                  {isFixed ? (
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Fix Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFix(fail.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/10"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Auto-Fix Issue
                    </button>
                  )}
                </div>
              </div>

              {/* Log Snippet */}
              <div className="bg-zinc-950 p-3 rounded border border-zinc-800/80 font-mono text-xs text-rose-300 mb-3 overflow-x-auto">
                {fail.errorMessage}
              </div>

              {/* Target File & Suggested Fix */}
              <div className="space-y-1.5 text-xs text-zinc-300">
                {fail.targetFile && (
                  <div className="flex items-center gap-2 text-zinc-400 font-mono">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Target: <span className="text-zinc-200">{fail.targetFile}</span>
                  </div>
                )}
                {fail.suggestedFix && (
                  <div className="flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded border border-zinc-800/60">
                    <GitPullRequest className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-400">Suggested Action: </span>
                      <span className="text-zinc-300">{fail.suggestedFix}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
