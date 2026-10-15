"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  Users,
  MousePointerClick,
  Inbox,
  BookOpen,
  ArrowRight,
  Sparkles,
  Database,
  Clock,
  Phone,
  FileEdit,
  Layers,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface AnalyticsSummary {
  databaseConnected: boolean;
  totalPageViews: number;
  approximateUniqueVisitors: number;
  totalButtonClicks: number;
  totalEnquiries: number;
  publishedVlogs: number;
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
    timestamp: string;
  }>;
}

interface EnquiryItem {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics/summary").then((res) => res.json()),
      fetch("/api/admin/enquiries").then((res) => res.json()),
    ])
      .then(([summaryRes, enqRes]) => {
        if (summaryRes.success) setSummary(summaryRes.summary);
        if (enqRes.success) setEnquiries(enqRes.enquiries);
      })
      .catch((err) => console.error("Dashboard fetch error", err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted" | "resolved") => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Top Welcome & System Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time presentation metrics, website content status, and customer enquiries.
          </p>
        </div>

        {/* Database Status Indicator Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-slate-500">Storage:</span>
          {summary?.databaseConnected ? (
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              MongoDB Atlas Active
            </span>
          ) : (
            <span className="font-bold text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Demo In-Memory Mode
            </span>
          )}
        </div>
      </div>

      {/* Presentation Mode Notice */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-950 uppercase tracking-wide">
              Client Presentation Ready
            </p>
            <p className="text-xs text-blue-800 mt-0.5">
              All website sections, CMS editors, GridFS image upload flows, and live tracking are operational.
            </p>
          </div>
        </div>
        <Link
          href="/#hero"
          target="_blank"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
        >
          Open Client Preview
        </Link>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Page Views</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.totalPageViews ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Recorded navigation hits</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Unique Sessions</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.approximateUniqueVisitors ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Approx. distinct visitors</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Button Clicks</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.totalButtonClicks ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">CTA &amp; contact interactions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Quotes / Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : enquiries.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Submitted quote forms</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Vlog Posts</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? "..." : summary?.publishedVlogs ?? 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Published insights</p>
        </div>

      </div>

      {/* Quick Action Management Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/content"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <FileEdit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Manage Website Content
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Edit hero headings, about text, phone numbers, and footer information live.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </Link>

        <Link
          href="/admin/services"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Service Offerings CRUD
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add new cleaning packages, reorder cards, and update service highlights.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </Link>

        <Link
          href="/admin/analytics"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              First-Party Analytics
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Inspect section dwell time, button click rankings, and visitor timelines.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </Link>
      </div>

      {/* Two Column Grid: Recent Enquiries & Section Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Customer Enquiries */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Customer Enquiries</h2>
              <p className="text-xs text-slate-500">Quotes submitted via public website form</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All ({enquiries.length})
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No customer enquiries submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {enquiries.slice(0, 4).map((enq) => (
                <div key={enq._id} className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{enq.customerName}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-600">
                        {enq.serviceRequested}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {enq.phone}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-xs">{enq.message}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value as "new" | "contacted" | "resolved")}
                      className={`text-xs font-bold px-2.5 py-1 rounded-md border focus:outline-none cursor-pointer ${
                        enq.status === "new"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : enq.status === "contacted"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Section Engagement Ranking */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Section Engagement</h2>
            <p className="text-xs text-slate-500">Dwell time monitored via IntersectionObserver</p>
          </div>

          {!summary || summary.sectionEngagement.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No section engagement recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {summary.sectionEngagement.map((sec) => (
                <div key={sec.sectionId} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 capitalize">
                    <span>{sec.sectionId.replace(/-/g, " ")} Section</span>
                    <span className="text-blue-600 font-mono">{sec.totalSeconds}s total</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{sec.sessionsCount} sessions viewed</span>
                    <span>Avg: {sec.avgSeconds}s / session</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
