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

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const points = `
    ${centerX},${y}
    ${x + width},${centerY}
    ${centerX},${y + height}
    ${x},${centerY}
  `;

  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      points={points}
      fill={fill ? colorToCSS(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
      style={{
        transform: `rotate(${rotation || 0}deg)`,
        transformOrigin: `${centerX}px ${centerY}px`,
      }}
    />
  );
};
