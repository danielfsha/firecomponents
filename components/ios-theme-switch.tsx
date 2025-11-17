"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

const ThemeIcon = ({ isDark }: { isDark: boolean }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    initial={false}
    animate={{ rotate: isDark ? 180 : 0 }}
    className="size-9 translate-x-0 translate-y-0"
  >
    <motion.path
      d="M50 18C58.4869 18 66.6262 21.3714 72.6274 27.3726C78.6286 33.3737 82 41.513 82 50C82 58.4869 78.6286 66.6262 72.6275 72.6274C66.6263 78.6286 58.487 82 50.0001 82L50 50L50 18Z"
      initial={false}
      animate={{
        fill: isDark ? "var(--color-gray-100)" : "var(--color-gray-1200)",
      }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      initial={false}
      animate={{
        stroke: isDark ? "var(--color-gray-100)" : "var(--color-gray-1200)",
      }}
      strokeWidth="4"
    />
    <motion.circle
      cx="50"
      cy="50"
      r="12"
      initial={false}
      animate={{
        fill: isDark ? "var(--color-gray-100)" : "var(--color-gray-1200)",
      }}
    />
    <motion.path
      d="M50 62C53.1826 62 56.2348 60.7357 58.4853 58.4853C60.7357 56.2348 62 53.1826 62 50C62 46.8174 60.7357 43.7652 58.4853 41.5147C56.2348 39.2643 53.1826 38 50 38L50 50L50 62Z"
      initial={false}
      animate={{
        fill: isDark ? "var(--color-gray-1200)" : "var(--color-gray-300)",
      }}
    />
  </motion.svg>
);

const IOSThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsDark(!isDark);
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // match transition duration
  };

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.7, bounce: 0 }}>
      <button
        onClick={handleClick}
        aria-label="Toggle theme"
        className={cn(
          "flex items-center gap-2 overflow-hidden rounded-full p-1 pr-5",
          isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
        )}
      >
        <motion.div layout>
          <ThemeIcon isDark={isDark} />
        </motion.div>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            style={{
              display: "inline-block",
            }}
          >
            {isDark ? "Dark" : "Light"}
          </motion.span>
          <motion.span layout>Mode</motion.span>
        </AnimatePresence>
      </button>
    </MotionConfig>
  );
};

export default IOSThemeSwitch;
