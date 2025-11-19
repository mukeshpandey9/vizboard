import React from "react";

import { colorToCSS } from "@/lib/utils";
import type { ArrowLayer } from "@/types/canvas";

type ArrowProps = {
  id: string;
  layer: ArrowLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Arrow = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ArrowProps) => {
  const { x, y, width, height, fill } = layer;

  const endX = x + width;
  const endY = y + height;
  
  // Calculate arrow head
  const headLength = 15;
  const angle = Math.atan2(height, width);
  const arrowPoint1X = endX - headLength * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endY - headLength * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endX - headLength * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endY - headLength * Math.sin(angle + Math.PI / 6);

  return (
    <g className="drop-shadow-md" onPointerDown={(e) => onPointerDown(e, id)}>
      <line
        x1={x}
        y1={y}
        x2={endX}
        y2={endY}
        stroke={fill ? colorToCSS(fill) : "#000"}
        strokeWidth={2}
        fill="none"
      />
      <polygon
        points={`${endX},${endY} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}`}
        fill={fill ? colorToCSS(fill) : "#000"}
      />
      {selectionColor && (
        <line
          x1={x}
          y1={y}
          x2={endX}
          y2={endY}
          stroke={selectionColor}
          strokeWidth={4}
          fill="none"
          opacity={0.3}
        />
      )}
    </g>
  );
};
