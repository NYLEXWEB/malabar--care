import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getWebsiteContent, getVlogBySlug } from "@/lib/db/repository";
import { ArrowLeft, Clock, Video, FileText, Share2, Calendar } from "lucide-react";

export default async function VlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [content, vlog] = await Promise.all([
    getWebsiteContent(),
    getVlogBySlug(slug),
  ]);

  if (!vlog || vlog.status !== "published") {
    notFound();
  }

  const formattedDate = vlog.publishedAt
    ? new Date(vlog.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar phone={content.contactInfo.phone} />

      <main className="flex-1 bg-white py-12 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back button */}
          <div className="mb-6">
            <Link
              href="/vlogs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all Insights</span>
            </Link>
          </div>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
              {vlog.contentType === "video" ? (
                <>
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Insight</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Guide Article</span>
                </>
              )}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{vlog.readTimeMinutes || 4} min read</span>
            </span>
          </div>

          {/* Title & Excerpt */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {vlog.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {vlog.excerpt}
          </p>

          {/* Cover Media */}
          <div className="my-8 relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-md">
            <Image
              src={vlog.coverImageReference || "/images/vlog-1.svg"}
              alt={vlog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
            />
          </div>

          {/* Video Player or Link Card if video post */}
          {vlog.contentType === "video" && vlog.externalVideoUrl && (
            <div className="mb-8 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">Video Overview Available</p>
                  <p className="text-xs text-slate-300">Watch the accompanying demonstration video on YouTube</p>
                </div>
              </div>
              <a
                href={vlog.externalVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors shrink-0"
              >
                Watch Video Demo
              </a>
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            {vlog.content.split("\n\n").map((paragraph: string, idx: number) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 pt-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom CTA Card */}
          <div className="mt-12 p-8 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Need professional cleaning for your property?</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Our certified team handles homes, offices, and commercial spaces with hygiene assurance.</p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shrink-0 shadow-sm transition-all"
            >
              Get a Quote Now
            </Link>
          </div>

        </article>
      </main>

      <Footer footerData={content.footer} contactInfo={content.contactInfo} />
    </div>
  );
}
