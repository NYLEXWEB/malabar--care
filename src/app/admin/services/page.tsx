"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageReference: string;
  features: string[];
  displayOrder: number;
  published: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    imageReference: "/images/home-cleaning.jpg",
    featuresText: "",
    displayOrder: 1,
    published: true,
  });

  const loadServices = () => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services) {
          setServices(data.services);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      imageReference: "/images/home-cleaning.jpg",
      featuresText: "Kitchen grease breakdown\nFull bathroom sanitizing\nUnder-furniture vacuuming",
      displayOrder: services.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingId(s._id);
    setFormData({
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription,
      description: s.description || s.shortDescription,
      imageReference: s.imageReference,
      featuresText: (s.features || []).join("\n"),
      displayOrder: s.displayOrder || 1,
      published: s.published ?? true,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || !editingId ? slug : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      shortDescription: formData.shortDescription,
      description: formData.description,
      imageReference: formData.imageReference,
      features: formData.featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      displayOrder: Number(formData.displayOrder),
      published: Boolean(formData.published),
    };

    try {
      const url = editingId
        ? `/api/admin/services/${editingId}`
        : `/api/admin/services`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Operation failed");
      }

      setFeedback({
        type: "success",
        message: editingId
          ? "Service updated successfully!"
          : "New service created successfully!",
      });
      setModalOpen(false);
      loadServices();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error saving service",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the service "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }
      setFeedback({ type: "success", message: `Deleted service "${title}"` });
      loadServices();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error deleting service",
      });
    }
  };

  const togglePublish = async (s: ServiceItem) => {
    try {
      await fetch(`/api/admin/services/${s._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !s.published }),
      });
      loadServices();
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
            Service Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add, update, reorder, or toggle cleaning offerings displayed on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-3 ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span>Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No services configured. Click "Add New Service" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Service Title</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={s.imageReference || "/images/home-cleaning.jpg"}
                            alt={s.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{s.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{s.shortDescription}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      /{s.slug}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {s.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublish(s)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          s.published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {s.published ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id, s.title)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Cleaning Service" : "Add New Cleaning Service"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Window & Glass Restoration"
                    className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Card Short Description (approx 15-25 words) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary for public service card..."
                  className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Detailed Service Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="In-depth details of what is covered in this service package..."
                  className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Image Reference
                  </label>
                  <select
                    value={formData.imageReference}
                    onChange={(e) => setFormData({ ...formData, imageReference: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900 bg-white"
                  >
                    <option value="/images/home-cleaning.jpg">Home Cleaning (Photo)</option>
                    <option value="/images/office-cleaning.jpg">Office Cleaning (Photo)</option>
                    <option value="/images/deep-cleaning.svg">Deep Cleaning (Vector)</option>
                    <option value="/images/commercial-cleaning.svg">Commercial Care (Vector)</option>
                    <option value="/images/hero.jpg">Hero Living Space (Photo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Highlights / Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="HEPA micro-filtration vacuum&#10;Eco-friendly child safe sprays&#10;Supervisor inspection"
                  className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="text-blue-600 rounded"
                />
                <label htmlFor="pubCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish immediately on public website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Saving..." : editingId ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
