"use client";

import PreviewCard from "@/components/section/prevew-card";
import Tabs from "@/components/tabs";
import { components } from "@/lib/constants";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-18 items-start justify-start overflow-x-hidden">
      <div className="flex flex-col items-start justify-start w-full gap-2 pt-12">
        <h1 className="font-bold text-2xl">Firecomponents</h1>
        <p>This is a collection of modern and unique components for Next.js</p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {components.map((component) => (
          <PreviewCard
            key={component.slug}
            name={component.name}
            description={component.description}
            image={component.image}
            slug={component.slug}
            category={component.category}
            date={component.date}
            component={component.component}
          />
        ))}
      </div>
    </div>
  );
}
