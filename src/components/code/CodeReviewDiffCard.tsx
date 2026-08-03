import React from "react";
import { FileCode, CheckCircle, GitPullRequest } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CodeReviewDiffCardProps {
  filePath?: string;
  additions?: number;
  deletions?: number;
  status?: "approved" | "changes_requested" | "pending";
  className?: string;
}

export function CodeReviewDiffCard({
  filePath = "apps/web-cockpit/src/App.tsx",
  additions = 42,
  deletions = 12,
  status = "approved",
  className,
}: CodeReviewDiffCardProps) {
  return (
    <div className={cn("p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 font-sans text-xs flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <FileCode className="w-4 h-4 text-emerald-400" />
        <span className="font-mono text-zinc-200">{filePath}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-mono text-xs">
          <span className="text-emerald-400">+{additions}</span>{" "}
          <span className="text-rose-400">-{deletions}</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
          <CheckCircle className="w-3 h-3" /> {status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
