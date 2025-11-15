"use client";

import FamilySigninModal, {
  PrimaryButton,
} from "@/components/family-signin-modal";
import { useState } from "react";
import FirecrawlInput from "@/components/firecrawl-input";
import { VercelHomepageNav } from "@/components/vercel-homapage-nav";
import { VercelDashboardNav } from "@/components/vercel-dashboard-nav";

export default function Home() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-screen w-screen overflow-hidden overflow-y-scroll">
      <VercelDashboardNav />

      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <PrimaryButton onClick={() => setOpen(!open)}>Sign In</PrimaryButton>
        {open && (
          <>
            <FamilySigninModal open={open} setOpen={setOpen} />
          </>
        )}
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
