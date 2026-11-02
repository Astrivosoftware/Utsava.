export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-12 w-64 animate-pulse rounded-xl bg-blush/60" />
      <div className="mt-8 h-12 animate-pulse rounded-xl bg-blush/40" />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-[4/3] animate-pulse bg-blush/50" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-charcoal/10" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-charcoal/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
