import {
  INITIAL_WEBSITE_CONTENT,
  INITIAL_SERVICES,
  INITIAL_VLOGS,
} from "./initial-content";

// Memory storage cache across API invocations in development
interface MemoryStore {
  content: typeof INITIAL_WEBSITE_CONTENT;
  services: Array<(typeof INITIAL_SERVICES)[0] & { _id: string; createdAt: Date; updatedAt: Date }>;
  vlogs: Array<(typeof INITIAL_VLOGS)[0] & { _id: string; createdAt: Date; updatedAt: Date }>;
  enquiries: Array<{
    _id: string;
    customerName: string;
    phone: string;
    email?: string;
    serviceRequested: string;
    propertyType?: string;
    message: string;
    status: "new" | "contacted" | "resolved";
    createdAt: Date;
    updatedAt: Date;
  }>;
  analytics: Array<{
    _id: string;
    eventType: "page_view" | "button_click" | "section_engagement";
    eventName: string;
    pagePath: string;
    elementId?: string;
    sectionId?: string;
    durationMs?: number;
    sessionId: string;
    timestamp: Date;
    metadata?: Record<string, unknown>;
  }>;
  media: Array<{
    _id: string;
    fileId: string;
    filename: string;
    originalName: string;
    contentType: string;
    size: number;
    url: string;
    uploadedBy: string;
    storageMode: "gridfs" | "local_fallback";
    createdAt: Date;
  }>;
}

declare global {
  // eslint-disable-next-line no-var
  var __malabarMemoryStore: MemoryStore | undefined;
}

