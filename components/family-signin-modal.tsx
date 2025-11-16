"use client";

import Image from "next/image";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useMeasure from "@/hooks/use-measure";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { Input } from "./ui/input";

// -- Social Providers (unique `id` ensures stable key) --
const SOCIALS = [
  { id: "google", name: "Google", icon: "google" },
  { id: "discord", name: "Discord", icon: "discord" },
  { id: "github", name: "Github", icon: "github" },
  { id: "apple", name: "Apple", icon: "apple" },
  { id: "farcaster", name: "Farcster", icon: "farcaster" },
];

// -- Generic Button Components --
export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "rounded-full h-[40px] px-4 font-medium text-white bg-blue-500 hover:bg-blue-600/80 flex items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "px-3 rounded-lg font-medium flex items-center justify-center w-fit select-none transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// -- Tabs Component --
export const Tabs: React.FC<{
  setCurrentStep: (step: number) => void;
  currentStep: number;
}> = ({ setCurrentStep, currentStep }) => {
  const steps = ["email", "phone", "passkey"];
  return (
    <div className="relative flex items-center justify-center gap-1 w-full bg-[#171717] p-1 rounded-xl">
      {steps.map((tab, idx) => (
        <SecondaryButton
          key={tab}
          isActive={currentStep === idx}
          className="flex-1 relative z-10 hover:bg-transparent h-[40px]"
          onClick={() => setCurrentStep(idx)}
        >
          {tab}
        </SecondaryButton>
      ))}
      <motion.div
        animate={{ x: `${100 * currentStep}%` }}
        className="absolute left-0 h-[40px] w-[33%] rounded-lg bg-white/5 pointer-events-none"
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      />
    </div>
  );
};

const StepOne = () => {
  const [value, setValue] = useState("");

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <motion.form
      layoutId="form"
      className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
    >
      <Input
        value={value}
        onChange={handleInput}
        placeholder="email@acme.com"
        className={cn(
          "focus-visible:border-none focus-visible:ring-0",
          "outline-none border-none shadow-none focus:outline-none focus:ring-0 focus:border-none text-[#262626]",
          "font-xl text-white  font-bold"
        )}
        style={{ fontSize: "16px" }}
      />
      <PrimaryButton
        type="submit"
        className={cn(
          "rounded-[12px]",
          value === "" ? "bg-[#FFFFFF]/5" : "cursor-not-allowed"
        )}
      >
        <ArrowRight className="text-white" />
      </PrimaryButton>
    </motion.form>
  );
};

const StepTwo = () => {
  const [value, setValue] = useState("");

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <motion.form
      layoutId="form"
      className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
    >
      <Input
        value={value}
        onChange={handleInput}
        placeholder="+1 (555) 555-5555"
        className={cn(
          "focus-visible:border-none focus-visible:ring-0",
          "outline-none border-none shadow-none focus:outline-none focus:ring-0 focus:border-none text-[#262626]",
          "font-xl text-white font-bold"
        )}
        style={{ fontSize: "16px" }}
      />
      <PrimaryButton
        type="submit"
        className={cn(
          "rounded-[12px]",
          value === "" ? "bg-[#FFFFFF]/5" : "cursor-not-allowed"
        )}
      >
        <ArrowRight className="text-white" />
      </PrimaryButton>
    </motion.form>
  );
};

const StepThree = () => {
  return (
    <motion.form
      layoutId="form"
      className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
    >
      <div className="flex items-center gap-2 px-2">
        <Image
          src="/icons/finger-print.svg"
          alt="passkey"
          width={24}
          height={24}
        />
        <p
          className={cn(
            "focus-visible:border-none focus-visible:ring-0",
            "outline-none border-none shadow-none focus:outline-none focus:ring-0 focus:border-none text-[#262626]",
            "font-xl text-[#6E6E6E]"
          )}
          style={{ fontSize: "18px" }}
        >
          Login with passkey
        </p>
      </div>
      <PrimaryButton type="submit" className="rounded-[12px]">
        <ArrowRight className="text-white" />
      </PrimaryButton>
    </motion.form>
  );
};

