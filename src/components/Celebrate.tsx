"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Celebrate() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#FADADD", "#FFD56B", "#FF7A7A", "#D6E9DB", "#E9D5FF", "#B8862B"];
    const end = Date.now() + 1800;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);
  return null;
}
