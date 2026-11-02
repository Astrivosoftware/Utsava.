import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, CATEGORIES } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-charcoal/5 bg-white/60">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-14 md:grid-cols-3">
        <div>
          <Logo className="text-4xl" />
          <p className="mt-3 max-w-xs text-sm text-charcoal/60">{SITE.description}</p>
          <p className="mt-4 font-script text-xl text-gold">{SITE.tagline}</p>
        </div>
        <div>
          <h4 className="font-display text-xl">Occasions</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-charcoal/70">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link className="transition hover:text-gold" href={`/templates?category=${encodeURIComponent(c)}`}>{c}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl">Need help?</h4>
          <p className="mt-3 text-sm text-charcoal/70">Questions before you order? We reply fast.</p>
          {SITE.whatsapp && (
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-dark mt-4">
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
      <div aria-hidden className="select-none text-center font-display text-[24vw] leading-[0.8] text-charcoal/[0.045] md:text-[14rem]">
        utsava.
      </div>
      <div className="relative border-t border-charcoal/5 py-5 text-center text-xs text-charcoal/50">
        © {new Date().getFullYear()} Utsava. Made with love in India.
      </div>
    </footer>
  );
}
