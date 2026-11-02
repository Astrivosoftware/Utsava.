"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ADMIN_COOKIE, sign } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { lines, slugify } from "@/lib/utils";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";


async function requireAdmin() {
  const c = cookies().get(ADMIN_COOKIE)?.value;
  if (!process.env.ADMIN_SECRET || !c || c !== (await sign("admin"))) redirect("/admin/login");
}

export async function login(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !process.env.ADMIN_SECRET || (await sign(pw)) !== (await sign(expected))) {
    redirect("/admin/login?error=1");
  }
  cookies().set(ADMIN_COOKIE, await sign("admin"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await requireAdmin();
  if (!ORDER_STATUSES.includes(status)) return;
  await db().collection("orders").doc(id).update({ status });
  revalidatePath("/admin");
}

const optInt = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.coerce.number().int().min(0).optional()
);

const templateSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(2, "Category is required"),
  tagline: z.string().trim().optional(),
  description: z.string().trim().optional(),
  price: z.coerce.number().int().min(0),
  old_price: optInt,
  with_music_price: z.coerce.number().int().min(0),
  without_music_price: z.coerce.number().int().min(0),
  demo_url: z.string().trim().optional(),
  rating: z.coerce.number().min(0).max(5),
});

async function uploadFile(file: File): Promise<string> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const preset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) {
    throw new Error("Image upload is not set up. Add Cloudinary keys, or paste image URLs instead.");
  }
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "utsava");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(`Upload failed: ${json?.error?.message ?? res.status}`);
  return json.secure_url as string;
}

export async function saveTemplate(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const p = templateSchema.safeParse(Object.fromEntries(formData));
  if (!p.success) throw new Error(p.error.issues[0]?.message ?? "Invalid form");
  const v = p.data;
  const slug = slugify(v.slug || v.title);

  let cover = String(formData.get("cover_url") ?? "").trim();
  const coverFile = formData.get("cover_file");
  if (coverFile instanceof File && coverFile.size > 0) cover = await uploadFile(coverFile);
  if (!cover) throw new Error("Add a cover image (upload or URL)");

  const screenshots = lines(String(formData.get("screenshots_text") ?? ""));
  for (const f of formData.getAll("screenshot_files")) {
    if (f instanceof File && f.size > 0) screenshots.push(await uploadFile(f));
  }

  const row = {
    title: v.title,
    slug,
    category: v.category,
    tagline: v.tagline || null,
    description: v.description || null,
    price: v.price,
    old_price: v.old_price ?? null,
    with_music_price: v.with_music_price,
    without_music_price: v.without_music_price,
    cover_image: cover,
    screenshots,
    demo_url: v.demo_url || null,
    features: lines(String(formData.get("features_text") ?? "")),
    rating: v.rating,
    is_popular: formData.get("is_popular") === "on",
    is_new: formData.get("is_new") === "on",
  };

  const dup = await db().collection("templates").where("slug", "==", slug).get();
  if (dup.docs.some((d) => d.id !== id)) throw new Error("Another template already uses this slug");

  if (id) await db().collection("templates").doc(id).update(row);
  else await db().collection("templates").add({ ...row, created_at: new Date().toISOString() });

  revalidatePath("/");
  revalidatePath("/templates");
  revalidatePath(`/templates/${slug}`);
  revalidatePath("/admin");
  redirect("/admin?tab=templates");
}

export async function deleteTemplate(id: string) {
  await requireAdmin();
  await db().collection("templates").doc(id).delete();
  revalidatePath("/");
  revalidatePath("/templates");
  revalidatePath("/admin");
}
