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
      // Give UI time to update before capturing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get the SVG element from main canvas
      const svgElements = document.querySelectorAll("svg");
      let svgElement: SVGSVGElement | null = null;
      
      // Find the main canvas SVG (should be the largest one)
      svgElements.forEach((svg) => {
        if (svg.classList.contains("h-[100vh]")) {
          svgElement = svg as SVGSVGElement;
        }
      });

      if (!svgElement) {
        throw new Error("Canvas not found");
      }

      // TypeScript assertion after null check
      const svg = svgElement as SVGSVGElement;

      // Get all layer elements
      const gElement = svg.querySelector("g");
      if (!gElement) {
        throw new Error("No content to export");
      }

      // Calculate bounding box of all content
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      const children = gElement.children;
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof SVGGraphicsElement) {
          try {
            const bbox = child.getBBox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
          } catch (e) {
            // Skip elements that can't be measured
          }
        }
      }

      if (!isFinite(minX)) {
        throw new Error("No content to export");
      }

      const padding = 50;
      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;

      // Create a new canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Set canvas size with padding
      canvas.width = contentWidth + padding * 2;
      canvas.height = contentHeight + padding * 2;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clone the SVG
      const svgClone = svg.cloneNode(true) as SVGSVGElement;
      
      // Remove UI elements from clone
      svgClone.querySelectorAll("foreignObject").forEach(el => {
        // Keep text/note content but remove UI overlays
        if (!el.querySelector("[contenteditable]")) {
          el.remove();
        }
      });
      
      // Set viewBox to content area
      svgClone.setAttribute(
        "viewBox",
        `${minX - padding} ${minY - padding} ${contentWidth + padding * 2} ${contentHeight + padding * 2}`
      );
      svgClone.setAttribute("width", String(canvas.width));
      svgClone.setAttribute("height", String(canvas.height));
      svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

      // Load image and draw to canvas
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        // Download PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.download = `${boardTitle || "whiteboard"}-${Date.now()}.png`;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }
          setIsExporting(false);
        });
      };
      img.onerror = () => {
        console.error("Failed to load SVG image");
        setIsExporting(false);
      };
      img.src = svgDataUrl;
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      // Give UI time to update before capturing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Dynamic import for jsPDF to reduce bundle size
      const { default: jsPDF } = await import("jspdf");

      // Get the SVG element from main canvas
      const svgElements = document.querySelectorAll("svg");
      let svgElement: SVGSVGElement | null = null;
      
      svgElements.forEach((svg) => {
        if (svg.classList.contains("h-[100vh]")) {
          svgElement = svg as SVGSVGElement;
        }
      });

      if (!svgElement) {
        throw new Error("Canvas not found");
      }

      // TypeScript assertion after null check
      const svg = svgElement as SVGSVGElement;

      // Get all layer elements
      const gElement = svg.querySelector("g");
      if (!gElement) {
        throw new Error("No content to export");
      }

      // Calculate bounding box
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      const children = gElement.children;
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof SVGGraphicsElement) {
          try {
            const bbox = child.getBBox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
          } catch (e) {
            // Skip elements that can't be measured
          }
        }
      }

      if (!isFinite(minX)) {
        throw new Error("No content to export");
      }

      const padding = 50;
      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;

      // Create a new canvas for conversion
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Set canvas size
      canvas.width = contentWidth + padding * 2;
      canvas.height = contentHeight + padding * 2;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clone and prepare SVG
      const svgClone = svg.cloneNode(true) as SVGSVGElement;
      
      // Remove UI elements
      svgClone.querySelectorAll("foreignObject").forEach(el => {
        if (!el.querySelector("[contenteditable]")) {
          el.remove();
        }
      });
      
      svgClone.setAttribute(
        "viewBox",
        `${minX - padding} ${minY - padding} ${contentWidth + padding * 2} ${contentHeight + padding * 2}`
      );
      svgClone.setAttribute("width", String(canvas.width));
      svgClone.setAttribute("height", String(canvas.height));
      svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Convert SVG to image
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);

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
      img.src = svgDataUrl;
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("PDF export failed. Please try again.");
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
