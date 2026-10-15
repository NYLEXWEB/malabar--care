import Link from "next/link";
import { Phone, Mail, MapPin, Lock } from "lucide-react";

interface FooterProps {
  footerData: {
    brandName: string;
    description: string;
    copyrightText: string;
    socialLinks: Array<{ platform: string; url: string }>;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export function Footer({ footerData, contactInfo }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Summary Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                MC
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                MALABAR <span className="text-blue-400">CARE</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {footerData.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                Google 4.9★
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Services &amp; Pricing</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">About Malabar Care</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors">Work Showcase</Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-white transition-colors">Google Reviews</Link>
              </li>
             
            </ul>
          </div>

          {/* Service Offerings */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Cleaning Programs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Residential Deep Cleaning</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Office &amp; Janitorial Contracts</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Tile &amp; Grout Steam Scrubbing</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Facility &amp; Warehouse Detailing</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Pre-Occupancy Deep Cleans</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Admin Entry */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Direct Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{contactInfo.address}</span>
              </div>
            </div>

          
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>{footerData.copyrightText}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="text-slate-400 font-mono text-[10px]">Client Presentation Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
