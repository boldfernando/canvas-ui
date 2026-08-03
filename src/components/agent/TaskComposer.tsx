"use client";

import React, { useState } from "react";
import { CanonicalCard } from "../primitives/CanonicalCard";
import { StatusIndicator } from "../primitives/StatusIndicator";

export interface TaskComposerProps {
  repositories?: Array<{ name: string; branch: string }>;
  onStartTask?: (taskData: { repo: string; branch: string; prompt: string; mode: string }) => void;
  className?: string;
}

export const TaskComposer: React.FC<TaskComposerProps> = ({
  repositories = [
    { name: "google-labs-code/jules-halls", branch: "main" },
    { name: "google-labs-code/canvas-ui", branch: "main" },
    { name: "google-labs-code/stitch-sdk", branch: "v0.3.5" }
  ],
  onStartTask,
  className = ""
}) => {
  const [selectedRepo, setSelectedRepo] = useState(repositories[0]?.name || "");
  const [selectedBranch, setSelectedBranch] = useState(repositories[0]?.branch || "main");
  const [prompt, setPrompt] = useState("");
  const [interactionMode, setInteractionsMode] = useState<"direct" | "review" | "plan">("plan");
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onStartTask?.({
      repo: selectedRepo,
      branch: selectedBranch,
      prompt,
      mode: interactionMode
    });
  };

  return (
    <CanonicalCard variant="default" glowOnHover className={`w-full max-w-4xl border-indigo-500/20 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse" />
          <h2 className="text-lg font-semibold text-white tracking-tight">Criar Nova Tarefa de Agente</h2>
        </div>
        <StatusIndicator state="queued" label="Pronto para Instruções" size="sm" />
      </div>

      <form onSubmit={handleStart} className="space-y-4">
        {/* Contexto do Repositório GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#0B0F19] border border-white/5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Repositório Alvo</label>
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="w-full bg-[#1F2937] border border-white/10 rounded-md px-3 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
            >
              {repositories.map((repo) => (
                <option key={repo.name} value={repo.name}>{repo.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Ramificação (Branch)</label>
            <input
              type="text"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-[#1F2937] border border-white/10 rounded-md px-3 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Editor de Instrução (Prompt Editor) */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Instrução da Tarefa</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Descreva o que o agente Jules deve implementar, refatorar ou analisar..."
            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg p-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        {/* Modo de Interação & Controles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Modo de Execução:</span>
            {(["direct", "review", "plan"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setInteractionsMode(mode)}
                className={`px-3 py-1 text-xs rounded-md border transition-all ${
                  interactionMode === mode
                    ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-medium"
                    : "bg-[#1F2937] border-white/5 text-gray-400 hover:text-gray-200"
                }`}
              >
                {mode === "direct" ? "Direto" : mode === "review" ? "Revisão" : "Com Planejamento"}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!prompt.trim()}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
          >
            Iniciar Tarefa ⚡
          </button>
        </div>
      </form>
    </CanonicalCard>
  );
};
