import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplate } from "@/lib/data";
import { TemplateDetail } from "@/components/TemplateDetail";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const t = await getTemplate(params.slug);
  if (!t) return { title: "Template not found" };
  const description = t.tagline ?? t.description ?? undefined;
  return {
    title: t.title,
    description,
    alternates: { canonical: `/templates/${t.slug}` },
    openGraph: { title: t.title, description, images: [{ url: t.cover_image }] },
    twitter: { card: "summary_large_image", title: t.title, description, images: [t.cover_image] },
  };
}

export default async function TemplatePage({ params }: { params: { slug: string } }) {
  const t = await getTemplate(params.slug);
  if (!t) notFound();
  return <TemplateDetail t={t} />;
}
