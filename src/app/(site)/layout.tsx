import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoBanner } from "@/components/DemoBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
