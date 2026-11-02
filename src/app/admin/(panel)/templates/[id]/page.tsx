import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { TemplateForm } from "@/components/TemplateForm";
import type { Template } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditTemplate({ params }: { params: { id: string } }) {
  const doc = await db().collection("templates").doc(params.id).get();
  if (!doc.exists) notFound();
  const t = { ...doc.data(), id: doc.id } as unknown as Template;
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin?tab=templates" className="text-sm text-gold hover:underline">Back to templates</Link>
      <h1 className="mb-6 mt-2 font-display text-3xl">Edit template</h1>
      <TemplateForm t={t} />
    </div>
  );
}
