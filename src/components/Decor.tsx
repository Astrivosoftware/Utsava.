type P = { className?: string };

export const Heart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.8 1.2 5.6 3.3 1.8-2.1 3.5-3.3 5.6-3.3 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const Sparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0c.8 6.6 3.4 9.2 12 12-8.6 2.8-11.2 5.4-12 12-.8-6.6-3.4-9.2-12-12C8.6 9.2 11.2 6.6 12 0z" />
  </svg>
);

export const Flower = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <g fill="currentColor">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="12" cy="6.2" rx="3.4" ry="5" transform={`rotate(${r} 12 12)`} />
      ))}
    </g>
    <circle cx="12" cy="12" r="2.4" fill="#FFD56B" />
  </svg>
);

export const Leaf = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M3 21C3 9 11 3 21 3c0 10-6 18-18 18z" />
  </svg>
);
