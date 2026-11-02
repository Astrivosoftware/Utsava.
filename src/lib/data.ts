import { db } from "./firebase";
import { FALLBACK_TEMPLATES } from "./fallback";
import type { Template } from "./types";

const DEV = process.env.NODE_ENV !== "production";

export async function getTemplates(): Promise<Template[]> {
  try {
    const snap = await db().collection("templates").orderBy("created_at", "desc").get();
    if (snap.empty && DEV) return FALLBACK_TEMPLATES;
    return snap.docs.map((d) => ({ ...d.data(), id: d.id })) as unknown as Template[];
  } catch (e) {
    console.error("getTemplates", e);
    return DEV ? FALLBACK_TEMPLATES : [];
  }
}

export async function getTemplate(slug: string): Promise<Template | null> {
  try {
    const snap = await db().collection("templates").where("slug", "==", slug).limit(1).get();
    const d = snap.docs[0];
    if (d) return { ...d.data(), id: d.id } as unknown as Template;
  } catch (e) {
    console.error("getTemplate", e);
  }
  return DEV ? FALLBACK_TEMPLATES.find((t) => t.slug === slug) ?? null : null;
}

/** Used by the dev-only banner to show why templates are missing. */
export async function dbStatus(): Promise<{ ok: boolean; count: number; error?: string }> {
  try {
    const s = await db().collection("templates").limit(1).get();
    return { ok: true, count: s.size };
  } catch (e) {
    return { ok: false, count: 0, error: e instanceof Error ? e.message : String(e) };
  }
}
