import Link from "next/link";

export function Logo({ className = "text-3xl" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Utsava home" className={`font-display tracking-tight ${className}`}>
      utsava<span className="text-gold">.</span>
    </Link>
  );
}
