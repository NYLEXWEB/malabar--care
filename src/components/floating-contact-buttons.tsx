"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";

interface FloatingButtonsProps {
  phone?: string;
  whatsapp?: string;
}

export function FloatingContactButtons({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: FloatingButtonsProps) {
  const pathname = usePathname();

  // Explicitly do not render on any admin route
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 items-end"
    >
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Malabar Care, I would like to enquire about your cleaning services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-id="floating_whatsapp"
        aria-label="Chat with Malabar Care on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-offset-2"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-md">
          Chat on WhatsApp
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        data-analytics-id="floating_phone"
        aria-label="Call Malabar Care customer desk"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2"
      >
        <Phone className="w-6 h-6" />
        
        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-md">
          Call: {phone}
        </span>
      </a>
    </aside>
  );
}
