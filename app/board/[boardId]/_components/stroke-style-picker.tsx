"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type StrokeStylePickerProps = {
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  strokeStyle: "solid" | "dashed" | "dotted";
  onStrokeStyleChange: (style: "solid" | "dashed" | "dotted") => void;
};

export const StrokeStylePicker = ({
  strokeWidth,
  onStrokeWidthChange,
  strokeStyle,
  onStrokeStyleChange,
}: StrokeStylePickerProps) => {
  const strokeWidths = [1, 2, 4, 8];
  const strokeStyles: Array<"solid" | "dashed" | "dotted"> = [
    "solid",
    "dashed",
    "dotted",
  ];

  return (
    <div className="flex gap-4 items-center px-2 border-r border-neutral-200">
      {/* Stroke Width */}
      <div className="flex gap-1 items-center">
        <span className="text-xs text-neutral-500 mr-1">Width:</span>
        {strokeWidths.map((width) => (
          <Button
            key={width}
            onClick={() => onStrokeWidthChange(width)}
            variant="ghost"
            size="sm"
            className={`w-8 h-8 p-0 ${
              strokeWidth === width ? "bg-blue-100" : ""
            }`}
          >
            <div
              className="bg-black rounded-full"
              style={{
                width: `${width * 2}px`,
                height: `${width * 2}px`,
              }}
            />
            {strokeWidth === width && (
              <Check className="absolute h-3 w-3 text-blue-600" />
            )}
          </Button>
        ))}
      </div>

      {/* Stroke Style */}
      <div className="flex gap-1 items-center">
        <span className="text-xs text-neutral-500 mr-1">Style:</span>
        {strokeStyles.map((style) => (
          <Button
            key={style}
            onClick={() => onStrokeStyleChange(style)}
            variant="ghost"
            size="sm"
            className={`w-12 h-8 p-0 ${
              strokeStyle === style ? "bg-blue-100" : ""
            }`}
          >
            <svg width="40" height="4" className="mx-auto">
              <line
                x1="0"
                y1="2"
                x2="40"
                y2="2"
                stroke="black"
                strokeWidth="2"
                strokeDasharray={
                  style === "dashed" ? "4,4" : style === "dotted" ? "1,3" : "0"
                }
              />
            </svg>
            {strokeStyle === style && (
              <Check className="absolute h-3 w-3 text-blue-600" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
