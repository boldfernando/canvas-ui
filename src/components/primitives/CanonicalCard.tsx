"use client";

import React from "react";

export interface CanonicalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "overlay" | "interactive";
  glowOnHover?: boolean;
}

export const CanonicalCard: React.FC<CanonicalCardProps> = ({
  variant = "default",
  glowOnHover = false,
  children,
  className = "",
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#111827] border-white/10 text-gray-100",
    surface: "bg-[#1F2937] border-white/10 text-gray-100",
    overlay: "bg-[#0B0F19]/90 backdrop-blur-md border-white/15 text-gray-100",
    interactive: "bg-[#111827] border-white/10 text-gray-100 hover:border-indigo-500/50 hover:bg-[#161F33] cursor-pointer transition-all duration-200"
  }[variant];

  const glowStyle = glowOnHover ? "hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]" : "";

  return (
    <div
      className={`rounded-xl border p-5 shadow-lg ${variantStyles} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
