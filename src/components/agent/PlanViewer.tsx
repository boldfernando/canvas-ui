import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, ChevronRight, ChevronDown, ListChecks, Play, Shield } from "lucide-react";
import { cn } from "../../lib/utils";

export interface PlanStep {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "in_progress" | "pending" | "failed";
  durationMs?: number;
  toolCalls?: Array<{ name: string; args?: Record<string, unknown> }>;
  error?: string;
}

export interface PlanViewerProps {
  planId?: string;
  title?: string;
  goal?: string;
  steps?: PlanStep[];
  onExecuteStep?: (stepId: string) => void;
  className?: string;
}

export function PlanViewer({
  planId = "PLAN-360-01",
  title = "System Orchestration Plan",
  goal = "Execute 360° Monorepo Verification & Execution Pipeline",
  steps = [
    {
      id: "STEP-1",
      title: "Initialize AI Workbench Registry",
      description: "Scan all 22 workspace units and validate .ai-workbench.yaml manifests.",
      status: "completed",
      durationMs: 420,
      toolCalls: [{ name: "validate_workbench", args: { units: 22 } }],
    },
    {
      id: "STEP-2",
      title: "Run Architectural Boundary Check",
      description: "Ensure zero forbidden imports between canvas-ui and web-cockpit.",
      status: "completed",
      durationMs: 180,
      toolCalls: [{ name: "validate_boundaries" }],
    },
    {
      id: "STEP-3",
      title: "Compile Monorepo Packages & Apps",
      description: "Execute pnpm build across Turbo pipeline with exit code 0 enforcement.",
      status: "in_progress",
      toolCalls: [{ name: "run_command", args: { command: "pnpm build" } }],
    },
    {
      id: "STEP-4",
      title: "Verify Git Working Trees Hygiene",
      description: "Confirm git status --porcelain=v1 is 100% clean across all 12 repositories.",
      status: "pending",
    },
  ],
  onExecuteStep,
  className,
}: PlanViewerProps) {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({ "STEP-3": true });

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: PlanStep["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium animate-pulse">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
            <AlertTriangle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progressPct = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div
      aria-label="Execution Plan Viewer"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">{title}</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              {planId}
            </span>
          </div>
          {goal && <p className="text-sm text-zinc-400 mt-1">{goal}</p>}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-zinc-400">Progress</div>
            <div className="text-sm font-semibold font-mono text-emerald-400">{progressPct}%</div>
          </div>
          <div className="w-20 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isExpanded = !!expandedSteps[step.id];
          return (
            <div
              key={step.id}
              className={cn(
                "rounded-lg border transition-all duration-150 overflow-hidden",
                step.status === "in_progress"
                  ? "border-amber-500/40 bg-amber-500/5"
                  : step.status === "completed"
                  ? "border-zinc-800/80 bg-zinc-900/40"
                  : "border-zinc-800/40 bg-zinc-900/20"
              )}
            >
              <div
                onClick={() => toggleStep(step.id)}
                className="flex items-center justify-between p-3.5 cursor-pointer select-none hover:bg-zinc-800/30 transition-colors"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleStep(step.id);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-mono font-medium text-zinc-300">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">{step.title}</h4>
                    {step.durationMs && (
                      <span className="text-[11px] text-zinc-500 font-mono">{step.durationMs}ms</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(step.status)}
                  {onExecuteStep && step.status !== "completed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExecuteStep(step.id);
                      }}
                      className="p-1 rounded hover:bg-zinc-700/50 text-zinc-400 hover:text-emerald-400 transition-colors"
                      title="Run Step"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
              </div>

              {/* Step Details */}
              {isExpanded && (
                <div className="p-3.5 pt-0 text-xs border-t border-zinc-800/40 space-y-2 mt-1">
                  {step.description && <p className="text-zinc-400 leading-relaxed">{step.description}</p>}

                  {step.toolCalls && step.toolCalls.length > 0 && (
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800/60 font-mono text-zinc-300">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> Tool Invocation
                      </div>
                      {step.toolCalls.map((tc, i) => (
                        <div key={i} className="text-zinc-300">
                          <span className="text-emerald-400 font-semibold">{tc.name}</span>
                          {tc.args && (
                            <span className="text-zinc-500 ml-2">{JSON.stringify(tc.args)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.error && (
                    <div className="bg-rose-950/40 p-2 rounded border border-rose-800/40 text-rose-300 font-mono">
                      {step.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
