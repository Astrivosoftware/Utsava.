import { Sparkle } from "./Decor";

const WORDS = ["Birthdays", "Anniversaries", "Rakhi", "Diwali", "Proposals", "Friendship Day", "Valentine's", "Little surprises"];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden}>
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-8 font-display text-2xl md:text-3xl">
          {w}
          <Sparkle className="h-4 w-4 text-butter" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden py-8">
      <div className="marquee-wrap -rotate-1 scale-[1.03] overflow-hidden bg-charcoal py-4 text-cream shadow-lift">
        <div className="flex w-max animate-marquee">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
