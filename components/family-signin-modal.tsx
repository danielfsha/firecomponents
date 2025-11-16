"use client";

import Image from "next/image";
import {
  motion,
  MotionConfig,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useMeasure from "@/hooks/use-measure";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  PlusIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { button } from "motion/react-client";
import { OTPInput, SlotProps } from "input-otp";
import { toast } from "sonner";

// TYPES
type StepId =
  | "email"
  | "email-confirm"
  | "phone"
  | "phone-confirm"
  | "passkey"
  | "passkey-confirm"
  | "wallet-select"
  | "wallet-confirm";

type Wallet = {
  id: string;
  name: string;
  icon: string;
};

interface Step {
  id: StepId;
  label: string;
  main: boolean;
}

// Social Providers
const SOCIALS: { id: string; name: string; icon: string }[] = [
  { id: "google", name: "Google", icon: "google" },
  { id: "discord", name: "Discord", icon: "discord" },
  { id: "github", name: "Github", icon: "github" },
  { id: "apple", name: "Apple", icon: "apple" },
  { id: "farcaster", name: "Farcaster", icon: "farcaster" },
];

// Only the main auth tabs
const STEPS: Step[] = [
  { id: "email", label: "Email", main: true },
  { id: "email-confirm", label: "Confirm Email", main: false },
  { id: "phone", label: "Phone", main: true },
  { id: "phone-confirm", label: "Confirm Phone", main: false },
  { id: "passkey", label: "Passkey", main: true },
  { id: "passkey-confirm", label: "Confirm Passkey", main: false },
  { id: "wallet-select", label: "Select Wallet", main: false },
  { id: "wallet-confirm", label: "Wallet Connected", main: false },
];

const WALLETS: Wallet[] = [
  { id: "metamask", name: "MetaMask", icon: "metamask" },
  { id: "coinbase-wallet", name: "Coinbase Wallet", icon: "coinbase-wallet" },
  { id: "phantom", name: "Phantom", icon: "phantom" },
  { id: "rainbow-wallet", name: "Rainbow Wallet", icon: "rainbow-wallet" },
  { id: "other-wallets", name: "Other Wallets", icon: "other-wallets" },
];

const MAIN_STEPS = STEPS.filter((s) => s.main);

// Button components
export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "rounded-full min-h-[40px] px-4 font-medium text-white bg-blue-500 hover:bg-blue-600/80 flex items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-50",
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
      "px-3 rounded-lg font-medium flex items-center justify-center w-fit select-none transition-colors",
      isActive ? "bg-white/10" : "",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// Tabs — only for main steps, no header duplication
export const Tabs: React.FC<{
  setCurrentStep: (stepId: StepId) => void;
  currentStepId: StepId;
}> = ({ setCurrentStep, currentStepId }) => {
  const clickedLeft = useMotionValue(0);
  const clickedWidth = useMotionValue(0);
  const springConfig = { stiffness: 380, damping: 30 };
  const springClickedLeft = useSpring(clickedLeft, springConfig);
  const springClickedWidth = useSpring(clickedWidth, springConfig);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position and size when currentStepId changes
  useEffect(() => {
    const index = MAIN_STEPS.findIndex((s) => s.id === currentStepId);
    if (index !== -1 && navItemsRef.current[index]) {
      const el = navItemsRef.current[index];
      clickedLeft.set(el.offsetLeft);
      clickedWidth.set(el.offsetWidth);
    } else {
      // fallback to hide indicator
      clickedLeft.set(0);
      clickedWidth.set(0);
    }
  }, [currentStepId, clickedLeft, clickedWidth]);

  return (
    <div className="relative flex items-center justify-center w-full bg-[#171717] p-1 rounded-xl">
      {MAIN_STEPS.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            navItemsRef.current[index] = el;
          }}
          onClick={() => setCurrentStep(tab.id)}
          className="flex-1 relative z-10 h-[40px] bg-transparent flex items-center justify-center"
        >
          {tab.label}
        </button>
      ))}

      <motion.div
        layoutId="tab-indicator"
        initial={false}
        style={{
          left: springClickedLeft,
          width: springClickedWidth,
        }}
        className="absolute left-0 h-[40px] rounded-lg bg-white/5 pointer-events-none"
      />
    </div>
  );
};

interface AnimatedNumberProps {
  value: string | null;
  placeholder: string;
}

function Separator() {
  return <div className="h-0.5 w-2 rounded-full bg-[#d4d4d4]" />;
}

