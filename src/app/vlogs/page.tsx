import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getWebsiteContent, getVlogs } from "@/lib/db/repository";
import { Video, FileText, Clock, ArrowRight, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VlogsListPage() {
  const [content, vlogs] = await Promise.all([
    getWebsiteContent(),
    getVlogs(true),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar phone={content.contactInfo.phone} />

      <main className="flex-1 bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cleaning Insights &amp; Video Overviews
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl font-normal">
              Practical guides, cleaning walkthroughs, and facility hygiene advice curated by Malabar Care specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vlogs.map((vlog) => (
              <article
                key={vlog.slug}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={vlog.coverImageReference || "/images/vlog-1.svg"}
                    alt={vlog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/95 text-slate-800 shadow-xs">
                    {vlog.contentType === "video" ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                        <span>Video Post</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>Guide Article</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{vlog.readTimeMinutes || 4} min read</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      <Link href={`/vlogs/${vlog.slug}`}>
                        {vlog.title}
                      </Link>
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {vlog.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/vlogs/${vlog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      <span>Read Full Insight</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer footerData={content.footer} contactInfo={content.contactInfo} />
    </div>
  );
}
