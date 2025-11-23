"use client";

import { useParams } from "next/navigation";

import { components } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { slug } = useParams();
  const component = components.find((component) => component.slug === slug);
  const componentIndex = component ? components.indexOf(component) : -1;
  const pageFullUrl = window.location.href;

  return (
    <div className="w-full gap-12 h-screen overrflow-y-scroll">
      <header className="w-full bg-white flex flex-col items-start justify-start py-12">
        {/*back button and copy button */}
        <div className="flex items-center justify-between w-full gap-3">
          <Link href="/" className="text-black">
            <Button className="rounded-full" variant="outline" size="icon">
              <ArrowLeft />
            </Button>
          </Link>

          <Button
            className="rounded-full"
            onClick={() => navigator.clipboard.writeText(pageFullUrl)}
            variant="outline"
            size="icon"
          >
            <LinkIcon />
          </Button>
        </div>

        <h1 className="py-3 pt-12 font-bold text-xl tracking-tight">
          {component?.name}
        </h1>
        <p className="text-muted-foreground">{component?.description}</p>
      </header>

      <div className="w-full h-[600px] bg-[#F5f5f5] flex items-center justify-center border rounded-3xl ">
        {component && <component.component />}
      </div>

      {/* next should alwasy be on the right not when there is no next */}
      <footer className="flex items-center justify-between gap-2 pb-24 pt-12">
        {/* next and previeus incase there is no next or previpus dpont show */}
        {componentIndex > 0 && (
          <Link
            href={`/preview/${components[componentIndex - 1].slug}`}
            className="flex flex-col gap-1 items-start flex-1 p-4 rounded-lg"
          >
            <span>{components[componentIndex - 1].name}</span>
            <span>Previous</span>
          </Link>
        )}

        {componentIndex < components.length - 1 && (
          <Link
            href={`/preview/${components[componentIndex + 1].slug}`}
            className="flex flex-col gap-1 items-end flex-1  p-4 rounded-lg align-self-end"
          >
            <span>{components[componentIndex + 1].name}</span>
            <>Next</>
          </Link>
        )}
      </footer>
    </div>
  );
}
