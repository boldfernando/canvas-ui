"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export interface InstructionEditorProps {
  initialValue?: string;
  onSave?: (value: string) => void;
  className?: string;
}

export const InstructionEditor: React.FC<InstructionEditorProps> = ({
  initialValue = "",
  onSave,
  className = ""
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-300">Agent Instructions</label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Provide instructions for the agent..."
        className="min-h-[150px] font-mono text-sm"
      />
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="outline" size="sm" onClick={() => setValue(initialValue)}>
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={() => onSave?.(value)}>
          Save Instructions
        </Button>
      </div>
    </div>
  );
};
