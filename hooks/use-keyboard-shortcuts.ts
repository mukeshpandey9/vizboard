"use client";

import { useEffect } from "react";
import { CanvasMode, LayerType, type CanvasState } from "@/types/canvas";

type UseKeyboardShortcutsProps = {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  deleteLayers: () => void;
  duplicateLayers?: () => void;
};

export const useKeyboardShortcuts = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  deleteLayers,
  duplicateLayers,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in text fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).contentEditable === "true"
      ) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl/Cmd + Z
      if (modifier && e.key === "z" && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z
      if (
        (modifier && e.key === "y") ||
        (modifier && e.shiftKey && e.key === "z")
      ) {
        if (canRedo) {
          e.preventDefault();
          redo();
        }
        return;
      }

      // Delete/Backspace
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteLayers();
        return;
      }

      // Duplicate: Ctrl/Cmd + D
      if (modifier && e.key === "d" && duplicateLayers) {
        e.preventDefault();
        duplicateLayers();
        return;
      }

      // Select tool: V
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        setCanvasState({ mode: CanvasMode.None });
        return;
      }

      // Hand/Pan tool: H or Space (hold)
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        setCanvasState({ mode: CanvasMode.Panning, origin: { x: 0, y: 0 } });
        return;
      }

      // Rectangle: R
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Rectangle,
        });
        return;
      }

      // Circle/Ellipse: O
      if (e.key === "o" || e.key === "O") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Ellipse,
        });
        return;
      }

      // Text: T
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Text,
        });
        return;
      }

      // Pencil/Draw: P
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setCanvasState({ mode: CanvasMode.Pencil });
        return;
      }

      // Note: N
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Note,
        });
        return;
      }

      // Line: L
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Line,
        });
        return;
      }

      // Arrow: A
      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Arrow,
        });
        return;
      }

      // Diamond: D (without modifier)
      if (e.key === "d" && !modifier) {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Diamond,
        });
        return;
      }

      // Eraser: E
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        setCanvasState({
          mode: CanvasMode.Eraser,
        });
        return;
      }

      // Escape: Exit current tool
      if (e.key === "Escape") {
        e.preventDefault();
        setCanvasState({ mode: CanvasMode.None });
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    deleteLayers,
    duplicateLayers,
  ]);
};
