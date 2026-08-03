import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  isFolder?: boolean;
  children?: TreeNode[];
}

export interface TreeProps {
  nodes: TreeNode[];
  onSelectNode?: (nodeId: string) => void;
  className?: string;
}

export function Tree({ nodes, onSelectNode, className }: TreeProps) {
  return (
    <div className={cn("space-y-1 font-sans text-xs", className)}>
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} onSelectNode={onSelectNode} level={0} />
      ))}
    </div>
  );
}

function TreeItem({
  node,
  onSelectNode,
  level,
}: {
  node: TreeNode;
  onSelectNode?: (id: string) => void;
  level: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.isFolder && node.children && node.children.length > 0;

  return (
    <div>
      <div
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelectNode?.(node.id);
        }}
        className="flex items-center gap-1.5 py-1 pr-2 rounded text-zinc-300 hover:bg-zinc-800/60 cursor-pointer select-none transition-colors"
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          )
        ) : (
          <span className="w-3.5 h-3.5" />
        )}
        {node.isFolder ? (
          <Folder className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <File className="w-3.5 h-3.5 text-emerald-400" />
        )}
        <span className="truncate">{node.label}</span>
      </div>

      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} onSelectNode={onSelectNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
