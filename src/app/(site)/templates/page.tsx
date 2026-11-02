import type { Metadata } from "next";
import { getTemplates } from "@/lib/data";
import { TemplatesBrowser } from "@/components/TemplatesBrowser";
import { Flower, Heart, Sparkle } from "@/components/Decor";
import { CATEGORIES } from "@/lib/site";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Templates",
  description: "Browse personalised website templates for birthdays, anniversaries, Rakhi, Diwali, proposals and more.",
};

export default async function TemplatesPage({ searchParams }: { searchParams: { category?: string } }) {
  const templates = await getTemplates();
  const c = searchParams.category;
  const initial = c && (CATEGORIES as readonly string[]).includes(c) ? c : "All";
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-cream to-lilac/60 px-6 py-10 md:px-12 md:py-14">
        <Flower className="absolute -right-6 -top-6 h-32 w-32 rotate-12 text-coral/40" />
        <Heart className="absolute bottom-5 right-24 h-9 w-9 text-coral/50" />
        <Sparkle className="absolute right-1/3 top-6 h-6 w-6 text-gold" />
        <p className="font-hand text-2xl text-coral">find your feeling</p>
        <h1 className="font-display text-4xl md:text-6xl">All templates</h1>
        <p className="mt-2 max-w-md text-charcoal/65">Pick one, add your story, and share the link.</p>
      </div>
      <TemplatesBrowser templates={templates} initialCategory={initial} />
    </section>
  );
}
