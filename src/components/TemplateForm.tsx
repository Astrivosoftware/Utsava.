import { saveTemplate } from "@/app/actions/admin";
import { CATEGORIES } from "@/lib/site";
import type { Template } from "@/lib/types";

function F({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

export function TemplateForm({ t }: { t?: Template }) {
  return (
    <form action={saveTemplate} className="card grid gap-4 p-6 sm:grid-cols-2">
      {t && <input type="hidden" name="id" value={t.id} />}

      <F label="Title"><input name="title" required defaultValue={t?.title} className="input" /></F>
      <F label="Slug (auto if empty)"><input name="slug" defaultValue={t?.slug} className="input" placeholder="birthday-bliss" /></F>

      <F label="Category">
        <input name="category" list="cats" required defaultValue={t?.category} className="input" />
        <datalist id="cats">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
      </F>
      <F label="Tagline"><input name="tagline" defaultValue={t?.tagline ?? ""} className="input" /></F>

      <F label="Description" className="sm:col-span-2">
        <textarea name="description" defaultValue={t?.description ?? ""} className="input min-h-[90px]" />
      </F>

      <F label="Card price (₹)"><input name="price" type="number" min={0} required defaultValue={t?.price} className="input" /></F>
      <F label="Old price (₹)"><input name="old_price" type="number" min={0} defaultValue={t?.old_price ?? ""} className="input" /></F>
      <F label="With music price (₹)"><input name="with_music_price" type="number" min={0} required defaultValue={t?.with_music_price} className="input" /></F>
      <F label="Without music price (₹)"><input name="without_music_price" type="number" min={0} required defaultValue={t?.without_music_price} className="input" /></F>

      <F label="Demo link"><input name="demo_url" type="url" defaultValue={t?.demo_url ?? ""} className="input" /></F>
      <F label="Rating (0 to 5)"><input name="rating" type="number" step="0.1" min={0} max={5} required defaultValue={t?.rating ?? 4.8} className="input" /></F>

      <F label="Cover image URL"><input name="cover_url" defaultValue={t?.cover_image ?? ""} className="input" /></F>
      <F label="Or upload cover"><input name="cover_file" type="file" accept="image/*" className="input" /></F>

      <F label="Screenshot URLs (one per line)" className="sm:col-span-2">
        <textarea name="screenshots_text" defaultValue={(t?.screenshots ?? []).join("\n")} className="input min-h-[90px]" />
      </F>
      <F label="Upload screenshots (multiple)" className="sm:col-span-2">
        <input name="screenshot_files" type="file" accept="image/*" multiple className="input" />
      </F>

      <F label="Feature chips (one per line)" className="sm:col-span-2">
        <textarea name="features_text" defaultValue={(t?.features ?? []).join("\n")} className="input min-h-[80px]" />
      </F>

      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_popular" defaultChecked={t?.is_popular} className="h-4 w-4 accent-gold" /> Popular</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_new" defaultChecked={t?.is_new} className="h-4 w-4 accent-gold" /> New</label>

      <div className="sm:col-span-2">
        <button className="btn-dark">{t ? "Save changes" : "Add template"}</button>
      </div>
    </form>
  );
}
