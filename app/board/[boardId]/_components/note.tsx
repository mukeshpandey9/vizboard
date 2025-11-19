import { Kalam } from "next/font/google";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";

import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import type { NoteLayer } from "@/types/canvas";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value, rotation } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${width / 2}, ${height / 2})`}>
      <foreignObject
        x={0}
        y={0}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          outline: selectionColor ? `1px solid ${selectionColor}` : "none",
          backgroundColor: fill ? colorToCSS(fill) : "#000",
        }}
        className="shadow-md drop-shadow-xl"
      >
        <ContentEditable
          html={value || "Text"}
          onChange={handleContentChange}
          className={cn(
            "h-full w-full flex items-center justify-center text-center outline-none",
            font.className,
          )}
          style={{
            fontSize: calculateFontSize(width, height),
            color: fill ? getContrastingTextColor(fill) : "#000",
          }}
        />
      </foreignObject>
    </g>
  );
};
