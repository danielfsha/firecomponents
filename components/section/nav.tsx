"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { HamburgerIcon, MenuIcon, XIcon } from "lucide-react";

const renderStep = (
  step: number,
  slideDirection: number,
  currentIndex: number
) => {
  const variants = {
    initial: (custom: number) => ({
      x: `${100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
    }),
    animate: () => ({
      x: 0,
      filter: "blur(0)",
      opacity: 1,
    }),
    exit: (custom: number) => ({
      x: `${-100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
    }),
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <motion.div
        className={cn(
          "relative flex w-full flex-col rounded-2xl will-change-transform p-1",
          "rounded-2xl"
        )}
      >
        <div className="h-fit w-full">
          <div className="p-1 w-full h-[550px] rounded-2xl">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={slideDirection}
            >
              <motion.div
                key={currentIndex}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={slideDirection}
                className="flex flex-col gap-6"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={slideDirection}
                    className="flex flex-col gap-6"
                  >
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <img src={item.image} alt={item.title} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

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
    <div className="relative flex items-center justify-center w-full bg-[#171717] text-white p-1 rounded-xl">
      {NAV_ITEMS.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            navItemsRef.current[index] = el;
          }}
          onClick={() => setCurrentStep(tab.id)}
          className="flex-1 relative z-10 h-[40px] bg-transparent flex items-center justify-center"
        >
          {tab.title}
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

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentStepId, setCurrentStepId] = useState(1);
  return (
    <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-center z-20">
      <nav className="w-full max-w-[360px] flex items-center justify-center pr-1 bg-[#171717] rounded-xl">
        <Tabs
          setCurrentStep={(id) => setCurrentStepId(id)}
          currentStepId={currentStepId}
        />
        <Button
          className="bg-transparent hover:bg-transparent"
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <MenuIcon className="text-white" />
          ) : (
            <XIcon className="text-white" />
          )}
        </Button>
      </nav>
    </div>
  );
}
