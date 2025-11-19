import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";
import React from "react";

type PathProps = {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
  rotation?: number;
};

export const Path = ({
  x,
  y,
  points,
  fill,
  onPointerDown,
  stroke,
  rotation,
}: PathProps) => {
  // Calculate path bounds for rotation center
  const xCoords = points.map((p) => p[0]);
  const yCoords = points.map((p) => p[1]);
  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);
  const width = maxX - minX;
  const height = maxY - minY;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${centerX}, ${centerY})`}>
      <path
        className="drop-shadow-md"
        onPointerDown={onPointerDown}
        d={getSvgPathFromStroke(
          getStroke(points, {
            size: 16,
            thinning: 0.5,
            smoothing: 0.5,
            streamline: 0.5,
          }),
        )}
        x={0}
        y={0}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </g>
  );
};
