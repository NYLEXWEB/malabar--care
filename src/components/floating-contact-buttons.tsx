"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

interface FloatingButtonsProps {
  phone?: string;
  whatsapp?: string;
}

export function FloatingContactButtons({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: FloatingButtonsProps) {
  const pathname = usePathname();

  // Do not render on admin pages
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
      {/* Authentic WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Malabar Care, I would like to enquire about your cleaning services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-id="floating_whatsapp"
        aria-label="Chat with Malabar Care on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        {/* Official WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.89 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.69 14.52 13.55 14.68C13.4 14.85 13.26 14.87 13.01 14.75C12.77 14.62 11.98 14.36 11.04 13.53C10.31 12.87 9.81 12.07 9.67 11.82C9.52 11.58 9.65 11.44 9.77 11.32C9.88 11.21 10.02 11.03 10.15 10.88C10.27 10.74 10.31 10.63 10.39 10.47C10.48 10.3 10.43 10.16 10.37 10.04C10.31 9.91 9.81 8.7 9.61 8.2C9.4 7.72 9.2 7.78 9.04 7.77L8.56 7.76C8.39 7.76 8.13 7.82 7.9 8.07C7.68 8.32 7.03 8.92 7.03 10.15C7.03 11.38 7.93 12.56 8.05 12.73C8.18 12.89 9.8 15.39 12.28 16.46C12.87 16.72 13.33 16.87 13.69 16.99C14.28 17.18 14.82 17.15 15.24 17.09C15.71 17.02 16.69 16.5 16.89 15.93C17.1 15.36 17.1 14.87 17.04 14.77C16.97 14.67 16.82 14.52 16.57 14.39Z" />
        </svg>

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
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
