"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Break down complex concepts",
    description:
      "Transform complex ideas into simple, digestible learning moments that stick.",
    image: "/modern-learning-interface.jpg",
  },
  {
    id: 2,
    title: "Learn at your own pace",
    description:
      "Progress through content smoothly with adaptive learning paths designed for you.",
    image: "/personalized-education-dashboard.jpg",
  },
  {
    id: 3,
    title: "Track your progress",
    description:
      "Visualize your journey with comprehensive analytics and milestone tracking.",
    image: "/analytics-progress-tracking.jpg",
  },
  {
    id: 4,
    title: "Achieve your goals",
    description:
      "Reach new heights with guided learning experiences that adapt to your success.",
    image: "/achievement-success-celebration.jpg",
  },
  {
    id: 5,
    title: "Join the community",
    description:
      "Connect with learners worldwide and share your learning journey together.",
    image: "/community-collaboration-learning.jpg",
  },
];

export function Carousel() {
  const [slideDirection, setSlideDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 8000; // 5 seconds per slide

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + (100 / SLIDE_DURATION) * 50; // Update every 50ms
      });
    }, 50);

    const slideTimeout = setTimeout(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setSlideDirection(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setSlideDirection(-1);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

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

  const step = (slide: Slide) => (
    <motion.div
      key={slide.id}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={slideDirection}
      className="flex flex-col gap-6 w-full items-center justify-center bg-neutral-50 rounded-2xl max-w-[977px] h-[550px] "
    ></motion.div>
  );

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative flex flex-col items-center justify-center">
        {/* Navigation Controls & Indicators */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Left Navigation Button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className="relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <motion.div
                  style={{ height: "8px" }}
                  animate={{
                    width: index === currentIndex ? "40px" : "8px",
                  }}
                  className="w-16 h-2 bg-muted rounded-full overflow-hidden relative"
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-foreground rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress / 100 }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Slide Content */}

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
                    {step(currentSlide)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
}
