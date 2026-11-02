"use server";
import { db } from "@/lib/firebase";
import { orderSchema, type OrderInput } from "@/lib/validation";
import { sendOrderEmails } from "@/lib/email";
import { lines } from "@/lib/utils";

export type OrderResult = { ok: true; id: string } | { ok: false; error: string };

export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const v = parsed.data;
  if (v.company) return { ok: false, error: "Something went wrong." }; // honeypot

  try {
    const snap = await db().collection("templates").where("slug", "==", v.templateSlug).limit(1).get();
    const doc = snap.docs[0];
    if (!doc) {
      return {
        ok: false,
        error:
          process.env.NODE_ENV !== "production"
            ? "Template not found in Firestore. Run `npm run seed` first."
            : "That template is no longer available.",
      };
    }
    const t = doc.data() as { title: string; with_music_price: number; without_music_price: number };

    // price is always calculated on the server
    const amount = v.musicOption === "with" ? t.with_music_price : t.without_music_price;
    const photoLinks = lines(v.photoLinks).slice(0, 10);

    const ref = await db().collection("orders").add({
      template_id: doc.id,
      template_title: t.title,
      customer_name: v.customerName,
      email: v.email,
      whatsapp: v.whatsapp,
      music_option: v.musicOption,
      amount,
      recipient_name: v.recipientName,
      occasion_date: v.occasionDate,
      message: v.message,
      photo_links: photoLinks,
      status: "New",
      created_at: new Date().toISOString(),
    });

    // Order is saved; email failures must never block the customer.
    await sendOrderEmails({
      orderId: ref.id,
      templateTitle: t.title,
      musicLabel: v.musicOption === "with" ? "With Music" : "Without Music",
      amount,
      customerName: v.customerName,
      email: v.email,
      whatsapp: v.whatsapp,
      recipientName: v.recipientName,
      occasionDate: v.occasionDate,
      message: v.message,
      photoLinks,
    }).catch((e) => console.error("sendOrderEmails", e));

    return { ok: true, id: ref.id };
  } catch (e) {
    console.error("createOrder", e);
    const detail = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error:
        process.env.NODE_ENV !== "production"
          ? `Firestore error: ${detail.slice(0, 200)}`
          : "Could not save your order. Please try again.",
    };
  }
}