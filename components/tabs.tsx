"use client";

import { motion, MotionConfig, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};
const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    title: "All",
    description: "All",
    image: "/modern-learning-interface.jpg",
  },
  {
    id: 2,
    title: "Components",
    description: "Components",
    image: "/modern-learning-interface.jpg",
  },
  {
    id: 3,
    title: "Pages",
    description: "Pages",
    image: "/modern-learning-interface.jpg",
  },
];

export default function Tabs() {
  const [currentStepId, setCurrentStepId] = useState(1);

  const setCurrentStep = (stepId: number) => setCurrentStepId(stepId);
  return (
    <div className="relative p-4 flex items-center justify-center z-20 min-w-[400px]">
      <div className="max-w-[360px] flex items-center justify-center bg-[#171717] rounded-xl">
        <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
          <div className="relative flex items-center justify-center w-full bg-[#171717] text-white p-1 rounded-xl">
            {NAV_ITEMS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setCurrentStep(tab.id)}
                className="flex-1 relative z-10 h-[40px] bg-transparent flex items-center justify-center"
              >
                {tab.title}

                {currentStepId === index + 1 && (
                  <motion.div
                    layoutId="tab-indicator"
                    initial={false}
                    className="absolute inset-0 rounded-lg bg-white/5 pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}
