"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { MotionConfig } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type transaction = {
  id: string;
  asset: string;
  type: "send" | "receive";
  state: "pending" | "completed" | "failed";
  amount: string;
  receiver?: string;
};

const transactions: transaction[] = [
  {
    id: "1",
    asset: "Ethereum",
    type: "send",
    state: "pending",
    amount: "$20.00",
    receiver: "vitalik",
  },
  {
    id: "2",
    asset: "DeadFellaz",
    type: "send",
    state: "pending",
    amount: "Fee Only",
    receiver: "vitalik",
  },

  {
    id: "3",
    asset: "DeadFellaz",
    type: "send",
    state: "pending",
    amount: "Fee Only",
    receiver: "vitalik",
  },

  {
    id: "4",
    asset: "DeadFellaz",
    type: "send",
    state: "pending",
    amount: "Fee Only",
    receiver: "vitalik",
  },
];

const PendingWalletTransactions = () => {
  const [open, setOpen] = useState(false);

  const assetImage = (asset: string, index: number) => {
    if (asset === "Ethereum") return "/wallet/ethereum.svg";
    if (asset === "DeadFellaz" && index === 1)
      return "/wallet/Deadfellaz's1.png";
    if (asset === "DeadFellaz" && index === 2)
      return "/wallet/Deadfellaz's2.png";
    if (asset === "DeadFellaz" && index === 3)
      return "/wallet/Deadfellaz's3.png";
    if (asset === "DeadFellaz" && index === 4)
      return "/wallet/Deadfellaz's4.png";
    return "/wallet/ethereum.svg";
  };
  return (
    <div className="flex flex-col max-w-[320px] w-full">
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
        <motion.div
          onClick={() => setOpen(!open)}
          className={cn(
            "relative flex items-center justify-between w-full max-w-[320px] overflow-hidden rounded-2xl p-2 will-change-transform",
            "cursor-pointer"
          )}
        >
          {/* left side of the header */}
          <div className="flex items-center justify-center space-x-2">
            <p>Pending</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.7">
                <path
                  d="M7.99984 1.33332C4.31794 1.33332 1.33317 4.31809 1.33317 7.99999C1.33317 11.6819 4.31794 14.6667 7.99984 14.6667C11.6817 14.6667 14.6665 11.6819 14.6665 7.99999C14.6665 4.31809 11.6817 1.33332 7.99984 1.33332Z"
                  stroke="#B5B3AD"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10.6667V7.99999"
                  stroke="#B5B3AD"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5.33334H7.99333"
                  stroke="#B5B3AD"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>

          {/* rigth side of the header */}
          <div className="flex items-center justify-center space-x-2">
            <p>4</p>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: open ? 180 : 0 }}
            >
              <ChevronUp />
            </motion.div>
          </div>
        </motion.div>

        {/* List view */}
        <motion.div className="w-full space-y-2 mt-2">
          {transactions.map((transaction, idx) => (
            <motion.div
              onClick={() => setOpen(true)}
              style={{
                zIndex: transactions.length - idx,
              }}
              animate={{
                y: !open && idx !== 0 ? -idx * 70 : 0,
                scale: !open && idx !== 0 ? Math.exp(-0.04 * idx) : 1,
              }}
              key={transaction.id}
              className={`relative border w-full rounded-xl gap-2 p-2 flex bg-white`}
            >
              <motion.div className="flex" layout layoutId="image">
                <Image
                  src={assetImage(
                    transaction.asset,
                    transactions.indexOf(transaction)
                  )}
                  alt="ethereum"
                  width={48}
                  height={48}
                />
              </motion.div>

              <motion.div
                layout
                layoutId="text"
                className="flex flex-col items-center justify-center flex-1"
              >
                <motion.div
                  layout
                  layoutId="first-row"
                  className="flex items-center space-x-2 w-full"
                >
                  <span>sending to </span>
                  <Image
                    src={"/wallet/Vitalik's profile picture.png"}
                    alt="ethereum"
                    width={15}
                    height={15}
                  />
                  <span>{transaction.receiver}</span>
                </motion.div>
                <motion.div
                  layout
                  layoutId="second-row"
                  className="flex items-center justify-between space-x-2 w-full"
                >
                  <span>{transaction.asset}</span>

                  <span className="font-semibold text-[14px] border rounded-sm p-1 text-sm">
                    {transaction.amount}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default PendingWalletTransactions;
