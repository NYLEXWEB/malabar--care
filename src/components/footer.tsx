import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Lock } from "lucide-react";

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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Summary Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                MALABAR <span className="text-blue-400">CARE</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {footerData.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {footerData.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-id={`footer_social_${s.platform.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/vlogs" className="hover:text-white transition-colors">Insights &amp; Vlogs</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors">Work Showcase</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">Contact &amp; Quotes</Link>
              </li>
            </ul>
          </div>

          {/* Service Offerings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Service Offerings</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Home Deep Cleaning</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Office &amp; Janitorial Care</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Tile &amp; Grout Sanitizing</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Commercial Facility Care</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Pre-Occupancy Deep Cleans</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Admin Entry */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact</h4>
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

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/admin/login"
                data-analytics-id="footer_admin_login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-slate-800"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Client Presentation &amp; Admin CMS</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{footerData.copyrightText}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="text-slate-400 font-mono text-[10px]">Demo Presentation v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
