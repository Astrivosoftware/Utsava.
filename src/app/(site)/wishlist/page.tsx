import type { Metadata } from "next";
import { getTemplates } from "@/lib/data";
import { WishlistView } from "@/components/WishlistView";

export const revalidate = 60;
export const metadata: Metadata = { title: "Your wishlist", robots: { index: false } };

export default async function WishlistPage() {
  const templates = await getTemplates();
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl">Your wishlist</h1>
      <p className="mb-8 mt-2 text-charcoal/60">Saved on this device. No login needed.</p>
      <WishlistView templates={templates} />
    </section>
  );
}
