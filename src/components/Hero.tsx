"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Star } from "lucide-react";
import { Flower, Heart, Leaf, Sparkle } from "./Decor";
import type { Template } from "@/lib/types";

const FLOATERS = [
  { C: Flower, cls: "left-[-2%] top-[4%] h-16 w-16 text-coral/80", d: 0 },
  { C: Heart, cls: "right-[4%] top-[2%] h-10 w-10 text-coral/70", d: 1 },
  { C: Sparkle, cls: "right-[-1%] top-[50%] h-9 w-9 text-gold", d: 2 },
  { C: Leaf, cls: "left-[4%] bottom-[6%] h-14 w-14 text-sage", d: 1.5 },
  { C: Sparkle, cls: "left-[34%] top-[-2%] h-7 w-7 text-butter", d: 0.5 },
  { C: Flower, cls: "right-[10%] bottom-[2%] h-12 w-12 text-lilac", d: 2.5 },
];

export function Hero({ templates }: { templates: Template[] }) {
  const [a, b, c] = templates;
  const phone = a?.screenshots?.[0] ?? a?.cover_image;
  const avatars = ["bg-blush", "bg-sage", "bg-lilac", "bg-butter"];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-blush/80 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-lilac/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-butter/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 md:grid-cols-[1.05fr_1fr] md:pt-16">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/70 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur"
          >
            <Sparkle className="h-3 w-3" /> A new way to celebrate
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[3.4rem] leading-[1.02] sm:text-7xl lg:text-[5.5rem]"
          >
            Not just a gift.
            <span className="mt-1 block font-script text-gold">A whole feeling.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">
            Personalised websites for birthdays, anniversaries, Rakhi, Diwali and every moment you want to make unforgettable.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/templates" className="btn-dark px-8 py-4 text-base">
              Explore Templates <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#how" className="btn-soft px-7 py-4 text-base">How it works</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatars.map((c, i) => (
                <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-cream text-xs font-semibold ${c}`}>
                  {"APKN"[i]}
                </span>
              ))}
            </div>
            <div className="text-xs text-charcoal/70">
              <div className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-butter text-butter" />)}</div>
              Loved by happy gifters
            </div>
          </motion.div>

          <p className="mt-7 -rotate-2 font-hand text-2xl text-coral">These are not just templates. They are feelings.</p>
        </div>

        {/* visual */}
        <div className="relative mx-auto h-[500px] w-full max-w-md md:h-[600px]">
          {FLOATERS.map(({ C, cls, d }, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute z-0 ${cls}`}
              animate={{ y: [0, -14, 0], rotate: [0, 8, -6, 0] }}
              transition={{ duration: 6 + i, delay: d, repeat: Infinity, ease: "easeInOut" }}
            >
              <C className="h-full w-full" />
            </motion.div>
          ))}

          {b && (
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: -11 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute left-0 top-24 z-[1] aspect-[4/5] w-[46%] overflow-hidden rounded-3xl border-4 border-white shadow-lift"
            >
              <Image src={b.cover_image} alt={b.title} fill sizes="200px" className="object-cover" />
            </motion.div>
          )}
          {c && (
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 10 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute right-0 top-36 z-[1] aspect-[4/5] w-[46%] overflow-hidden rounded-3xl border-4 border-white shadow-lift"
            >
              <Image src={c.cover_image} alt={c.title} fill sizes="200px" className="object-cover" />
            </motion.div>
          )}

          {phone && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{ opacity: { delay: 0.3, duration: 0.6 }, y: { delay: 1, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute left-1/2 top-0 z-10 aspect-[9/18.5] w-[56%] -translate-x-1/2 overflow-hidden rounded-[2.4rem] border-[7px] border-charcoal bg-charcoal shadow-lift"
            >
              <Image src={phone} alt="Template preview" fill priority sizes="260px" className="object-cover" />
              <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-charcoal" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-10 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-3 pr-5 shadow-lift backdrop-blur-xl"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral"><Bell className="h-5 w-5" /></span>
            <span className="text-xs leading-snug"><b className="font-medium">Priya opened your surprise</b><br /><span className="text-charcoal/55">and she is smiling</span></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute right-0 top-10 z-20 rounded-full bg-butter px-4 py-2 text-xs font-semibold shadow-soft"
          >
            With music
          </motion.div>
        </div>
      </div>
    </section>
  );
}
