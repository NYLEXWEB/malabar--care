"use client";

import { ArrowUpRight } from "lucide-react";

export function SocialMediaSection() {
  const socials = [
    {
      id: "google",
      name: "Google Business",
      handle: "Malabar Care Facility Services",
      desc: "Verified local business profile with 4.9★ rating and customer photos.",
      actionText: "View on Google Maps",
      href: "https://maps.google.com",
      brandColor: "group-hover:border-blue-500",
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
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
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@malabarcare.official",
      desc: "Watch real before-and-after deep clean transformations and surface care tips.",
      actionText: "Follow on Instagram",
      href: "https://instagram.com",
      brandColor: "group-hover:border-pink-500",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      name: "Facebook",
      handle: "Malabar Care Services",
      desc: "Stay updated with company announcements, special corporate offers, and community reviews.",
      actionText: "Connect on Facebook",
      href: "https://facebook.com",
      brandColor: "group-hover:border-blue-600",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      handle: "+91 98765 43210",
      desc: "Direct customer assistance desk for scheduling visits and getting quick price estimates.",
      actionText: "Chat on WhatsApp",
      href: "https://wa.me/919876543210",
      brandColor: "group-hover:border-[#25D366]",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.89 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.69 14.52 13.55 14.68C13.4 14.85 13.26 14.87 13.01 14.75C12.77 14.62 11.98 14.36 11.04 13.53C10.31 12.87 9.81 12.07 9.67 11.82C9.52 11.58 9.65 11.44 9.77 11.32C9.88 11.21 10.02 11.03 10.15 10.88C10.27 10.74 10.31 10.63 10.39 10.47C10.48 10.3 10.43 10.16 10.37 10.04C10.31 9.91 9.81 8.7 9.61 8.2C9.4 7.72 9.2 7.78 9.04 7.77L8.56 7.76C8.39 7.76 8.13 7.82 7.9 8.07C7.68 8.32 7.03 8.92 7.03 10.15C7.03 11.38 7.93 12.56 8.05 12.73C8.18 12.89 9.8 15.39 12.28 16.46C12.87 16.72 13.33 16.87 13.69 16.99C14.28 17.18 14.82 17.15 15.24 17.09C15.71 17.02 16.69 16.5 16.89 15.93C17.1 15.36 17.1 14.87 17.04 14.77C16.97 14.67 16.82 14.52 16.57 14.39Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="social" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Connect With Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Follow &amp; Reach Us On Social Media
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Stay in touch through Google, Instagram, Facebook, and WhatsApp for service updates and direct queries.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-id={`social_card_${s.id}`}
              className={`group p-6 rounded-xl border border-slate-200 bg-white ${s.brandColor} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-xs cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{s.handle}</p>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {s.actionText} →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
