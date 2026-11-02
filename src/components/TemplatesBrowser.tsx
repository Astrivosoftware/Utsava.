"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Template } from "@/lib/types";
import { CategoryChips } from "./CategoryChips";
import { TemplateCard } from "./TemplateCard";

type Sort = "popular" | "low" | "new";

export function TemplatesBrowser({ templates, initialCategory }: { templates: Template[]; initialCategory: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    const r = templates.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        `${t.title} ${t.category} ${t.tagline ?? ""}`.toLowerCase().includes(term)
    );
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    else if (sort === "new")
      r.sort((a, b) => Number(b.is_new) - Number(a.is_new) || +new Date(b.created_at) - +new Date(a.created_at));
    else r.sort((a, b) => Number(b.is_popular) - Number(a.is_popular) || b.rating - a.rating);
    return r;
  }, [templates, q, cat, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search birthday, Rakhi, proposal..." className="input pl-11" aria-label="Search templates" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input sm:w-52" aria-label="Sort templates">
          <option value="popular">Popular</option>
          <option value="low">Price: low to high</option>
          <option value="new">Newest</option>
        </select>
      </div>

      <div className="mt-4">
        <CategoryChips value={cat} onSelect={setCat} />
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-2xl">No templates found</p>
          <p className="mt-2 text-sm text-charcoal/60">Try another word or pick a different occasion.</p>
          <button className="btn-soft mt-5" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((t, i) => <TemplateCard key={t.id} t={t} priority={i < 4} />)}
        </div>
      )}
    </div>
  );
}
