"use client";

import FamilySigninModal, {
  PrimaryButton,
} from "@/components/family-signin-modal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <PrimaryButton onClick={() => setOpen(!open)}>Sign In</PrimaryButton>

      {open && (
        <>
          <FamilySigninModal open={open} setOpen={setOpen} />
        </>
      )}
    </div>
  );
}
