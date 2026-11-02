import Link from "next/link";
import { TemplateForm } from "@/components/TemplateForm";

export default function NewTemplate() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin?tab=templates" className="text-sm text-gold hover:underline">Back to templates</Link>
      <h1 className="mb-6 mt-2 font-display text-3xl">Add template</h1>
      <TemplateForm />
    </div>
  );
}
