import { cn } from "@/lib/utils";

/**
 * Avatar Primitive — Jules Halls (T18)
 * Circular image with fallback initials, status indicator, and size variants.
 */

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (typically initials) when image fails */
  fallback?: string;
  /** Alias for fallback initials */
  initials?: string;
  /** Size variant */
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  /** Online/offline status dot */
  status?: "online" | "offline" | "busy" | "away";
}

const SIZE_MAP: Record<string, { container: string; text: string; statusDot: string }> = {
  xs: { container: "size-6", text: "text-[10px]", statusDot: "size-1.5" },
  sm: { container: "size-8", text: "text-xs", statusDot: "size-2" },
  default: { container: "size-10", text: "text-sm", statusDot: "size-2.5" },
  lg: { container: "size-12", text: "text-base", statusDot: "size-3" },
  xl: { container: "size-16", text: "text-lg", statusDot: "size-3.5" },
};

const STATUS_COLORS: Record<string, string> = {
  online: "bg-[var(--operational-green)]",
  offline: "bg-muted-foreground",
  busy: "bg-[var(--thermal-red)]",
  away: "bg-[var(--luminous-amber)]",
};

function Avatar({
  className,
  src,
  alt = "",
  fallback,
  initials,
  size = "default",
  status,
  ...props
}: AvatarProps) {
  const sizeTokens = SIZE_MAP[size];
  const displayFallback = initials ?? fallback ?? alt?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-muted",
        sizeTokens.container,
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className={cn("font-medium text-muted-foreground select-none", sizeTokens.text)}>
          {displayFallback}
        </span>
      )}
      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            sizeTokens.statusDot,
            STATUS_COLORS[status],
          )}
        />
      )}
    </div>
  );
}

export { Avatar };
export type { AvatarProps };
