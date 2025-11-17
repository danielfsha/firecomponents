"use client";

import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

export default function IOS26Switch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <motion.div
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative w-[68px] h-[30px] flex-col overflow-hidden rounded-2xl  will-change-transform",
          checked ? "bg-[#00CA48]" : "bg-[#E9E9EA]"
        )}
      >
        <motion.div
          initial={{
            width: "38px",
          }}
          animate={{
            width: "38px",
            x: checked ? "25px" : "0px",
          }}
          className={cn(
            "absolute top-[2.5px] bottom-[3.5px] left-[2.5px] flex flex-col gap-6 w-[38px] rounded-full bg-[#FFF]"
          )}
        />

        <input
          className="hidden"
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
      </motion.div>
    </MotionConfig>
  );
}
