import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface AboutProps {
  badge?: string;
  title?: string;
  description?: string;
  bulletPoints?: string[];
  ctaLabel?: string;
  image?: string;
}

export function About({
  title = "Dedicated to Higher Standards of Cleanliness & Comfort",
  description = "Malabar Care was established to provide dependable, systematically managed cleaning services for residences, workplaces, and commercial venues. We combine trained professionals, modern tools, and eco-friendly products to give you peace of mind.",
  bulletPoints = [
    "Rigorous quality supervision on every project",
    "Specialized equipment for deep extraction and steam sanitization",
    "Punctual, uniformed, and respectful cleaning crews",
    "Custom service packages tailored to your exact property layout",
  ],
  ctaLabel = "Enquire About Our Plans",
  image = "/images/about-team.svg",
}: AboutProps) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src={image}
                  alt="Malabar Care Dedicated Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              About Malabar Care
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/#contact"
                data-analytics-id="about_cta_click"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
