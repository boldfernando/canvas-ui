"use client";

import React from "react";
import { cn } from "../../lib/utils";

/**
 * ArtifactGallery — Jules Halls (T26)
 * Grid/list view of session artifacts (files, screenshots, diffs, logs).
 * Supports type filtering, preview, and download.
 */

export interface ArtifactEntry {
  id: string;
  filename: string;
  type: "code" | "diff" | "screenshot" | "log" | "document" | "test_report" | "binary";
  /** File size in bytes */
  size?: number;
  /** MIME type */
  mimeType?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Preview URL */
  previewUrl?: string;
  /** Download URL */
  downloadUrl?: string;
  /** Associated session or task ID */
  sessionId?: string;
}

interface ArtifactGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  artifacts: ArtifactEntry[];
  /** View mode */
  view?: "grid" | "list";
  /** Filter by type */
  filter?: ArtifactEntry["type"][];
  /** Click handler */
  onArtifactClick?: (artifact: ArtifactEntry) => void;
}

const TYPE_ICONS: Record<ArtifactEntry["type"], string> = {
  code: "📝",
  diff: "🔀",
  screenshot: "🖼️",
  log: "📋",
  document: "📄",
  test_report: "🧪",
  binary: "📦",
};

const TYPE_COLORS: Record<ArtifactEntry["type"], string> = {
  code: "border-[var(--jules-electric-violet)]/30 bg-[var(--jules-electric-violet)]/5",
  diff: "border-[var(--stitch-spectral-cyan)]/30 bg-[var(--stitch-spectral-cyan)]/5",
  screenshot: "border-[var(--luminous-amber)]/30 bg-[var(--luminous-amber)]/5",
  log: "border-muted-foreground/20 bg-muted/20",
  document: "border-primary/20 bg-primary/5",
  test_report: "border-[var(--operational-green)]/30 bg-[var(--operational-green)]/5",
  binary: "border-border bg-muted/30",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ArtifactGallery({
  artifacts,
  view = "grid",
  filter,
  onArtifactClick,
  className,
  ...props
}: ArtifactGalleryProps) {
  const filtered = React.useMemo(() => {
    if (!filter || filter.length === 0) return artifacts;
    return artifacts.filter((a) => filter.includes(a.type));
  }, [artifacts, filter]);

  return (
    <div
      data-slot="artifact-gallery"
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          Artifacts ({filtered.length})
        </h3>
      </div>

      {/* Gallery */}
      {filtered.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
          No artifacts generated yet.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((artifact) => (
            <button
              key={artifact.id}
              type="button"
              onClick={() => onArtifactClick?.(artifact)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all",
                "hover:shadow-md hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                TYPE_COLORS[artifact.type],
              )}
            >
              <span className="text-2xl" aria-hidden="true">
                {TYPE_ICONS[artifact.type]}
              </span>
              <span className="text-xs font-medium text-foreground truncate w-full">
                {artifact.filename}
              </span>
              {artifact.size !== undefined && (
                <span className="text-[10px] text-muted-foreground">
                  {formatFileSize(artifact.size)}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {filtered.map((artifact) => (
            <button
              key={artifact.id}
              type="button"
              onClick={() => onArtifactClick?.(artifact)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/30"
            >
              <span className="shrink-0" aria-hidden="true">
                {TYPE_ICONS[artifact.type]}
              </span>
              <span className="flex-1 font-medium text-foreground truncate">
                {artifact.filename}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground capitalize">
                {artifact.type.replace("_", " ")}
              </span>
              {artifact.size !== undefined && (
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {formatFileSize(artifact.size)}
                </span>
              )}
              <time
                dateTime={artifact.createdAt}
                className="shrink-0 text-[10px] tabular-nums text-muted-foreground"
              >
                {new Date(artifact.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </time>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { ArtifactGallery };
export type { ArtifactGalleryProps };
