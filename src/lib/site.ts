export const SITE = {
  name: "Utsava",
  tagline: "Moments Made Personal.",
  description:
    "Beautiful personalised websites for birthdays, anniversaries, Rakhi, Diwali, proposals and every special moment in between.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};

export const CATEGORIES = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Festive",
  "Proposal",
  "Friendship",
  "Valentine's",
] as const;

export const BASE_FEATURES = [
  "Takes 2 mins to order",
  "Works on any phone",
  "Shareable with one link",
];

export const STEPS = [
  { title: "Pick a template", text: "Browse by occasion and open the live demo to see exactly how it feels." },
  { title: "Tell us your story", text: "Share names, a date, a message and a few photo links. That is all we need." },
  { title: "Share the surprise", text: "We build it and send you a private link to give to someone special." },
];

// Placeholder reviews: replace with real customer quotes before launch.
export const TESTIMONIALS = [
  { name: "Aarohi S.", place: "Pune", text: "My sister cried happy tears. The page felt like it was made only for her.", tone: "bg-blush" },
  { name: "Karan M.", place: "Delhi", text: "Ordered at night, shared the link at midnight. Our anniversary was sorted in minutes.", tone: "bg-sage" },
  { name: "Neha P.", place: "Bhubaneswar", text: "The Rakhi page was so sweet. My brother kept replaying the music.", tone: "bg-lilac" },
];

export const FAQS = [
  { q: "How does ordering work?", a: "Choose a template, fill the order form and submit. We confirm by email and WhatsApp, then start building." },
  { q: "How do I pay?", a: "There is no online payment yet. After you order we share simple payment details on WhatsApp or email." },
  { q: "What do I need to share?", a: "Names, the occasion date, your message and optional photo links (Google Drive or Instagram links work)." },
  { q: "Will it work on every phone?", a: "Yes. Every template is built mobile-first and opens from a single link, with no app to install." },
  { q: "Can I add music?", a: "Yes. Pick the With Music option on the template page. Prices for both options are shown clearly." },
];
