"use client";

import { Download, FileImage, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ExportMenuProps = {
  boardId: string;
  boardTitle?: string;
};

export const ExportMenu = ({ boardId, boardTitle }: ExportMenuProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPNG = async () => {
    setIsExporting(true);
    try {
      // Get the SVG element
      const svgElement = document.querySelector("svg");
      if (!svgElement) {
        throw new Error("Canvas not found");
      }

      // Get the bounding box of all content
      const bbox = svgElement.getBBox();
      const padding = 50;

      // Create a new canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Set canvas size with padding
      canvas.width = bbox.width + padding * 2;
      canvas.height = bbox.height + padding * 2;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clone the SVG and adjust viewBox
      const svgClone = svgElement.cloneNode(true) as SVGElement;
      const gElement = svgClone.querySelector("g");
      if (gElement) {
        // Remove transform to get clean export
        gElement.removeAttribute("style");
      }
      
      svgClone.setAttribute(
        "viewBox",
        `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
      );
      svgClone.setAttribute("width", String(canvas.width));
      svgClone.setAttribute("height", String(canvas.height));

      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      // Load image and draw to canvas
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        // Download PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.download = `${boardTitle || "whiteboard"}-${Date.now()}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          }
          setIsExporting(false);
        });
      };
      img.onerror = () => {
        console.error("Failed to load SVG image");
        setIsExporting(false);
      };
      img.src = url;
    } catch (error) {
      console.error("Export failed:", error);
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamic import for jsPDF to reduce bundle size
      const { default: jsPDF } = await import("jspdf");

      // Get the SVG element
      const svgElement = document.querySelector("svg");
      if (!svgElement) {
        throw new Error("Canvas not found");
      }

      // Get the bounding box of all content
      const bbox = svgElement.getBBox();
      const padding = 50;

      // Create a new canvas for conversion
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Set canvas size
      canvas.width = bbox.width + padding * 2;
      canvas.height = bbox.height + padding * 2;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clone and prepare SVG
      const svgClone = svgElement.cloneNode(true) as SVGElement;
      const gElement = svgClone.querySelector("g");
      if (gElement) {
        gElement.removeAttribute("style");
      }
      
      svgClone.setAttribute(
        "viewBox",
        `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
      );
      svgClone.setAttribute("width", String(canvas.width));
      svgClone.setAttribute("height", String(canvas.height));

      // Convert SVG to image
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        // Create PDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${boardTitle || "whiteboard"}-${Date.now()}.pdf`);
        setIsExporting(false);
      };
      img.onerror = () => {
        console.error("Failed to load SVG image");
        setIsExporting(false);
      };
      img.src = url;
    } catch (error) {
      console.error("PDF export failed:", error);
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Hint label="Export" side="bottom" sideOffset={10}>
            <Button
              variant="board"
              size="icon"
              disabled={isExporting}
              className="relative"
            >
              <Download className="h-4 w-4" />
              {isExporting && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded">
                  <div className="h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>
          </Hint>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-48">
        <DropdownMenuItem onClick={exportAsPNG} disabled={isExporting}>
          <FileImage className="h-4 w-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF} disabled={isExporting}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
