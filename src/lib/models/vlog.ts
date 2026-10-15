import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageReference: string;
  externalVideoUrl?: string;
  contentType: "article" | "video";
  status: "draft" | "published";
  publishedAt?: Date;
  readTimeMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
}

const VlogPostSchema = new Schema<IVlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImageReference: { type: String, default: "/images/vlog-1.svg" },
    externalVideoUrl: { type: String, default: "" },
    contentType: {
      type: String,
      enum: ["article", "video"],
      default: "article",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    publishedAt: { type: Date, default: Date.now },
    readTimeMinutes: { type: Number, default: 4 },
  },
  {
    timestamps: true,
  }
);

export const VlogPost: Model<IVlogPost> =
  mongoose.models.VlogPost ||
  mongoose.model<IVlogPost>("VlogPost", VlogPostSchema);
