import mongoose from "mongoose";
import { connectToDatabase } from "./connection";
import { AdminUser } from "../models/admin-user";
import { WebsiteContent } from "../models/website-content";
import { Service } from "../models/service";
import { VlogPost } from "../models/vlog";
import { Enquiry } from "../models/enquiry";
import { AnalyticsEvent } from "../models/analytics-event";
import { MediaAsset } from "../models/media-asset";
import { fallbackStore } from "../data/fallback-store";
import {
  INITIAL_WEBSITE_CONTENT,
  INITIAL_SERVICES,
  INITIAL_VLOGS,
} from "../data/initial-content";
import {
  CreateServiceInput,
  UpdateServiceInput,
  CreateVlogInput,
  UpdateVlogInput,
} from "../types/content";
import { hashPassword, verifyPassword } from "../auth/passwords";

export async function initAdminUser() {
  const { isConnected } = await connectToDatabase();
  const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const plainPassword = process.env.ADMIN_PASSWORD || "admin@123";

  if (!isConnected) {
    return {
      username,
      mode: "fallback",
    };
  }

  try {
    let existing = await AdminUser.findOne({ username });
    if (!existing) {
      const passwordHash = await hashPassword(plainPassword);
      existing = await AdminUser.create({
        username,
        passwordHash,
        role: "admin",
        isActive: true,
      });
      console.log(`[Auth] Seeded initial admin account: ${username}`);
    }
    return { username, mode: "mongodb", id: existing._id.toString() };
  } catch (err) {
    console.warn("[Auth] Admin initialization notice:", err);
    return { username, mode: "mongodb", error: String(err) };
  }
}

export async function verifyAdminCredentials(
  username: string,
  plainPassword: string
): Promise<{ valid: boolean; user?: { username: string; role: string; userId: string } }> {
  const { isConnected } = await connectToDatabase();
  const expectedUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin@123";

  if (!isConnected) {
    // Demo fallback authentication
    if (username.toLowerCase() === expectedUsername && plainPassword === expectedPassword) {
      return {
        valid: true,
        user: {
          username: expectedUsername,
          role: "admin",
          userId: "admin_fallback_1",
        },
      };
    }
    return { valid: false };
  }

  try {
    let admin = await AdminUser.findOne({ username: username.toLowerCase() });
    if (!admin) {
      // If admin doesn't exist yet, seed it
      await initAdminUser();
      admin = await AdminUser.findOne({ username: username.toLowerCase() });
    }

    if (!admin || !admin.isActive) {
      return { valid: false };
    }

    const matches = await verifyPassword(plainPassword, admin.passwordHash);
    if (!matches) {
      // If password in .env.local was updated, automatically sync hash
      if (username.toLowerCase() === expectedUsername && plainPassword === expectedPassword) {
        admin.passwordHash = await hashPassword(plainPassword);
        await admin.save();
        return {
          valid: true,
          user: {
            username: admin.username,
            role: admin.role,
            userId: admin._id.toString(),
          },
        };
      }
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        username: admin.username,
        role: admin.role,
        userId: admin._id.toString(),
      },
    };
  } catch {
    // If DB has an intermittent error, allow verification against configured env vars
    if (username.toLowerCase() === expectedUsername && plainPassword === expectedPassword) {
      return {
        valid: true,
        user: {
          username: expectedUsername,
          role: "admin",
          userId: "admin_env_recovery",
        },
      };
    }
    return { valid: false };
  }
}

// ----------------------------------------------------
// Website Content Repository
// ----------------------------------------------------
export async function getWebsiteContent() {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getContent();
  }

  try {
    let content = await WebsiteContent.findOne({ key: "main_content" }).lean();
    if (!content) {
      const created = await WebsiteContent.create(INITIAL_WEBSITE_CONTENT);
      content = created.toObject();
    }
    return content;
  } catch {
    return fallbackStore.getContent();
  }
}

export async function updateWebsiteContent(data: Partial<typeof INITIAL_WEBSITE_CONTENT>) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.updateContent(data as typeof INITIAL_WEBSITE_CONTENT);
  }

  try {
    const updated = await WebsiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: data },
      { new: true, upsert: true }
    ).lean();
    return updated;
  } catch {
    return fallbackStore.updateContent(data as typeof INITIAL_WEBSITE_CONTENT);
  }
}

