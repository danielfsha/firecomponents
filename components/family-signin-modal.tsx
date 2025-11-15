"use client";

import Image from "next/image";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import useMeasure from "@/hooks/use-measure";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

// -- Social Providers (unique `id` ensures stable key) --
const SOCIALS = [
  { id: "google", name: "Google", icon: "google" },
  { id: "discord", name: "Discord", icon: "discord" },
  { id: "github", name: "Github", icon: "github" },
  { id: "apple", name: "Apple", icon: "apple" },
  { id: "farcster", name: "Farcster", icon: "farcster" },
];

const SCREENS = [
  {
    title: "Connect wallet",
    description: "Connect your wallet to sign in.",
    skeletons: [2 / 3, 1 / 2, 1 / 4],
  },
  {
    title: "email confirmation",
    description: "Enter the confirmation code sent to your email.",
    skeletons: [2 / 3, 1 / 2, 1 / 4],
  },
  {
    title: "passkey creation",
    description: "Create a passkey for secure sign in.",
    skeletons: [2 / 3, 1 / 2, 1 / 4],
  },
  {
    title: "Email",
    description: "Enter your email to proceed.",
    skeletons: [2 / 3, 1 / 2, 1 / 4],
  },
  {
    title: "Phone",
    description: "Enter your phone number to continue.",
    skeletons: [2 / 3, 3 / 5],
  },
  {
    title: "Passkey",
    description: "Set up your passkey for secure sign in.",
    skeletons: [2 / 3, 1 / 2, 3 / 4],
  },
];

// -- Generic Button Components --
export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "rounded-full h-[40px] px-4 font-medium text-white bg-gradient-to-b from-indigo-500 to-indigo-600 border border-indigo-600 hover:from-indigo-500/80 hover:to-indigo-600/80 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
> = ({ children, className, isActive, ...props }) => (
  <button
    type="button"
    className={cn(
      "h-[40px] px-3 rounded-lg font-medium flex items-center justify-center w-fit select-none transition-colors",
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-gray-500 hover:bg-neutral-200",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// -- Steps (customize as needed) --
const stepsContent = [
  {
    title: "Email",
    description: "Enter your email to proceed.",
    skeletons: [2 / 3, 1 / 2, 1 / 4],
  },
  {
    title: "Phone",
    description: "Enter your phone number to continue.",
    skeletons: [2 / 3, 3 / 5],
  },
  {
    title: "Passkey",
    description: "Set up your passkey for secure sign in.",
    skeletons: [2 / 3, 1 / 2, 3 / 4],
  },
];

const Step: React.FC<{ step: number }> = ({ step }) => {
  const { title, description, skeletons } = stepsContent[step];
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-gray-500">{description}</p>
      <div className="flex flex-col gap-2">
        {skeletons.map((width, i) => (
          <div
            key={i}
            style={{ width: `${width * 100}%` }}
            className="h-5 rounded-md bg-neutral-100"
          />
        ))}
      </div>
    </div>
  );
};

// -- Tabs Component --
export const Tabs: React.FC<{
  setCurrentStep: (step: number) => void;
  currentStep: number;
}> = ({ setCurrentStep, currentStep }) => {
  const steps = ["email", "phone", "passkey"];
  return (
    <div className="relative flex items-center justify-center gap-1 w-full">
      {steps.map((tab, idx) => (
        <SecondaryButton
          key={tab}
          isActive={currentStep === idx}
          className="flex-1 relative z-10 hover:bg-transparent"
          onClick={() => setCurrentStep(idx)}
        >
          {tab}
        </SecondaryButton>
      ))}
      <motion.div
        animate={{ x: `${100 * currentStep}%` }}
        className="absolute left-0 h-[40px] w-[33%] rounded-lg bg-indigo-100 pointer-events-none"
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      />
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
      x: `${100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
    }),
    animate: { x: 0, filter: "blur(0)", opacity: 1 },
    exit: (custom: number) => ({
      x: `${-100 * custom}%`,
      filter: "blur(2.5px)",
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-neutral-900/40"
      />
      <div className="relative z-10 flex h-[400px] items-center">
        <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
          <motion.div
            animate={{ height }}
            className={cn(
              "relative w-[360px] flex flex-col overflow-hidden rounded-3xl bg-neutral-50 shadow-xl"
            )}
          >
            <div ref={ref} className="h-fit w-full">
              <div className="p-1">
                <motion.div
                  layout
                  className="border border-primary/10 mb-4 overflow-hidden rounded-xl bg-white p-1 space-y-5"
                >
                  <div className="flex items-center justify-between pl-3 pb-2">
                    <h1 className="text-lg font-semibold">Sign In</h1>
                    <SecondaryButton
                      aria-label="Close sign in modal"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon />
                    </SecondaryButton>
                  </div>
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={clickDirection}
                  >
                    <motion.div
                      layout
                      className="flex items-center justify-between gap-1 w-full"
                    >
                      {SOCIALS.map((social) => (
                        <SecondaryButton key={social.id} className="flex-1">
                          <Image
                            src={`/icons/${social.icon}.svg`}
                            alt={social.name}
                            width={24}
                            height={24}
                          />
                        </SecondaryButton>
                      ))}
                    </motion.div>
                    <Tabs
                      currentStep={currentStep}
                      setCurrentStep={handleTabSwitch}
                    />
                    <motion.div
                      key={currentStep}
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={clickDirection}
                      className="flex flex-col gap-6 p-3"
                    >
                      <Step step={currentStep} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <div className="p-2">
                  <PrimaryButton
                    className="w-full"
                    aria-label="Connect wallet"
                    onClick={() => setOpen(false)}
                  >
                    Connect wallet
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
};

export default FamilySignInModal;
