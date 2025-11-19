"use client";

import { useState } from "react";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="absolute bottom-2 left-2">
        <Hint label="Keyboard shortcuts" side="right">
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            variant="board"
            className="bg-white shadow-md"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </Hint>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 left-2 bg-white rounded-lg shadow-xl p-4 w-80 max-h-[500px] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
        <Button
          onClick={() => setIsOpen(false)}
          size="icon"
          variant="ghost"
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 text-xs">
        <ShortcutSection title="Tools">
          <Shortcut keys={["V"]} description="Select" />
          <Shortcut keys={["H"]} description="Hand (Pan)" />
          <Shortcut keys={["R"]} description="Rectangle" />
          <Shortcut keys={["O"]} description="Ellipse" />
          <Shortcut keys={["T"]} description="Text" />
          <Shortcut keys={["P"]} description="Pencil" />
          <Shortcut keys={["E"]} description="Eraser" />
          <Shortcut keys={["N"]} description="Note" />
          <Shortcut keys={["L"]} description="Line" />
          <Shortcut keys={["A"]} description="Arrow" />
          <Shortcut keys={["D"]} description="Diamond" />
        </ShortcutSection>

        <ShortcutSection title="Actions">
          <Shortcut keys={["Ctrl", "Z"]} description="Undo" />
          <Shortcut keys={["Ctrl", "Y"]} description="Redo" />
          <Shortcut keys={["Ctrl", "D"]} description="Duplicate" />
          <Shortcut keys={["Delete"]} description="Delete selection" />
          <Shortcut keys={["Backspace"]} description="Delete selection" />
          <Shortcut keys={["Esc"]} description="Clear selection" />
        </ShortcutSection>

        <ShortcutSection title="View">
          <Shortcut keys={["Ctrl", "+"]} description="Zoom in" />
          <Shortcut keys={["Ctrl", "-"]} description="Zoom out" />
          <Shortcut keys={["Ctrl", "0"]} description="Reset zoom" />
          <Shortcut keys={["Space", "Drag"]} description="Pan canvas" />
        </ShortcutSection>
      </div>
    </div>
  );
};

const ShortcutSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h4 className="font-medium text-neutral-500 mb-1.5">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Shortcut = ({
  keys,
  description,
}: {
  keys: string[];
  description: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-700">{description}</span>
      <div className="flex gap-1">
        {keys.map((key, index) => (
          <span key={index}>
            <kbd className="px-2 py-1 text-xs font-semibold text-neutral-800 bg-neutral-100 border border-neutral-200 rounded">
              {key}
            </kbd>
            {index < keys.length - 1 && (
              <span className="mx-1 text-neutral-400">+</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
