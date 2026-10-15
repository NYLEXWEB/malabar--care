"use client";

import { useState, useEffect } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  Info,
  Type,
  FileText,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function AdminContentPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "services" | "contact" | "footer">("hero");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => {
        setErrorMessage("Failed to load content from server");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update website content");
      }

      setSuccessMessage("Content saved and updated successfully! Changes reflect on the live website immediately.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
        <span>Loading editable content...</span>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm">
        Failed to load content data.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Website Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Modify text, headlines, contact numbers, and calls-to-action on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-60 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Content Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: "hero", label: "Hero Section", icon: Sparkles },
          { id: "about", label: "About Malabar Care", icon: Info },
          { id: "services", label: "Services Heading", icon: FileText },
          { id: "contact", label: "Contact Details", icon: Phone },
          { id: "footer", label: "Footer & Social", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* HERO SECTION TAB */}
        {activeTab === "hero" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hero Badge Text
              </label>
              <input
                type="text"
                value={content.hero.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Main Headline
              </label>
              <textarea
                rows={2}
                value={content.hero.headline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">Use a new line for the colored secondary punchline.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Supporting Text
              </label>
              <textarea
                rows={3}
                value={content.hero.supportingText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, supportingText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={content.hero.primaryCta}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, primaryCta: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={content.hero.secondaryCta}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, secondaryCta: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hero Image Reference
              </label>
              <input
                type="text"
                value={content.hero.heroImage}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, heroImage: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1">Accepts local path e.g. /images/hero.jpg or uploaded GridFS media path.</p>
            </div>
          </div>
        )}

        {/* ABOUT SECTION TAB */}
        {activeTab === "about" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                About Badge
              </label>
              <input
                type="text"
                value={content.about.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                About Heading
              </label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                About Narrative
              </label>
              <textarea
                rows={4}
                value={content.about.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Button CTA Label
              </label>
              <input
                type="text"
                value={content.about.ctaLabel}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, ctaLabel: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* SERVICES HEADING TAB */}
        {activeTab === "services" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Services Section Badge
              </label>
              <input
                type="text"
                value={content.servicesHeading.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesHeading: { ...content.servicesHeading, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Services Main Heading
              </label>
              <input
                type="text"
                value={content.servicesHeading.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesHeading: { ...content.servicesHeading, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Services Subtitle
              </label>
              <textarea
                rows={2}
                value={content.servicesHeading.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    servicesHeading: { ...content.servicesHeading, subtitle: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* CONTACT INFO TAB */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Public Phone Number
                </label>
                <input
                  type="text"
                  value={content.contactInfo.phone}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contactInfo: { ...content.contactInfo, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={content.contactInfo.whatsapp}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contactInfo: { ...content.contactInfo, whatsapp: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Official Email
                </label>
                <input
                  type="email"
                  value={content.contactInfo.email}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contactInfo: { ...content.contactInfo, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={content.contactInfo.operatingHours}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contactInfo: { ...content.contactInfo, operatingHours: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Business Address
              </label>
              <textarea
                rows={2}
                value={content.contactInfo.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contactInfo: { ...content.contactInfo, address: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* FOOTER TAB */}
        {activeTab === "footer" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={content.footer.brandName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, brandName: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Footer Description
              </label>
              <textarea
                rows={3}
                value={content.footer.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Copyright Text
              </label>
              <input
                type="text"
                value={content.footer.copyrightText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, copyrightText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-60 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save and Persist Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
