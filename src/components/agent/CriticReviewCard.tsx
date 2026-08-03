import React from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CriticReviewCardProps {
  verdict?: "APPROVED" | "REJECTED" | "NEEDS_REVISION";
  score?: number;
  critiqueComments?: string[];
  reviewerName?: string;
  className?: string;
}

export function CriticReviewCard({
  verdict = "APPROVED",
  score = 9.4,
  critiqueComments = [
    "Architectural boundaries strictly enforced between canvas-ui and web-cockpit.",
    "Type check and monorepo build verified with exit code 0.",
  ],
  reviewerName = "OmniRoute Critic Agent",
  className,
}: CriticReviewCardProps) {
  return (
    <div className={cn("p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-100 font-sans shadow-lg", className)}>
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <h4 className="font-semibold text-sm">{reviewerName}</h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-400">{score} / 10</span>
          {verdict === "APPROVED" ? (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Approved
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> {verdict}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-1.5 text-xs text-zinc-300">
        {critiqueComments.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
