import { FamilyModalUsage } from "@/components/family-signin-modal";
import FirecrawlInput from "@/components/firecrawl-input";
import VercelHomepageNav from "@/components/vercel-homapage-nav";
import Web3Cards from "@/components/web3-cards";
import useScrollProgress from "@/hooks/use-scroll-progress";
import Carousel from "@/components/carousel";
import PendingWalletTransactions from "@/components/pending-wallet-transactions";
import FileTree from "@/components/filetree";
import AnimatedDock from "@/components/animated-dock";
import Tabs from "@/components/tabs";
import React, { ComponentType, JSX } from "react";

export type Component = {
  name: string;
  description: string;
  image: string;
  slug: string;
  category: "component" | "page";
  date?: string;
  component: ComponentType<any>;
};

export const components: Component[] = [
  {
    name: "Family Signin Modal",
    description: "Modal component inspired by family signin modal",
    image: "/cover/family-signin-modal.png",
    slug: "family-signin-modal",
    category: "component",
    date: "Jun 10, 2025",
    component: FamilyModalUsage,
  },
  {
    name: "File Tree",
    description:
      "File tree component built in Reactjs and Framermotion this component can be used to create an infinite file tree for file management such as file explorer, code editor, etc.",
    image: "/cover/file-tree.png",
    slug: "file-tree",
    category: "component",
    date: "Nov 12, 2025",
    component: FileTree,
  },
  {
    name: "Animated web3 cards",
    description:
      "Animated web3 cards component built in Reactjs and Framermotion this component can be used to create an animated web3 cards for web3 applications.",
    image: "/cover/animated-web3-cards.png",
    slug: "web3-cards",
    category: "component",
    date: "Nov 15, 2025",
    component: Web3Cards,
  },
  {
    name: "Pending Wallet Transactions",
    description:
      "Pending wallet transactions component built in Reactjs and Framermotion this component can be used to create an pending wallet transactions for web3 applications.",
    image: "/cover/pending-wallet-transactions.png",
    slug: "pending-wallet-transactions",
    category: "component",
    date: "Nov 16, 2025",
    component: PendingWalletTransactions,
  },
  {
    name: "Animated dock",
    description:
      "Animated dock component built in Reactjs and Framermotion this component can be used to create an animated dock for web3 applications.",
    image: "/cover/animated-dock.png",
    slug: "animated-dock",
    category: "component",
    date: "Nov 17, 2025",
    component: AnimatedDock,
  },
  {
    name: "Firecrawl Input",
    description:
      "Firecrawl input component built in Reactjs and Framermotion this component can be used to create an animated input for web3 applications.",
    image: "/cover/firecrawl-input.png",
    slug: "firecrawl-input",
    category: "component",
    date: "Nov 18, 2025",
    component: FirecrawlInput,
  },
  // {
  //   name: "Vercel Homepage Nav",
  //   description:
  //     "This component is a replica of the vercel homepage nav built in Reactjs and Framermotion this component can be used to create a homepage nav for web3 applications.",
  //   image: "/vercel-homepage-nav.png",
  //   slug: "vercel-homepage-nav",
  //   category: "component",
  //   date: "2025-11-18",
  //   component: VercelHomepageNav,
  // },
  // {
  //   name: "Tabs Component",
  //   description:
  //     "Tabs component built in Reactjs and Framermotion this component can be used to create an animated tabs for web3 applications.",
  //   image: "/cover/tabs-component.png",
  //   slug: "tabs-component",
  //   category: "component",
  //   date: "2025-11-18",
  //   component: Tabs,
  // },
  //   {
  //     name: "Animated Carousel",
  //     description:
  //       "Animated carousel component built in Reactjs and Framermotion this component can be used to create an animated carousel for web3 applications.",
  //     image: "/animated-carousel.png",
  //     slug: "animated-carousel",
  //     category: "component",
  //     date: "2025-11-18",
  //     component: Carousel,
  //   },
];
