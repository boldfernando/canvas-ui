import React from "react";
import { cn } from "../../lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function IconButton({
  icon,
  label,
  variant = "default",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const variantStyles = {
    default: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-700",
    outline: "bg-transparent text-zinc-300 border-zinc-700 hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-400 border-transparent hover:bg-zinc-800/60 hover:text-zinc-100",
    destructive: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20",
  };

  const sizeStyles = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-2.5 text-base",
  };

  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
