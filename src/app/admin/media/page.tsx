"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
  FileImage,
  ExternalLink,
} from "lucide-react";

interface MediaAsset {
  _id: string;
  fileId: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  url: string;
  uploadedBy: string;
  storageMode: "gridfs" | "local_fallback";
  createdAt: string;
}

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [storageMode, setStorageMode] = useState<string>("gridfs");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = () => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.assets) {
          setAssets(data.assets);
          setStorageMode(data.storageMode);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", message: "Only image files (JPEG, PNG, WebP, SVG) are allowed." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: "error", message: "File exceeds 5MB limit." });
      return;
    }

    setUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setFeedback({
        type: "success",
        message: data.message || "Image uploaded successfully!",
      });
      loadMedia();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error uploading file",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete image "${name}"?`)) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Delete failed");
      }
      setFeedback({ type: "success", message: `Deleted asset "${name}"` });
      loadMedia();
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Error deleting asset",
      });
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Media &amp; Image Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Binary image storage utilizing MongoDB GridFS without external paid third-party hosting.
          </p>
        </div>

        {/* Upload Trigger Button */}
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload New Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* GridFS Technology Indicator Box */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">
              Storage Architecture:{" "}
              {storageMode === "gridfs" ? (
                <span className="text-emerald-600">MongoDB GridFS Bucket Stream</span>
              ) : (
                <span className="text-amber-600">Local Asset Fallback Mode</span>
              )}
            </p>
            <p className="text-slate-500 text-[11px]">
              {storageMode === "gridfs"
                ? "Binary files are partitioned into 255KB chunks in MongoDB Atlas GridFS and streamed directly over HTTP without local disk reliance."
                : "Standard local assets active. Once MONGODB_URI is provided, GridFS streaming is automatically engaged."}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[10px] shrink-0 font-bold">
          Max: 5MB • MIME: JPEG/PNG/SVG/WebP
        </span>
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

      {/* Assets Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
          <span>Loading media assets...</span>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
          <FileImage className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <p>No media uploaded yet. Click "Upload New Image" above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 w-full bg-slate-100 border-b border-slate-100">
                <Image
                  src={asset.url}
                  alt={asset.originalName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  {asset.storageMode === "gridfs" ? "GridFS Binary" : "Local Mode"}
                </span>
              </div>

              {/* Details & Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate" title={asset.originalName}>
                    {asset.originalName}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span>{(asset.size / 1024).toFixed(1)} KB</span>
                    <span>•</span>
                    <span>{asset.contentType}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => copyToClipboard(asset.url, asset._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{copiedId === asset._id ? "Copied!" : "Copy Path"}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(asset._id, asset.originalName)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
