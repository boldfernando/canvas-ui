import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FeedbackThumbsButtonProps {
  onFeedback?: (vote: "up" | "down") => void;
  className?: string;
}

export function FeedbackThumbsButton({ onFeedback, className }: FeedbackThumbsButtonProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    setVote(type);
    onFeedback?.(type);
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg font-sans", className)}>
      <button
        onClick={() => handleVote("up")}
        className={cn(
          "p-1.5 rounded transition-colors text-xs flex items-center gap-1",
          vote === "up" ? "bg-emerald-500/20 text-emerald-400 font-medium" : "text-zinc-400 hover:text-zinc-200"
        )}
        title="Helpful"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleVote("down")}
        className={cn(
          "p-1.5 rounded transition-colors text-xs flex items-center gap-1",
          vote === "down" ? "bg-rose-500/20 text-rose-400 font-medium" : "text-zinc-400 hover:text-zinc-200"
        )}
        title="Not Helpful"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
