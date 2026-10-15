import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMediaAsset extends Document {
  fileId: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  url: string;
  uploadedBy: string;
  storageMode: "gridfs" | "local_fallback";
  createdAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    fileId: { type: String, required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: String, default: "admin" },
    storageMode: {
      type: String,
      enum: ["gridfs", "local_fallback"],
      default: "gridfs",
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);
