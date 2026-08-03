"use client";

import React, { useState } from "react";
import { GlobalNavigation } from "./GlobalNavigation";

export interface ApplicationShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  headerContext?: React.ReactNode;
  user?: { name: string; avatarUrl?: string };
}

export const ApplicationShell: React.FC<ApplicationShellProps> = ({
  children,
  sidebar,
  headerContext,
  user
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-950 text-gray-100">
      <GlobalNavigation user={user} className="flex-none" />
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <aside
            className={`flex-none border-r border-gray-800 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"
            }`}
          >
            {sidebar}
          </aside>
        )}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {headerContext && (
            <header className="flex-none h-12 border-b border-gray-800 px-4 flex items-center bg-gray-900/50 backdrop-blur-sm">
              {sidebar && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="mr-3 p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              )}
              <div className="flex-1 min-w-0">{headerContext}</div>
            </header>
          )}
          <div className="flex-1 overflow-auto relative p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
