import { cn } from "@/lib/utils";

/**
 * Skeleton Primitive — Jules Halls (T15)
 * Animated loading placeholder for content that hasn't loaded yet.
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular";
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Number of text lines to render */
  lines?: number;
}

function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  lines,
  style,
  ...props
}: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)} data-slot="skeleton-group" {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-muted"
            style={{
              width: i === lines - 1 ? "75%" : "100%",
              ...style,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse bg-muted",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-md",
        variant === "text" && "h-4 rounded",
        className,
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
