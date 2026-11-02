"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) =>
    track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" });

  const step = useCallback(
    (d: 1 | -1) => {
      setZoom(false);
      setOpen((o) => (o === null ? o : (o + d + images.length) % images.length));
    },
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <div>
      <div ref={track} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl shadow-soft">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => { setZoom(false); setOpen(i); }}
            aria-label={`Open image ${i + 1} of ${title}`}
            className="group relative aspect-[4/3] min-w-full snap-center bg-blush/40"
          >
            <Image
              src={src}
              alt={`${title} preview ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width:1024px) 100vw, 600px"
              className={i === 0 ? "object-cover" : "object-contain"}
            />
            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100 max-md:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn("relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition", active === i ? "border-gold" : "border-transparent opacity-70")}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/90 p-4"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white" onClick={() => setOpen(null)} aria-label="Close">
              <X />
            </button>
            {images.length > 1 && (
              <>
                <button className="absolute left-3 rounded-full bg-white/15 p-2 text-white" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">
                  <ChevronLeft />
                </button>
                <button className="absolute right-3 rounded-full bg-white/15 p-2 text-white" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">
                  <ChevronRight />
                </button>
              </>
            )}
            <motion.div
              key={open}
              initial={{ scale: 0.95 }}
              animate={{ scale: zoom ? 1.8 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={cn("relative h-[80vh] w-full max-w-3xl", zoom ? "cursor-zoom-out" : "cursor-zoom-in")}
              onClick={(e) => { e.stopPropagation(); setZoom((z) => !z); }}
            >
              <Image src={images[open]} alt={`${title} preview ${open + 1}`} fill sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
