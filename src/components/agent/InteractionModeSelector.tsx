import React from "react";
import { Zap, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "../../lib/utils";

export type InteractionMode = "autonomous" | "semi_autonomous" | "human_in_loop";

export interface InteractionModeSelectorProps {
  mode?: InteractionMode;
  onModeChange?: (mode: InteractionMode) => void;
  className?: string;
}

export function InteractionModeSelector({
  mode = "semi_autonomous",
  onModeChange,
  className,
}: InteractionModeSelectorProps) {
  const modes: Array<{ id: InteractionMode; label: string; icon: React.ReactNode; desc: string }> = [
    {
      id: "autonomous",
      label: "Full Autonomous",
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      desc: "Agent executes tools automatically",
    },
    {
      id: "semi_autonomous",
      label: "Semi-Autonomous",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      desc: "Requires approval for destructive actions",
    },
    {
      id: "human_in_loop",
      label: "Human-in-the-Loop",
      icon: <UserCheck className="w-3.5 h-3.5 text-sky-400" />,
      desc: "Manual review before every step",
    },
  ];

  return (
    <div className={cn("flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg font-sans", className)}>
      {modes.map((m) => {
        const isSelected = m.id === mode;
        return (
          <button
            key={m.id}
            onClick={() => onModeChange?.(m.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors font-medium",
              isSelected
                ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                : "text-zinc-400 hover:text-zinc-200"
            )}
            title={m.desc}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
