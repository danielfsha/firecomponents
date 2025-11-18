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
    title: "Home",
    description: "Home",
    image: "/modern-learning-interface.jpg",
  },
  {
    id: 2,
    title: "About",
    description: "About",
    image: "/modern-learning-interface.jpg",
  },
  {
    id: 3,
    title: "Contact",
    description: "Contact",
    image: "/modern-learning-interface.jpg",
  },
];

export const Tabs: React.FC<{
  setCurrentStep: (stepId: number) => void;
  currentStepId: number;
}> = ({ setCurrentStep, currentStepId }) => {
  return (
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
  );
};

export default function Nav() {
  const [currentStepId, setCurrentStepId] = useState(1);
  return (
    <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-center z-20">
      <nav className="w-full max-w-[360px] flex items-center justify-center pr-1 bg-[#171717] rounded-xl">
        <Tabs
          setCurrentStep={(id) => setCurrentStepId(id)}
          currentStepId={currentStepId}
        />
      </nav>
    </div>
  );
}
