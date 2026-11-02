"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Template } from "@/lib/types";
import { useWishlist } from "@/lib/wishlist";
import { TemplateCard } from "./TemplateCard";

export function WishlistView({ templates }: { templates: Template[] }) {
  const { items } = useWishlist();
  const saved = templates.filter((t) => items.includes(t.slug));
  if (saved.length === 0) {
    return (
      <div className="py-20 text-center">
        <Heart className="mx-auto h-10 w-10 text-coral/60" />
        <p className="mt-4 font-display text-2xl">Nothing saved yet</p>
        <p className="mt-2 text-sm text-charcoal/60">Tap the heart on any template to keep it here.</p>
        <Link href="/templates" className="btn-dark mt-6">Browse templates</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {saved.map((t) => <TemplateCard key={t.id} t={t} />)}
    </div>
  );
}
