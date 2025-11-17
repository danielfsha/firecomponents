"use client";

import FamilySigninModal, {
  FamilyModalUsage,
  PrimaryButton,
} from "@/components/family-signin-modal";
import { useState } from "react";
import FirecrawlInput from "@/components/firecrawl-input";
import { VercelHomepageNav } from "@/components/vercel-homapage-nav";
import AppleCarousel from "@/components/apple-carousel";
import { DraggableSidebar } from "@/components/draggable-sidebar";
import Web3Cards from "@/components/web3-cards";
import useScrollProgress from "@/hooks/use-scroll-progress";
import IOSThemeSwitch from "@/components/ios-theme-switch";
import { Carousel } from "@/components/carousel";
import IOS26Switch from "@/components/ios26-switch";
import Nav from "@/components/section/nav";
import PendingWalletTransactions from "@/components/pending-wallet-transactions";

export default function Home() {
  const { scrollProgress } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  return (
    <div className="relative h-screen w-screen overflow-hidden overflow-y-scroll">
      {/* <VercelDashboardNav scrollProgress={scrollProgress} /> */}
      <Nav />

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <Carousel />
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <PendingWalletTransactions />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <IOS26Switch
          checked={isSwitchChecked}
          onCheckedChange={(checked) => setIsSwitchChecked(checked)}
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <IOSThemeSwitch />
      </div>

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <Web3Cards />
      </div>

      <DraggableSidebar>
        <h1>hey</h1>
      </DraggableSidebar>

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
