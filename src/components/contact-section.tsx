"use client";

import { useState } from "react";
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactSectionProps {
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    operatingHours: string;
    mapEmbedUrl?: string;
  };
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceRequested: "Home Cleaning",
    propertyType: "residential",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSuccessMessage(data.message || "Thank you! Our supervisor will contact you shortly.");
      setFormData({
        customerName: "",
        phone: "",
        email: "",
        serviceRequested: "Home Cleaning",
        propertyType: "residential",
        message: "",
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Submission error occurred");
    } finally {
      setLoading(false);
    }
  };

  const cleanPhone = contactInfo.phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = contactInfo.whatsapp.replace(/[^0-9]/g, "");

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Contact &amp; Bookings
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Request an Estimate or Schedule Service
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Reach out via phone, WhatsApp, or submit your requirements below for a customized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Action Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${cleanPhone}`}
              data-analytics-id="contact_card_phone"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Direct Phone Support</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{contactInfo.phone}</p>
                <span className="text-xs text-blue-600 font-semibold group-hover:underline">Click to call immediately</span>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Malabar Care, I would like to enquire about your cleaning services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-id="contact_card_whatsapp"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Instant WhatsApp Chat</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{contactInfo.whatsapp}</p>
                <span className="text-xs text-emerald-600 font-semibold group-hover:underline">Message our desk on WhatsApp</span>
              </div>
            </a>

            {/* Email & Operating Info */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Operational Hub</p>
                  <p className="text-sm font-semibold text-slate-800">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Service Working Hours</p>
                  <p className="text-sm font-semibold text-slate-800">{contactInfo.operatingHours}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quote & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Get a Free Customized Quote</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details and we will provide an itemized quote within 2 operational hours.
                </p>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Request Submitted Successfully</p>
                    <p className="text-xs mt-0.5">{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Nambiar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98450 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 bg-white"
                    >
                      <option value="Home Cleaning">Home Cleaning</option>
                      <option value="Office Cleaning">Office Cleaning</option>
                      <option value="Deep Cleaning & Sanitization">Deep Cleaning & Sanitization</option>
                      <option value="Commercial & Facility Care">Commercial & Facility Care</option>
                      <option value="Other Cleaning Requirement">Other / Custom Requirement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Property Type
                  </label>
                  <div className="flex gap-4">
                    {["residential", "commercial", "industrial"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 capitalize">
                        <input
                          type="radio"
                          name="propertyType"
                          value={type}
                          checked={formData.propertyType === type}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Property Details &amp; Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Approximate square footage, number of rooms/floors, preferred date or specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-analytics-id="contact_form_submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
