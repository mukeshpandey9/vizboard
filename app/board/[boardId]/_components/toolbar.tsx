import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
  ArrowRight,
  Minus,
  Diamond,
  Hand,
  Copy,
  Eraser,
} from "lucide-react";

import { CanvasMode, LayerType, type CanvasState } from "@/types/canvas";

import { ToolButton } from "./tool-button";

type ToolbarProps = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canRedo,
  canUndo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />

        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />

        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />

        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />

        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />

        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />

        <ToolButton
          label="Eraser"
          icon={Eraser}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Eraser,
            })
          }
          isActive={canvasState.mode === CanvasMode.Eraser}
        />

        <ToolButton
          label="Line"
          icon={Minus}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Line,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Line
          }
        />

        <ToolButton
          label="Arrow"
          icon={ArrowRight}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Arrow,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Arrow
          }
        />

        <ToolButton
          label="Diamond"
          icon={Diamond}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Diamond,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Diamond
          }
        />

        <ToolButton
          label="Hand"
          icon={Hand}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Panning,
              origin: { x: 0, y: 0 },
            })
          }
          isActive={canvasState.mode === CanvasMode.Panning}
        />
      </div>

      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo (Ctrl+Z)"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo (Ctrl+Y)"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div
      className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[510px] w-[52px] shadow-md rounded-md"
      aria-hidden
    />
  );
};
