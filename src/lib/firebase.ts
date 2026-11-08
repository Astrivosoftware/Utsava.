import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/** Accepts the private key in any common format (quotes, \n, real newlines, or base64). */
function loadPrivateKey(): string {
  const b64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
  let key = b64 ? Buffer.from(b64, "base64").toString("utf8") : process.env.FIREBASE_PRIVATE_KEY ?? "";
  key = key.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
  return key;
}

/** Firestore (Admin SDK, server only). Works on the free Spark plan. */
export function db() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID?.trim(),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim(),
        privateKey: loadPrivateKey(),
      }),
    });
  }
  return getFirestore();
}
