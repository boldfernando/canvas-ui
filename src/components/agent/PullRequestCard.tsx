import { cn } from "../../lib/utils";

/**
 * PullRequestCard — Jules Halls (T27)
 * Compact card showing PR status, checks, reviewers, and merge state.
 * Maps directly to the Jules PR review surface.
 */

export type PRStatus = "draft" | "open" | "review_requested" | "changes_requested" | "approved" | "merged" | "closed";

export interface PullRequestData {
  id: string;
  number: number;
  title: string;
  branch: string;
  baseBranch: string;
  status: PRStatus;
  author: string;
  createdAt: string;
  updatedAt?: string;
  additions: number;
  deletions: number;
  filesChanged: number;
  checksPass?: boolean;
  reviewers?: string[];
  labels?: string[];
  url?: string;
}

interface PullRequestCardProps extends React.HTMLAttributes<HTMLElement> {
  pr: PullRequestData;
  onMerge?: () => void;
  onClose?: () => void;
  onReview?: () => void;
}

const STATUS_CONFIG: Record<PRStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Draft", color: "text-muted-foreground", bg: "bg-muted" },
  open: { label: "Open", color: "text-[var(--operational-green)]", bg: "bg-[var(--operational-green)]/10" },
  review_requested: { label: "Review Requested", color: "text-[var(--luminous-amber)]", bg: "bg-[var(--luminous-amber)]/10" },
  changes_requested: { label: "Changes Requested", color: "text-[var(--thermal-red)]", bg: "bg-[var(--thermal-red)]/10" },
  approved: { label: "Approved", color: "text-[var(--operational-green)]", bg: "bg-[var(--operational-green)]/15" },
  merged: { label: "Merged", color: "text-[var(--jules-electric-violet)]", bg: "bg-[var(--jules-electric-violet)]/10" },
  closed: { label: "Closed", color: "text-[var(--thermal-red)]", bg: "bg-[var(--thermal-red)]/10" },
};

function PullRequestCard({ pr, onMerge, onClose, onReview, className, ...props }: PullRequestCardProps) {
  const statusConfig = STATUS_CONFIG[pr.status];

  return (
    <article
      data-slot="pull-request-card"
      data-state={pr.status}
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", statusConfig.bg, statusConfig.color)}>
              {statusConfig.label}
            </span>
            {pr.checksPass !== undefined && (
              <span className={cn("text-xs", pr.checksPass ? "text-[var(--operational-green)]" : "text-[var(--thermal-red)]")}>
                {pr.checksPass ? "✓ Checks" : "✗ Checks"}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-sm font-semibold text-foreground leading-tight">
            #{pr.number} {pr.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">{pr.branch}</span>
            <span>→</span>
            <span className="font-mono">{pr.baseBranch}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 flex items-center gap-4 text-xs">
        <span className="text-[var(--operational-green)] font-mono tabular-nums">+{pr.additions}</span>
        <span className="text-[var(--thermal-red)] font-mono tabular-nums">-{pr.deletions}</span>
        <span className="text-muted-foreground">{pr.filesChanged} file{pr.filesChanged !== 1 ? "s" : ""}</span>
        <span className="text-muted-foreground">by {pr.author}</span>
      </div>

      {/* Labels */}
      {pr.labels && pr.labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {pr.labels.map((label) => (
            <span key={label} className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {(onMerge || onClose || onReview) && (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          {onReview && pr.status !== "merged" && pr.status !== "closed" && (
            <button
              type="button"
              onClick={onReview}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              Review
            </button>
          )}
          {onMerge && pr.status === "approved" && (
            <button
              type="button"
              onClick={onMerge}
              className="rounded-md bg-[var(--jules-electric-violet)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--jules-electric-violet)]/90 transition-colors"
            >
              Merge
            </button>
          )}
          {onClose && pr.status !== "merged" && pr.status !== "closed" && (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-xs text-muted-foreground hover:text-[var(--thermal-red)] transition-colors"
            >
              Close
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export { PullRequestCard };
export type { PullRequestCardProps };
