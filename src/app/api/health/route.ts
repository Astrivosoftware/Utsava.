import { NextResponse } from "next/server";
import { dbStatus } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = await dbStatus();
  return NextResponse.json({
    ok: s.ok,
    count: s.count,
    hint: s.ok
      ? s.count > 0
        ? "All good"
        : "Firestore connected but empty: run npm run seed"
      : "Firestore connection failed: check FIREBASE_* env vars on Vercel",
  });
}
