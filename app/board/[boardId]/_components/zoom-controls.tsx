"use client";

import { Minus, Plus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

type ZoomControlsProps = {
  camera: { x: number; y: number; zoom?: number };
  setCamera: (camera: { x: number; y: number; zoom?: number }) => void;
};

export const ZoomControls = ({ camera, setCamera }: ZoomControlsProps) => {
  const zoom = camera.zoom || 1;

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3);
    setCamera({ ...camera, zoom: newZoom });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1);
    setCamera({ ...camera, zoom: newZoom });
  };

  const handleResetZoom = () => {
    setCamera({ x: 0, y: 0, zoom: 1 });
  };

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-2 right-2 bg-white rounded-md p-2 flex items-center gap-x-2 shadow-md">
      <Hint label="Zoom out" side="top">
        <Button
          onClick={handleZoomOut}
          disabled={zoom <= 0.1}
          size="icon"
          variant="board"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </Hint>

      <Button
        onClick={handleResetZoom}
        variant="ghost"
        size="sm"
        className="min-w-[60px] text-xs font-medium"
      >
        {zoomPercentage}%
      </Button>

      <Hint label="Zoom in" side="top">
        <Button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          size="icon"
          variant="board"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </Hint>

      <div className="w-px h-6 bg-neutral-200 mx-1" />

      <Hint label="Fit to screen" side="top">
        <Button onClick={handleResetZoom} size="icon" variant="board">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  );
};
