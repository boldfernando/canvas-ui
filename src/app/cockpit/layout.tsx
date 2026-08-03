import React from "react";

export default function CockpitLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] flex flex-col font-sans antialiased">
      {/* Navbar Superior Canônica (swebot-navbar) */}
      <header className="h-14 border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-indigo-600/30">
              J
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Jules Halls Cockpit</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
            Canonical v1.0
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="px-3 py-1 rounded-md border border-white/10 bg-[#1F2937] hover:bg-[#2B384E] text-gray-300 transition-colors">
            Feedback
          </button>
          <div className="h-7 w-7 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center font-medium text-xs text-indigo-300">
            JH
          </div>
        </div>
      </header>

      {/* Workspace Principal + Mini Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Compacta (mini-sidebar-menu) */}
        <aside className="w-16 border-r border-white/10 bg-[#0B0F19] flex flex-col items-center py-4 gap-4 select-none">
          <a
            href="/cockpit"
            className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
            title="Painel Inicial"
          >
            🏠
          </a>
          <a
            href="/cockpit/tasks"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            title="Tarefas & Fila"
          >
            ⚡
          </a>
          <a
            href="/cockpit/workspace"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            title="Workspace de Código & Diff"
          >
            💻
          </a>
          <a
            href="/cockpit/lifecycle"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            title="Product Lifecycle 360º"
          >
            🧬
          </a>
        </aside>

        {/* Área Principal da Página */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#07090F]">
          {children}
        </main>
      </div>
    </div>
  );
}
