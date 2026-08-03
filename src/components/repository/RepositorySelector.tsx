"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * RepositorySelector — Jules Halls (T28)
 * Searchable dropdown for selecting a repository + branch.
 * Maps to the Jules task creation flow where users pick a target repo.
 */

export interface Repository {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  defaultBranch: string;
  branches: string[];
  isPrivate?: boolean;
  language?: string;
  updatedAt?: string;
}

interface RepositorySelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  repositories: Repository[];
  selectedRepo?: Repository;
  selectedBranch?: string;
  onRepoChange?: (repo: Repository) => void;
  onBranchChange?: (branch: string) => void;
  placeholder?: string;
  loading?: boolean;
}

function RepositorySelector({
  repositories,
  selectedRepo,
  selectedBranch,
  onRepoChange,
  onBranchChange,
  placeholder = "Select repository…",
  loading = false,
  className,
  ...props
}: RepositorySelectorProps) {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return repositories;
    const q = search.toLowerCase();
    return repositories.filter((r) => r.fullName.toLowerCase().includes(q));
  }, [repositories, search]);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) {
          onRepoChange?.(filtered[activeIndex]);
          onBranchChange?.(filtered[activeIndex].defaultBranch);
          setOpen(false);
          setSearch("");
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const effectiveBranch = selectedBranch ?? selectedRepo?.defaultBranch;

  return (
    <div
      ref={containerRef}
      data-slot="repository-selector"
      className={cn("relative", className)}
      {...props}
    >
      {/* Trigger */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label="Search repositories"
            value={open ? search : selectedRepo?.fullName ?? ""}
            placeholder={placeholder}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
            onFocus={() => { setOpen(true); setSearch(""); }}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full rounded-md border border-border bg-background px-3 py-2 text-sm",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              loading && "opacity-60",
            )}
          />
          {loading && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
          )}
        </div>

        {/* Branch selector */}
        {selectedRepo && (
          <select
            value={effectiveBranch}
            onChange={(e) => onBranchChange?.(e.target.value)}
            aria-label="Select branch"
            className="rounded-md border border-border bg-background px-2 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {selectedRepo.branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover shadow-lg",
            "animate-in fade-in slide-in-from-top-1 duration-150",
          )}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No repositories found.
            </div>
          ) : (
            filtered.map((repo, i) => (
              <div
                key={repo.id}
                role="option"
                aria-selected={i === activeIndex}
                data-active={i === activeIndex}
                onClick={() => {
                  onRepoChange?.(repo);
                  onBranchChange?.(repo.defaultBranch);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors",
                  i === activeIndex ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted",
                )}
              >
                <span className="shrink-0 text-xs" aria-hidden="true">
                  {repo.isPrivate ? "🔒" : "📂"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{repo.fullName}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {repo.language && <span>{repo.language} • </span>}
                    {repo.defaultBranch}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export { RepositorySelector };
export type { RepositorySelectorProps };
