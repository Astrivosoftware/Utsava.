"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cake, Flame, Flower2, Gem, Heart, HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TILES: { name: string; icon: LucideIcon; bg: string; blurb: string; span?: string }[] = [
  { name: "Birthday", icon: Cake, bg: "bg-butter/70", blurb: "Candles, confetti and one big surprise", span: "col-span-2" },
  { name: "Anniversary", icon: Heart, bg: "bg-blush", blurb: "Your love story" },
  { name: "Rakhi", icon: Flower2, bg: "bg-sage", blurb: "For the bond that lasts" },
  { name: "Festive", icon: Flame, bg: "bg-lilac", blurb: "Diwali and more" },
  { name: "Proposal", icon: Gem, bg: "bg-coral/25", blurb: "Ask beautifully" },
  { name: "Friendship", icon: Users, bg: "bg-sage/70", blurb: "Inside jokes" },
  { name: "Valentine's", icon: HeartHandshake, bg: "bg-blush", blurb: "Say it softly" },
];

export function OccasionTiles({ counts }: { counts: Record<string, number> }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {TILES.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          whileHover={{ y: -6 }}
          className={cn(i === 0 && "md:col-span-2", t.span)}
        >
          <Link
            href={`/templates?category=${encodeURIComponent(t.name)}`}
            className={cn("group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-3xl p-5 shadow-soft transition-shadow hover:shadow-lift md:min-h-[180px]", t.bg)}
          >
            <t.icon className="absolute -bottom-4 -right-3 h-28 w-28 rotate-12 text-charcoal/10 transition duration-500 group-hover:rotate-0 group-hover:scale-110 md:h-32 md:w-32" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-soft">
              <t.icon className="h-5 w-5 text-gold" />
            </span>
            <div className="relative">
              <h3 className="font-display text-2xl">{t.name}</h3>
              <p className="mt-0.5 text-xs text-charcoal/65">{t.blurb}</p>
              <p className="mt-2 flex items-center gap-1 text-xs font-medium">
                {counts[t.name] ?? 0} templates
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
