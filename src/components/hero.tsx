import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

interface HeroProps {
  badge?: string;
  headline?: string;
  supportingText?: string;
  primaryCta?: string;
  secondaryCta?: string;
  heroImage?: string;
}

export function Hero({
  headline = "Professional Cleaning.\nA Better Space to Live and Work.",
  supportingText = "Reliable cleaning solutions for cleaner, healthier, and more welcoming spaces.",
  primaryCta = "Get a Quote",
  secondaryCta = "Explore Services",
  heroImage = "/images/hero.jpg",
}: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden -mt-24 sm:-mt-20 pt-28 sm:pt-32 pb-12 sm:pb-16">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Malabar Care Pristine Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-90 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Dark Gradient Scrim for crystal clear typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-16 flex flex-col justify-center">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
 

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            {headline.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {idx === 1 ? (
                  <span className="text-sky-600">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            {supportingText}
          </p>

          {/* CTA Buttons - Boxy, Clean, High Contrast */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
            <Link
              href="/#contact"
              data-analytics-id="hero_get_quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <span>{primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#services"
              data-analytics-id="hero_explore_services"
              className="inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/25 rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
            >
              {secondaryCta}
            </Link>
          </div>

          {/* Minimal Trust Indicator Bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Verified &amp; Insured Personnel</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Eco-Safe Hospital-Grade Solutions</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Punctual Scheduled Cleaning</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
