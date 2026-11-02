import type { Metadata } from "next";
import Link from "next/link";
import { Celebrate } from "@/components/Celebrate";
import { Heart } from "@/components/Decor";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Order placed", robots: { index: false } };

export default function Success({ searchParams }: { searchParams: { id?: string } }) {
  const ref = searchParams.id?.slice(0, 8).toUpperCase();
  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center">
      <Celebrate />
      <Heart className="mx-auto h-14 w-14 text-coral" />
      <h1 className="mt-6 font-display text-4xl">Order placed!</h1>
      <p className="mt-3 text-charcoal/70">
        Thank you. We sent a confirmation to your email and will message you on WhatsApp shortly to begin your surprise.
      </p>
      {ref && <p className="mt-4 text-sm text-charcoal/50">Order reference: <b>{ref}</b></p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/templates" className="btn-dark">Browse more templates</Link>
        {SITE.whatsapp && (
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-soft">Chat on WhatsApp</a>
        )}
      </div>
    </section>
  );
}
