import React, { useState } from "react";
import { BookOpen, Search, Sparkles, Layers, FileText, CheckCircle2, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SkillItem {
  name: string;
  category: string;
  description: string;
  status: "active" | "deprecated" | "experimental";
  version: string;
}

export interface KnowledgeManagerProps {
  skills?: SkillItem[];
  vectorIndexName?: string;
  vectorCount?: number;
  onSearch?: (query: string) => void;
  className?: string;
}

export function KnowledgeManager({
  skills = [
    {
      name: "a11y-debugging",
      category: "Chrome DevTools",
      description: "Accessibility debugging and WCAG compliance audit automation.",
      status: "active",
      version: "v1.2.0",
    },
    {
      name: "antigravity-guide",
      category: "Platform",
      description: "Comprehensive sitemap, keybindings, and CLI reference for Antigravity AGY.",
      status: "active",
      version: "v2.0.0",
    },
    {
      name: "modern-web-guidance",
      category: "Frontend",
      description: "Modern web layout, container queries, view transitions, and design guidance.",
      status: "active",
      version: "v1.5.0",
    },
    {
      name: "google-antigravity-sdk",
      category: "SDK",
      description: "Design and implement autonomous agent systems using the AGY SDK.",
      status: "active",
      version: "v2.1.0",
    },
  ],
  vectorIndexName = "jules-halls-knowledge-v2",
  vectorCount = 14280,
  onSearch,
  className,
}: KnowledgeManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      aria-label="Knowledge Manager"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">Knowledge Base & Skills Registry</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Vector Index: <span className="font-mono text-zinc-300">{vectorIndexName}</span> ({vectorCount.toLocaleString()} embeddings)
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter skills & docs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/50 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400">Registered Skills</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{skills.length} Loaded</div>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="p-3.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400">Sitemap Documents</div>
            <div className="text-lg font-mono font-bold text-zinc-200">128 Indexed</div>
          </div>
          <FileText className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="p-3.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400">Governance Schemas</div>
            <div className="text-lg font-mono font-bold text-zinc-200">22 Manifests</div>
          </div>
          <Layers className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="p-3.5 rounded-lg border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
                  {skill.name} <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {skill.version}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">{skill.description}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/40 text-[11px] text-zinc-500">
              <span>Category: {skill.category}</span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
