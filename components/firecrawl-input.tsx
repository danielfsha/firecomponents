"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useAnimation,
} from "motion/react";
import { Input } from "./ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AnimatedButton from "./animated-button";
import { Button } from "./ui/button";

const scrapeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" fill="url(#pattern0_13_2871)" />
    <defs>
      <pattern
        id="pattern0_13_2871"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_13_2871" transform="scale(0.05)" />
      </pattern>
      <image
        id="image0_13_2871"
        width="20"
        height="20"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAk0lEQVR4AdTQwQ2CQBCG0cFGLMIutA+Lsg/pgiKoBHiH/74JzAGTF79NNs64j7r4c7Mf3N71JK+gGT271/uXp7lWTEKj0Wg0Ono39F5kmmb07F7vht4Dk9BoNBqNjt4Nt0+9yDTN6Nm93g2nfy2YhEaj0Wh09G54vNeXTNOMnt3r3fB4jx8modFoNBodvRtmypnvHQAA//9Akf7SAAAABklEQVQDACz3YCnLQu12AAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

const searchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g opacity="0.6">
      <rect width="20" height="20" fill="url(#pattern0_13_2877)" />
    </g>
    <defs>
      <pattern
        id="pattern0_13_2877"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_13_2877" transform="scale(0.05)" />
      </pattern>
      <image
        id="image0_13_2877"
        width="20"
        height="20"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAo0lEQVR4AdST0Q2DMAxEna7UMegcHapztGN0puD3cQgbJISEI4H0ZF8S4eMUHnbxc/MX9smeoFS8f4P0Xh37ye1nf5AT7z8gvVdrHZIPaHJ/WYdFTxYy9LMhY87VOiQfYBK0rzWgB/aAHrwPGbNW6zBn4jpmdpBpvcOcietw78gTcAJ5n7XaDJmwZpNh+rfXZ9WPdZgzcr25d3KmOtahpp6pMwAAAP//Ukhv1QAAAAZJREFUAwBsvEgpccR5wAAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

const mapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g opacity="0.6">
      <rect width="20" height="20" fill="url(#pattern0_13_2882)" />
    </g>
    <defs>
      <pattern
        id="pattern0_13_2882"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_13_2882" transform="scale(0.05)" />
      </pattern>
      <image
        id="image0_13_2882"
        width="20"
        height="20"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAkklEQVR4AdSQ0Q1AQBBE9zSiCF2gDkWpA10oQiXH+5hkP058sILkZWd2Ezu3lT38/eyHubMG7lwh9slpthW+m/C43wBKiIYzr76v4TccjxuO2oiGM6++r7EJc28Z/EavmYF6aJCnxiZMkyVgUwlmoBka5KmxCdngya3VoB4a5Ev13YRpsQ2UBA3ypfpuwlKCq94OAAD//7j+HUYAAAAGSURBVAMA7vk2KfF5HCMAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

const crawlIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g opacity="0.6">
      <rect width="20" height="20" fill="url(#pattern0_13_2885)" />
    </g>
    <defs>
      <pattern
        id="pattern0_13_2885"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_13_2885" transform="scale(0.05)" />
      </pattern>
      <image
        id="image0_13_2885"
        width="20"
        height="20"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAt0lEQVR4AdTSwQ3CMAyF4YQj6zAGsAZDsQYwButwDfkqPanqCQl8oNIv289V/Rpn1378/NkHx7ntsT0FGj7Ra3+539oL49QG4oiG1HqgIbpY69AE9HvrGMd2AQ1y6IG2pdahTSJT+6NdMV0dIEf63kVqsdahjcEkTFfLGU5XT6TWg3chD7UOM8Udw3S1nGH01HqIvo61Dm0M7hgymYbUeqAhuljr0MZg0hoa1pqcBnmodZgp38Q3AAAA//86ixRlAAAABklEQVQDAIv2ZilMZgF7AAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

const ACTIONS = [
  {
    name: "scrape",
    icon: scrapeIcon,
    tooltipContent:
      "Scrapes only a specified URL without crawling subpages. Outputs the content from the page.",
    isNew: false,
  },
  {
    name: "search",
    icon: searchIcon,
    tooltipContent: "Search the web and get full content from results.",
    isNew: true,
  },
  {
    name: "map",
    icon: mapIcon,
    tooltipContent: "Attempt to output all websites urls in a few seconds.",
    isNew: false,
  },
  {
    name: "crawl",
    icon: crawlIcon,
    tooltipContent:
      "Crawl a URL and all its accessible subpages, outputting the content from each page",
    isNew: false,
  },
];

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "rounded-[10px] h-[36px] px-4 font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 border border-orange-600 hover:from-orange-500/80 hover:to-orange-600/80 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default function FirecrawlInput() {
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Motion values for nav indicator
  const activeLeft = useMotionValue(0);
  const activeWidth = useMotionValue(0);
  const springConfig = { stiffness: 380, damping: 30 };
  const springActiveLeft = useSpring(activeLeft, springConfig);
  const springActiveWidth = useSpring(activeWidth, springConfig);

  useEffect(() => {
    if (activeIndex !== null && navItemsRef.current[activeIndex]) {
      const el = navItemsRef.current[activeIndex];
      activeLeft.set(el.offsetLeft);
      activeWidth.set(el.offsetWidth);
    }
  }, [activeIndex, activeLeft, activeWidth]);

  // Button width animation
  const buttonControls = useAnimation();
  useEffect(() => {
    if (value === "") {
      buttonControls.start({
        width: 48, // Only icon
        transition: { type: "spring", stiffness: 380, damping: 30 },
      });
    } else {
      buttonControls.start({
        width: "auto", // Text and icon
        transition: { type: "spring", stiffness: 380, damping: 30 },
      });
    }
  }, [value, buttonControls]);

  // ensure the button doesnt animate when user is typing use callback
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const variants = {
    initial: { opacity: 0, y: 10, filter: "blur(8px)", scale: 0.8 },
    animate: { opacity: 1, y: 0, filter: "blur(0)", scale: 1 },
    exit: { opacity: 0, y: -10, filter: "blur(8px)", scale: 0.8 },
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <motion.div className="flex flex-col items-center justify-center w-[552px] border border-gray-200 rounded-2xl shadow-[0px_0px_0px_6px_rgba(237,237,237,0.4)] backdrop-blur-sm">
        {/* first row */}
        <div className="w-full flex items-center justify-start p-4 border-b h-[56px]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.295 19.2534C15.3021 19.2534 18.5504 16.0051 18.5504 11.998C18.5504 7.99087 15.3021 4.74249 11.295 4.74249M11.295 19.2534C7.28787 19.2534 4.03949 16.0051 4.03949 11.998C4.03949 7.99087 7.28787 4.74249 11.295 4.74249M11.295 19.2534C9.45391 19.2534 7.96136 16.0051 7.96136 11.998C7.96136 7.99087 9.45391 4.74249 11.295 4.74249M11.295 19.2534C13.1361 19.2534 14.6285 16.0051 14.6285 11.998C14.6285 7.99087 13.1361 4.74249 11.295 4.74249M18.3544 11.998H4.23558"
              stroke="#262626"
              strokeOpacity="0.32"
              strokeWidth="1.17656"
              strokeLinecap="square"
            />
          </svg>
          <Input
            value={value}
            onChange={handleInput}
            placeholder="https://example.com"
            className={cn(
              "focus-visible:border-none focus-visible:ring-0",
              "outline-none border-none shadow-none focus:outline-none focus:ring-0 focus:border-none text-[#262626]",
              "tracking-tight"
            )}
            style={{ fontSize: "16px" }}
          />
        </div>

        {/* second row */}
        <div className="w-full p-2 flex items-center justify-between">
          {/* Actions nav */}

          <div className="relative flex items-center justify-center space-x-1 bg-black/[3.92%] rounded-[10px] p-[1px] pr-0 shadow-[inset_0_0.75px_0.75px_rgba(0,0,0,0.02),inset_0_0.25px_0.25px_rgba(0,0,0,0.02)]">
            {ACTIONS.map((action, idx) => (
              <Button
                key={action.name}
                className={cn(
                  `bg-transparent hover:bg-transparent relative p-2 h-[32px] flex items-center justify-start space-x-[6px] capitalize text-gray-500 ${
                    action.isNew ? "pr-1.5" : "pr-3"
                  } z-10 ${
                    activeIndex === idx ? "text-black" : ""
                  } cursor-pointer`,
                  activeIndex !== idx && "grayscale-100",
                  "focus:ring-orange-200 focus-visible:ring-orange-200 focus-visible:ring-[3px]"
                )}
                style={{ fontSize: "14px" }}
                onClick={() => setActiveIndex(idx)}
                ref={(el) => {
                  navItemsRef.current[idx] = el;
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <action.icon />
                      <p>{action.name}</p>

                      {action.isNew && (
                        <span className="bg-orange-200 text-orange-500 text-[12px] py-0.5 px-1 rounded-[4px]">
                          New
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>

                  <TooltipContent className="w-42">
                    {action.tooltipContent}
                  </TooltipContent>
                </Tooltip>
              </Button>
            ))}
            {/* Active nav indicator */}
            <motion.div
              className="absolute bottom-px h-[32px] bg-white shadow-[0_0.75px_0.75px_rgba(0,0,0,0.02),0_0.25px_0.25px_rgba(0,0,0,0.02)] rounded-[8px] border border-gray-200"
              style={{ left: springActiveLeft, width: springActiveWidth }}
            />
          </div>
          {/* Arrow icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 4.79163L16.875 9.99994M16.875 9.99994L11.6667 15.2083M16.875 9.99994H3.125"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Animated button */}
          <AnimatedButton>
            {value === "" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 4.79163L16.875 9.99994M16.875 9.99994L11.6667 15.2083M16.875 9.99994H3.125"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <p className="min-w-[130px]">Start scraping</p>
            )}
          </AnimatedButton>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
