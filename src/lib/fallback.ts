import type { Template } from "./types";

// Shown only in development when Firestore is empty or not connected yet.
export const FALLBACK_TEMPLATES = [
  {
    "title": "Timeless Love",
    "slug": "timeless-love",
    "category": "Anniversary",
    "tagline": "A love story told in scrolls and soft light",
    "description": "A romantic scrolling story with your photos, a love letter and a countdown to your next date. Made to be opened together, on any phone.",
    "price": 1499,
    "old_price": 2499,
    "with_music_price": 1499,
    "without_music_price": 1199,
    "cover_image": "/covers/timeless-love.svg",
    "screenshots": [
      "/covers/timeless-love-1.svg",
      "/covers/timeless-love-2.svg"
    ],
    "demo_url": "https://example.com/demo/timeless-love",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.8,
    "is_popular": true,
    "is_new": false,
    "id": "timeless-love",
    "created_at": "2026-10-08T10:00:00.000Z"
  },
  {
    "title": "Birthday Bliss",
    "slug": "birthday-bliss",
    "category": "Birthday",
    "tagline": "Candles, confetti and a message that lands",
    "description": "A playful birthday page with a candle-blowing moment, photo cards and a heartfelt note they can revisit all year.",
    "price": 999,
    "old_price": 1499,
    "with_music_price": 999,
    "without_music_price": 799,
    "cover_image": "/covers/birthday-bliss.svg",
    "screenshots": [
      "/covers/birthday-bliss-1.svg",
      "/covers/birthday-bliss-2.svg"
    ],
    "demo_url": "https://example.com/demo/birthday-bliss",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.9,
    "is_popular": true,
    "is_new": false,
    "id": "birthday-bliss",
    "created_at": "2026-10-07T10:00:00.000Z"
  },
  {
    "title": "Rakhi Bond",
    "slug": "rakhi-bond",
    "category": "Rakhi",
    "tagline": "For the one who always has your back",
    "description": "A warm Rakhi page with a digital rakhi tie, shared memories and a promise note for your brother or sister.",
    "price": 999,
    "old_price": 1499,
    "with_music_price": 999,
    "without_music_price": 799,
    "cover_image": "/covers/rakhi-bond.svg",
    "screenshots": [
      "/covers/rakhi-bond-1.svg",
      "/covers/rakhi-bond-2.svg"
    ],
    "demo_url": "https://example.com/demo/rakhi-bond",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.7,
    "is_popular": true,
    "is_new": false,
    "id": "rakhi-bond",
    "created_at": "2026-10-06T10:00:00.000Z"
  },
  {
    "title": "Diwali Delight",
    "slug": "diwali-delight",
    "category": "Festive",
    "tagline": "Light a diya for someone special",
    "description": "A glowing Diwali greeting with animated diyas, rangoli accents and a personal wish for family and friends.",
    "price": 999,
    "old_price": 1499,
    "with_music_price": 999,
    "without_music_price": 799,
    "cover_image": "/covers/diwali-delight.svg",
    "screenshots": [
      "/covers/diwali-delight-1.svg",
      "/covers/diwali-delight-2.svg"
    ],
    "demo_url": "https://example.com/demo/diwali-delight",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.8,
    "is_popular": true,
    "is_new": false,
    "id": "diwali-delight",
    "created_at": "2026-10-05T10:00:00.000Z"
  },
  {
    "title": "Will You Marry Me",
    "slug": "will-you-marry-me",
    "category": "Proposal",
    "tagline": "Ask the big question, beautifully",
    "description": "A cinematic proposal page that walks through your story and ends with one question and a very hard-to-refuse button.",
    "price": 1299,
    "old_price": 1999,
    "with_music_price": 1299,
    "without_music_price": 999,
    "cover_image": "/covers/will-you-marry-me.svg",
    "screenshots": [
      "/covers/will-you-marry-me-1.svg",
      "/covers/will-you-marry-me-2.svg"
    ],
    "demo_url": "https://example.com/demo/will-you-marry-me",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.9,
    "is_popular": false,
    "is_new": true,
    "id": "will-you-marry-me",
    "created_at": "2026-10-04T10:00:00.000Z"
  },
  {
    "title": "Best Friends Forever",
    "slug": "best-friends-forever",
    "category": "Friendship",
    "tagline": "Inside jokes, polaroids and one big thank you",
    "description": "A scrapbook-style page for your best friend with photo polaroids, a memory wall and a note only they will understand.",
    "price": 799,
    "old_price": 1199,
    "with_music_price": 799,
    "without_music_price": 599,
    "cover_image": "/covers/best-friends-forever.svg",
    "screenshots": [
      "/covers/best-friends-forever-1.svg",
      "/covers/best-friends-forever-2.svg"
    ],
    "demo_url": "https://example.com/demo/best-friends-forever",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.7,
    "is_popular": false,
    "is_new": true,
    "id": "best-friends-forever",
    "created_at": "2026-10-03T10:00:00.000Z"
  },
  {
    "title": "Be Mine Forever",
    "slug": "be-mine-forever",
    "category": "Valentine's",
    "tagline": "Say it softly, say it with a website",
    "description": "A blush-and-rose Valentine's page with floating hearts, love notes that unlock one by one and a closing surprise.",
    "price": 1199,
    "old_price": 1799,
    "with_music_price": 1199,
    "without_music_price": 899,
    "cover_image": "/covers/be-mine-forever.svg",
    "screenshots": [
      "/covers/be-mine-forever-1.svg",
      "/covers/be-mine-forever-2.svg"
    ],
    "demo_url": "https://example.com/demo/be-mine-forever",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.6,
    "is_popular": false,
    "is_new": false,
    "id": "be-mine-forever",
    "created_at": "2026-10-02T10:00:00.000Z"
  },
  {
    "title": "Our Story",
    "slug": "our-story",
    "category": "Anniversary",
    "tagline": "Every chapter of you and me",
    "description": "A timeline page that turns your milestones into chapters, with photos, dates and a message for the years ahead.",
    "price": 1299,
    "old_price": 1999,
    "with_music_price": 1299,
    "without_music_price": 999,
    "cover_image": "/covers/our-story.svg",
    "screenshots": [
      "/covers/our-story-1.svg",
      "/covers/our-story-2.svg"
    ],
    "demo_url": "https://example.com/demo/our-story",
    "features": [
      "Takes 2 mins to order",
      "Works on any phone",
      "Shareable with one link",
      "Personalised with your photos and message"
    ],
    "rating": 4.8,
    "is_popular": false,
    "is_new": true,
    "id": "our-story",
    "created_at": "2026-10-01T10:00:00.000Z"
  }
] as Template[];
