import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center">
      <h1 className="font-display text-4xl">Template not found</h1>
      <p className="mt-2 text-charcoal/60">It may have been removed. Browse the rest of the collection.</p>
      <Link href="/templates" className="btn-dark mt-6">See all templates</Link>
    </div>
  );
}
