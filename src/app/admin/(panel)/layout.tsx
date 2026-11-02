import Link from "next/link";
import { logout } from "@/app/actions/admin";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Admin", robots: { index: false } };

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Logo className="text-2xl" />
            <span className="rounded-full bg-charcoal px-3 py-1 text-xs text-cream">Admin</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:text-gold" target="_blank">View site</Link>
            <form action={logout}><button className="btn-soft px-4 py-2">Log out</button></form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
