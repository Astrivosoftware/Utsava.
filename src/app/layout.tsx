import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontScript, fontSans, fontHand } from "@/lib/fonts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FFF9F1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontScript.variable} ${fontSans.variable} ${fontHand.variable}`}
    >
      <body className="bg-cream font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