function AnimatedNumber({ value, placeholder }: AnimatedNumberProps) {
  return (
    <div className="relative flex h-[40px] w-[32px] items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0.25, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.08, ease: "easeInOut" }}
          className={cn("absolute", value === null ? "text-primary/10" : "")}
        >
          {value ?? placeholder}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Slot(
  props: SlotProps & {
    isShaking?: boolean;
    isVerifying: boolean;
    delay: number;
  }
) {
  const placeholderChar = "0";

  return (
    <motion.div
      layout
      className={cn(
        "relative flex h-[45px] min-w-[36px] flex-1 items-center justify-center rounded-[10px] bg-[#171717] text-base font-semibold text-[#fff]",
        props.isVerifying && "fast-pulse text-[#232323]/60 duration-100"
      )}
      style={{
        animationDelay: `${props.delay}ms`,
      }}
    >
      <AnimatedNumber value={props.char} placeholder={placeholderChar} />
      {props.isActive ? (
        <motion.div
          layoutId="indicator"
          className={cn(
            "absolute inset-0 z-10 rounded-[10px] border-3",
            props.isShaking ? "border-rose-400" : "border-blue-400",
            props.isVerifying && "border-none"
          )}
          transition={{ duration: 0.12, ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}

export function FamilyStyleOTP() {
  const CORRECT_OTP = "123456";
  const [value, setValue] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisableSubmitButton(value.length !== 6);
  }, [value]);

  const handleSubmit = () => {
    if (isVerifying) return;

    setIsVerifying(true);
    setDisableSubmitButton(true);
    setErrorMessage("");

    setTimeout(() => {
      if (value === CORRECT_OTP) {
        toast.message("Successfully verified", {
          description: "Your OTP has been verified.",
        });
      } else {
        setIsShaking(true);
        setErrorMessage("Invalid validation code");
      }

      setValue("");
      setIsVerifying(false);

      if (otpRef.current) {
        otpRef.current.focus();
        otpRef.current.setSelectionRange(0, 0);
      }
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
        <p className="text-tertiary text-sm text-center">
          Enter the code sent to your email.
        </p>
      </div>
      <motion.div
        animate={isShaking ? { x: [0, -5, 5, -2.5, 2.5, 0] } : { x: 0 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => setIsShaking(false)}
      >
        <OTPInput
          ref={otpRef}
          value={value}
          maxLength={6}
          containerClassName="group flex gap-2 items-center mb-6"
          onChange={(newValue) => {
            if (!/^\d*$/.test(newValue)) {
              setIsShaking(true);
              return;
            }
            setValue(newValue);
            if (errorMessage) setErrorMessage("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (value.length < 6) return;
              handleSubmit();
            }
          }}
          render={({ slots }) => (
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex gap-2 flex-1">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot
                    key={idx}
                    {...slot}
                    isShaking={isShaking}
                    isVerifying={isVerifying}
                    delay={idx * 100}
                  />
                ))}
              </div>
              <Separator />
              <div className="flex gap-2 flex-1">
                {slots.slice(3).map((slot, idx) => (
                  <Slot
                    key={idx}
                    {...slot}
                    isShaking={isShaking}
                    isVerifying={isVerifying}
                    delay={(idx + 3) * 100}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </motion.div>
      <span className="text-tertiary mb-3 text-[13px] text-center">
        Didn't receive a code?{" "}
        <button
          className="cursor-pointer font-semibold text-blue-500"
          onClick={() => {
            toast.message("Verification code has been sent", {
              description:
                "Normally you would get a code but this is just a prototype ;)",
            });
          }}
        >
          Resend
        </button>
      </span>
      <button
        disabled={disableSubmitButton}
        onClick={handleSubmit}
        className={cn(
          "flex h-[40px] w-full cursor-pointer items-center justify-center rounded-full font-semibold select-none disabled:cursor-not-allowed disabled:opacity-40",
          "bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-out active:scale-95",
          isVerifying ? "text-[#b3b3b3] bg-[#2A2A2A]" : "text-white"
        )}
      >
        <AnimatePresence initial={false}>
          {isVerifying ? (
            <motion.div
              className="flex w-fit items-center gap-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
              >
                <path
                  d="M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.024 13.2418 10.2961 13.5433C9.56814 13.8448 8.78793 14 8 14C7.21206 14 6.43185 13.8448 5.70389 13.5433C4.97594 13.2418 4.31451 12.7998 3.75736 12.2426C3.2002 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43186 2.45672 5.7039C2.75825 4.97595 3.2002 4.31451 3.75736 3.75736C4.31451 3.20021 4.97594 2.75825 5.7039 2.45673C6.43185 2.1552 7.21207 2 8 2C8.78793 2 9.56814 2.1552 10.2961 2.45673C11.0241 2.75826 11.6855 3.20021 12.2426 3.75736C12.7998 4.31452 13.2417 4.97595 13.5433 5.7039C13.8448 6.43186 14 7.21207 14 8L14 8Z"
                  stroke="#DADADA"
                  strokeWidth="3"
                />
                <path
                  d="M14 8C14 8.94687 13.7759 9.88029 13.346 10.7239C12.9162 11.5676 12.2927 12.2976 11.5267 12.8541C10.7607 13.4107 9.87381 13.778 8.9386 13.9261C8.0034 14.0743 7.04641 13.9989 6.14589 13.7063"
                  stroke="#191919"
                  strokeOpacity="0.36"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Verifying
            </motion.div>
          ) : (
            <span>Submit</span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

// Main header (tab pages only)
const DefaultHeader: React.FC<{ setOpen: (open: boolean) => void }> = ({
  setOpen,
}) => (
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

// Subpage/detail header (detail pages only)
const PageHeader: React.FC<{
  onBack: () => void;
  title: string;
  setOpen: (open: boolean) => void;
}> = ({ onBack, title, setOpen }) => (
  <div className="relative w-full flex items-center justify-between p-2">
    <SecondaryButton
      onClick={onBack}
      className="bg-[#171717] size-[32px] rounded-full p-0"
    >
      <ArrowLeft />
    </SecondaryButton>
    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
      {title}
    </h2>
    <SecondaryButton
      onClick={() => setOpen(false)}
      className="w-[32px] h-[32px] rounded-full p-0 bg-[#171717]"
    >
      <XIcon />
    </SecondaryButton>
  </div>
);

// --- Step Page Components — No header inside! ---

const LoginWithEmailPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [value, setValue] = useState("");
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  return (
    <motion.form
      layoutId="form"
      className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) onNext();
      }}
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
      <motion.div layoutId="form-button">
        <PrimaryButton
          type="submit"
          className={cn("rounded-[12px]", value === "" ? "bg-[#FFFFFF]/5" : "")}
          disabled={value === ""}
        >
          <ArrowRight className="text-white" />
        </PrimaryButton>
      </motion.div>
    </motion.form>
  );
};

const EmailConfirmPage: React.FC = () => (
  <motion.div className="flex flex-col items-center justify-center gap-4 py-4 pb-0">
    <FamilyStyleOTP />
  </motion.div>
);

const LoginWithPhonePage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [value, setValue] = useState("");
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  return (
    <motion.form
      layoutId="form"
      className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) onNext();
      }}
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
      <motion.div layoutId="form-button">
        <PrimaryButton
          type="submit"
          className={cn("rounded-[12px]", value === "" ? "bg-[#FFFFFF]/5" : "")}
          disabled={value === ""}
        >
          <ArrowRight className="text-white" />
        </PrimaryButton>
      </motion.div>
    </motion.form>
  );
};

const PhoneConfirmPage: React.FC = () => (
  <motion.div className="flex flex-col items-center justify-center gap-4 py-4 pb-0">
    <FamilyStyleOTP />
  </motion.div>
);

const LoginWithPasskeyPage: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <motion.form
    layoutId="form"
    className="flex items-center justify-between bg-[#171717] rounded-[16px] p-2"
    onSubmit={(e) => {
      e.preventDefault();
      onNext();
    }}
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
    <motion.div layoutId="form-button">
      <PrimaryButton type="submit" className="rounded-[12px]">
        <ArrowRight className="text-white" />
      </PrimaryButton>
    </motion.div>
  </motion.form>
);

const PasskeyConfirmPage: React.FC = () => (
  <motion.div className="flex flex-col items-center justify-center gap-8">
    <div className="relative flex items-center justify-center overflow-hidden rounded-[22px] p-0.25">
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
      <div className="bg-preview-bg z-1 flex items-center justify-center rounded-[20px] p-0.5">
        <div className="flex items-center justify-center rounded-2xl bg-[#232323] p-1">
          <div className="flex size-16 items-center justify-center rounded-xl bg-[#000]">
            <Image
              src="/icons/finger-print.svg"
              alt="passkey"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center space-y-2">
      <h1 className="text-xl font-bold">Waiting for passkey</h1>
      <p className="text-gray-500 w-[75%] text-center text-md leading-6">
        Please follow prompts to verify your passkey
      </p>
      <PrimaryButton className="mt-4 w-full py-3 flex items-center gap-2">
        Continue
      </PrimaryButton>
    </div>
  </motion.div>
);

// Socials
const Socials: React.FC = () => (
  <div className="flex gap-1">
    {SOCIALS.map((social) => (
      <motion.div
        key={social.id}
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

// Wallet select detail (no header in here)
const WalletSelectPage: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="flex flex-col gap-1">
    {WALLETS.map((wallet) => (
      <div
        key={wallet.id}
        onClick={onNext}
        className="rounded-[16px] bg-[#171717] p-4 flex items-center justify-start gap-6"
      >
        <div className="flex items-center gap-4">
          <Image
            src={`/icons/wallet/${wallet.icon}.svg`}
            alt={wallet.name}
            width={32}
            height={32}
          />
        </div>
        <p className="text-lg tracking-wide">{wallet.name}</p>
      </div>
    ))}

    <PrimaryButton className="mt-4 w-full py-3 flex items-center gap-2 bg-[#FF2056]">
      <PlusIcon className="size-4.5" />
      Create a new wallet
    </PrimaryButton>
  </div>
);

// Wallet confirm detail (no header here)
const WalletConfirmPage: React.FC = () => (
  <div className="py-6 text-center">Wallet successfully linked.</div>
);

// Render correct step
function renderStep({ id, onNext }: { id: StepId; onNext: () => void }) {
  switch (id) {
    case "email":
      return <LoginWithEmailPage onNext={onNext} />;
    case "email-confirm":
      return <EmailConfirmPage />;
    case "phone":
      return <LoginWithPhonePage onNext={onNext} />;
    case "phone-confirm":
      return <PhoneConfirmPage />;
    case "passkey":
      return <LoginWithPasskeyPage onNext={onNext} />;
    case "passkey-confirm":
      return <PasskeyConfirmPage />;
    case "wallet-select":
      return <WalletSelectPage onNext={onNext} />;
    case "wallet-confirm":
      return <WalletConfirmPage />;
    default:
      return null;
  }
}

// Main modal
export const FamilySignInModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [currentStepId, setCurrentStepId] = useState<StepId>("email");
  const ref = useRef<HTMLDivElement>(null);
  const { height, width } = useMeasure({ ref });

  const stepIdx = STEPS.findIndex((s) => s.id === currentStepId);
  const currentStep = STEPS[stepIdx];

  const handleNext = () => {
    const nextStep = STEPS[stepIdx + 1];
    if (nextStep) setCurrentStepId(nextStep.id);
  };
  const handleBack = () => {
    const prevStep = STEPS[stepIdx - 1];
    if (prevStep) setCurrentStepId(prevStep.id);
  };
  const handleTabSwitch = (mainId: StepId) => {
    setCurrentStepId(mainId);
  };

  const variants = {
    initial: { filter: "blur(2.5px)", opacity: 0 },
    animate: { filter: "blur(0)", opacity: 1 },
    exit: { filter: "blur(2.5px)", opacity: 0 },
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setOpen(false)}
      />
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
              {/* Only ONE header: tab or detail */}
              {currentStep.main ? (
                <DefaultHeader setOpen={setOpen} />
              ) : (
                <PageHeader
                  title={currentStep.label}
                  setOpen={setOpen}
                  onBack={handleBack}
                />
              )}
              {/* Socials & tabs ONLY for main steps */}
              {currentStep.main && (
                <>
                  <Socials />
                  <div className="px-2">
                    <Tabs
                      setCurrentStep={handleTabSwitch}
                      currentStepId={currentStepId}
                    />
                  </div>
                </>
              )}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  layout
                  key={currentStepId}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-6 p-2"
                >
                  {renderStep({
                    id: currentStepId,
                    onNext: handleNext,
                  })}
                </motion.div>
              </AnimatePresence>
              {/* Divider + Connect button only for main steps */}
              {currentStep.main && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-[#222222]" />
                    <p className="text-neutral-400">OR</p>
                    <div className="flex-1 h-px bg-[#222222]" />
                  </div>
                  <div className="p-3">
                    <PrimaryButton
                      className="w-full py-3 flex items-center gap-2"
                      onClick={() => setCurrentStepId("wallet-select")}
                    >
                      <WalletIcon className="size-4.5" />
                      Connect wallet
                    </PrimaryButton>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export const FamilyModalUsage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <FamilySignInModal open={open} setOpen={setOpen} />}
      <PrimaryButton onClick={() => setOpen(true)}>Sign in</PrimaryButton>
    </>
  );
};

export default FamilySignInModal;
