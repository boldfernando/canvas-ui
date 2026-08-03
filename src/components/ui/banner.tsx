import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Banner Primitive — Jules Halls (T15)
 * Persistent notification bar for system-wide alerts, announcements, and warnings.
 * Unlike Toast (transient), Banner remains visible until explicitly dismissed.
 */

const bannerVariants = cva(
  "relative flex w-full items-center gap-3 px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "bg-[var(--stitch-spectral-cyan)]/10 text-[var(--stitch-spectral-cyan)] border-b border-[var(--stitch-spectral-cyan)]/20",
        warning: "bg-[var(--luminous-amber)]/10 text-[var(--luminous-amber)] border-b border-[var(--luminous-amber)]/20",
        error: "bg-[var(--thermal-red)]/10 text-[var(--thermal-red)] border-b border-[var(--thermal-red)]/20",
        success: "bg-[var(--operational-green)]/10 text-[var(--operational-green)] border-b border-[var(--operational-green)]/20",
        neutral: "bg-muted text-muted-foreground border-b border-border",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Dismiss handler. If provided, a close button is shown. */
  onDismiss?: () => void;
  /** Icon to display before the content */
  icon?: React.ReactNode;
  /** Action element (button/link) at the end */
  action?: React.ReactNode;
}

function Banner({ className, variant, onDismiss, icon, action, children, ...props }: BannerProps) {
  return (
    <div
      role="alert"
      data-slot="banner"
      data-state="persistent_alert"
      className={cn(bannerVariants({ variant, className }))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1 font-medium">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss banner"
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { Banner, bannerVariants };
export type { BannerProps };
