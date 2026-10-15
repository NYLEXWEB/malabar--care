"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface EnquiryItem {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  propertyType?: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadEnquiries = () => {
    fetch("/api/admin/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.enquiries) {
          setEnquiries(data.enquiries);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnquiries();
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
        setFeedback("Status updated successfully.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Quotes &amp; Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review incoming requests submitted from the public quote calculator and contact form.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
          Total Leads: {enquiries.length}
        </span>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Enquiries List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span>Loading customer enquiries...</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p>No customer enquiries recorded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {enquiries.map((enq) => {
              const formattedDate = new Date(enq.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={enq._id} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900">{enq.customerName}</h3>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                        {enq.serviceRequested}
                      </span>
                      {enq.propertyType && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize bg-slate-100 text-slate-600">
                          {enq.propertyType}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>

                      {/* Status Selector */}
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          enq.status === "new"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : enq.status === "contacted"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <option value="new">Status: New Lead</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="resolved">Status: Resolved / Booked</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    <p className="font-semibold text-slate-900 mb-1">Customer Message &amp; Layout Notes:</p>
                    {enq.message}
                  </div>

                  {/* Direct Contact Links */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                    <a
                      href={`tel:${enq.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {enq.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${enq.customerName}, regarding your cleaning service request with Malabar Care:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </a>

                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}?subject=${encodeURIComponent("Malabar Care Quote Follow-up")}`}
                        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email: {enq.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