function getMemoryStore(): MemoryStore {
  if (!global.__malabarMemoryStore) {
    global.__malabarMemoryStore = {
      content: JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT)),
      services: INITIAL_SERVICES.map((s, idx) => ({
        ...s,
        _id: `srv_${idx + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      vlogs: INITIAL_VLOGS.map((v, idx) => ({
        ...v,
        _id: `vlog_${idx + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      enquiries: [
        {
          _id: "enq_demo_1",
          customerName: "Rahul Menon",
          phone: "+91 98450 12345",
          email: "rahul.m@example.com",
          serviceRequested: "Home Cleaning",
          propertyType: "residential",
          message: "Looking for full deep cleaning of 3BHK apartment before housewarming.",
          status: "new",
          createdAt: new Date(Date.now() - 3600000 * 4),
          updatedAt: new Date(Date.now() - 3600000 * 4),
        },
        {
          _id: "enq_demo_2",
          customerName: "Ananya Sharma",
          phone: "+91 97422 67890",
          email: "ananya@techventures.in",
          serviceRequested: "Office Cleaning",
          propertyType: "commercial",
          message: "Need weekly janitorial maintenance for our 2,500 sq ft office in Calicut.",
          status: "contacted",
          createdAt: new Date(Date.now() - 3600000 * 24),
          updatedAt: new Date(Date.now() - 3600000 * 20),
        },
      ],
      analytics: [
        // Seed initial representative demo events so charts are immediately helpful
        {
          _id: "evt_1",
          eventType: "page_view",
          eventName: "page_view",
          pagePath: "/",
          sessionId: "sess_demo_alpha",
          timestamp: new Date(Date.now() - 3600000 * 3),
        },
        {
          _id: "evt_2",
          eventType: "button_click",
          eventName: "click",
          pagePath: "/",
          elementId: "hero_get_quote",
          sessionId: "sess_demo_alpha",
          timestamp: new Date(Date.now() - 3600000 * 3 + 15000),
        },
        {
          _id: "evt_3",
          eventType: "section_engagement",
          eventName: "section_dwell",
          pagePath: "/",
          sectionId: "services",
          durationMs: 18500,
          sessionId: "sess_demo_alpha",
          timestamp: new Date(Date.now() - 3600000 * 3 + 45000),
        },
        {
          _id: "evt_4",
          eventType: "button_click",
          eventName: "click",
          pagePath: "/",
          elementId: "floating_whatsapp",
          sessionId: "sess_demo_beta",
          timestamp: new Date(Date.now() - 3600000 * 1),
        },
      ],
      media: [
        {
          _id: "media_1",
          fileId: "hero_img",
          filename: "hero.jpg",
          originalName: "hero.jpg",
          contentType: "image/jpeg",
          size: 245000,
          url: "/images/hero.jpg",
          uploadedBy: "system",
          storageMode: "local_fallback",
          createdAt: new Date(),
        },
        {
          _id: "media_2",
          fileId: "home_clean_img",
          filename: "home-cleaning.jpg",
          originalName: "home-cleaning.jpg",
          contentType: "image/jpeg",
          size: 312000,
          url: "/images/home-cleaning.jpg",
          uploadedBy: "system",
          storageMode: "local_fallback",
          createdAt: new Date(),
        },
        {
          _id: "media_3",
          fileId: "office_clean_img",
          filename: "office-cleaning.jpg",
          originalName: "office-cleaning.jpg",
          contentType: "image/jpeg",
          size: 290000,
          url: "/images/office-cleaning.jpg",
          uploadedBy: "system",
          storageMode: "local_fallback",
          createdAt: new Date(),
        },
      ],
    };
  }
  return global.__malabarMemoryStore;
}

export const fallbackStore = {
  getContent: () => getMemoryStore().content,
  updateContent: (newContent: typeof INITIAL_WEBSITE_CONTENT) => {
    const store = getMemoryStore();
    store.content = { ...store.content, ...newContent };
    return store.content;
  },

  getServices: (onlyPublished = false) => {
    const services = getMemoryStore().services;
    if (onlyPublished) {
      return services.filter((s) => s.published);
    }
    return services.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  getServiceBySlug: (slug: string) => {
    return getMemoryStore().services.find((s) => s.slug === slug);
  },
  createService: (data: (typeof INITIAL_SERVICES)[0]) => {
    const store = getMemoryStore();
    const newService = {
      ...data,
      _id: `srv_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.services.push(newService);
    return newService;
  },
  updateService: (id: string, data: Partial<(typeof INITIAL_SERVICES)[0]>) => {
    const store = getMemoryStore();
    const idx = store.services.findIndex((s) => s._id === id);
    if (idx === -1) return null;
    store.services[idx] = {
      ...store.services[idx],
      ...data,
      updatedAt: new Date(),
    };
    return store.services[idx];
  },
  deleteService: (id: string) => {
    const store = getMemoryStore();
    const idx = store.services.findIndex((s) => s._id === id);
    if (idx === -1) return false;
    store.services.splice(idx, 1);
    return true;
  },

  getVlogs: (onlyPublished = false) => {
    const vlogs = getMemoryStore().vlogs;
    if (onlyPublished) {
      return vlogs.filter((v) => v.status === "published");
    }
    return vlogs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getVlogBySlug: (slug: string) => {
    return getMemoryStore().vlogs.find((v) => v.slug === slug);
  },
  createVlog: (data: (typeof INITIAL_VLOGS)[0]) => {
    const store = getMemoryStore();
    const newVlog = {
      ...data,
      _id: `vlog_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.vlogs.unshift(newVlog);
    return newVlog;
  },
  updateVlog: (id: string, data: Partial<(typeof INITIAL_VLOGS)[0]>) => {
    const store = getMemoryStore();
    const idx = store.vlogs.findIndex((v) => v._id === id);
    if (idx === -1) return null;
    store.vlogs[idx] = {
      ...store.vlogs[idx],
      ...data,
      updatedAt: new Date(),
    };
    return store.vlogs[idx];
  },
  deleteVlog: (id: string) => {
    const store = getMemoryStore();
    const idx = store.vlogs.findIndex((v) => v._id === id);
    if (idx === -1) return false;
    store.vlogs.splice(idx, 1);
    return true;
  },

  getEnquiries: () => {
    return getMemoryStore().enquiries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  createEnquiry: (data: {
    customerName: string;
    phone: string;
    email?: string;
    serviceRequested: string;
    propertyType?: string;
    message: string;
  }) => {
    const store = getMemoryStore();
    const newEnq = {
      ...data,
      _id: `enq_${Date.now()}`,
      status: "new" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.enquiries.unshift(newEnq);
    return newEnq;
  },
  updateEnquiryStatus: (id: string, status: "new" | "contacted" | "resolved") => {
    const store = getMemoryStore();
    const enq = store.enquiries.find((e) => e._id === id);
    if (!enq) return null;
    enq.status = status;
    enq.updatedAt = new Date();
    return enq;
  },

  trackEvent: (event: Omit<MemoryStore["analytics"][0], "_id">) => {
    const store = getMemoryStore();
    const newEvent = {
      ...event,
      _id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: event.timestamp || new Date(),
    };
    store.analytics.push(newEvent);
    // Keep last 1000 events in memory to prevent leak
    if (store.analytics.length > 1000) {
      store.analytics = store.analytics.slice(-1000);
    }
    return newEvent;
  },
  getAnalyticsEvents: () => getMemoryStore().analytics,

  getMediaAssets: () => getMemoryStore().media,
  addMediaAsset: (asset: Omit<MemoryStore["media"][0], "_id">) => {
    const store = getMemoryStore();
    const newAsset = {
      ...asset,
      _id: `media_${Date.now()}`,
    };
    store.media.unshift(newAsset);
    return newAsset;
  },
  deleteMediaAsset: (id: string) => {
    const store = getMemoryStore();
    const idx = store.media.findIndex((m) => m._id === id || m.fileId === id);
    if (idx === -1) return false;
    store.media.splice(idx, 1);
    return true;
  },
};
