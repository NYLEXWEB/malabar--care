"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Phone, ShieldCheck } from "lucide-react";

interface NavbarProps {
  phone?: string;
}

export function Navbar({ phone = "+91 98765 43210" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#hero", id: "nav_home" },
    { label: "About", href: "/#about", id: "nav_about" },
    { label: "Services", href: "/#services", id: "nav_services" },
    { label: "Insights", href: "/vlogs", id: "nav_vlogs" },
    { label: "Showcase", href: "/#gallery", id: "nav_gallery" },
    { label: "Contact", href: "/#contact", id: "nav_contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link
            href="/"
            data-analytics-id="brand_logo_click"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                MALABAR <span className="text-blue-600">CARE</span>
              </span>
              <p className="text-[11px] font-medium tracking-wider uppercase text-slate-600">
                Professional Cleaning
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                data-analytics-id={link.id}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              data-analytics-id="nav_call_direct"
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700 py-1.5 px-2.5 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{phone}</span>
            </a>

            <Link
              href="/#contact"
              data-analytics-id="nav_get_quote"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-600/20 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/#contact"
              data-analytics-id="nav_mobile_quote_mini"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-md"
            >
              Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                data-analytics-id={`mobile_${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              data-analytics-id="mobile_nav_call"
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call Us: {phone}</span>
            </a>

            <Link
              href="/#contact"
              data-analytics-id="mobile_nav_get_quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
