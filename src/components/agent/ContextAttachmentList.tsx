"use client";

import React from "react";
import { Button } from "../ui/button";

export interface ContextAttachment {
  id: string;
  name: string;
  type: "file" | "folder" | "snippet" | "url";
  size?: number;
}

export interface ContextAttachmentListProps {
  attachments: ContextAttachment[];
  onRemove?: (id: string) => void;
  className?: string;
}

export const ContextAttachmentList: React.FC<ContextAttachmentListProps> = ({
  attachments,
  onRemove,
  className = ""
}) => {
  if (attachments.length === 0) {
    return (
      <div className={`p-4 border border-dashed border-gray-700 rounded-lg text-center text-sm text-gray-500 ${className}`}>
        No context attachments yet.
      </div>
    );
  }

  return (
    <ul className={`space-y-2 ${className}`}>
      {attachments.map((attachment) => (
        <li key={attachment.id} className="flex items-center justify-between p-2 border border-gray-800 rounded bg-gray-900">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-gray-400">
              {attachment.type === "file" && "📄"}
              {attachment.type === "folder" && "📁"}
              {attachment.type === "snippet" && "✂️"}
              {attachment.type === "url" && "🔗"}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-gray-200 truncate">{attachment.name}</span>
              {attachment.size && <span className="text-xs text-gray-500">{Math.round(attachment.size / 1024)} KB</span>}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onRemove?.(attachment.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};
