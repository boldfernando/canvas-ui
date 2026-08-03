"use client";

import React from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

export interface GlobalNavigationProps {
  user?: { name: string; avatarUrl?: string };
  links?: Array<{ label: string; href: string; current?: boolean }>;
  onNavigate?: (href: string) => void;
  className?: string;
}

export const GlobalNavigation: React.FC<GlobalNavigationProps> = ({
  user,
  links = [
    { label: "Cockpit", href: "/cockpit", current: true },
    { label: "Queue", href: "/queue" },
    { label: "Knowledge", href: "/knowledge" },
    { label: "Integrations", href: "/integrations" }
  ],
  onNavigate,
  className = ""
}) => {
  return (
    <nav className={`flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">JH</div>
          <span className="text-white font-semibold tracking-wide">Jules Halls</span>
        </div>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={link.current ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onNavigate?.(link.href)}
              className={link.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
        </Button>
        {user && (
          <Avatar 
            initials={user.name.substring(0, 2).toUpperCase()} 
            src={user.avatarUrl} 
            size="sm"
          />
        )}
      </div>
    </nav>
  );
};
