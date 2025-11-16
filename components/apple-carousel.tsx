"use client";

import { ArrowDown, ArrowUp, PlusCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useMemo, useRef, useState } from "react";
import useMeasure from "@/hooks/use-measure";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "colors",
    description:
      "colors. Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange",
  },
  {
    title: "aluminum unibody",
    description:
      "aluminum unibody. Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
  },
  {
    title: "vapor chamber",
    description:
      "vapor chamber. Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
  },
  {
    title: "Ceramic Shield",
    description:
      "ceramic shield. Protects the back of iPhone 17 Pro, making it 4x more resistant to cracks.4 New Ceramic Shield 2 on the front has 3x better scratch resistance. ",
  },
  {
    title: "immersive pro display",
    description:
      "immersive pro display. Our best‑ever 6.3‑inch and 6.9‑inch Super Retina XDR displays.6 Brighter. Better anti‑reflection. ProMotion up to 120Hz.",
  },
  {
    title: "Camera Control",
    description:
      "camera control. Instantly take a photo, record video, adjust settings, and more. So you never miss a moment.",
  },
  {
    title: "Action button",
    description:
      "Action button. A customizable fast track to your favorite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts, and more.",
  },
];

const Slide = ({
  idx,
  slide,
  setCurrentSlide,
  currentSlide,
}: {
  idx: number;
  slide: any;
  setCurrentSlide: any;
  currentSlide: any;
}) => {
  const isActive = idx === currentSlide;

  const ref = useRef(null);
  const { height } = useMeasure({ ref });

  const variants = {
    initial: (custom: number) => ({
      x: `${100 * custom}%`,
      filter: "blur(4px)",
      opacity: 0,
    }),
    animate: () => ({
      x: 0,
      filter: "blur(0)",
      opacity: 1,
    }),
    exit: (custom: number) => ({
      x: `${-100 * custom}%`,
      filter: "blur(4px)",
      opacity: 0,
    }),
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <motion.div
        onClick={() => setCurrentSlide(idx)}
        animate={{ height }}
        className={cn("bg-white/10 max-w-[460px] rounded-4xl")}
      >
        <div ref={ref} className="h-fit w-full">
          <motion.div
            layout
            className="border-primary/10 overflow-hidden rounded-xl border p-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentSlide}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {isActive ? (
                  <motion.div className="p-4">
                    <motion.p
                      className="text-secondary text-lg"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                      transition={{
                        delay: 0.05,
                      }}
                    >
                      {slide.description}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div className="flex space-x-2 pr-3">
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                    >
                      <PlusCircle />
                    </motion.div>

                    <motion.h2
                      className="text-xl font-semibold"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                    >
                      {slide.title}
                    </motion.h2>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default function AppleCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  const handleChange = useCallback((direction: number) => {
    setCurrentSlide((prev) => {
      if (prev === null) return direction > 0 ? 0 : SLIDES.length - 1;
      let newIndex = prev + direction;
      if (newIndex < 0) return 0;
      if (newIndex >= SLIDES.length) return SLIDES.length - 1;
      return newIndex;
    });
  }, []);

  return (
    <div className="relative bg-black text-white w-4xl h-[700px] rounded-2xl flex items-center justify-between flex-col lg:flex-row space-x-4">
      {/* x button */}
      <Button
        onClick={() => setCurrentSlide(null)}
        className="absolute size-12 rounded-full top-2 right-2"
        aria-label="Close"
      >
        <X />
      </Button>

      <div className="flex flex-col items-center justify-center space-y-2 h-full px-2">
        <Button
          disabled={currentSlide === 0}
          className={`size-12 rounded-full ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() => handleChange(-1)}
          aria-label="Previous Slide"
        >
          <ArrowUp />
        </Button>
        <Button
          disabled={currentSlide === SLIDES.length - 1}
          className={`size-12 rounded-full ${
            currentSlide === SLIDES.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() => handleChange(1)}
          aria-label="Next Slide"
        >
          <ArrowDown />
        </Button>
      </div>

      <div className="flex flex-col items-start justify-center space-y-1 w-[300px] h-full p-2 flex-1 overflow-y-auto">
        {SLIDES.map((slide, idx) => (
          <Slide
            key={slide.title}
            slide={slide}
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}
