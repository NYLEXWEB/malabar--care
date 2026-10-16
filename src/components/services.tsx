import Image from "next/image";
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
  whatsappNumber?: string;
}

export function Services({
  title = "Comprehensive Cleaning Tailored to Your Space",
  subtitle = "Choose from individual deep cleaning visits or recurring maintenance plans designed for residences, corporate offices, and commercial venues.",
  services,
  whatsappNumber = "+91 98765 43210",
}: ServicesProps) {
  const cleanWhatsapp = (whatsappNumber || "+91 98765 43210").replace(/[^0-9]/g, "");

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
          {services.map((service, idx) => {
            const message = encodeURIComponent(
              `Hello Malabar Care, I would like to enquire about your ${service.title} service.`
            );
            const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${message}`;

            return (
              <div
                key={service.slug || idx}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Service Card Image */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={service.imageReference || "/services/home-cleaning.png"}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Service Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
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
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Link: WhatsApp Direct Enquiry */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics-id={`service_enquire_whatsapp_${service.slug}`}
                      className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg bg-emerald-50 hover:bg-[#25D366] text-emerald-800 hover:text-white border border-emerald-200/90 text-xs font-bold transition-all duration-200 group/btn"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-[#25D366] group-hover/btn:text-white transition-colors shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.89 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.69 14.52 13.55 14.68C13.4 14.85 13.26 14.87 13.01 14.75C12.77 14.62 11.98 14.36 11.04 13.53C10.31 12.87 9.81 12.07 9.67 11.82C9.52 11.58 9.65 11.44 9.77 11.32C9.88 11.21 10.02 11.03 10.15 10.88C10.27 10.74 10.31 10.63 10.39 10.47C10.48 10.3 10.43 10.16 10.37 10.04C10.31 9.91 9.81 8.7 9.61 8.2C9.4 7.72 9.2 7.78 9.04 7.77L8.56 7.76C8.39 7.76 8.13 7.82 7.9 8.07C7.68 8.32 7.03 8.92 7.03 10.15C7.03 11.38 7.93 12.56 8.05 12.73C8.18 12.89 9.8 15.39 12.28 16.46C12.87 16.72 13.33 16.87 13.69 16.99C14.28 17.18 14.82 17.15 15.24 17.09C15.71 17.02 16.69 16.5 16.89 15.93C17.1 15.36 17.1 14.87 17.04 14.77C16.97 14.67 16.82 14.52 16.57 14.39Z" />
                        </svg>
                        <span>Enquire on WhatsApp</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
