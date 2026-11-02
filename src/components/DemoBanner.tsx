import { dbStatus } from "@/lib/data";

/** Development only: tells you exactly why templates are not coming from Firestore. */
export async function DemoBanner() {
  if (process.env.NODE_ENV === "production") return null;
  const s = await dbStatus();
  if (s.ok && s.count > 0) return null;
  return (
    <div className="bg-charcoal px-4 py-2 text-center text-xs text-cream">
      Demo mode:{" "}
      {s.ok
        ? "Firestore is connected but has no templates. Run `npm run seed`."
        : `Firestore is not connected (${(s.error ?? "").slice(0, 160)}). Check the FIREBASE_* values in .env.local.`}
    </div>
  );
}
