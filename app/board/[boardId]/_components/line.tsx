import React from "react";

import { colorToCSS } from "@/lib/utils";
import type { LineLayer } from "@/types/canvas";

type LineProps = {
  id: string;
  layer: LineLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Line = ({ id, layer, onPointerDown, selectionColor }: LineProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <line
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      x1={x}
      y1={y}
      x2={x + width}
      y2={y + height}
      stroke={fill ? colorToCSS(fill) : "#000"}
      strokeWidth={2}
      fill="none"
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
      }}
    />
  );
};
