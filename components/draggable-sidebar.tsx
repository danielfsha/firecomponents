"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarCloseIcon, SidebarIcon, X } from "lucide-react";
import { Button } from "./ui/button";

interface DraggableSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableSidebar({
  children,
  className,
}: DraggableSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(-280); // sidebar width is 280px
  const [showPeek, setShowPeek] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);
  const lastDragX = useRef(-280);
  const velocityRef = useRef(0);

  const SIDEBAR_WIDTH = 280;
  const THRESHOLD = SIDEBAR_WIDTH * 0.5; // 50% threshold
  const EDGE_DETECT_ZONE = 30; // pixels from edge to show peek
  const PEEK_WIDTH = 48; // how much to reveal when hovering edge

  // Stop tracking drag if fully collapsed (open or closed) and not actively dragging
  const isCollapsed = dragX === 0 || dragX === -SIDEBAR_WIDTH;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartX.current;
        const newX = Math.max(
          -SIDEBAR_WIDTH,
          Math.min(0, lastDragX.current + deltaX)
        );

        setDragX(newX);

        // Calculate velocity
        const now = Date.now();
        const timeDelta = now - dragStartTime.current;
        if (timeDelta > 0) {
          velocityRef.current = deltaX / timeDelta;
        }

        const draggedAmount = newX + SIDEBAR_WIDTH; // 0 to 280 px

        // Update isOpen visually based on threshold but don't stop dragging
        if (draggedAmount >= SIDEBAR_WIDTH * 0.4) {
          setIsOpen(true);
        } else if (draggedAmount < SIDEBAR_WIDTH * 0.4) {
          setIsOpen(false);
        }
      } else if (!isOpen) {
        // Edge peek
        if (e.clientX <= EDGE_DETECT_ZONE) {
          setShowPeek(true);
        } else if (e.clientX > EDGE_DETECT_ZONE + 50) {
          setShowPeek(false);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);

        // Check if we've crossed threshold
        const draggedAmount = dragX + SIDEBAR_WIDTH;
        const crossedThreshold = draggedAmount > THRESHOLD;

        // Apply velocity-based momentum
        const momentumX = dragX + velocityRef.current * 200;
        const shouldOpen =
          crossedThreshold || momentumX > -SIDEBAR_WIDTH + THRESHOLD;

        if (shouldOpen) {
          setIsOpen(true);
          setDragX(0);
          lastDragX.current = 0;
        } else {
          setIsOpen(false);
          setDragX(-SIDEBAR_WIDTH);
          lastDragX.current = -SIDEBAR_WIDTH;
        }

        velocityRef.current = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragX, isOpen, isCollapsed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartTime.current = Date.now();
    lastDragX.current = dragX;
    velocityRef.current = 0;
  };

  const handleClose = () => {
    setIsOpen(false);
    setDragX(-SIDEBAR_WIDTH);
    lastDragX.current = -SIDEBAR_WIDTH;
  };

  const sidebarX = isDragging
    ? dragX
    : isOpen
    ? 0
    : showPeek
    ? -SIDEBAR_WIDTH + PEEK_WIDTH
    : -SIDEBAR_WIDTH;

  return (
    <>
      {/* Overlay with opacity animation */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-40 transition-opacity duration-300 z-100",
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-3 left-3 h-[calc(100vh-24px)] w-[280px] bg-sidebar border border-sidebar-border rounded-2xl z-[200]",
          "shadow-lg",
          isDragging ? "" : "transition-transform duration-300 ease-out",
          className
        )}
        style={{
          transform: `translateX(${sidebarX}px)`,
        }}
      >
        {/* Drag handle - visible area */}
        <div
          className="absolute top-0 right-0 w-6 h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        />

        {/* Content */}
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              Menu
            </h2>
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <SidebarIcon />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto text-sidebar-foreground">
            {children}
          </div>
        </div>

        {/* Visual drag indicator on the right edge */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-16 bg-sidebar-primary/30 rounded-l" />
      </div>
    </>
  );
}
