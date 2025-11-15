"use client";

import { MotionConfig, motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

import { XIcon, SmileIcon, PaperclipIcon } from "lucide-react";
const ACTIONS = [
  {
    name: "add-emoji",
    icon: "emoji",
    iconComponent: <SmileIcon />,
  },
  {
    name: "add-file",
    icon: "file",
    iconComponent: <PaperclipIcon />,
  },
];

export default function AIInput() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <motion.div layout className="rounded-xl flex items-center h-12">
        {/* actions */}
        {isFocused && (
          <motion.div className="flex items-center justify-between space-x-0">
            {ACTIONS.map((action, index) => (
              <motion.div
                variants={{
                  initial: {
                    opacity: 0,
                    y: 10,
                    filter: "blur(2px)",
                    scale: 0.8,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0)",
                    scale: 1,
                  },
                  exit: {
                    opacity: 0,
                    y: -10,
                    filter: "blur(2px)",
                    scale: 0.8,
                  },
                }}
                exit="exit"
                initial="initial"
                animate="animate"
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.2,
                  delay: 0.1 * index,
                }}
                layout
                key={action.name}
                className="p-1"
              >
                <Button variant="ghost" size="icon">
                  {action.iconComponent}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div layout className="flex items-center justify-between gap-2">
          <Input
            className="py-2"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type="email"
            placeholder="Email"
          />
          <Button className="h-full">Send</Button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
