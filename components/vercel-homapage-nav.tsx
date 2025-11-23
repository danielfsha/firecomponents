"use client";

import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { useState, useRef, useMemo } from "react";
import useMeasure from "@/hooks/use-measure";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Box,
  Zap,
  Bot,
  Rocket,
  Globe,
  BarChart3,
  Shield,
  Lock,
  ShieldCheck,
  Users,
  PenTool,
  FileText,
  Newspaper,
  Calendar,
  Triangle,
  Layers,
  Flame,
  GraduationCap,
  Store,
  FileCode,
  BookOpen,
  Handshake,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  Building2,
  Monitor,
  Settings,
  Palette,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const ProductsPage = () => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          AI Cloud
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Box className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                AI SDK
              </span>
              <span className="text-xs text-neutral-500">
                The AI Toolkit for TypeScript
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Zap className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                AI Gateway
              </span>
              <span className="text-xs text-neutral-500">
                One endpoint, all your models
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Bot className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Vercel Agent
              </span>
              <span className="text-xs text-neutral-500">
                An agent that knows your stack
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Core Platform
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Rocket className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                CI/CD
              </span>
              <span className="text-xs text-neutral-500">
                Helping teams ship 6× faster
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Globe className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Content Delivery
              </span>
              <span className="text-xs text-neutral-500">
                Fast, scalable, and reliable
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Sparkles className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Fluid Compute
              </span>
              <span className="text-xs text-neutral-500">
                Servers, in serverless form
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <BarChart3 className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Observability
              </span>
              <span className="text-xs text-neutral-500">Trace every step</span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Security
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Shield className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Bot Management
              </span>
              <span className="text-xs text-neutral-500">
                Scalable bot protection
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Lock className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                BotID
              </span>
              <span className="text-xs text-neutral-500">
                Invisible CAPTCHA
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <ShieldCheck className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Platform Security
              </span>
              <span className="text-xs text-neutral-500">
                DDoS Protection, Firewall
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Shield className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Web Application Firewall
              </span>
              <span className="text-xs text-neutral-500">
                Granular, custom protection
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Company
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Users className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Customers
              </span>
              <span className="text-xs text-neutral-500">
                Trusted by the best teams
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <PenTool className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">Blog</span>
              <span className="text-xs text-neutral-500">
                The latest posts and changes
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <FileText className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Changelog
              </span>
              <span className="text-xs text-neutral-500">See what shipped</span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Newspaper className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Press
              </span>
              <span className="text-xs text-neutral-500">
                Read the latest news
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Calendar className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Events
              </span>
              <span className="text-xs text-neutral-500">
                Join us at an event
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Open Source
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Image src="/nextjs.svg" alt="Next.js" width={18} height={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Next.js
              </span>
              <span className="text-xs text-neutral-500">
                The native Next.js platform
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Image src="/nuxt.svg" alt="Nuxt" width={18} height={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">Nuxt</span>
              <span className="text-xs text-neutral-500">
                The progressive web framework
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Image src="/svelte.svg" alt="Svelte" width={18} height={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Svelte
              </span>
              <span className="text-xs text-neutral-500">
                The web's efficient UI framework
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Image
                src="/turborepo.svg"
                alt="Turborepo"
                width={18}
                height={18}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Turborepo
              </span>
              <span className="text-xs text-neutral-500">
                Speed with Enterprise scale
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Tools
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <GraduationCap className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Academy
              </span>
              <span className="text-xs text-neutral-500">
                Learn the ins and outs of Vercel
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Store className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Marketplace
              </span>
              <span className="text-xs text-neutral-500">
                Extend and automate workflows
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <FileCode className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Templates
              </span>
              <span className="text-xs text-neutral-500">
                Jumpstart app development
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <BookOpen className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Guides
              </span>
              <span className="text-xs text-neutral-500">
                Find help quickly
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Handshake className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Partner Finder
              </span>
              <span className="text-xs text-neutral-500">
                Get help from solution partners
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

const SolutionsPage = () => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Use Cases
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Bot className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                AI Apps
              </span>
              <span className="text-xs text-neutral-500">
                Deploy at the speed of AI
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <ShoppingCart className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Composable Commerce
              </span>
              <span className="text-xs text-neutral-500">
                Power storefronts that convert
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <TrendingUp className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Marketing Sites
              </span>
              <span className="text-xs text-neutral-500">
                Launch campaigns fast
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Building2 className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Multi-tenant Platforms
              </span>
              <span className="text-xs text-neutral-500">
                Scale apps with one codebase
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Monitor className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Web Apps
              </span>
              <span className="text-xs text-neutral-500">
                Ship features, not infrastructure
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[240px]">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Users
        </h3>
        <div className="flex flex-col gap-3">
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Settings className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Platform Engineers
              </span>
              <span className="text-xs text-neutral-500">
                Automate away repetition
              </span>
            </div>
          </a>
          <a href="#" className="flex items-start gap-3 group h-10">
            <div className="flex size-8 items-center justify-center rounded-sm border border-neutral-300 group-hover:bg-black transition-colors">
              <Palette className="h-4 w-4 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900">
                Design Engineers
              </span>
              <span className="text-xs text-neutral-500">
                Deploy for every idea
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function VercelHomepageNav() {
  const [hoverDirection, setHoverDirection] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const contentRef = useRef(null!);
  const navRef = useRef<HTMLElement>(null!);
  const { height, width } = useMeasure({ ref: contentRef });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const previousIndexRef = useRef<number>(0);

  const steps = useMemo(() => {
    switch (hoveredIndex) {
      case 0:
        return <ProductsPage />;
      case 1:
        return <ResourcesPage />;
      case 2:
        return <SolutionsPage />;
    }
  }, [hoveredIndex]);

  const variants = {
    initial: (custom: number) => ({
      x: `${100 * custom}%`,
      // filter: "blur(2.5px)",
      opacity: 0,
    }),
    animate: () => ({
      x: 0,
      // filter: "blur(0)",
      opacity: 1,
    }),
    exit: (custom: number) => ({
      x: `${-100 * custom}%`,
      // filter: "blur(2.5px)",
      opacity: 0,
    }),
  };

  return (
    <nav ref={navRef} className="relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="flex h-10 w-10 items-center justify-center">
            <svg viewBox="0 0 76 65" fill="black" className="h-4 w-4">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>

          <div className="flex items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center">
                {["Products", "Resources", "Solutions"].map((item, index) => (
                  <button
                    key={item}
                    onMouseEnter={() => {
                      setActiveDropdown(item);
                      const previousIndex = previousIndexRef.current;
                      if (index < previousIndex) {
                        setHoverDirection(-1);
                      } else if (index > previousIndex) {
                        setHoverDirection(1);
                      }
                      setHoveredIndex(index);
                      previousIndexRef.current = index;
                    }}
                    className={cn(
                      "rounded-full px-2 py-1 text-sm font-medium transition-colors flex items-center gap-1 group",
                      activeDropdown === item
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700 hover:text-neutral-900"
                    )}
                  >
                    {item}
                    <ChevronDown className="scale-55 group-hover:rotate-180 transition-transform" />
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    layoutId="container"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <MotionConfig
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    >
                      <motion.div
                        animate={{
                          height: height || "auto",
                          width: width || "auto",
                        }}
                        className={cn(
                          "relative flex flex-col rounded-2xl will-change-transform overflow-hidden"
                        )}
                      >
                        <div ref={contentRef} className="h-fit">
                          <div className="p-1">
                            <motion.div
                              layout
                              className="border-primary/10 mb-4 overflow-hidden rounded-xl border bg-white p-6"
                            >
                              <AnimatePresence
                                mode="popLayout"
                                initial={false}
                                custom={hoverDirection}
                              >
                                <motion.div
                                  key={hoveredIndex}
                                  variants={variants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  custom={hoverDirection}
                                  className="flex flex-col gap-6"
                                >
                                  {steps}
                                </motion.div>
                              </AnimatePresence>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </MotionConfig>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            >
              Enterprise
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            >
              Docs
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            >
              Pricing
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Contact</Button>
          <Button variant="outline">Dashboard</Button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
        </div>
      </div>
    </nav>
  );
}
