import React from "react";

import { colorToCSS } from "@/lib/utils";
import type { EllipseLayer } from "@/types/canvas";

type EllipseProps = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {
  const { rotation, x, y, width, height, fill } = layer;
  
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${width / 2}, ${height / 2})`}>
      <ellipse
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        fill={fill ? colorToCSS(fill) : "#000"}
        stroke={selectionColor || "transparent"}
        strokeWidth={1}
      />
    </g>
  );
};
