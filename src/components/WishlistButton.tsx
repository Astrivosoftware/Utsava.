"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const on = has(slug);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Save to wishlist"}
      className={cn("flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition hover:scale-105", className)}
    >
      <Heart className={cn("h-4 w-4 transition", on ? "fill-coral text-coral" : "text-charcoal/60")} />
    </motion.button>
  );
}
