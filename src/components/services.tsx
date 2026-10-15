import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export interface ServiceItem {
  _id?: string | any;
  title: string;
  slug: string;
  shortDescription: string;
  description?: string;
  imageReference: string;
  features?: string[];
  displayOrder?: number;
  published?: boolean;
}

interface ServicesProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  services: ServiceItem[];
}

export function Services({
  title = "Comprehensive Cleaning Tailored to Your Space",
  subtitle = "Choose from individual deep cleaning visits or recurring maintenance plans designed for residences, corporate offices, and commercial venues.",
  services,
}: ServicesProps) {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Services &amp; Solutions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            {subtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.slug || idx}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Service Card Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={service.imageReference || "/images/home-cleaning.jpg"}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Service Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Highlights/features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href={`/#contact?service=${encodeURIComponent(service.title)}`}
                    data-analytics-id={`service_enquire_${service.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Enquire for Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
