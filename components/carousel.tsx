"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function IndicatorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000; // 5 seconds per slide

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
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
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
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className="relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex ? (
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-foreground rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress / 100 }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <div className="w-2 h-2 bg-muted rounded-full hover:bg-muted-foreground/40 transition-colors" />
                )}
              </button>
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
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative"
            >
              {/* Image Section */}
              <div className="relative h-96 overflow-hidden bg-gradient-to-br from-accent/20 to-muted">
                <motion.img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              </div>

              {/* Text Content */}
              <div className="p-12 space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl font-bold text-foreground text-balance"
                >
                  {slides[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed"
                >
                  {slides[currentIndex].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}
