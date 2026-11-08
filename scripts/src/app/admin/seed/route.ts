import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, sign } from "@/lib/auth";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

// [slug, with music, without music, old price]
const PRICES: [string, number, number, number][] = [
  ["timeless-love", 599, 449, 899],
  ["birthday-bliss", 349, 249, 499],
  ["rakhi-bond", 349, 249, 499],
  ["diwali-delight", 349, 249, 499],
  ["will-you-marry-me", 599, 449, 899],
  ["best-friends-forever", 299, 199, 399],
  ["be-mine-forever", 449, 349, 699],
  ["our-story", 499, 399, 799],
];

/** Admin only: open /admin/seed once while logged in to apply the 8 sample prices. Delete this file afterwards. */
export async function GET() {
  const c = cookies().get(ADMIN_COOKIE)?.value;
  if (!process.env.ADMIN_SECRET || !c || c !== (await sign("admin"))) {
    return NextResponse.json({ error: "Log in at /admin first" }, { status: 401 });
  }

  const batch = db().batch();
  const missing: string[] = [];
  for (const [slug, withMusic, withoutMusic, oldPrice] of PRICES) {
    const ref = db().collection("templates").doc(slug);
    if (!(await ref.get()).exists) {
      missing.push(slug);
      continue;
    }
    batch.update(ref, {
      price: withMusic,
      with_music_price: withMusic,
      without_music_price: withoutMusic,
      old_price: oldPrice,
    });
  }
  await batch.commit();

  revalidatePath("/");
  revalidatePath("/templates", "layout");
  return NextResponse.json({ updated: PRICES.length - missing.length, missing });
}
