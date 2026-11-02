// Edge-safe helpers (used by middleware and server actions)
export const ADMIN_COOKIE = "utsava_admin";

export async function sign(value: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
