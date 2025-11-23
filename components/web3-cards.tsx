"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { motion, MotionConfig } from "motion/react";

import {
  SparkleIcon,
  BookMarkedIcon,
  CloudIcon,
  EllipsisIcon,
  AnchorIcon,
} from "lucide-react";

type Card = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  ETHAmount: string;
};

const CARDS: Card[] = [
  {
    title: "Daniel",
    description: "Description 1",
    icon: <SparkleIcon />,
    href: "https://example.com",
    ETHAmount: "1 ETH",
  },
  {
    title: "Savings",
    description: "Description 2",
    icon: <BookMarkedIcon />,
    href: "https://example.com",
    ETHAmount: "2 ETH",
  },
  {
    title: "Staked",
    description: "Description 3",
    icon: <CloudIcon />,
    href: "https://example.com",
    ETHAmount: "3 ETH",
  },
  {
    title: "Spending",
    description: "Description 4",
    icon: <AnchorIcon />,
    href: "https://example.com",
    ETHAmount: "5 ETH",
  },
];

export const Web3Card = ({
  card,
  handleCardClick,
  isSelected,
}: {
  card: Card;
  handleCardClick: (card: Card | null) => void;
  isSelected: boolean;
}) => {
  return (
    <motion.div
      layout
      layoutId={`${card.title}-card`}
      onClick={() => {
        if (!isSelected) {
          handleCardClick(card);
        } else {
          handleCardClick(null);
        }
      }}
      key={card.title}
      className={cn(
        "flex flex-col items-center justify-between p-4 rounded-3xl shadow-sm min-w-32 space-y-2",
        card.title === "Daniel" && "bg-[#ad46ff] text-white shadow",
        card.title === "Savings" && "bg-[#171717] text-white shadow",
        card.title === "Staked" && "bg-[#00b8db] text-white shadow",
        card.title === "Spending" && "bg-[#2b7fff] text-white shadow",
        isSelected && "w-full h-48"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <motion.div
          layoutId={`${card.title}-icon`}
          className="flex items-center gap-2 scale-85"
        >
          {card.icon}
        </motion.div>
        <motion.div
          layoutId={`${card.title}-ellipsis`}
          whileTap={{ scale: 0.8 }}
          className="flex items-center justify-center rounded-full bg-white/20 text-white size-7 p-1"
        >
          <EllipsisIcon />
        </motion.div>
      </div>

      <motion.div className="flex flex-col items-start justify-start w-full mt-2">
        <motion.h3
          layoutId={`${card.title}-title`}
          className="text-lg font-semibold"
        >
          {card.title}
        </motion.h3>
        <motion.p
          layoutId={`${card.title}-ETHAmount`}
          className="text-lg font-semibold opacity-60 -mt-1"
        >
          {card.ETHAmount}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default function Web3Cards() {
  const [cards, setCards] = useState<Card[]>(CARDS);
  const [unselectedCards, setUnselectedCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleCardClick = (card: Card | null) => {
    setSelectedCard(card);
    setUnselectedCards(cards.filter((c) => c !== card));
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <div>
        {selectedCard === null ? (
          <div
            className={cn(
              "grid gap-3",
              selectedCard
                ? "grid-cols-3 grid-rows-2"
                : "grid-cols-2 grid-rows-2"
            )}
          >
            {cards.map((card: Card, index: number) => (
              <Web3Card
                key={index}
                card={card}
                handleCardClick={handleCardClick}
                isSelected={selectedCard === card}
              />
            ))}
          </div>
        ) : (
          <div className={cn("flex flex-col gap-3")}>
            <div className={cn("flex items-center justify-between w-full ")}>
              {/* render the selected card */}
              {selectedCard && (
                <Web3Card
                  key={selectedCard.title}
                  card={selectedCard}
                  handleCardClick={handleCardClick}
                  isSelected={true}
                />
              )}
            </div>
            <div
              className={cn("flex items-center justify-between w-full gap-3")}
            >
              {/* render the unselected cards */}
              {unselectedCards.map((card: Card, index: number) => (
                <Web3Card
                  key={index}
                  card={card}
                  handleCardClick={handleCardClick}
                  isSelected={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
