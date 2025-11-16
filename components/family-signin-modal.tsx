"use client";

import Image from "next/image";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
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
}> = ({ setCurrentStep, currentStepId }) => (
  <div className="relative flex items-center justify-center w-full bg-[#171717] p-1 rounded-xl">
    {MAIN_STEPS.map((tab) => (
      <div
        key={tab.id}
        onClick={() => setCurrentStep(tab.id)}
        className="flex-1 relative z-10 h-[40px] bg-transparent flex items-center justify-center"
      >
        {tab.label}
      </div>
    ))}

    <motion.div
      layoutId="tab-indicator"
      animate={{
        x: `${100 * MAIN_STEPS.findIndex((t) => t.id === currentStepId)}%`,
      }}
      className="absolute left-0 h-[40px] w-[34%] rounded-lg bg-white/5 pointer-events-none"
    />
  </div>
);

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
    <SecondaryButton onClick={onBack} className="bg-[#171717]">
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
  <motion.div className="flex flex-col items-center justify-center gap-4 py-4">
    <p className="text-center text-lg">
      Check your inbox for a confirmation link.
    </p>
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
  <motion.div className="flex flex-col items-center justify-center gap-4 py-4">
    <p className="text-center text-lg">Enter the OTP sent to your phone.</p>
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
  <motion.div className="flex flex-col items-center justify-center gap-4 py-4">
    <p className="text-center text-lg">Passkey setup successful. You're in!</p>
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
        className="rounded-[16px] bg-[#171717] p-4 flex items-center justify-start gap-2"
      >
        <div className="flex items-center gap-2">
          <Image
            src={`/icons/wallet/${wallet.icon}.svg`}
            alt={wallet.name}
            width={32}
            height={32}
          />
        </div>
        <p>{wallet.name}</p>
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
  const { height } = useMeasure({ ref });

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
