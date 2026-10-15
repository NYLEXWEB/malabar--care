"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

interface NavbarProps {
  phone?: string;
}

export function Navbar({ phone = "+91 98765 43210" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#hero", id: "nav_home" },
    { label: "Services", href: "/#services", id: "nav_services" },
    { label: "About", href: "/#about", id: "nav_about" },
    { label: "Why Us", href: "/#why-choose-us", id: "nav_why_us" },
    { label: "Gallery", href: "/#gallery", id: "nav_gallery" },
    { label: "Reviews", href: "/#reviews", id: "nav_reviews" },
    { label: "Insights", href: "/vlogs", id: "nav_vlogs" },
    { label: "Contact", href: "/#contact", id: "nav_contact" },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-xl border transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm"
            : "bg-white border-slate-200/90 shadow-xs"
        }`}
      >
        <div className="flex items-center justify-between h-18 px-4 sm:px-6">
          
          {/* Brand Logo - Clean, Boxy, No Sparkles */}
          <Link
            href="/"
            data-analytics-id="brand_logo_click"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-extrabold text-base tracking-tighter border border-slate-800 group-hover:bg-blue-600 transition-colors">
              MC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  MALABAR
                </span>
                <span className="text-lg font-black tracking-tight text-blue-600">
                  CARE
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 -mt-1">
                Facility &amp; Cleaning
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                data-analytics-id={link.id}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Direct Actions */}
          <div className="hidden sm:flex items-center gap-3">


            <Link
              href="/#contact"
              data-analytics-id="nav_get_quote"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/#contact"
              data-analytics-id="nav_mobile_quote_mini"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg"
            >
              Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 px-4 pt-3 pb-5 space-y-2 bg-white rounded-b-xl animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  data-analytics-id={`mobile_${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                data-analytics-id="mobile_nav_call"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Us: {phone}</span>
              </a>

              <Link
                href="/#contact"
                data-analytics-id="mobile_nav_get_quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