// ----------------------------------------------------
// Services Repository
// ----------------------------------------------------
export async function getServices(onlyPublished = false) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getServices(onlyPublished);
  }

  try {
    const totalCount = await Service.countDocuments();
    if (totalCount === 0) {
      // Seed initial services in DB
      await Service.insertMany(INITIAL_SERVICES);
    }
    const query = onlyPublished ? { published: true } : {};
    return await Service.find(query).sort({ displayOrder: 1 }).lean();
  } catch {
    return fallbackStore.getServices(onlyPublished);
  }
}

export async function getServiceBySlug(slug: string) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getServiceBySlug(slug);
  }

  try {
    let srv = await Service.findOne({ slug }).lean();
    if (!srv && mongoose.Types.ObjectId.isValid(slug)) {
      srv = await Service.findById(slug).lean();
    }
    if (!srv) {
      return fallbackStore.getServiceBySlug(slug);
    }
    return srv;
  } catch {
    return fallbackStore.getServiceBySlug(slug);
  }
}

export async function createService(data: CreateServiceInput) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.createService(data);
  }

  try {
    const srv = await Service.create(data);
    return srv.toObject();
  } catch {
    return fallbackStore.createService(data);
  }
}

export async function updateService(id: string, data: UpdateServiceInput) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.updateService(id, data);
  }

  try {
    let srv = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      srv = await Service.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
    }
    if (!srv) {
      srv = await Service.findOneAndUpdate({ slug: id }, { $set: data }, { new: true }).lean();
    }
    return srv || fallbackStore.updateService(id, data);
  } catch {
    return fallbackStore.updateService(id, data);
  }
}

export async function deleteService(id: string) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.deleteService(id);
  }

  try {
    let result = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      result = await Service.findByIdAndDelete(id);
    }
    if (!result) {
      result = await Service.findOneAndDelete({ slug: id });
    }
    return Boolean(result) || fallbackStore.deleteService(id);
  } catch {
    return fallbackStore.deleteService(id);
  }
}

// ----------------------------------------------------
// Vlogs Repository
// ----------------------------------------------------
export async function getVlogs(onlyPublished = false) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getVlogs(onlyPublished);
  }

  try {
    const totalCount = await VlogPost.countDocuments();
    if (totalCount === 0) {
      await VlogPost.insertMany(INITIAL_VLOGS);
    }
    const query: { status?: "published" | "draft" } = onlyPublished ? { status: "published" } : {};
    return await VlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
  } catch {
    return fallbackStore.getVlogs(onlyPublished);
  }
}

export async function getVlogBySlug(slug: string) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getVlogBySlug(slug);
  }

  try {
    let vlog = await VlogPost.findOne({ slug }).lean();
    if (!vlog && mongoose.Types.ObjectId.isValid(slug)) {
      vlog = await VlogPost.findById(slug).lean();
    }
    if (!vlog) {
      return fallbackStore.getVlogBySlug(slug);
    }
    return vlog;
  } catch {
    return fallbackStore.getVlogBySlug(slug);
  }
}

export async function createVlog(data: CreateVlogInput) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.createVlog(data);
  }

  try {
    const vlog = await VlogPost.create(data);
    return vlog.toObject();
  } catch {
    return fallbackStore.createVlog(data);
  }
}

export async function updateVlog(id: string, data: UpdateVlogInput) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.updateVlog(id, data);
  }

  try {
    let vlog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      vlog = await VlogPost.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
    }
    if (!vlog) {
      vlog = await VlogPost.findOneAndUpdate({ slug: id }, { $set: data }, { new: true }).lean();
    }
    return vlog || fallbackStore.updateVlog(id, data);
  } catch {
    return fallbackStore.updateVlog(id, data);
  }
}

export async function deleteVlog(id: string) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.deleteVlog(id);
  }

  try {
    let result = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      result = await VlogPost.findByIdAndDelete(id);
    }
    if (!result) {
      result = await VlogPost.findOneAndDelete({ slug: id });
    }
    return Boolean(result) || fallbackStore.deleteVlog(id);
  } catch {
    return fallbackStore.deleteVlog(id);
  }
}

