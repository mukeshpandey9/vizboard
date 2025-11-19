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
  const { x, y, width, height, fill, rotation } = layer;

  // Calculate center point for rotation
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${centerX}, ${centerY})`}>
      <line
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        x1={0}
        y1={0}
        x2={width}
        y2={height}
        stroke={fill ? colorToCSS(fill) : "#000"}
        strokeWidth={2}
        fill="none"
      />
      {selectionColor && (
        <line
          x1={0}
          y1={0}
          x2={width}
          y2={height}
          stroke={selectionColor}
          strokeWidth={4}
          fill="none"
          opacity={0.3}
        />
      )}
    </g>
  );
};
