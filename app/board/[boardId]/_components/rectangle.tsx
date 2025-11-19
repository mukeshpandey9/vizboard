import React from "react";

import { colorToCSS } from "@/lib/utils";
import type { RectangleLayer } from "@/types/canvas";

type RectangleProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill, rotation } = layer;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${width / 2}, ${height / 2})`}>
      <rect
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill ? colorToCSS(fill) : "#000"}
        stroke={selectionColor || "transparent"}
      />
    </g>
  );
};
