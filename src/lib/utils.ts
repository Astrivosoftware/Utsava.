import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const discount = (price: number, old?: number | null) =>
  old && old > price ? Math.round((1 - price / old) * 100) : 0;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const lines = (s?: string | null) =>
  (s ?? "")
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
