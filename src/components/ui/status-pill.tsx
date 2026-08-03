import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { CanonicalState } from "@jules-halls/design-tokens";

/**
 * StatusPill — Jules Halls (T15)
 * Compact status indicator mapping CanonicalState to brand colors.
 * Includes animated pulse for active processing states.
 */

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      status: {
        idle: "bg-muted text-muted-foreground",
        active: "bg-[var(--jules-electric-violet)]/15 text-[var(--jules-electric-violet)]",
        success: "bg-[var(--operational-green)]/15 text-[var(--operational-green)]",
        warning: "bg-[var(--luminous-amber)]/15 text-[var(--luminous-amber)]",
        error: "bg-[var(--thermal-red)]/15 text-[var(--thermal-red)]",
        info: "bg-[var(--stitch-spectral-cyan)]/15 text-[var(--stitch-spectral-cyan)]",
        neutral: "bg-muted text-foreground",
      },
    },
    defaultVariants: { status: "idle" },
  },
);

/** Maps CanonicalState to StatusPill status */
function stateToStatus(state: CanonicalState): NonNullable<VariantProps<typeof statusPillVariants>["status"]> {
  switch (state) {
    case "completed":
    case "success":
    case "connected":
    case "on":
      return "success";
    case "failed":
    case "validation_error":
    case "deleted":
      return "error";
    case "loading":
    case "processing":
    case "executing":
    case "active":
      return "active";
    case "awaiting_user":
    case "awaiting_approval":
    case "needs_review":
    case "ready_for_review":
      return "warning";
    case "queued":
    case "scheduled":
    case "paused":
      return "info";
    case "disabled":
    case "archived":
    case "readonly":
    case "inactive":
      return "neutral";
    default:
      return "idle";
  }
}

interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  /** Canonical state for auto-mapping */
  state?: CanonicalState;
  /** Show animated pulse dot for processing states */
  pulse?: boolean;
  /** Custom label override */
  label?: string;
}

function StatusPill({ className, status, state, pulse, label, children, ...props }: StatusPillProps) {
  const resolvedStatus = status ?? (state ? stateToStatus(state) : "idle");
  const showPulse = pulse ?? (resolvedStatus === "active");

  const PULSE_COLORS: Record<string, string> = {
    active: "bg-[var(--jules-electric-violet)]",
    success: "bg-[var(--operational-green)]",
    warning: "bg-[var(--luminous-amber)]",
    error: "bg-[var(--thermal-red)]",
    info: "bg-[var(--stitch-spectral-cyan)]",
    idle: "bg-muted-foreground",
    neutral: "bg-foreground",
  };

  return (
    <span
      data-slot="status-pill"
      data-state={state}
      className={cn(statusPillVariants({ status: resolvedStatus, className }))}
      {...props}
    >
      {showPulse && (
        <span className="relative flex size-2">
          <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-75", PULSE_COLORS[resolvedStatus])} />
          <span className={cn("relative inline-flex size-2 rounded-full", PULSE_COLORS[resolvedStatus])} />
        </span>
      )}
      {label ?? children ?? state}
    </span>
  );
}

export { StatusPill, statusPillVariants, stateToStatus };
export type { StatusPillProps };
