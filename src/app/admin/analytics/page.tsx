"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  Users,
  MousePointerClick,
  Clock,
  Calendar,
  Filter,
  Loader2,
  Sparkles,
  ShieldAlert,
  Info,
} from "lucide-react";

interface AnalyticsSummary {
  databaseConnected: boolean;
  totalPageViews: number;
  approximateUniqueVisitors: number;
  totalButtonClicks: number;
  totalEnquiries: number;
  publishedVlogs: number;
  viewsTimeline: Array<{ date: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  topButtons: Array<{ elementId: string; count: number }>;
  sectionEngagement: Array<{
    sectionId: string;
    totalSeconds: number;
    avgSeconds: number;
    sessionsCount: number;
  }>;
  recentEvents: Array<{
    _id: string;
    eventType: string;
    eventName: string;
    pagePath: string;
    elementId?: string;
    sectionId?: string;
    durationMs?: number;
    timestamp: string;
  }>;
}

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics/summary?days=${days}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.summary) {
          setSummary(data.summary);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [days]);

  // Compute maximum count for timeline SVG bar chart scaling
  const maxTimelineCount = summary?.viewsTimeline
    ? Math.max(...summary.viewsTimeline.map((t) => t.count), 5)
    : 10;

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Top Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            First-Party Analytics &amp; Interactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Privacy-conscious tracking of genuine page views, CTA clicks, and section dwell time.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
          {[
            { label: "Last 7 Days", value: 7 },
            { label: "Last 30 Days", value: 30 },
            { label: "All Time", value: 365 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDays(option.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                days === option.value
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Data Disclaimer Banner per Section 12D */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Privacy &amp; Data Notice (First-Party Architecture):</p>
          <p className="text-amber-800 mt-0.5">
            This module operates without third-party cookies or intrusive fingerprinting. Any initial baseline entries in a fresh demo environment are labeled as <strong>DEMO DATA</strong>. When visitors interact with the public site, live telemetry events are stored in real-time.
          </p>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Views</span>
            <Eye className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.totalPageViews ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Filtered date range</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Unique Sessions</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.approximateUniqueVisitors ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Approx. unique visitors</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Button Clicks</span>
            <MousePointerClick className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.totalButtonClicks ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Tracked CTA interactions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Dwell Time</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading
              ? "..."
              : `${Math.round(
                  (summary?.sectionEngagement.reduce((acc, s) => acc + s.avgSeconds, 0) || 0) /
                    (summary?.sectionEngagement.length || 1)
                )}s`}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Per engaged section</p>
        </div>
      </div>

      {/* Visual Timeline SVG Chart */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Page Views Trend (Last 7 Days)</h2>
            <p className="text-xs text-slate-500">Daily navigation traffic distribution</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Peak: {maxTimelineCount} views</span>
        </div>

        {loading ? (
          <div className="h-44 flex items-center justify-center text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-blue-600" /> Loading timeline...
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-44 flex items-end gap-3 sm:gap-6 pt-6 border-b border-slate-100 pb-2">
              {summary?.viewsTimeline.map((item, idx) => {
                const heightPercent = Math.max(Math.round((item.count / maxTimelineCount) * 100), 8);
                const dayLabel = new Date(item.date).toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.count}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[42px] bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:from-blue-700 group-hover:to-sky-500 shadow-xs"
                    />
                    <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">
                      {dayLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Two Columns: Button Clicks Breakdown & Section Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Buttons Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Most Clicked Actions &amp; CTAs</h2>
            <p className="text-xs text-slate-500">Tracked conversion buttons on public pages</p>
          </div>

          {!summary || summary.topButtons.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No button clicks registered in this date range.
            </div>
          ) : (
            <div className="space-y-2.5">
              {summary.topButtons.map((btn) => (
                <div key={btn.elementId} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-mono text-slate-700 font-semibold">{btn.elementId}</span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
                    {btn.count} clicks
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Engagement Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Section Engagement (Dwell Time)</h2>
            <p className="text-xs text-slate-500">Tracked via browser IntersectionObserver</p>
          </div>

          {!summary || summary.sectionEngagement.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No section dwell events registered yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {summary.sectionEngagement.map((sec) => (
                <div key={sec.sectionId} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 capitalize">
                      {sec.sectionId.replace(/-/g, " ")} Section
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {sec.sessionsCount} sessions • Avg {sec.avgSeconds}s / session
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold font-mono">
                    {sec.totalSeconds}s Total
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Recent Events Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Recent Telemetry Events</h2>
          <p className="text-xs text-slate-500">Latest raw stream of interactions</p>
        </div>

        {!summary || summary.recentEvents.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No events logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Target / Section</th>
                  <th className="py-3 px-4">Page Path</th>
                  <th className="py-3 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.recentEvents.map((evt) => (
                  <tr key={evt._id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {evt.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">{evt.eventName}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {evt.elementId || evt.sectionId || "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{evt.pagePath}</td>
                    <td className="py-3 px-4 text-right text-slate-400 text-[11px]">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
