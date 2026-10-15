import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/data/initial-content";

interface GalleryProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export function Gallery({
  badge = "Visual Showcase",
  title = "Our Work in Focus",
  subtitle = "A glimpse of pristine living spaces and executive offices maintained by our dedicated crews.",
}: GalleryProps) {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {badge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
