import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malabar Care — Professional Residential & Commercial Cleaning Services",
  description:
    "Reliable, systematic cleaning and sanitation solutions for cleaner, healthier, and welcoming living and work spaces across Malabar.",
  keywords: [
    "Malabar Care",
    "cleaning services",
    "office cleaning",
    "deep cleaning",
    "sanitization",
    "home cleaning Kerala",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <AnalyticsTracker />
        <main className="flex-1">{children}</main>
        <FloatingContactButtons />
      </body>
    </html>
  );
}
