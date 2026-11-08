// Seeds 8 sample templates into Firestore. Safe to re-run (doc id = slug), it overwrites these 8 only.
// Run: npm run seed   (needs Node 20.6+ and .env.local filled)
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function loadPrivateKey() {
  const b64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
  let key = b64 ? Buffer.from(b64, "base64").toString("utf8") : process.env.FIREBASE_PRIVATE_KEY ?? "";
  return key.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID?.trim(),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim(),
    privateKey: loadPrivateKey(),
  }),
});
const db = getFirestore();

const FEATURES = [
  "Takes 2 mins to order",
  "Works on any phone",
  "Shareable with one link",
  "Personalised with your photos and message",
];

// [slug, title, category, tagline, description, withMusic, withoutMusic, oldPrice, popular, new, rating]
const ROWS = [
  ["timeless-love", "Timeless Love", "Anniversary", "A love story told in scrolls and soft light",
    "A romantic scrolling story with your photos, a love letter and a countdown to your next date. Made to be opened together, on any phone.",
    599, 449, 899, true, false, 4.8],
  ["birthday-bliss", "Birthday Bliss", "Birthday", "Candles, confetti and a message that lands",
    "A playful birthday page with a candle-blowing moment, photo cards and a heartfelt note they can revisit all year.",
    349, 249, 499, true, false, 4.9],
  ["rakhi-bond", "Rakhi Bond", "Rakhi", "For the one who always has your back",
    "A warm Rakhi page with a digital rakhi tie, shared memories and a promise note for your brother or sister.",
    349, 249, 499, true, false, 4.7],
  ["diwali-delight", "Diwali Delight", "Festive", "Light a diya for someone special",
    "A glowing Diwali greeting with animated diyas, rangoli accents and a personal wish for family and friends.",
    349, 249, 499, true, false, 4.8],
  ["will-you-marry-me", "Will You Marry Me", "Proposal", "Ask the big question, beautifully",
    "A cinematic proposal page that walks through your story and ends with one question and a very hard-to-refuse button.",
    599, 449, 899, false, true, 4.9],
  ["best-friends-forever", "Best Friends Forever", "Friendship", "Inside jokes, polaroids and one big thank you",
    "A scrapbook-style page for your best friend with photo polaroids, a memory wall and a note only they will understand.",
    299, 199, 399, false, true, 4.7],
  ["be-mine-forever", "Be Mine Forever", "Valentine's", "Say it softly, say it with a website",
    "A blush-and-rose Valentine's page with floating hearts, love notes that unlock one by one and a closing surprise.",
    449, 349, 699, false, false, 4.6],
  ["our-story", "Our Story", "Anniversary", "Every chapter of you and me",
    "A timeline page that turns your milestones into chapters, with photos, dates and a message for the years ahead.",
    499, 399, 799, false, true, 4.8],
];

const TEMPLATES = ROWS.map(([slug, title, category, tagline, description, withMusic, withoutMusic, oldPrice, popular, isNew, rating]) => ({
  title,
  slug,
  category,
  tagline,
  description,
  price: withMusic,
  old_price: oldPrice,
  with_music_price: withMusic,
  without_music_price: withoutMusic,
  cover_image: `/covers/${slug}.svg`,
  screenshots: [`/covers/${slug}-1.svg`, `/covers/${slug}-2.svg`],
  demo_url: `https://example.com/demo/${slug}`,
  features: FEATURES,
  rating,
  is_popular: popular,
  is_new: isNew,
}));

const now = Date.now();
for (const [i, t] of TEMPLATES.entries()) {
  await db.collection("templates").doc(t.slug).set({ ...t, created_at: new Date(now - i * 1000).toISOString() });
  console.log("seeded", t.slug, `₹${t.with_music_price}/₹${t.without_music_price}`);
}
console.log("Done.");
