import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebsiteContent extends Document {
  key: string;
  hero: {
    badge: string;
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    heroImage: string;
  };
  trustStrip: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  about: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaLabel: string;
    image: string;
  };
  servicesHeading: {
    badge: string;
    title: string;
    subtitle: string;
  };
  whyChooseUs: {
    badge: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  galleryHeading: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    operatingHours: string;
    mapEmbedUrl?: string;
  };
  footer: {
    brandName: string;
    description: string;
    copyrightText: string;
    socialLinks: Array<{
      platform: string;
      url: string;
    }>;
  };
  updatedAt: Date;
}

const WebsiteContentSchema = new Schema<IWebsiteContent>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main_content",
    },
    hero: {
      badge: { type: String, default: "Professional Cleaning in Malabar" },
      headline: {
        type: String,
        default: "Professional Cleaning.\nA Better Space to Live and Work.",
      },
      supportingText: {
        type: String,
        default:
          "Reliable cleaning solutions for cleaner, healthier, and more welcoming spaces.",
      },
      primaryCta: { type: String, default: "Get a Quote" },
      secondaryCta: { type: String, default: "Explore Services" },
      heroImage: { type: String, default: "/images/hero.jpg" },
    },
    trustStrip: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    about: {
      badge: { type: String, default: "About Malabar Care" },
      title: { type: String, default: "Pioneering Hygienic, High-Standard Spaces" },
      description: {
        type: String,
        default:
          "Malabar Care is committed to delivering thorough, systematic cleaning and sanitation services tailored for modern homes, corporate offices, and commercial spaces.",
      },
      bulletPoints: [{ type: String }],
      ctaLabel: { type: String, default: "Request a Consultation" },
      image: { type: String, default: "/images/about-team.svg" },
    },
    servicesHeading: {
      badge: { type: String, default: "Our Core Offerings" },
      title: { type: String, default: "Tailored Cleaning Services" },
      subtitle: {
        type: String,
        default:
          "Comprehensive care programs executed by certified professionals using high-grade sanitation equipment.",
      },
    },
    whyChooseUs: {
      badge: { type: String, default: "The Malabar Care Difference" },
      title: { type: String, default: "Why Clients Rely On Our Standards" },
      items: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
    },
    galleryHeading: {
      badge: { type: String, default: "Work Showcase" },
      title: { type: String, default: "Recent Transformations" },
      subtitle: {
        type: String,
        default:
          "Inspect the visual difference achieved through rigorous attention to detail.",
      },
    },
    contactInfo: {
      phone: { type: String, default: "+91 98765 43210" },
      whatsapp: { type: String, default: "+919876543210" },
      email: { type: String, default: "contact@malabarcare.demo" },
      address: {
        type: String,
        default: "Malabar Care Business Complex, Calicut, Kerala, India",
      },
      operatingHours: { type: String, default: "Mon – Sat: 8:00 AM – 7:00 PM" },
      mapEmbedUrl: { type: String, default: "" },
    },
    footer: {
      brandName: { type: String, default: "MALABAR CARE" },
      description: {
        type: String,
        default:
          "Delivering premium, verified cleaning services across residential and commercial sectors with pristine hygiene guarantees.",
      },
      copyrightText: {
        type: String,
        default: "© 2026 Malabar Care. All rights reserved.",
      },
      socialLinks: [
        {
          platform: { type: String, default: "Instagram" },
          url: { type: String, default: "https://instagram.com" },
        },
        {
          platform: { type: String, default: "LinkedIn" },
          url: { type: String, default: "https://linkedin.com" },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const WebsiteContent: Model<IWebsiteContent> =
  mongoose.models.WebsiteContent ||
  mongoose.model<IWebsiteContent>("WebsiteContent", WebsiteContentSchema);
