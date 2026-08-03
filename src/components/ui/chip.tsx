import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Tag & Chip Primitives — Jules Halls (T15)
 * Tag: Static label for categorization.
 * Chip: Interactive element that can be selected or dismissed.
 * FilterChip: Chip variant with toggle state for filtering operations.
 */

// ─── Tag ──────────────────────────────────────────────────

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        jules: "border-[var(--jules-electric-violet)]/30 bg-[var(--jules-electric-violet)]/10 text-[var(--jules-electric-violet)]",
        stitch: "border-[var(--stitch-spectral-cyan)]/30 bg-[var(--stitch-spectral-cyan)]/10 text-[var(--stitch-spectral-cyan)]",
        success: "border-[var(--operational-green)]/30 bg-[var(--operational-green)]/10 text-[var(--operational-green)]",
        warning: "border-[var(--luminous-amber)]/30 bg-[var(--luminous-amber)]/10 text-[var(--luminous-amber)]",
        error: "border-[var(--thermal-red)]/30 bg-[var(--thermal-red)]/10 text-[var(--thermal-red)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return <span data-slot="tag" className={cn(tagVariants({ variant, className }))} {...props} />;
}

// ─── Chip ─────────────────────────────────────────────────

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Chip can be dismissed with an × button */
  onDismiss?: () => void;
  /** Selected state */
  selected?: boolean;
}

function Chip({ className, children, onDismiss, selected, disabled, ...props }: ChipProps) {
  return (
    <button
      type="button"
      data-slot="chip"
      data-state={selected ? "selected" : "default"}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-muted text-foreground hover:bg-muted/80",
        className,
      )}
      {...props}
    >
      {children}
      {onDismiss && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); e.preventDefault(); onDismiss(); } }}
          className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-full hover:bg-foreground/10"
        >
          ×
        </span>
      )}
    </button>
  );
}

// ─── FilterChip ───────────────────────────────────────────

interface FilterChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  count?: number;
}

function FilterChip({ className, children, active, onActiveChange, count, ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      data-slot="filter-chip"
      data-state={active ? "active" : "default"}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
        className,
      )}
      onClick={() => onActiveChange?.(!active)}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className={cn(
          "inline-flex size-4 items-center justify-center rounded-full text-[10px] font-bold",
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground",
        )}>
          {count}
        </span>
      )}
    </button>
  );
}

export { Tag, tagVariants, Chip, FilterChip };
export type { TagProps, ChipProps, FilterChipProps };