const Socials = () => {
  return (
    <div className="flex gap-1">
      {SOCIALS.map((social) => (
        <motion.div
          layout
          className="border-primary/10 overflow-hidden rounded-xl border bg-[#171717] p-3 flex-1 flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <Image
              src={`/icons/${social.icon}.svg`}
              alt={social.name}
              width={24}
              height={24}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const DefaultHeader = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <div className="w-full flex items-center justify-between p-2">
      <h2 className="text-lg font-semibold pl-3">Sign in</h2>
      <SecondaryButton
        onClick={() => setOpen(false)}
        className="w-[32px] h-[32px] rounded-full p-0 bg-[#171717]"
      >
        <XIcon className="size-5" />
      </SecondaryButton>
    </div>
  );
};

const PageHeader = ({
  onBack,
  title,
  setOpen,
}: {
  title: string;
  setOpen: (open: boolean) => void;
  onBack?: () => void;
}) => {
  return (
    <div className="w-full flex items-center justify-between p-2">
      {/* go back */}
      <SecondaryButton onClick={onBack} className="bg-[#171717]">
        <ArrowLeft />
      </SecondaryButton>
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold"></h2>
      {/* close */}
      <SecondaryButton
        onClick={() => setOpen(false)}
        className="w-[32px] h-[32px] rounded-full p-0 bg-[#171717]"
      >
        <XIcon />
      </SecondaryButton>
    </div>
  );
};

const PasskeyComponent = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-[22px] p-0.5">
      <motion.div
        className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] bg-[conic-gradient(from_0deg,transparent_0%,#4DAFFE_10%,#4DAFFE_25%,transparent_35%)]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      />
      <div className="bg-preview-bg z-1 flex items-center justify-center rounded-[20px] p-1">
        <div className="flex items-center justify-center rounded-2xl bg-gray-300 p-1">
          <div className="flex size-16 items-center justify-center rounded-xl bg-gray-100">
            <Image
              src="/icons/finger-print.svg"
              alt="passkey"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// -- Main Modal Component --
export const FamilySignInModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [clickDirection, setClickDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null!);
  const { height } = useMeasure({ ref });

  const handleTabSwitch = (nextStep: number) => {
    setClickDirection(nextStep > currentStep ? 1 : -1);
    setCurrentStep(nextStep);
  };

  const variants = {
    initial: (custom: number) => ({
      // x: `${100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      // x: 0,
      filter: "blur(0)",
      opacity: 1,
      scale: 1,
    },
    exit: (custom: number) => ({
      // x: `${-100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
      scale: 0.9,
    }),
  };

  const steps = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
    }
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <motion.div
        animate={{ height }}
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[28px] bg-[#111111] text-[#EEEEEE] will-change-transform z-100",
          "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10),0px_12px_24px_-6px_rgba(51,51,51,0.03),0px_8px_16px_-4px_rgba(51,51,51,0.03),0px_4px_8px_-2px_rgba(51,51,51,0.03),0px_2px_4px_-0.5px_rgba(51,51,51,0.03)]"
        )}
      >
        <div ref={ref} className="h-fit w-full">
          <div className="p-1">
            <motion.div layout className="space-y-3">
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={clickDirection}
              >
                <DefaultHeader setOpen={setOpen} />
                <Socials />
                <div className="px-2">
                  <Tabs
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                  />
                </div>
                <motion.div
                  key={currentStep}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={clickDirection}
                  className="flex flex-col gap-6 p-2"
                >
                  {steps()}
                </motion.div>
              </AnimatePresence>
              {/* divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-[#222222]" />
                <p className="text-neutral-400">OR</p>
                <div className="flex-1 h-px bg-[#222222]" />
              </div>

              {/* connect button */}
              <div className="w-full p-2">
                <PrimaryButton className="w-full py-3">
                  Connect button
                </PrimaryButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export const FamilyModalUsage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <FamilySignInModal open={open} setOpen={setOpen} />}
      <PrimaryButton onClick={() => setOpen(true)}>Sign in</PrimaryButton>
    </>
  );
};

export default FamilySignInModal;
