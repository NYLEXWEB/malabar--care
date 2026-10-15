import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required").trim(),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  description: z.string().min(20, "Detailed description must be at least 20 characters"),
  imageReference: z.string().min(1, "Image reference is required"),
  features: z.array(z.string()).default([]),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const vlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(30, "Content must be at least 30 characters"),
  coverImageReference: z.string().min(1, "Cover image is required"),
  externalVideoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contentType: z.enum(["article", "video"]).default("article"),
  status: z.enum(["draft", "published"]).default("published"),
  readTimeMinutes: z.number().int().min(1).default(4),
});

export const enquirySchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").trim(),
  phone: z.string().min(7, "Valid phone number is required").trim(),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  serviceRequested: z.string().min(2, "Please select or specify a service"),
  propertyType: z.string().optional().default("residential"),
  message: z.string().min(5, "Message must be at least 5 characters").trim(),
});

export const analyticsTrackSchema = z.object({
  eventType: z.enum(["page_view", "button_click", "section_engagement"]),
  eventName: z.string().min(1),
  pagePath: z.string().min(1),
  elementId: z.string().optional(),
  sectionId: z.string().optional(),
  durationMs: z.number().nonnegative().optional(),
  sessionId: z.string().min(5),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const websiteContentSchema = z.object({
  hero: z.object({
    badge: z.string().min(1),
    headline: z.string().min(5),
    supportingText: z.string().min(10),
    primaryCta: z.string().min(1),
    secondaryCta: z.string().min(1),
    heroImage: z.string().min(1),
  }),
  trustStrip: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      icon: z.string().min(1),
    })
  ),
  about: z.object({
    badge: z.string().min(1),
    title: z.string().min(5),
    description: z.string().min(10),
    bulletPoints: z.array(z.string()),
    ctaLabel: z.string().min(1),
    image: z.string().min(1),
  }),
  servicesHeading: z.object({
    badge: z.string().min(1),
    title: z.string().min(3),
    subtitle: z.string().min(5),
  }),
  whyChooseUs: z.object({
    badge: z.string().min(1),
    title: z.string().min(3),
    items: z.array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.string().min(1),
      })
    ),
  }),
  galleryHeading: z.object({
    badge: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
  contactInfo: z.object({
    phone: z.string().min(5),
    whatsapp: z.string().min(5),
    email: z.string().email(),
    address: z.string().min(5),
    operatingHours: z.string().min(3),
    mapEmbedUrl: z.string().optional().default(""),
  }),
  footer: z.object({
    brandName: z.string().min(1),
    description: z.string().min(5),
    copyrightText: z.string().min(1),
    socialLinks: z.array(
      z.object({
        platform: z.string().min(1),
        url: z.string().min(1),
      })
    ),
  }),
});
