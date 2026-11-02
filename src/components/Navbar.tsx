"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/templates?category=Festive", label: "Occasions" },
  { href: "/#how", label: "How it works" },
  { href: "/#reviews", label: "Reviews" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { items } = useWishlist();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="relative mx-auto max-w-5xl rounded-full border border-white/70 bg-cream/75 shadow-soft backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between pl-6 pr-2">
          <Logo className="text-2xl" />
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="rounded-full px-4 py-2 text-charcoal/75 transition hover:bg-blush/60 hover:text-charcoal">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link href="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2.5 transition hover:bg-blush/60">
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-semibold text-white">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/templates" className="btn-dark hidden px-5 py-2.5 md:inline-flex">Get Started</Link>
            <button className="rounded-full p-2.5 md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-8 -bottom-px h-[2px] origin-left rounded bg-gradient-to-r from-coral via-butter to-gold" />
      </div>
      {open && (
        <nav className="card mx-auto mt-2 flex max-w-5xl flex-col gap-1 p-3 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm hover:bg-blush/50">
              {l.label}
            </Link>
          ))}
          <Link href="/templates" onClick={() => setOpen(false)} className="btn-dark mt-1">Get Started</Link>
        </nav>
      )}
    </header>
  );
}