// ----------------------------------------------------
// Enquiries Repository
// ----------------------------------------------------
export async function getEnquiries() {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getEnquiries();
  }

  try {
    const list = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return list;
  } catch {
    return fallbackStore.getEnquiries();
  }
}

export async function getEnquiryById(id: string) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    const list = fallbackStore.getEnquiries();
    return list.find((e) => e._id === id) || null;
  }

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const enq = await Enquiry.findById(id).lean();
      if (enq) return enq;
    }
    const list = fallbackStore.getEnquiries();
    return list.find((e) => e._id === id) || null;
  } catch {
    const list = fallbackStore.getEnquiries();
    return list.find((e) => e._id === id) || null;
  }
}

export async function createEnquiry(data: {
  customerName: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  propertyType?: string;
  message: string;
}) {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.createEnquiry(data);
  }

  try {
    const created = await Enquiry.create(data);
    return created.toObject();
  } catch {
    return fallbackStore.createEnquiry(data);
  }
}

export async function updateEnquiryStatus(id: string, status: "new" | "contacted" | "resolved") {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.updateEnquiryStatus(id, status);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return fallbackStore.updateEnquiryStatus(id, status);
    }
    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    ).lean();
    return updated || fallbackStore.updateEnquiryStatus(id, status);
  } catch {
    return fallbackStore.updateEnquiryStatus(id, status);
  }
}

export async function deleteEnquiry(id: string) {
  const { isConnected } = await connectToDatabase();
  fallbackStore.deleteEnquiry(id);

  if (isConnected) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const result = await Enquiry.findByIdAndDelete(id);
        return Boolean(result);
      }
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

// ----------------------------------------------------
// Analytics Repository
// ----------------------------------------------------
export async function trackAnalyticsEvent(data: {
  eventType: "page_view" | "button_click" | "section_engagement";
  eventName: string;
  pagePath: string;
  elementId?: string;
  sectionId?: string;
  durationMs?: number;
  sessionId: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}) {
  const { isConnected } = await connectToDatabase();
  const eventPayload = {
    ...data,
    timestamp: data.timestamp || new Date(),
  };

  if (!isConnected) {
    return fallbackStore.trackEvent(eventPayload);
  }

  try {
    const evt = await AnalyticsEvent.create(eventPayload);
    return evt.toObject();
  } catch {
    return fallbackStore.trackEvent(eventPayload);
  }
}

