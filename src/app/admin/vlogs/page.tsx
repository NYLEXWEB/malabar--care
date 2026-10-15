"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Loader2,
  Video,
  FileText,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Film,
  AlertTriangle,
} from "lucide-react";

interface VlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageReference: string;
  externalVideoUrl?: string;
  contentType: "article" | "video";
  status: "draft" | "published";
  readTimeMinutes?: number;
  publishedAt?: string;
  createdAt: string;
}

export default function AdminVlogsPage() {
  const [vlogs, setVlogs] = useState<VlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImageReference: "/images/vlog-1.svg",
    externalVideoUrl: "",
    contentType: "article" as "article" | "video",
    status: "published" as "draft" | "published",
    readTimeMinutes: 4,
  });

  const loadVlogs = () => {
    fetch("/api/admin/vlogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.vlogs) {
          setVlogs(data.vlogs);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVlogs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImageReference: "/images/vlog-1.svg",
      externalVideoUrl: "",
      contentType: "article",
      status: "published",
      readTimeMinutes: 4,
    });
    setModalOpen(true);
  };

  const openEditModal = (v: VlogItem) => {
    setEditingId(v._id);
    setFormData({
      title: v.title,
      slug: v.slug,
      excerpt: v.excerpt,
      content: v.content,
      coverImageReference: v.coverImageReference,
      externalVideoUrl: v.externalVideoUrl || "",
      contentType: v.contentType,
      status: v.status,
      readTimeMinutes: v.readTimeMinutes || 4,
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

    try {
      const url = editingId ? `/api/admin/vlogs/${editingId}` : `/api/admin/vlogs`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Operation failed");
      }

      setFeedback({
        type: "success",
        message: editingId ? "Vlog post updated!" : "New insight created!",
      });
      setModalOpen(false);
      loadVlogs();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error saving vlog",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/vlogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }
      setFeedback({ type: "success", message: `Deleted vlog post "${title}"` });
      loadVlogs();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error deleting vlog",
      });
    }
  };

  const toggleStatus = async (v: VlogItem) => {
    const newStatus = v.status === "published" ? "draft" : "published";
    try {
      await fetch(`/api/admin/vlogs/${v._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadVlogs();
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
            Vlog &amp; Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publish educational articles, maintenance walkthroughs, and video links.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Vlog Post</span>
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

      {/* Video Upload Status Box per Section 8E Requirement */}
      <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-purple-900 flex items-start gap-3">
        <Film className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold">Raw Video File Upload:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-200/80 text-purple-800">
              Video Upload — Coming Soon
            </span>
          </div>
          <p className="text-purple-700 mt-0.5">
            For this demonstration, video posts link to external streaming sources (e.g. YouTube / Vimeo). Native serverless video encoding will be introduced in production.
          </p>
        </div>
      </div>

      {/* Vlogs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span>Loading insights...</span>
          </div>
        ) : vlogs.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No vlog posts yet. Click "New Vlog Post" to publish one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Title &amp; Type</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {vlogs.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={v.coverImageReference || "/images/vlog-1.svg"}
                            alt={v.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{v.title}</p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                            {v.contentType === "video" ? (
                              <span className="text-blue-600 font-semibold flex items-center gap-1">
                                <Video className="w-3 h-3" /> Video Post
                              </span>
                            ) : (
                              <span className="text-slate-600 flex items-center gap-1">
                                <FileText className="w-3 h-3" /> Guide Article
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      /vlogs/{v.slug}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {v.readTimeMinutes || 4} min
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStatus(v)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          v.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {v.status === "published" ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-amber-600" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {v.status === "published" && (
                          <Link
                            href={`/vlogs/${v.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="View Public Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => openEditModal(v)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v._id, v.title)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Post"
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

      {/* Add / Edit Vlog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Vlog / Article Post" : "Create New Vlog / Article Post"}
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
                    Post Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 5 Habits for Spotless Desks"
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
                  Short Excerpt (shows on cards) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary of this guide or video..."
                  className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Article Body (Markdown supported) *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full text of the post. Use ### for subheadings."
                  className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Content Type
                  </label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 bg-white"
                  >
                    <option value="article">Written Guide</option>
                    <option value="video">Video Insight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Cover Image
                  </label>
                  <select
                    value={formData.coverImageReference}
                    onChange={(e) => setFormData({ ...formData, coverImageReference: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 bg-white"
                  >
                    <option value="/images/vlog-1.svg">Vlog 1: Workplace Hygiene</option>
                    <option value="/images/vlog-2.svg">Vlog 2: Eco-Friendly</option>
                    <option value="/images/vlog-3.svg">Vlog 3: Preparation</option>
                    <option value="/images/hero.jpg">Hero Living Space</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.readTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readTimeMinutes: parseInt(e.target.value) || 4 })}
                    className="w-full px-3 py-2 border rounded-lg text-xs text-slate-900"
                  />
                </div>
              </div>

              {formData.contentType === "video" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    External Video URL (YouTube or Vimeo)
                  </label>
                  <input
                    type="url"
                    value={formData.externalVideoUrl}
                    onChange={(e) => setFormData({ ...formData, externalVideoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 border rounded-lg text-xs text-slate-900"
                  />
                </div>
              )}

              <div className="pt-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === "published"}
                    onChange={() => setFormData({ ...formData, status: "published" })}
                  />
                  <span>Published (Visible on site)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === "draft"}
                    onChange={() => setFormData({ ...formData, status: "draft" })}
                  />
                  <span>Draft (Hidden from public)</span>
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
                  {submitting ? "Saving..." : editingId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
