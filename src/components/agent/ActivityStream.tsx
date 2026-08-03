"use client";

import React from "react";
import { cn } from "../../lib/utils";

/**
 * ActivityStream — Jules Halls (T24)
 * Real-time feed of agent activities: tool calls, file edits, tests, messages.
 * Supports live streaming (new items appear at top), filtering, and grouping.
 */

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: "tool_call" | "code_edit" | "file_create" | "file_delete" | "test_run" | "build" | "lint" | "message" | "error" | "approval" | "deploy";
  summary: string;
  detail?: string;
  agent?: string;
  /** Duration in ms */
  duration?: number;
  status?: "success" | "failure" | "running" | "pending";
}

interface ActivityStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: ActivityItem[];
  /** Maximum items to show before "load more" */
  maxVisible?: number;
  /** Filter by activity type */
  filter?: ActivityItem["type"][];
  /** Whether stream is actively receiving items */
  isLive?: boolean;
}

const TYPE_CONFIG: Record<ActivityItem["type"], { icon: string; label: string }> = {
  tool_call: { icon: "🔧", label: "Tool Call" },
  code_edit: { icon: "✏️", label: "Code Edit" },
  file_create: { icon: "📄", label: "File Create" },
  file_delete: { icon: "🗑️", label: "File Delete" },
  test_run: { icon: "🧪", label: "Test Run" },
  build: { icon: "🏗️", label: "Build" },
  lint: { icon: "🔍", label: "Lint" },
  message: { icon: "💬", label: "Message" },
  error: { icon: "❌", label: "Error" },
  approval: { icon: "✅", label: "Approval" },
  deploy: { icon: "🚀", label: "Deploy" },
};

const STATUS_CLASS: Record<string, string> = {
  success: "text-[var(--operational-green)]",
  failure: "text-[var(--thermal-red)]",
  running: "text-[var(--jules-electric-violet)]",
  pending: "text-muted-foreground",
};

function ActivityStream({
  activities,
  maxVisible = 50,
  filter,
  isLive = false,
  className,
  ...props
}: ActivityStreamProps) {
  const [showAll, setShowAll] = React.useState(false);

  const filtered = React.useMemo(() => {
    let items = activities;
    if (filter && filter.length > 0) {
      items = items.filter((a) => filter.includes(a.type));
    }
    return items;
  }, [activities, filter]);

  const visible = showAll ? filtered : filtered.slice(0, maxVisible);

  return (
    <div
      data-slot="activity-stream"
      className={cn("rounded-lg border border-border bg-card", className)}
      role="log"
      aria-live={isLive ? "polite" : undefined}
      aria-label="Activity stream"
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Activity Stream</h3>
          {isLive && (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--operational-green)]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--operational-green)] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--operational-green)]" />
              </span>
              Live
            </span>
          )}
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Activity Items */}
      <div className="divide-y divide-border/50">
        {visible.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No activities yet.
          </div>
        ) : (
          visible.map((activity) => {
            const config = TYPE_CONFIG[activity.type];
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted/30"
              >
                <span className="mt-0.5 shrink-0" aria-hidden="true">
                  {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-foreground truncate">
                      {activity.summary}
                    </span>
                    {activity.status && (
                      <span className={cn("shrink-0 text-xs font-medium", STATUS_CLASS[activity.status])}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                  {activity.detail && (
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      {activity.detail}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <time
                    dateTime={activity.timestamp}
                    className="text-[10px] tabular-nums text-muted-foreground"
                  >
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </time>
                  {activity.duration !== undefined && (
                    <div className="text-[10px] tabular-nums text-muted-foreground">
                      {activity.duration < 1000
                        ? `${activity.duration}ms`
                        : `${(activity.duration / 1000).toFixed(1)}s`}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More */}
      {!showAll && filtered.length > maxVisible && (
        <div className="border-t border-border px-4 py-2 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Show all {filtered.length} activities
          </button>
        </div>
      )}
    </div>
  );
}

export { ActivityStream };
export type { ActivityStreamProps };