export async function getAnalyticsSummary(days = 30) {
  const { isConnected } = await connectToDatabase();
  const safeDays = typeof days === "number" && !isNaN(days) && days > 0 ? days : 30;
  const sinceDate = new Date(Date.now() - safeDays * 24 * 60 * 60 * 1000);

  let events: Array<{
    eventType: string;
    pagePath: string;
    elementId?: string;
    sectionId?: string;
    durationMs?: number;
    sessionId: string;
    timestamp: Date;
  }> = [];

  if (isConnected) {
    try {
      events = (await AnalyticsEvent.find({ timestamp: { $gte: sinceDate } })
        .sort({ timestamp: -1 })
        .lean()) as unknown as typeof events;
    } catch {
      events = fallbackStore.getAnalyticsEvents();
    }
  } else {
    events = fallbackStore.getAnalyticsEvents();
  }

  // Filter within date range
  const filtered = events.filter((e) => new Date(e.timestamp) >= sinceDate);

  // Compute metrics
  const pageViews = filtered.filter((e) => e.eventType === "page_view");
  const buttonClicks = filtered.filter((e) => e.eventType === "button_click");
  const sectionEngagements = filtered.filter((e) => e.eventType === "section_engagement");

  const uniqueSessions = new Set(filtered.map((e) => e.sessionId)).size;

  // Breakdown by page
  const pageCounts: Record<string, number> = {};
  pageViews.forEach((pv) => {
    pageCounts[pv.pagePath] = (pageCounts[pv.pagePath] || 0) + 1;
  });

  // Breakdown by button element
  const buttonCounts: Record<string, number> = {};
  buttonClicks.forEach((bc) => {
    if (bc.elementId) {
      buttonCounts[bc.elementId] = (buttonCounts[bc.elementId] || 0) + 1;
    }
  });

  // Breakdown by section engagement
  const sectionDurations: Record<string, { totalMs: number; count: number }> = {};
  sectionEngagements.forEach((se) => {
    if (se.sectionId) {
      if (!sectionDurations[se.sectionId]) {
        sectionDurations[se.sectionId] = { totalMs: 0, count: 0 };
      }
      sectionDurations[se.sectionId].totalMs += se.durationMs || 0;
      sectionDurations[se.sectionId].count += 1;
    }
  });

  const sectionRankings = Object.entries(sectionDurations).map(([sectionId, stat]) => ({
    sectionId,
    totalSeconds: Math.round(stat.totalMs / 1000),
    avgSeconds: Math.round(stat.totalMs / (stat.count || 1) / 1000),
    sessionsCount: stat.count,
  }));

  // Daily views timeline (last 7 days)
  const timeline: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().split("T")[0];
    timeline[key] = 0;
  }
  pageViews.forEach((pv) => {
    const key = new Date(pv.timestamp).toISOString().split("T")[0];
    if (timeline[key] !== undefined) {
      timeline[key] += 1;
    }
  });

  let enquiryCount = 0;
  let publishedVlogCount = 0;

  if (isConnected) {
    try {
      enquiryCount = await Enquiry.countDocuments();
      publishedVlogCount = await VlogPost.countDocuments({ status: "published" });
    } catch {
      enquiryCount = (await getEnquiries()).length;
      publishedVlogCount = (await getVlogs(true)).length;
    }
  } else {
    enquiryCount = (await getEnquiries()).length;
    publishedVlogCount = (await getVlogs(true)).length;
  }

  return {
    databaseConnected: isConnected,
    totalPageViews: pageViews.length,
    approximateUniqueVisitors: uniqueSessions,
    totalButtonClicks: buttonClicks.length,
    totalEnquiries: enquiryCount,
    publishedVlogs: publishedVlogCount,
    viewsTimeline: Object.entries(timeline).map(([date, count]) => ({ date, count })),
    topPages: Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count),
    topButtons: Object.entries(buttonCounts)
      .map(([elementId, count]) => ({ elementId, count }))
      .sort((a, b) => b.count - a.count),
    sectionEngagement: sectionRankings.sort((a, b) => b.totalSeconds - a.totalSeconds),
    recentEvents: filtered.slice(0, 15),
  };
}

// ----------------------------------------------------
// Media Assets Repository
// ----------------------------------------------------
export async function getMediaAssetsList() {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return fallbackStore.getMediaAssets();
  }

  try {
    const list = await MediaAsset.find().sort({ createdAt: -1 }).lean();
    if (list.length === 0) {
      return fallbackStore.getMediaAssets();
    }
    return list;
  } catch {
    return fallbackStore.getMediaAssets();
  }
}

export async function recordMediaAsset(data: {
  fileId: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  url: string;
  uploadedBy?: string;
  storageMode: "gridfs" | "local_fallback";
}) {
  const { isConnected } = await connectToDatabase();
  const assetPayload = {
    ...data,
    uploadedBy: data.uploadedBy || "admin",
    createdAt: new Date(),
  };

  if (!isConnected) {
    return fallbackStore.addMediaAsset(assetPayload);
  }

  try {
    const asset = await MediaAsset.create(assetPayload);
    return asset.toObject();
  } catch {
    return fallbackStore.addMediaAsset(assetPayload);
  }
}

export async function deleteMediaAsset(fileId: string) {
  const { isConnected } = await connectToDatabase();
  fallbackStore.deleteMediaAsset(fileId);

  if (isConnected) {
    try {
      const orConditions: Array<{ fileId?: string; _id?: string }> = [{ fileId }];
      if (mongoose.Types.ObjectId.isValid(fileId)) {
        orConditions.push({ _id: fileId });
      }
      await MediaAsset.deleteMany({ $or: orConditions });
      return true;
    } catch {
      return false;
    }
  }
  return true;
}
