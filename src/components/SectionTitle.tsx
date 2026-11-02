export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/60">{sub}</p>}
    </div>
  );
}
