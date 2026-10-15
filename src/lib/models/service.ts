import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageReference: string;
  features: string[];
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    imageReference: { type: String, default: "/images/home-cleaning.jpg" },
    features: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
