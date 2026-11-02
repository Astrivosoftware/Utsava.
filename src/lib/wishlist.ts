"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "utsava:wishlist";
const EVT = "utsava:wishlist-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Free wishlist stored in the visitor's own browser (no login, no database). */
export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);

  return { items, has: (slug: string) => items.includes(slug), toggle };
}
