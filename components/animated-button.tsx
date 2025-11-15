"use client";

import { useRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { MotionConfig, motion } from "motion/react";
import useMeasure from "@/hooks/use-measure";

type AnimatedButtonProps = ComponentProps<typeof motion.button>;

export default function AnimatedButton({
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useMeasure({ ref });
  const targetWidth = Math.max(width ?? 0, 50);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <motion.button
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-[10px] h-[36px] font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 border border-orange-600 hover:from-orange-500/80 hover:to-orange-600/80 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 tracking-tight overflow-hidden",
          className
        )}
        animate={{
          width: targetWidth,
        }}
        {...props}
      >
        <motion.div
          ref={ref}
          className="flex items-center justify-center px-4 text-center"
          initial={{
            opacity: 0,
            y: 10,
            filter: "blur(8px)",
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0)",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            filter: "blur(8px)",
            scale: 0.8,
          }}
        >
          {children}
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
}
