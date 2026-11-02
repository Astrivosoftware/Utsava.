import Link from "next/link";
import { ArrowRight, Link2, LayoutTemplate, Music, PenLine, Send, Smartphone, Zap, Quote, Star } from "lucide-react";
import { getTemplates } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { OccasionTiles } from "@/components/OccasionTiles";
import { PopularCarousel } from "@/components/PopularCarousel";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Faq } from "@/components/Faq";
import { Flower, Heart, Sparkle } from "@/components/Decor";
import { TESTIMONIALS } from "@/lib/site";

export const revalidate = 60;

const STEPS = [
  { icon: LayoutTemplate, title: "Pick a template", text: "Browse by occasion and open the live demo to see exactly how it feels." },
  { icon: PenLine, title: "Tell us your story", text: "Share names, a date, a message and a few photo links. That is all we need." },
  { icon: Send, title: "Share the surprise", text: "We build it and send you a private link to give to someone special." },
];

const WHY = [
  { icon: Zap, title: "Made around your story", text: "Tell us the names, the date and the memories. We build the page. No app and no sign-up for the person you gift.", bg: "bg-butter/60", span: "md:col-span-2" },
  { icon: Smartphone, title: "Any phone", text: "Built mobile-first so it opens beautifully on every screen.", bg: "bg-sage" },
  { icon: Music, title: "Music, if you like", text: "Add a song that means something to you both.", bg: "bg-lilac" },
  { icon: Link2, title: "One link to share", text: "Send it on WhatsApp or Instagram with a single tap.", bg: "bg-blush", span: "md:col-span-2" },
];

export default async function Home() {
  const templates = await getTemplates();
  const popular = templates.filter((t) => t.is_popular);
  const shown = popular.length ? popular : templates.slice(0, 6);
  const counts = templates.reduce<Record<string, number>>((m, t) => ((m[t.category] = (m[t.category] ?? 0) + 1), m), {});

  return (
    <>
      <Hero templates={shown} />
      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle title="Every occasion, one place" sub="Pick the moment. We will help you make it feel personal." />
        <OccasionTiles counts={counts} />
      </section>

      <section className="bg-gradient-to-b from-transparent via-blush/40 to-transparent py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="font-hand text-2xl text-coral">fresh and loved</p>
                <h2 className="font-display text-3xl md:text-4xl">Popular templates</h2>
              </div>
              <Link href="/templates" className="btn-soft hidden px-5 py-2.5 sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <PopularCarousel templates={shown} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle title="Why people choose Utsava" />
        <div className="grid gap-4 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} className={w.span}>
              <div className={`group relative h-full overflow-hidden rounded-3xl p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${w.bg}`}>
                <w.icon className="absolute -bottom-5 -right-4 h-32 w-32 rotate-12 text-charcoal/10 transition duration-500 group-hover:rotate-0" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-soft"><w.icon className="h-6 w-6 text-gold" /></span>
                <h3 className="relative mt-5 font-display text-2xl">{w.title}</h3>
                <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-charcoal/70">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <SectionTitle title="How it works" sub="Three simple steps from idea to a link you can share." />
        <div className="relative grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-gold/40 md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush to-butter shadow-lift">
                  <s.icon className="h-8 w-8 text-maroon" />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal font-display text-sm text-cream">{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-charcoal/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <SectionTitle title="Words from happy gifters" />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className={`relative h-full rounded-3xl bg-white p-7 shadow-soft transition hover:rotate-0 ${i % 2 ? "md:rotate-1" : "md:-rotate-1"}`}>
                <Quote className="absolute right-5 top-5 h-10 w-10 text-blush" />
                <div className="flex">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-4 w-4 fill-butter text-butter" />)}</div>
                <blockquote className="mt-4 leading-relaxed text-charcoal/80">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg ${t.tone}`}>{t.name[0]}</span>
                  <span className="text-sm"><b className="font-medium">{t.name}</b><br /><span className="text-charcoal/50">{t.place}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-4xl md:text-5xl">Good to <span className="font-script text-gold">know</span></h2>
          <p className="mt-3 max-w-xs text-charcoal/65">Still curious? Message us before you order and we will help you pick the right one.</p>
          <p className="mt-6 -rotate-3 font-hand text-2xl text-coral">no silly questions!</p>
        </div>
        <Faq />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-lilac/70 to-butter/70 px-6 py-16 text-center shadow-lift">
            <Flower className="absolute -left-6 -top-6 h-28 w-28 rotate-12 text-coral/50" />
            <Heart className="absolute bottom-6 right-8 h-14 w-14 -rotate-12 text-coral/60" />
            <Sparkle className="absolute right-[18%] top-8 h-8 w-8 text-gold" />
            <Sparkle className="absolute bottom-10 left-[16%] h-6 w-6 text-white" />
            <h2 className="relative font-display text-4xl md:text-5xl">Someone is waiting for a surprise.</h2>
            <p className="relative mx-auto mt-3 max-w-md text-charcoal/70">Pick a template today and turn a simple wish into a whole feeling.</p>
            <Link href="/templates" className="btn-dark relative mt-8 px-9 py-4 text-base">Pick a template <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
