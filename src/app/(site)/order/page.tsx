import type { Metadata } from "next";
import { getTemplates } from "@/lib/data";
import { OrderForm } from "@/components/OrderForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Place your order" };

export default async function OrderPage({
  searchParams,
}: {
  searchParams: { template?: string; music?: string };
}) {
  const templates = await getTemplates();
  const list = templates.map(({ slug, title, with_music_price, without_music_price }) => ({
    slug, title, with_music_price, without_music_price,
  }));
  const defaultSlug = list.find((t) => t.slug === searchParams.template)?.slug ?? list[0]?.slug ?? "";
  const defaultMusic = searchParams.music === "without" ? "without" : "with";

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl">Tell us your story</h1>
      <p className="mb-8 mt-2 text-charcoal/60">A few details and we will start building your surprise.</p>
      {list.length ? (
        <OrderForm templates={list} defaultSlug={defaultSlug} defaultMusic={defaultMusic} />
      ) : (
        <p className="card p-6">No templates are available right now. Please check back soon.</p>
      )}
    </section>
  );
}
