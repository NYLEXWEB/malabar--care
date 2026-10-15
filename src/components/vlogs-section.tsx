import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video, FileText, Clock } from "lucide-react";

export interface VlogItem {
  _id?: string | any;
  title: string;
  slug: string;
  excerpt: string;
  coverImageReference: string;
  contentType: "article" | "video";
  status: "draft" | "published";
  readTimeMinutes?: number;
  publishedAt?: Date | string;
}

interface VlogsSectionProps {
  vlogs: VlogItem[];
}

export function VlogsSection({ vlogs }: VlogsSectionProps) {
  return (
    <section id="vlogs" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Vlogs &amp; Insights
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hygiene Knowledge &amp; Care Advice
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-xl">
              Practical guides and video overviews for maintaining pristine spaces.
            </p>
          </div>

          <Link
            href="/vlogs"
            data-analytics-id="vlogs_view_all"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vlogs.slice(0, 3).map((vlog) => (
            <article
              key={vlog.slug}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={vlog.coverImageReference || "/images/vlog-1.svg"}
                  alt={vlog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-xs">
                  {vlog.contentType === "video" ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      <span>Video Vlog</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>Guide</span>
                    </>
                  )}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{vlog.readTimeMinutes || 4} min read</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link
                      href={`/vlogs/${vlog.slug}`}
                      data-analytics-id={`vlog_card_${vlog.slug}`}
                    >
                      {vlog.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {vlog.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href={`/vlogs/${vlog.slug}`}
                    data-analytics-id={`vlog_read_${vlog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
