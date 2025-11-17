"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export type NavItem = {
  id: number;
  title: string;
  link: string;
};

export const Tabs: React.FC<{
  NAV_ITEMS: NavItem[];
  setCurrentStep: (stepId: number) => void;
  currentStepId: number;
}> = ({ setCurrentStep, currentStepId, NAV_ITEMS }) => {
  const clickedLeft = useMotionValue(0);
  const clickedWidth = useMotionValue(0);
  const springConfig = { stiffness: 380, damping: 30 };
  const springClickedLeft = useSpring(clickedLeft, springConfig);
  const springClickedWidth = useSpring(clickedWidth, springConfig);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position and size when currentStepId changes
  useEffect(() => {
    const index = NAV_ITEMS.findIndex((s) => s.id === currentStepId);
    if (index !== -1 && navItemsRef.current[index]) {
      const el = navItemsRef.current[index];
      clickedLeft.set(el.offsetLeft);
      clickedWidth.set(el.offsetWidth);
    } else {
      // fallback to hide indicator
      clickedLeft.set(0);
      clickedWidth.set(0);
    }
  }, [currentStepId, clickedLeft, clickedWidth]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full bg-[#171717] text-white p-1 rounded-xl"
      )}
    >
      {NAV_ITEMS.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            navItemsRef.current[index] = el;
          }}
          onClick={() => setCurrentStep(tab.id)}
          className="flex-1 relative z-10 h-[40px] bg-transparent flex items-center justify-center"
        >
          <Link href={tab.link}>{tab.title}</Link>
        </button>
      ))}

      <motion.div
        layoutId="tab-indicator"
        initial={false}
        style={{
          left: springClickedLeft,
          width: springClickedWidth,
        }}
        className="absolute left-0 h-[40px] rounded-lg bg-white/5 pointer-events-none"
      />
    </div>
  );
};
