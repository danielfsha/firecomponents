"use client";

import { Component } from "@/lib/constants";
import Link from "next/link";

export default function PreviewCard(component: Component) {
  return (
    <Link
      href={`/preview/${component.slug}`}
      className="flex-1 flex flex-col items-start justify-start"
    >
      {/* image */}
      {/* <img src={component.image} alt={component.name} /> */}
      <div className="p-2 w-full h-[260px] lg:h-[180px] flex items-center justify-center bg-[#f5f5f5] border rounded-2xl">
        <img
          src={component.image}
          alt={component.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* description */}
      <div className="flex flex-col items-start justify-start gap-2 py-2">
        <h2 className="text-sm">{component.name}</h2>
        <p className="text-xs">{component.date}</p>
      </div>
    </Link>
  );
}
