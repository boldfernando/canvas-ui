import React from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BannerAlertProps {
  type?: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

export function BannerAlert({
  type = "info",
  title,
  message,
  onDismiss,
  className,
}: BannerAlertProps) {
  const styles = {
    info: "bg-sky-500/10 border-sky-500/20 text-sky-300",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-300",
  };

  const icons = {
    info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
    success: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
  };

  return (
    <div className={cn("flex items-start justify-between p-3 rounded-lg border text-xs font-sans", styles[type], className)}>
      <div className="flex items-start gap-2.5">
        {icons[type]}
        <div>
          <h4 className="font-semibold text-zinc-100">{title}</h4>
          {message && <p className="text-zinc-300 mt-0.5 leading-relaxed">{message}</p>}
        </div>
      </div>

      {onDismiss && (
        <button onClick={onDismiss} className="p-1 hover:bg-zinc-800/40 rounded transition-colors text-zinc-400">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
