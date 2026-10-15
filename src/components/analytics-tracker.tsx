"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Generate or retrieve persistent anonymous session ID for privacy-friendly analytics
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server_session";
  let sessionId = sessionStorage.getItem("malabar_analytics_session");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("malabar_analytics_session", sessionId);
  }
  return sessionId;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPageViews = useRef<Set<string>>(new Set());

  // Track page view on route change
  useEffect(() => {
    // Skip admin internal pages from public visitor stats
    if (pathname.startsWith("/admin")) return;

    const pageKey = `${pathname}_${Date.now()}`;
    const sessionId = getOrCreateSessionId();

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "page_view",
        eventName: "page_view",
        pagePath: pathname,
        sessionId,
      }),
    }).catch(() => {
      // Non-blocking fail-safe
    });
  }, [pathname]);

  // Global click tracker for buttons and links marked with data-analytics-id
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-analytics-id]");
      if (!target) return;

      const elementId = target.getAttribute("data-analytics-id");
      if (!elementId) return;

      const sessionId = getOrCreateSessionId();

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "button_click",
          eventName: "click",
          pagePath: window.location.pathname,
          elementId,
          sessionId,
        }),
      }).catch(() => {});
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Section Engagement Tracker using IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || pathname.startsWith("/admin")) return;

    const sectionTimers = new Map<string, number>();
    const trackedSections = ["hero", "about", "services", "why-choose-us", "gallery", "vlogs", "contact"];
    const sessionId = getOrCreateSessionId();

    const reportDwell = (sectionId: string, durationMs: number) => {
      if (durationMs < 1000) return; // Ignore fleeting accidental scrolls

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "section_engagement",
          eventName: "section_dwell",
          pagePath: window.location.pathname,
          sectionId,
          durationMs: Math.min(durationMs, 180000), // Cap at 3 minutes to avoid idle tab inflation
          sessionId,
        }),
      }).catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionId) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            // Section became visible
            if (!sectionTimers.has(sectionId)) {
              sectionTimers.set(sectionId, now);
            }
          } else {
            // Section is no longer visible
            const startTime = sectionTimers.get(sectionId);
            if (startTime) {
              const dwell = now - startTime;
              reportDwell(sectionId, dwell);
              sectionTimers.delete(sectionId);
            }
          }
        });
      },
      {
        threshold: [0.4],
      }
    );

    trackedSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleBeforeUnload = () => {
      const now = Date.now();
      sectionTimers.forEach((startTime, sectionId) => {
        reportDwell(sectionId, now - startTime);
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      observer.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [pathname]);

  return null;
}
