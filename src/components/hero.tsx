import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroProps {
  badge?: string;
  headline?: string;
  supportingText?: string;
  primaryCta?: string;
  secondaryCta?: string;
  heroImage?: string;
}

export function Hero({
  badge = "Professional Cleaning in Malabar",
  headline = "Professional Cleaning.\nA Better Space to Live and Work.",
  supportingText = "Reliable cleaning solutions for cleaner, healthier, and more welcoming spaces.",
  primaryCta = "Get a Quote",
  secondaryCta = "Explore Services",
  heroImage = "/images/hero.jpg",
}: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50/70 py-12 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {headline.split("\n").map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 1 ? (
                    <span className="text-blue-600">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              {supportingText}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/#contact"
                data-analytics-id="hero_get_quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#services"
                data-analytics-id="hero_explore_services"
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 rounded-xl shadow-xs transition-colors"
              >
                {secondaryCta}
              </Link>
            </div>

            {/* Micro Trust Bullet Points */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Personnel</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Toxic Agents</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Photography Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative subtle halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-100 to-sky-100 rounded-3xl blur-xl opacity-60"></div>
              
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50">
                <div className="relative h-72 sm:h-96 w-full bg-slate-100">
                  <Image
                    src={heroImage}
                    alt="Malabar Care Pristine Space Cleaning"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Floating Highlight Card */}
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Standardized Hygiene Protocols</p>
                      <p className="text-[11px] text-slate-500">Every project supervised by certified leads</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">50-Pt Check</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
