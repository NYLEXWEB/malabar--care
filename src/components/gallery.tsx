"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface GalleryProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

const ROW_1_IMAGES = [
  {
    id: "r1-1",
    src: "/services/office.png",
    alt: "Pristine Luxury Living Room Deep Clean",
  },
  {
    id: "r1-2",
    src: "/images/about.png",
    alt: "Professional Surface Sanitization",
  },
  {
    id: "r1-3",
    src: "/images/home-cleaning.jpg",
    alt: "Sparkling Residential Villa Interior",
  },
  {
    id: "r1-4",
    src: "/images/office-cleaning.jpg",
    alt: "Modern Modular Kitchen Deep Clean",
  },
  {
    id: "r1-5",
    src: "/services/home-cleaning.png",
    alt: "Gleaming Marble Bathroom Sanitization",
  },
  {
    id: "r1-6",
    src: "/services/Deep Cleaning & Sanitization.png",
    alt: "High-End Residential Living Space",
  },
];

const ROW_2_IMAGES = [
  {
    id: "r2-1",
    src: "/services/office.png",
    alt: "Corporate Office Workstation Cleaning",
  },
  {
    id: "r2-2",
       src: "/images/about.png",
    alt: "Executive Boardroom & Glass Partitions",
  },
  {
    id: "r2-3",
     src: "/images/home-cleaning.jpg",
    alt: "Hardwood Floor Cleaning and Polishing",
  },
  {
    id: "r2-4",
   src: "/images/office-cleaning.jpg",
    alt: "Specialized Deep Sanitization",
  },
  {
    id: "r2-5",
   src: "/services/home-cleaning.png",
    alt: "Hygiene Standard Certified Cleaning",
  },
  {
    id: "r2-6",
       src: "/services/Deep Cleaning & Sanitization.png",
    alt: "Modern Commercial Facility Cleaning",
  },
];

export function Gallery({
  title = "Our Work in Focus",
  subtitle = "Real results from homes, luxury apartments, and corporate facilities maintained to pristine perfection.",
}: GalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Duplicate items to ensure a seamless, uninterrupted infinite ticker loop
  const loopRow1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
  const loopRow2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Work Showcase
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Auto-scrolling Gallery Container with Edge Fades */}
      <div className="relative w-full space-y-4 sm:space-y-6">
        
        {/* Left & Right Subtle Fade Gradients for Seamless Look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Row 1: Smooth Continuous Auto-Scroll to Right */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right gap-4 sm:gap-6">
            {loopRow1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setActiveImage(item.src)}
                className="w-72 sm:w-88 md:w-96 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-200/90 relative shrink-0 cursor-pointer group bg-slate-100 transition-all duration-300 hover:border-blue-500 hover:scale-[1.01]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle Hover Lens Overlay */}
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xs">
                    <ZoomIn className="w-4 h-4 text-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Smooth Continuous Auto-Scroll to Left */}
        <div className="overflow-hidden">
          <div className="animate-marquee-left gap-4 sm:gap-6">
            {loopRow2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setActiveImage(item.src)}
                className="w-72 sm:w-88 md:w-96 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-200/90 relative shrink-0 cursor-pointer group bg-slate-100 transition-all duration-300 hover:border-blue-500 hover:scale-[1.01]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Hover Lens Overlay */}
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xs">
                    <ZoomIn className="w-4 h-4 text-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Fullscreen Image Preview */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden border border-slate-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-full bg-slate-900">
              <Image
                src={activeImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
