"use client";

import FamilySigninModal, {
  FamilyModalUsage,
  PrimaryButton,
} from "@/components/family-signin-modal";
import { useState } from "react";
import FirecrawlInput from "@/components/firecrawl-input";
import { VercelHomepageNav } from "@/components/vercel-homapage-nav";
import { VercelDashboardNav } from "@/components/vercel-dashboard-nav";
import AppleCarousel from "@/components/apple-carousel";
import LiquidToggle from "@/components/liquid-toggle";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-screen w-screen overflow-hidden overflow-y-scroll">
      <VercelDashboardNav />

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <AppleCarousel />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <FamilyModalUsage />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <FirecrawlInput />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <VercelHomepageNav />
      </div>
    </div>
  );
}
