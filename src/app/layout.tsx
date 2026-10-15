import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
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
      className={`${jakarta.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <AnalyticsTracker />
        <main className="flex-1">{children}</main>
        <FloatingContactButtons />
      </body>
    </html>
  );
}
