import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  customerName: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  propertyType?: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    serviceRequested: { type: String, required: true },
    propertyType: { type: String, default: "residential" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
