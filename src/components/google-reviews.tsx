"use client";

import { Star, CheckCircle, ExternalLink } from "lucide-react";

export function GoogleReviews() {
  const reviews = [
    {
      id: "rev-1",
      author: "Dr. Farooq Rahman",
      location: "Calicut, Kerala",
      rating: 5,
      date: "2 weeks ago",
      text: "Engaged Malabar Care for our 4BHK villa deep cleaning before a family function. The crew arrived on time with industrial scrubbers and steam vacuums. Every tile grout and kitchen surface was restored to perfection.",
      service: "Villa Deep Cleaning",
      initials: "FR",
      initialBg: "bg-blue-600",
    },
    {
      id: "rev-2",
      author: "Meera Krishnan",
      location: "Hilite City, Calicut",
      rating: 5,
      date: "1 month ago",
      text: "Superb professional cleaning! Their team wiped all floor-to-ceiling glass panels, sanitized bathrooms with hospital-grade disinfectant, and left the home smelling fresh. Upfront pricing without hidden charges.",
      service: "Residential Apartment Care",
      initials: "MK",
      initialBg: "bg-emerald-600",
    },
    {
      id: "rev-3",
      author: "Rajesh P. Menon",
      location: "Cyberpark, Calicut",
      rating: 5,
      date: "3 weeks ago",
      text: "We signed a commercial maintenance contract for our 4,500 sq ft office. The janitorial pass is meticulous — workstations, glass partitions, and cafeteria are consistently spotless every morning.",
      service: "Commercial Office Care",
      initials: "RM",
      initialBg: "bg-indigo-600",
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Google Rating Trust Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {/* Google G Multi-Color SVG Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                Google Verified Reviews
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-xl">
              Authentic feedback from verified homeowners and commercial facility managers across Malabar.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-xs shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">4.9 / 5.0 Rating</p>
              <p className="text-[10px] text-slate-400">Based on 180+ Google Reviews</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-blue-600 text-lg">
              4.9
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${rev.initialBg} text-white font-bold text-xs flex items-center justify-center`}>
                      {rev.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rev.author}</p>
                      <p className="text-[10px] text-slate-400">{rev.location}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-2">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-600">{rev.service}</span>
                <span className="text-blue-600 font-semibold">Google Review</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
