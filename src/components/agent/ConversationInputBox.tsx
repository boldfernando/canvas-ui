import React, { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ConversationInputBoxProps {
  onSendMessage?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function ConversationInputBox({
  onSendMessage,
  placeholder = "Instruct agent or prompt workflow...",
  className,
}: ConversationInputBoxProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage?.(input);
    setInput("");
  };

  return (
    <div className={cn("relative p-2 bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg font-sans", className)}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={2}
        className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none resize-none px-2 pt-1"
      />
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
        <button
          type="button"
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Attach artifact"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 font-semibold text-xs transition-colors"
        >
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </div>
    </div>
  );
}
