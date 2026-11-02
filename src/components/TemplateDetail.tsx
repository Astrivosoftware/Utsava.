"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, MessageCircle, Music, Music2, Share2, Star } from "lucide-react";
import type { Template } from "@/lib/types";
import { BASE_FEATURES, SITE } from "@/lib/site";
import { cn, discount, inr } from "@/lib/utils";
import { Gallery } from "./Gallery";
import { AnimatedPrice } from "./AnimatedPrice";
import { WishlistButton } from "./WishlistButton";

export function TemplateDetail({ t }: { t: Template }) {
  const [music, setMusic] = useState<"with" | "without">("with");
  const price = music === "with" ? t.with_music_price : t.without_music_price;
  const off = discount(price, t.old_price);
  const images = [t.cover_image, ...t.screenshots];
  const features = Array.from(new Set([...BASE_FEATURES, ...t.features]));
  const orderHref = `/order?template=${t.slug}&music=${music}`;
  const shareText = `Look at this "${t.title}" on Utsava: ${SITE.url}/templates/${t.slug}`;
  const shareHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const waOrderHref = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        `Hi! I want to order "${t.title}" (${music === "with" ? "With Music" : "Without Music"}, ${inr(price)}).`
      )}`
    : "";

  const options = [
    { id: "with" as const, label: "With Music", icon: Music, price: t.with_music_price },
    { id: "without" as const, label: "Without Music", icon: Music2, price: t.without_music_price },
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 pb-28 md:py-12 lg:grid-cols-2 lg:pb-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Gallery images={images} title={t.title} />
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-blush px-3 py-1 font-semibold text-maroon">{t.category}</span>
          {t.is_new && <span className="rounded-full bg-butter px-3 py-1 font-semibold">New</span>}
          <span className="ml-auto flex items-center gap-1 font-medium">
            <Star className="h-4 w-4 fill-butter text-butter" /> {Number(t.rating).toFixed(1)}
          </span>
        </div>

        <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{t.title}</h1>
        {t.tagline && <p className="mt-2 font-script text-xl text-gold">{t.tagline}</p>}

        <div className="mt-5 flex items-baseline gap-3">
          <AnimatedPrice value={price} className="font-display text-4xl" />
          {t.old_price ? <span className="text-charcoal/40 line-through">{inr(t.old_price)}</span> : null}
          {off > 0 && <span className="rounded-full bg-coral/15 px-2.5 py-1 text-xs font-semibold text-coral">{off}% OFF</span>}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Music option">
          {options.map((o) => (
            <motion.button
              key={o.id}
              whileTap={{ scale: 0.97 }}
              role="radio"
              aria-checked={music === o.id}
              onClick={() => setMusic(o.id)}
              className={cn(
                "rounded-2xl border-2 p-4 text-left transition",
                music === o.id ? "border-gold bg-butter/30 shadow-soft" : "border-charcoal/10 bg-white hover:border-gold/50"
              )}
            >
              <o.icon className="h-5 w-5 text-gold" />
              <div className="mt-2 text-sm font-medium">{o.label}</div>
              <div className="text-sm text-charcoal/60">{inr(o.price)}</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {features.map((f) => (
            <span key={f} className="flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-white px-3 py-1.5 text-xs">
              <Check className="h-3.5 w-3.5 text-gold" /> {f}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <WishlistButton slug={t.slug} className="border border-charcoal/10" />
          <a href={shareHref} target="_blank" rel="noopener noreferrer" className="btn-soft px-4 py-2.5">
            <Share2 className="h-4 w-4" /> Share on WhatsApp
          </a>
          {waOrderHref && (
            <a href={waOrderHref} target="_blank" rel="noopener noreferrer" className="btn-soft px-4 py-2.5">
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          )}
        </div>

        {t.description && <p className="mt-6 leading-relaxed text-charcoal/75">{t.description}</p>}

        <div className="mt-8 hidden gap-3 sm:flex">
          <Link href={orderHref} className="btn-dark flex-1 py-4 text-base">
            Order Now <ArrowRight className="h-4 w-4" />
          </Link>
          {t.demo_url && (
            <a href={t.demo_url} target="_blank" rel="noopener noreferrer" className="btn-soft py-4">
              Try Live <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {t.demo_url && (
          <a href={t.demo_url} target="_blank" rel="noopener noreferrer" className="btn-soft mt-6 w-full sm:hidden">
            Try Live <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Sticky bottom bar (mobile) */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
        <div>
          <div className="text-[11px] text-charcoal/60">{music === "with" ? "With music" : "Without music"}</div>
          <AnimatedPrice value={price} className="font-display text-2xl" />
        </div>
        <Link href={orderHref} className="btn-dark flex-1 py-3.5">Order Now</Link>
      </div>
    </div>
  );
}
