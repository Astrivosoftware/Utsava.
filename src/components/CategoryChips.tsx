"use client";
import Link from "next/link";
import {
  LayoutGrid, Cake, Heart, Flower2, Flame, Gem, Users, HeartHandshake, type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  All: LayoutGrid, Birthday: Cake, Anniversary: Heart, Rakhi: Flower2, Festive: Flame,
  Proposal: Gem, Friendship: Users, "Valentine's": HeartHandshake,
};

export function CategoryChips({ value, onSelect }: { value?: string; onSelect?: (c: string) => void }) {
  const items: string[] = ["All", ...CATEGORIES];
  return (
    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 py-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
      {items.map((c) => {
        const Icon = ICONS[c];
        const cls = cn(
          "flex min-w-[88px] shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 text-xs font-medium transition hover:-translate-y-0.5",
          value === c ? "border-butter bg-butter shadow-soft" : "border-charcoal/10 bg-white/70 hover:bg-blush/60"
        );
        const inner = (
          <>
            <Icon className="h-5 w-5 text-gold" />
            {c}
          </>
        );
        return onSelect ? (
          <button key={c} onClick={() => onSelect(c)} className={cls} aria-pressed={value === c}>
            {inner}
          </button>
        ) : (
          <Link key={c} href={c === "All" ? "/templates" : `/templates?category=${encodeURIComponent(c)}`} className={cls}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
