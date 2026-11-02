export type Template = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string | null;
  description: string | null;
  price: number;
  old_price: number | null;
  with_music_price: number;
  without_music_price: number;
  cover_image: string;
  screenshots: string[];
  demo_url: string | null;
  features: string[];
  rating: number;
  is_popular: boolean;
  is_new: boolean;
  created_at: string;
};

export type OrderStatus = "New" | "In progress" | "Delivered";
export const ORDER_STATUSES: OrderStatus[] = ["New", "In progress", "Delivered"];

export type Order = {
  id: string;
  template_id: string | null;
  template_title: string | null;
  customer_name: string;
  email: string;
  whatsapp: string;
  music_option: "with" | "without";
  amount: number;
  recipient_name: string;
  occasion_date: string;
  message: string;
  photo_links: string[];
  status: OrderStatus;
  created_at: string;
};
