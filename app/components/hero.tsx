import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  eyebrow: string;
  title: React.ReactNode; // ReactNode permite texto colorido (ex: <span className="text-green">)
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative bg-background-dark px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-blue via-dark-blue/90 to-dark-blue/50" />

      <div className="relative z-10 max-w-3xl">
        <p className="text-sm font-semibold tracking-widest text-green uppercase mb-4">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {title}
        </h1>
        <p className="text-lg text-white/70 max-w-xl mb-8">{description}</p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 rounded-lg bg-green px-6 py-3 font-semibold text-black transition hover:brightness-95"
          >
            {primaryCta.label}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>

          <Link
            href={secondaryCta.href}
            className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
