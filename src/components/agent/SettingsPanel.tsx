import React, { useState } from "react";
import { Sliders, Cpu, Shield, Save, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SettingsPanelProps {
  initialModel?: string;
  initialTemperature?: number;
  initialMaxTokens?: number;
  initialConcurrency?: number;
  onSaveSettings?: (settings: { model: string; temperature: number; maxTokens: number; concurrency: number }) => void;
  className?: string;
}

export function SettingsPanel({
  initialModel = "gemini-2.5-pro",
  initialTemperature = 0.2,
  initialMaxTokens = 8192,
  initialConcurrency = 4,
  onSaveSettings,
  className,
}: SettingsPanelProps) {
  const [model, setModel] = useState(initialModel);
  const [temperature, setTemperature] = useState(initialTemperature);
  const [maxTokens, setMaxTokens] = useState(initialMaxTokens);
  const [concurrency, setConcurrency] = useState(initialConcurrency);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSaveSettings?.({ model, temperature, maxTokens, concurrency });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      aria-label="Settings Panel"
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-100 shadow-xl backdrop-blur-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-zinc-100">AI Agent Runtime Settings</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Configure model selection, temperature, and agent execution limits.</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/10"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Configuration"}
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Model Selection */}
        <div className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" /> Primary Reasoning Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500/50"
          >
            <option value="gemini-2.5-pro">Gemini 2.5 Pro (Canonical Deep Reasoning & Agentic Coding)</option>
            <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Fast Execution)</option>
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Fallback Specialist)</option>
          </select>
        </div>

        {/* Temperature Slider */}
        <div className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Sampling Temperature</label>
            <span className="text-xs font-mono text-emerald-400 font-semibold">{temperature}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>0.0 (Deterministic / Code)</span>
            <span>0.5 (Balanced)</span>
            <span>1.0 (Creative)</span>
          </div>
        </div>

        {/* Concurrency & Max Tokens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Max Response Tokens
            </label>
            <input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" /> Max Parallel Subagents
            </label>
            <input
              type="number"
              min="1"
              max="16"
              value={concurrency}
              onChange={(e) => setConcurrency(parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
