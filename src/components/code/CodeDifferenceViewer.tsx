"use client";

import React, { useState } from "react";
import { CanonicalCard } from "../primitives/CanonicalCard";

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface CodeDifferenceViewerProps {
  filename: string;
  diffMode?: "stacked" | "tabbed";
  addedLinesCount?: number;
  removedLinesCount?: number;
  lines?: DiffLine[];
  onCopyContent?: () => void;
  onDownloadFile?: () => void;
  className?: string;
}

export const CodeDifferenceViewer: React.FC<CodeDifferenceViewerProps> = ({
  filename,
  diffMode: initialMode = "stacked",
  addedLinesCount = 12,
  removedLinesCount = 3,
  lines = [
    { type: "unchanged", oldLineNumber: 1, newLineNumber: 1, content: "export const config = {" },
    { type: "removed", oldLineNumber: 2, content: "  theme: 'legacy-blue'," },
    { type: "added", newLineNumber: 2, content: "  theme: 'technical-noir'," },
    { type: "added", newLineNumber: 3, content: "  accent: '#6366F1'," },
    { type: "unchanged", oldLineNumber: 3, newLineNumber: 4, content: "  version: '1.0.0'" },
    { type: "unchanged", oldLineNumber: 4, newLineNumber: 5, content: "};" }
  ],
  onCopyContent,
  onDownloadFile,
  className = ""
}) => {
  const [mode, setMode] = useState<"stacked" | "tabbed">(initialMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyContent?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CanonicalCard variant="default" className={`w-full max-w-5xl overflow-hidden p-0 border-white/10 ${className}`}>
      {/* Cabeçalho da Barra de Diferenças */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F19] border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gray-300 font-semibold">{filename}</span>
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-emerald-400 font-medium">+{addedLinesCount}</span>
            <span className="text-rose-400 font-medium">-{removedLinesCount}</span>
          </div>
        </div>

        {/* Seleção do Modo de Visualização */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1F2937] p-0.5 rounded-md border border-white/5">
            <button
              type="button"
              onClick={() => setMode("stacked")}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                mode === "stacked" ? "bg-indigo-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Empilhado
            </button>
            <button
              type="button"
              onClick={() => setMode("tabbed")}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                mode === "tabbed" ? "bg-indigo-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Por Abas
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs rounded border border-white/10 bg-[#1F2937] text-gray-300 hover:bg-[#2B384E] transition-colors"
          >
            {copied ? "Copiado! ✓" : "Copiar"}
          </button>
        </div>
      </div>

      {/* Tabela / Renderizador de Linhas de Diff */}
      <div className="overflow-x-auto bg-[#07090F] font-mono text-xs">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const bgClass =
                line.type === "added"
                  ? "bg-emerald-950/30 text-emerald-200"
                  : line.type === "removed"
                  ? "bg-rose-950/30 text-rose-300"
                  : "text-gray-300 hover:bg-white/[0.02]";

              const sign = line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";

              return (
                <tr key={idx} className={`${bgClass} transition-colors`}>
                  <td className="w-12 select-none text-right pr-2 py-0.5 text-gray-600 border-r border-white/5">
                    {line.oldLineNumber || ""}
                  </td>
                  <td className="w-12 select-none text-right pr-2 py-0.5 text-gray-600 border-r border-white/5">
                    {line.newLineNumber || ""}
                  </td>
                  <td className="w-6 select-none text-center py-0.5 font-bold">
                    {sign}
                  </td>
                  <td className="py-0.5 px-3 whitespace-pre">
                    {line.content}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CanonicalCard>
  );
};
