"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { Template } from "@/lib/types";
import { discount, inr } from "@/lib/utils";
import { WishlistButton } from "./WishlistButton";

export function TemplateCard({ t, priority }: { t: Template; priority?: boolean }) {
  const off = discount(t.price, t.old_price);
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="group relative h-full">
      <Link href={`/templates/${t.slug}`} className="card flex h-full flex-col overflow-hidden ring-1 ring-charcoal/5 transition-shadow group-hover:shadow-lift">
        <div className="relative aspect-[4/3] overflow-hidden bg-blush/40">
          <Image
            src={t.cover_image}
            alt={t.title}
            fill
            priority={priority}
            sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-maroon backdrop-blur">{t.category}</span>
            {t.is_new && <span className="rounded-full bg-butter px-2.5 py-1 text-[10px] font-semibold">New</span>}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-charcoal/75 to-transparent p-3 pt-10 text-xs font-medium text-white transition duration-300 group-hover:translate-y-0">
            View template <ArrowRight className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base leading-snug sm:text-xl">{t.title}</h3>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-butter/30 px-2 py-0.5 text-xs font-medium">
              <Star className="h-3 w-3 fill-gold text-gold" />
              {Number(t.rating).toFixed(1)}
            </span>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
            <span className="text-lg font-semibold">{inr(t.price)}</span>
            {t.old_price ? <span className="text-xs text-charcoal/40 line-through">{inr(t.old_price)}</span> : null}
            {off > 0 && <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-semibold text-white">{off}% OFF</span>}
          </div>
        </div>
      </Link>
      <WishlistButton slug={t.slug} className="absolute right-2 top-2" />
    </motion.div>
  );
}
