import React from "react";

import { colorToCSS } from "@/lib/utils";
import type { DiamondLayer } from "@/types/canvas";

type DiamondProps = {
  id: string;
  layer: DiamondLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Diamond = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: DiamondProps) => {
  const { x, y, width, height, fill, rotation } = layer;

  const centerX = width / 2;
  const centerY = height / 2;

  const points = `
    ${centerX},${0}
    ${width},${centerY}
    ${centerX},${height}
    ${0},${centerY}
  `;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${centerX}, ${centerY})`}>
      <polygon
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        points={points}
        fill={fill ? colorToCSS(fill) : "#000"}
        stroke={selectionColor || "transparent"}
        strokeWidth={1}
      />
    </g>
  );
};
