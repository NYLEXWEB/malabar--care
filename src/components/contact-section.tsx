"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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

      setSuccessMessage(data.message || "Thank you! Our supervisor will contact you promptly.");
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
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Contact &amp; Bookings
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Request an Estimate or Schedule Service
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
            Reach out via phone, WhatsApp, or submit your requirements below for a customized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Action Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${cleanPhone}`}
              data-analytics-id="contact_card_phone"
              className="flex items-center gap-4 p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:-translate-y-0.5 transition-all group shadow-xs cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Phone Support</p>
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
              className="flex items-center gap-4 p-5 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] hover:-translate-y-0.5 transition-all group shadow-xs cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.89 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.69 14.52 13.55 14.68C13.4 14.85 13.26 14.87 13.01 14.75C12.77 14.62 11.98 14.36 11.04 13.53C10.31 12.87 9.81 12.07 9.67 11.82C9.52 11.58 9.65 11.44 9.77 11.32C9.88 11.03 10.02 11.03 10.15 10.88C10.27 10.74 10.31 10.63 10.39 10.47C10.48 10.3 10.43 10.16 10.37 10.04C10.31 9.91 9.81 8.7 9.61 8.2C9.4 7.72 9.2 7.78 9.04 7.77L8.56 7.76C8.39 7.76 8.13 7.82 7.9 8.07C7.68 8.32 7.03 8.92 7.03 10.15C7.03 11.38 7.93 12.56 8.05 12.73C8.18 12.89 9.8 15.39 12.28 16.46C12.87 16.72 13.33 16.87 13.69 16.99C14.28 17.18 14.82 17.15 15.24 17.09C15.71 17.02 16.69 16.5 16.89 15.93C17.1 15.36 17.1 14.87 17.04 14.77C16.97 14.67 16.82 14.52 16.57 14.39Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instant WhatsApp Chat</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{contactInfo.whatsapp}</p>
                <span className="text-xs text-[#25D366] font-semibold group-hover:underline">Chat on WhatsApp</span>
              </div>
            </a>

            {/* Email & Operating Info */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Email</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Hub</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service Working Hours</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{contactInfo.operatingHours}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quote & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-900">Get a Free Customized Estimate</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in your requirements and we will contact you within 2 operational hours.
                </p>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Request Submitted Successfully</p>
                    <p className="mt-0.5">{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Nambiar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98450 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-900 bg-white"
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
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Property Type
                  </label>
                  <div className="flex gap-4">
                    {["residential", "commercial", "industrial"].map((type) => (
                      <label key={type} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700 capitalize">
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
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Requirements &amp; Approximate Area *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Approximate square footage, number of rooms/floors, preferred date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-analytics-id="contact_form_submit"
                  className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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
