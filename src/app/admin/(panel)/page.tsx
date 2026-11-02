import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { deleteTemplate } from "@/app/actions/admin";
import { StatusSelect } from "@/components/StatusSelect";
import { cn, inr } from "@/lib/utils";
import type { Order, Template } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab === "templates" ? "templates" : "orders";
  const [orderSnap, tplSnap] = await Promise.all([
    db().collection("orders").orderBy("created_at", "desc").get(),
    db().collection("templates").orderBy("created_at", "desc").get(),
  ]);
  const rows = orderSnap.docs.map((d) => ({ ...d.data(), id: d.id })) as unknown as Order[];
  const tpls = tplSnap.docs.map((d) => ({ ...d.data(), id: d.id })) as unknown as Template[];
  const count = (s: string) => rows.filter((o) => o.status === s).length;

  const tabCls = (on: boolean) =>
    cn("rounded-full px-5 py-2 text-sm font-medium transition", on ? "bg-charcoal text-cream" : "bg-white hover:bg-blush/60");

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {[["New", "bg-butter"], ["In progress", "bg-lilac"], ["Delivered", "bg-sage"]].map(([s, c]) => (
          <div key={s} className={`rounded-2xl p-4 ${c}`}>
            <div className="font-display text-3xl">{count(s)}</div>
            <div className="text-xs">{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2">
        <Link href="/admin" className={tabCls(tab === "orders")}>Orders</Link>
        <Link href="/admin?tab=templates" className={tabCls(tab === "templates")}>Templates</Link>
        {tab === "templates" && <Link href="/admin/templates/new" className="btn-dark ml-auto px-5 py-2.5">Add template</Link>}
      </div>

      {tab === "orders" ? (
        <div className="mt-5 space-y-4">
          {rows.length === 0 && <p className="card p-6 text-sm text-charcoal/60">No orders yet.</p>}
          {rows.map((o) => (
            <article key={o.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl">{o.template_title ?? "Deleted template"}</h3>
                  <p className="text-xs text-charcoal/50">
                    {new Date(o.created_at).toLocaleString("en-IN")} · {o.music_option === "with" ? "With music" : "Without music"} · {inr(o.amount)}
                  </p>
                </div>
                <StatusSelect id={o.id} status={o.status} />
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div><dt className="text-xs text-charcoal/50">Customer</dt><dd>{o.customer_name}</dd></div>
                <div><dt className="text-xs text-charcoal/50">Email</dt><dd><a className="text-gold hover:underline" href={`mailto:${o.email}`}>{o.email}</a></dd></div>
                <div><dt className="text-xs text-charcoal/50">WhatsApp</dt><dd><a className="text-gold hover:underline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${o.whatsapp.replace(/\D/g, "")}`}>{o.whatsapp}</a></dd></div>
                <div><dt className="text-xs text-charcoal/50">Recipient / date</dt><dd>{o.recipient_name} · {o.occasion_date}</dd></div>
              </dl>
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer text-gold">Message and photos</summary>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-cream p-3">{o.message}</p>
                {o.photo_links.length > 0 && (
                  <ul className="mt-2 list-disc pl-5">
                    {o.photo_links.map((l) => <li key={l}><a className="break-all text-gold hover:underline" href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>)}
                  </ul>
                )}
              </details>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {tpls.length === 0 && <p className="card p-6 text-sm text-charcoal/60">No templates yet. Add one or run the seed SQL.</p>}
          {tpls.map((t) => (
            <div key={t.id} className="card flex items-center gap-4 p-3">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-blush/40">
                <Image src={t.cover_image} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{t.title}</div>
                <div className="text-xs text-charcoal/50">
                  {t.category} · {inr(t.with_music_price)} / {inr(t.without_music_price)}
                  {t.is_popular && " · Popular"}{t.is_new && " · New"}
                </div>
              </div>
              <Link href={`/admin/templates/${t.id}`} className="btn-soft px-4 py-2">Edit</Link>
              <form action={deleteTemplate.bind(null, t.id)}>
                <button className="btn-soft px-4 py-2 text-maroon hover:bg-coral/20">Delete</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
