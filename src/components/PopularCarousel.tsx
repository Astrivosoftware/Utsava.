"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TemplateCard } from "./TemplateCard";
import type { Template } from "@/lib/types";

export function PopularCarousel({ templates }: { templates: Template[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-2">
        {templates.map((t) => (
          <div key={t.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[24%]">
            <TemplateCard t={t} />
          </div>
        ))}
      </div>
      <button onClick={() => scroll(-1)} aria-label="Previous" className="card absolute -left-3 top-1/3 hidden h-11 w-11 items-center justify-center transition hover:scale-105 lg:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => scroll(1)} aria-label="Next" className="card absolute -right-3 top-1/3 hidden h-11 w-11 items-center justify-center transition hover:scale-105 lg:flex">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
