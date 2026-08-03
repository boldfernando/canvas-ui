"use client";

import React from "react";
import { cn } from "../../lib/utils";
import type { CanonicalSession } from "@jules-halls/contracts";

/**
 * SessionTimeline — Jules Halls (T23)
 * Vertical timeline showing session activities with status indicators.
 * Maps to the real Jules session view: plan steps, tool calls, code edits, and outcomes.
 */

export interface TimelineEntry {
  id: string;
  timestamp: string;
  type: "plan" | "tool_call" | "code_edit" | "file_create" | "file_delete" | "test" | "message" | "approval" | "error" | "system";
  summary: string;
  detail?: string;
  status?: "completed" | "in_progress" | "pending" | "failed" | "skipped";
  /** Nested entries (e.g., tool call steps within a plan step) */
  children?: TimelineEntry[];
}

interface SessionTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: TimelineEntry[];
  /** Session metadata for header display */
  session?: Pick<CanonicalSession, "id" | "state" | "taskId">;
  /** Whether to show timestamps */
  showTimestamps?: boolean;
  /** Compact mode */
  compact?: boolean;
}

const TYPE_ICONS: Record<TimelineEntry["type"], string> = {
  plan: "📋",
  tool_call: "🔧",
  code_edit: "✏️",
  file_create: "📄",
  file_delete: "🗑️",
  test: "🧪",
  message: "💬",
  approval: "✅",
  error: "❌",
  system: "⚙️",
};

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-[var(--operational-green)]",
  in_progress: "bg-[var(--jules-electric-violet)]",
  pending: "bg-muted-foreground/40",
  failed: "bg-[var(--thermal-red)]",
  skipped: "bg-muted-foreground/20",
};

function SessionTimeline({
  entries,
  session,
  showTimestamps = true,
  compact = false,
  className,
  ...props
}: SessionTimelineProps) {
  return (
    <div
      data-slot="session-timeline"
      data-state={session?.state}
      className={cn("relative", className)}
      role="list"
      aria-label="Session timeline"
      {...props}
    >
      {/* Session Header */}
      {session && (
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="font-mono text-xs text-muted-foreground">
            {session.id}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
              session.state === "finished" && "bg-[var(--operational-green)]/15 text-[var(--operational-green)]",
              session.state === "active" && "bg-[var(--jules-electric-violet)]/15 text-[var(--jules-electric-violet)]",
              session.state === "error" && "bg-[var(--thermal-red)]/15 text-[var(--thermal-red)]",
            )}
          >
            {session.state}
          </span>
        </div>
      )}

      {/* Timeline entries */}
      <div className="space-y-0">
        {entries.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            entry={entry}
            isLast={i === entries.length - 1}
            showTimestamp={showTimestamps}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  entry,
  isLast,
  showTimestamp,
  compact,
}: {
  entry: TimelineEntry;
  isLast: boolean;
  showTimestamp: boolean;
  compact: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = entry.children && entry.children.length > 0;

  return (
    <div role="listitem" className="relative flex gap-3">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "mt-1.5 size-2.5 shrink-0 rounded-full ring-2 ring-background",
            STATUS_COLORS[entry.status ?? "pending"],
            entry.status === "in_progress" && "animate-pulse",
          )}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-border" />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-4", compact ? "pb-2" : "pb-4")}>
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-sm" aria-hidden="true">
            {TYPE_ICONS[entry.type]}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "text-sm font-medium text-foreground",
                  hasChildren && "cursor-pointer hover:underline",
                )}
                onClick={hasChildren ? () => setExpanded(!expanded) : undefined}
              >
                {entry.summary}
              </span>
              {showTimestamp && (
                <time
                  dateTime={entry.timestamp}
                  className="shrink-0 text-[10px] tabular-nums text-muted-foreground"
                >
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </time>
              )}
            </div>
            {entry.detail && !compact && (
              <p className="mt-0.5 text-xs text-muted-foreground">{entry.detail}</p>
            )}

            {/* Nested children */}
            {hasChildren && expanded && (
              <div className="mt-2 ml-2 border-l border-border/50 pl-3">
                {entry.children!.map((child, ci) => (
                  <TimelineItem
                    key={child.id}
                    entry={child}
                    isLast={ci === entry.children!.length - 1}
                    showTimestamp={showTimestamp}
                    compact={compact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { SessionTimeline };
export type { SessionTimelineProps };
